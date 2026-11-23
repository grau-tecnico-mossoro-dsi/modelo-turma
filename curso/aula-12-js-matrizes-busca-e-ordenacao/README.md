**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-11-js-objetos-listas-pilhas-e-filas/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-13-dom-telas-formularios-e-localstorage/README.md)

---

# AULA 12 — JS: matrizes, busca (com Map e Set) e ordenação

## Objetivos da aula

- Representar tabelas em **matrizes** (arrays de arrays) e percorrê-las com **laço aninhado**;
- Comparar **busca linear** e **busca binária**, contando as comparações de cada uma;
- Usar **Map** (`set`, `get`, `has`, `delete`) e **Set** (`add`, `has`, `delete`) como o passo seguinte da busca: achar pela **chave**, sem laço;
- Ordenar à mão com **bubble sort** e **selection sort**, acompanhando o passo a passo;
- Usar o `sort` pronto com **comparador** e entender a armadilha do `[10, 9, 1].sort()`;
- Ter uma noção de **Big-O**: linear O(n), binária O(log n), Map/Set O(1);
- **Refatorar** o projeto: juntar os blocos de leitura repetidos em `lerNumero` e `lerTexto`, sem mudar o comportamento;
- No projeto: calendário da semana (matriz), buscas, Map e Set nos lugares certos e as duas ordenações à mão. **CP5: a regra de negócio fica pronta.**

## 12.1 Matriz: uma tabela dentro do JavaScript

Na aula 6, no VisualG, você declarou `grade: vetor[1..6, 1..3] de caractere`: uma tabela com linhas (os dias) e colunas (os turnos). Em JavaScript, uma tabela é um **array de arrays**. Cada posição do array de fora é uma **linha**, e cada linha é um array com as **colunas**:

```javascript
let alunos = ["Ana", "Bruno", "Carla"];
let notas = [
    [8.0, 7.5, 9.0, 6.5],    // linha 0: Ana
    [5.5, 6.0, 7.0, 8.0],    // linha 1: Bruno
    [9.5, 9.0, 10.0, 9.0]    // linha 2: Carla
];
```

```
                    coluna →   0      1      2      3
                            ┌──────┬──────┬──────┬──────┐
   linha 0 (Ana)   notas[0] │ 8.0  │ 7.5  │ 9.0  │ 6.5  │
                            ├──────┼──────┼──────┼──────┤
   linha 1 (Bruno) notas[1] │ 5.5  │ 6.0  │ 7.0  │ 8.0  │
                            ├──────┼──────┼──────┼──────┤
   linha 2 (Carla) notas[2] │ 9.5  │ 9.0  │ 10.0 │ 9.0  │
                            └──────┴──────┴──────┴──────┘

   notas[1][2] → linha 1, coluna 2 → 7.0 (Bruno, 3º bimestre)
```

Leia `notas[1][2]` em dois passos: `notas[1]` é o array do Bruno; `[2]` pega a posição 2 dele. **Primeiro a linha, depois a coluna**, sempre.

```
   VISUALG (começa em 1)                  JAVASCRIPT (começa em 0)
   notas: vetor[1..3, 1..4] de real       let notas = [[...], [...], [...]];
   notas[2, 3] <- 7.0                     notas[1][2] = 7.0;
```

**Criando uma matriz vazia.** Muitas vezes a matriz nasce vazia e é preenchida depois. Faça um laço que cria **uma linha nova** a cada volta:

```javascript
let grade = [];
for (let dia = 0; dia < 6; dia++) {
    grade.push(["", "", ""]);   // cada linha com o seu próprio [ ]: manhã, tarde, noite
}
grade[0][1] = "ADM09";          // segunda-feira, tarde
```

## 12.2 Laço aninhado

Para visitar todas as células, use um laço para as linhas e, **dentro** dele, outro laço para as colunas. O laço de dentro roda **inteiro** a cada volta do laço de fora: 3 linhas x 4 colunas = 12 voltas.

```javascript
for (let linha = 0; linha < notas.length; linha++) {
    let soma = 0;                                        // zera a cada aluno
    for (let coluna = 0; coluna < notas[linha].length; coluna++) {
        soma = soma + notas[linha][coluna];
    }
    console.log(alunos[linha] + ": média " + (soma / notas[linha].length).toFixed(1));
}
// Ana: média 7.8
// Bruno: média 6.6
// Carla: média 9.4
```

Para a média de cada **bimestre** (coluna), inverta: o laço de fora percorre as colunas e o de dentro as linhas. Outro clássico é a **tabuada em matriz**, em que `tabuada[i][j]` guarda `(i + 1) * (j + 1)`:

```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15        tabuada[2][3] → 3 x 4 = 12
   4   8  12  16  20
   5  10  15  20  25
```

Os dois exemplos estão em [`exemplos/matriz-notas-e-tabuada.js`](exemplos/matriz-notas-e-tabuada.js). O `padStart(4, " ")` completa cada número com espaços à esquerda para as colunas ficarem alinhadas.

## 12.3 Busca linear x busca binária

**Busca linear:** olhar item por item, do começo ao fim, até achar. Funciona em **qualquer** lista. É o que você faz desde a aula 10 (`siglaJaExiste`, `buscarCurso`, `buscarPorId`, `buscarProfessor`).

