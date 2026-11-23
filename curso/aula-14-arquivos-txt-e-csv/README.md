**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-13-dom-telas-formularios-e-localstorage/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-15-pratica-integrando-os-dados/README.md)

---

# AULA 14 — Arquivos .txt e .csv: microprojetos M3 e M4

## Objetivos da aula

- Entender o que o navegador **pode** e o que **não pode** fazer com arquivos;
- Gerar e baixar um arquivo com a receita `baixarArquivo` (Blob + link de download);
- Alinhar textos com `padEnd` e `padStart`;
- Ler arquivos escolhidos pelo usuário com `<input type="file" multiple>` e a receita `await arquivo.text()`;
- Transformar o texto de um `.csv` numa lista de objetos (`lerCsv`, com o cabeçalho e `objeto[coluna]`) e fazer o caminho de volta (`gerarCsv`);
- Conhecer as armadilhas do `.csv`: `\r\n`, acentos e BOM, cabeçalho, linha vazia, número como texto;
- Mostrar datas **só para exibição** com a receita `dataDoDia`;
- No projeto: fazer os microprojetos **M3** (importar os 5 `.csv` e avisar vínculos quebrados) e **M4** (exportar as reservas da semana e restaurar os dados iniciais).

## 14.1 O navegador e os arquivos: o que pode e o que não pode

Por segurança, uma página **não mexe no seu disco** por conta própria. Imagine um site qualquer lendo os seus documentos ou apagando arquivos. Por isso, o navegador só permite duas coisas:

- **ler** um arquivo que **o usuário escolheu** (botão "Escolher arquivo");
- **gerar um arquivo novo** e entregar como **download** (vai para a pasta Downloads).

O navegador **não regrava** o mesmo arquivo. O fluxo do projeto é sempre:

```
   dados/reservas.csv ──(importar: M3)──► memória + localStorage ──(exportar: M4)──► Downloads/reservas-semana-30-11.csv
     (arquivo original)                    (alterações acontecem aqui)                 (arquivo NOVO)
```

Essa limitação é o motivo de existirem **banco de dados** e **back-end** (um programa no servidor que grava os dados de todo mundo num lugar só). Você conhece os dois nas próximas disciplinas. Por enquanto, o `.csv` é o nosso "banco de dados de brinquedo": os **dados iniciais** e o **backup**.

## 14.2 Gerar e baixar um arquivo: a receita `baixarArquivo`

Gerar um arquivo é montar um **texto** (você sabe fazer desde a aula 8) e entregar para a receita:

```javascript
// [RECEITA] BAIXAR UM ARQUIVO
// Cria um arquivo na memória (Blob), cria um link invisível
// apontando para ele e "clica" no link: o navegador baixa.
// O "\uFEFF" no começo (BOM) avisa ao Excel e ao Bloco de Notas que o texto é UTF-8.
function baixarArquivo(nomeDoArquivo, conteudo) {
    let arquivo = new Blob(["\uFEFF" + conteudo], { type: "text/plain;charset=utf-8" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = nomeDoArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
}
```

É **receita**: você usa, não precisa saber escrever. O que importa entender:

- `baixarArquivo("frase.txt", "Olá, turma!\n")` baixa um arquivo `frase.txt` com aquele texto;
- cada `"\n"` no texto vira uma **quebra de linha** no arquivo;
- gerar **não** usa `await` (ler, sim; veja o 14.4).

Exemplo com formulário em [`exemplos/baixar-txt/`](exemplos/baixar-txt/).

## 14.3 Texto alinhado: `padEnd` e `padStart`

Num arquivo `.txt`, as colunas só ficam alinhadas se cada pedaço tiver o mesmo tamanho. Duas funções de texto completam até um tamanho:

```javascript
"Ana".padEnd(10, ".")        // "Ana......."   completa à DIREITA até 10 caracteres
"8.5".padStart(6, " ")       // "   8.5"       completa à ESQUERDA até 6 caracteres
String(7).padStart(2, "0")   // "07"          o clássico das datas e horas
```

O exemplo `baixar-txt` gera esta tabela em `notas.txt`:

```
ALUNO       NOTA
----------------
Ana.......   8.5
Bruno.....  10.0
Carla.....   7.0
```

O `padStart(2, "0")` vai aparecer de novo hoje: ele transforma `7` em `"07"`, o formato de dia, mês, hora e minuto.

## 14.4 Ler um arquivo: `<input type="file">` e a receita do `await`

Para ler, o usuário escolhe o arquivo num campo próprio:

```html
<label for="arquivo">Escolha um arquivo .txt</label>
<input type="file" id="arquivo" accept=".txt">
```

- `accept=".txt"` (ou `".csv"`) filtra os arquivos mostrados na janela;
- com `multiple`, a pessoa pode escolher **vários** de uma vez (Ctrl + clique).

Quando a pessoa escolhe, o campo dispara o evento **`change`**. A leitura em si é uma receita:

```javascript
// [RECEITA] LER O ARQUIVO ESCOLHIDO
// arquivo.text() demora um pouco (o arquivo precisa ser lido do disco):
// o "await" espera terminar. Toda função que usa await começa com "async".
async function lerArquivo(evento) {
    let arquivo = evento.target.files[0];      // o primeiro arquivo escolhido
    if (arquivo === undefined) {
        return;                                 // a pessoa cancelou a escolha
    }
    let texto = await arquivo.text();

    // daqui para baixo é lógica comum: o arquivo virou um TEXTO
    let linhas = texto.trim().split("\n");
    mostrarResultado("Arquivo: " + arquivo.name + "\nLinhas: " + linhas.length);
}

document.querySelector("#arquivo").addEventListener("change", lerArquivo);
```

Leia assim: **`async` + `await` são a parte da receita**. Ler do disco não é instantâneo; sem o `await`, a variável `texto` receberia uma "promessa de texto" em vez do texto. Depois do `await`, tudo é o que você já sabe: um texto, `split`, laços. Exemplo completo (conta as linhas e mostra a primeira) em [`exemplos/ler-txt/`](exemplos/ler-txt/).

`evento.target.files` é a lista dos arquivos escolhidos: `files[0]` é o primeiro, `files.length` é a quantidade, e cada um tem `.name` (o nome do arquivo).

## 14.5 Do texto para os objetos: `lerCsv`

Na aula 3 você viu que o `.csv` é uma **tabela em texto**: uma linha por registro, colunas separadas por `;`, a primeira linha é o **cabeçalho**. Dois `split` desmontam a tabela:

```javascript
let texto = "id;nome;capacidade\n1;Eletrotécnica;20\n2;Informática;30\n";
let linhas = texto.trim().split("\n");   // ["id;nome;capacidade", "1;Eletrotécnica;20", "2;Informática;30"]
let valores = linhas[2].split(";");      // ["2", "Informática", "30"]
```

A ideia do `lerCsv` é usar o **cabeçalho como nome das propriedades**, com o `objeto[campo]` da aula 11:

```
   linhas[0]  "id;nome;capacidade"   ── split(";") ──►  colunas = ["id", "nome", "capacidade"]
   linhas[2]  "2;Informática;30"     ── split(";") ──►  valores = ["2", "Informática", "30"]

                registro[colunas[0]] = valores[0]   →  registro["id"]         = "2"
                registro[colunas[1]] = valores[1]   →  registro["nome"]       = "Informática"
                registro[colunas[2]] = valores[2]   →  registro["capacidade"] = "30"

                registro = { id: "2", nome: "Informática", capacidade: "30" }
```

```javascript
// Texto de um .csv -> lista de objetos, usando o cabeçalho como nome dos campos
function lerCsv(texto) {
    let linhas = texto.replace("\uFEFF", "").trim().split("\n");
    let colunas = linhas[0].trim().split(";");
    let registros = [];
    for (let i = 1; i < linhas.length; i++) {   // começa em 1 para pular o cabeçalho
        let linha = linhas[i].trim();           // trim tira o \r que o Windows coloca
        if (linha !== "") {
            let valores = linha.split(";");
            let registro = {};
            for (let c = 0; c < colunas.length; c++) {
                registro[colunas[c]] = valores[c];
            }
            registros.push(registro);
        }
    }
    return registros;
}
```

