**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-04-visualg-variaveis-operadores-e-decisao/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-06-visualg-vetores-matrizes-e-arquivo/README.md)

---

# AULA 5 — VisualG: repetição e teste de mesa

## Objetivos da aula

- Repetir comandos com `para`, `enquanto` e `repita ... ate`, e saber quando usar cada um;
- Usar **contador** e **acumulador**;
- **Validar** a entrada com repetição: perguntar de novo até o dado ser válido;
- Fazer o **teste de mesa** de um algoritmo, à mão e com o passo a passo do VisualG;
- Programar o **menu principal validado** do projeto, com várias reservas seguidas contando as aceitas e as recusadas.

## 5.1 O problema: a mesma linha dez vezes

A tabuada do 7, com o que você sabe até a aula 4:

```
escreval("7 x 1 = ", 7 * 1)
escreval("7 x 2 = ", 7 * 2)
escreval("7 x 3 = ", 7 * 3)
// ... mais 7 linhas quase iguais ...
```

E se fosse até 1000? E o projeto da aula 4: quando o usuário errava o número de alunos, o programa **terminava**, e era preciso executar tudo de novo. Os dois problemas têm a mesma solução: a **repetição** (ou **laço**), a "seta que volta" do fluxograma da aula 2.

O VisualG tem três comandos de repetição:

```
   COMANDO                         TESTA A CONDIÇÃO     USE QUANDO
   para i de 1 ate 10 faca         (conta sozinho)      sabe QUANTAS vezes repetir
   enquanto condição faca          ANTES de cada volta  pode repetir ZERO vezes
   repita ... ate condição         DEPOIS de cada volta repete PELO MENOS UMA vez
```

## 5.2 `para`: quando você sabe quantas vezes

```
para variavel de inicio ate fim faca
   // comandos que se repetem
fimpara
```

**Exemplo clássico: tabuada.**

```
algoritmo "Tabuada"
var
   numero, i: inteiro
inicio
   escreva("Tabuada de qual número? ")
   leia(numero)
   para i de 1 ate 10 faca
      escreval(numero, " x ", i, " = ", numero * i)
   fimpara
fimalgoritmo
```

A variável `i` é a **variável de controle**: vale 1 na primeira volta, 2 na segunda... até 10. Cada volta se chama **iteração**. O `para` soma 1 no `i` sozinho, a cada volta. Para contar de outro jeito, use `passo`:

```
para i de 10 ate 1 passo -1 faca     // contagem regressiva: 10, 9, ..., 1
para i de 0 ate 20 passo 2 faca      // de 2 em 2: 0, 2, 4, ..., 20
```

**Cuidado:** não mude o valor de `i` dentro do `para`. Quem controla o `i` é o próprio `para`.

## 5.3 Contador e acumulador

Duas variáveis aparecem em quase todo laço:

- **Contador:** começa em 0 e soma **1** a cada vez que algo acontece. Responde "**quantos**?". Ex.: `aceitas <- aceitas + 1`.
- **Acumulador:** começa em 0 e soma **um valor que muda**. Responde "**quanto no total**?". Ex.: `totalDeAlunos <- totalDeAlunos + alunos`.

**Exemplo clássico: soma de 1 a N.**

```
algoritmo "Soma de 1 a N"
var
   n, i, soma: inteiro
inicio
   escreva("Somar de 1 até: ")
   leia(n)
   soma <- 0
   para i de 1 ate n faca
      soma <- soma + i
   fimpara
   escreval("A soma de 1 a ", n, " é ", soma)
fimalgoritmo
```

A regra de ouro: o contador e o acumulador recebem **0 antes do laço**. Se o `soma <- 0` ficar **dentro** do `para`, a soma "nasce de novo" a cada volta e o resultado sai errado. Você vai ver isso acontecer no teste de mesa da seção 5.7.

## 5.4 `enquanto`: repetir enquanto for verdade

```
enquanto condição faca
   // comandos
fimenquanto
```

O `enquanto` **testa antes** de entrar. Se a condição já começa falsa, os comandos não rodam nenhuma vez. O algoritmo da aula 2 (somar até digitar 0), agora em código:

```
algoritmo "Somar ate digitar zero"
var
   numero, soma: inteiro
inicio
   soma <- 0
   escreva("Número (0 para terminar): ")
   leia(numero)
   enquanto numero <> 0 faca
      soma <- soma + numero
      escreva("Número (0 para terminar): ")
      leia(numero)
   fimenquanto
   escreval("Soma: ", soma)
fimalgoritmo
```

Repare que o `leia` aparece **duas vezes**: uma antes do laço (para ter um valor para testar) e outra no fim do laço (para mudar a condição). Se você esquecer o segundo `leia`, `numero` nunca muda e o laço não termina: é o **laço infinito**. No VisualG, para interromper, use o botão **Parar** da barra de ferramentas e corrija o código.

## 5.5 `repita ... ate`: pelo menos uma vez

```
repita
   // comandos
ate condição
```

O `repita` **testa depois**: os comandos rodam pelo menos uma vez, e o laço **para quando a condição fica verdadeira**. Leia como "repita isso **até** que...".

**Exemplo clássico: adivinhe o número** (arquivo completo em [`exemplos/adivinhe-o-numero.alg`](exemplos/adivinhe-o-numero.alg)):

```
segredo <- 37
tentativas <- 0
repita
   escreva("Seu palpite: ")
   leia(palpite)
   tentativas <- tentativas + 1
   se palpite > segredo entao
      escreval("Muito alto.")
   fimse
   se palpite < segredo entao
      escreval("Muito baixo.")
   fimse
ate palpite = segredo
escreval("Acertou em ", tentativas, " tentativa(s)!")
```

O jogador sempre dá **pelo menos um** palpite. Por isso o `repita` é a escolha natural.

Atenção à lógica oposta dos dois:

```
   enquanto numero <> 0 faca ...     →  CONTINUA enquanto a condição é verdadeira
   repita ... ate numero = 0         →  PARA quando a condição fica verdadeira
```

## 5.6 Validação com repetição: perguntar de novo

Este é o uso mais importante do `repita` no projeto. Em vez de avisar e terminar (aula 4), o programa **pergunta de novo até o dado ser válido**:

```
repita
   escreva("Número de alunos (1 a 60): ")
   leia(alunos)
   se (alunos < 1) ou (alunos > 60) entao
      escreval("O número de alunos deve ser de 1 a 60.")
   fimse
ate (alunos >= 1) e (alunos <= 60)
```

Repare no par de condições: o `se` testa o **inválido** (para mostrar o aviso); o `ate` testa o **válido** (para sair). Uma é o contrário da outra.

**Exemplo clássico: média de N notas** (arquivo completo em [`exemplos/media-de-n-notas.alg`](exemplos/media-de-n-notas.alg)). Ele junta tudo: `para` com número de voltas lido do usuário, acumulador e um `repita` de validação **dentro** do `para`:

```
soma <- 0
para i de 1 ate quantidade faca
   repita
      escreva("Nota ", i, " (0 a 10): ")
      leia(nota)
      se (nota < 0) ou (nota > 10) entao
         escreval("Nota inválida. Digite de 0 a 10.")
      fimse
   ate (nota >= 0) e (nota <= 10)
   soma <- soma + nota
fimpara
media <- soma / quantidade
```

Uma nota inválida **não** conta como uma das N notas: o `repita` segura o usuário até ele digitar certo, e só então o `para` avança.

## 5.7 Teste de mesa

O **teste de mesa** é executar o algoritmo **no papel**, fazendo o papel do computador. Você monta uma tabela com uma coluna para cada variável e uma linha para cada passo, e anota os valores conforme eles mudam.

Teste do "Soma de 1 a N" com `n = 4`:

```
   passo                    │  n  │  i  │ soma │ saída
   ─────────────────────────┼─────┼─────┼──────┼──────────────────────
   leia(n)                  │  4  │  -  │  -   │
   soma <- 0                │  4  │  -  │  0   │
   i <- 1; soma <- 0 + 1    │  4  │  1  │  1   │
   i <- 2; soma <- 1 + 2    │  4  │  2  │  3   │
   i <- 3; soma <- 3 + 3    │  4  │  3  │  6   │
   i <- 4; soma <- 6 + 4    │  4  │  4  │  10  │
   fim do para (i passou 4) │  4  │  4  │  10  │
   escreval                 │  4  │  4  │  10  │ A soma de 1 a 4 é 10
```

