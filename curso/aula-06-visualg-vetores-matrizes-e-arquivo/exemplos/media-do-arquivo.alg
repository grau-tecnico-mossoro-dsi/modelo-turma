algoritmo "Media lida de um arquivo"
// Aula 6 - comando arquivo: o leia passa a buscar os valores num .txt
// CONFERIR na versão do VisualG do laboratório:
//   - em que linha o comando precisa ficar (aqui: logo depois do cabeçalho);
//   - em que pasta o VisualG procura o notas.txt (teste na pasta do .alg).
// O notas.txt tem um valor por linha (veja exemplos/notas.txt).
arquivo "notas.txt"
var
   notas: vetor[1..4] de real
   i: inteiro
   soma, media: real
inicio
   soma <- 0
   para i de 1 ate 4 faca
      leia(notas[i])
      soma <- soma + notas[i]
   fimpara
   media <- soma / 4
   escreval("Média: ", media:4:1)
fimalgoritmo
