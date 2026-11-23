**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[Índice do curso](../README.md) · [Próxima →](../aula-02-fluxogramas/README.md)

---

# AULA 1 — Algoritmos e linguagens

## Objetivos da aula

- Entender o que é um **algoritmo** e o que é uma **instrução**;
- Escrever passos em uma **sequência lógica**, sem **ambiguidade**;
- Separar qualquer problema em **entrada, processamento e saída**;
- Conhecer os tipos de linguagem: **de máquina**, **simbólica** (assembly) e **de alto nível**;
- Diferenciar **compilação**, **interpretação** e **execução**;
- Conhecer o projeto da disciplina, a **Reserva de Laboratórios**: levantar os requisitos olhando o app real da escola e escrever o primeiro algoritmo dele.

## 1.1 O problema: o computador não adivinha

Peça a um colega: "pega uma caneta pra mim". Ele levanta, procura uma caneta, pega e entrega. Ele precisou decidir sozinho **qual** caneta, **onde** procurar e **como** entregar. Uma pessoa preenche essas lacunas com bom senso.

O computador não tem bom senso nenhum. Ele faz **exatamente** o que mandam, na **ordem** em que mandam, nem mais nem menos. Se a ordem estiver incompleta, ele trava ou faz besteira. Por isso, antes de aprender qualquer linguagem de programação, você vai aprender a **dar ordens sem lacunas**. Essa lista de ordens tem nome: **algoritmo**.

> Programar não é decorar comandos. Programar é **descrever a solução de um problema em passos** tão claros que uma máquina consiga seguir.

## 1.2 Algoritmo e instrução

- **Instrução** é uma ordem simples, que não precisa ser explicada: "abra a porta", "some 2 com 3", "mostre o resultado".
- **Algoritmo** é uma **sequência finita de instruções**, em uma ordem definida, que resolve um problema.

Todo algoritmo bem escrito tem estas características:

| Característica | O que significa | Exemplo do que NÃO é |
|---|---|---|
| **Preciso** | Cada passo só pode ser entendido de um jeito | "Coloque um pouco de sal" |
| **Finito** | Termina depois de um número de passos | "Fique esperando para sempre" |
| **Ordenado** | A ordem dos passos faz parte da solução | Servir o café antes de passar a água |
| **Executável** | Cada passo pode ser feito de verdade | "Descubra o último número que existe" |
| **Entrada e saída** | Recebe dados e entrega um resultado | Um cálculo que não mostra nada a ninguém |

## 1.3 Sequência lógica: a receita de bolo

O exemplo mais clássico de algoritmo é a receita. Veja uma receita de bolo simples:

```
ALGORITMO: fazer um bolo simples
 1. Ligar o forno em 180 graus.
 2. Untar a forma com manteiga e farinha.
 3. Colocar 3 ovos, 2 xícaras de açúcar e 1 xícara de leite na tigela.
 4. Misturar até ficar uniforme.
 5. Acrescentar 3 xícaras de farinha e misturar.
 6. Acrescentar 1 colher de fermento e misturar devagar.
 7. Despejar a massa na forma.
 8. Colocar a forma no forno.
 9. Esperar 40 minutos.
10. Desligar o forno e retirar o bolo.
```

Repare em três coisas:

1. A **ordem importa**. Se você trocar o passo 8 com o passo 3, coloca a forma vazia no forno.
2. Cada passo é **uma ação**. "Fazer a massa" seria vago; os passos 3 a 6 dizem como.
3. O algoritmo **termina** (passo 10). Ninguém fica preso na cozinha.

Essa ideia de passos um depois do outro, de cima para baixo, se chama **sequência lógica**. É a primeira das três estruturas de todo programa.

## 1.4 Ambiguidade: trocar um pneu

**Ambiguidade** é quando uma instrução pode ser entendida de mais de um jeito. Compare duas versões:

```
VERSÃO VAGA                          VERSÃO PRECISA
1. Troque o pneu.                    1. Desligar o carro e puxar o freio de mão.
                                     2. Pegar o macaco, a chave de roda e o estepe.
                                     3. Afrouxar os 4 parafusos (com o carro no chão).
                                     4. Levantar o carro com o macaco.
                                     5. Retirar os 4 parafusos e o pneu furado.
                                     6. Colocar o estepe.
                                     7. Colocar os 4 parafusos.
                                     8. Baixar o carro.
                                     9. Apertar os 4 parafusos em cruz.
                                    10. Guardar as ferramentas e o pneu furado.
```

