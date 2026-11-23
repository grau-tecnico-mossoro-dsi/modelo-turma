**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-06-visualg-vetores-matrizes-e-arquivo/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-08-js-primeiro-contato-tipos-e-operadores/README.md)

---

# AULA 7 — VisualG: procedimentos e funções (+ revisão do Portugol)

## Objetivos da aula

- Entender **por que** dividir um programa em partes com nome;
- Escrever **procedimentos** (fazem uma tarefa, não devolvem valor) e **funções** (calculam e **devolvem** um valor com `retorne`);
- Usar **parâmetros** para que a mesma parte sirva para valores diferentes;
- Diferenciar **variável local** e **variável global**;
- Reorganizar o projeto em `mostrarGrade`, `lerOpcao(maximo)`, `horarioLivre(dia, turno)`, `turmaCabe(alunos, capacidade)` e `turnoPermitido(dia, turno)`;
- Revisar todo o Portugol visto até aqui, antes de começar o JavaScript.

## 7.1 O problema: o mesmo trecho, cinco vezes

Abra o seu `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg` do CP2 e procure este trecho:

```
repita
   leia(dia)
ate (dia >= 1) e (dia <= 6)
```

Agora procure os parecidos: o mesmo `repita` aparece para a opção do menu (1 a 8), para a turma escolhida na lista, para o turno (1 a 3)... Muda só **a variável** e **o número máximo**. Se amanhã a regra mudar ("mostrar uma mensagem quando a opção for inválida"), você vai ter que alterar em quatro lugares, e vai esquecer um.

Outro sintoma: o algoritmo passou de 150 linhas, tudo dentro de um único `inicio ... fimalgoritmo`. Para achar "onde a grade é mostrada", é preciso ler tudo.

A solução é dar **nome** a cada pedaço do programa e chamá-lo pelo nome quando precisar. Esses pedaços se chamam **procedimentos** e **funções** (em geral, **sub-rotinas**).

```
   ANTES (um bloco só)                 DEPOIS (partes com nome)
   ┌───────────────────────┐          ┌──────────────────────┐
   │ menu + validação      │          │ inicio               │
   │ cadastro + validação  │          │   repita             │
   │ listagem              │          │     opcao <- lerOpcao(8)
   │ busca                 │   ───►   │     escolha opcao    │
   │ reserva + validação   │          │       caso 1: mostrarLaboratorios
   │ sábado, capacidade,   │          │       caso 6: mostrarGrade
   │ conflito, grade       │          │       ...            │
   │ ... 150 linhas        │          │ fimalgoritmo         │
   └───────────────────────┘          └──────────────────────┘
                                       + lerOpcao, horarioLivre,
                                         mostrarGrade... separados
```

É o "dividir para conquistar": cada parte resolve **um** problema pequeno e pode ser testada sozinha.

## 7.2 Procedimento: uma tarefa com nome

O procedimento mais simples do mundo desenha uma linha:

```
procedimento linha
inicio
   escreval("----------------------------------------")
fimprocedimento
```

Onde ele fica: **depois do `var`** do algoritmo e **antes do `inicio`** principal. Para usar, basta escrever o nome:

```
inicio
   linha
   escreval("RESERVA DE LABORATÓRIOS")
   linha
fimalgoritmo
```

```
   programa principal                procedimento linha
   ──────────────────                ─────────────────────
   linha  ─────── chama ────────►  escreval("-----")
            ◄────── volta ─────────  fimprocedimento
   escreval("RESERVA...")
   linha  ─────── chama ────────►  escreval("-----")
            ◄────── volta ─────────
```

**Sem parâmetros, sem parênteses.** No VisualG, um procedimento que não recebe nada é declarado e chamado **sem** `()`: `procedimento linha` e `linha`. Escrever `linha()` dá erro no VisuAlg 3.0 e no VisuAlg Web. Os parênteses só aparecem quando há parâmetros, como na seção 7.3. (No JavaScript, a partir da aula 10, é o contrário: os `()` são obrigatórios sempre.)

