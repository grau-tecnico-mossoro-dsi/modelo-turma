algoritmo "Revisao A1 - teste de mesa com para"
// Faça o teste de mesa no papel ANTES de rodar no VisualG.
var
   i, s: inteiro
inicio
   s <- 0
   para i de 1 ate 5 faca
      se i mod 2 = 1 entao
         s <- s + i
      senao
         s <- s - 1
      fimse
   fimpara
   escreval(s)
fimalgoritmo
