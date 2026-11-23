**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-18-projeto-publicacao-e-apresentacao/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-20-prova/README.md)

---

# AULA 19 — Revisão

## Objetivos da aula

- Revisar **toda a disciplina** por tema, do algoritmo em português ao JavaScript no navegador;
- Treinar a **leitura de algoritmos em Portugol**, incluindo `procedimento` e `funcao`;
- Treinar o **teste de mesa**, que é a ferramenta principal da prova;
- Resolver exercícios de JavaScript no estilo da prova: tipos, decisão, laços, arrays, funções, objetos, matriz e ordenação;
- Descobrir **o que você ainda não sabe**, a tempo de estudar antes da aula 20.

## 19.1 Como usar esta revisão

A disciplina teve duas metades que falam da **mesma lógica** com roupas diferentes:

```
   AULAS 1-3          AULAS 4-7              AULAS 8-12             AULAS 13-18
   algoritmo,    ──►  Portugol (VisualG) ──► JavaScript        ──►  telas, arquivos
   fluxograma,        variáveis, decisão,    os mesmos conceitos,   e o projeto
   Git                repetição, vetor,      + objetos, pilha,      publicado
                      matriz, funções        fila, ordenação
```

A prova cobra principalmente o meio: **Portugol** (ler e fazer teste de mesa) e **JavaScript** (ler código e prever o resultado). Para cada tema abaixo há uma "cola" com o essencial. Leia, e depois vá direto aos exercícios do 19.14. Quem errar um exercício volta à seção do tema.

## 19.2 Algoritmo e fluxograma (aulas 1 e 2)

- **Algoritmo:** sequência finita de passos, sem ambiguidade, que resolve um problema.
- **Programa:** algoritmo escrito numa linguagem que o computador executa.
- **Compilada × interpretada:** compilada é traduzida inteira antes de rodar (gera um executável); interpretada é traduzida e executada linha a linha (o JavaScript no navegador).

```
   (  INÍCIO/FIM  )   oval             ┌──────────┐  retângulo: processo (conta, atribuição)
                                       └──────────┘
   /  ENTRADA   /     paralelogramo        ◇        losango: DECISÃO (sim/não)
                                       seta que volta: REPETIÇÃO
```

## 19.3 Portugol: variáveis, operadores e decisão (aula 4)

| Item | VisualG | Exemplo |
|---|---|---|
| Tipos | `inteiro`, `real`, `caractere`, `logico` | `capacidade: inteiro` |
| Atribuição | `<-` | `vagas <- capacidade - alunos` |
| Entrada / saída | `leia(x)` / `escreva(...)`, `escreval(...)` | `escreval("Vagas: ", vagas)` |
| Aritméticos | `+ - * /`, `\` (divisão inteira), `mod` (resto) | `17 \ 5` = 3 · `17 mod 5` = 2 |
| Relacionais | `= <> < > <= >=` | `alunos <= capacidade` |
| Lógicos | `e`, `ou`, `nao` | `(dia >= 1) e (dia <= 6)` |
| Decisão | `se ... entao ... senao ... fimse` | |
| Múltipla escolha | `escolha x` / `caso 1` / `outrocaso` / `fimescolha` | turno 1, 2, 3 |

Atenção: no Portugol, `=` **compara**; quem guarda valor é `<-`. No JavaScript é o contrário do que parece: `=` guarda e `===` compara.

## 19.4 Repetição e teste de mesa (aula 5)

| Estrutura | Testa | Roda pelo menos 1 vez? | Uso típico |
|---|---|---|---|
| `para i de 1 ate n faca` | — | se `n >= 1` | número de voltas conhecido |
| `enquanto cond faca` | antes | não | repetir enquanto algo for verdade |
| `repita ... ate cond` | depois | **sim** | validação: perguntar até ser válido |

**Teste de mesa** é executar o algoritmo no papel, como se você fosse o computador. Uma coluna por variável, uma linha por mudança, e a saída anotada à parte:

```
   s <- 0
   para i de 1 ate 3 faca          │  i  │  s  │ saída
      s <- s + i * 2               │  -  │  0  │
   fimpara                         │  1  │  2  │
   escreval(s)                     │  2  │  6  │
                                   │  3  │ 12  │
                                   │     │     │ 12