Confira: 1 + 2 + 3 + 4 = 10. O teste de mesa bateu com a conta feita de cabeça.

Agora o **erro clássico**, com o `soma <- 0` dentro do laço:

```
   para i de 1 ate n faca
      soma <- 0                  // ERRADO: zera a cada volta
      soma <- soma + i
   fimpara
```

```
   passo                    │  i  │ soma
   ─────────────────────────┼─────┼──────
   i = 1: zera; soma + 1    │  1  │  1
   i = 2: zera; soma + 2    │  2  │  2
   i = 3: zera; soma + 3    │  3  │  3
   i = 4: zera; soma + 4    │  4  │  4      → mostra 4, e não 10
```

Lendo o código, o erro passa despercebido. Na tabela, ele salta aos olhos.

**No VisualG**, o teste de mesa automático é o **passo a passo**: pressione **F8** em vez de F9. Cada F8 executa uma linha, e o painel de variáveis (à direita) mostra os valores mudando. Faça o teste no papel **primeiro** e use o F8 para conferir.

**Como fazer um bom teste de mesa:**

1. Escolha entradas em que você **já sabe** a resposta certa.
2. Teste também os **limites**: o primeiro e o último valor válidos (1 e 60 no número de alunos) e os primeiros inválidos (0 e 61).
3. Uma linha para cada mudança de variável. Não pule passos "óbvios": o erro costuma estar neles.

## 5.8 Projeto da disciplina: o que fazemos hoje

O projeto ganha o **menu principal validado** e passa a aceitar **várias reservas seguidas**, contando quantas foram **aceitas** e quantas foram **recusadas**. O arquivo completo está em [`exemplos/reserva-aula05.alg`](exemplos/reserva-aula05.alg).

**Passo 1: o menu validado.** As regras vêm do desafioCadastro (Lucas Carrilho, @devmagro): só aceita as opções do menu, sem 0 ou negativo; opção inválida **mostra o menu de novo**. São dois `repita`, um dentro do outro:

```
repita                                   // laço de FORA: até escolher Sair
   repita                                // laço de DENTRO: até a opção ser válida
      escreval("")
      escreval("===== RESERVA DE LABORATÓRIOS =====")
      escreval("Turma atual: ", nomeTurma, " (", alunos, " alunos)")
      escreval("1 - Cadastrar turma")
      escreval("2 - Nova reserva")
      escreval("3 - Resumo da semana")
      escreval("4 - Sair")
      escreva("Opção: ")
      leia(opcao)
      se (opcao < 1) ou (opcao > 4) entao
         escreval("Opção inválida. Escolha de 1 a 4.")
      fimse
   ate (opcao >= 1) e (opcao <= 4)

   escolha opcao
   caso 1
      // cadastro de turma (passo 2)
   caso 2
      // nova reserva (passo 3)
   caso 3
      // resumo (passo 4)
   fimescolha
ate opcao = 4
escreval("Até logo!")
```

Compare com o Fluxograma 2 da aula 2: a "seta que volta" virou o `repita` de fora.

O programa começa com uma turma pronta, a **ADM09, com 28 alunos** (a mesma do `dados/turmas.csv`). A opção 1 troca a turma atual por outra.

**Passo 2: o cadastro de turma com validação.** Cada regra da aula 4 vira um `repita`:

```
repita
   escreva("Nome da turma (ex.: ADM09): ")
   leia(nomeTurma)
   se nomeTurma = "" entao
      escreval("O nome da turma é obrigatório.")
   fimse
ate nomeTurma <> ""
```

Faça igual para o número de alunos (1 a 60), como na seção 5.6.

**Passo 3: a reserva, com dois contadores.** Antes do menu, zere as duas variáveis:

```
aceitas <- 0
recusadas <- 0
```