Na versão da esquerda, cada pessoa faz de um jeito. Na da direita, duas pessoas que seguem os passos chegam ao mesmo resultado. E de novo a ordem importa: afrouxar os parafusos **antes** de levantar o carro impede a roda de girar no ar.

Palavras que denunciam ambiguidade: "um pouco", "a gosto", "mais ou menos", "se der", "uns", "rapidinho". Se a sua instrução tem uma dessas, ela ainda não serve para um computador.

## 1.5 Atividade: o algoritmo do robô

Agora é a turma que escreve o algoritmo. O professor vai ser um **robô** que só entende estas instruções:

```
INSTRUÇÕES QUE O ROBÔ ENTENDE
   DAR <número> PASSOS PARA FRENTE
   GIRAR 90 GRAUS PARA A DIREITA
   GIRAR 90 GRAUS PARA A ESQUERDA
   ABAIXAR O BRAÇO / LEVANTAR O BRAÇO
   ABRIR A MÃO / FECHAR A MÃO
   SENTAR / LEVANTAR
```

**Missão:** o robô está em pé na porta da sala e precisa pegar o apagador na mesa e entregar para um aluno.

Regras:

- A turma dita os passos, um por vez. O robô faz **exatamente** o que foi dito, ao pé da letra.
- Instrução fora da lista: o robô fica parado e diz "não entendi".
- Se o robô bater na parede, a turma descobriu um **erro de lógica** (o algoritmo estava errado, não o robô).

Ao final, escrevam no caderno o algoritmo que funcionou. Repare que ele tem as três partes de todo algoritmo: **começo** (robô na porta), **passos** e **fim** (apagador entregue).

## 1.6 Entrada, processamento e saída: somar dois números

Quase todo algoritmo segue o mesmo esqueleto:

```
   ┌──────────┐      ┌────────────────┐      ┌──────────┐
   │ ENTRADA  │ ───► │ PROCESSAMENTO  │ ───► │  SAÍDA   │
   │ (dados)  │      │ (cálculo)      │      │ (result.)│
   └──────────┘      └────────────────┘      └──────────┘
```

- **Entrada:** os dados que o algoritmo recebe (alguém digita, um arquivo, um sensor).
- **Processamento:** o que é feito com esses dados (calcular, comparar, organizar).
- **Saída:** o resultado entregue (mostrar na tela, imprimir, salvar).

O exemplo mais simples da programação, escrito de três jeitos diferentes:

**1) Descrição narrativa** (português do dia a dia):

```
Pedir o primeiro número. Pedir o segundo número. Somar os dois e mostrar o resultado.
```

**2) Algoritmo em passos numerados:**

```
ALGORITMO: somar dois números
1. Pedir o primeiro número e guardar como A.        (entrada)
2. Pedir o segundo número e guardar como B.         (entrada)
3. Calcular A + B e guardar como SOMA.              (processamento)
4. Mostrar SOMA na tela.                            (saída)
```

**3) Pseudocódigo** (um "português estruturado", quase uma linguagem de programação):

```
inicio
   leia A
   leia B
   SOMA <- A + B
   escreva SOMA
fim
```

O `<-` se lê "recebe": `SOMA <- A + B` significa "SOMA recebe A + B". A partir da aula 4 você vai digitar exatamente esse estilo no **VisualG**, e ele vai funcionar.

Repare no "guardar como A". O computador precisa de um **lugar com nome** para guardar cada dado. Esse lugar se chama **variável**, e é o assunto da aula 4.

## 1.7 Decidir e repetir com palavras

Algoritmos reais quase nunca são uma linha reta. Eles **decidem** e **repetem**. Dá para escrever isso em português, com palavras em maiúsculas:

```
ALGORITMO: pegar um ônibus
 1. Ir até a parada.
 2. ENQUANTO o ônibus certo não chegar FAÇA
 3.     esperar.
 4. FIM-ENQUANTO
 5. Subir no ônibus.
 6. SE o cartão tem saldo ENTÃO
 7.     passar o cartão.
 8. SENÃO
 9.     pagar em dinheiro.
10. FIM-SE
```

