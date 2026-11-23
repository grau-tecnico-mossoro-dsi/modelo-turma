**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-15-pratica-integrando-os-dados/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-17-projeto-testes-e-readme/README.md)

---

# AULA 16 — Prática: microprojetos M7, M8 e M9 (a agenda)

> **Aula prática, em formato de roteiro de laboratório.** Hoje você escreve as três seções da tela da agenda, a tela principal do app: **M7 Nova reserva**, **M8 Calendário** e **M9 Cancelar e espera**. Como sempre, o professor entrega o HTML e o CSS, e você escreve o `.js`. É a aula mais pesada dos microprojetos: se a turma atrasar, o M9 fica para o começo da aula 17.

## Objetivos da aula

- **M7** (`nova-reserva.js`): o formulário igual ao do app (professor, curso → turma com o evento `"change"`, laboratório, data e turno), as regras da reserva (`motivoDaRecusa`), conflito → **lista de espera** com `confirm`, e o **comprovante `.txt`** (`AAAAMMDDTHHMM-PROFESSOR.txt`);
- **M8** (`calendario.js`): a **matriz** dia × turno (`montarCalendario`) vira uma `<table>`, com um cartão por reserva, `livre` ou `fechado`;
- **M9** (`cancelar-e-espera.js`): cancelar (o primeiro da **fila** assume), desfazer (**pilha**), mostrar a lista de espera e buscar uma reserva pelo número (**busca linear × binária**);
- Fazer uma **revisão de código em dupla**;
- Fechar o **CP6**: microprojetos M0 a M9 prontos, cada um com commit.

## 16.1 Antes de começar (checklist)

- [ ] M0 a M6 prontos e na sua branch `<sua-pasta>/cp6` no GitHub (um commit por microprojeto);
- [ ] O desafio da aula 15 (turmas agrupadas por curso no M5) está pronto, ou anotado como pendente;
- [ ] As pastas `m7-nova-reserva/`, `m8-calendario/` e `m9-cancelar-e-espera/` (com o `index.html` entregue) estão na sua pasta (`alunos/<sua-pasta>/`);
- [ ] **Restaurar dados iniciais** (M4) antes de começar: os resultados esperados usam os dados de exemplo.

As datas deste roteiro (`30/11`, `05/12`) são de um exemplo. As suas dependem da semana em que você testa: o que importa é ser a **semana seguinte**.

## 16.2 M7 Nova reserva (`nova-reserva.js`)

### O formulário: seis `<select>`

Abra `microprojetos/m7-nova-reserva/index.html`. O formulário `#form-reserva` tem seis `<select>`, na mesma ordem do app real:

| Campo | `id` | De onde vêm as opções | Função |
|---|---|---|---|
| Professor(a) | `#res-professor` | `professores`, em ordem alfabética (`ordenarPorNome`) | `preencherProfessores` |
| Curso | `#res-curso` | `cursos` | `preencherCursos` |
| Turma | `#res-turma` | **só as turmas do curso escolhido** (`turmasDoCurso`) | `preencherTurmas` |
| Laboratório | `#res-laboratorio` | `laboratorios`, com os lugares | `preencherLaboratorios` |
| Data | `#res-dia` | os 6 dias da semana seguinte (`DIAS` + `dataDoDia`) | `preencherDiasETurnos` |
| Turno | `#res-turno` | o Map `TURNOS` | `preencherDiasETurnos` |

Embaixo do formulário: `#msg-reserva` (as mensagens) e o botão `#btn-comprovante`.

### Passo 1: o select que muda outro select

Escolher o curso muda a lista de turmas. Quem avisa que o curso mudou é o evento **`"change"`** (aula 13), e a função que ele chama monta a lista de turmas de novo:

```javascript
// Roda de novo toda vez que o curso muda (evento "change")
function preencherTurmas() {
    let select = document.querySelector("#res-turma");
    let anterior = select.value;
    select.textContent = "";
    let lista = turmasDoCurso(Number(document.querySelector("#res-curso").value));
    if (lista.length === 0) {
        adicionarOpcao(select, "", "(nenhuma turma neste curso)");
    }
    for (let i = 0; i < lista.length; i++) {
        adicionarOpcao(select, lista[i].id, lista[i].nome + " (" + lista[i].alunos + " alunos)");
    }
    voltarParaEscolha(select, anterior);
}
```

E a ligação, no fim do arquivo:

```javascript
document.querySelector("#res-curso").addEventListener("change", preencherTurmas);
```

**A `voltarParaEscolha`.** Depois de cada reserva, os selects são enchidos de novo (alguém pode ter cadastrado um professor ou uma turma). Sem cuidado, todos voltariam para a primeira opção, e o professor teria de escolher tudo de novo. A função guarda o valor que estava escolhido (`anterior`) e escolhe ele de novo:

```javascript
// Depois de encher um <select> de novo, volta para o que estava escolhido
function voltarParaEscolha(select, valorAnterior) {
    select.value = valorAnterior;
    if (select.selectedIndex === -1) {
        select.selectedIndex = 0;
    }
}
```

Se o valor anterior não existe mais (a turma foi excluída, ou o curso mudou e a turma é de outro curso), o `selectedIndex` fica `-1` (nada escolhido). Aí a função escolhe a primeira opção.

Escreva também a `preencherProfessores`, a `preencherCursos` e a `preencherLaboratorios`, no mesmo formato (guardar o `anterior`, apagar, encher, `voltarParaEscolha`), e a `preencherDiasETurnos`, que **não** precisa de `voltarParaEscolha`: dias e turnos não mudam, então ela roda uma vez só, ao abrir a página. Por fim:

```javascript
function atualizarNovaReserva() {
    preencherProfessores();
    preencherCursos();
    preencherTurmas();
    preencherLaboratorios();
}
```

A ordem importa: a `preencherTurmas` lê o curso escolhido, então os cursos precisam estar no select **antes** dela.

### Passo 2: confirmar a reserva

A `reservar(evento)` é o coração do M7. Primeiro, como sempre: `preventDefault`, ler os 5 valores e conferir se o professor, a turma e o laboratório existem (cada um com a sua mensagem: "Escolha o professor.", "Escolha uma turma. Se a lista está vazia, cadastre uma turma para este curso." e "Escolha o laboratório."). Depois, as regras:

```javascript
    let motivo = motivoDaRecusa(turma, laboratorio, dia, turno);
    if (motivo !== "") {
        mostrarMensagem("#msg-reserva", motivo);
        return;
    }

    let pedido = { id: 0, professor: professor.id, turma: turma.id, laboratorio: laboratorio.id, dia: dia, turno: turno };

    if (horarioLivre(laboratorio.id, dia, turno)) {
        adicionarReserva(pedido);
        ultimaReserva = pedido;
        mostrarMensagem("#msg-reserva", "Reserva confirmada! " + textoDaReserva(pedido));
    } else if (confirm("Horário ocupado. Entrar na lista de espera?")) {
        listaDeEspera.push(pedido);   // FILA: entra no fim
        mostrarMensagem("#msg-reserva", "Você é o " + listaDeEspera.length + "º da lista de espera.");
    } else {
        mostrarMensagem("#msg-reserva", "Reserva não feita: o horário está ocupado.");
    }
    salvarDados();
    atualizarTela();
}
```

Repare na **divisão das regras**, que vem do `regras.js` (M0):

- o `motivoDaRecusa` cuida do que **não tem conserto**: sábado à tarde ou à noite, turma que não cabe. Ele devolve `""` (pode) ou o motivo;
- o conflito fica **fora** dele, porque o conflito tem uma saída: a **lista de espera**. Por isso o `horarioLivre` (o Set `horariosOcupados` da aula 12) é conferido depois, com o `confirm`.

O pedido nasce com `id: 0`; quem dá o id de verdade é a `adicionarReserva` (`proximoId`), que também guarda o id na **pilha** `historico` para o "desfazer" do M9. Na fila, o pedido continua com `id: 0`: ele só ganha um id quando assumir o horário.

Para montar o texto da reserva, o M7 precisa de duas ajudantes. Elas vêm do CP5, com duas mudanças: a data da semana seguinte (`dataDoDia`) e os nomes pelas funções `nomeDa...` do `dados.js`, que não quebram se um id não existir:

```javascript
function textoDoHorario(dia, turno) {
    return DIAS[dia - 1] + " " + dataDoDia(dia) + ", " + TURNOS.get(turno).nome + " (" + TURNOS.get(turno).horario + ")";
}

function textoDaReserva(reserva) {
    return "Nº " + reserva.id + " - " + textoDoHorario(reserva.dia, reserva.turno) + " - " +
        nomeDoLaboratorio(reserva.laboratorio) + " - " + nomeDaTurma(reserva.turma) + " - Prof. " +
        nomeDoProfessor(reserva.professor);
}
```

Resultado: `Nº 5 - Segunda 30/11, Manhã (08h às 12h) - Eletrotécnica - ELT03 - Prof. Carla Mendes`. O M9 vai precisar delas também: por enquanto, cada microprojeto tem a sua cópia.

### Passo 3: o comprovante `.txt`

Guarde a última reserva confirmada numa variável global, no topo do arquivo: `let ultimaReserva = null;`. O botão "Baixar comprovante da última reserva" monta o texto e usa a receita `baixarArquivo` do `dados.js` (aula 14). O nome do arquivo segue o padrão do desafioCadastro, com a data e a hora **de agora**:

```javascript
function nomeDoComprovante(professor) {
    let agora = new Date();
    return agora.getFullYear() + String(agora.getMonth() + 1).padStart(2, "0") +
        String(agora.getDate()).padStart(2, "0") + "T" + String(agora.getHours()).padStart(2, "0") +
        String(agora.getMinutes()).padStart(2, "0") + "-" + professor.toUpperCase().split(" ").join("") + ".txt";
}
```

