**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-10-js-arrays-e-funcoes/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-12-js-matrizes-busca-e-ordenacao/README.md)

---

# AULA 11 — JS: objetos, listas, pilhas e filas

## Objetivos da aula

- Juntar várias informações de uma mesma coisa num **objeto** (`{ nome: "Ana", nota: 8.5 }`);
- Ler e alterar propriedades com **ponto** (`aluno.nome`) e com **colchetes** (`aluno[campo]`);
- Guardar uma lista de objetos num **array de objetos** e percorrê-la com `for`;
- Conhecer três **estruturas de dados**: **lista** (inserir, remover, buscar), **pilha** (o último que entra sai primeiro) e **fila** (o primeiro que entra sai primeiro);
- No projeto: cursos, turmas, professores, laboratórios e reservas como objetos; CRUD de turmas e de professores; exclusão bloqueada por vínculo; nova reserva com conflito, capacidade e regra do sábado; lista de espera (fila) e desfazer (pilha). **CP4.**

## 11.1 O problema: arrays paralelos

No CP3 (aula 10), cada informação do curso morava num array separado:

```javascript
let idsDosCursos    = [1,               2,     3];
let siglasDosCursos = ["ADM",           "BCV", "DSI"];
let nomesDosCursos  = ["Administração", "BCV", "Desenvolvimento de sistemas"];
```

A posição `2` de todos os arrays descreve o mesmo curso (o DSI). Funciona, mas cada operação precisa lembrar de **todos** os arrays. Para excluir o DSI, são três `splice`. Se você esquecer um, os dados "escorregam": a sigla de um curso passa a andar com o nome de outro, e ninguém avisa.

E o problema cresce: hoje chegam as **turmas** (nome, curso, alunos), os **professores** e as **reservas** (professor, turma, laboratório, dia, turno). Com arrays paralelos, a reserva sozinha precisaria de seis arrays.

```
   ANTES (arrays paralelos)                     DEPOIS (lista de objetos)

   idsDosCursos    [ 1   | 2   | 3   ]          cursos
   siglasDosCursos [ ADM | BCV | DSI ]           [0] ──► { id: 1, sigla: "ADM", nome: "Administração" }
   nomesDosCursos  [ Adm | BCV | Des ]           [1] ──► { id: 2, sigla: "BCV", nome: "BCV" }
                                                 [2] ──► { id: 3, sigla: "DSI", nome: "Desenvolvimento de sistemas" }
   excluir = 3 splices                           excluir = 1 splice
```

A solução é guardar **um pacote por curso**. Esse pacote é o **objeto**.

## 11.2 Objeto: um pacote com etiquetas

Um objeto é escrito entre chaves. Dentro, cada informação tem uma **etiqueta** (o nome da propriedade), dois-pontos e o **valor**. As propriedades são separadas por vírgula.

```javascript
let aluno = { nome: "Ana", nota: 8.5, turma: "DSW-1A" };
```

```
            aluno
   ┌──────────┬──────────┐
   │ etiqueta │ valor    │
   ├──────────┼──────────┤
   │ nome     │ "Ana"    │
   │ nota     │ 8.5      │
   │ turma    │ "DSW-1A" │
   └──────────┴──────────┘
```

Compare com o array: no array, o valor é encontrado pela **posição** (`lista[0]`); no objeto, pelo **nome** (`aluno.nome`). Ninguém precisa decorar que "a nota é a posição 1".

```javascript
console.log(aluno.nome);       // Ana
aluno.nota = 9;                // altera
aluno.situacao = "Aprovada";   // cria uma propriedade nova
console.log(aluno.email);      // undefined: essa etiqueta não existe
```

O `undefined` é o jeito do JavaScript dizer "não tem nada com esse nome". Ele não dá erro, então um nome digitado errado (`aluno.nomee`) passa despercebido. Atenção redobrada na digitação.

## 11.3 Ponto ou colchetes?

Existem dois jeitos de acessar uma propriedade, e eles fazem a mesma coisa:

```javascript
aluno.nome        // com ponto: o nome está ESCRITO no código
aluno["nome"]     // com colchetes: o nome é um TEXTO
```

Os colchetes parecem inúteis até o nome da propriedade estar **dentro de uma variável**:

```javascript
let campos = ["nome", "nota", "turma"];
for (let i = 0; i < campos.length; i++) {
    let campo = campos[i];
    console.log(campo + ": " + aluno[campo]);   // aluno["nome"], depois aluno["nota"]...
}
// nome: Ana
// nota: 9
// turma: DSW-1A
```

Leia `aluno[campo]` como "a propriedade de `aluno` cujo nome está guardado em `campo`". **Cuidado:** `aluno.campo` procura uma propriedade chamada literalmente `"campo"`, que não existe (`undefined`). Guarde essa ideia, `objeto[campo]`: ela é o coração da leitura e da geração de `.csv` na aula 14 (`lerCsv` usa o cabeçalho do arquivo como nome dos campos).

## 11.4 Array de objetos

Um array pode guardar objetos. Cada posição é um pacote completo:

```javascript
let contatos = [
    { nome: "Bruno", telefone: "99999-1111" },
    { nome: "Carla", telefone: "99999-2222" },
    { nome: "Diego", telefone: "99999-3333" }
];

console.log(contatos[1].nome);   // Carla
```

Leia `contatos[1].nome` em dois passos: `contatos[1]` é o objeto da Carla; `.nome` pega o nome dele. Percorrer é o mesmo `for` da aula 10:

```javascript
for (let i = 0; i < contatos.length; i++) {
    console.log((i + 1) + ". " + contatos[i].nome + " - " + contatos[i].telefone);
}
```

**A variável aponta para o mesmo objeto.** Quando você guarda um objeto da lista numa variável, não está fazendo uma cópia: a variável é **outra etiqueta para o mesmo pacote**.

```javascript
let carla = contatos[1];
carla.telefone = "98888-0000";
console.log(contatos[1].telefone);   // 98888-0000  ← a lista mudou junto
```

```
   contatos[1] ──┐
                 ├──► { nome: "Carla", telefone: "98888-0000" }
   carla ────────┘
```

É isso que faz o "alterar curso" funcionar: a função pega o objeto escolhido (`let curso = cursos[posicao];`) e muda as propriedades dele direto na lista.

O exemplo completo está em [`exemplos/objetos-e-lista-de-contatos.js`](exemplos/objetos-e-lista-de-contatos.js).

## 11.5 Estruturas de dados: lista, pilha e fila

Uma **estrutura de dados** é um jeito combinado de guardar e usar um grupo de valores. As três de hoje usam o **mesmo** array do JavaScript. O que muda é a **regra de entrada e saída**.

### Lista: entra e sai de qualquer lugar

```javascript
contatos.push({ nome: "Elisa", telefone: "99999-4444" });   // inserir no fim
contatos.splice(0, 1);                                       // remover a posição 0

function buscarContato(nome) {                               // buscar
    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].nome === nome) {
            return contatos[i];
        }
    }
    return null;   // null = "não encontrei"
}
```

A função devolve o **objeto inteiro** (ou `null`). Quem chamou decide o que fazer com ele: mostrar, alterar ou remover.

### Pilha (LIFO): o último que entra é o primeiro que sai

Pense numa **pilha de pratos**: você coloca no topo e tira do topo. O nome técnico é **LIFO** (*Last In, First Out*). Em JavaScript: `push` empilha no fim (o topo) e `pop` tira do fim.

```
   push("A")     push("B")     push("C")     pop() → "C"    pop() → "B"
                               ┌─────┐
                 ┌─────┐       │  C  │ ← topo
   ┌─────┐       │  B  │       │  B  │       ┌─────┐
   │  A  │       │  A  │       │  A  │       │  B  │       ┌─────┐
   └─────┘       └─────┘       └─────┘       │  A  │       │  A  │
                                             └─────┘       └─────┘
```