Aí estão as **três estruturas** com que se escreve qualquer programa:

```
   SEQUÊNCIA              DECISÃO                   REPETIÇÃO
   passo 1                SE condição ENTÃO         ENQUANTO condição FAÇA
   passo 2                   caminho A                 passo que se repete
   passo 3                SENÃO                     FIM-ENQUANTO
                             caminho B
                          FIM-SE
   (hoje)                 (aulas 2 e 4)             (aulas 2 e 5)
```

## 1.8 Tipos de linguagem: da máquina até você

O processador do computador só entende **números binários** (zeros e uns). Para não escrever programas em binário, as pessoas criaram linguagens mais parecidas com a nossa forma de pensar. Elas se organizam em níveis:

```
   ALTO NÍVEL           soma <- a + b                (Portugol)
   (Python, Java,       let soma = a + b;            (JavaScript)
    JavaScript, C)      → perto do jeito humano de escrever
        │
        ▼   tradutor: compilador ou interpretador
   LINGUAGEM            MOV AX, [a]
   SIMBÓLICA            ADD AX, [b]
   (assembly)           MOV [soma], AX
                        → um apelido em texto para cada instrução da máquina
        │
        ▼   tradutor: montador (assembler)
   LINGUAGEM            10001011 01000101 00000011 ...
   DE MÁQUINA           → o que o processador executa de fato
```

| Nível | Como é | Vantagem | Desvantagem |
|---|---|---|---|
| **Máquina** | Zeros e uns | O processador executa direto | Ninguém consegue ler; muda de um processador para outro |
| **Simbólica (assembly)** | Abreviações como `MOV`, `ADD` | Controle total do hardware | Muitos passos para fazer pouco; também muda com o processador |
| **Alto nível** | Palavras e símbolos parecidos com a matemática e o inglês | Fácil de ler e escrever; roda em vários computadores | Precisa de um tradutor |

Uma linha de alto nível vira **várias** instruções de máquina. É por isso que ninguém mais escreve sistemas inteiros em assembly.

## 1.9 Compilação, interpretação e execução

O programa que você escreve se chama **código-fonte**. O computador não executa o código-fonte direto: alguém precisa traduzir. Existem dois jeitos:

- **Compilação:** um programa chamado **compilador** lê o código-fonte inteiro e gera um **arquivo executável** (no Windows, o `.exe`). Depois, roda-se o executável. Exemplo clássico: a linguagem **C**.
- **Interpretação:** um programa chamado **interpretador** lê o código-fonte e já executa, comando por comando, sem gerar executável. Exemplos: **Python**, **JavaScript** e o próprio **VisualG**.
- **Execução:** é o momento em que o programa está rodando de fato, recebendo dados e mostrando resultados.

```
   COMPILAÇÃO                                 INTERPRETAÇÃO

   código-fonte (.c)                          código-fonte (.js, .py, .alg)
        │                                           │
        ▼  compilador (uma vez)                     ▼  interpretador (toda vez)
   executável (.exe)                          lê um comando → executa
        │                                     lê o próximo  → executa
        ▼  execução (quantas vezes quiser)    ...
   resultado                                  resultado
```

| Critério | Compilação | Interpretação |
|---|---|---|
| Quando traduz | Uma vez, antes de rodar | Toda vez que roda |
| Velocidade ao rodar | Mais rápida (já está traduzido) | Mais lenta (traduz enquanto roda) |
| Erros de escrita | Aparecem antes de rodar | Aparecem quando o comando com erro for executado |
| Para rodar em outro computador | Precisa compilar de novo para aquele sistema | Basta ter o interpretador |

**E o Java?** O Java é um caso **híbrido**: o compilador transforma o código em um formato intermediário (o *bytecode*), e uma máquina virtual (a JVM) executa esse bytecode. Por isso não é correto chamar o Java de "linguagem interpretada", como às vezes aparece por aí. O JavaScript dos navegadores atuais também mistura as duas estratégias, mas para nós ele se comporta como interpretado.

## 1.10 Projeto da disciplina: o que fazemos hoje