`"Carla Mendes".toUpperCase().split(" ").join("")` vira `"CARLAMENDES"`: o `split(" ")` separa nas palavras e o `join("")` cola sem espaço. Resultado: `20261123T1430-CARLAMENDES.txt`.

Escreva a `baixarComprovante()`: se `ultimaReserva === null`, mostre "Faça uma reserva primeiro."; senão, monte o texto com as linhas `COMPROVANTE DE RESERVA`, `Reserva nº:`, `Professor:`, `Turma:`, `Laboratório:` e `Horário:` (use `nomeDoProfessor`, `nomeDaTurma`, `nomeDoLaboratorio` e `textoDoHorario`) e chame `baixarArquivo(nomeDoComprovante(professor), texto)`.

Ligações no fim do arquivo: `"submit"` do `#form-reserva` → `reservar`; `"change"` do `#res-curso` → `preencherTurmas`; `"click"` do `#btn-comprovante` → `baixarComprovante`. Chamada inicial: `preencherDiasETurnos();` e depois `atualizarNovaReserva();`.

### Pronto quando (M7)

Restaure os dados iniciais e abra o M7:

- [ ] Professores em ordem alfabética (Carla, Juliana, Marcos, Rafael); o curso ADM escolhido mostra só as turmas ADM09 a ADM13, com os alunos; 5 laboratórios com os lugares; 6 datas da semana seguinte; 3 turnos;
- [ ] Trocar o curso para **BCV** → a turma mostra `(nenhuma turma neste curso)`; **Confirmar reserva** → "Escolha uma turma. Se a lista está vazia, cadastre uma turma para este curso.";
- [ ] ADM11 (30 alunos) na Eletrotécnica (20 lugares) → "A turma não cabe: ADM11 tem 30 alunos e Eletrotécnica tem 20 lugares.";
- [ ] Qualquer turma no sábado à tarde → "No sábado, só o turno da manhã.";
- [ ] Prof. Carla, curso ELT, ELT03, Eletrotécnica, segunda, manhã → "Reserva confirmada! Nº 5 - Segunda 30/11, Manhã (08h às 12h) - Eletrotécnica - ELT03 - Prof. Carla Mendes", e os selects **continuam** com o que estava escolhido;
- [ ] Prof. Juliana, ADM10, Informática, segunda, manhã (a reserva nº 2 ocupa) e **Cancelar** no `confirm` → "Reserva não feita: o horário está ocupado."; de novo, com **OK** → "Você é o 1º da lista de espera.";
- [ ] **Baixar comprovante** → baixa `AAAAMMDDTHHMM-CARLAMENDES.txt` com os dados da reserva nº 5 (abra no Bloco de Notas: os acentos aparecem certos);
- [ ] F5 e **Baixar comprovante** sem reservar → "Faça uma reserva primeiro." (a `ultimaReserva` fica só na memória).

Commit: `git add microprojetos/m7-nova-reserva` e `git commit -m "feat: microprojeto M7 de nova reserva"`.

## 16.3 M8 Calendário (`calendario.js`)

### A matriz que já existe

A regra do calendário está pronta desde o CP5: a `montarCalendario()` do `regras.js` devolve uma **matriz** de 6 dias × 3 turnos. Cada posição é uma **lista** com as reservas daquele horário, de todos os laboratórios (como na grade do app):

```
   calendario[dia - 1][turno - 1]

                 turno 1 (manhã)      turno 2 (tarde)      turno 3 (noite)
   [0] segunda   [ reserva 2 ]        [ ]                  [ ]
   [1] terça     [ ]                  [ reserva 3 ]        [ ]
   [2] quarta    [ ]                  [ ]                  [ reserva 1 ]
   [3] quinta    [ ]                  [ ]                  [ reserva 4 ]
   [4] sexta     [ ]                  [ ]                  [ ]
   [5] sábado    [ ]                  [ ]                  [ ]
```

O M8 só **desenha** essa matriz numa `<table>`. Repare que a tabela da tela tem os **turnos nas linhas** e os **dias nas colunas** (como no app), o contrário da matriz. Por isso o laço de fora é o turno, e o de dentro é o dia.

### A `<table>` do HTML

O `index.html` do M8 já tem a tabela, com as linhas vazias:

```
   <thead>  <tr id="dias-do-calendario">   ← Turno | Segunda 30/11 | Terça 01/12 | ...
   <tbody>  <tr id="turno-1">              ← Manhã 08h às 12h | célula | célula | ...
            <tr id="turno-2">
            <tr id="turno-3">
```

Você cria as células com `createElement("th")` (título) e `createElement("td")` (dado), põe o texto com `textContent` e pendura na linha com `appendChild`. O `scope = "col"` e o `scope = "row"` dizem ao leitor de tela que aquele título é de uma coluna ou de uma linha (acessibilidade).