**Declarar não é executar.** O procedimento escrito lá em cima só roda quando alguém o **chama**. Se ninguém chamar, ele é ignorado. E, terminado o procedimento, o programa **volta** para a linha seguinte à chamada.

## 7.3 Parâmetros: a mesma tarefa com valores diferentes

E se quisermos um título com a linha em cima e embaixo, mas com um texto diferente em cada tela? O texto vira um **parâmetro**:

```
procedimento titulo(texto: caractere)
inicio
   linha
   escreval(texto)
   linha
fimprocedimento
```

```
titulo("RESERVA DE LABORATÓRIOS")     // texto = "RESERVA DE LABORATÓRIOS"
titulo("GRADE DA SEMANA")             // texto = "GRADE DA SEMANA"
```

Dois nomes para não confundir:

- **parâmetro** é a variável declarada no cabeçalho (`texto: caractere`);
- **argumento** é o valor enviado na chamada (`"GRADE DA SEMANA"`).

Na chamada, o argumento é **copiado** para o parâmetro. Pode haver vários parâmetros, separados por vírgula (tipos iguais) ou ponto e vírgula (tipos diferentes):

```
procedimento mostrarReserva(turma: caractere; dia, turno: inteiro)
```

A ordem importa: o primeiro argumento vai para o primeiro parâmetro, e assim por diante.

Repare também que um procedimento pode **chamar outro**: `titulo` chama `linha`.

## 7.4 Função: calcula e devolve um valor

O procedimento **faz** algo (mostra na tela, por exemplo). A função **responde** algo: ela calcula um valor e o **devolve** para quem chamou, com `retorne`. Por isso a função declara o **tipo do valor devolvido** depois dos parênteses:

```
funcao soma(a, b: inteiro): inteiro
inicio
   retorne a + b
fimfuncao
```

```
   resultado <- soma(3, 4)
                 │
                 ▼
          a = 3, b = 4  →  retorne 7
                 │
                 ▼
   resultado <- 7
```

A chamada de uma função **vira o valor devolvido**. Por isso ela pode aparecer em qualquer lugar onde caberia um valor:

```
resultado <- soma(3, 4)                       // numa atribuição
escreval("Total: ", soma(3, 4))               // dentro do escreval
escreval(soma(soma(1, 2), 3))                 // como argumento de outra chamada: 6
se soma(x, y) > 10 entao ...                  // numa condição
```

**Função que devolve `logico`.** Muito útil para "perguntas de sim ou não":

```
funcao ehPar(n: inteiro): logico
inicio
   retorne (n mod 2) = 0
fimfuncao

...
se ehPar(numero) entao
   escreval("par")
senao
   escreval("ímpar")
fimse
```

O nome começa com "eh" (é) de propósito: a linha `se ehPar(numero) entao` se lê como uma frase.

O `retorne` **encerra** a função na hora. Por isso uma função pode ter mais de um `retorne`, um em cada caminho:

```
funcao turnoPermitido(dd, tt: inteiro): logico
inicio
   se (dd = 6) e (tt <> 1) entao
      retorne falso         // sábado à tarde ou à noite: fechado
   senao
      retorne verdadeiro    // qualquer outro dia e turno
   fimse
fimfuncao
```

## 7.5 Procedimento x função

| | Procedimento | Função |
|---|---|---|
| Para que serve | **Fazer** uma tarefa | **Calcular** e devolver um valor |
| Declaração | `procedimento nome(...)` | `funcao nome(...): tipo` |
| Termina com | `fimprocedimento` | `fimfuncao` |
| Usa `retorne`? | Não | Sim, obrigatório |
| Como chamar | Sozinho numa linha: `linha` | Dentro de uma expressão: `x <- soma(1, 2)` |
| Exemplo | `mostrarGrade` | `horarioLivre(dia, turno)` |

