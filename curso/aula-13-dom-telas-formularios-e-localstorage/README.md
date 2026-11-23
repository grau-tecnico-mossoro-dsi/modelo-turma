**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-12-js-matrizes-busca-e-ordenacao/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-14-arquivos-txt-e-csv/README.md)

---

# AULA 13 — DOM, formulários e localStorage: microprojetos M0, M1 e M2

## Objetivos da aula

- Entender o **DOM**: o JavaScript enxerga a página como objetos;
- Encontrar elementos com `querySelector` e trocar o texto com `textContent`;
- Reagir a cliques com `addEventListener("click", nomeDaFuncao)`;
- Ler formulários (`input`, `select`, `.value`) e tratar o envio com `submit` + `preventDefault`;
- Criar as opções de um `select` com `createElement`;
- Carregar **vários `<script>`** na mesma página, na ordem certa: `dados.js`, `regras.js` e o `.js` da seção;
- Trocar `alert` por funções que **devolvem** um resultado;
- Salvar os dados no navegador com `localStorage` (`JSON.stringify` / `JSON.parse` como receita), sabendo que **Map e Set não viram JSON**;
- No projeto: fazer os microprojetos **M0** (separar o CP5 em `dados.js` e `regras.js`), **M1** (laboratórios) e **M2** (cursos).

## 13.1 O problema: o sistema vive dentro de caixinhas

Até a aula 12, o sistema conversou com o usuário por `prompt` e `alert`. Funciona, mas:

- a pessoa não vê o calendário da semana enquanto faz uma reserva nova;
- um erro de digitação no 6º `prompt` obriga a recomeçar tudo;
- nenhum sistema de verdade funciona assim. O app de agenda da escola é uma página com o formulário "Nova reserva" e o calendário da "Próxima semana", lado a lado.

A partir de hoje, a **regra de negócio** (que ficou pronta no CP5) continua a mesma. O que muda é a **conversa com o usuário**: botões, campos e texto na própria página.

```
   ATÉ A AULA 12                          A PARTIR DE HOJE
   prompt("Sigla do curso:")        ──►   <input id="curso-sigla">  +  .value
   escolherNaLista("Curso:", ...)   ──►   <select id="curso-escolhido">  +  .value
   alert("Cadastrado!")             ──►   #msg-cursos.textContent = "Cadastrado!"
   menu em do...while               ──►   botões + addEventListener
```

Não vamos montar as telas inteiras de uma vez. Cada **seção** de tela vira um **microprojeto**: uma página pequena que faz uma coisa só. O professor entrega o HTML e o CSS; **você escreve o `.js`**. Hoje são três: M0, M1 e M2.

## 13.2 O DOM: a página vista como objetos

Quando o navegador abre o HTML, ele cria um **objeto** para cada tag. Esse conjunto de objetos se chama **DOM** (*Document Object Model*), e a porta de entrada é o objeto `document`.

```
   index.html                                   DOM (na memória do navegador)

   <body>                                                body
     <h1>Contador</h1>                                 /   |    \
     <p>Cliques: <strong id="total">0</strong></p>   h1    p     button#btn-mais
     <button id="btn-mais">+1</button>                     |
   </body>                                           strong#total → texto "0"
```

Duas ferramentas resolvem quase tudo nesta disciplina:

```javascript
let total = document.querySelector("#total");   // encontra pelo id (o # quer dizer "id")
total.textContent = "5";                         // troca o texto que aparece na tela
```

- `querySelector("#total")` devolve o objeto do elemento com `id="total"`, ou **`null`** se não existir;
- `textContent` é o texto do elemento. Mudou o `textContent`, mudou a tela.

O JavaScript **não altera o arquivo** `index.html`. Ele altera os objetos na memória, e o navegador redesenha a tela. Por isso tudo volta ao original no F5 (o 13.8 resolve isso).

**Onde fica o `<script>`?** No `<head>`, com **`defer`**: o navegador só roda o script depois de ler o HTML inteiro. Sem o `defer`, o script rodaria antes de o `<body>` existir, e todo `querySelector` devolveria `null`.

```html
<script src="contador.js" defer></script>
```

## 13.3 Eventos: `addEventListener`

O script roda **uma vez**, quando a página abre. Para algo acontecer **depois**, no clique, entregamos ao botão o **nome de uma função**:

```javascript
let cliques = 0;

function somarUm() {
    cliques = cliques + 1;
    document.querySelector("#total").textContent = cliques;
}

document.querySelector("#btn-mais").addEventListener("click", somarUm);
```

Leia a última linha como: "botão `#btn-mais`, quando acontecer um `click`, rode a função `somarUm`".

**Sem parênteses!** Compare:

```
   addEventListener("click", somarUm)     entrega a RECEITA: o navegador roda a cada clique   ✓
   addEventListener("click", somarUm())   roda a função AGORA, uma vez, e entrega o resultado  ✗
```

É como entregar a receita do bolo para alguém fazer depois, em vez de fazer o bolo agora e entregar o bolo. Exemplo completo em [`exemplos/contador/`](exemplos/contador/).

## 13.4 Formulários: `input`, `select`, `.value` e `submit`

Um formulário junta os campos e o botão de enviar:

```html
<form id="form-soma">
    <p>
        <label for="numero1">Primeiro número</label>
        <input id="numero1">
    </p>
    <p>
        <label for="numero2">Segundo número</label>
        <input id="numero2">
    </p>
    <button type="submit">Somar</button>
</form>
<p id="resultado"></p>
```

O `<label for="numero1">` liga o texto ao campo de `id="numero1"`: clicar no texto coloca o cursor no campo, e leitores de tela anunciam o nome certo. Sempre use `label`.

Ao clicar em **Somar** (ou apertar Enter), o formulário dispara o evento **`submit`**. O comportamento padrão do navegador é **recarregar a página**, e o resultado sumiria na hora. O `evento.preventDefault()` cancela isso:

```javascript
function somar(evento) {
    evento.preventDefault();   // sem isso a página recarrega e o resultado some

    let texto1 = document.querySelector("#numero1").value.trim();
    let texto2 = document.querySelector("#numero2").value.trim();

    if (texto1 === "" || texto2 === "") {
        mostrarResultado("Preencha os dois números.");
        return;
    }
    let numero1 = Number(texto1);
    let numero2 = Number(texto2);
    if (isNaN(numero1) || isNaN(numero2)) {
        mostrarResultado("Digite apenas números.");
        return;
    }
    mostrarResultado(numero1 + " + " + numero2 + " = " + (numero1 + numero2));
}

document.querySelector("#form-soma").addEventListener("submit", somar);
```

Três detalhes:

1. O navegador chama `somar` passando um objeto com informações do evento; chamamos esse parâmetro de `evento`;
2. **`.value` é sempre texto**, como o `prompt`. Sem `Number()`, `"2" + "3"` dá `"23"` (a armadilha da aula 8);
3. A validação é a mesma de antes. Só que, em vez de perguntar de novo com um laço, mostramos a mensagem e esperamos o próximo envio.

Os botões que **não** enviam o formulário levam `type="button"` e são ligados com `"click"`. O **`select`** funciona igual ao `input`: o `.value` é o `value` da `<option>` escolhida (também texto). Veja o conversor de temperatura em [`exemplos/conversor-temperatura/`](exemplos/conversor-temperatura/) e o formulário de soma em [`exemplos/formulario-soma/`](exemplos/formulario-soma/).

### O select substitui a lista numerada

No CP5, a pessoa escolhia "3" numa lista de texto e o `escolherNaLista` conferia a faixa. Com um `select`, ela **nem consegue** escolher algo fora da lista. As opções são criadas pelo JavaScript, a partir das listas de objetos. Cada `<option>` guarda o **id** no `value` e mostra o **nome** no texto:

```javascript
// Cria um <option> e coloca dentro do <select>
function adicionarOpcao(select, valor, texto) {
    let opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = texto;
    select.appendChild(opcao);
}
```

```html
<select id="curso-escolhido">
    <option value="1">ADM - Administração</option>    ← .value = "1" (o id, como texto)
    <option value="3">DSI - Desenvolvimento de sistemas</option>
</select>
```

- `document.createElement("option")` cria uma tag nova, ainda fora da página;
- `select.appendChild(opcao)` coloca a tag dentro do `select`: agora ela aparece;
- `select.textContent = ""` apaga **todas** as opções. Use antes de montar a lista de novo, senão as opções se acumulam a cada cadastro.

Para achar o objeto escolhido: `buscarPorId(cursos, Number(select.value))`. O `Number()` é obrigatório: o id na lista é número, e `3 === "3"` é falso.

> Um select que muda outro select (escolheu o curso, o select de turma mostra só as turmas dele) usa o evento `"change"`. Ele é da **aula 16**, no microprojeto M7 (nova reserva). Se quiser adiantar, o exemplo está em [`exemplos/curso-e-turma/`](exemplos/curso-e-turma/).

## 13.5 Por que só `textContent`

Existe outra propriedade, `innerHTML`, que interpreta o texto como **HTML**. Com um dado digitado pelo usuário, isso é perigoso. Se alguém cadastrar um curso com o nome:

```
<img src=x onerror="alert('invadido')">
```

com `innerHTML` o navegador cria a imagem e **roda o código** escrito ali. Esse ataque se chama **XSS** (*Cross-Site Scripting*): o "dado" vira programa. Com `textContent`, o mesmo nome aparece na tela **como texto**, inofensivo. Regra da disciplina: **na tela, só `textContent`**. Até as opções do `select` são criadas com `createElement` + `textContent`.

Para mostrar listas com uma linha por item, use um `<pre>`: ele respeita o `"\n"` do texto, como o `alert` fazia.

## 13.6 Vários `<script>` na mesma página

O sistema tem regras e dados que **todas** as seções usam: a lista de cursos, o `buscarPorId`, o `siglaJaExiste`... Em vez de copiar isso em cada página, separamos em dois arquivos **compartilhados**, carregados **antes** do `.js` da seção:

```
   comum/dados.js   ← constantes, listas de dados, Map/Set, salvar/carregar (localStorage)
   comum/regras.js  ← validação, vínculos, regras da reserva, fila, pilha, calendário, ordenação, busca
        ▲                     ▲                     ▲
        │                     │                     │
   m1-laboratorios/      m2-cursos/            m3-importar/ ...
   laboratorios.js       cursos.js             importar.js
```

Este é o `<head>` do microprojeto M2, entregue pronto:

```html
<!-- ordem: dados.js, regras.js (os dois feitos por você no M0) e o .js desta seção -->
<script src="../comum/dados.js" defer></script>
<script src="../comum/regras.js" defer></script>
<script src="cursos.js" defer></script>
```

Com `defer`, os scripts rodam **na ordem em que aparecem**. As variáveis e funções criadas num script ficam visíveis para os scripts **seguintes** da mesma página. O `regras.js` usa as listas e os índices que o `dados.js` cria (`turmas`, `siglasCadastradas`...); o `cursos.js` usa os dois. Trocou a ordem? O console mostra `cursos is not defined`.

**Por que não um `.js` único para tudo?** Porque cada página tem botões diferentes. Imagine um `script.js` único carregado no M1:

```javascript
document.querySelector("#form-curso").addEventListener("submit", cadastrarCurso);
```

O formulário `#form-curso` só existe no M2. No M1, `querySelector` devolve `null`, e o console mostra:

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

O script **para na hora**, e as linhas seguintes também deixam de rodar. Com um `.js` por seção, cada script só liga os botões que existem na sua página.

**E por que dois compartilhados, e não um?** Para separar **o que o sistema guarda** (`dados.js`) de **o que o sistema decide** (`regras.js`). As regras não mexem na tela: recebem valores e **devolvem** respostas (`true`/`false`, uma lista, uma mensagem). Quem decide onde mostrar é o `.js` da seção.

O exemplo [`exemplos/duas-telas/`](exemplos/duas-telas/) usa a mesma organização, com uma lista de alunos: `dados.js` (lista + salvar/carregar), `regras.js` (`notaValida`, `textoDoAluno`) e um script por página.