### Uma célula: `fechado`, `livre` ou os cartões

```javascript
// Uma célula: "fechado", "livre" ou um parágrafo para cada reserva
function preencherCelula(celula, reservasDoHorario, dia, turno) {
    if (turnoPermitido(dia, turno) === false) {
        celula.textContent = "fechado";
        return;
    }
    if (reservasDoHorario.length === 0) {
        celula.textContent = "livre";
        return;
    }
    for (let i = 0; i < reservasDoHorario.length; i++) {
        let reserva = reservasDoHorario[i];
        let paragrafo = document.createElement("p");
        paragrafo.textContent = nomeDaTurma(reserva.turma) + " · " + nomeDoLaboratorio(reserva.laboratorio) +
            " · " + nomeDoProfessor(reserva.professor);
        celula.appendChild(paragrafo);
    }
}
```

E a função principal, com o laço aninhado:

```javascript
function atualizarCalendario() {
    document.querySelector("#semana").textContent = textoDaSemana();
    mostrarCabecalhoDoCalendario();
    let calendario = montarCalendario();
    for (let turno = 1; turno <= TURNOS.size; turno++) {
        let linha = document.querySelector("#turno-" + turno);
        linha.textContent = "";
        let titulo = document.createElement("th");
        titulo.scope = "row";
        titulo.textContent = TURNOS.get(turno).nome + " " + TURNOS.get(turno).horario;
        linha.appendChild(titulo);
        for (let dia = 1; dia <= DIAS.length; dia++) {
            let celula = document.createElement("td");
            preencherCelula(celula, calendario[dia - 1][turno - 1], dia, turno);
            linha.appendChild(celula);
        }
    }
}
```

O `linha.textContent = ""` apaga as células antigas antes de desenhar de novo (sem ele, cada atualização acrescentaria uma linha inteira ao lado). O `"#turno-" + turno` monta o seletor `#turno-1`, `#turno-2`, `#turno-3`.

Escreva a `mostrarCabecalhoDoCalendario()` sozinho: apague o `#dias-do-calendario`, crie um `<th>` com `Turno` e um `<th scope="col">` para cada dia, com `DIAS[dia - 1] + " " + dataDoDia(dia)`. Depois, a `atualizarTela()` (chama a `atualizarCalendario()`) e a chamada inicial `atualizarCalendario();`.

### Pronto quando (M8)

- [ ] Acima da tabela: "Reservas para a semana de 30/11 a 05/12" (com as datas da sua semana seguinte);
- [ ] Cabeçalho: `Turno`, `Segunda 30/11`, `Terça 01/12` … `Sábado 05/12`;
- [ ] Com os dados iniciais: segunda/manhã `ADM09 · Informática · Rafael Costa`; terça/tarde `ENF05 · Enfermagem · Juliana Alves`; quarta/noite `DSI02 · Informática · Carla Mendes`; quinta/noite `ELT03 · Eletrotécnica · Marcos Pereira`; sábado à tarde e à noite `fechado`; o resto `livre`;
- [ ] Faça a reserva nº 5 do M7 (Carla, ELT03, Eletrotécnica, segunda, manhã) e aperte F5 no M8: a segunda/manhã mostra **dois** cartões (ADM09 e ELT03), um embaixo do outro;
- [ ] Console sem erro.

Commit: `git add microprojetos/m8-calendario` e `git commit -m "feat: microprojeto M8 do calendario da semana"`.

## 16.4 M9 Cancelar e espera (`cancelar-e-espera.js`)

### Mostrar: o select de reservas e a fila

A `atualizarCancelarEEspera()` enche o `#cancelar-reserva` com as reservas **em ordem de dia e turno** (o bubble sort `ordenarPorDiaETurno` do `regras.js`), usando a `textoDaReserva` como texto da opção. Depois, monta o texto da lista de espera no `<pre id="espera">`, uma linha por pedido, na ordem da fila:

```
1º - Prof. Juliana Alves - Informática, Segunda 30/11, Manhã (08h às 12h)
```

Fila vazia → "A lista de espera está vazia.". A `atualizarTela()` chama a `atualizarCancelarEEspera()`.

### Cancelar: a FILA anda

```javascript
function cancelar() {
    let reserva = buscarPorId(reservas, Number(document.querySelector("#cancelar-reserva").value));
    if (reserva === null) {
        mostrarMensagem("#msg-cancelar", "Não há reserva para cancelar.");
        return;
    }
    if (confirm("Cancelar esta reserva?\n\n" + textoDaReserva(reserva))) {
        removerReserva(reserva.id);
        let mensagem = "Reserva cancelada." + atenderListaDeEspera();   // FILA: o primeiro assume
        salvarDados();
        atualizarTela();
        mostrarMensagem("#msg-cancelar", mensagem);
    }
}
```