Dica para escolher: se o resultado é **algo na tela**, é procedimento. Se o resultado é **um valor que o programa vai usar depois** (guardar, comparar, somar), é função. Uma boa função, aliás, nem mostra nada na tela: ela só calcula e devolve; quem chamou decide o que fazer com o valor.

## 7.6 Variável local x variável global

Veja a função `maior` do arquivo [`exemplos/classicos.alg`](exemplos/classicos.alg):

```
funcao maior(a, b, c: inteiro): inteiro
var
   maiorAteAgora: inteiro              // variável LOCAL
inicio
   maiorAteAgora <- a
   se b > maiorAteAgora entao
      maiorAteAgora <- b
   fimse
   se c > maiorAteAgora entao
      maiorAteAgora <- c
   fimse
   retorne maiorAteAgora
fimfuncao
```

- **Variável local:** declarada no `var` **da sub-rotina** (e os parâmetros também). Nasce quando a sub-rotina é chamada e **some** quando ela termina. O programa principal não a enxerga.
- **Variável global:** declarada no `var` **do algoritmo**, lá em cima. Todas as sub-rotinas enxergam.

```
   ┌─────────────────── algoritmo ───────────────────────┐
   │ var (GLOBAIS): nomesLabs, capacidades, grade, opcao │
   │                                                      │
   │   ┌──── funcao maior ────┐   ┌── procedimento ───┐  │
   │   │ a, b, c (parâmetros) │   │ mostrarGrade      │  │
   │   │ maiorAteAgora (local)│   │ x, y (locais)     │  │
   │   │ enxerga as globais   │   │ enxerga as globais│  │
   │   └──────────────────────┘   └───────────────────┘  │
   │                                                      │
   │ inicio ... (NÃO enxerga maiorAteAgora, nem x, y)     │
   └──────────────────────────────────────────────────────┘
```

Regra prática para o curso:

- o que é **do sistema inteiro** (os vetores dos laboratórios e das turmas, a `grade`) fica **global**;
- o que é **da tarefa** (contadores, `i`, `k`, variáveis auxiliares) fica **local**;
- os valores que mudam a cada chamada entram por **parâmetro**.

Por que não deixar tudo global? Porque, se `mostrarGrade` usasse a variável global `d` como contador, e o programa principal também estivesse usando `d` num laço, um estragaria o laço do outro. Variável local evita esse tipo de bug.

> No VisualG, neste curso, os **vetores e a matriz ficam globais** e as sub-rotinas os usam diretamente: não passamos vetor como parâmetro. No JavaScript (aula 10) isso fica mais flexível.

## 7.7 Projeto da disciplina: o que fazemos hoje

Hoje o `.alg` do CP2 é **reorganizado**: o comportamento não muda (o menu continua igual), mas o código fica dividido em partes.

**Passo 1. `procedimento linha`.** Troque todos os `escreval("-----...")` por `linha`.

**Passo 2. `funcao lerOpcao(maximo)`.** O `repita` que aparecia 4 vezes vira uma função. O que muda entre as cópias (o máximo) vira parâmetro; o valor lido é devolvido:

```
funcao lerOpcao(maximo: inteiro): inteiro
var
   valor: inteiro
inicio
   repita
      leia(valor)
      se (valor < 1) ou (valor > maximo) entao
         escreval("Opção inválida. Escolha de 1 a ", maximo, ".")
      fimse
   ate (valor >= 1) e (valor <= maximo)
   retorne valor
fimfuncao
```

E o uso fica assim:

```
opcao <- lerOpcao(8)                        // menu
escolhida <- lerOpcao(quantidadeTurmas)     // turma da lista numerada
dia <- lerOpcao(6)                          // segunda a sábado
turno <- lerOpcao(3)                        // manhã, tarde, noite
```

Quatro trechos de 6 linhas viraram 4 linhas. E a mensagem "Opção inválida" agora aparece em **todas** as perguntas, porque está escrita num lugar só.