**Busca binária:** só funciona em lista **ordenada**. É o jeito de procurar uma palavra no dicionário: abre no meio; se a palavra vem depois, descarta a metade da esquerda; repete com a metade que sobrou.

```javascript
function buscaBinaria(lista, procurado) {
    let inicio = 0;
    let fim = lista.length - 1;
    let comparacoes = 0;
    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);
        comparacoes = comparacoes + 1;
        if (lista[meio] === procurado) {
            return meio;
        }
        if (lista[meio] < procurado) {
            inicio = meio + 1;      // está à direita: descarta a esquerda
        } else {
            fim = meio - 1;         // está à esquerda: descarta a direita
        }
    }
    return -1;                      // -1 = não encontrou
}
```

Teste de mesa procurando o **57** em `[3, 8, 15, 23, 42, 57, 91]`:

```
   passo │ inicio │ fim │ meio │ lista[meio] │ decisão
   ──────┼────────┼─────┼──────┼─────────────┼──────────────────────
     1   │   0    │  6  │  3   │     23      │ 23 < 57 → inicio = 4
     2   │   4    │  6  │  5   │     57      │ achou na posição 5
```

A linear precisou de **6** comparações (posições 0 a 5); a binária, de **2**. Rode [`exemplos/busca-linear-e-binaria.js`](exemplos/busca-linear-e-binaria.js):

```
linear: achou 57 na posição 5 com 6 comparações
binária: achou 57 na posição 5 com 2 comparações
linear: achou 1000 na posição 999 com 1000 comparações
binária: achou 1000 na posição 999 com 10 comparações
```

O mesmo arquivo joga **adivinhe o número** de 1 a 100 com a estratégia da binária (sempre chutar o meio): acha o 73 em 6 tentativas (50, 75, 62, 68, 71, 73). Com essa estratégia, nunca passa de 7.

**Cuidado:** em lista desordenada, a busca binária dá respostas erradas **sem avisar**. Por isso, antes dela, vem a ordenação.

## 12.4 Map e Set: buscar pela chave, sem laço

A binária já é bem mais rápida que a linear. Mas, quando a pergunta é sempre "**tem** esse?" ou "**qual é** o de id 5?", dá para fazer melhor: guardar os dados de um jeito que a resposta venha **direto pela chave**, sem laço nenhum.

**Set: um saco de valores sem repetição.** Ele responde "esse valor está aqui?":

```javascript
let presentes = new Set();
presentes.add("Ana");
presentes.add("Bruno");
presentes.add("Ana");              // já existe: o add não faz nada

presentes.has("Ana");              // true
presentes.has("Diego");            // false
presentes.size;                    // 2 (o Ana repetido não conta)
presentes.delete("Bruno");         // tira o Bruno
```

Um uso clássico é a **lista de presença sem repetidos**: mesmo que a Ana responda três vezes na chamada, ela entra uma vez só.

**Map: um armário de gavetas com etiqueta.** Cada gaveta tem uma **chave** (a etiqueta) e um **valor** (o que está dentro). Ele responde "o que está guardado na chave X?":

```javascript
const TURNOS = new Map([
    [1, { nome: "Manhã", horario: "08h às 12h" }],
    [2, { nome: "Tarde", horario: "13h30 às 17h30" }],
    [3, { nome: "Noite", horario: "18h30 às 22h30" }]
]);

TURNOS.get(2);                     // { nome: "Tarde", horario: "13h30 às 17h30" }
TURNOS.get(2).horario;             // "13h30 às 17h30"
TURNOS.has(4);                     // false: não existe turno 4
TURNOS.size;                       // 3
```

```
   Map TURNOS                                 Set presentes
   ┌───────┬──────────────────────────┐       ┌─────────────────┐
   │ chave │ valor                    │       │  "Ana"  "Carla" │  só valores,
   ├───────┼──────────────────────────┤       │                 │  sem ordem
   │   1   │ { Manhã, 08h às 12h }    │       │  has("Ana")?    │  e sem repetição
   │   2   │ { Tarde, 13h30 às 17h30 }│       │  → true         │
   │   3   │ { Noite, 18h30 às 22h30 }│       └─────────────────┘
   └───────┴──────────────────────────┘
   get(2) → vai direto na gaveta 2
```

| | Set | Map |
|---|---|---|
| Guarda | valores | pares **chave → valor** |
| Pôr | `add(valor)` | `set(chave, valor)` |
| Pegar | (não pega: só pergunta) | `get(chave)` (ou `undefined`) |
| Perguntar | `has(valor)` | `has(chave)` |
| Tirar | `delete(valor)` | `delete(chave)` |
| Quantos | `size` | `size` |

Repare: é `size`, sem parênteses, e não `length`.

**A lista continua sendo a fonte.** No projeto, o Map e o Set **não substituem** as listas de objetos: eles são **atalhos** montados a partir delas. Quando a lista muda, o atalho precisa ser montado de novo:

```javascript
let laboratoriosPorId = new Map();
for (let i = 0; i < laboratorios.length; i++) {
    laboratoriosPorId.set(laboratorios[i].id, laboratorios[i]);
}
laboratoriosPorId.get(5).nome;     // "Enfermagem", sem percorrer a lista
```

**Por que é mais rápido?** O Map e o Set calculam, a partir da chave, **onde** o valor está guardado, e vão direto lá. Não importa se são 5 ou 5 mil itens: o trabalho é o mesmo. Rode [`exemplos/map-e-set.js`](exemplos/map-e-set.js): a busca linear do item 1000 faz 1000 comparações; o `get(1000)` vai direto.

**Cuidado (vai doer na aula 13):** `JSON.stringify(new Map())` devolve `"{}"`. Map e Set **não viram texto JSON**, e os dados somem sem nenhum erro. Por isso, quando formos salvar, salvaremos as **listas** e montaremos os atalhos de novo ao carregar.

## 12.5 Bubble sort à mão

O **bubble sort** compara **vizinhos** e troca os dois se estiverem fora de ordem. A cada volta, o maior valor que sobrou "borbulha" até o fim. Passo a passo com `[5, 1, 4, 2, 8]`:

```
   VOLTA 1                                    comparações
   [5  1] 4  2  8    5 > 1? sim, troca → [1, 5, 4, 2, 8]     1
    1 [5  4] 2  8    5 > 4? sim, troca → [1, 4, 5, 2, 8]     2
    1  4 [5  2] 8    5 > 2? sim, troca → [1, 4, 2, 5, 8]     3
    1  4  2 [5  8]   5 > 8? não                              4
                                        o 8 chegou ao lugar ─────► [1, 4, 2, 5, | 8]
   VOLTA 2
   [1  4] 2  5 | 8   1 > 4? não                              5
    1 [4  2] 5 | 8   4 > 2? sim, troca → [1, 2, 4, 5, 8]     6
    1  2 [4  5]| 8   4 > 5? não                              7
                                        o 5 chegou ao lugar ─────► [1, 2, 4, | 5, 8]
   VOLTA 3
   [1  2] 4 | 5  8   não                                     8
    1 [2  4]| 5  8   não                                     9
   VOLTA 4
   [1  2]| 4  5  8   não                                    10
                                                    resultado: [1, 2, 4, 5, 8]
```

Em código, o laço de fora conta as voltas, e o de dentro compara os vizinhos. O `- volta` no limite do laço de dentro evita comparar o fim, que já está no lugar. A troca usa uma variável **auxiliar**, como trocar o suco de dois copos usando um terceiro copo:

```javascript
for (let volta = 0; volta < lista.length - 1; volta++) {
    for (let i = 0; i < lista.length - 1 - volta; i++) {
        if (lista[i] > lista[i + 1]) {
            let auxiliar = lista[i];
            lista[i] = lista[i + 1];
            lista[i + 1] = auxiliar;
        }
    }
}
```

## 12.6 Selection sort à mão

O **selection sort** pensa diferente: a cada volta, **procura o menor** da parte que ainda não está ordenada e o coloca na frente dessa parte. Com a mesma lista:

```
   [5, 1, 4, 2, 8]     menor de tudo: 1      → troca com o 5 → [1 | 5, 4, 2, 8]
   [1 | 5, 4, 2, 8]    menor do resto: 2     → troca com o 5 → [1, 2 | 4, 5, 8]
   [1, 2 | 4, 5, 8]    menor do resto: 4     → já está lá    → [1, 2, 4 | 5, 8]
   [1, 2, 4 | 5, 8]    menor do resto: 5     → já está lá    → [1, 2, 4, 5, 8]
```

```javascript
for (let i = 0; i < lista.length - 1; i++) {
    let menor = i;                                  // posição do menor até agora
    for (let j = i + 1; j < lista.length; j++) {
        if (lista[j] < lista[menor]) {
            menor = j;
        }
    }
    let auxiliar = lista[i];
    lista[i] = lista[menor];
    lista[menor] = auxiliar;
}
```

O laço de dentro é o padrão "encontrar o menor" da aula 10. O selection faz **no máximo uma troca por volta**; o bubble pode trocar várias vezes na mesma volta. Mas os dois fazem o mesmo número de **comparações**: 4 + 3 + 2 + 1 = **10** para 5 itens. Confira em [`exemplos/bubble-e-selection-sort.js`](exemplos/bubble-e-selection-sort.js), que imprime a lista no fim de cada volta.

## 12.7 O `sort` pronto, a armadilha e o comparador

O JavaScript já tem ordenação pronta, mais rápida que as nossas. Mas olhe:

```javascript
let numeros = [10, 9, 1];
numeros.sort();
console.log(numeros);    // [1, 10, 9]   ← errado!
```

Sem nada entre os parênteses, o `sort` transforma tudo em **texto** e ordena como no dicionário: `"10"` vem antes de `"9"` porque o caractere `"1"` vem antes do `"9"`. Para ordenar números, passe uma **função de comparação** (o comparador). Ela recebe dois itens, `a` e `b`, e devolve:

- um número **negativo** → `a` vem antes;
- um número **positivo** → `b` vem antes;
- **zero** → tanto faz.

