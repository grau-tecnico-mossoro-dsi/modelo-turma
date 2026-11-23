**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-03-terminal-git-e-github/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-05-visualg-repeticao-e-teste-de-mesa/README.md)

---

# AULA 4 — VisualG: variáveis, entrada e saída, operadores e decisão

## Objetivos da aula

- Escrever, salvar e executar um algoritmo no **VisualG**;
- Declarar **variáveis** dos tipos `inteiro`, `real`, `caractere` e `logico`;
- Guardar valores com a **atribuição** (`<-`), ler com `leia` e mostrar com `escreva`/`escreval`;
- Usar operadores **aritméticos** (incluindo `\` e `mod`), **relacionais** e **lógicos** (`e`, `ou`, `nao`);
- Tomar decisões com `se ... entao ... senao ... fimse` e com `escolha ... caso ... fimescolha`;
- Programar o **cadastro de uma turma** e uma **reserva simples** do projeto.

## 4.1 O VisualG: o pseudocódigo que roda

Nas aulas 1 e 2 você escreveu pseudocódigo no papel. O **VisualG** é um programa que **executa** esse pseudocódigo, em português. Ele é um **interpretador** (aula 1): lê o algoritmo e executa linha por linha.

A janela do VisualG tem três partes:

```
   ┌──────────────────────────────────────────┬─────────────────────┐
   │  EDITOR                                  │  VARIÁVEIS          │
   │  algoritmo "primeiro"                    │  nome   | tipo | valor
   │  var                                     │  ...                │
   │     ...                                  │                     │
   │  inicio                                  │                     │
   │     ...                                  │                     │
   │  fimalgoritmo                            │                     │
   ├──────────────────────────────────────────┴─────────────────────┤
   │  SAÍDA (resultado dos escreva)                                 │
   └────────────────────────────────────────────────────────────────┘
```

- **Executar:** tecla **F9** (ou o botão de "play"). Uma janela preta (o "console") abre: é ali que o programa conversa com você.
- **Passo a passo:** tecla **F8**. Executa uma linha por vez e mostra o valor das variáveis no painel da direita. Vai ser muito útil na aula 5.
- **Salvar:** `Ctrl + S`. Os arquivos do VisualG têm a extensão **`.alg`**.

Todo programa do VisualG tem esta estrutura:

```
algoritmo "nome do algoritmo"
var
   // aqui se declaram as variáveis
inicio
   // aqui ficam os comandos
fimalgoritmo
```

Tudo depois de `//` é **comentário**: o VisualG ignora. Serve para explicar algo a quem lê o código.

## 4.2 Variáveis e tipos

Na aula 1 você "guardava o número como A". Esse lugar com nome, na memória do computador, é a **variável**. Imagine uma caixa com etiqueta: a etiqueta é o nome; dentro, o valor.

```
        idade              nome              media
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │     17     │    │  "Carla"   │    │    8.5     │
   └────────────┘    └────────────┘    └────────────┘
      inteiro          caractere           real
```

No VisualG, toda variável é **declarada** na seção `var`, com o **tipo** do valor que ela guarda:

| Tipo | Guarda | Exemplos |
|---|---|---|
| `inteiro` | números sem casa decimal | `30`, `0`, `-5` |
| `real` | números com casa decimal (o separador é o **ponto**) | `8.5`, `36.6`, `0.25` |
| `caractere` | texto, sempre entre aspas duplas | `"Carla"`, `"ADM09"`, `""` (texto vazio) |
| `logico` | `verdadeiro` ou `falso` | `verdadeiro` |

```
var
   idade, capacidade: inteiro
   media: real
   nome, turma: caractere
   aprovado: logico
```

**Regras para os nomes:** começam com letra; só letras, números e `_`; **sem espaço** e **sem acento**. O VisualG não diferencia maiúsculas de minúsculas (`Nome` e `nome` são a mesma variável). Use nomes que digam o que a variável guarda: `capacidade` é melhor que `c`; `quantidadeDeAlunos` é melhor que `qa`.

## 4.3 Atribuição, entrada e saída

**Atribuição (`<-`)** guarda um valor na variável. Leia como "recebe":

```
capacidade <- 30            // capacidade recebe 30
nome <- "Informática"
vagas <- capacidade - 12    // vagas recebe 18
```

O valor antigo é **substituído**. A variável guarda **um valor por vez**.

**Saída:** `escreva` mostra na tela e continua na mesma linha; `escreval` mostra e **pula para a linha de baixo**. Para mostrar texto e variáveis juntos, separe com vírgula:

```
escreval("O laboratório tem ", capacidade, " lugares.")
```

**Entrada:** `leia(variavel)` espera o usuário digitar e pressionar Enter, e guarda o que foi digitado na variável.

O primeiro programa completo:

```
algoritmo "Ola"
var
   nome: caractere
inicio
   escreva("Qual é o seu nome? ")
   leia(nome)
   escreval("Olá, ", nome, "! Bem-vindo ao VisualG.")
fimalgoritmo
```

Sempre faça uma **pergunta** antes do `leia`. Sem ela, o usuário vê uma tela parada e não sabe o que digitar.

## 4.4 Operadores aritméticos

| Operador | Faz | Exemplo | Resultado |
|---|---|---|---|
| `+` | soma | `7 + 2` | `9` |
| `-` | subtração | `7 - 2` | `5` |
| `*` | multiplicação | `7 * 2` | `14` |
| `/` | divisão (resultado `real`) | `7 / 2` | `3.5` |
| `\` | divisão **inteira** (sem a parte decimal) | `7 \ 2` | `3` |
| `mod` | **resto** da divisão inteira | `7 mod 2` | `1` |

A ordem é a da matemática: primeiro `*`, `/`, `\` e `mod`; depois `+` e `-`. Para mudar a ordem, use **parênteses**: `(nota1 + nota2) / 2` é bem diferente de `nota1 + nota2 / 2`.

O `\` e o `mod` andam juntos. Dividindo 130 minutos por 60:

```
   130 │ 60
   120   2   ← 130 \ 60   = 2  (horas)
   ───
    10       ← 130 mod 60 = 10 (minutos que sobram)
```

**Exemplo clássico: média de duas notas.**

```
algoritmo "Media de duas notas"
var
   nota1, nota2, media: real
inicio
   escreva("Primeira nota: ")
   leia(nota1)
   escreva("Segunda nota: ")
   leia(nota2)
   media <- (nota1 + nota2) / 2
   escreval("Média: ", media:5:1)
fimalgoritmo
```

O `media:5:1` formata o número: ocupa 5 espaços e mostra **1 casa decimal**. Sem isso, o VisualG pode mostrar várias casas.

**Exemplo clássico: Celsius para Fahrenheit.** A fórmula é F = C × 9 / 5 + 32.

```
algoritmo "Celsius para Fahrenheit"
var
   celsius, fahrenheit: real
inicio
   escreva("Temperatura em graus Celsius: ")
   leia(celsius)
   fahrenheit <- celsius * 9 / 5 + 32
   escreval(celsius:5:1, " °C = ", fahrenheit:5:1, " °F")
fimalgoritmo
```

Teste: 0 °C dá 32 °F; 100 °C dá 212 °F. Sempre teste com valores que você **sabe** a resposta.

## 4.5 Operadores relacionais e lógicos

Os **relacionais** comparam dois valores e respondem `verdadeiro` ou `falso`:

| Operador | Significa | Exemplo | Resultado |
|---|---|---|---|
| `=` | igual | `5 = 5` | `verdadeiro` |
| `<>` | diferente | `5 <> 3` | `verdadeiro` |
| `>` | maior | `5 > 7` | `falso` |
| `<` | menor | `5 < 7` | `verdadeiro` |
| `>=` | maior ou igual | `30 >= 30` | `verdadeiro` |
| `<=` | menor ou igual | `31 <= 30` | `falso` |

Cuidado: no VisualG, `=` **compara** e `<-` **guarda**. São coisas diferentes.

Os **lógicos** juntam comparações:

- `e`: verdadeiro só se **as duas** forem verdadeiras;
- `ou`: verdadeiro se **pelo menos uma** for verdadeira;
- `nao`: inverte (`nao verdadeiro` é `falso`).

```
   A           B           A e B       A ou B      nao A
   verdadeiro  verdadeiro  verdadeiro  verdadeiro  falso
   verdadeiro  falso       falso       verdadeiro  falso
   falso       verdadeiro  falso       verdadeiro  verdadeiro
   falso       falso       falso       falso       verdadeiro
```

No projeto: "a turma tem **entre** 1 e 60 alunos" se escreve `(alunos >= 1) e (alunos <= 60)`. E "o número de alunos é **inválido**" se escreve `(alunos < 1) ou (alunos > 60)`. Outro exemplo: "é sábado **e** não é de manhã" se escreve `(dia = 6) e (turno <> 1)`. Use **parênteses** em cada comparação.

## 4.6 Decisão: `se ... entao ... senao ... fimse`

É o losango do fluxograma (aula 2), em código:

```
se condição entao
   // comandos quando a condição é verdadeira
senao
   // comandos quando é falsa
fimse
```

O `senao` é opcional. Repare na **indentação** (os 3 espaços no começo das linhas de dentro): o VisualG não exige, mas sem ela ninguém entende o código.

**Exemplo clássico: par ou ímpar com `mod`.**

```
algoritmo "Par ou impar"
var
   numero: inteiro
inicio
   escreva("Digite um número inteiro: ")
   leia(numero)
   se numero mod 2 = 0 entao
      escreval(numero, " é par.")
   senao
      escreval(numero, " é ímpar.")
   fimse
fimalgoritmo
```

**Exemplo clássico: maior de três números** (arquivo completo em [`exemplos/maior-de-tres.alg`](exemplos/maior-de-tres.alg)). Quando há mais de dois caminhos, um `se` fica **dentro** do `senao` de outro, como os losangos encadeados da aula 2:

```
se (a >= b) e (a >= c) entao
   maior <- a
senao
   se b >= c entao
      maior <- b
   senao
      maior <- c
   fimse
fimse
```

Cada `se` tem o **seu** `fimse`. Contar os `fimse` é a primeira coisa a fazer quando o VisualG reclama.

## 4.7 Decisão múltipla: `escolha ... caso ... fimescolha`

Quando a decisão depende de **um valor** que pode ser 1, 2, 3, 4... (um menu, por exemplo), uma fila de `se` fica cansativa. O `escolha` é a decisão múltipla do fluxograma:

```
escolha variavel
caso 1
   // quando variavel vale 1
caso 2, 3
   // quando vale 2 ou 3
outrocaso
   // quando não é nenhum dos casos acima
fimescolha
```

**Exemplo clássico: calculadora** (arquivo completo em [`exemplos/calculadora.alg`](exemplos/calculadora.alg)):

```
escreval("Operação: 1 Somar | 2 Subtrair | 3 Multiplicar | 4 Dividir")
leia(operacao)
escolha operacao
caso 1
   resultado <- a + b
   escreval("Resultado: ", resultado:8:2)
caso 2
   resultado <- a - b
   escreval("Resultado: ", resultado:8:2)
caso 3
   resultado <- a * b
   escreval("Resultado: ", resultado:8:2)
caso 4
   se b = 0 entao
      escreval("Não existe divisão por zero.")
   senao
      resultado <- a / b
      escreval("Resultado: ", resultado:8:2)
   fimse
outrocaso
   escreval("Operação inválida. Escolha de 1 a 4.")
fimescolha
```

Repare em duas coisas: dá para colocar um `se` **dentro** de um `caso`; e o `outrocaso` trata a opção que não existe. Um bom programa **sempre** pensa no que acontece quando o usuário digita algo errado.

## 4.8 Projeto da disciplina: o que fazemos hoje

O projeto sai do papel. Hoje ele faz duas coisas: **cadastra uma turma** com as regras e faz **uma reserva simples**. O arquivo completo está em [`exemplos/reserva-aula04.alg`](exemplos/reserva-aula04.alg).

Ainda não sabemos repetir (é a aula 5). Por isso, quando um dado é inválido, o programa **avisa** e, no fim, recusa o cadastro. Para controlar isso, usamos uma variável `logico` que começa `verdadeiro` e vira `falso` em qualquer erro.

**Passo 1: as variáveis.**

```
var
   nomeTurma, nomeLab, nomeDoTurno: caractere
   alunos, laboratorio, capacidade, vagas, dia, turno: inteiro
   cadastroValido, reservaValida: logico
```

**Passo 2: ler os dados da turma e conferir as regras.** A turma tem nome obrigatório e de 1 a 60 alunos.

```
cadastroValido <- verdadeiro

// regra: nome obrigatório
se nomeTurma = "" entao
   escreval("Aviso: o nome da turma é obrigatório.")
   cadastroValido <- falso
fimse

// regra: a turma tem de 1 a 60 alunos
se (alunos < 1) ou (alunos > 60) entao
   escreval("Aviso: o número de alunos deve ser de 1 a 60.")
   cadastroValido <- falso
fimse
```

O `""` (aspas sem nada dentro) é o **texto vazio**: é o que o `leia` guarda quando o usuário só aperta Enter.

**Passo 3: a reserva simples**, só se o cadastro foi aceito. O professor escolhe o laboratório, o dia e o turno. Os alunos **não** são digitados de novo: são os da turma que acabou de ser cadastrada. As regras de hoje: a turma cabe? (`alunos <= capacidade`); quantos lugares sobram? (`capacidade - alunos`); qual o turno e o horário? (`escolha`); é sábado à tarde ou à noite? (bloqueia).

Os laboratórios ainda não estão guardados em lugar nenhum (vetores são da aula 6). Por enquanto, um `escolha` dá o nome e a capacidade de cada um, com os dados do `dados/laboratorios.csv`:

```
escolha laboratorio
caso 1
   nomeLab <- "Eletrotécnica"
   capacidade <- 20
caso 2
   nomeLab <- "Informática"
   capacidade <- 30
// ... casos 3, 4 e 5: Radiologia (15), Segurança no trabalho (25), Enfermagem (20)
outrocaso
   escreval("Laboratório inválido. Escolha de 1 a 5.")
   reservaValida <- falso
fimescolha

// regra: a turma precisa caber (só confere se o laboratório existe)
se reservaValida entao
   se alunos > capacidade entao
      escreval("A turma não cabe: ", alunos, " alunos para ", capacidade, " lugares.")
      reservaValida <- falso
   fimse
fimse

escolha turno
caso 1
   nomeDoTurno <- "Manhã, 08h às 12h"
caso 2
   nomeDoTurno <- "Tarde, 13h30 às 17h30"
caso 3
   nomeDoTurno <- "Noite, 18h30 às 22h30"
outrocaso
   escreval("Turno inválido. Escolha de 1 a 3.")
   reservaValida <- falso
fimescolha

// regra: no sábado (dia 6), só o turno da manhã (turno 1)
se (dia = 6) e (turno <> 1) entao
   escreval("No sábado, só o turno da manhã.")
   reservaValida <- falso
fimse

se reservaValida entao
   vagas <- capacidade - alunos
   escreval("Reserva confirmada!")
   escreval("Turma ", nomeTurma, " - ", nomeLab, " - dia ", dia, " - ", nomeDoTurno)
   escreval("Lugares que sobram: ", vagas)
senao
   escreval("Reserva recusada.")
fimse
```

No arquivo completo, há também a regra do dia: `(dia < 1) ou (dia > 6)` é inválido.

Uma execução de exemplo:

```
=== CADASTRO DE TURMA ===
Nome da turma (ex.: ADM09): ADM09
Número de alunos (1 a 60): 28
Turma cadastrada: ADM09 - 28 alunos

=== NOVA RESERVA ===
Laboratório:
1 Eletrotécnica (20) | 2 Informática (30) | 3 Radiologia (15)
4 Segurança no trabalho (25) | 5 Enfermagem (20)
2
Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb
3
Turno: 1 Manhã | 2 Tarde | 3 Noite
3
Reserva confirmada!
Turma ADM09 - Informática - dia 3 - Noite, 18h30 às 22h30
Lugares que sobram: 2
```

Teste também os casos que **devem** ser recusados: a mesma turma ADM09 (28 alunos) no laboratório 3 (Radiologia, 15 lugares); e qualquer reserva no dia 6 com turno 2 ou 3.

**Passo 4: guardar no repositório da turma.** O Portugol é o começo do **CP2**, que você entrega na aula 6. Por isso, ele vai numa branch nova. No terminal, dentro do repositório da turma, traga as novidades da `main` (o seu CP1 já entrou nela com o merge) e crie a branch do CP2 (aula 3, seção 3.5):

```
git switch main
git pull
git switch -c <sua-pasta>/cp2
```

Se o PR do CP1 ainda não teve merge, termine as correções que o professor pediu nele e chame o professor antes de criar a branch nova.

Na sua pasta, `alunos/<sua-pasta>/`, crie a pasta `portugol` e salve o seu algoritmo como `portugol/reserva-laboratorio.alg`. Depois, de dentro da sua pasta:

```
git add portugol/reserva-laboratorio.alg
git commit -m "feat: adiciona cadastro de turma e reserva simples em portugol"
git push -u origin <sua-pasta>/cp2
```

Ainda não abra o Pull Request: as aulas 5 e 6 continuam nesta branch.

E não esqueça de **sair da conta** do GitHub (aula 3, seção 3.6).

## 4.9 Erros comuns

| Sintoma | Causa |
|---|---|
| "Variável não encontrada" | A variável não foi declarada no `var`, ou o nome foi digitado diferente |
| Erro de tipos incompatíveis ao usar `/` | O resultado de `/` é `real`; guardar em `inteiro` dá erro. Use `\` ou declare como `real` |
| Erro ao digitar letras num `leia` | A variável é `inteiro` ou `real`; o usuário precisa digitar número |
| `8,5` não funciona | No código, o decimal usa **ponto**: `8.5` |
| Erro no fim do programa ("esperava fimse") | Faltou um `fimse`, `fimescolha` ou `fimalgoritmo`; conte os pares |
| `se nome = Carla` dá erro | Texto vai entre aspas: `"Carla"` |
| Média errada (`7 + 8 / 2` dá 11) | Faltaram parênteses: `(7 + 8) / 2` |
| `se x > 1 e x < 60` dá erro ou resultado estranho | Use parênteses em cada comparação: `(x > 1) e (x < 60)` |
| Acentos aparecem estranhos na tela | Versão ou fonte do VisualG; o programa funciona igual. Se incomodar, tire os acentos dos textos |
| "Token inesperado: tipo" (ou erro parecido numa variável) | O nome da variável é uma **palavra reservada** da linguagem (`tipo`, `caso`, `fim`, `pos`, `int`, `log`…). Troque o nome: `tipoDado`, `posicao`, `numeroInteiro` |

## 4.10 Exercícios em aula

1. **Área do retângulo.** Leia a base e a altura (reais) e mostre a área com 2 casas decimais.
2. **Antecessor e sucessor.** Leia um número inteiro e mostre o anterior e o próximo.
3. **Minutos em horas.** Leia uma duração em minutos e mostre em horas e minutos, usando `\` e `mod` (ex.: 130 minutos = 2 h e 10 min).
4. **Pode votar?** Leia a idade e mostre: "Não vota" (menos de 16), "Voto facultativo" (16, 17 ou mais de 70) ou "Voto obrigatório" (de 18 a 70). Use `se` dentro de `senao` e o operador `ou`.
5. **Desconto da cantina.** Leia o valor da compra. Acima de R$ 20,00, há 10% de desconto. Mostre o valor final com 2 casas.
6. **Dia da semana.** Leia um número de 1 a 7 e mostre o dia (1 = domingo ... 7 = sábado) com `escolha`. Número fora da faixa: "Dia inválido".
7. **(Projeto)** **Ocupação da turma.** Leia a capacidade do laboratório e o número de alunos e mostre quanto do laboratório a turma ocupa, em %, com 1 casa decimal (ex.: 28 de 30 = 93.3%). Se a turma não couber, mostre quantos alunos sobram.
8. **(Projeto)** **Onde a turma cabe?** Leia o número de alunos de uma turma e mostre, com 5 `se` (um para cada laboratório), os laboratórios em que ela cabe: Eletrotécnica (20), Informática (30), Radiologia (15), Segurança no trabalho (25), Enfermagem (20). Se não couber em nenhum, mostre "Nenhum laboratório comporta a turma".

## 4.11 Desafio para a próxima aula

**A reserva por extenso.** Acrescente ao seu `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg` a mensagem com o dia e o horário da reserva **por extenso**, usando **dois** `escolha ... caso`: um para o dia e outro para o turno. Exemplos:

```
Dia 2, turno 2  →  Terça, tarde: 13h30 às 17h30
Dia 1, turno 1  →  Segunda, manhã: 08h às 12h
Dia 5, turno 3  →  Sexta, noite: 18h30 às 22h30
Dia 6, turno 1  →  Sábado, manhã: 08h às 12h
```

Dica: o primeiro `escolha dia` guarda o nome do dia numa variável (`nomeDoDia`); o segundo `escolha turno` guarda o turno com o horário; no fim, um `escreval` junta os dois.

Teste os 4 casos acima e mais um dia 6 com turno 3 (tem que continuar recusado). Faça commit (`git commit -m "feat: mostra a reserva por extenso"`) e push na branch do CP2.

## 4.12 Resumo

- Programa do VisualG: `algoritmo "nome"`, `var`, `inicio`, comandos, `fimalgoritmo`; **F9** executa, **F8** executa passo a passo;
- Tipos: `inteiro`, `real` (com ponto), `caractere` (entre aspas), `logico` (`verdadeiro`/`falso`);
- `<-` guarda; `leia` recebe do teclado; `escreva` mostra; `escreval` mostra e pula linha; `valor:5:1` formata casas decimais;
- Aritméticos: `+ - * /`, `\` (divisão inteira) e `mod` (resto); relacionais: `= <> > < >= <=`; lógicos: `e`, `ou`, `nao`;
- `se ... entao ... senao ... fimse` para sim/não; `escolha ... caso ... outrocaso ... fimescolha` para menus;
- No projeto: cadastro de uma turma com as regras e reserva simples (cabe? lugares que sobram, turno com horário, sábado só de manhã), salvos em `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg`, na branch do CP2.
