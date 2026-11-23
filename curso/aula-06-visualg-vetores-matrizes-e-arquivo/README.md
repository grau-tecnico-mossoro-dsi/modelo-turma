**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-05-visualg-repeticao-e-teste-de-mesa/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-07-visualg-procedimentos-e-funcoes/README.md)

---

# AULA 6 — VisualG: vetores, matrizes e o comando arquivo

## Objetivos da aula

- Entender por que **uma variável por valor** não funciona quando a lista cresce;
- Declarar e usar **vetores** (`vetor[1..n] de tipo`): índice, leitura, escrita e percurso com `para`;
- Usar **vetores paralelos** (a mesma posição descreve a mesma coisa em vetores diferentes);
- Declarar e percorrer **matrizes** (linha x coluna) com **laço aninhado**;
- Conhecer a ideia de **fila** e **pilha** montadas com vetor (só o conceito);
- Usar o comando **`arquivo`** do VisualG para o `leia` buscar os dados num `.txt`;
- Fechar o **CP2**: laboratórios e turmas em vetores e a grade da semana (dia x turno) em matriz, com conflito de horário.

## 6.1 O problema: dez variáveis para dez números

Na aula 5 você leu várias notas com um laço e calculou a média. Mas a média só precisava da **soma**: cada nota era lida, somada e esquecida. E se, depois da média, fosse preciso mostrar **quais** notas ficaram acima dela? As notas já foram embora.

Com o que sabemos até agora, a saída seria esta:

```
var
   nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, nota9, nota10: real
```

Funciona para 10. Para 40 alunos, são 40 variáveis, 40 `leia` e 40 `se`. Não dá para usar o `para`, porque `nota1` e `nota2` são nomes diferentes: o laço não consegue "trocar o número do nome".

A solução é uma variável que guarda **vários valores**, cada um numa **posição numerada**. Essa variável se chama **vetor**.

## 6.2 Vetor: uma variável com gavetas numeradas

Pense num armário com gavetas numeradas. O armário tem **um nome**; cada gaveta tem **um número** (o **índice**) e guarda **um valor**.

```
var
   notas: vetor[1..5] de real
```

```
                 índice:    1       2       3       4       5
                        ┌───────┬───────┬───────┬───────┬───────┐
             notas ───► │  8.5  │  7.0  │  9.2  │  6.8  │ 10.0  │
                        └───────┴───────┴───────┴───────┴───────┘

   notas[3]  →  a gaveta 3  →  9.2
```

Leia a declaração assim: "`notas` é um vetor com posições de **1 até 5**, e todas guardam **real**". Regras do VisualG:

- todas as posições têm o **mesmo tipo** (um vetor de `inteiro` só guarda inteiros);
- o **tamanho é fixo**: decidido no `var`, não muda durante a execução;
- o índice vai entre **colchetes**: `notas[1]`, `notas[i]`, `notas[i + 1]`.

Usar uma posição é igual a usar uma variável comum:

```
notas[1] <- 8.5              // grava na gaveta 1
leia(notas[2])               // o usuário digita o valor da gaveta 2
escreval(notas[1] + notas[2])
```

O grande truque: o índice pode ser uma **variável**. É isso que junta o vetor com o `para` da aula 5:

```
para i de 1 ate 5 faca
   escreva("Nota ", i, ": ")
   leia(notas[i])            // i = 1, depois 2, 3, 4, 5
fimpara
```

Cinco ou quinhentas notas: muda só o número no `var` e no `para`.

> **Atenção:** usar `notas[6]` num vetor `[1..5]` é erro de execução (índice fora do vetor). O VisualG para o programa e mostra a mensagem. Sempre confira os limites do `para`.

## 6.3 Percorrer o vetor: os padrões que você já conhece

Os padrões da aula 5 (contador e acumulador) continuam iguais. A diferença é que agora os valores **ficam guardados** e podemos percorrer o vetor quantas vezes quisermos.

**Exemplo clássico: o maior de 10 números** (arquivo [`exemplos/maior-de-10.alg`](exemplos/maior-de-10.alg)):