- `replace("\uFEFF", "")` tira o BOM do começo (se houver) e `trim()` tira a linha vazia do fim;
- `linhas[0]` é o cabeçalho: vira a lista `colunas`;
- `registro[colunas[c]] = valores[c]` é o `objeto[coluna] = valor` do desenho.

O `lerCsv` é **genérico**: serve para `laboratorios.csv`, `cursos.csv`, `turmas.csv`, `professores.csv`, `reservas.csv` ou qualquer outro, porque não conhece as colunas de antemão. Ele as descobre no cabeçalho.

Repare que **todos os valores são texto** (`"30"`, não `30`). Converter é trabalho de quem chama, porque só ele sabe quais colunas são números (14.7).

## 14.6 Dos objetos para o texto: `gerarCsv`

O caminho de volta: uma lista de objetos e a ordem das colunas viram um texto `.csv`:

```javascript
// Lista de objetos -> texto .csv, só com as colunas pedidas
function gerarCsv(lista, colunas) {
    let texto = colunas.join(";") + "\n";
    for (let i = 0; i < lista.length; i++) {
        let valores = [];
        for (let c = 0; c < colunas.length; c++) {
            valores.push(lista[i][colunas[c]]);
        }
        texto = texto + valores.join(";") + "\n";
    }
    return texto;
}
```

A primeira linha é o cabeçalho (`colunas.join(";")`). O array `colunas` decide **quais** propriedades vão para o arquivo e em que **ordem**. Em [`exemplos/csv-alunos/`](exemplos/csv-alunos/), o programa carrega o `alunos.csv`, calcula a média de cada aluno e exporta `alunos-com-media.csv` com uma coluna a mais. O exemplo usa o mesmo `lerCsv` e o mesmo `gerarCsv`.

## 14.7 As armadilhas do `.csv`

Arquivos reais vêm do Excel, do Google Planilhas, do LibreOffice e do Bloco de Notas, cada um com as suas manias. Estas são as que mais quebram programas:

| Armadilha | O que acontece | Como tratar |
|---|---|---|
| **`\r\n` do Windows** | No Windows, cada linha termina com `\r\n`. O `split("\n")` deixa um `\r` invisível no fim: `"30\r"` não é igual a `"30"` | `trim()` em **cada linha** |
| **Linha vazia no fim** | Quase todo editor deixa um `\n` no fim; o `split` cria uma linha `""` e um registro vazio | `trim()` no **texto inteiro** e pular linha vazia |
| **Cabeçalho** | A linha 0 não é um registro; tratada como dado, vira um laboratório chamado "nome" | Laço começando em `i = 1` |
| **Número como texto** | Tudo que vem do arquivo é texto: `"30" > "4"` é **falso** (comparação de texto) e `"2" + "3"` dá `"23"` | `Number()` nas colunas numéricas antes de guardar |
| **Acentos quebrados** (`LaboratÃ³rio` ou `Laborat�rio`) | O arquivo foi lido ou salvo numa codificação diferente de UTF-8 | Na exportação, o BOM (`"\uFEFF"`) da receita; no Excel, salvar como **"CSV UTF-8"**; na leitura, `replace("\uFEFF", "")` |
| **Separador diferente** | Planilhas em inglês (e alguns Google Planilhas) salvam com `,` em vez de `;` | Conferir no Bloco de Notas; trocar o separador ao salvar |
| **Decimal com vírgula** | O Excel brasileiro mostra `8,5`; o `Number("8,5")` dá `NaN` | Usar ponto no arquivo, ou `replace(",", ".")` antes do `Number` |

A regra de ouro: **antes de culpar o código, abra o `.csv` no Bloco de Notas** (ou no VS Code) e olhe o texto de verdade.

A conversão com `Number` fica numa função por arquivo. Exemplo para os laboratórios:

```javascript
// O que vem do .csv é TEXTO: os números precisam de Number()
function importarLaboratorios(registros) {
    laboratorios = [];
    for (let i = 0; i < registros.length; i++) {
        laboratorios.push({
            id: Number(registros[i].id),
            nome: registros[i].nome,
            capacidade: Number(registros[i].capacidade)
        });
    }
}
```