O exemplo clássico é o **desfazer** (Ctrl+Z) do editor de texto. Antes de cada mudança, o editor empilha como o texto estava; o desfazer tira do topo, ou seja, volta a **mudança mais recente**:

```javascript
let texto = "";
let historico = [];   // PILHA

function digitar(palavra) {
    historico.push(texto);     // guarda o estado antigo no topo
    texto = texto + palavra;
}

function desfazer() {
    if (historico.length === 0) {
        console.log("Nada para desfazer.");
        return;
    }
    texto = historico.pop();   // volta ao estado do topo
}
```

Rode [`exemplos/pilha-desfazer.js`](exemplos/pilha-desfazer.js) e acompanhe a pilha crescendo a cada `digitar` e encolhendo a cada `desfazer`.

Outros exemplos de pilha: o botão "voltar" do navegador e a pilha de chamadas de funções.

### Fila (FIFO): o primeiro que entra é o primeiro que sai

Pense na **fila do banco**: quem chega vai para o fim; quem é atendido sai do começo. O nome técnico é **FIFO** (*First In, First Out*). Em JavaScript: `push` entra no fim e **`shift`** tira do **começo** (e devolve o item tirado).

```
   começo                          fim
     ▼                              ▼
   ┌───────┬───────┬───────┐
   │  Ana  │ Bruno │ Carla │  ◄── push("Diego") entra aqui
   └───────┴───────┴───────┘
     │
     └──► shift() → "Ana" sai daqui (foi a primeira a chegar)
```

O exemplo clássico é a **fila de impressão** do laboratório:

```javascript
let filaDeImpressao = [];

function enviarParaImprimir(aluno, arquivo) {
    filaDeImpressao.push({ aluno: aluno, arquivo: arquivo });   // entra no FIM
}

function imprimirProximo() {
    if (filaDeImpressao.length === 0) {
        console.log("A fila está vazia.");
        return;
    }
    let documento = filaDeImpressao.shift();                    // sai do COMEÇO
    console.log("Imprimindo " + documento.arquivo + " de " + documento.aluno);
}
```

Veja o exemplo completo em [`exemplos/fila-impressao.js`](exemplos/fila-impressao.js).

### Resumo das três

```
   ESTRUTURA   ENTRA          SAI                   EXEMPLO
   lista       push (fim)     splice (qualquer)     contatos, cursos, turmas
   pilha       push (topo)    pop (topo)            desfazer, voltar do navegador
   fila        push (fim)     shift (começo)        banco, impressão, lista de espera
```

No VisualG (aula 6), você desenhou pilha e fila no quadro com um vetor e uma variável de controle. Aqui o array do JavaScript cresce e encolhe sozinho, e o `pop` e o `shift` fazem o trabalho.

## 11.6 Projeto da disciplina: o que fazemos hoje (CP4)

Parta do seu CP3: o mesmo `alunos/joao-lucas/prompt/script.js`, agora na branch `joao-lucas/cp4` (criada a partir da `main`, depois do merge do CP3). Siga os passos. Faça um commit ao fim de cada passo que funcionar.

**Passo 1. Os arrays paralelos viram listas de objetos.** Troque os arrays do CP3 por **cinco** listas. Repare que os campos `curso`, `professor`, `turma` e `laboratorio` guardam o **id**, nunca o nome:

```javascript
// Laboratórios são espaços físicos: o sistema só mostra, não cadastra.
let laboratorios = [
    { id: 1, nome: "Eletrotécnica", capacidade: 20 },
    { id: 2, nome: "Informática", capacidade: 30 },
    // ... 3 Radiologia (15), 4 Segurança no trabalho (25), 5 Enfermagem (20)
];

let cursos = [
    { id: 1, sigla: "ADM", nome: "Administração" },
    { id: 2, sigla: "BCV", nome: "BCV" },
    // ... os 10 cursos do CP3, agora um objeto cada
];

let turmas = [
    { id: 1, nome: "ADM09", curso: 1, alunos: 28 },
    { id: 6, nome: "DSI02", curso: 3, alunos: 24 },
    // ... 10 turmas
];

let professores = [
    { id: 1, nome: "Carla Mendes" },
    { id: 2, nome: "Rafael Costa" },
    { id: 3, nome: "Juliana Alves" },
    { id: 4, nome: "Marcos Pereira" }
];

// dia 1 a 6 (segunda a sábado) · turno 1 manhã, 2 tarde, 3 noite
let reservas = [
    { id: 1, professor: 1, turma: 6, laboratorio: 2, dia: 3, turno: 3 },
    { id: 2, professor: 2, turma: 1, laboratorio: 2, dia: 1, turno: 1 },
    { id: 3, professor: 3, turma: 8, laboratorio: 5, dia: 2, turno: 2 },
    { id: 4, professor: 4, turma: 7, laboratorio: 1, dia: 4, turno: 3 }
];
```

Leia a reserva 1 assim: "a professora 1 (Carla) reservou para a turma 6 (DSI02) o laboratório 2 (Informática) na quarta (dia 3), à noite (turno 3)". A reserva guarda a **turma**, não o curso: o curso é descoberto pela turma (`turma.curso`). E o número de alunos fica na **turma**, não é digitado a cada reserva. Guardar cada informação **num lugar só** é a ideia de **normalização**, que você vai ver em Banco de Dados.

No topo do arquivo, as constantes do horário (o app da escola só reserva **turno inteiro**, de 4 horas) e um contador de id para cada lista:

```javascript
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const TURNOS = ["Manhã", "Tarde", "Noite"];
const HORARIOS = ["08h às 12h", "13h30 às 17h30", "18h30 às 22h30"];
const SABADO = 6;
const MANHA = 1;
const MAXIMO_DE_ALUNOS = 60;

let proximoIdCurso = 11;
let proximoIdTurma = 11;
let proximoIdProfessor = 5;
let proximoIdReserva = 5;
```

As funções do CP3 passam a receber o **objeto**: `textoDoCurso(curso)` devolve `curso.sigla + " - " + curso.nome`. Para trocar um id pelo objeto, uma busca linear que serve para **qualquer** lista com `id`:

```javascript
function buscarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i];
        }
    }
    return null;
}
```

É a `buscarContato` do 11.5, procurando pelo `id`. Com ela, `textoDaTurma(turma)` mostra a sigla do curso: `buscarPorId(cursos, turma.curso).sigla`.

**Passo 2. `escolherCurso` vira `escolherNaLista`.** No CP3, a `escolherCurso` mostrava a lista de cursos e devolvia a posição. Agora precisamos escolher professor, curso, turma, laboratório, dia e turno. Em vez de seis funções quase iguais, uma só, com o que muda virando **parâmetro** (a aula 10 de novo):

```javascript
// Mostra uma lista numerada e devolve a POSIÇÃO escolhida (ou -1 se cancelar).
// É o escolherCurso do CP3, agora servindo para qualquer lista.
function escolherNaLista(pergunta, textoDaLista, quantidade) {
    let numero = 0;
    let cancelou = false;
    do {
        let resposta = prompt(pergunta + "\n\n" + textoDaLista);
        if (resposta === null) {
            cancelou = true;
        } else if (somenteDigitos(resposta.trim()) === false) {
            alert("Digite apenas números.");
        } else if (estaNaFaixa(Number(resposta), 1, quantidade) === false) {
            alert("Escolha de 1 a " + quantidade + ".");
        } else {
            numero = Number(resposta);
        }
    } while (numero === 0 && cancelou === false);
    if (cancelou === true) {
        return -1;
    }
    return numero - 1;
}
```