```javascript
numeros.sort(function (a, b) {
    return a - b;        // crescente: [1, 9, 10]
});

numeros.sort(function (a, b) {
    return b - a;        // decrescente: [10, 9, 1]
});
```

Por que `a - b` funciona? Se `a` é 1 e `b` é 9, `1 - 9 = -8` (negativo): o 1 vem antes. É a única vez no curso em que uma função recebe outra função como parâmetro: escreva sempre nesse formato, `sort(function (a, b) { ... })`.

Com objetos, compare as propriedades. E para **dois critérios** (primeiro o dia; no mesmo dia, o turno), teste o primeiro e, se empatar, decida pelo segundo:

```javascript
aulas.sort(function (a, b) {
    if (a.dia !== b.dia) {
        return a.dia - b.dia;
    }
    return a.turno - b.turno;
});
```

**Atenção:** o `sort` **altera a lista original**. Se a ordem original importa (a ordem de cadastro, por exemplo), ordene uma **cópia** (`copiarLista`, no 12.9). Os exemplos estão em [`exemplos/sort-com-comparador.js`](exemplos/sort-com-comparador.js).

## 12.8 Big-O leve: quanto trabalho cada algoritmo dá

**Big-O** é o jeito de dizer como o trabalho de um algoritmo **cresce** quando a lista cresce. Não mede segundos (isso depende do computador); mede quantas comparações ele faz. Com `n` itens:

```
   n (itens) │ busca linear │ busca binária │ Map / Set │ bubble / selection
             │  (pior caso) │  (pior caso)  │  get/has  │   n x (n - 1) / 2
   ──────────┼──────────────┼───────────────┼───────────┼────────────────────
        5    │       5      │       3       │     1     │          10
       10    │      10      │       4       │     1     │          45
      100    │     100      │       7       │     1     │       4.950
     1000    │    1000      │      10       │     1     │     499.500
             │    O(n)      │   O(log n)    │   O(1)    │        O(n²)
```

- **O(1), constante:** a lista cresce e o trabalho **não muda**. É o Map e o Set;
- **O(log n), logarítmico:** a lista dobra, o trabalho aumenta **um passo**;
- **O(n), linear:** a lista dobra, o trabalho dobra;
- **O(n²), quadrático:** a lista dobra, o trabalho **quadruplica**. É o custo do laço dentro de laço sobre a mesma lista.

Para os 5 laboratórios da escola, qualquer algoritmo é instantâneo, e o mais fácil de ler ganha. Big-O importa quando a lista é grande: 1 milhão de alunos, por exemplo. O `sort` pronto usa algoritmos mais espertos (O(n log n)) e por isso é o que se usa no dia a dia. Bubble e selection servem para **entender** o que acontece por dentro.

E o preço do Map/Set? Ele ocupa memória a mais e precisa ser **mantido**: toda vez que a lista muda, o atalho é montado de novo. Vale a pena quando a mesma pergunta é feita muitas vezes (como "esse horário está ocupado?").

## 12.9 Projeto da disciplina: o que fazemos hoje (CP5)

Parta do seu CP4: o mesmo `alunos/joao-lucas/prompt/script.js`, agora na branch `joao-lucas/cp5` (criada a partir da `main`, depois do merge do CP4). Ao fim desta aula, **a regra de negócio está pronta**; daqui para a frente, o trabalho é tela, arquivos e acabamento.

**Passo 0. Refatorar: os blocos de leitura viram funções.** No fim da aula 11 você contou os blocos de leitura do CP4: na referência são 16. Coloque três deles lado a lado:

```javascript
// opção do menu                            // alunos da turma                          // escolher na lista
let opcao = 0;                              let alunos = 0;                             let numero = 0;
do {                                        do {                                        do {
    let resposta = prompt("CURSOS ...");        let resposta = prompt("Número de...");      let resposta = prompt(pergunta + ...);
    ...estaNaFaixa(..., 1, 6)...                ...estaNaFaixa(..., 1, 60)...               ...estaNaFaixa(..., 1, quantidade)...
} while (opcao === 0 && cancelou === false);} while (alunos === 0 && ...);              } while (numero === 0 && ...);
```

O que muda de uma cópia para a outra? Só **a pergunta**, **o mínimo** e **o máximo**. Na aula 10 você aprendeu que o que muda vira **parâmetro**. Então:

```javascript
function lerNumero(pergunta, minimo, maximo) {
    let numero = null;
    let cancelou = false;
    do {
        let resposta = prompt(pergunta);
        if (resposta === null) {
            cancelou = true;
        } else if (somenteDigitos(resposta.trim()) === false) {
            alert("Digite apenas números inteiros.");
        } else if (estaNaFaixa(Number(resposta), minimo, maximo) === false) {
            alert("Valor inválido. Escolha de " + minimo + " a " + maximo + ".");
        } else {
            numero = Number(resposta);
        }
    } while (numero === null && cancelou === false);
    return numero;
}
```

É **o mesmo bloco** que você já escreveu muitas vezes, com duas diferenças:

- a variável começa em `null` (e não em `0`): "ainda não tenho o número";
- no fim, um único `return numero;`. Se o usuário cancelou, `numero` continua `null`, e é isso que a função devolve.