## 13.7 Onde foram parar os `alert`: funções que devolvem

No CP5, as regras falavam direto com o usuário. Por exemplo, a `atenderListaDeEspera` fazia um `alert("Lista de espera: a reserva passou para ...")`. Mas, numa página, o aviso precisa aparecer **num lugar da página**, e cada seção tem o seu lugar. Por isso, no `regras.js`, a função passa a **devolver** a mensagem:

```javascript
// FILA: o primeiro da lista de espera com o horário livre assume.
// Devolve uma mensagem (ou "" se ninguém assumiu).
function atenderListaDeEspera() {
    for (let i = 0; i < listaDeEspera.length; i++) {
        let pedido = listaDeEspera[i];
        if (horarioLivre(pedido.laboratorio, pedido.dia, pedido.turno)) {
            listaDeEspera.splice(i, 1);
            adicionarReserva(pedido);
            return " A reserva passou para Prof. " + nomeDoProfessor(pedido.professor) + " (lista de espera).";
        }
    }
    return "";
}
```

E a seção junta e mostra: `mostrarMensagem("#msg-cancelar", "Reserva cancelada." + atenderListaDeEspera());` (é o que o M9 faz, na aula 16). É o `return` x `alert` da aula 10 de novo: quem **calcula** devolve; quem **mostra** é outra função.

Do mesmo jeito, as regras da reserva viram uma função só, que devolve `""` (pode reservar) ou o **motivo** da recusa:

```javascript
// Devolve "" se a reserva pode ser feita, ou o motivo da recusa.
// O conflito de horário fica de fora: nele, o professor pode
// entrar na lista de espera.
function motivoDaRecusa(turma, laboratorio, dia, turno) {
    if (turnoPermitido(dia, turno) === false) {
        return "No sábado, só o turno da manhã.";
    }
    if (turmaCabe(turma, laboratorio) === false) {
        return "A turma não cabe: " + turma.nome + " tem " + turma.alunos + " alunos e " +
            laboratorio.nome + " tem " + laboratorio.capacidade + " lugares.";
    }
    return "";
}
```

## 13.8 localStorage: os dados sobrevivem ao F5 e à troca de página

Ao abrir outra página (ou apertar F5), o JavaScript **recomeça do zero**: todas as variáveis voltam ao valor inicial. Um curso cadastrado no M2 não apareceria em nenhum outro microprojeto.

O **`localStorage`** é um espaço do navegador para guardar dados que ficam lá mesmo depois de fechar a aba. Ele funciona como um armário de gavetas com etiqueta (a **chave**):

```javascript
localStorage.setItem("aula13.contador", "5");      // guarda o texto "5" na gaveta "aula13.contador"
let texto = localStorage.getItem("aula13.contador"); // "5"  (ou null se a gaveta estiver vazia)
```

O `localStorage` **só guarda texto**. Para guardar uma lista de objetos, usamos uma **receita** com duas funções prontas (versão do exemplo `duas-telas`):

```javascript
// [RECEITA] o localStorage só guarda TEXTO:
// JSON.stringify transforma a lista em texto; JSON.parse faz o caminho de volta.
function salvarDados() {
    localStorage.setItem(CHAVE_DO_NAVEGADOR, JSON.stringify(alunos));
}

function carregarDados() {
    let texto = localStorage.getItem(CHAVE_DO_NAVEGADOR);
    if (texto === null) {      // primeira vez: nada salvo ainda
        alunos = [];
        return;
    }
    alunos = JSON.parse(texto);
}
```

```
   [{ nome: "Ana", nota: 8.5 }]  ── JSON.stringify ──►  '[{"nome":"Ana","nota":8.5}]'  ──► localStorage
   [{ nome: "Ana", nota: 8.5 }]  ◄──── JSON.parse ────  '[{"nome":"Ana","nota":8.5}]'  ◄── localStorage
```

O fluxo de toda página fica assim: ao abrir, `carregarDados()`; a cada alteração, `salvarDados()`. Teste em [`exemplos/duas-telas/`](exemplos/duas-telas/): cadastre alunos em `cadastro.html`, clique em **Lista** e veja-os lá. Aperte F5: continuam lá.

O mesmo vale para os microprojetos: todos abrem no **mesmo Live Server**, então o `localStorage` é o mesmo. Um curso cadastrado no M2 aparece no M5 (turmas) e no M7 (nova reserva).

Para **ver** o que está salvo: F12 → aba **Application** (no Firefox, **Armazenamento**) → **Local Storage**. Dá para apagar uma chave por lá.

**Map e Set não viram JSON.** Faça o teste no console:

```javascript
JSON.stringify(new Map([[1, "Manhã"]]))    // "{}"   ← os dados sumiram, sem nenhum erro!
JSON.stringify(new Set(["ADM", "BCV"]))    // "{}"
JSON.stringify(["ADM", "BCV"])             // '["ADM","BCV"]'   ← array funciona
```

É por isso que, desde a aula 12, a **lista** é a fonte e o Map/Set é só um **atalho**: salvamos as listas e, ao carregar, montamos os atalhos de novo.

**Cuidados:**

- os dados ficam **neste navegador, neste computador**. Em outra máquina do laboratório (ou em outro navegador), eles não aparecem. Guardar dados para todos os computadores é trabalho de **banco de dados** num servidor, assunto das próximas disciplinas;
- use uma chave com o nome do projeto (`aula13.alunos`) para não misturar com outros projetos abertos no mesmo Live Server. No projeto, a chave leva o nome da **sua pasta** (`reservaLab.joao-lucas`): na aula 18, o app de toda a turma fica no mesmo endereço do GitHub Pages e divide o mesmo `localStorage`. Com o nome da pasta na chave, os dados de um colega não apagam os seus;
- `getItem` devolve `null` na primeira vez: trate esse caso, como na receita.

## 13.9 Projeto da disciplina: microprojetos M0, M1 e M2

### Preparar a pasta