```

Regras de ouro: escreva **toda** mudança (não pule de cabeça); a condição do laço é conferida **a cada volta**; no `repita`, o laço **para** quando a condição do `ate` fica verdadeira.

## 19.5 Vetores e matrizes (aula 6)

```
   nomes: vetor[1..5] de caractere            grade: vetor[1..6, 1..3] de caractere
   ┌───┬───┬───┬───┬───┐                       6 linhas (dias) x 3 colunas (turnos) = 18 posições
   │ 1 │ 2 │ 3 │ 4 │ 5 │  ← no VisualG          grade[2, 3]  = terça, noite
   └───┴───┴───┴───┴───┘    começa em 1
```

- Percorrer vetor: um `para`. Percorrer matriz: um `para` **dentro** de outro (linha por fora, coluna por dentro).
- **Vetores paralelos:** a mesma posição em vetores diferentes descreve o mesmo item (`nomes[2]` e `capacidades[2]`).
- **Fila** (FIFO): o primeiro que entra é o primeiro que sai (lista de espera). **Pilha** (LIFO): o último que entra é o primeiro que sai (desfazer).

## 19.6 Procedimentos e funções (aula 7)

```
   procedimento linha                       funcao turmaCabe(alunos, capacidade: inteiro): logico
   inicio                                     inicio
      escreval("-----------")                    se alunos <= capacidade entao
   fimprocedimento                                  retorne verdadeiro
                                                 senao
   FAZ uma tarefa; NÃO devolve valor.               retorne falso
   Chamada sozinha numa linha:                   fimse
      linha                                 fimfuncao

                                              DEVOLVE um valor com retorne.
                                              Chamada dentro de uma expressão:
                                                 se turmaCabe(28, 30) entao