Toda a regra está no `regras.js`: a `removerReserva` tira a reserva e atualiza o Set de horários ocupados; a `atenderListaDeEspera` procura, **do começo da fila para o fim**, o primeiro pedido cujo horário ficou livre, transforma em reserva e devolve a frase `" A reserva passou para Prof. ... (lista de espera)."` (ou `""`, se ninguém assumiu). O M9 só junta as frases e mostra.

### Desfazer: a PILHA

Escreva a `desfazer()` sozinho: se a pilha `historico` estiver vazia, "Não há reserva para desfazer."; senão, `confirm("Desfazer a última reserva feita?")`, e a mensagem vem da `desfazerUltimaReserva()` do `regras.js` (que faz o `pop`). Depois, `salvarDados()`, `atualizarTela()` e a mensagem em `#msg-cancelar`. Por que pilha? Porque desfaz a **última** reserva feita, e a última que entra é a primeira que sai.

### Buscar pelo número: linear × binária

A busca compara as duas buscas da aula 12 **na mesma lista**, contando as comparações:

```javascript
// Compara as duas buscas na mesma lista ordenada por id
function buscarReserva() {
    let texto = document.querySelector("#busca-numero").value.trim();
    let resultado = document.querySelector("#resultado-busca");
    if (somenteDigitos(texto) === false) {
        resultado.textContent = "Digite o número da reserva.";
        return;
    }
    let ordenadas = copiarLista(reservas);
    ordenadas.sort(function (a, b) {
        return a.id - b.id;
    });
    let linear = buscaLinearPorId(ordenadas, Number(texto));
    let binaria = buscaBinariaPorId(ordenadas, Number(texto));
    let encontrada = "Reserva não encontrada.";
    if (binaria.posicao !== -1) {
        encontrada = textoDaReserva(ordenadas[binaria.posicao]);
    }
    resultado.textContent = encontrada + "\nBusca linear: " + linear.comparacoes + " comparação(ões)" +
        "\nBusca binária: " + binaria.comparacoes + " comparação(ões)";
}
```

A busca binária **só funciona com a lista ordenada por id**. Hoje a lista `reservas` até fica em ordem (cada reserva nova recebe o maior id + 1 e vai para o fim, e o `importarReservas` do M3 ordena o que vem do `.csv`), mas a busca não deve depender de um cuidado que está em outro arquivo. Por isso a função ordena uma **cópia** antes de buscar, com o `sort` e o comparador da aula 12.

Ligações: `#btn-cancelar` → `cancelar`; `#btn-desfazer` → `desfazer`; `#btn-buscar` → `buscarReserva`. Chamada inicial: `atualizarCancelarEEspera();`. Você vai precisar de novo do `mostrarMensagem`, do `adicionarOpcao`, da `textoDoHorario` e da `textoDaReserva`: copie.

### Pronto quando (M9)

Restaure os dados iniciais e abra o M9:

- [ ] O select mostra as 4 reservas na ordem nº 2 (segunda, manhã), nº 3 (terça, tarde), nº 1 (quarta, noite), nº 4 (quinta, noite); a lista de espera mostra "A lista de espera está vazia.";
- [ ] **Desfazer** → "Não há reserva para desfazer." (com os dados iniciais, a pilha está vazia);
- [ ] Buscar `3` → a reserva da ENF05, "Busca linear: 3 comparação(ões)" e "Busca binária: 2 comparação(ões)"; buscar `4` → linear 4, binária 3; buscar `9` → "Reserva não encontrada."; buscar `abc` → "Digite o número da reserva.";
- [ ] **Os microprojetos conversam:** no M7, peça a Informática na segunda de manhã para a Prof. Juliana (ADM10) e entre na lista de espera. No M9, aperte F5: a fila mostra `1º - Prof. Juliana Alves - Informática, Segunda 30/11, Manhã (08h às 12h)`;
- [ ] Cancele a reserva nº 2 → "Reserva cancelada. A reserva passou para Prof. Juliana Alves (lista de espera)."; a fila fica vazia e a reserva nº 5 (Juliana) aparece no select;
- [ ] **Desfazer** e confirmar → "Reserva nº 5 desfeita." (a última reserva criada foi a que veio da fila);
- [ ] Abra o M8 e aperte F5: o calendário mostra o resultado de tudo isso.

Commit: `git add microprojetos/m9-cancelar-e-espera` e `git commit -m "feat: microprojeto M9 de cancelar e lista de espera"`.

## 16.5 Revisão de código em dupla

Com o M7 e o M8 prontos (o M9 também, se deu tempo), troque de computador com a dupla do lado. Cada um lê o código do outro por **15 minutos**, com este checklist, e anota o que encontrou (sem mexer no código do colega).