No `caso 2`, valide com `repita` o laboratório (1 a 5), o dia (1 a 6) e o turno (1 a 3): número fora da faixa **pergunta de novo**. Depois, confira as regras da reserva. Aqui é diferente: uma reserva que quebra uma regra **não** pergunta de novo; ela é **recusada** e conta como recusada:

```
se (dia = 6) e (turno <> 1) entao
   escreval("Recusada: no sábado, só o turno da manhã.")
   recusadas <- recusadas + 1
senao
   se alunos > capacidade entao
      escreval("Recusada: a turma não cabe (", alunos, " alunos para ", capacidade, " lugares).")
      recusadas <- recusadas + 1
   senao
      aceitas <- aceitas + 1
      escreval("Reserva ", aceitas, " aceita: ", nomeTurma, " - ", nomeLab, " - dia ", dia, " - ", nomeDoTurno)
      escreval("Lugares que sobram: ", capacidade - alunos)
   fimse
fimse
```

Repare na diferença: **dado inválido** (dia 7, turno 0) → pergunta de novo; **regra quebrada** (sábado à tarde, turma que não cabe) → reserva recusada.

Ainda **não** conferimos conflito de horário: com uma variável só não dá para lembrar quais dias e turnos estão ocupados. Isso chega na aula 6, com a **matriz** (a grade da semana).

**Passo 4: o resumo** (`caso 3`) mostra `aceitas`, `recusadas` e o total de pedidos (`aceitas + recusadas`).

**Passo 5: o teste de mesa de 3 reservas.** A turma atual é a ADM09 (28 alunos). Antes de executar, preencha no caderno a tabela abaixo com estas entradas:

- `0` (opção inválida);
- reserva 1: `2` (nova reserva), laboratório `2`, dia `3`, turno `3`;
- reserva 2: `2`, laboratório `3`, dia `1`, turno `1`;
- reserva 3: `2`, laboratório `2`, dia `7`, dia `6`, turno `2`;
- por fim `3` (resumo) e `4` (sair).

```
 entrada           │ opcao │ laboratorio │ capacidade │ dia │ turno │ aceitas │ recusadas │ saída
 ──────────────────┼───────┼─────────────┼────────────┼─────┼───────┼─────────┼───────────┼──────────────────────
 (início)          │   -   │      -      │     -      │  -  │   -   │    0    │     0     │
 0                 │   0   │      -      │     -      │  -  │   -   │    0    │     0     │ Opção inválida...
 2, lab 2          │   2   │      2      │     30     │     │       │         │           │
 dia 3, turno 3    │       │             │            │  3  │   3   │    1    │     0     │ Reserva 1 aceita... sobram: 2
 2, lab 3          │       │             │            │     │       │         │           │
 ...               │       │             │            │     │       │         │           │
```

Complete as linhas que faltam. Repare no que acontece com o dia `7` na terceira reserva: ele conta como recusada? No fim, o resumo deve mostrar **1 aceita**, **2 recusadas** e **3 pedidos**. Depois, confira com o **F8** no VisualG.

**Passo 6: commit.** Atualize o `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg` no repositório da turma. Confira com `git branch` que você está na branch do CP2 (`<sua-pasta>/cp2`) e, de dentro da sua pasta:

```
git add portugol/reserva-laboratorio.alg
git commit -m "feat: adiciona menu validado e varias reservas"
git push
```

Coloque também a foto do teste de mesa na pasta `fluxogramas/` da sua pasta (ou crie uma pasta `testes/` ao lado dela) e faça um commit separado, com o prefixo `docs:`.

## 5.9 Erros comuns

| Sintoma | Causa |
|---|---|
| Programa não para (laço infinito) | Nada dentro do laço muda a condição (esqueceu o `leia` no fim do `enquanto`, por exemplo). Use **Parar** no VisualG |
| Soma ou contagem sai errada | Acumulador/contador zerado **dentro** do laço, ou não zerado antes |
| `repita` para na hora errada | A condição do `ate` está invertida: ela diz quando **parar**, não quando continuar |
| Menu aceita 0 ou 9 | A validação ficou só no `se` (aviso), sem o `repita ... ate` em volta |
| Menu não aparece de novo depois de opção inválida | Os `escreval` do menu ficaram **fora** do `repita` de dentro |
| `para` repete uma vez a mais ou a menos | Confira o `de` e o `ate`: `para i de 1 ate 10` repete 10 vezes; `de 0 ate 10`, 11 vezes |
| Erro "esperava fimpara/fimenquanto" | Cada laço tem o seu fechamento; `repita` fecha com `ate`, sem `fim` |
| Digitar letra no menu dá erro | No VisualG, `leia` de `inteiro` não aceita letras. Esse caso é tratado no JS (aula 9) |