Durante a disciplina inteira, vamos construir um sistema de verdade: a **Reserva de Laboratórios**. Ele serve para os professores da escola reservarem um laboratório para uma turma **na semana seguinte**. A escola já usa um app de agenda de laboratórios, e o nosso projeto vai imitar esse app. Hoje ele começa do jeito mais simples possível: **em português, no caderno**.

**Passo 1: olhar o app real e levantar os requisitos.** O professor abre o app de agenda da escola no projetor. A turma **só olha**: ninguém faz reserva. Anote no caderno duas listas:

- **Os dados que o app pede** para fazer uma reserva (cada campo do formulário "Nova reserva");
- **As regras que aparecem na tela** (o que o app avisa, bloqueia ou mostra no calendário da semana).

Esse trabalho tem nome: **levantamento de requisitos**. Antes de escrever qualquer algoritmo, a gente descobre **o que** o sistema precisa fazer. Compare a sua lista com a da turma e, no fim, com as regras abaixo.

**As regras do sistema** (guarde, elas voltam em todas as aulas):

```
   TURNO        HORÁRIO
   1 Manhã      08h às 12h
   2 Tarde      13h30 às 17h30
   3 Noite      18h30 às 22h30
```

- A reserva é sempre do **turno inteiro** (4 horas) e sempre para a **semana seguinte**.
- Os dias vão de **segunda a sábado** (1 = segunda ... 6 = sábado). No **sábado, só o turno da manhã**.
- A reserva liga um **professor**, uma **turma**, um **laboratório**, um **dia** e um **turno**. A turma pertence a um **curso** (ex.: a turma ADM09 é do curso Administração).
- O número de alunos fica **na turma**: o professor não digita isso a cada reserva.
- A turma precisa **caber** no laboratório (os alunos da turma não podem passar da capacidade).
- O mesmo laboratório não pode ter duas reservas no mesmo dia e turno (**conflito**).
- Se o horário estiver ocupado, o professor pode entrar na **lista de espera**.
- Os laboratórios são espaços físicos da escola: o sistema só **mostra** a lista, não cadastra laboratório novo.

```
   LABORATÓRIO              CAPACIDADE
   Eletrotécnica            20 lugares
   Informática              30 lugares
   Radiologia               15 lugares
   Segurança no trabalho    25 lugares
   Enfermagem               20 lugares
```

**Passo 2: o algoritmo "um professor reserva um laboratório".** Escreva em passos numerados, com SE e ENQUANTO quando precisar:

```
ALGORITMO: reservar um laboratório
 1. Mostrar a lista de professores e pedir que o professor escolha o seu nome.
 2. Mostrar a lista de cursos e pedir que ele escolha um curso.
 3. Mostrar só as turmas desse curso e pedir que ele escolha a turma.
 4. Mostrar a lista de laboratórios e pedir que ele escolha um laboratório.
 5. SE os alunos da turma forem mais que a capacidade do laboratório ENTÃO
 6.     avisar "A turma não cabe neste laboratório" e voltar ao passo 4.
 7. FIM-SE
 8. Pedir o dia (1 = segunda ... 6 = sábado).
 9. Pedir o turno (1 = manhã, 2 = tarde, 3 = noite).
10. SE o dia for sábado E o turno não for a manhã ENTÃO
11.     avisar "No sábado, só o turno da manhã" e voltar ao passo 9.
12. FIM-SE
13. SE o laboratório estiver livre nesse dia e nesse turno ENTÃO
14.     registrar a reserva.
15.     mostrar "Reserva confirmada".
16. SENÃO
17.     perguntar se o professor quer entrar na lista de espera.
18.     SE ele quiser ENTÃO
19.         colocar o professor no fim da lista de espera daquele horário.
20.     FIM-SE
21. FIM-SE
22. Fim.
```

Repare como o algoritmo usa as duas listas do Passo 1: os passos 1 a 4 e 8 a 9 são **os dados que o app pede**; os SE dos passos 5, 10 e 13 são **as regras que aparecem na tela**.

**Passo 3:** copie a lista de requisitos e o algoritmo para o caderno (ou para um arquivo de texto). Na aula 3, eles entram no `README.md` da sua pasta (`alunos/<sua-pasta>/`) no **repositório da turma**, no GitHub.