| # | Pergunta | Sim/Não |
|---|---|---|
| 1 | Os microprojetos abrem sem erro vermelho no console (F12)? | |
| 2 | Os `id` do HTML entregue continuam os mesmos (nenhum foi trocado para "fazer funcionar")? | |
| 3 | Os nomes de variáveis e funções dizem o que guardam/fazem (`reservasDoHorario`, e não `x`)? | |
| 4 | Cada função faz **uma** tarefa? Alguma passou de ~30 linhas? | |
| 5 | O `.js` da seção **não** repete uma regra que já está no `regras.js` (laço procurando conflito, por exemplo)? | |
| 6 | Os valores dos `<select>` passam por `Number()` antes de comparar com um id? | |
| 7 | Toda alteração nos dados termina com `salvarDados()`? | |
| 8 | Na tela, só `textContent` (nenhum `innerHTML` com dados)? | |
| 9 | Os `addEventListener` estão todos juntos, no fim do arquivo? | |
| 10 | Há código comentado "morto" ou `console.log` de teste esquecido? | |
| 11 | As mensagens dizem **o que fazer** ("Escolha o professor.") e não só "Erro"? | |
| 12 | Cada microprojeto tem o seu commit, com uma mensagem que diz o que foi feito? | |

Como dar o retorno: comece por **uma coisa boa** do código, depois no máximo **três** sugestões, sempre apontando a linha. "Na linha 42, se a lista de turmas está vazia, aparece `Cannot read properties of null`" ajuda; "seu código está ruim" não ajuda ninguém.

## 16.6 CP6: o que precisa estar no GitHub

```
   microprojetos/
   ├── comum/dados.js, comum/regras.js .......... M0
   ├── m1-laboratorios/laboratorios.js ......... M1
   ├── m2-cursos/cursos.js ..................... M2
   ├── m3-importar/importar.js ................. M3
   ├── m4-exportar-e-restaurar/exportar.js ..... M4
   ├── m5-turmas/turmas.js ..................... M5
   ├── m6-professores/professores.js ........... M6
   ├── m7-nova-reserva/nova-reserva.js ......... M7
   ├── m8-calendario/calendario.js ............. M8
   └── m9-cancelar-e-espera/cancelar-e-espera.js M9
```

Cada microprojeto com o **seu** commit, e todos abrindo sem erro no console. Se o M9 não ficou pronto hoje, ele é a primeira tarefa da aula 17, antes da integração.

**Entregar o CP6 com um Pull Request:**

1. Faça o último `git push` na branch `<sua-pasta>/cp6`.
2. No GitHub, abra o repositório da turma. Clique em **Compare & pull request** (ou em **Pull requests** → **New pull request**).
3. Base: `main`. Compare: `<sua-pasta>/cp6`. Título: `CP6 - <seu nome>`. Clique em **Create pull request**.
4. Espere o GitHub Action terminar. Ele confere três coisas: o PR só mexe na **sua** pasta, todo `.js` passa no `node --check` (sem erro de sintaxe) e não há arquivo indevido. Se ficar vermelho, abra os detalhes, corrija, faça commit e `git push` **na mesma branch**: o PR atualiza sozinho.
5. O professor revisa e comenta no PR. Corrija na mesma branch, do mesmo jeito.
6. O professor faz o merge. Depois, traga as novidades: `git switch main` e `git pull`.

## 16.7 Extra opcional (para depois da integração)

A partir da aula 17, quem terminar a integração e os testes pode fazer **um extra**. O extra é **opcional**: ele não substitui nenhum item obrigatório. Faça no `app/` integrado (não nos microprojetos), porque os exemplos usam os nomes de arquivo das telas finais (`regras.js`, `turmas.js`, `nova-reserva.js`, `calendario.js`, `tela.js`).

| Extra | O que faz | Onde mexe | Exemplo |
|---|---|---|---|
| A. Busca avançada | Ignora acentos ("administracao" acha "Administração") e combina 2 critérios | `regras.js` + `turmas.js` + HTML em `cadastros.html` | [`extra-busca-avancada.js`](exemplos/extra-busca-avancada.js) |
| B. Turma em dois laboratórios | A mesma turma não pode estar em dois laboratórios no mesmo turno | `regras.js` (`motivoDaRecusa` e `atenderListaDeEspera`) | [`extra-mesmo-turno.js`](exemplos/extra-mesmo-turno.js) |
| C. Professor em dois laboratórios | O mesmo professor não pode estar em dois laboratórios no mesmo turno | `regras.js` + `reservar()` do `nova-reserva.js` | [`extra-mesmo-turno.js`](exemplos/extra-mesmo-turno.js) |
| D. Reserva recorrente | A mesma reserva em vários dias de uma vez | `nova-reserva.js` + HTML em `index.html` | [`extra-reserva-recorrente.js`](exemplos/extra-reserva-recorrente.js) |
| E. Resumo de ocupação | Mostra na agenda "4 de 80 horários ocupados (5%)" | `regras.js` + `atualizarCalendario()` do `calendario.js` + HTML em `index.html` | [`extra-resumo-de-ocupacao.js`](exemplos/extra-resumo-de-ocupacao.js) |

