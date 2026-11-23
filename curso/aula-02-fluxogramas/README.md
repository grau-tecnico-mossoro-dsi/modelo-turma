**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-01-algoritmos-e-linguagens/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-03-terminal-git-e-github/README.md)

---

# AULA 2 — Fluxogramas (diagrama de blocos)

## Objetivos da aula

- Conhecer os **símbolos** do fluxograma: início/fim, entrada, processo, decisão, saída e conector;
- Desenhar fluxos **sequenciais**, **com decisão** e **com repetição** (a seta que volta);
- Transformar um algoritmo em português em fluxograma, e um fluxograma em pseudocódigo;
- Conferir um fluxograma: toda decisão tem duas saídas e todo caminho chega ao fim;
- Desenhar os fluxogramas da **reserva** e do **menu** do projeto.

## 2.1 O problema: texto demais, visão de menos

Na aula 1 você escreveu o algoritmo "reservar um laboratório" com 22 passos e vários SE. Agora responda rápido: **quantos caminhos diferentes** existem nesse algoritmo? Em texto é difícil enxergar. Em desenho fica óbvio.

O **fluxograma** (também chamado de **diagrama de blocos**) é o algoritmo desenhado. Cada tipo de passo tem um formato, e setas mostram a ordem. Ele serve para:

- **enxergar** os caminhos (o que acontece se sim? e se não?);
- **conversar** com quem não programa (o coordenador entende um desenho, não um código);
- **achar erros** antes de digitar qualquer coisa.

## 2.2 Os símbolos

No papel, cada símbolo tem um formato. No texto desta apostila, desenhamos assim:

```
   DESENHO NA APOSTILA        NOME            FORMATO NO PAPEL     USO
   ─────────────────────      ────────────    ─────────────────    ──────────────────────────
   (  INÍCIO  )               Terminal        oval                 começo e fim
   / leia A /                 Entrada         paralelogramo        dado que entra (digitado)
   [ SOMA <- A + B ]          Processo        retângulo            cálculo ou atribuição
   < A > B ? >                Decisão         losango              pergunta de sim ou não
   { escreva SOMA }           Saída           "tela" (lado curvo)  resultado mostrado
       (A)                    Conector        círculo pequeno      liga partes do desenho
   ───►  │  ▼                 Seta            seta                 ordem de execução
```

Desenhe no caderno com estes formatos:

```
    ╭──────────╮        ╱─────────╱        ┌──────────┐          ╱╲
    │  INÍCIO  │       ╱ leia A  ╱         │ SOMA<-A+B│        ╱    ╲         ( A )
    ╰──────────╯      ╱─────────╱          └──────────┘       ╱ A>B? ╲
      terminal          entrada              processo         ╲      ╱       conector
                                                               ╲    ╱
                                                                 ╲╱
                                                               decisão
```

Observação: muitos livros usam o **paralelogramo** tanto para entrada quanto para saída. Os dois jeitos aparecem em prova. Nesta disciplina usamos o paralelogramo para entrada e o símbolo de "tela" para saída, para ficar claro o que entra e o que sai.

## 2.3 Fluxo sequencial: somar dois números

O algoritmo da aula 1, desenhado. Um passo depois do outro, de cima para baixo, sem desvios:

```
                 (  INÍCIO  )
                      │
                      ▼
                  / leia A /
                      │
                      ▼
                  / leia B /
                      │
                      ▼
               [ SOMA <- A + B ]
                      │
                      ▼
               { escreva SOMA }
                      │
                      ▼
                  (  FIM  )
```

Um fluxograma sempre tem **um início** e pelo menos **um fim**. As setas nunca ficam "soltas": toda seta sai de um símbolo e chega em outro.

## 2.4 Fluxo com decisão: maior de dois números

A **decisão** (losango) faz uma pergunta que só tem duas respostas: **sim** ou **não** (ou V e F). Cada resposta é uma seta, e cada seta leva a um caminho diferente.

```
                 (  INÍCIO  )
                      │
                      ▼
                / leia A, B /
                      │
                      ▼
                  < A > B ? >
                 │          │
                sim        não
                 │          │
                 ▼          ▼
       { escreva A }    { escreva B }
                 │          │
                 └────┬─────┘
                      ▼
                  (  FIM  )
```

