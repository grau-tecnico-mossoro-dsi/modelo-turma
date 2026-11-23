algoritmo "Maior de tres numeros"
// Aula 4: operadores relacionais, operador lógico e, se/senao aninhados.
var
   a, b, c, maior: inteiro
inicio
   escreva("Primeiro número: ")
   leia(a)
   escreva("Segundo número: ")
   leia(b)
   escreva("Terceiro número: ")
   leia(c)

   se (a >= b) e (a >= c) entao
      maior <- a
   senao
      se b >= c entao
         maior <- b
      senao
         maior <- c
      fimse
   fimse

   escreval("O maior é ", maior)
fimalgoritmo