Cada arquivo de exemplo diz, parte por parte, em qual arquivo do `app/` o trecho entra. Regra de ouro: **regra vai no `regras.js`; campo e botão vão no `.js` da seção**.

**Antes de programar, responda às 4 perguntas** (num comentário no topo do arquivo em que vai mexer):

```
   1. DADO     →  Preciso guardar algo novo? Em que variável? Vem de um .csv?
   2. REGRA    →  Que função decide? Ela é nova ou muda uma que já existe?
   3. TELA     →  Que campos/botões entram? Em qual tela (.html) e em qual .js?
   4. SALVAR   →  O dado novo precisa ir para o localStorage?
```

### Extras B e C: ninguém está em dois lugares ao mesmo tempo

O conflito do sistema olha só o **laboratório**. Nos dados de exemplo, a `DSI02` tem reserva na Informática na quarta à noite, e nada impede de reservar a **mesma** `DSI02` na Segurança no trabalho, no **mesmo** horário. A regra percorre as reservas procurando a mesma turma, o mesmo dia e o mesmo turno (os **três** iguais, com `&&`):

```javascript
// A turma já tem reserva neste dia e turno (em qualquer laboratório)?
function turmaOcupadaNoHorario(idTurma, dia, turno) {
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.turma === idTurma && reserva.dia === dia && reserva.turno === turno) {
            return true;
        }
    }
    return false;
}
```

No extra B, ela entra como um `if` a mais no fim do `motivoDaRecusa`, antes do `return ""`: a reserva é **recusada**, sem oferecer a lista de espera (o problema não é o laboratório). No extra C, o `motivoDaRecusa` não recebe o professor, então a conferência fica no `reservar()` do `nova-reserva.js`, antes do `if (horarioLivre(...))`. **Atenção:** a lista de espera também precisa respeitar a regra, senão, ao cancelar, o primeiro da fila fura a regra sem passar pelo formulário (parte 3 do exemplo).

**Como testar (B):** reserve a `DSI02` na **Segurança no trabalho** (25 lugares), quarta, noite → recusada. **(C):** reserve com a Prof. Carla Mendes, quarta, noite, em outro laboratório que não seja a Informática → recusada.

### Extra D: reserva recorrente

Um laço de 1 a 6; para cada dia **marcado** (caixas `#rec-dia-1` a `#rec-dia-6`, `.checked`), monte um pedido **novo** e reutilize `motivoDaRecusa`, `horarioLivre` e `adicionarReserva`. Com os dados de exemplo, DSI02 na Informática à noite, marcando segunda, quarta, sexta e sábado:

```
Segunda: reservado (nº 5)
Quarta: ocupado, não reservado
Sexta: reservado (nº 6)
Sábado: não reservado. No sábado, só o turno da manhã.
```

**Por que um objeto novo a cada dia?** Se você fizesse `base.dia = dia; adicionarReserva(base);`, as reservas seriam **o mesmo objeto**: no fim, todas ficariam com o último dia marcado.

```
   reservas ──► [ r1 , r2 , r3 , base , base ]
                                  ▲      ▲
                                  └──────┴── a mesma caixa, duas setas até ela
```

Pense também no **Desfazer**: ele desfaz só a última reserva criada, ou seja, só um dos dias. Anote a sua decisão no README.

### Extras A e E: buscar melhor e resumir

**A.** `"administração".includes("administracao")` é `false`: para o computador, `ç` e `c` são letras diferentes. A `semAcentos` troca cada letra acentuada pela letra da **mesma posição** em outra string:

```javascript
const COM_ACENTO = "áàâãäéèêëíìîïóòôõöúùûüç";
const SEM_ACENTO = "aaaaaeeeeiiiiooooouuuuc";
```

As duas strings precisam ter **o mesmo tamanho** (23 letras): se faltar uma, todas as trocas depois dela saem erradas. Com `administracao` e 25 lugares, aparecem `ADM10` (25), `ADM12` (22) e `ADM13` (18).

**E.** Um laboratório tem **16 horários** na semana (5 dias × 3 turnos + a manhã de sábado). Em vez de escrever `16` no código (um **número mágico**), o exemplo **conta** com um laço aninhado e a própria regra do sábado:

```javascript
function horariosDaSemana() {
    let total = 0;
    for (let dia = 1; dia <= DIAS.length; dia++) {
        for (let turno = 1; turno <= TURNOS.size; turno++) {
            if (turnoPermitido(dia, turno)) {
                total = total + 1;
            }
        }
    }
    return total;
}
```

Com os dados de exemplo: `"4 de 80 horários ocupados (5%)"`. Sem laboratórios, o total é 0 e a divisão daria `NaN`; o exemplo trata esse caso.

Teste o extra com 3 casos (normal, limite e inválido), acrescente os testes no `TESTES.md` (aula 17) e explique o extra no README.

