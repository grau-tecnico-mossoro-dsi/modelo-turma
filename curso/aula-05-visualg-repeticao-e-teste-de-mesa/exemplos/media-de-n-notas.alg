algoritmo "Media de N notas"
// Aula 5: para (número de voltas conhecido), acumulador e
// validação com repita...ate dentro do para.
var
   quantidade, i: inteiro
   nota, soma, media: real
inicio
   repita
      escreva("Quantas notas? ")
      leia(quantidade)
      se quantidade < 1 entao
         escreval("Informe pelo menos 1 nota.")
      fimse
   ate quantidade >= 1

   soma <- 0
   para i de 1 ate quantidade faca
      repita
         escreva("Nota ", i, " (0 a 10): ")
         leia(nota)
         se (nota < 0) ou (nota > 10) entao
            escreval("Nota inválida. Digite de 0 a 10.")
         fimse
      ate (nota >= 0) e (nota <= 10)
      soma <- soma + nota
   fimpara

   media <- soma / quantidade
   escreval("Média: ", media:5:2)
fimalgoritmo
