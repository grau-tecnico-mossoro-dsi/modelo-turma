algoritmo "Procedimentos e funcoes - classicos"
// Aula 7 - exemplos clássicos: linha, soma(a, b), ehPar(n), maior(a, b, c)
var
   x, y, z: inteiro

// PROCEDIMENTO: faz uma tarefa e não devolve nada
procedimento linha
inicio
   escreval("----------------------------------------")
fimprocedimento

// PROCEDIMENTO com parâmetro: o título muda a cada chamada
procedimento titulo(texto: caractere)
inicio
   linha
   escreval(texto)
   linha
fimprocedimento

// FUNÇÃO: calcula e DEVOLVE um valor com retorne
funcao soma(a, b: inteiro): inteiro
inicio
   retorne a + b
fimfuncao

// FUNÇÃO que devolve logico: responde uma pergunta de sim/não
funcao ehPar(n: inteiro): logico
inicio
   retorne (n mod 2) = 0
fimfuncao

// FUNÇÃO com variável LOCAL (maiorAteAgora só existe aqui dentro)
funcao maior(a, b, c: inteiro): inteiro
var
   maiorAteAgora: inteiro
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

inicio
   titulo("EXEMPLOS DE PROCEDIMENTOS E FUNÇÕES")
   escreva("Primeiro número: ")
   leia(x)
   escreva("Segundo número: ")
   leia(y)
   escreva("Terceiro número: ")
   leia(z)

   linha
   escreval("Soma dos dois primeiros: ", soma(x, y))
   escreval("Soma dos três: ", soma(soma(x, y), z))
   escreval("Maior dos três: ", maior(x, y, z))

   se ehPar(x) entao
      escreval(x, " é par")
   senao
      escreval(x, " é ímpar")
   fimse
   linha
fimalgoritmo