Os dois caminhos se **juntam** de novo antes do fim. E se A for igual a B? O algoritmo mostra B, o que está correto (os dois são o maior). Fazer essa pergunta, "e se forem iguais?", é o hábito que separa um algoritmo bom de um que funciona "quase sempre".

**Par ou ímpar.** Um número é par quando o **resto** da divisão por 2 é zero. No pseudocódigo, o resto se escreve `mod`: `7 mod 2` é 1; `8 mod 2` é 0.

```
                 (  INÍCIO  )
                      │
                      ▼
                  / leia N /
                      │
                      ▼
               < N mod 2 = 0 ? >
                 │          │
                sim        não
                 │          │
                 ▼          ▼
     { escreva "Par" }  { escreva "Ímpar" }
                 │          │
                 └────┬─────┘
                      ▼
                  (  FIM  )
```

## 2.5 Decisão dentro de decisão: aprovado, recuperação ou reprovado

Quando há mais de duas respostas, colocamos um losango **dentro** do caminho de outro. Regra da escola fictícia: média 7 ou mais = aprovado; de 5 a 6,9 = recuperação; abaixo de 5 = reprovado.

```
                     (  INÍCIO  )
                          │
                          ▼
                  / leia N1, N2 /
                          │
                          ▼
              [ MEDIA <- (N1 + N2) / 2 ]
                          │
                          ▼
                   < MEDIA >= 7 ? >
                    │            │
                   sim          não
                    │            │
                    ▼            ▼
         { "Aprovado" }    < MEDIA >= 5 ? >
                    │        │           │
                    │       sim         não
                    │        │           │
                    │        ▼           ▼
                    │  { "Recuperação" } { "Reprovado" }
                    │        │           │
                    └────────┴─────┬─────┘
                                   ▼
                               (  FIM  )
```

Repare: o segundo losango só pergunta `MEDIA >= 5`, e não "MEDIA >= 5 e MEDIA < 7". Se o fluxo chegou ali, já se sabe que a média é menor que 7 (a primeira pergunta respondeu "não"). Aproveitar o que já se sabe deixa o algoritmo mais simples.

## 2.6 Fluxo com repetição: a seta que volta

Uma **repetição** aparece como uma seta que **volta para cima**, até um ponto anterior do desenho. Algoritmo: somar números até o usuário digitar 0.

```
                     (  INÍCIO  )
                          │
                          ▼
                    [ SOMA <- 0 ]
                          │
                          ▼
                     / leia N /  ◄──────────────────┐
                          │                         │
                          ▼                         │
                     < N = 0 ? > ── não ──► [ SOMA <- SOMA + N ]
                          │
                         sim
                          │
                          ▼
                  { escreva SOMA }
                          │
                          ▼
                      (  FIM  )
```

Leia em voz alta: "a soma começa em zero; lê um número; se não for zero, soma e volta a ler; se for zero, mostra a soma e termina". O 0 é chamado de **valor de parada** (ou sentinela): um valor que avisa "acabou".

Duas lições importantes:

- A soma começa em **0** antes do laço. Se começasse em qualquer outro valor, o resultado sairia errado.
- **Dentro** do laço existe um passo (`leia N`) que pode mudar a resposta do losango. Se nada dentro do laço muda a pergunta, a repetição nunca termina: é o **laço infinito**.

## 2.7 O conector: quando o desenho não cabe

O **conector** é um círculo com uma letra. Ele diz: "o fluxo continua no outro círculo com a mesma letra". Serve para não cruzar setas ou para continuar o desenho em outra parte da folha.

```
     ...                                   ( A )
      │                                      │
      ▼                                      ▼
   [ SOMA <- A + B ]                   { escreva SOMA }
      │                                      │
      ▼                                      ▼
    ( A )      → continua lá ──►          (  FIM  )
```

## 2.8 Do fluxograma ao pseudocódigo

Cada símbolo vira uma linha de pseudocódigo. A tradução é direta:

| Símbolo | Pseudocódigo (estilo VisualG, aula 4) |
|---|---|
| `( INÍCIO )` / `( FIM )` | `inicio` / `fimalgoritmo` |
| `/ leia A /` | `leia(A)` |
| `[ SOMA <- A + B ]` | `SOMA <- A + B` |
| `{ escreva SOMA }` | `escreval(SOMA)` |
| Losango com sim e não | `se ... entao ... senao ... fimse` |
| Seta que volta | `enquanto ... faca ... fimenquanto` ou `repita ... ate ...` |