**Passo 3. As três regras da reserva viram funções `logico`.** Cada regra da aula 4 vira uma pergunta de sim ou não, com nome:

```
// no sábado (dia 6), só o turno da manhã (turno 1)
funcao turnoPermitido(dd, tt: inteiro): logico
inicio
   retorne (dd <> 6) ou (tt = 1)
fimfuncao

// a turma cabe no laboratório?
funcao turmaCabe(alunos, capacidade: inteiro): logico
inicio
   retorne alunos <= capacidade
fimfuncao

// o horário está livre se a célula da matriz está vazia
funcao horarioLivre(dd, tt: inteiro): logico
inicio
   retorne grade[dd, tt] = ""
fimfuncao
```

A `turnoPermitido` é a versão curta da que está na seção 7.4: "não é sábado **ou** é de manhã" dá o mesmo resultado que o `se` com dois `retorne`. Faça o teste com `(6, 1)`, `(6, 3)` e `(2, 3)`.

Repare: `grade` é **global** (a `horarioLivre` enxerga); `dd` e `tt` chegam por **parâmetro**. A `turmaCabe` nem olha os vetores: recebe dois números e compara. Com as três, a reserva se lê quase como o texto da regra:

```
se turnoPermitido(dia, turno) = falso entao
   escreval("No sábado, só o turno da manhã.")
senao
   se turmaCabe(alunosTurmas[escolhida], capacidades[2]) = falso entao
      escreval("A turma não cabe: ", alunosTurmas[escolhida], " alunos para ", capacidades[2], " lugares.")
   senao
      se horarioLivre(dia, turno) entao
         grade[dia, turno] <- nomesTurmas[escolhida]
         escreval("Reserva confirmada: ", horarioDoTurno(turno), ", ", capacidades[2] - alunosTurmas[escolhida], " lugares sobrando.")
      senao
         escreval("Horário ocupado pela turma ", grade[dia, turno], ".")
      fimse
   fimse
fimse
```

**Passo 4. `funcao horarioDoTurno(turno)`.** O `escolha` da aula 4 que mostrava o horário vira uma função que devolve o texto: `"Manhã, 08h às 12h"`, `"Tarde, 13h30 às 17h30"` ou `"Noite, 18h30 às 22h30"`. Ela aparece dentro do `escreval` acima.

**Passo 5. `procedimento mostrarGrade`, `mostrarLaboratorios` e `mostrarTurmas`.** O laço aninhado da grade e as listas numeradas saem do `escolha` e viram procedimentos. Os contadores `x`, `y` e `k` passam a ser locais. Dentro da `mostrarGrade`, a regra do sábado também usa a função: `se turnoPermitido(x, y) = falso entao escreva("[fechado] ")`.

**Passo 6. O programa principal fica curto.** Compare o `escolha` antes e depois:

```
escolha opcao
caso 1
   mostrarLaboratorios
caso 2
   // busca por capacidade (ainda no principal; ver o desafio)
caso 3
   // cadastro de turma (ainda no principal; ver o desafio)
caso 4
   mostrarTurmas
caso 5
   // reserva usando lerOpcao, turnoPermitido, turmaCabe e horarioLivre
caso 6
   mostrarGrade
caso 7
   // ocupação da semana (desafio da aula 6)
fimescolha
```

**Passo 7. Testar com o mesmo roteiro do CP2.** Uma reorganização não pode mudar o comportamento: rode o roteiro do CP2 (menu inválido, listagem, busca, cadastro de turma, reserva com sábado, capacidade e conflito, grade) e compare.

**Passo 8. Commit.** Escolha a branch antes:

- O PR do CP2 **ainda está aberto**: continue na branch `<sua-pasta>/cp2`. O commit entra no mesmo PR.
- O PR do CP2 **já teve merge**: rode `git switch main` e `git pull`, e crie a branch nova com `git switch -c <sua-pasta>/cp3`. No primeiro push dela, use `git push -u origin <sua-pasta>/cp3`.

