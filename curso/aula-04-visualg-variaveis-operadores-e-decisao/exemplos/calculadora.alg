algoritmo "Calculadora com escolha"
// Aula 4: leia, operadores aritméticos, se e escolha/caso.
var
   a, b, resultado: real
   operacao: inteiro
inicio
   escreva("Primeiro número: ")
   leia(a)
   escreva("Segundo número: ")
   leia(b)
   escreval("Operação: 1 Somar | 2 Subtrair | 3 Multiplicar | 4 Dividir")
   leia(operacao)

   escolha operacao
   caso 1
      resultado <- a + b
      escreval("Resultado: ", resultado:8:2)
   caso 2
      resultado <- a - b
      escreval("Resultado: ", resultado:8:2)
   caso 3
      resultado <- a * b
      escreval("Resultado: ", resultado:8:2)
   caso 4
      // divisão por zero não existe: conferir antes de dividir
      se b = 0 entao
         escreval("Não existe divisão por zero.")
      senao
         resultado <- a / b
         escreval("Resultado: ", resultado:8:2)
      fimse
   outrocaso
      escreval("Operação inválida. Escolha de 1 a 4.")
   fimescolha
fimalgoritmo