O trabalho do CP6 (aulas 13 a 16) fica numa branch só sua. No terminal, dentro de `alunos/<sua-pasta>/`, traga as novidades da `main` e crie a branch:

```bash
git switch main
git pull
git switch -c joao-lucas/cp6
```

Troque `joao-lucas` pelo nome da sua pasta. Depois, copie a pasta `microprojetos/` que o professor entregou (`projeto/para-os-alunos/microprojetos/`) para dentro da sua pasta:

```bash
cp -r ../../projeto/para-os-alunos/microprojetos .
```

Ela só tem HTML e CSS:

```
alunos/joao-lucas/
├── prompt/                     index.html + script.js (o CP5 continua aqui)
└── microprojetos/
    ├── index.html  estilo.css  (entregues: a lista dos microprojetos)
    ├── comum/
    │   ├── index.html          (entregue: página de teste do M0)
    │   ├── dados.js            ← você escreve hoje (M0)
    │   └── regras.js           ← você escreve hoje (M0)
    ├── m1-laboratorios/        index.html (entregue) + laboratorios.js ← hoje (M1)
    ├── m2-cursos/              index.html (entregue) + cursos.js       ← hoje (M2)
    └── m3-importar/ … m9-cancelar-e-espera/   (próximas aulas)
```

Abra `microprojetos/index.html` com o **Live Server**. Cada link leva a um microprojeto; a frase em destaque no topo de cada página diz o que fazer.

### M0 · Comum: separar o CP5 em `dados.js` e `regras.js`

O `script.js` do CP5 tem três tipos de função misturados: as que **guardam dados**, as que **decidem** (regras) e as que **conversam** com o usuário (`prompt`, `alert`, menus). Hoje separamos:

| Vai para | O que leva do CP5 | O que é novo ou muda |
|---|---|---|
| `comum/dados.js` | `DIAS`, `SABADO`, `MANHA`, `MAXIMO_DE_ALUNOS`, `TURNOS`; as listas; `listaDeEspera` e `historico`; `laboratoriosPorId`, `siglasCadastradas`, `horariosOcupados`, `chaveDoHorario`, `atualizarSiglas`, `atualizarHorariosOcupados`; `buscarPorId`, `buscarLaboratorio` | `CHAVE_DO_NAVEGADOR`; listas começando vazias + `usarDadosIniciais()`; `atualizarLaboratoriosPorId()` e `atualizarIndices()`; **[RECEITA]** `salvarDados`, `carregarDados`, `restaurarDadosIniciais`; `proximoId(lista)` no lugar dos contadores `proximoIdCurso`...; `nomeDaTurma`, `nomeDoProfessor`, `nomeDoLaboratorio`, `siglaDoCurso`; `carregarDados()` na última linha |
| `comum/regras.js` | `somenteDigitos`, `siglaValida`, `nomeCompleto`, `siglaJaExiste`, `turmaJaExiste`, `cursoTemTurma`, `turmaTemReserva`, `professorTemReserva`, `turmaCabeNasReservas`, `turmasDoCurso`, `turnoPermitido`, `turmaCabe`, `horarioLivre`, `adicionarReserva`, `removerReserva`, `copiarLista`, `ordenarPorNome`, `reservaVemDepois`, `ordenarPorDiaETurno`, `buscaLinearPorId`, `buscaBinariaPorId` | `alunosValidos(texto)` (o "1 a 60" para um campo de texto); `motivoDaRecusa` (nova); `atenderListaDeEspera` e `desfazerUltimaReserva` passam a **devolver** a mensagem; `montarCalendario()` no lugar da `montarGrade(idLaboratorio)` |
| **Fica para trás** | `lerNumero`, `lerTexto`, `escolherNaLista`, `lerSigla`, `lerNomeDaTurma`, `lerAlunos`, `lerNomeCompleto`, `estaNaFaixa`, os `textoDo...` e `listaDe...`, os `cadastrar...`/`alterar...`/`excluir...` com `prompt`, `novaReserva`, `mostrarCalendario`, `cancelarReserva`, `verReservas`, `verListaDeEspera`, `buscarReservaPeloNumero` e os menus | Elas usam `prompt`/`alert`. Cada uma volta, **reescrita com formulário**, no microprojeto da sua seção (M2 a M9). O CP5 continua na pasta `prompt/` e no histórico do Git |

**Passo 1. O `dados.js`.** As listas começam **vazias**. Os dados de exemplo do CP5 vão para uma função, usada na primeira vez e no botão "Restaurar dados iniciais" (aula 14):

```javascript
const CHAVE_DO_NAVEGADOR = "reservaLab.joao-lucas";

let laboratorios = [];
let cursos = [];
let turmas = [];
let professores = [];
let reservas = [];
let listaDeEspera = [];   // FILA
let historico = [];       // PILHA (ids das reservas)

// Dados de exemplo: os mesmos dos .csv da pasta dados/.
// Usados na primeira vez e no "Restaurar dados iniciais".
function usarDadosIniciais() {
    laboratorios = [
        { id: 1, nome: "Eletrotécnica", capacidade: 20 },
        { id: 2, nome: "Informática", capacidade: 30 },
        // ... os 5 laboratórios, 10 cursos, 10 turmas, 4 professores e 4 reservas do CP5
    ];
    // ...
    listaDeEspera = [];
    historico = [];
    atualizarIndices();
}
```

No CP5, o Map `laboratoriosPorId` era montado uma vez só, porque os laboratórios nunca mudavam. Agora eles podem mudar (na aula 14, ao importar o `laboratorios.csv`), então o laço vira a função `atualizarLaboratoriosPorId()`, igual às outras `atualizar...`. Uma função nova chama as três:

```javascript
function atualizarIndices() {
    atualizarLaboratoriosPorId();
    atualizarSiglas();
    atualizarHorariosOcupados();
}
```

Depois, a receita do `localStorage`, guardando **só as listas**:

```javascript
// -----------------------------------------------------
// [RECEITA] SALVAR NO NAVEGADOR (localStorage)
// O localStorage só guarda TEXTO: JSON.stringify transforma os
// dados em texto e JSON.parse faz o caminho de volta.
// CUIDADO: Map e Set NÃO viram JSON. JSON.stringify(new Map())
// devolve "{}" e os dados somem sem nenhum erro. Por isso só as
// LISTAS são salvas; os índices são montados de novo ao carregar.
// -----------------------------------------------------
function salvarDados() {
    let tudo = {
        laboratorios: laboratorios,
        cursos: cursos,
        turmas: turmas,
        professores: professores,
        reservas: reservas,
        listaDeEspera: listaDeEspera,
        historico: historico
    };
    localStorage.setItem(CHAVE_DO_NAVEGADOR, JSON.stringify(tudo));
}

function carregarDados() {
    let texto = localStorage.getItem(CHAVE_DO_NAVEGADOR);
    if (texto === null) {
        // primeira vez: ainda não há nada salvo
        usarDadosIniciais();
        salvarDados();
        return;
    }
    let tudo = JSON.parse(texto);
    laboratorios = tudo.laboratorios;
    cursos = tudo.cursos;
    turmas = tudo.turmas;
    professores = tudo.professores;
    reservas = tudo.reservas;
    listaDeEspera = tudo.listaDeEspera;
    historico = tudo.historico;
    atualizarIndices();
}

function restaurarDadosIniciais() {
    usarDadosIniciais();
    salvarDados();
}
```

Repare: a fila e a pilha **também** são salvas; senão, o desfazer e a lista de espera se perderiam ao trocar de página. E os contadores `proximoIdCurso`, `proximoIdTurma`... **saíram**. Um contador salvo à parte pode ficar errado (por exemplo, depois de importar um `.csv` na aula 14). No lugar deles, uma função que calcula o próximo id a partir da própria lista, com o padrão "encontrar o maior" da aula 10:

```javascript
// O próximo id é o maior id da lista + 1 (funciona também depois de importar um .csv)
function proximoId(lista) {
    let maior = 0;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id > maior) {
            maior = lista[i].id;
        }
    }
    return maior + 1;
}
```

Completam o `dados.js`: `buscarPorId` e `buscarLaboratorio` (do CP5) e quatro funções que devolvem o nome a partir do id, **sem quebrar** se o id não existir:

```javascript
function nomeDaTurma(id) {
    let turma = buscarPorId(turmas, id);
    if (turma === null) {
        return "(turma " + id + " não cadastrada)";
    }
    return turma.nome;
}
```

(`nomeDoProfessor`, `nomeDoLaboratorio` e `siglaDoCurso` seguem o mesmo formato.) A **última linha** do `dados.js` é a chamada `carregarDados();`: todo microprojeto começa com os dados salvos.

**Passo 2. O `regras.js`.** Leve as funções de regra da tabela. A maioria vem igual ao CP5. Mudam quatro coisas:

- `adicionarReserva` usa `pedido.id = proximoId(reservas);` no lugar do contador;
- `atenderListaDeEspera` e `desfazerUltimaReserva` **devolvem** a mensagem (13.7), e a nova `motivoDaRecusa` junta o sábado e a capacidade;
- `alunosValidos` substitui o `estaNaFaixa` + `lerAlunos` (agora o número vem de um campo de texto);
- a `montarGrade(idLaboratorio)` do CP5 vira a `montarCalendario()`.

```javascript
// Número de alunos digitado: só dígitos, de 1 a 60
function alunosValidos(texto) {
    return somenteDigitos(texto) && Number(texto) >= 1 && Number(texto) <= MAXIMO_DE_ALUNOS;
}
```

```javascript
// PILHA: desfaz a última reserva feita
function desfazerUltimaReserva() {
    if (historico.length === 0) {
        return "Não há reserva para desfazer.";
    }
    let id = historico.pop();
    if (removerReserva(id)) {
        return "Reserva nº " + id + " desfeita." + atenderListaDeEspera();
    }
    return "A reserva nº " + id + " já tinha sido cancelada.";
}
```

```javascript
function montarCalendario() {
    let calendario = [];
    for (let dia = 0; dia < DIAS.length; dia++) {
        calendario.push([[], [], []]);
    }
    let ordenadas = ordenarPorDiaETurno(reservas);
    for (let i = 0; i < ordenadas.length; i++) {
        let reserva = ordenadas[i];
        calendario[reserva.dia - 1][reserva.turno - 1].push(reserva);
    }
    return calendario;
}
```

Compare com a `montarGrade` do CP5: lá era **um** laboratório e cada célula guardava **um** nome de turma. Aqui é a semana inteira, como no app da escola, e cada célula é uma **lista** (no mesmo turno, vários laboratórios podem estar ocupados). É uma matriz cujas células são arrays. Ela vira tabela na aula 16 (M8).

Regra do `regras.js`: **nenhuma** função usa `prompt`, `alert`, `confirm` ou `document`. Quem fala com o usuário é o `.js` da seção.

**Passo 3. Testar no console.** O M0 não tem tela. Abra `microprojetos/comum/index.html` com o Live Server, aperte F12, vá na aba **Console** e digite cada linha da tabela da página. Todos os resultados precisam bater:

| Digite no console | Resultado esperado |
|---|---|
| `laboratorios.length` | 5 |
| `buscarLaboratorio(2).nome` | `"Informática"` |
| `siglaJaExiste("adm", "")` | `true` |
| `turnoPermitido(6, 2)` | `false` |
| `horarioLivre(2, 3, 3)` | `false` (DSI02 na quarta à noite) |
| `motivoDaRecusa(buscarPorId(turmas, 3), buscarLaboratorio(3), 2, 1)` | `"A turma não cabe: ADM11 tem 30 alunos e Radiologia tem 15 lugares."` |
| `montarCalendario()[2][2].length` | 1 |
| `ordenarPorDiaETurno(reservas)[0].id` | 2 |
| `professores.push({ id: 5, nome: "Ana Souza" }); salvarDados()`, depois F5 e `professores.length` | 5 (o `localStorage` guardou) |
| `restaurarDadosIniciais(); professores.length` | 4 |