Os blocos de **texto** também se repetem, com um detalhe a mais: no **alterar**, "em branco = mantém o valor atual"; no **cadastro**, em branco é proibido. Um parâmetro resolve as duas situações:

```javascript
// Em branco: devolve o valor atual (no alterar).
// No cadastro não há valor atual (""), então em branco pede de novo.
function lerTexto(pergunta, valorAtual) {
    let texto = null;
    let cancelou = false;
    do {
        let resposta = prompt(pergunta);
        if (resposta === null) {
            cancelou = true;
        } else if (resposta.trim() !== "") {
            texto = resposta.trim();
        } else if (valorAtual !== "") {
            texto = valorAtual;
        } else {
            alert("Este campo é obrigatório.");
        }
    } while (texto === null && cancelou === false);
    return texto;
}
```

Com as duas prontas, o resto encolhe:

- a `escolherNaLista` vira três linhas em volta da `lerNumero(pergunta + "\n\n" + textoDaLista, 1, quantidade)`;
- os menus: `opcao = lerNumero(textoDoMenu, 1, 6);` seguido de `if (opcao === null) { opcao = 6; }` (Cancelar = Voltar/Sair);
- as leituras com regra própria viram funções pequenas que chamam a `lerTexto` e acrescentam a regra: `lerSigla(pergunta, siglaAtual)`, `lerNomeDaTurma(pergunta, turmaAtual)`, `lerAlunos(pergunta, alunosAtual)` e `lerNomeCompleto(pergunta, nomeAtual)`.

Cada cadastro fica curto e legível:

```javascript
// ANTES (CP4): dois blocos do...while de 15 linhas cada
// DEPOIS (CP5):
function cadastrarCurso() {
    let sigla = lerSigla("Sigla do curso (2 a 4 letras, ex.: ADM):", "");
    if (sigla === null) {
        return;
    }
    let nome = lerTexto("Nome do curso:", "");
    if (nome === null) {
        return;
    }
    let curso = { id: proximoIdCurso, sigla: sigla, nome: nome };
    cursos.push(curso);
    proximoIdCurso = proximoIdCurso + 1;
    atualizarSiglas();
    alert("Curso cadastrado: " + textoDoCurso(curso));
}
```

E o alterar usa a **mesma** função, passando o valor atual: `lerTexto("Novo nome (em branco = manter " + curso.nome + "):", curso.nome)`. (O `atualizarSiglas()` é do passo 3; por enquanto, ignore.)

**Refatorar** é mudar a **estrutura** do código sem mudar o **comportamento**. Por isso, o jeito certo de fazer é:

1. Antes de mexer, teste todas as opções do menu do CP4 (inclusive o Cancelar em cada pergunta) e anote o que acontece;
2. Escreva `lerNumero` e `lerTexto` e teste as duas no console (`lerNumero("Teste", 1, 5)`: digite `9`, depois `abc`, depois `3`; depois teste o Cancelar; `lerTexto("Nome:", "ADM")`: deixe em branco e veja voltar `"ADM"`);
3. Troque **um** bloco por vez e teste aquela pergunta, inclusive o Cancelar;
4. No fim, rode de novo o roteiro do item 1: tudo deve funcionar igual (só as mensagens de erro ficaram padronizadas).

No CP5 de referência sobram **6** blocos `do...while` de leitura, um dentro de cada função de leitura, em vez de 16 espalhados.

```bash
git add .
git commit -m "refactor: junta os blocos de leitura em lerNumero e lerTexto"
git push
```

**Passo 1. Calendário da semana (matriz 6 dias x 3 turnos).** A função monta a grade de **um** laboratório a partir da lista de reservas: `""` = livre; senão, o nome da turma.

```javascript
// grade[dia][turno]: 6 linhas (dias) x 3 colunas (turnos)
// "" = livre; senão, o nome da turma
function montarGrade(idLaboratorio) {
    let grade = [];
    for (let dia = 0; dia < DIAS.length; dia++) {
        grade.push(["", "", ""]);
    }
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.laboratorio === idLaboratorio) {
            grade[reserva.dia - 1][reserva.turno - 1] = buscarPorId(turmas, reserva.turma).nome;
        }
    }
    return grade;
}
```

O `- 1` existe porque dia e turno são guardados de 1 em diante (como no Portugol), e a matriz começa em 0. A `mostrarCalendario()` escolhe o laboratório, chama `montarGrade` e percorre a matriz com laço aninhado, montando um texto para o `alert`. No sábado, a tarde e a noite aparecem como "fechado" (`turnoPermitido`):

```
CALENDÁRIO DA SEMANA - Informática

Segunda: [Manhã ADM09] [Tarde livre] [Noite livre]
Terça: [Manhã livre] [Tarde livre] [Noite livre]
Quarta: [Manhã livre] [Tarde livre] [Noite DSI02]
Quinta: [Manhã livre] [Tarde livre] [Noite livre]
Sexta: [Manhã livre] [Tarde livre] [Noite livre]
Sábado: [Manhã livre] [Tarde fechado] [Noite fechado]
```

