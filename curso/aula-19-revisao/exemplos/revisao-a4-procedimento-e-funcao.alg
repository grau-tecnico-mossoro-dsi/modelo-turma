algoritmo "Revisao A4 - procedimento e funcao"
// Descubra o que aparece na tela ANTES de rodar no VisualG.
var
   a, b, r: inteiro

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