O maior de dois números, traduzido (você vai digitar isso no VisualG na aula 4):

```
inicio
   leia(A)
   leia(B)
   se A > B entao
      escreval(A)
   senao
      escreval(B)
   fimse
fimalgoritmo
```

## 2.9 Regras de ouro para conferir um fluxograma

Antes de entregar qualquer fluxograma, confira:

1. Tem **um início** e todos os caminhos chegam a um **fim**.
2. Todo losango tem **exatamente duas saídas**, com **sim** e **não** escritos nas setas.
3. Nenhuma seta fica solta; nenhuma seta sai de um terminal FIM.
4. Toda repetição tem um passo **dentro** dela que pode mudar a condição.
5. Os nomes são sempre os mesmos: se você começou com `SOMA`, não troque para `TOTAL` no meio.
6. Siga o desenho com o dedo, com valores de exemplo, e veja se o resultado sai certo.

## 2.10 Projeto da disciplina: o que fazemos hoje

Hoje o algoritmo da aula 1 vira desenho. Faça os fluxogramas **à mão**, no caderno ou numa folha, com caneta: na aula 3 você vai **fotografar** e colocar na sua pasta do repositório da turma, no GitHub.

**Fluxograma 1: a reserva.** Quatro perguntas: é sábado à tarde ou à noite? A turma cabe no laboratório? O horário está livre? Se não está, o professor quer entrar na lista de espera?

```
                           (  INÍCIO  )
                                 │
                                 ▼
                / leia professor, curso, turma /
                                 │
                                 ▼
                       / leia laboratório /  ◄──────────────────┐
                                 │                              │
                                 ▼                              │
                  < alunos <= capacidade ? > ── não ──► { "A turma não cabe" }
                                 │
                                sim
                                 │
                                 ▼
                        / leia dia, turno /  ◄───────────────────────┐
                                 │                                   │
                                 ▼                                   │
                < dia = 6 e turno <> 1 ? > ── sim ──► { "Sábado, só de manhã" }
                                 │
                                não
                                 │
                                 ▼
                       < horário livre ? >
                        │                │
                       sim              não
                        │                │
                        ▼                ▼
             [ registrar reserva ]   { "Horário ocupado" }
                        │                │
                        ▼                ▼
          { "Reserva confirmada" }  / leia quer esperar? /
                        │                │
                        │                ▼
                        │       < quer esperar ? >
                        │         │            │
                        │        sim          não
                        │         │            │
                        │         ▼            │
                        │  [ entrar no fim     │
                        │    da lista de       │
                        │    espera ]          │
                        │         │            │
                        └─────────┴─────┬──────┘
                                        ▼
                                    (  FIM  )
```

Repare que **alunos** não é lido: o número de alunos já está guardado na turma escolhida. E "horário livre?" quer dizer: nenhuma reserva **do mesmo laboratório, no mesmo dia e no mesmo turno**.

**Fluxograma 2: o menu principal.** O menu aparece de novo depois de cada opção e só termina quando o usuário escolhe **Sair**. Opção que não existe mostra um aviso e o menu volta.

```
                          (  INÍCIO  )
                                │
                                ▼
         { 1 Cadastrar  2 Listar  3 Reservar  4 Sair }  ◄─────────────┐
                                │                                     │
                                ▼                                     │
                         / leia opcao /                               │
                                │                                     │
                                ▼                                     │
                         < opcao = 1 ? > ── sim ─► [ cadastrar ] ─────┤
                                │                                     │
                               não                                    │
                                ▼                                     │
                         < opcao = 2 ? > ── sim ─► [ listar ] ────────┤
                                │                                     │
                               não                                    │
                                ▼                                     │
                         < opcao = 3 ? > ── sim ─► [ reservar ] ──────┤
                                │                                     │
                               não                                    │
                                ▼                                     │
                         < opcao = 4 ? > ── não ─► { "Opção inválida"}┘
                                │
                               sim
                                ▼
                         { "Até logo!" }
                                │
                                ▼
                            (  FIM  )
```

Repare que "cadastrar", "listar" e "reservar" aparecem como um retângulo só. Cada um deles tem o **seu próprio fluxograma** (o da reserva é o Fluxograma 1). Dividir um problema grande em partes menores é uma ideia que volta na aula 7 (procedimentos e funções).