## 5.10 Exercícios em aula

1. **Contagem.** Mostre os números de 1 a 20 com `para`. Depois, de 20 até 1, com `passo -1`.
2. **Pares.** Mostre os números pares de 1 a 50 e, no fim, quantos foram (contador). Use `mod`.
3. **Senha.** Peça a senha até o usuário digitar `"lab2026"`. No fim, mostre quantas tentativas foram. Qual laço é o mais adequado? Por quê?
4. **Maior de N.** Leia quantos números serão digitados e depois cada número. Mostre o maior. (Dica: o primeiro número digitado começa como o maior.)
5. **Fatorial.** Leia N e mostre N! (ex.: 5! = 5 × 4 × 3 × 2 × 1 = 120). O acumulador de multiplicação começa em **1**, não em 0. Faça o teste de mesa para N = 5.
6. **Teste de mesa.** Sem executar, faça o teste de mesa e diga o que aparece na tela. Depois confira com F8.

   ```
   x <- 1
   y <- 0
   enquanto x < 20 faca
      y <- y + 1
      x <- x * 3
   fimenquanto
   escreval(x, " ", y)
   ```

7. **(Projeto)** No resumo da semana (`caso 3`), mostre também o **percentual de reservas aceitas** com 1 casa decimal (aceitas / pedidos × 100). Cuidado com o caso em que nenhum pedido foi feito (não existe divisão por zero).
8. **(Projeto)** **Menu de dias com `para`.** Na nova reserva, troque o `escreval` fixo dos dias por um `para d de 1 ate 6` com um `escolha d` dentro, que mostra `1 - Segunda`, `2 - Terça`, ... `6 - Sábado (só manhã)`, um por linha.

## 5.11 Desafio para a próxima aula

**Média de alunos por reserva aceita.** No seu `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg`:

1. Crie um **acumulador** `totalDeAlunos`, que começa em 0 antes do menu.
2. Só quando a reserva é **aceita**, some nele os alunos da turma. Reserva recusada não entra na conta.
3. No resumo da semana (`caso 3`), calcule e mostre a **média de alunos por reserva aceita** (`totalDeAlunos / aceitas`, numa variável `real`), com 1 casa decimal:

   ```
   Reservas aceitas: 2
   Reservas recusadas: 2
   Pedidos de reserva: 4
   Média de alunos por reserva aceita: 23.0
   ```

4. Se ainda não houver reserva aceita, o resumo mostra "Nenhuma reserva aceita" (sem dividir por zero).
5. Faça o **teste de mesa** com as 3 reservas da seção 5.8 e mais esta: cadastre a turma `ENF05` com `18` alunos (opção 1) e reserve o laboratório `5` (Enfermagem), dia `2`, turno `2`. O resumo precisa bater com o exemplo acima: (28 + 18) / 2 = 23.0. Commit e push na branch do CP2.

## 5.12 Resumo

- `para i de 1 ate n faca ... fimpara`: número de voltas conhecido; `passo` muda o incremento;
- `enquanto condição faca ... fimenquanto`: testa **antes**, pode rodar zero vezes;
- `repita ... ate condição`: testa **depois**, roda ao menos uma vez e **para** quando a condição fica verdadeira;
- **Contador** soma 1 ("quantos?"); **acumulador** soma valores ("quanto no total?"); os dois recebem o valor inicial **antes** do laço;
- **Validação:** `repita` + `leia` + aviso no `se` + condição de válido no `ate`;
- **Teste de mesa:** uma coluna por variável, uma linha por passo; no VisualG, **F8** executa passo a passo;
- No projeto: menu validado (dois `repita`), cadastro de turma e reserva validados, contadores de reservas aceitas e recusadas.
