algoritmo "Maior de 10 numeros"
// Aula 6 - vetor: guardar 10 valores e achar o maior (e a posição dele)
var
   numeros: vetor[1..10] de inteiro
   i, maior, posicaoDoMaior: inteiro
inicio
   // 1) ler os 10 números, um em cada posição do vetor
   para i de 1 ate 10 faca
      escreva("Digite o número ", i, ": ")
      leia(numeros[i])
   fimpara

   // 2) chute inicial: o primeiro número é o maior (até aparecer outro)
   maior <- numeros[1]
   posicaoDoMaior <- 1
   para i de 2 ate 10 faca
      se numeros[i] > maior entao
         maior <- numeros[i]
         posicaoDoMaior <- i
      fimse
   fimpara

   escreval("Maior número: ", maior, " (posição ", posicaoDoMaior, ")")
fimalgoritmo