**Passo 2. Buscas: linear x binária.** A busca de **professor por nome** (`buscarProfessor`) continua **linear**: o nome pode estar em qualquer lugar e a busca é por parte do nome. Já a **reserva pelo número** (id) dá para fazer das duas formas, contando as comparações. As duas funções devolvem um objeto com a posição e a contagem:

```javascript
// BUSCA BINÁRIA: só funciona com a lista ORDENADA por id.
// Olha o meio e descarta a metade onde o id não pode estar.
function buscaBinariaPorId(lista, id) {
    let inicio = 0;
    let fim = lista.length - 1;
    let comparacoes = 0;
    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);
        comparacoes = comparacoes + 1;
        if (lista[meio].id === id) {
            return { posicao: meio, comparacoes: comparacoes };
        }
        if (lista[meio].id < id) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    return { posicao: -1, comparacoes: comparacoes };
}
```

A `buscaLinearPorId(lista, id)` é a mesma ideia com o `for` do começo ao fim. A `buscarReservaPeloNumero()` (opção 7 do menu) lê o número com `lerNumero`, copia a lista, garante a ordem por id com `sort(function (a, b) { return a.id - b.id; })` e mostra as duas contagens:

```
Nº 4 - Quinta, Noite (18h30 às 22h30) - Eletrotécnica - ELT03 - Prof. Marcos Pereira

Busca linear: 4 comparações
Busca binária: 3 comparações
```

Com 4 reservas a diferença é pequena. Cadastre mais umas dez e procure a última: a linear cresce junto com a lista; a binária quase não muda.

**Passo 3. Map: `TURNOS` e `laboratoriosPorId`.** No CP4, o nome e o horário do turno moravam em **dois arrays paralelos** (`TURNOS` e `HORARIOS`), o mesmo problema da aula 11. Agora, um Map só (o código do 12.4). O texto do horário fica:

```javascript
function textoDoHorario(dia, turno) {
    let dadosDoTurno = TURNOS.get(turno);
    return DIAS[dia - 1] + ", " + dadosDoTurno.nome + " (" + dadosDoTurno.horario + ")";
}
```

Repare que o Map usa **o próprio número do turno** como chave (1, 2, 3): não precisa do `- 1`. E como o Map não é array, a lista de turnos usa `TURNOS.size` no lugar de `length`.

Os laboratórios são procurados pelo id o tempo todo (em cada texto de reserva). Como eles **não mudam** (são espaços físicos), o Map é montado **uma vez só**, no começo do programa, e a busca perde o laço:

```javascript
// Com o Map, não precisa de laço
function buscarLaboratorio(id) {
    if (laboratoriosPorId.has(id)) {
        return laboratoriosPorId.get(id);
    }
    return null;
}
```

**Passo 4. Set: `siglasCadastradas` e `horariosOcupados`.** Duas perguntas do sistema são do tipo "**já tem**?". São trabalho para o Set.

A **sigla repetida**: no lugar do laço do `siglaJaExiste`, um Set com todas as siglas. Como os cursos **mudam**, o Set é montado de novo depois de cada cadastro, alteração ou exclusão:

```javascript
let siglasCadastradas = new Set();

function atualizarSiglas() {
    siglasCadastradas.clear();
    for (let i = 0; i < cursos.length; i++) {
        siglasCadastradas.add(cursos[i].sigla);
    }
}

// Com o Set, não precisa de laço. siglaAtual = "" no cadastro.
function siglaJaExiste(sigla, siglaAtual) {
    let maiuscula = sigla.toUpperCase();
    return maiuscula !== siglaAtual && siglasCadastradas.has(maiuscula);
}
```

O **conflito de horário**: no CP4, o `horarioLivre` percorria todas as reservas. Agora, cada reserva vira um **texto-chave** `"laboratorio-dia-turno"` num Set. A reserva 1 (Informática, quarta, noite) vira `"2-3-3"`:

```javascript
let horariosOcupados = new Set();

function chaveDoHorario(idLaboratorio, dia, turno) {
    return idLaboratorio + "-" + dia + "-" + turno;
}

function atualizarHorariosOcupados() {
    horariosOcupados.clear();
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        horariosOcupados.add(chaveDoHorario(reserva.laboratorio, reserva.dia, reserva.turno));
    }
}

// Com o Set, não precisa percorrer as reservas
function horarioLivre(idLaboratorio, dia, turno) {
    return horariosOcupados.has(chaveDoHorario(idLaboratorio, dia, turno)) === false;
}
```

Repare: **quem chama** o `horarioLivre` não mudou nada (a `novaReserva` e a `atenderListaDeEspera` continuam iguais). Só o **jeito** de responder mudou. Para o Set nunca ficar desatualizado, toda mudança nas reservas passa por duas funções: `adicionarReserva(pedido)` e a nova `removerReserva(id)`, que fazem a mudança na lista e chamam `atualizarHorariosOcupados()`. O cancelar e o desfazer passam a usar `removerReserva`.

| Atalho | Para quê | Antes (CP4) | Depois (CP5) | Remonta quando |
|---|---|---|---|---|
| `TURNOS` (Map) | nome e horário do turno | dois arrays paralelos | `TURNOS.get(2).horario` | nunca (é constante) |
| `laboratoriosPorId` (Map) | achar o laboratório | laço na lista | `get(id)` | nunca (só leitura) |
| `siglasCadastradas` (Set) | "a sigla já existe?" | laço na lista | `has(sigla)` | `atualizarSiglas()` |
| `horariosOcupados` (Set) | conflito de horário | laço nas reservas | `has("2-3-3")` | `atualizarHorariosOcupados()` |