Um erro vermelho logo ao abrir a página (antes de digitar qualquer coisa) mostra o **arquivo e a linha**: clique nele. Os mais comuns estão no 13.10.

**O M0 está pronto quando:**

- [ ] a página `comum/index.html` abre **sem erro** no console;
- [ ] as 10 linhas da tabela dão o resultado esperado;
- [ ] o `regras.js` não tem `prompt`, `alert`, `confirm` nem `document`;
- [ ] na aba Application aparece a chave `reservaLab.<sua-pasta>` (ex.: `reservaLab.joao-lucas`).

```bash
git add .
git commit -m "feat: separa o CP5 em comum/dados.js e comum/regras.js (M0)"
git push -u origin joao-lucas/cp6
```

O primeiro `push` da branch leva o `-u origin <sua-pasta>/cp6`. Nas próximas vezes, basta `git push`. O Pull Request só vem no CP6, na aula 16.

### O formato de um `.js` de seção

Do M1 em diante, todo `.js` de seção tem as mesmas quatro partes, nesta ordem:

```
   1. atualizarX()     mostra a seção na tela (lista, selects) a partir dos dados
   2. atualizarTela()  chama a atualizarX(); roda depois de CADA mudança nos dados
   3. addEventListener liga os botões e formulários às funções
   4. atualizarX();    a primeira exibição, ao abrir a página
```

A `atualizarTela()` parece repetida agora, porque cada página tem uma seção só. Ela existe para a **integração** (aula 17): numa tela com várias seções, uma mudança em cursos precisa atualizar também o select de turmas. Os microprojetos usam os **mesmos `id`** das telas finais, então o seu `.js` vai funcionar lá sem mudar a lógica.

### M1 · Laboratórios: a primeira página com dados na tela

Laboratório é espaço físico: só mostra, não cadastra. O HTML entregue tem um `<pre id="lista-laboratorios">`. Escreva `m1-laboratorios/laboratorios.js`:

```javascript
function atualizarLaboratorios() {
    let texto = "";
    for (let i = 0; i < laboratorios.length; i++) {
        texto = texto + "Id " + laboratorios[i].id + " - " + laboratorios[i].nome + " - " +
            laboratorios[i].capacidade + " lugares\n";
    }
    if (texto === "") {
        texto = "Nenhum laboratório. Importe o laboratorios.csv.";
    }
    document.querySelector("#lista-laboratorios").textContent = texto;
}

// Chamada depois de qualquer mudança nos dados
function atualizarTela() {
    atualizarLaboratorios();
}

atualizarLaboratorios();
```

O `laboratorios` veio do `dados.js`, que já rodou o `carregarDados()`. É o mesmo laço de montar texto do CP5; só o destino mudou: no lugar do `alert`, o `textContent` do `<pre>`. Esta seção não tem botões, então não tem `addEventListener`.

**O M1 está pronto quando:**

- [ ] a página mostra os 5 laboratórios, um por linha, sem erro no console;
- [ ] no console, `laboratorios = []; atualizarTela()` mostra "Nenhum laboratório. Importe o laboratorios.csv." (depois, F5 volta ao normal, porque nada foi salvo).

```bash
git add .
git commit -m "feat: mostra a lista de laboratorios (M1)"
git push
```

### M2 · Cursos: o CRUD em formulário

O HTML entregue tem: o formulário `#form-curso` (sigla e nome) para cadastrar; o select `#curso-escolhido`, os campos "Nova sigla" e "Novo nome" e os botões **Alterar** e **Excluir**; o campo de busca com **Buscar** e **Mostrar todos**; um `<p id="msg-cursos">` para os avisos e um `<pre id="lista-cursos">` para a lista. Escreva `m2-cursos/cursos.js`, em partes.

**Parte 1. Mostrar.** Duas funções de apoio (`mostrarMensagem` e a `adicionarOpcao` do 13.4), o texto de um curso e a `atualizarCursos`, que mostra a lista e monta o select:

```javascript
function mostrarMensagem(seletor, texto) {
    document.querySelector(seletor).textContent = texto;
}

function textoDoCurso(curso) {
    return "Id " + curso.id + " - " + curso.sigla + " - " + curso.nome;
}

function mostrarCursos(lista) {
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        texto = texto + textoDoCurso(lista[i]) + "\n";
    }
    if (texto === "") {
        texto = "Nenhum curso encontrado.";
    }
    document.querySelector("#lista-cursos").textContent = texto;
}

// Lista e <select> de cursos desta seção
function atualizarCursos() {
    mostrarCursos(cursos);
    let select = document.querySelector("#curso-escolhido");
    select.textContent = "";   // apaga as opções antigas
    for (let i = 0; i < cursos.length; i++) {
        adicionarOpcao(select, cursos[i].id, cursos[i].sigla + " - " + cursos[i].nome);
    }
}

function atualizarTela() {
    atualizarCursos();
}
```

A `mostrarCursos` recebe a **lista** como parâmetro: ela mostra todos os cursos ou só os encontrados pela busca.

**Parte 2. Concluir uma mudança.** Toda alteração (cadastrar, alterar, excluir) termina do mesmo jeito. Em vez de repetir quatro linhas em três funções, uma função só:

```javascript
// Salva no navegador, limpa os campos de alterar e mostra a lista de novo
function concluirCurso(mensagem) {
    atualizarSiglas();
    salvarDados();
    document.querySelector("#curso-nova-sigla").value = "";
    document.querySelector("#curso-novo-nome").value = "";
    atualizarTela();
    mostrarMensagem("#msg-cursos", mensagem);
}
```

O `atualizarSiglas()` remonta o Set `siglasCadastradas`: sem ele, uma sigla recém-cadastrada passaria de novo no `siglaJaExiste`.

**Parte 3. Cadastrar.** As **mesmas regras** do CP5, agora lendo o formulário:

```javascript
function cadastrarCurso(evento) {
    evento.preventDefault();   // sem isso a página recarrega
    let sigla = document.querySelector("#curso-sigla").value.trim();
    let nome = document.querySelector("#curso-nome").value.trim();

    if (siglaValida(sigla) === false) {
        mostrarMensagem("#msg-cursos", "A sigla deve ter de 2 a 4 letras.");
        return;
    }
    if (siglaJaExiste(sigla, "")) {
        mostrarMensagem("#msg-cursos", "A sigla " + sigla.toUpperCase() + " já existe.");
        return;
    }
    if (nome === "") {
        mostrarMensagem("#msg-cursos", "O nome é obrigatório.");
        return;
    }

    let curso = { id: proximoId(cursos), sigla: sigla.toUpperCase(), nome: nome };
    cursos.push(curso);
    document.querySelector("#form-curso").reset();
    concluirCurso("Cadastrado: " + textoDoCurso(curso));
}
```

O `reset()` limpa os campos do formulário. Cada `if` com `return` é o "valida e para" do CP5: no lugar de perguntar de novo, mostra o aviso e espera o próximo envio.

**Parte 4. Alterar e excluir.** O `escolherNaLista` virou o select `#curso-escolhido`. No alterar, vale a regra do CP5: **em branco = mantém**. O id nunca muda:

```javascript
// Altera só o que foi preenchido; o id não muda
function alterarCurso() {
    let curso = buscarPorId(cursos, Number(document.querySelector("#curso-escolhido").value));
    if (curso === null) {
        mostrarMensagem("#msg-cursos", "Escolha um curso.");
        return;
    }
    let sigla = document.querySelector("#curso-nova-sigla").value.trim();
    let nome = document.querySelector("#curso-novo-nome").value.trim();

    if (sigla !== "" && siglaValida(sigla) === false) {
        mostrarMensagem("#msg-cursos", "A sigla deve ter de 2 a 4 letras.");
        return;
    }
    if (sigla !== "" && siglaJaExiste(sigla, curso.sigla)) {
        mostrarMensagem("#msg-cursos", "A sigla " + sigla.toUpperCase() + " já existe.");
        return;
    }
    if (sigla !== "") {
        curso.sigla = sigla.toUpperCase();
    }
    if (nome !== "") {
        curso.nome = nome;
    }
    concluirCurso("Alterado: " + textoDoCurso(curso));
}
```

O excluir confere o vínculo (`cursoTemTurma`, a "chave estrangeira feita à mão") e pede confirmação antes do `splice`:

```javascript
// Regra: curso com turma não pode ser excluído
function excluirCurso() {
    let curso = buscarPorId(cursos, Number(document.querySelector("#curso-escolhido").value));
    if (curso === null) {
        mostrarMensagem("#msg-cursos", "Escolha um curso.");
        return;
    }
    if (cursoTemTurma(curso.id)) {
        mostrarMensagem("#msg-cursos", "O curso " + curso.sigla + " tem turmas e não pode ser excluído.");
        return;
    }
    if (confirm("Excluir o curso " + curso.sigla + " - " + curso.nome + "?")) {
        cursos.splice(cursos.indexOf(curso), 1);
        concluirCurso("Curso excluído com sucesso.");
    }
}
```

O `confirm` continua: ele é a forma mais simples de perguntar "tem certeza?" antes de apagar.

**Parte 5. Buscar.** Por sigla exata ou parte do nome, sem diferença de maiúsculas, como no CP5. A busca **não** altera a lista `cursos`: ela monta uma lista nova e entrega para a `mostrarCursos`:

```javascript
// Busca por sigla ou parte do nome
function buscarCurso() {
    let procurado = document.querySelector("#curso-busca").value.trim().toLowerCase();
    let encontrados = [];
    for (let i = 0; i < cursos.length; i++) {
        let achouNaSigla = cursos[i].sigla.toLowerCase() === procurado;
        let achouNoNome = cursos[i].nome.toLowerCase().includes(procurado);
        if (achouNaSigla || achouNoNome) {
            encontrados.push(cursos[i]);
        }
    }
    mostrarCursos(encontrados);
}

function mostrarTodosOsCursos() {
    document.querySelector("#curso-busca").value = "";
    mostrarCursos(cursos);
}
```

**Parte 6. Ligar os botões e mostrar a primeira vez.** O formulário usa `"submit"`; os outros botões, `"click"`:

```javascript
// addEventListener recebe o NOME da função que vai rodar (sem parênteses)
document.querySelector("#form-curso").addEventListener("submit", cadastrarCurso);
document.querySelector("#btn-alterar-curso").addEventListener("click", alterarCurso);
document.querySelector("#btn-excluir-curso").addEventListener("click", excluirCurso);
document.querySelector("#btn-buscar-curso").addEventListener("click", buscarCurso);
document.querySelector("#btn-todos-cursos").addEventListener("click", mostrarTodosOsCursos);

atualizarCursos();
```

**O M2 está pronto quando:**

- [ ] cadastrar `dsw` / `Desenvolvimento Web` mostra "Cadastrado: Id 11 - DSW - Desenvolvimento Web", e o DSW aparece na lista e no select;
- [ ] cadastrar `adm` de novo é recusado ("A sigla ADM já existe."); `A1` e `ABCDE` também ("2 a 4 letras");
- [ ] escolher DSW, digitar só o novo nome e clicar em Alterar muda o nome e mantém a sigla;
- [ ] excluir ADM é recusado ("tem turmas"); excluir DSW pede confirmação e apaga;
- [ ] buscar `seg` mostra Segurança no trabalho; buscar `adm` mostra Administração; "Mostrar todos" volta a lista inteira;
- [ ] F5 não perde nada, e um curso cadastrado aparece também no console do M0 (`siglaJaExiste("dsw", "")`).

```bash
git add .
git commit -m "feat: cria o CRUD de cursos em formulario (M2)"
git push
```

## 13.10 Erros comuns

