algoritmo "Matriz de notas"
// Aula 6 - matriz: 3 alunos (linhas) x 4 bimestres (colunas)
var
   alunos: vetor[1..3] de caractere
   notas: vetor[1..3, 1..4] de real
   linha, coluna: inteiro
   soma, media: real
inicio
   // leitura: para cada aluno (linha), as 4 notas (colunas)
   para linha de 1 ate 3 faca
      escreva("Nome do aluno ", linha, ": ")
      leia(alunos[linha])
      para coluna de 1 ate 4 faca
         escreva("Nota do ", coluna, "º bimestre: ")
         leia(notas[linha, coluna])
      fimpara
   fimpara

   // média de cada aluno = soma da LINHA / 4
   escreval("------ BOLETIM ------")
   para linha de 1 ate 3 faca
      soma <- 0
      para coluna de 1 ate 4 faca
         soma <- soma + notas[linha, coluna]
      fimpara
      media <- soma / 4
      escreva(alunos[linha], ": média ", media:4:1)
      se media >= 7 entao
         escreval(" - aprovado")
      senao
         escreval(" - recuperação")
      fimse
   fimpara

   // média da turma no 1º bimestre = soma da COLUNA 1 / 3
   soma <- 0
   para linha de 1 ate 3 faca
      soma <- soma + notas[linha, 1]
   fimpara
   media <- soma / 3
   escreval("Média da turma no 1º bimestre: ", media:4:1)
fimalgoritmo