```
algoritmo "Maior de 10 numeros"
var
   numeros: vetor[1..10] de inteiro
   i, maior, posicaoDoMaior: inteiro
inicio
   para i de 1 ate 10 faca
      escreva("Digite o número ", i, ": ")
      leia(numeros[i])
   fimpara

   maior <- numeros[1]            // chute inicial: o primeiro
   posicaoDoMaior <- 1
   para i de 2 ate 10 faca        // começa no 2: o 1 já é o chute
      se numeros[i] > maior entao
         maior <- numeros[i]      // achou um maior: ele assume
         posicaoDoMaior <- i
      fimse
   fimpara

   escreval("Maior número: ", maior, " (posição ", posicaoDoMaior, ")")
fimalgoritmo
```

Por que o chute inicial é `numeros[1]` e não `0`? Porque, se todos os números forem negativos (temperaturas no inverno, saldo no vermelho), o `0` "ganharia" sem estar na lista.

**Exemplo clássico: inverter um vetor** ([`exemplos/inverter-vetor.alg`](exemplos/inverter-vetor.alg)). Há duas versões:

```
// 1) só MOSTRAR ao contrário: o para anda para trás
para i de 6 ate 1 passo -1 faca
   escreva(valores[i], " ")
fimpara

// 2) INVERTER de verdade: troca o 1º com o 6º, o 2º com o 5º, o 3º com o 4º
para i de 1 ate 3 faca
   auxiliar <- valores[i]
   valores[i] <- valores[6 - i + 1]
   valores[6 - i + 1] <- auxiliar
fimpara
```

A troca precisa da variável `auxiliar`, como trocar o conteúdo de dois copos precisa de um terceiro copo. E o laço vai só até a **metade** (3): se fosse até 6, cada par seria trocado duas vezes e o vetor voltaria ao normal. Faça o teste de mesa com `[1, 2, 3, 4, 5, 6]` para ver.

## 6.4 Vetores paralelos

Um laboratório tem nome **e** capacidade. Um vetor só guarda um tipo. A solução desta fase do curso: **um vetor para cada informação**, usando a **mesma posição** para o mesmo laboratório.

```
var
   nomesLabs: vetor[1..5] de caractere
   capacidades: vetor[1..5] de inteiro
```

```
   posição:        1               2              3             4                    5
              ┌───────────────┬─────────────┬────────────┬───────────────────────┬────────────┐
   nomesLabs  │ Eletrotécnica │ Informática │ Radiologia │ Segurança no trabalho │ Enfermagem │
              ├───────────────┼─────────────┼────────────┼───────────────────────┼────────────┤
   capacidades│      20       │     30      │     15     │          25           │     20     │
              └───────────────┴─────────────┴────────────┴───────────────────────┴────────────┘
                                    ▲ mesma posição = mesmo laboratório
```

Os laboratórios são **espaços físicos**: a escola tem 5 e ninguém cadastra laboratório pelo sistema. Por isso o vetor tem exatamente 5 posições, todas em uso, e o `para` vai de 1 até 5.

Com as **turmas** é diferente: elas são cadastradas. O vetor de turmas tem 20 posições, mas no começo só 2 estão em uso. Por isso existe uma variável **`quantidadeTurmas`**, que diz quantas posições estão ocupadas. Todo `para` de listagem vai de 1 até `quantidadeTurmas`, e não até 20. Cadastrar uma turma nova é **somar 1** em `quantidadeTurmas` e gravar nessa posição.

```
   posição:          1        2        3 ... 20
               ┌─────────┬─────────┬──────────
   nomesTurmas │  ADM09  │  DSI02  │ (vazio)
               ├─────────┼─────────┼──────────
   alunosTurmas│   28    │   24    │ (vazio)
               └─────────┴─────────┴──────────
   quantidadeTurmas = 2
```

Essa ideia volta igualzinha no JavaScript da aula 10, e na aula 11 os vetores paralelos dão lugar aos **objetos**.

## 6.5 Matriz: linhas e colunas

Uma lista tem **uma** dimensão. Uma tabela tem **duas**: linhas e colunas. No VisualG, a tabela se chama **matriz** e é declarada com os dois intervalos:

```
var
   notas: vetor[1..3, 1..4] de real      // 3 linhas (alunos) x 4 colunas (bimestres)
```

