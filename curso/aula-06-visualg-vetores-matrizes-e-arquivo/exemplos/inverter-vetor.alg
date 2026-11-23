algoritmo "Inverter um vetor"
// Aula 6 - duas formas: mostrar de trás para frente e inverter de verdade
var
   valores: vetor[1..6] de inteiro
   i, auxiliar: inteiro
inicio
   para i de 1 ate 6 faca
      escreva("Valor ", i, ": ")
      leia(valores[i])
   fimpara

   // Forma 1: só MOSTRAR ao contrário (o vetor não muda)
   escreval("De trás para frente:")
   para i de 6 ate 1 passo -1 faca
      escreva(valores[i], " ")
   fimpara
   escreval("")

   // Forma 2: INVERTER o vetor, trocando o 1º com o último, o 2º com o penúltimo...
   // Só vai até a metade (6 \ 2 = 3); se fosse até o fim, destrocaria tudo.
   para i de 1 ate 3 faca
      auxiliar <- valores[i]
      valores[i] <- valores[6 - i + 1]
      valores[6 - i + 1] <- auxiliar
   fimpara

   escreval("Vetor invertido:")
   para i de 1 ate 6 faca
      escreva(valores[i], " ")
   fimpara
   escreval("")
fimalgoritmo
