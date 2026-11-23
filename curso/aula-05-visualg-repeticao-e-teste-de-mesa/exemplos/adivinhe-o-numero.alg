algoritmo "Adivinhe o numero"
// Aula 5: repita...ate, contador e decisão dentro do laço.
// O número secreto está fixo no código. Troque o valor de segredo
// e peça a um colega para jogar.
var
   segredo, palpite, tentativas: inteiro
inicio
   segredo <- 37
   tentativas <- 0
   escreval("Pensei em um número de 1 a 100. Tente adivinhar!")

   repita
      escreva("Seu palpite: ")
      leia(palpite)
      tentativas <- tentativas + 1
      se palpite > segredo entao
         escreval("Muito alto.")
      fimse
      se palpite < segredo entao
         escreval("Muito baixo.")
      fimse
   ate palpite = segredo

   escreval("Acertou em ", tentativas, " tentativa(s)!")
fimalgoritmo