```
                     coluna →    1      2      3      4
                              ┌──────┬──────┬──────┬──────┐
   linha 1 (Ana)              │ 8.0  │ 7.5  │ 9.0  │ 6.5  │
                              ├──────┼──────┼──────┼──────┤
   linha 2 (Bruno)            │ 5.5  │ 6.0  │ 7.0  │ 8.0  │
                              ├──────┼──────┼──────┼──────┤
   linha 3 (Carla)            │ 9.5  │ 9.0  │ 10.0 │ 9.0  │
                              └──────┴──────┴──────┴──────┘

   notas[2, 3]  →  linha 2, coluna 3  →  7.0 (Bruno, 3º bimestre)
```

Regra de ouro: **primeiro a linha, depois a coluna**, sempre.

Para visitar todas as células, usamos um `para` **dentro** de outro (**laço aninhado**): o de fora anda nas linhas, o de dentro anda nas colunas.

```
para linha de 1 ate 3 faca
   soma <- 0                               // zera para CADA aluno
   para coluna de 1 ate 4 faca
      soma <- soma + notas[linha, coluna]
   fimpara
   media <- soma / 4
   escreval(alunos[linha], ": média ", media:4:1)
fimpara
```

O laço de dentro roda **inteiro** a cada volta do de fora: 3 x 4 = 12 repetições. O exemplo completo, com o boletim e a média da turma num bimestre (soma de uma **coluna**), está em [`exemplos/matriz-de-notas.alg`](exemplos/matriz-de-notas.alg).

> O `media:4:1` é a formatação de número real do VisualG: 4 espaços no total, 1 casa depois do ponto.

## 6.6 Fila e pilha com vetor (só o conceito)

Duas formas de **organizar** uma lista aparecem o tempo todo em sistemas. Hoje só desenhamos no quadro; o código vem na aula 11, em JavaScript.

**Fila (FIFO: o primeiro a entrar é o primeiro a sair).** Fila do banco, fila de impressão, **lista de espera** do laboratório.

```
   entra pelo FIM                          sai pelo INÍCIO
        │                                        ▲
        ▼                                        │
   ┌────────┬────────┬────────┬────────┐
   │ Carla  │ Rafael │ Juliana│        │   inicio = 1, fim = 3
   └────────┴────────┴────────┴────────┘
       1        2        3        4
```

Com vetor, a fila precisa de duas variáveis: onde ela **começa** e onde ela **termina**. Entrar = `fim <- fim + 1` e gravar em `fila[fim]`. Sair = pegar `fila[inicio]` e fazer `inicio <- inicio + 1`.

**Pilha (LIFO: o último a entrar é o primeiro a sair).** Pilha de pratos, o "desfazer" (Ctrl+Z) do editor, **desfazer a última reserva**.

```
        ┌────────────┐
   4    │            │
        ├────────────┤
   3    │ Reserva 3  │  ◄── topo = 3 (é a próxima a sair)
        ├────────────┤
   2    │ Reserva 2  │
        ├────────────┤
   1    │ Reserva 1  │
        └────────────┘
```

A pilha precisa de uma variável só, o **topo**. Empilhar = `topo <- topo + 1` e gravar. Desempilhar = pegar `pilha[topo]` e fazer `topo <- topo - 1`.

No projeto final, a lista de espera é uma fila e o "desfazer" é uma pilha (aula 11).

## 6.7 O comando `arquivo`: o `leia` lendo de um `.txt`

Testar um programa com vetores dá trabalho: a cada execução, digitar 10 números de novo. O VisualG tem um comando para isso: **`arquivo`**. Com ele, o `leia` deixa de esperar o teclado e passa a buscar os valores num arquivo de texto, **um valor por linha**.

O arquivo [`exemplos/notas.txt`](exemplos/notas.txt):

```
8.5
7
6.5
9
```

O algoritmo [`exemplos/media-do-arquivo.alg`](exemplos/media-do-arquivo.alg):

```
algoritmo "Media lida de um arquivo"
arquivo "notas.txt"
var
   notas: vetor[1..4] de real
   i: inteiro
   soma, media: real
inicio
   soma <- 0
   para i de 1 ate 4 faca
      leia(notas[i])             // agora o valor vem do notas.txt
      soma <- soma + notas[i]
   fimpara
   media <- soma / 4
   escreval("Média: ", media:4:1)
fimalgoritmo
```