Uso: `escolherNaLista("Qual curso deseja excluir?", listaDeCursos(), cursos.length)`. Cada lista ganha a sua função que **monta o texto** (`listaDeCursos`, `listaDeTurmas(lista)`, `listaDeProfessores`, `listaDeLaboratorios`, `listaDeDias`, `listaDeTurnos`). A `listaDeTurmas` recebe a lista porque, na reserva, ela mostra **só** as turmas de um curso.

O CRUD de cursos continua o mesmo do CP3, agora com objetos: `cursos.push(curso)` (um `push` só), `cursos.splice(posicao, 1)` (um `splice` só) e, no alterar, `curso.sigla = sigla;`. O `siglaJaExiste(sigla, idIgnorado)` passa a ignorar pelo **id** (`0` no cadastro) e entra a `siglaValida` do desafio da aula 10.

**Passo 3. CRUD de turmas e de professores.** É o mesmo formato do CRUD de cursos:

- **Turma:** o curso é escolhido **da lista numerada** (`escolherNaLista("Curso da turma:", listaDeCursos(), cursos.length)`), o nome é único e guardado em maiúsculas (`turmaJaExiste(nome, idIgnorado)`, igual ao `siglaJaExiste`), e o número de alunos vai de 1 a `MAXIMO_DE_ALUNOS`:

```javascript
let turma = { id: proximoIdTurma, nome: nome, curso: cursos[posicaoDoCurso].id, alunos: alunos };
turmas.push(turma);
proximoIdTurma = proximoIdTurma + 1;
```

- **Professor:** nome completo, com pelo menos duas palavras. Uma nova função de pergunta:

```javascript
// Nome completo = pelo menos 2 palavras ("Carla Mendes")
function nomeCompleto(nome) {
    let partes = nome.trim().split(" ");
    let palavras = 0;
    for (let i = 0; i < partes.length; i++) {
        if (partes[i] !== "") {
            palavras = palavras + 1;
        }
    }
    return palavras >= 2;
}
```

O `split(" ")` quebra o texto nos espaços: `"Carla  Mendes"` (dois espaços) vira `["Carla", "", "Mendes"]`, por isso o laço só conta as partes que não são vazias. A `buscarProfessor()` é a busca linear por parte do nome, igual à `buscarCurso`.

As leituras de texto continuam **no formato do CP3** (`do...while` + `cancelou`), uma cópia para cada pergunta. Sim, vai ficar repetido. Guarde a sensação: ela abre a aula 12.

**Passo 4. Exclusão bloqueada: o vínculo.** Um curso com turmas não pode sumir: as turmas ficariam apontando para um id que não existe. O mesmo vale para turma com reserva e professor com reserva. Cada regra é uma função de pergunta com busca linear:

```javascript
function cursoTemTurma(idCurso) {
    for (let i = 0; i < turmas.length; i++) {
        if (turmas[i].curso === idCurso) {
            return true;
        }
    }
    return false;
}
```

```javascript
// Regra: curso com turma não pode ser excluído
function excluirCurso() {
    let posicao = escolherNaLista("Qual curso deseja excluir?", listaDeCursos(), cursos.length);
    if (posicao === -1) {
        return;
    }
    let curso = cursos[posicao];
    if (cursoTemTurma(curso.id)) {
        alert("O curso " + curso.sigla + " tem turmas e não pode ser excluído.");
        return;
    }
    if (confirm("Excluir " + textoDoCurso(curso) + "?")) {
        cursos.splice(posicao, 1);
        alert("Curso excluído com sucesso.");
    }
}
```

`turmaTemReserva(idTurma)` e `professorTemReserva(idProfessor)` têm o mesmo formato, percorrendo as `reservas`. No Banco de Dados, isso se chama **chave estrangeira**, e o próprio banco confere; aqui fazemos à mão. Mais uma regra no alterar turma: com o novo número de alunos, a turma precisa continuar cabendo nos laboratórios que já reservou (`turmaCabeNasReservas`).

**Passo 5. Nova reserva: professor → curso → turma → laboratório → dia → turno.** É a ordem do formulário do app da escola. Depois de escolher o curso, só aparecem as turmas **daquele** curso:

```javascript
function turmasDoCurso(idCurso) {
    let encontradas = [];
    for (let i = 0; i < turmas.length; i++) {
        if (turmas[i].curso === idCurso) {
            encontradas.push(turmas[i]);
        }
    }
    return encontradas;
}
```

Repare: ela devolve uma **lista nova** com as turmas encontradas. É o padrão "filtrar": percorre e faz `push` das que servem. Depois, três regras, cada uma numa função de pergunta pequena:

```javascript
// No sábado, só o turno da manhã
function turnoPermitido(dia, turno) {
    return dia !== SABADO || turno === MANHA;
}

function turmaCabe(turma, laboratorio) {
    return turma.alunos <= laboratorio.capacidade;
}

// Livre = nenhuma reserva do mesmo laboratório, no mesmo dia e turno
function horarioLivre(idLaboratorio, dia, turno) {
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.laboratorio === idLaboratorio && reserva.dia === dia && reserva.turno === turno) {
            return false;
        }
    }
    return true;
}
```

**Conflito** = mesmo laboratório, mesmo dia e mesmo turno. Outro laboratório no mesmo horário pode; o mesmo laboratório em outro turno também. O arquivo [`exemplos/conflito-de-horario.js`](exemplos/conflito-de-horario.js) roda casos de teste das três funções; rode-o antes de usar no projeto.

A `novaReserva()` faz as seis escolhas com `escolherNaLista` (cada uma seguida de `if (posicao === -1) { return; }`), recusa se a turma não cabe ("A turma não cabe: ADM09 tem 28 alunos e Eletrotécnica tem 20 lugares.") ou se for sábado à tarde ou à noite ("No sábado, só o turno da manhã."). Depois, monta o objeto `pedido` e decide:

```javascript
let pedido = {
    id: 0,
    professor: professores[posicaoDoProfessor].id,
    turma: turma.id,
    laboratorio: laboratorio.id,
    dia: dia,
    turno: turno
};

if (horarioLivre(laboratorio.id, dia, turno)) {
    adicionarReserva(pedido);
    alert("Reserva confirmada!\n\n" + textoDaReserva(pedido));
} else if (confirm("Horário ocupado. Entrar na lista de espera?")) {
    listaDeEspera.push(pedido);   // FILA: entra no fim
    alert("Você é o " + listaDeEspera.length + "º da lista de espera.");
}
```

O `id: 0` é provisório: o id de verdade só é dado quando o pedido vira reserva.

**Passo 6. Lista de espera (FILA).** Quando uma reserva é cancelada, o **primeiro da fila** que quer aquele horário assume. Repare num detalhe: a nossa fila guarda pedidos de **vários** laboratórios e horários. Por isso não usamos `shift` direto (ele tiraria o primeiro da fila, mesmo que ele queira outro horário). Percorremos a fila **do começo para o fim** e o primeiro que couber sai com `splice`. A ordem de chegada continua sendo respeitada:

```
   fila: [ Rafael: Informática, seg, manhã | Juliana: Enfermagem, ter, tarde | Carla: Informática, seg, manhã ]
   cancelou: Informática, segunda, manhã
   percorre: Rafael cabe? SIM → sai da fila e vira reserva (Carla continua esperando)
```

```javascript
// Depois de um cancelamento, o PRIMEIRO da fila com o horário livre assume.
function atenderListaDeEspera() {
    for (let i = 0; i < listaDeEspera.length; i++) {
        let pedido = listaDeEspera[i];
        if (horarioLivre(pedido.laboratorio, pedido.dia, pedido.turno)) {
            listaDeEspera.splice(i, 1);
            adicionarReserva(pedido);
            alert("Lista de espera: a reserva passou para Prof. " + buscarPorId(professores, pedido.professor).nome + ".");
            return;
        }
    }
}
```

A `cancelarReserva()` remove a reserva escolhida (lista numerada + `confirm` + `splice`) e chama `atenderListaDeEspera()`.