| Sintoma | Causa |
|---|---|
| `Cannot read properties of null (reading 'addEventListener')` | O `id` não existe nesta página (`id` digitado diferente no HTML e no JS) ou o `<script>` está sem `defer` |
| `cursos is not defined` (ou `salvarDados is not defined`) | A página não carrega o `dados.js`, carrega **depois** do `.js` da seção, ou o caminho está errado (`../comum/dados.js`) |
| `siglaValida is not defined` | A página não carrega o `regras.js`, ou a função ficou no `script.js` do CP5 |
| `prompt` ou `alert` aparecem ao abrir o M0 | Uma função de conversa (`lerNumero`, `menuPrincipal`...) foi junto para o `dados.js` ou o `regras.js`, ou sobrou a chamada `menuPrincipal()` no fim |
| `Identifier 'cursos' has already been declared` | A mesma variável está com `let` no `dados.js` e no `.js` da seção (ou duas vezes no mesmo arquivo) |
| O resultado aparece e some na hora | Faltou `evento.preventDefault()` no `submit` |
| A função roda uma vez ao abrir a página e o botão não faz nada | `addEventListener("click", minhaFuncao())` com parênteses |
| `2 + 3` dá `23` | `.value` é texto: faltou `Number()` |
| `buscarPorId(cursos, select.value)` devolve `null` | O `.value` do select é texto (`"6"`) e o id é número (`6`): faltou `Number()` |
| As opções do select aparecem repetidas depois de cada cadastro | Faltou `select.textContent = ""` antes de montar as opções |
| Cadastrou, mas a lista e o select não mudaram | Faltou chamar `atualizarTela()` (ou a `concluirCurso`) depois da mudança |
| Os dados somem no F5 | Faltou `salvarDados()` depois da alteração, ou o `dados.js` não chama `carregarDados()` na última linha |
| Depois do F5, a sigla repetida passa | O `carregarDados` não chamou `atualizarIndices()`, ou o cadastro não chamou `atualizarSiglas()`: o Set ficou desatualizado |
| Salvou um Map e voltou `{}` | `JSON.stringify` não converte Map nem Set: salve as listas |
| `Unexpected token` no `JSON.parse`, ou `Cannot read properties of undefined` ao carregar | Algo diferente (ou antigo) foi salvo na chave. Apague a chave `reservaLab.<sua-pasta>` na aba Application e aperte F5 |
| Cadastro feito em casa não aparece no laboratório | O `localStorage` é deste navegador, neste computador |

## 13.11 Exercícios em aula

1. **Contador.** Monte o contador do 13.3 com os botões **+1**, **-1** e **Zerar**. O contador não pode ficar negativo.
2. **Saudação.** Um formulário com um campo de nome e um botão. Ao enviar, mostre "Olá, Ana!" num `<p>`. Com o campo vazio, mostre "Digite o seu nome.".
3. **Conversor.** Rode o conversor de temperatura de `exemplos/`. Depois acrescente a opção Celsius para Kelvin (`K = C + 273.15`) no `select`.
4. **XSS na prática.** No formulário de saudação, troque **de propósito** o `textContent` por `innerHTML` e digite `<b>Ana</b>`. O que aparece? Depois digite `<img src=x onerror="alert('oi')">`. Volte para `textContent` e repita. Explique a diferença em uma frase.
5. **Contador que lembra.** Faça o contador do exercício 1 salvar o total no `localStorage`. Aperte F5 e confira. Abra a aba Application e encontre a chave.
6. **Ordem dos scripts.** Rode `exemplos/duas-telas/`. Depois, de propósito, apague a linha do `dados.js` no `lista.html` e veja o erro no console. Faça o mesmo com o `regras.js`. Escreva qual é a mensagem de cada caso e por que ela aparece.
7. **(Projeto) Ordem no M1.** No `m1-laboratorios/index.html`, troque de lugar as linhas do `dados.js` e do `laboratorios.js`. Qual erro aparece? Desfaça a troca.
8. **(Projeto) Total de lugares.** No M1, acrescente no fim da lista a linha `Total: 5 laboratórios, 110 lugares`, calculada com um acumulador (não escreva os números à mão).
9. **(Projeto) Teste de mesa do `proximoId`.** Sem rodar, diga o que `proximoId(cursos)` devolve: (a) com os dados iniciais; (b) depois de cadastrar o DSW no M2 e excluí-lo; (c) com a lista vazia. Confira no console do M0.

## 13.12 Desafio para a próxima aula

**Resumo dos cursos.** No M2, mostre acima da lista uma frase como:

```
10 cursos cadastrados, 4 sem turma.
```

Regras:

- use o `<p id="resumo-cursos">` que já está no `m2-cursos/index.html`, logo antes da lista (ele fica vazio até você escrever esta parte);
- escreva uma função `cursosSemTurma()` que **devolve** quantos cursos não têm turma (use a `cursoTemTurma` do `regras.js`);
- a frase é atualizada dentro da `atualizarCursos()`, então ela muda sozinha depois de cadastrar ou excluir;
- teste: cadastre um curso novo (vira "11 cursos cadastrados, 5 sem turma."), exclua e confira que volta.

## 13.13 Resumo

- DOM = a página vista como objetos; `document.querySelector("#id")` encontra (ou devolve `null`); `textContent` troca o texto;
- `<script src="..." defer>` no `<head>`: roda depois de o HTML ser lido, na ordem em que aparece;
- `addEventListener("click", nomeDaFuncao)`: o nome da função, **sem parênteses**;
- Formulário: `.value` é sempre texto; `submit` + `evento.preventDefault()`; `label` em todo campo;
- `select` com `<option value="id">nome</option>` criadas por `createElement`; o objeto é `buscarPorId(lista, Number(select.value))`;
- Na tela, só `textContent`: `innerHTML` com dado digitado abre a porta para XSS;
- Microprojeto = uma seção de tela. Ordem dos scripts: `comum/dados.js`, `comum/regras.js` e o `.js` da seção. As regras **devolvem** respostas; a seção mostra;
- `.js` de seção: `atualizarX()`, `atualizarTela()`, `addEventListener`, primeira chamada;
- `localStorage` guarda texto; `JSON.stringify` para salvar e `JSON.parse` para ler; carregar ao abrir e salvar a cada alteração; **Map e Set não viram JSON**: salve as listas e monte os atalhos de novo.