**Passo 5. Ordenação à mão: professores por nome (selection) e reservas por dia e turno (bubble).** Primeiro, uma função que copia a lista, para não bagunçar a ordem de cadastro:

```javascript
function copiarLista(lista) {
    let copia = [];
    for (let i = 0; i < lista.length; i++) {
        copia.push(lista[i]);
    }
    return copia;
}
```

A `ordenarPorNome(lista)` é o selection sort do 12.6, comparando `ordenada[j].nome.toLowerCase() < ordenada[menor].nome.toLowerCase()` (sem o `toLowerCase`, um nome digitado em minúsculas iria para o fim, porque as maiúsculas vêm antes no computador). Ela devolve a cópia ordenada e entra no submenu de professores como "Listar por nome".

A `ordenarPorDiaETurno(lista)` é o bubble sort do 12.5. A única diferença é a pergunta "está fora de ordem?", que agora tem **dois critérios** e por isso ganha uma função só para ela:

```javascript
function reservaVemDepois(a, b) {
    if (a.dia !== b.dia) {
        return a.dia > b.dia;
    }
    return a.turno > b.turno;
}

// BUBBLE SORT: compara vizinhos e troca se estiverem fora de ordem
function ordenarPorDiaETurno(lista) {
    let ordenada = copiarLista(lista);
    for (let volta = 0; volta < ordenada.length - 1; volta++) {
        for (let i = 0; i < ordenada.length - 1 - volta; i++) {
            if (reservaVemDepois(ordenada[i], ordenada[i + 1])) {
                let auxiliar = ordenada[i];
                ordenada[i] = ordenada[i + 1];
                ordenada[i + 1] = auxiliar;
            }
        }
    }
    return ordenada;
}
```

Use-a no `verReservas()` e no `cancelarReserva()`, para a lista numerada sair em ordem de dia e turno. Cuidado no cancelar: a pessoa escolhe o número na lista **ordenada**, então a reserva escolhida é `ordenadas[posicao]`, e quem remove é `removerReserva(reserva.id)`, pelo **id** (a posição na lista original é outra).

Teste tudo e faça o commit do CP5, de dentro de `alunos/joao-lucas/`:

```bash
git add .
git commit -m "feat: adiciona calendario, buscas, Map, Set e ordenacoes (CP5)"
git push
```

Agora, abra o Pull Request da branch `joao-lucas/cp5` para a `main` e confira o check do Action (só a sua pasta, `node --check` nos `.js`, nenhum arquivo indevido). O professor revisa e comenta no PR; você corrige na mesma branch e faz push de novo, e o professor faz o merge. A partir da aula 13, o trabalho segue numa branch nova, criada do mesmo jeito (`git switch main`, `git pull`, `git switch -c joao-lucas/<assunto>`).

## 12.10 Erros comuns

| Sintoma | Causa |
|---|---|
| `Cannot read properties of undefined (reading '0')` | Linha fora da matriz: `grade[6]` não existe (dias vão de 0 a 5). Confira o `- 1` do `dia` e do `turno` |
| Linhas e colunas trocadas no calendário | A ordem é `grade[linha][coluna]`, ou seja, `grade[dia][turno]` |
| A média sai somando os alunos anteriores | A `soma` foi declarada fora do laço de fora; ela precisa zerar a cada linha |
| Busca binária não acha um item que existe | A lista não estava ordenada (ou foi ordenada com `sort()` sem comparador) |
| Busca binária trava a página | Escreveu `inicio = meio` em vez de `meio + 1`: o intervalo nunca encolhe |
| `TURNOS.get(2)` dá `undefined` | A chave foi guardada como texto (`"2"`) e procurada como número (`2`): para o Map, são chaves diferentes |
| `TURNOS.length` dá `undefined` | Map e Set usam `size`, e não `length` |
| Cadastrou a sigla DSW e o sistema aceita outra DSW | Faltou chamar `atualizarSiglas()` depois do `push` |
| Cancelou a reserva e o horário continua "ocupado" | Removeu da lista com `splice` direto, sem `atualizarHorariosOcupados()`. Use `removerReserva` |
| Números ordenados como `1, 10, 9` | `sort()` sem comparador ordena como texto |
| A ordem de cadastro dos professores mudou | Ordenou a lista original; use `copiarLista` antes |
| O bubble sort não ordena tudo | O laço de fora parou cedo, ou faltou trocar as duas posições usando a `auxiliar` |
| Cancelou uma reserva e sumiu outra | Usou a posição da lista **ordenada** no `splice` da lista original; remova pelo id |
| Depois da refatoração, Cancelar não sai da reserva | Ficou um `if (dia === 0)` antigo: a `lerNumero` devolve `null`, então o teste é `=== null` |
| Cancelar no menu trava ou repete o menu | Faltou `if (opcao === null) { opcao = 12; }` logo depois do `lerNumero` do menu |
| A `lerNumero` aceita um valor inválido e devolve `0` | A variável começou em `0`, mas a condição testa `numero === null`: o laço termina na primeira volta. Comece com `let numero = null;` |
| No cadastro, em branco é aceito | Chamou `lerTexto(pergunta, curso.nome)` no cadastro; no cadastro, o valor atual é `""` |