## 14.8 Datas só para exibição: a receita `dataDoDia`

O sistema **não guarda datas**: guarda só o dia da semana (1 = segunda … 6 = sábado). A data real da **semana seguinte** aparece **apenas na tela** (e no nome do arquivo exportado), calculada por uma receita:

```javascript
// -----------------------------------------------------
// [RECEITA] SEMANA SEGUINTE: DATAS SÓ PARA MOSTRAR NA TELA
// O sistema guarda só o dia (1 a 6). Esta função descobre a
// data desse dia na SEMANA SEGUINTE ("01/12").
// -----------------------------------------------------
function dataDoDia(dia) {
    let hoje = new Date();
    let diasAteASegunda = (8 - hoje.getDay()) % 7;
    if (diasAteASegunda === 0) {
        diasAteASegunda = 7;
    }
    let data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + diasAteASegunda + dia - 1);
    let diaDoMes = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0");
    return diaDoMes + "/" + mes;
}

function textoDaSemana() {
    return "Reservas para a semana de " + dataDoDia(1) + " a " + dataDoDia(SABADO);
}
```

`dataDoDia(1)` devolve a data da segunda-feira da semana seguinte (por exemplo, `"30/11"`) e `textoDaSemana()` monta a frase "Reservas para a semana de 30/11 a 05/12". A turma não compara nem soma datas: quem faz conta com o calendário é a receita. Repare no `padStart(2, "0")` do 14.3: sem ele, 1º de dezembro sairia `"1/12"`.

O **comprovante `.txt`** da reserva (`AAAAMMDDTHHMM-PROFESSOR.txt`, como `20261123T1430-CARLAMENDES.txt`) usa as mesmas ferramentas: `padStart` e `baixarArquivo`. Ele é do microprojeto M7 (nova reserva), na aula 16.

## 14.9 Projeto da disciplina: microprojetos M3 e M4

### Passo 0. As receitas no `comum/`

Três trechos entram nos arquivos compartilhados do M0, porque mais de um microprojeto usa:

| Arquivo | O que acrescentar | Quem usa |
|---|---|---|
| `comum/dados.js` | a receita `baixarArquivo` (14.2), **antes** da última linha (`carregarDados();`) | M4 hoje e M7 (comprovante) na aula 16 |
| `comum/regras.js` | a receita `dataDoDia` e a `textoDaSemana` (14.8), no fim | M4 hoje, M7 e M8 na aula 16 |
| `comum/regras.js` | a `conferirVinculos` (M3, logo abaixo) | M3 hoje |

Teste no console do `comum/index.html`: `dataDoDia(1)` devolve a data da próxima segunda-feira, e `typeof baixarArquivo` devolve `"function"`.

### M3 · Importar os 5 `.csv`

O HTML entregue tem o campo `<input type="file" id="arquivos" accept=".csv" multiple>`, um `<p id="msg-importar">` para a mensagem e um `<pre id="avisos">` para os vínculos quebrados. Escreva `m3-importar/importar.js`.

**Parte 1. Ler e converter.** Comece com a `mostrarMensagem` (a mesma do M2), o `lerCsv` (14.5) e uma função `importar...` para cada um dos **5 arquivos**. A dos laboratórios está no 14.7; as de cursos, turmas e professores seguem o mesmo formato:

```javascript
function importarCursos(registros) {
    cursos = [];
    for (let i = 0; i < registros.length; i++) {
        cursos.push({ id: Number(registros[i].id), sigla: registros[i].sigla.toUpperCase(), nome: registros[i].nome });
    }
}

function importarTurmas(registros) {
    turmas = [];
    for (let i = 0; i < registros.length; i++) {
        turmas.push({
            id: Number(registros[i].id),
            nome: registros[i].nome.toUpperCase(),
            curso: Number(registros[i].curso),
            alunos: Number(registros[i].alunos)
        });
    }
}

function importarProfessores(registros) {
    professores = [];
    for (let i = 0; i < registros.length; i++) {
        professores.push({ id: Number(registros[i].id), nome: registros[i].nome });
    }
}
```