Antes da aula 3, crie a sua conta no `github.com` e passe o seu **nome de usuário** para o professor. Ele envia um convite para você entrar na organização da turma.

## 1.11 Erros comuns

| Sintoma | Causa |
|---|---|
| Colega seguiu seu algoritmo e fez diferente do esperado | Ambiguidade: algum passo podia ser entendido de dois jeitos |
| Algoritmo "não termina" | Falta o passo final, ou um ENQUANTO nunca deixa de ser verdade |
| Passo impossível de executar ("descubra se o professor está livre") | O passo depende de uma informação que o algoritmo nunca pediu (entrada faltando) |
| Algoritmo certo, resultado errado | A ordem dos passos está trocada (ex.: mostrar o resultado antes de calcular) |
| "Java é interpretado" na prova | Java é compilado para bytecode e executado pela JVM: é híbrido |
| Confundir compilar com executar | Compilar = traduzir; executar = rodar o programa já traduzido |

## 1.12 Exercícios em aula

1. **Escovar os dentes.** Escreva o algoritmo em passos numerados, com no mínimo 8 passos. Troque com um colega: ele conseguiria seguir sem perguntar nada?
2. **Ache a ambiguidade.** Reescreva de forma precisa: "Pegue uns ovos, bata bem e frite um pouco".
3. **Entrada, processamento e saída.** Para cada problema, diga qual é a entrada, o processamento e a saída: (a) calcular a média de duas notas; (b) converter reais para dólares; (c) saber se um número é par.
4. **Sacar dinheiro no caixa eletrônico.** Escreva o algoritmo usando pelo menos um SE (saldo suficiente?) e um ENQUANTO (senha errada).
5. **Classifique.** Para cada item, diga se é linguagem de máquina, simbólica ou de alto nível: `ADD AX, BX`; `media <- (n1 + n2) / 2`; `01001010 11100010`; `console.log("Oi")`.
6. **Compilado ou interpretado?** Explique com suas palavras por que um programa compilado costuma rodar mais rápido, e por que um interpretado roda em mais computadores sem mudar nada.
7. **(Projeto)** Escreva o algoritmo "cadastrar uma turma". As regras são estas: o curso é escolhido de uma lista; o nome da turma é obrigatório (ex.: ADM09); o número de alunos vai de 1 a 60. Use ENQUANTO para pedir de novo quando o dado estiver errado.
8. **(Projeto)** O professor desistiu e quer **ver as reservas dele** antes de reservar. Escreva o algoritmo "listar as reservas de um professor" (dica: para cada reserva da lista, SE o professor for ele, mostrar).

## 1.13 Desafio para a próxima aula

**Cancelar uma reserva e avisar a lista de espera.** Escreva em passos numerados o algoritmo:

1. O professor informa qual reserva quer cancelar (a partir de uma lista numerada das reservas dele).
2. O sistema pede confirmação ("Tem certeza? 1 Sim, 2 Não").
3. SE confirmou, a reserva é removida.
4. Em seguida, o sistema verifica se existe alguém na **lista de espera daquele mesmo laboratório, dia e turno**.
5. SE existir, o **primeiro** da lista assume a reserva e recebe um aviso; ele sai da lista de espera.
6. SENÃO, o horário fica livre.

Use SE, SENÃO e ENQUANTO onde fizer sentido. Use só o que vimos hoje: português e pseudocódigo. Traga no caderno: na aula 2 ele vira fluxograma.

## 1.14 Resumo

- **Instrução** é uma ordem simples; **algoritmo** é uma sequência finita e ordenada de instruções que resolve um problema;
- Um bom algoritmo é **preciso**, **finito**, **ordenado**, **executável** e tem **entrada e saída**;
- **Ambiguidade** é o inimigo: "um pouco" e "a gosto" não servem para o computador;
- Todo programa usa **sequência**, **decisão** (SE) e **repetição** (ENQUANTO);
- Linguagens: **de máquina** (binário), **simbólica** (assembly) e **de alto nível** (Portugol, JavaScript, Java...);
- **Compilação** traduz tudo antes e gera executável; **interpretação** traduz enquanto roda; **execução** é o programa rodando;
- O projeto **Reserva de Laboratórios** começou: requisitos levantados no app real da escola e o algoritmo de reservar um laboratório.