## 12.11 Exercícios em aula

1. **Matriz de notas.** Com a matriz do 12.1, mostre a maior nota da turma e de quem ela é (laço aninhado + padrão "maior").
2. **Cinema.** Crie uma matriz 4 x 5 de `"L"` (livre). Marque com `"X"` as poltronas `[0][2]`, `[1][1]` e `[3][4]`. Mostre o mapa no console, uma linha por fileira, e quantas poltronas estão livres.
3. **Lista de presença com Set.** A chamada teve as respostas `["Ana", "Bruno", "Ana", "Carla", "Bruno", "Ana", "Diego"]`. Com um Set, diga quantos alunos vieram e se a "Elisa" veio. Depois faça um Map `faltas` com nome → número de faltas (`{ Ana: 0, Elisa: 3 }`) e mostre as faltas da Elisa com `get`.
4. **Bubble sort no papel.** Ordene `[7, 3, 9, 1, 5]` à mão, desenhando cada comparação como no 12.5. Quantas comparações e quantas trocas? Depois confira trocando a lista do exemplo.
5. **Selection sort no papel.** Ordene `["Pedro", "Ana", "Lia", "Caio"]` à mão com selection sort, desenhando cada volta como no 12.6.
6. **Adivinhe com binária.** No jogo de 1 a 100, quantas tentativas a estratégia do meio leva para achar o 1? E o 100? Por que nunca passa de 7?
7. **A armadilha.** Antes de rodar, escreva o que `[25, 100, 3].sort()` devolve. Rode, explique o resultado e corrija com o comparador.
8. **(Projeto) Ocupação de um laboratório.** No `mostrarCalendario()`, conte as células ocupadas da grade (laço aninhado + contador) e mostre no fim: "2 de 16 horários ocupados (13%)". São 16 horários porque o sábado só tem a manhã (6 x 3 = 18, menos 2 fechados). Use `toFixed(0)`.
9. **(Projeto) Professores com reserva.** Mostre quantos professores **diferentes** têm reserva na semana. Percorra as reservas e coloque cada `reserva.professor` num Set; a resposta é o `size`.

## 12.12 Desafio para a próxima aula

**Quantas trocas o bubble sort fez?** Na `ordenarPorDiaETurno()`, além de ordenar, conte quantas **trocas** aconteceram. Como a função já devolve a lista ordenada, guarde a contagem numa variável global `trocasDoUltimoBubble` (zerada no começo da função) e mostre-a no título do `verReservas()`:

```
RESERVAS DA SEMANA (bubble sort por dia e turno: 2 troca(s))
```

Depois teste três situações e anote os números: (a) as reservas iniciais; (b) cancele tudo e faça as reservas **já em ordem** de dia e turno; (c) faça as reservas em ordem **inversa** (sábado primeiro). Responda num comentário no código: em qual caso o bubble sort faz mais trocas? E o número de comparações muda? Extra: acrescente a flag `houveTroca`, que para o laço de fora quando uma volta inteira não troca nada, e veja as comparações caírem no caso (b).

## 12.13 Resumo

- Matriz = array de arrays; acesso `matriz[linha][coluna]`; cada linha criada com o seu próprio `[ ]`;
- Laço aninhado: o de dentro roda inteiro a cada volta do de fora;
- Busca linear: olha um por um, funciona sempre, O(n). Busca binária: descarta metade a cada passo, O(log n), **exige lista ordenada**;
- **Set** (`add`, `has`, `delete`, `size`): valores sem repetição, responde "tem?". **Map** (`set`, `get`, `has`, `delete`, `size`): chave → valor. Os dois respondem pela chave, sem laço: O(1);
- No projeto, a lista é a **fonte** e o Map/Set é um **atalho** montado a partir dela; quando a lista muda, o atalho é montado de novo. Map e Set **não viram JSON**;
- Bubble sort: compara vizinhos e troca. Selection sort: acha o menor e põe na frente. Os dois fazem n x (n - 1) / 2 comparações, O(n²);
- `sort()` sem comparador ordena como texto (`[10, 9, 1]` vira `[1, 10, 9]`); com números, use `sort(function (a, b) { return a - b; })`;
- O `sort` altera a lista original; para preservar a ordem, ordene uma cópia;
- **Refatorar** = mudar a estrutura sem mudar o comportamento: os blocos de leitura repetidos viram `lerNumero(pergunta, minimo, maximo)` e `lerTexto(pergunta, valorAtual)`, que devolvem `null` no Cancelar;
- No projeto: calendário da semana (matriz 6 x 3), busca linear x binária, `TURNOS` e `laboratoriosPorId` (Map), `siglasCadastradas` e `horariosOcupados` (Set), `ordenarPorNome` (selection) e `ordenarPorDiaETurno` (bubble). **Regra de negócio pronta (CP5).**