A **sigla** do curso e o **nome** da turma passam por `toUpperCase()`, como no cadastro: assim o Set de siglas e o "nome único" da turma continuam funcionando com um `.csv` escrito à mão. A importação **substitui** a lista inteira (`cursos = [];` no começo): o que estava antes some.

As reservas têm dois cuidados a mais:

```javascript
// As reservas importadas substituem as da semana: a fila e o
// "desfazer" das reservas antigas não fazem mais sentido.
function importarReservas(registros) {
    reservas = [];
    for (let i = 0; i < registros.length; i++) {
        reservas.push({
            id: Number(registros[i].id),
            professor: Number(registros[i].professor),
            turma: Number(registros[i].turma),
            laboratorio: Number(registros[i].laboratorio),
            dia: Number(registros[i].dia),
            turno: Number(registros[i].turno)
        });
    }
    // sort com comparador: a busca binária precisa das reservas em ordem de id
    reservas.sort(function (a, b) {
        return a.id - b.id;
    });
    listaDeEspera = [];
    historico = [];
}
```

**Parte 2. Escolher pelo nome do arquivo.** O **nome** do arquivo decide qual importação usar. Depois de qualquer importação, os atalhos (Map e Sets) são montados de novo a partir das listas:

```javascript
// Escolhe a importação pelo nome do arquivo. Devolve false se o nome não for conhecido.
function importarPeloNome(nomeDoArquivo, registros) {
    if (nomeDoArquivo === "laboratorios.csv") {
        importarLaboratorios(registros);
    } else if (nomeDoArquivo === "cursos.csv") {
        importarCursos(registros);
    } else if (nomeDoArquivo === "turmas.csv") {
        importarTurmas(registros);
    } else if (nomeDoArquivo === "professores.csv") {
        importarProfessores(registros);
    } else if (nomeDoArquivo === "reservas.csv") {
        importarReservas(registros);
    } else {
        return false;
    }
    atualizarIndices();
    return true;
}
```

E o próximo id? Depois de importar, o próximo cadastro **não pode repetir** um id que já existe. O `proximoId(lista)` do M0 já resolve: ele procura o maior id da lista **agora** e soma 1. É por isso que os contadores do CP5 saíram.

**Parte 3. Avisar os vínculos quebrados.** Cada `.csv` é um arquivo separado, e um pode citar um id que **não existe** no outro: uma turma do curso 99, uma reserva do professor 15. O navegador não confere isso sozinho (num banco de dados, a chave estrangeira conferiria). A regra fica no `regras.js`, porque ela só **decide** e devolve uma lista de avisos:

```javascript
function conferirVinculos() {
    let avisos = [];
    for (let i = 0; i < turmas.length; i++) {
        if (buscarPorId(cursos, turmas[i].curso) === null) {
            avisos.push("Turma " + turmas[i].nome + ": curso " + turmas[i].curso + " não existe.");
        }
    }
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (buscarPorId(professores, reserva.professor) === null) {
            avisos.push("Reserva " + reserva.id + ": professor " + reserva.professor + " não existe.");
        }
        if (buscarPorId(turmas, reserva.turma) === null) {
            avisos.push("Reserva " + reserva.id + ": turma " + reserva.turma + " não existe.");
        }
        if (buscarLaboratorio(reserva.laboratorio) === null) {
            avisos.push("Reserva " + reserva.id + ": laboratório " + reserva.laboratorio + " não existe.");
        }
    }
    return avisos;
}
```

No `importar.js`, quem **mostra** os avisos:

```javascript
function mostrarAvisosDeVinculo() {
    let avisos = conferirVinculos();
    if (avisos.length === 0) {
        document.querySelector("#avisos").textContent = "";
    } else {
        document.querySelector("#avisos").textContent = "ATENÇÃO: confira os arquivos.\n" + avisos.join("\n");
    }
}
```

O sistema **avisa, mas não recusa**: o professor pode importar as turmas agora e os cursos depois. Enquanto isso, a tela não quebra, porque as funções `nomeDaTurma`, `siglaDoCurso`... do `dados.js` mostram "(curso 99 não cadastrado)" no lugar do nome.

**Parte 4. A receita da leitura e o evento.** Para cada arquivo escolhido: ler o texto (com `await`), transformar em registros e importar pelo nome. No fim, salvar no navegador e mostrar o resultado:

```javascript
// [RECEITA] ler arquivos escolhidos: o "await" espera o arquivo terminar de carregar
async function carregarArquivos(evento) {
    let arquivos = evento.target.files;
    let mensagem = "Importados:";
    for (let i = 0; i < arquivos.length; i++) {
        let texto = await arquivos[i].text();
        let registros = lerCsv(texto);
        if (importarPeloNome(arquivos[i].name, registros)) {
            mensagem = mensagem + " " + arquivos[i].name + " (" + registros.length + ")";
        } else {
            mensagem = mensagem + " [ignorado: " + arquivos[i].name + "]";
        }
    }
    salvarDados();
    mostrarMensagem("#msg-importar", mensagem);
    mostrarAvisosDeVinculo();
}


document.querySelector("#arquivos").addEventListener("change", carregarArquivos);
```

O M3 é uma seção de **ação**: ela não mostra nenhuma lista, então não tem `atualizarX()` nem `atualizarTela()`. Para ver o resultado da importação, abra o M1 ou o M2: eles carregam o `localStorage` ao abrir.

**O M3 está pronto quando:**

- [ ] escolher os 5 arquivos da pasta `dados/` (Ctrl + clique) mostra "Importados: cursos.csv (10) laboratorios.csv (5) professores.csv (4) reservas.csv (4) turmas.csv (10)" (a ordem pode mudar) e nenhum aviso;
- [ ] um arquivo com outro nome (por exemplo, `alunos.csv` da aula) aparece como `[ignorado: alunos.csv]`;
- [ ] depois de importar só o `cursos.csv` com uma linha a mais (`11;DSW;Desenvolvimento Web`), o DSW aparece no M2;
- [ ] no console, `typeof reservas[0].id` devolve `"number"` (o `Number()` funcionou).

```bash
git add .
git commit -m "feat: importa os 5 arquivos csv e avisa vinculos quebrados (M3)"
git push
```

### M4 · Exportar as reservas e restaurar

O HTML entregue tem os botões `#btn-exportar-reservas` e `#btn-restaurar` e um `<p id="msg-exportar">`. A **única** exportação do sistema é a das reservas da semana: laboratórios, cursos, turmas e professores não são exportados. O arquivo se chama `reservas-semana-DD-MM.csv`, em que `DD-MM` é a data da **segunda-feira** da semana seguinte. Escreva `m4-exportar-e-restaurar/exportar.js`:

```javascript
function mostrarMensagem(seletor, texto) {
    document.querySelector(seletor).textContent = texto;
}

// Lista de objetos -> texto .csv, só com as colunas pedidas
function gerarCsv(lista, colunas) {
    let texto = colunas.join(";") + "\n";
    for (let i = 0; i < lista.length; i++) {
        let valores = [];
        for (let c = 0; c < colunas.length; c++) {
            valores.push(lista[i][colunas[c]]);
        }
        texto = texto + valores.join(";") + "\n";
    }
    return texto;
}

// Ex.: reservas-semana-30-11.csv (a segunda-feira da semana seguinte)
function nomeDoArquivoDeReservas() {
    return "reservas-semana-" + dataDoDia(1).replace("/", "-") + ".csv";
}

function exportarReservas() {
    let colunas = ["id", "professor", "turma", "laboratorio", "dia", "turno"];
    let nome = nomeDoArquivoDeReservas();
    baixarArquivo(nome, gerarCsv(ordenarPorDiaETurno(reservas), colunas));   // bubble sort do regras.js
    mostrarMensagem("#msg-exportar", "Arquivo " + nome + " gerado com " + reservas.length + " reservas.");
}

function restaurar() {
    if (confirm("Apagar os dados salvos neste navegador e voltar aos dados de exemplo?")) {
        restaurarDadosIniciais();
        mostrarMensagem("#msg-exportar", "Dados iniciais restaurados.");
    }
}


document.querySelector("#btn-exportar-reservas").addEventListener("click", exportarReservas);
document.querySelector("#btn-restaurar").addEventListener("click", restaurar);
```

Quatro detalhes:

- as colunas são as mesmas do `reservas.csv` de entrada, **na mesma ordem**: assim o arquivo exportado pode ser importado de novo no M3;
- as reservas saem em ordem de dia e turno, com o bubble sort `ordenarPorDiaETurno` da aula 12 (que devolve uma **cópia**: a lista `reservas` continua em ordem de id);
- a barra de `"30/11"` vira hífen, porque `/` não pode aparecer em nome de arquivo;
- o "Restaurar dados iniciais" é o "botão de pânico" dos testes: a `restaurarDadosIniciais` do M0 já existia; aqui ela ganha o botão e o `confirm`.

**O M4 está pronto quando:**

- [ ] o botão baixa `reservas-semana-DD-MM.csv` com a data da próxima segunda-feira;
- [ ] aberto no Bloco de Notas, o arquivo tem o cabeçalho `id;professor;turma;laboratorio;dia;turno` e as reservas na ordem 2, 3, 1, 4 (segunda de manhã, terça à tarde, quarta à noite, quinta à noite);
- [ ] aberto no Excel ou no Planilhas, as colunas aparecem separadas e sem acento quebrado;
- [ ] "Restaurar dados iniciais" pede confirmação e, depois dele, um curso cadastrado no M2 some.

```bash
git add .
git commit -m "feat: exporta as reservas da semana e restaura os dados iniciais (M4)"
git push
```

**Teste de ida e volta (M2 + M3 + M4):** cadastre um curso no M2; importe `dados/cursos.csv` no M3 e veja o curso novo sumir (a importação **substitui** a lista); exporte as reservas no M4, restaure os dados iniciais, renomeie o arquivo exportado para `reservas.csv` e importe no M3: as 4 reservas voltam, sem aviso.

## 14.10 Erros comuns

| Sintoma | Causa |
|---|---|
| O arquivo baixado está vazio ou com `undefined` | O texto foi montado com uma variável errada; teste o texto com `console.log` antes de baixar |
| `baixarArquivo is not defined` | A receita não foi colada no `comum/dados.js` (ou ficou **depois** de um erro que parou o arquivo) |
| `dataDoDia is not defined` ou `conferirVinculos is not defined` | Faltou colar no `comum/regras.js` |
| `texto.split is not a function` | Faltou o `await` em `arquivo.text()`: a variável recebeu uma "promessa", não o texto |
| `await is only valid in async functions` | A função que usa `await` não começa com `async` |
| Um laboratório chamado "nome" com capacidade "capacidade" | O laço do `lerCsv` começou em `i = 0` (leu o cabeçalho como dado) |
| Um registro com tudo `undefined` no fim | Linha vazia no fim do arquivo: faltou `trim()` no texto ou o `if (linha !== "")` |
| Depois de importar, `buscarPorId` não acha nada e aparece "(turma 6 não cadastrada)" | O id ficou texto (`"6"`): `"6" === 6` é falso. Faltou `Number()` |
| A última coluna não bate (`"30\r"`) | Arquivo do Windows: faltou `trim()` em cada linha |
| `LaboratÃ³rio` no Excel | O arquivo foi aberto sem saber que é UTF-8: falta o BOM na exportação |
| A primeira coluna se chama `"\uFEFFid"` e `registro.id` dá `undefined` | Leitura de um arquivo com BOM sem o `replace("\uFEFF", "")` e sem `trim()` no cabeçalho (o `trim` também remove o BOM) |
| `[ignorado: reservas-semana-30-11.csv]` ou `[ignorado: cursos (1).csv]` | A importação decide pelo **nome**: renomeie para `reservas.csv`, `cursos.csv`... |
| Importei, mas o M2 não mudou | O M2 já estava aberto: aperte F5 nele (cada página carrega o `localStorage` ao abrir) |
| Depois de importar o `cursos.csv`, uma sigla repetida passa no M2 | Faltou o `atualizarIndices()` no `importarPeloNome` (o Set de siglas ficou com os cursos antigos) |
| Escolhi o mesmo arquivo de novo e nada aconteceu | O `change` só dispara quando a escolha **muda**: aperte F5 e escolha de novo |

## 14.11 Exercícios em aula