**Passo 7. Desfazer a última reserva (PILHA).** Toda reserva confirmada passa por `adicionarReserva`, que empilha o id dela no `historico`:

```javascript
function adicionarReserva(pedido) {
    pedido.id = proximoIdReserva;
    proximoIdReserva = proximoIdReserva + 1;
    reservas.push(pedido);
    historico.push(pedido.id);   // PILHA: guarda a última reserva feita
}
```

A `desfazerUltimaReserva()` faz `historico.pop()`, procura a reserva com esse id e a remove (com `confirm`). Se a pessoa desistir, o id volta para o topo com `push`. Se a reserva já tinha sido cancelada, avisa "Essa reserva já tinha sido cancelada.". Depois de desfazer, chama `atenderListaDeEspera()`, porque um horário ficou livre.

**Passo 8. Menus.** O menu principal ganha: 1 Nova reserva, 2 Cancelar reserva, 3 Desfazer última reserva, 4 Ver reservas, 5 Lista de espera, 6 Cursos, 7 Turmas, 8 Professores, 9 Laboratórios, 10 Sair. Cursos, turmas e professores têm cada um o seu submenu (`menuCursos`, `menuTurmas`, `menuProfessores`), todos no formato do CP3 (laço do menu + bloco de leitura dentro); no submenu, Cancelar vale como "Voltar". Teste tudo e faça o commit do CP4, de dentro de `alunos/joao-lucas/`:

```bash
git add .
git commit -m "feat: adiciona turmas, professores, reservas, fila e pilha (CP4)"
git push
```

Agora, abra o Pull Request da branch `joao-lucas/cp4` para a `main` e confira o check do Action (só a sua pasta, `node --check` nos `.js`, nenhum arquivo indevido). O professor revisa e comenta no PR; você corrige na mesma branch e faz push de novo, e o professor faz o merge. Depois do merge, comece o CP5:

```bash
git switch main
git pull
git switch -c joao-lucas/cp5
```

**Para pensar até a próxima aula:** conte quantos blocos de leitura (`do...while` que pergunta e valida) o seu CP4 tem. No CP4 de referência são **16**. Compare-os: o que muda de um para o outro? Guarde a resposta: ela abre a aula 12.

## 11.7 Erros comuns

| Sintoma | Causa |
|---|---|
| `undefined` ao ler uma propriedade | Nome digitado errado (`turma.alnos`) ou objeto sem aquela etiqueta |
| `objeto.campo` dá `undefined` dentro do laço | Usou ponto com uma variável; o certo é `objeto[campo]` |
| `Cannot read properties of null (reading 'nome')` | A busca (`buscarPorId`) devolveu `null` (não achou) e o código usou o resultado sem testar |
| `SyntaxError: Unexpected identifier` no objeto | Faltou a vírgula entre duas propriedades ou entre dois objetos da lista |
| Alterou uma variável e a lista mudou "sozinha" | A variável aponta para o mesmo objeto da lista (11.4). Aqui isso é o desejado |
| A reserva mostra o número em vez do nome da turma | A reserva guarda o **id**; faltou `buscarPorId(turmas, reserva.turma).nome` |
| `buscarPorId(cursos, "3")` devolve `null` | O id é número e foi comparado com texto: `3 === "3"` é falso. Use `Number(...)` |
| A reserva mostrou turmas de outro curso | Passou `turmas` em vez de `turmasDoCurso(curso.id)` para a `listaDeTurmas` |
| Excluiu um curso que tinha turmas | Faltou chamar `cursoTemTurma` antes do `confirm` |
| Duas reservas no mesmo laboratório, dia e turno | O `horarioLivre` comparou só o laboratório e o dia, ou não foi chamado antes do `adicionarReserva` |
| O desfazer tirou a reserva errada | Usou `shift` (começo) em vez de `pop` (topo) |
| A lista de espera atende o último que chegou | Usou `pop` em vez de percorrer do começo (ou `shift`) |
| Duas turmas com o mesmo id | Esqueceu de somar 1 em `proximoIdTurma` depois do `push` |
| Cancelar no meio da reserva continua perguntando | Faltou o `if (posicao === -1) { return; }` depois de um dos `escolherNaLista` |