```

- **Parâmetro:** a "caixinha" que recebe o valor na chamada. Em `turmaCabe(28, 30)`, `alunos` vale 28 e `capacidade` vale 30 durante aquela execução.
- **Variável local:** declarada no `var` da função; só existe lá dentro e some quando a função termina.
- **Variável global:** declarada no `var` do algoritmo; todas as partes enxergam.
- Para **ler** um algoritmo com funções: comece pelo `inicio` do algoritmo principal (o último bloco), e só "entre" numa função quando ela for chamada, anotando o valor de cada parâmetro.

## 19.7 Do Portugol para o JavaScript (aulas 8 a 10)

| Portugol | JavaScript |
|---|---|
| `x: inteiro` (no `var`) | `let x = 0;` |
| `x <- 5` | `x = 5;` |
| `leia(x)` | `x = Number(prompt("..."));` (ou `.value` de um campo) |
| `escreval("Total: ", t)` | `alert("Total: " + t);` / `console.log(...)` / `textContent` |
| `se a = b entao` | `if (a === b) {` |
| `a <> b` | `a !== b` |
| `e` / `ou` / `nao` | `&&` / `\|\|` / `!` |
| `17 mod 5` / `17 \ 5` | `17 % 5` / `Math.floor(17 / 5)` |
| `escolha` / `caso` / `outrocaso` | `switch` / `case ...: break;` / `default` |
| `para i de 1 ate 10 faca` | `for (let i = 1; i <= 10; i++) {` |
| `enquanto cond faca` | `while (cond) {` |
| `repita ... ate cond` | `do { ... } while (!cond);` ← condição **negada** |
| `v: vetor[1..5] de inteiro` | `let v = [];` ← começa em **0** |
| `procedimento p()` | `function p() { ... }` sem `return` |
| `funcao f(x: inteiro): inteiro` ... `retorne` | `function f(x) { ... return ...; }` |

## 19.8 JavaScript: tipos e operadores (aula 8)

- Tipos: `string` (texto), `number`, `boolean`; `typeof` mostra o tipo.
- `prompt` e `.value` **sempre** devolvem texto. Conta com texto: `Number()` antes.
- O `+` com um texto **concatena**; os outros operadores (`- * / %`) convertem para número.
- A conta vai da esquerda para a direita: `5 + 3 + "1"` = `"81"`, mas `"1" + 5 + 3` = `"153"`.
- `Number("")` = `0`; `Number("abc")` = `NaN` (*Not a Number*); `isNaN(x)` testa.
- `===` compara valor **e** tipo: `7 === "7"` é `false`.
- `toFixed(1)` arredonda para 1 casa e devolve **texto**.

## 19.9 JavaScript: decisões, laços, arrays e funções (aulas 9 e 10)

- `if / else if / else`: a primeira condição verdadeira ganha e as outras nem são testadas.
- `prompt` cancelado devolve `null`.
- Array: `lista[0]` é o primeiro; `lista[lista.length - 1]` é o último; `push` (põe no fim), `pop` (tira do fim), `shift` (tira do começo), `splice(i, 1)` (tira da posição i), `includes`, `join`.
- `return` **devolve** e **encerra** a função; `console.log` só mostra. Função sem `return` devolve `undefined`.

## 19.10 Objetos, listas, pilhas e filas (aula 11)

```javascript
let laboratorio = { id: 2, nome: "Informática", capacidade: 30 };
laboratorio.nome          // "Informática"  (ponto)
laboratorio["capacidade"] // 30             (colchetes: o nome do campo é um texto)
```

- Array de objetos = a "tabela" do sistema: `laboratorios[i].nome`.
- Duas variáveis podem apontar para o **mesmo** objeto: mudar por uma muda pela outra.
- **Pilha** (histórico): `push` para empilhar, `pop` para desempilhar (sai o último).
- **Fila** (lista de espera): `push` para entrar, `shift` para atender (sai o primeiro).

## 19.11 Matrizes, busca e ordenação (aula 12)

- Matriz em JS = array de arrays: `calendario[dia][turno]`, índices começando em 0 (a segunda-feira é `calendario[0]`).
- **Busca linear:** olha um por um; até `n` comparações. **Busca binária:** só em lista **ordenada**; olha o meio e descarta metade; poucas comparações (para 1.000 itens, no máximo 10).
- **Bubble sort:** compara vizinhos e troca se estiverem fora de ordem; a cada volta, o maior "borbulha" para o fim.
- **Selection sort:** a cada volta, procura o **menor** do resto e troca com a posição da vez.
- `sort()` sem comparador ordena como **texto**: `[10, 9, 1].sort()` dá `[1, 10, 9]`. Para números: `sort(function (a, b) { return a - b; })`.

## 19.12 Projeto da disciplina: o que fazemos hoje

Hoje o projeto vira **material de estudo**. Ele usa quase todo o conteúdo da prova:

1. Abra o seu `dados.js` e o seu `regras.js`. Para cada função abaixo, diga em voz alta (para a dupla) qual conteúdo da disciplina ela usa:

| Função | Conteúdo |
|---|---|
| `somenteDigitos(texto)` | laço `for` em string, decisão, `return` antecipado |
| `turnoPermitido(dia, turno)` / `turmaCabe(turma, laboratorio)` | função com parâmetros, operadores lógicos e relacionais, função que devolve `boolean` |
| `cursoTemTurma(idCurso)` | array de objetos, laço, busca linear |
| `horarioLivre(...)` | **Set** (`has`) com a chave `"laboratorio-dia-turno"` |
| `buscarLaboratorio(id)` | **Map** (`has`, `get`) |
| `atenderListaDeEspera()` | **fila** |
| `historico.pop()` no desfazer | **pilha** |
| `montarCalendario()` | **matriz** e laço aninhado |
| `ordenarPorNome` / `ordenarPorDiaETurno` | **selection sort** / **bubble sort** |
| `buscaBinariaPorId(lista, id)` | **busca binária** contando as comparações |

2. **Teste de mesa no projeto:** faça a tabela de `buscaBinariaPorId(reservas, 4)` com as reservas de exemplo do CP6 (ids `[1, 2, 3, 4]`, já em ordem). Colunas: `inicio`, `fim`, `meio`, `lista[meio].id`, `comparacoes`, resultado.
3. Compare, em dupla, a `funcao` em Portugol que você trouxe (desafio da aula 18) com a função JavaScript original. Use a tabela do 19.7.
4. Nada de código novo hoje: se sobrar tempo, corrija as issues pendentes do projeto e faça push.

## 19.13 Erros comuns na prova

| Erro | Como evitar |
|---|---|
| Começar a leitura pela primeira função, e não pelo `inicio` do algoritmo | Ache o algoritmo principal (o último `inicio`) e siga as chamadas |
| Esquecer que o vetor do VisualG começa em 1 e o array do JS em 0 | Escreva os índices em cima do desenho do vetor |
| Fazer o teste de mesa "de cabeça" | Tabela, uma linha por mudança |
| Errar uma volta no laço (`<` × `<=`) | Escreva a condição testada em cada linha da tabela |
| Achar que `"5" + 3` é 8 | `+` com texto concatena: `"53"` |
| No `repita...ate`, parar quando a condição é falsa | O `repita` **para** quando a condição do `ate` fica **verdadeira** |
| Confundir `retorne` com `escreva` | `retorne` devolve o valor para quem chamou; não aparece nada na tela |
| Confundir fila com pilha | Fila: `shift` (sai o primeiro). Pilha: `pop` (sai o último) |

## 19.14 Exercícios de revisão

Faça no caderno, **sem rodar**. Depois confira: os Portugol estão em [`exemplos/`](exemplos/) para rodar no VisualG.

### Parte A — Portugol

**A1.** Faça o teste de mesa e diga o que aparece na tela:

```
s <- 0
para i de 1 ate 5 faca
   se i mod 2 = 1 entao
      s <- s + i
   senao
      s <- s - 1
   fimse
fimpara
escreval(s)
```

**A2.** O que aparece na tela? Quantas voltas o laço dá?

```
n <- 20
c <- 0
enquanto n > 1 faca
   n <- n \ 2
   c <- c + 1
fimenquanto
escreval(c, " ", n)
```

**A3.** O vetor `v` tem os valores `3, 8, 1, 9, 4` (posições 1 a 5). O que aparece na tela?

```
maior <- v[1]
pos <- 1
para i de 2 ate 5 faca
   se v[i] > maior entao
      maior <- v[i]
      pos <- i
   fimse
fimpara
escreval(maior, " na posição ", pos)
```

**A4.** Leia o algoritmo e diga as **duas** linhas que aparecem na tela. Depois responda: `dobroMais` é procedimento ou função? E `mostrar`? Por quê?

```
funcao dobroMais(x, y: inteiro): inteiro
inicio
   retorne x * 2 + y
fimfuncao

procedimento mostrar(valor: inteiro)
inicio
   se valor mod 2 = 0 entao
      escreval(valor, " é par")
   senao
      escreval(valor, " é ímpar")
   fimse
fimprocedimento

inicio
   a <- 4
   b <- 3
   r <- dobroMais(a, b)
   mostrar(r)
   r <- dobroMais(b, a)
   mostrar(r)
fimalgoritmo
```

**A5.** Com a função `turmaCabe` do projeto (19.6) e o vetor `alunosTurmas` com os valores `28, 18, 30, 12`, quanto vale `cabem` no fim? Na função, `alunos` é variável local ou global?

```
cabem <- 0
para i de 1 ate 4 faca
   se turmaCabe(alunosTurmas[i], 20) entao
      cabem <- cabem + 1
   fimse
fimpara
```

**A6.** Desenhe a matriz `m` (2 linhas x 3 colunas) depois do trecho e diga o que aparece na tela.

```
ocupados <- 0
para l de 1 ate 2 faca
   para c de 1 ate 3 faca
      se (l + c) mod 2 = 0 entao
         m[l, c] <- "X"
         ocupados <- ocupados + 1
      senao
         m[l, c] <- ""
      fimse
   fimpara
fimpara
percentual <- ocupados / 6 * 100
escreval("Ocupados: ", ocupados, " (", percentual:5:1, "%)")
```

**A7.** A função `lerOpcao(maximo)` do projeto repete o `leia` até o valor estar entre 1 e `maximo`, mostrando "Opção inválida" a cada erro. Na chamada `opcao <- lerOpcao(5)`, o usuário digita `0`, depois `9`, depois `3`. Quantas vezes aparece "Opção inválida"? Quanto vale `opcao`?

**A8.** Traduza para Portugol (VisualG) a função JavaScript abaixo, como uma `funcao` que devolve `logico`:

```javascript
function turnoPermitido(dia, turno) {
    if (dia === 6 && turno !== 1) {
        return false;
    }
    return true;
}
```

### Parte B — JavaScript

**B1.** Qual é o resultado de cada expressão?
a) `typeof "5"` · b) `"5" + 3` · c) `"5" - 3` · d) `5 + 3 + "1"` · e) `"1" + 5 + 3` · f) `Number("")` · g) `Number("12a")` · h) `10 % 4` · i) `7 === "7"`

**B2.** O que a função devolve para 80, 79.9, 50 e 10?

```javascript
function classificar(ocupacao) {
    if (ocupacao >= 80) {
        return "lotado";
    } else if (ocupacao >= 50) {
        return "movimentado";
    } else {
        return "tranquilo";
    }
}
```

**B3.** Quantas voltas o laço dá e quanto vale `total` no fim?

```javascript
let total = 0;
for (let i = 10; i > 0; i = i - 3) {
    total = total + i;
}
```

**B4.** Quanto valem `n` e `passos` no fim?

```javascript
let n = 1;
let passos = 0;
while (n < 100) {
    n = n * 3;
    passos = passos + 1;
}
```

**B5.** Mostre o conteúdo de `fila` e de `historico` no fim, e o valor de `ultimo`. Qual das duas é uma fila de verdade?

```javascript
let fila = ["Carla", "Rafael"];
fila.push("Juliana");
let primeiro = fila.shift();
fila.push(primeiro);

let historico = [1, 2, 3];
historico.pop();
historico.push(7);
let ultimo = historico.pop();
```

**B6.** O que aparece no console? Explique a segunda linha.

```javascript
function dobro(x) {
    console.log(x * 2);
}
let resultado = dobro(5);
console.log(resultado);
```

**B7.** O que aparece no console nas duas linhas?

```javascript
let lab = { id: 3, nome: "Radiologia", capacidade: 15 };
let campo = "capacidade";
console.log(lab.nome, lab[campo], lab["id"] + 1);
lab.capacidade = lab.capacidade + 5;
let outro = lab;
outro.nome = "Radiologia 2";
console.log(lab.nome, lab.capacidade);
```

**B8.** Escreva a função `contarOndeCabe(lista, alunos)`, que recebe um array de laboratórios (objetos com `id`, `nome`, `capacidade`) e devolve em quantos deles uma turma com aquele número de alunos cabe.

**B9.** Dada a matriz abaixo: quanto vale `grade[1][2]`? E `grade.length`? E `grade[0].length`? Escreva o laço aninhado que conta as posições não vazias (resposta esperada: 3).

```javascript
let grade = [["A", "", "B"], ["", "", "C"]];
```

**B10.** Ordenação:
a) Mostre o array `[5, 2, 4, 1]` depois da **primeira volta** do bubble sort. Quantas comparações e quantas trocas essa volta fez?
b) Mostre o mesmo array depois da **primeira volta** do selection sort.
c) O que `[10, 9, 1].sort()` devolve? Por quê? Como corrigir?

**B11.** Faça a busca binária na lista ordenada `[2, 5, 8, 12, 16, 23, 38]` procurando **23** e depois **3**. Para cada uma, diga o `meio` de cada volta e quantas comparações foram feitas.

**B12. (projeto)** O Set `horariosOcupados` guarda chaves `"laboratorio-dia-turno"`. Com as reservas de exemplo do CP6, ele tem `"2-3-3"`, `"2-1-1"`, `"5-2-2"` e `"1-4-3"`. Para cada pedido, diga a chave montada e se ele é aceito, recusado ou vai para a lista de espera (considere que a turma cabe): a) laboratório 2, quarta (3), noite (3); b) laboratório 2, quarta, tarde (2); c) laboratório 5, sábado (6), tarde (2); d) laboratório 1, quinta (4), manhã (1).

## 19.15 Desafio para a próxima aula

**Monte a sua "folha de estudo".** Numa folha (frente e verso), escreva à mão:

- a tabela Portugol → JavaScript do 19.7, **de memória** (depois confira);
- um teste de mesa completo de um laço `repita...ate` inventado por você;
- os 3 exercícios desta lista que você errou, refeitos com a explicação do erro.

Escrever à mão é estudo; copiar e colar não é. (Confira com o professor se a folha pode ser usada na prova ou é só para estudar.)

## 19.16 Resumo

- A lógica é a mesma no Portugol e no JavaScript; mudam as palavras (19.7).
- Leia algoritmos pelo `inicio` principal e entre nas funções só quando forem chamadas.
- Teste de mesa: uma coluna por variável, uma linha por mudança, condição conferida a cada volta.
- `procedimento` faz; `funcao` devolve com `retorne`. Parâmetro recebe o valor da chamada; local só existe dentro.
- VisualG começa em 1; JavaScript começa em 0.
- `+` com texto concatena; `Number()` antes de contar; `===` compara tipo também.
- Fila: sai o primeiro (`shift`). Pilha: sai o último (`pop`).
- Busca binária exige lista ordenada; `sort()` sem comparador ordena como texto.