Repare que o resto do programa **não muda**: só a linha `arquivo` decide de onde o `leia` busca os dados.

> **Confira no laboratório antes da aula.** O comportamento do `arquivo` pode variar entre versões do VisualG. Teste na versão instalada: (1) se o comando funciona logo depois da linha `algoritmo` (como acima) ou se precisa ficar em outra posição; (2) em que pasta o VisualG procura o `notas.txt` (comece deixando o `.txt` na mesma pasta do `.alg`); (3) o que acontece quando o arquivo não existe. Se o comando não existir na versão do laboratório, mostre o exemplo só como leitura.

Por que isso importa: é a primeira vez que um programa nosso lê **dados de um arquivo**. Na aula 14, o JavaScript vai ler arquivos `.csv` de verdade, como o `laboratorios.csv` que você criou na aula 3.

## 6.8 Projeto da disciplina: o que fazemos hoje

Hoje o `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg` ganha **memória**: os 5 laboratórios, várias turmas e uma semana inteira de reservas. É o **CP2**.

**Passo 1. Laboratórios em vetores paralelos.** No `var`, acrescente:

```
nomesLabs: vetor[1..5] de caractere
capacidades: vetor[1..5] de inteiro
```

E, no começo do `inicio`, os dados iniciais (os mesmos do `dados/laboratorios.csv`):

```
nomesLabs[1] <- "Eletrotécnica"
capacidades[1] <- 20
nomesLabs[2] <- "Informática"
capacidades[2] <- 30
nomesLabs[3] <- "Radiologia"
capacidades[3] <- 15
nomesLabs[4] <- "Segurança no trabalho"
capacidades[4] <- 25
nomesLabs[5] <- "Enfermagem"
capacidades[5] <- 20
```

Laboratório não tem cadastro: é um espaço físico, só **listamos** e **buscamos**.

**Passo 2. Listar numerado.** O desafio do cadastro pede sempre uma **lista numerada**: é por ela que o usuário escolhe um item depois.

```
para i de 1 ate 5 faca
   escreval(i, ". ", nomesLabs[i], " - ", capacidades[i], " lugares")
fimpara
```

**Passo 3. Buscar por capacidade mínima.** "Preciso de 25 lugares": mostra só quem tem 25 ou mais. É uma **busca linear** (olha posição por posição) com um **contador** para avisar quando ninguém foi encontrado.

```
encontrados <- 0
para i de 1 ate 5 faca
   se capacidades[i] >= minimo entao
      escreval(i, ". ", nomesLabs[i], " - ", capacidades[i], " lugares")
      encontrados <- encontrados + 1
   fimse
fimpara
se encontrados = 0 entao
   escreval("Nenhum laboratório com ", minimo, " lugares ou mais.")
fimse
```

**Passo 4. Turmas em vetores.** O cadastro de UMA turma da aula 4 (nome obrigatório, alunos de 1 a 60) agora grava na **próxima posição livre**. No `var`:

```
nomesTurmas: vetor[1..20] de caractere
alunosTurmas: vetor[1..20] de inteiro
quantidadeTurmas: inteiro
```

Comece com duas turmas de exemplo (`ADM09` com 28 alunos e `DSI02` com 24) e `quantidadeTurmas <- 2`. No cadastro, confira antes se ainda cabe:

```
se quantidadeTurmas = 20 entao
   escreval("Limite de 20 turmas atingido.")
senao
   quantidadeTurmas <- quantidadeTurmas + 1
   repita
      escreval("Nome da turma (ex.: ADM09):")
      leia(nomesTurmas[quantidadeTurmas])
      se nomesTurmas[quantidadeTurmas] = "" entao
         escreval("O nome é obrigatório.")
      fimse
   ate nomesTurmas[quantidadeTurmas] <> ""
   // ... mesma ideia para o número de alunos (1 a 60)
fimse
```

E uma opção para listar as turmas numeradas, de 1 até `quantidadeTurmas`.

