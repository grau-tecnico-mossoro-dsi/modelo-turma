algoritmo "Revisao A6 - matriz"
// Desenhe a matriz no papel ANTES de rodar no VisualG.
var
   m: vetor[1..2, 1..3] de caractere
   l, c, ocupados: inteiro
   percentual: real
inicio
   ocupados <- 0
   para l de 1 ate 2 faca
      para c de 1 ate 3 faca
         se (l + c) mod 2 = 0 entao
            m[l, c] <- "X"
            ocupados <- ocupados + 1
         senao
            m[l, c] <- ""
         fimse
      fimpara
   fimpara
   percentual <- ocupados / 6 * 100
   escreval("Ocupados: ", ocupados, " (", percentual:5:1, "%)")
fimalgoritmo