Depois, de dentro da sua pasta:

```
git add portugol/reserva-laboratorio.alg
git commit -m "refactor: divide o algoritmo em procedimentos e funcoes"
git push
```

## 7.8 Revisão do Portugol

Esta é a última aula de VisualG. Na aula 8, cada item desta tabela ganha um "irmão" em JavaScript.

| Assunto | VisualG | Aula |
|---|---|---|
| Estrutura | `algoritmo "x"` · `var` · `inicio` · `fimalgoritmo` | 4 |
| Tipos | `inteiro`, `real`, `caractere`, `logico` | 4 |
| Atribuição | `x <- 10` | 4 |
| Entrada e saída | `leia(x)` · `escreva(...)` · `escreval(...)` | 4 |
| Aritméticos | `+ - * /` · `\` (divisão inteira) · `mod` (resto) | 4 |
| Relacionais | `= <> > < >= <=` | 4 |
| Lógicos | `e`, `ou`, `nao` | 4 |
| Decisão | `se ... entao ... senao ... fimse` | 4 |
| Múltipla escolha | `escolha x` · `caso 1` · `outrocaso` · `fimescolha` | 4 |
| Repetição (testa antes) | `enquanto ... faca ... fimenquanto` | 5 |
| Repetição (testa depois) | `repita ... ate condição` | 5 |
| Repetição (contada) | `para i de 1 ate n [passo p] faca ... fimpara` | 5 |
| Vetor | `v: vetor[1..10] de inteiro` · `v[i]` | 6 |
| Matriz | `m: vetor[1..6, 1..3] de caractere` · `m[l, c]` | 6 |
| Arquivo | `arquivo "dados.txt"` (o `leia` lê do arquivo) | 6 |
| Procedimento | `procedimento nome(p: tipo)` ... `fimprocedimento` | 7 |
| Função | `funcao nome(p: tipo): tipo` ... `retorne x` ... `fimfuncao` | 7 |

**Teste de mesa de revisão.** O que este algoritmo escreve? Faça a tabela com as colunas `i`, `v[i]`, `total` antes de rodar.

```
algoritmo "Revisao"
var
   v: vetor[1..4] de inteiro
   i, total: inteiro

funcao dobro(n: inteiro): inteiro
inicio
   retorne n * 2
fimfuncao

inicio
   v[1] <- 3
   v[2] <- 8
   v[3] <- 5
   v[4] <- 2
   total <- 0
   para i de 1 ate 4 faca
      se v[i] mod 2 = 1 entao
         total <- total + dobro(v[i])
      senao
         total <- total + v[i]
      fimse
   fimpara
   escreval(total)