**Passo 5. A grade da semana em matriz.** Cada linha é um **dia** (1 = segunda ... 6 = sábado); cada coluna é um **turno**. A reserva é sempre do turno inteiro, como no app da escola. A célula guarda o nome da **turma** que reservou ou `""` (livre). Nesta versão, a grade é só do laboratório de **Informática** (posição 2).

```
grade: vetor[1..6, 1..3] de caractere
```

```
               MANHÃ        TARDE           NOITE
              08h-12h    13h30-17h30    18h30-22h30
   Seg  │             │              │              │
   Ter  │   ADM09     │              │              │
   Qua  │             │              │    DSI02     │
   Qui  │             │              │              │
   Sex  │             │   ADM09      │              │
   Sáb  │             │   fechado    │   fechado    │  ◄── sábado: só de manhã
```

No início, a grade inteira recebe `""` com um laço aninhado (veja o arquivo de referência).

**Passo 6. Reservar.** O usuário escolhe a turma **da lista numerada** (o número de alunos vem da turma, não é digitado de novo), o dia (1 a 6) e o turno (1 a 3), cada um validado com `repita`. Depois, três regras, uma depois da outra:

```
se (dia = 6) e (turno <> 1) entao
   escreval("No sábado, só o turno da manhã.")
senao
   se alunosTurmas[escolhida] > capacidades[2] entao
      escreval("A turma não cabe: ", alunosTurmas[escolhida], " alunos para ", capacidades[2], " lugares.")
   senao
      se grade[dia, turno] = "" entao
         grade[dia, turno] <- nomesTurmas[escolhida]
         escreval("Reserva confirmada. Sobram ", capacidades[2] - alunosTurmas[escolhida], " lugares.")
      senao
         escreval("Horário ocupado pela turma ", grade[dia, turno], ".")
      fimse
   fimse
fimse
```

Repare como a matriz deixa o **conflito** simples: o mesmo laboratório, no mesmo dia e turno, é **uma célula só**. Se ela não está vazia, o horário está ocupado.

**Passo 7. Mostrar a grade.** Laço aninhado: para cada dia, escreve os 3 turnos na mesma linha (`escreva`) e só pula de linha no fim do dia (`escreval("")`). No sábado à tarde e à noite, escreva `[fechado]`, como o calendário do app.

**Passo 8. Menu.** O menu validado da aula 5 ganha as opções novas: 1 Listar laboratórios, 2 Buscar por capacidade mínima, 3 Cadastrar turma, 4 Listar turmas, 5 Reservar o laboratório de Informática, 6 Ver grade da semana, 7 Sair. (O desafio 6.11 acrescenta mais uma opção antes do Sair.)

**Passo 9. Teste e commit.** Na branch do CP2 (`<sua-pasta>/cp2`), de dentro da sua pasta:

```
git add portugol/reserva-laboratorio.alg
git commit -m "feat: adiciona vetores de laboratorios e turmas e grade da semana"
git push
```

**Passo 10. Pull Request do CP2.** Abra o PR da branch `<sua-pasta>/cp2` para a `main`, com o título `CP2 - <sua-pasta>` (aula 3, seção 3.5, item 5). Espere o check ficar **✔**. Quando o professor comentar, corrija com um commit novo na mesma branch: o PR se atualiza sozinho.

## 6.9 Erros comuns

| Sintoma | Causa |
|---|---|
| Erro "índice fora dos limites" (ou parecido) | O `para` passou do tamanho do vetor, ou o índice ficou 0. No VisualG o vetor começa em **1** |
| A listagem de turmas mostra linhas vazias | O `para` foi até 20 em vez de até `quantidadeTurmas` |
| A turma nova apaga a última | Esqueceu de somar 1 em `quantidadeTurmas` **antes** de gravar |
| Nome e capacidade "trocados" de laboratório | Vetores paralelos com posições diferentes: gravou o nome em `i` e a capacidade em `i + 1` |
| O vetor invertido volta igual ao original | O laço de troca foi até o fim em vez de parar na metade |
| A troca perde um valor | Faltou a variável auxiliar |
| Matriz com valores no lugar errado | Inverteu linha e coluna: é `grade[dia, turno]`, nessa ordem |
| A grade sai toda numa linha só | Faltou o `escreval("")` depois do laço de dentro |
| Reserva aceita no sábado à noite | A regra do sábado ficou depois da gravação na grade, ou usou `ou` no lugar de `e` em `(dia = 6) e (turno <> 1)` |
| Reserva aceita em horário ocupado | Comparou `grade[dia, turno] <> ""` ao contrário, ou a grade não foi inicializada com `""` |
| A média do aluno soma as notas do anterior | `soma <- 0` ficou **fora** do laço de fora |
| `arquivo` não encontra o `.txt` | Pasta diferente da esperada pelo VisualG (veja o aviso da seção 6.7) |