**Fluxograma 3: o cadastro.** Desenhe você mesmo, a partir do algoritmo "cadastrar uma turma" da aula 1 (é o exercício 7).

Ao terminar, tire uma **foto nítida** de cada fluxograma, com boa luz e sem cortar as bordas. Guarde as fotos: na aula 3, elas sobem para a sua pasta (`alunos/<sua-pasta>/fluxogramas/`) no repositório da turma.

## 2.11 Erros comuns

| Sintoma | Causa |
|---|---|
| Losango com uma seta só | Decisão tem sempre **duas** saídas, rotuladas com sim e não |
| Setas sem "sim" e "não" | Quem lê não sabe qual caminho é qual |
| Um caminho não chega ao FIM | O algoritmo não é finito; siga cada caminho com o dedo |
| Repetição que nunca termina | Nada dentro do laço muda a resposta do losango |
| Soma começa com lixo | Esqueceu o `[ SOMA <- 0 ]` antes do laço |
| Pergunta "aberta" no losango ("qual o turno?") | Losango é sim ou não; "qual o turno?" é uma **entrada** (paralelogramo) seguida de decisões |
| Entrada e processo misturados ("leia A e some com B") | Um símbolo para cada passo |

## 2.12 Exercícios em aula

1. **Dobro.** Desenhe o fluxograma que lê um número e mostra o dobro dele.
2. **Maior de idade.** Leia a idade de uma pessoa e mostre "Maior de idade" (18 ou mais) ou "Menor de idade".
3. **Maior de três.** Leia três números e mostre o maior. Use decisões dentro de decisões. Teste com 5, 9, 2 e com 7, 7, 3.
4. **Contagem regressiva.** Leia um número N e mostre N, N−1, ... até 1. Use a seta que volta (dica: `[ N <- N - 1 ]` dentro do laço).
5. **Média com parada.** Leia notas até o usuário digitar −1 e mostre a média. Você vai precisar de **duas** variáveis que começam em 0: uma soma e uma contagem de notas.
6. **Traduza.** Escreva em pseudocódigo (como na seção 2.8) o fluxograma do par ou ímpar.
7. **(Projeto)** Desenhe o fluxograma do **cadastro de turma** da aula 1: curso escolhido da lista (repete enquanto o número não está na lista), nome obrigatório (repete enquanto vazio), alunos de 1 a 60 (repete enquanto inválido).
8. **(Projeto)** No Fluxograma 1, acrescente uma pergunta antes de tudo: "o laboratório escolhido existe na lista?". Se não existir, avisar e pedir de novo.

## 2.13 Desafio para a próxima aula

**Excluir um curso.** Um curso que tem turmas **não pode** ser excluído: se o curso Administração sumisse, as turmas ADM09, ADM10... ficariam sem curso. Se o curso não tem turma, o sistema pede confirmação antes de excluir.

Desenhe o fluxograma de "excluir curso":

```
   entradas: o curso escolhido numa lista numerada
             a resposta da confirmação (1 Sim, 2 Não)
   saídas:   "Curso com turma: não pode excluir"
             "Curso excluído"  ou  "Exclusão cancelada"
```

Faça também o "teste do dedo" para estes 3 casos e escreva a resposta ao lado:

| Curso escolhido | Tem turma? | Confirmação | Resposta esperada |
|---|---|---|---|
| ADM - Administração | sim (ADM09, ADM10...) | — | ? |
| BCV - BCV | não | 1 Sim | ? |
| BCV - BCV | não | 2 Não | ? |

Traga desenhado no caderno e fotografado: na aula 3 ele também vai para a sua pasta no repositório da turma.

## 2.14 Resumo

- Fluxograma = algoritmo desenhado: **terminal** (início/fim), **entrada**, **processo**, **decisão**, **saída** e **conector**, ligados por **setas**;
- Fluxo **sequencial**: um passo depois do outro; com **decisão**: losango com duas saídas (sim/não); com **repetição**: seta que volta;
- Decisão dentro de decisão resolve problemas com mais de duas respostas;
- Toda repetição precisa de um passo que muda a condição, senão é laço infinito;
- Cada símbolo vira uma linha de pseudocódigo: `leia`, `<-`, `escreval`, `se`, `enquanto`;
- No projeto: fluxogramas da **reserva** e do **menu**, desenhados à mão e fotografados.