fimalgoritmo
```

## 7.9 Erros comuns

| Sintoma | Causa |
|---|---|
| A sub-rotina nunca roda | Foi declarada mas não foi **chamada** no programa principal |
| Erro em `procedimento linha()` ou na chamada `linha()` | Procedimento sem parâmetros não leva parênteses no VisualG: `procedimento linha` e `linha` |
| Erro na linha da sub-rotina | Ela foi escrita **depois** do `inicio` principal; o lugar é entre o `var` e o `inicio` |
| Erro de "fimprocedimento/fimfuncao esperado" | Faltou fechar a sub-rotina, ou fechou um `procedimento` com `fimfuncao` |
| A função devolve valor errado ou nenhum | Faltou o `retorne` em algum caminho do `se` |
| Erro ao chamar a função | Número de argumentos diferente do número de parâmetros, ou na ordem errada |
| Erro "variável não encontrada" no principal | A variável é **local** de uma sub-rotina; o principal não a enxerga |
| O laço do menu para de funcionar depois de mostrar a grade | A sub-rotina usou um contador **global** que o principal também usa; declare-o como local |
| `escreval(linha)` dá erro | Procedimento não devolve valor; não pode ficar dentro de expressão |
| Chamar a função "sozinha" não faz nada | `turmaCabe(28, 30)` numa linha solta calcula `verdadeiro` e joga fora; guarde em variável, use no `se` ou no `escreval` |

## 7.10 Exercícios em aula

1. **Moldura.** Crie o procedimento `moldura(texto: caractere)` que escreve o texto entre duas linhas de `=`. Chame três vezes com textos diferentes.
2. **Área do retângulo.** Crie `funcao area(base, altura: real): real` e use-a para mostrar a área de dois retângulos lidos do teclado.
3. **Aprovado?** Crie `funcao media(n1, n2: real): real` e `funcao aprovado(m: real): logico` (média >= 7). O programa principal lê as notas e mostra "Aprovado" ou "Reprovado" usando as duas funções.
4. **Ímpares de um vetor.** Usando a função `ehPar` (seção 7.4), leia 6 números num vetor e mostre quantos são **ímpares**.
5. **Teste de mesa.** Faça o teste de mesa do algoritmo da seção 7.8 e confira rodando no VisualG.
6. **Validação reaproveitada.** Crie `funcao lerEntre(minimo, maximo: inteiro): inteiro` (como `lerOpcao`, mas com mínimo também). Use-a para ler uma idade (0 a 120) e uma nota (0 a 10).
7. **(Projeto) Nome do dia.** Crie `funcao nomeDoDia(dd: inteiro): caractere` que devolve "Segunda", "Terça" ... "Sábado" (use `escolha`), e use-a na `mostrarGrade` no lugar de `Dia 1`, `Dia 2`...
8. **(Projeto) Percentual de ocupação.** Transforme o desafio da aula 6 em `funcao percentualDeOcupacao(): real` (conta os horários ocupados da grade e devolve `ocupados / 16 * 100`). O `caso 7` do menu passa a só mostrar o valor devolvido.

## 7.11 Desafio para a próxima aula

**O roteiro da tradução.** Na próxima aula começamos o JavaScript, e o trabalho das próximas aulas será traduzir o seu algoritmo. Para isso, em casa:

1. Termine a reorganização: a **busca** (caso 2) vira um `procedimento buscarPorCapacidade`, e o **cadastro de turma** (caso 3) vira `procedimento cadastrarTurma`.
2. No `README.md` da sua pasta (`alunos/<sua-pasta>/README.md`), crie a seção **"Partes do algoritmo"** com uma linha para **cada** procedimento e função do `.alg`, dizendo em português: o nome, se é procedimento ou função, o que recebe, o que faz e (se for função) o que devolve. Exemplo:

   > `horarioLivre(dia, turno)` — função. Recebe o dia e o turno. Olha a célula da grade e devolve **verdadeiro** se ela está vazia (ninguém reservou).

3. Commit e push na mesma branch do passo 8 da seção 7.7.

Esse texto vira o roteiro: a partir da aula 10, cada linha dele vira uma `function` em JavaScript.

## 7.12 Resumo

- Dividir o programa em partes com nome evita repetição e facilita achar e corrigir o código;
- **Procedimento** faz uma tarefa e não devolve valor; **função** calcula e devolve um valor com `retorne`;
- Sub-rotinas ficam entre o `var` e o `inicio` do algoritmo; só rodam quando são **chamadas**;
- **Parâmetros** recebem cópias dos **argumentos**, na mesma ordem;
- A chamada de uma função vira o valor devolvido e pode aparecer em atribuições, condições e no `escreval`;
- **Variável local** só existe dentro da sub-rotina; **global** é enxergada por todos. Contadores e auxiliares: locais;
- No projeto: `linha`, `lerOpcao(maximo)`, `turnoPermitido(dia, turno)`, `turmaCabe(alunos, capacidade)`, `horarioLivre(dia, turno)`, `horarioDoTurno(turno)`, `mostrarGrade`, `mostrarLaboratorios`, `mostrarTurmas`.