1. **Frase em arquivo.** Rode `exemplos/baixar-txt/`. Abra o `frase.txt` baixado no Bloco de Notas. Depois faça o arquivo ter a frase **três vezes**, uma por linha.
2. **Contar palavras.** No exemplo `ler-txt`, mostre também quantas **palavras** o arquivo tem (dica: `split(" ")` em cada linha não vazia).
3. **`padStart` à mão.** Sem rodar, escreva o resultado de: `String(5).padStart(2, "0")`, `"Lab".padEnd(6, "*")`, `String(123).padStart(2, "0")`. Depois confira no console.
4. **Lista de alunos em `.csv`.** Crie um array de objetos `{ nome, turma, nota }` com 4 alunos e baixe `alunos.csv` com o `gerarCsv`. Abra no Excel ou no Planilhas e confira as colunas e os acentos (use um nome com acento).
5. **Teste de mesa do `lerCsv`.** Para o texto `"nome;idade\r\nAna;17\r\nBia;18\r\n"`, escreva o valor de `linhas`, `colunas` e de cada `registro` criado. O que aconteceria sem o `trim()` da linha?
6. **(Projeto) Número vindo do arquivo.** Copie `dados/turmas.csv` para fora do repositório, mude o número de alunos da `DSI02` para `35` e importe a cópia no M3. No console do M0 (`comum/index.html`), rode `motivoDaRecusa(buscarPorId(turmas, 6), buscarLaboratorio(2), 1, 2)`. A regra da capacidade funcionou com o número vindo do arquivo? No fim, clique em "Restaurar dados iniciais" no M4.
7. **(Projeto) Ida e volta com uma reserva nova.** No console do M0, rode `adicionarReserva({ id: 0, professor: 1, turma: 9, laboratorio: 3, dia: 5, turno: 1 }); salvarDados()`. Exporte no M4 e confira no Bloco de Notas: em que posição a reserva nova aparece, e por quê? Depois restaure, renomeie o arquivo para `reservas.csv` e importe no M3. A reserva nova voltou?

## 14.12 Desafio para a próxima aula

**Uma turma de um curso que não existe.** Faça o `conferirVinculos` trabalhar:

- copie `dados/turmas.csv` para **fora** do repositório (por exemplo, na Área de Trabalho), sem mudar o nome do arquivo;
- no Bloco de Notas, acrescente no fim a linha `11;XYZ01;99;20` (a turma XYZ01 do curso 99, que não existe);
- importe a cópia no M3 e mostre o aviso. Anote o texto exato que apareceu;
- responda: (a) por que o sistema **avisa** e não **recusa** a importação? (b) o que `siglaDoCurso(99)` devolve no console, e por que essa função existe? (c) copie também o `dados/cursos.csv`, acrescente a linha `99;XYZ;Curso de teste` e importe: o aviso some?
- no fim, clique em "Restaurar dados iniciais" no M4.

## 14.13 Resumo

- O navegador só **lê** o que o usuário escolhe e só **gera** arquivos novos (download); não regrava o original. Daí a necessidade de banco de dados e back-end;
- Gerar: montar o texto com `"\n"` e chamar a receita `baixarArquivo(nome, texto)` (no `comum/dados.js`). Não usa `await`;
- Ler: `<input type="file" multiple>` + evento `change` + receita `async` / `await arquivo.text()`;
- `lerCsv`: `trim` + `split("\n")` + cabeçalho + `split(";")` + `registro[colunas[c]] = valores[c]`; laço desde `i = 1`;
- `gerarCsv(lista, colunas)`: o caminho de volta, com `join(";")`;
- Armadilhas: `\r\n` → `trim` em cada linha; linha vazia → `trim` no texto; cabeçalho → `i = 1`; número como texto → `Number`; acentos → BOM e "CSV UTF-8";
- Datas só para exibir: receita `dataDoDia` (no `comum/regras.js`), com `padStart(2, "0")`;
- M3: `importarPeloNome` escolhe a importação pelo nome do arquivo; `atualizarIndices()` depois de importar; `conferirVinculos` avisa ids que não existem;
- M4: `reservas-semana-DD-MM.csv` em ordem de dia e turno; "Restaurar dados iniciais" com `confirm`.