## 16.8 Erros comuns

| Sintoma | Causa |
|---|---|
| O select de turmas não muda ao trocar o curso | Faltou o `addEventListener("change", preencherTurmas)` no `#res-curso`, ou foi usado `"click"` |
| O select de turmas mostra as turmas de **todos** os cursos | Faltou o `Number()` no valor do curso: `turmasDoCurso("3")` compara `3 === "3"`, que é `false`; ou foi usado `turmas` em vez de `turmasDoCurso` |
| Depois de reservar, todos os selects voltam para a primeira opção | Faltou a `voltarParaEscolha` (ou o `anterior` foi lido **depois** de apagar o select) |
| Dias e turnos aparecem repetidos a cada reserva | A `preencherDiasETurnos` foi posta dentro da `atualizarNovaReserva`; ela roda uma vez só |
| A reserva é feita, mas o horário continua "livre" para a próxima | Fez `reservas.push` direto em vez de `adicionarReserva` (o Set `horariosOcupados` não foi atualizado) |
| Sábado à noite aceito | O `if (motivo !== "")` não tem `return` |
| O comprovante sai como `...-CARLA MENDES.txt` | Faltou o `split(" ").join("")` |
| O calendário ganha uma linha a mais a cada atualização | Faltou o `linha.textContent = ""` antes de desenhar |
| O calendário mostra a reserva no dia seguinte | Faltou o `- 1` em `calendario[dia - 1][turno - 1]` |
| Ao cancelar, a fila não anda | Faltou chamar a `atenderListaDeEspera()` depois da `removerReserva` |
| Busca binária "não encontra" uma reserva que existe | A lista não estava ordenada por id; ordene a cópia antes de buscar |
| A fila feita no M7 não aparece no M9 | A aba do M9 estava aberta antes; aperte F5 |

## 16.9 Exercícios em aula

1. **Teste de mesa da `voltarParaEscolha`.** Um select tem as opções de valor `"1"`, `"2"` e `"3"`, e o `valorAnterior` é `"5"`. Quanto vale o `selectedIndex` depois da primeira linha? E no fim?
2. **Matriz.** Com os dados iniciais, o que tem em `montarCalendario()[2][2]`? E em `montarCalendario()[5][1]`? Por que a célula do sábado à tarde mostra `fechado`, e não `livre`?
3. **Busca binária à mão.** Com as reservas de id `[1, 2, 3, 4]`, faça o teste de mesa da busca do nº `4`: valores de `inicio`, `fim` e `meio` em cada volta e o total de comparações.
4. **Pilha.** Com os dados iniciais, faça duas reservas no M7 (nº 5 e nº 6). No M9, desfaça duas vezes. Quais reservas saem, e em que ordem? Por que isso é uma pilha?
5. **(Projeto) M8.** Mostre no `#semana` também o número de reservas: "Reservas para a semana de 30/11 a 05/12 (4 reservas)".
6. **(Projeto) M9.** Quando não houver nenhuma reserva, o select de cancelar mostra a opção `(nenhuma reserva)`, como o `(nenhuma turma neste curso)` do M7.

## 16.10 Desafio para a próxima aula

**O mapa das funções repetidas.** Na aula 17 você vai juntar todos os `.js` das seções nas 3 telas. Prepare-se: no VS Code, aperte `Ctrl+Shift+F` (procurar em todos os arquivos), procure cada nome abaixo e preencha a tabela com os arquivos em que a função aparece.

| Função | Em quais `.js` ela aparece? |
|---|---|
| `function mostrarMensagem` | |
| `function adicionarOpcao` | |
| `function textoDoHorario` | |
| `function textoDaReserva` | |
| `function atualizarTela` | |

Traga a tabela na aula 17 (no caderno ou num arquivo `integracao.md` na sua pasta). Se o M9 não ficou pronto, termine-o também.

## 16.11 Resumo

- M7: seis selects; o `"change"` do curso enche de novo as turmas (`turmasDoCurso`); a `voltarParaEscolha` mantém o que estava escolhido; `motivoDaRecusa` para o que não tem conserto, `horarioLivre` + `confirm` para a lista de espera; comprovante com `nomeDoComprovante` + `baixarArquivo`;
- M8: a matriz `montarCalendario()` vira `<table>` com laço aninhado (turno fora, dia dentro), `createElement`, `appendChild` e `textContent`; `fechado` vem antes de `livre`;
- M9: cancelar → a **fila** anda (`atenderListaDeEspera`); desfazer → a **pilha** (`historico`); busca linear × binária numa cópia ordenada por id;
- O `.js` da seção só lê, chama a regra e mostra; as regras estão no `regras.js` desde o M0;
- CP6: M0 a M9 prontos, cada um com commit, entregues por Pull Request da branch `<sua-pasta>/cp6` para a `main`;
- Os extras são **opcionais** e ficam para depois da integração.