## 6.10 Exercícios em aula

1. **Cinco temperaturas.** Leia 5 temperaturas num vetor e mostre: a média, a maior, a menor e quantas ficaram acima da média (precisa percorrer o vetor duas vezes).
2. **Notas acima da média.** Leia 8 notas e mostre a lista numerada só das notas maiores ou iguais à média da turma.
3. **Procurar um nome.** Leia 5 nomes num vetor. Depois, leia um nome para procurar e mostre "Encontrado na posição X" ou "Não encontrado". Use uma variável `logico` como bandeira.
4. **Vetor ao contrário em outro vetor.** Leia 6 números em `original` e copie para `invertido` de trás para frente (sem usar troca). Mostre os dois.
5. **Tabuada em matriz.** Monte uma matriz `tabuada[1..10, 1..10]` onde cada célula guarda `linha * coluna` e mostre a tabela linha por linha.
6. **Matriz de vendas.** Uma loja tem 3 vendedores e 4 semanas. Leia as vendas numa matriz `[1..3, 1..4]` e mostre o total de cada vendedor (soma da linha) e o total de cada semana (soma da coluna).
7. **(Projeto) Maior laboratório.** No seu `.alg`, acrescente uma opção que mostra o laboratório de **maior capacidade** (nome e capacidade), usando o padrão do "maior" da seção 6.3.
8. **(Projeto) Dia mais cheio.** Percorra a grade e mostre qual dia da semana tem **mais turnos ocupados**. Dica: um contador por dia (zera a cada linha) e o padrão do "maior".

## 6.11 Desafio para a próxima aula

**Ocupação da semana.** No seu `alunos/<sua-pasta>/portugol/reserva-laboratorio.alg`, crie uma nova opção no menu: **"Ocupação da semana"**. Ela percorre a grade inteira (laço aninhado), conta quantos horários estão ocupados e mostra o percentual:

```
ocupação = horários ocupados / 16 * 100
```

Por que 16? São 5 dias (segunda a sexta) x 3 turnos = 15, mais a manhã de sábado = **16 horários** que podem ser reservados. Mostre com uma casa decimal, por exemplo `Ocupação da semana: 18.8%` (3 de 16). Declare a variável do percentual como `real`.

Faça o commit e o push na branch do CP2 (o commit entra no PR do CP2) e traga funcionando: na aula 7, este código vai ser reorganizado em procedimentos e funções.

## 6.12 Resumo

- **Vetor** = uma variável com várias posições do **mesmo tipo**; no VisualG, `vetor[1..n] de tipo` e o índice começa em **1**;
- O índice pode ser uma variável: **vetor + `para`** percorre a lista inteira;
- Padrões sobre vetores: acumular, contar, maior/menor (chute inicial = 1º elemento), procurar (com bandeira), inverter (troca com auxiliar até a metade);
- **Vetores paralelos**: a mesma posição descreve o mesmo item; `quantidadeTurmas` diz quantas posições estão em uso;
- **Matriz** = tabela: `vetor[1..L, 1..C] de tipo`, acesso `m[linha, coluna]`, percorrida com **laço aninhado**;
- **Fila** (FIFO) e **pilha** (LIFO) podem ser montadas com vetor + variáveis de controle (código na aula 11);
- O comando **`arquivo`** faz o `leia` buscar os valores num `.txt` (confira na versão do laboratório);
- No projeto: laboratórios e turmas em vetores, grade `[6, 3]` (dia x turno) com sábado, capacidade e conflito. **CP2**, entregue por Pull Request da branch `<sua-pasta>/cp2`.