## 11.8 Exercícios em aula

1. **Ficha do aluno.** Crie o objeto `aluno` com nome, idade e curso. Mostre um `alert` "Ana, 17 anos, curso DSW". Depois altere a idade e crie a propriedade `cidade`.
2. **Boletim com colchetes.** Dado `let boletim = { portugues: 7, matematica: 9, logica: 10 };` e `let materias = ["portugues", "matematica", "logica"];`, use um `for` com `boletim[materia]` para mostrar cada nota e calcular a média.
3. **Lista de contatos.** Com um array de objetos `{ nome, telefone }`, faça as funções `listarContatos()`, `buscarContato(nome)` (devolve o objeto ou `null`) e `removerContato(nome)` (busca a posição e usa `splice`).
4. **Pilha de pratos.** Simule com `push` e `pop`: empilhe "azul", "verde", "vermelho"; tire dois; empilhe "branco". Antes de rodar, escreva no caderno qual prato está no topo no final. Depois confira.
5. **Fila do banco.** Faça um menu com `prompt`: 1 Chegou cliente (lê o nome, `push`), 2 Chamar próximo (`shift`, mostra o nome), 3 Ver fila (lista numerada), 4 Sair. Trate a fila vazia.
6. **(Projeto) Teste de mesa das regras.** Com as reservas iniciais do passo 1, diga, **sem rodar**, o que acontece com cada pedido: (a) ADM10 (25 alunos) na Informática, segunda, manhã; (b) ADM10 na Informática, segunda, tarde; (c) ADM09 (28) na Segurança no trabalho (25), terça, manhã; (d) RAD02 (12) na Radiologia, sábado, noite; (e) ENF05 (18) na Eletrotécnica, quinta, manhã. Depois confira no sistema.
7. **(Projeto) Turmas por curso.** Na listagem de cursos, mostre quantas turmas cada curso tem: "1. ADM - Administração (5 turmas)". Use `turmasDoCurso(curso.id).length`.

## 11.9 Desafio para a próxima aula

**Lista de espera com posição.** Crie a função `verListaDeEspera()` (opção 5 do menu) que mostra a fila **na ordem de chegada**, com a posição de cada professor, o laboratório, o dia e o turno por extenso:

```
LISTA DE ESPERA

1º - Prof. Carla Mendes - Informática, Terça, Manhã (08h às 12h)
2º - Prof. Rafael Costa - Enfermagem, Segunda, Tarde (13h30 às 17h30)
```

Regras: se a fila estiver vazia, mostre "A lista de espera está vazia."; use `buscarPorId` (que devolve o objeto) para trocar os ids do professor e do laboratório pelos nomes; use os arrays `DIAS`, `TURNOS` e `HORARIOS` para o texto do horário. Extra: acrescente no fim "Total: N pedido(s) na fila".

## 11.10 Resumo

- Objeto = pacote de informações com etiquetas: `{ nome: "Ana", nota: 8.5 }`;
- `objeto.nome` quando o nome está escrito no código; `objeto[campo]` quando o nome está numa variável;
- Array de objetos substitui os arrays paralelos: um `splice` remove o curso inteiro;
- Guardar um objeto da lista numa variável **não copia**: alterar a variável altera a lista;
- Lista: `push`, `splice`, busca com `for`. Pilha (LIFO): `push` + `pop`. Fila (FIFO): `push` + `shift`;
- No projeto: as ligações entre listas guardam o **id** (`buscarPorId` traz o objeto); `escolherNaLista` serve para qualquer lista; exclusão bloqueada por vínculo; reserva com `turnoPermitido`, `turmaCabe` e `horarioLivre` (conflito = mesmo laboratório, dia e turno); lista de espera = fila; desfazer = pilha.
