algoritmo "Reserva de Laboratorios - aula 4"
// Projeto da disciplina, versão da aula 4.
// Cadastro de UMA turma com as regras + uma reserva simples.
// Ainda sem repetição: um dado inválido mostra um aviso e o programa
// termina. Na aula 5, o repita...ate passa a perguntar de novo.
//
// Horários: Manhã 08h-12h | Tarde 13h30-17h30 | Noite 18h30-22h30
// Dias: 1 Segunda ... 6 Sábado. No sábado, só o turno da manhã.
var
   nomeTurma, nomeLab, nomeDoTurno: caractere
   alunos, laboratorio, capacidade, vagas, dia, turno: inteiro
   cadastroValido, reservaValida: logico
inicio
   // ---------- CADASTRO DE UMA TURMA ----------
   escreval("=== CADASTRO DE TURMA ===")
   escreva("Nome da turma (ex.: ADM09): ")
   leia(nomeTurma)
   escreva("Número de alunos (1 a 60): ")
   leia(alunos)

   cadastroValido <- verdadeiro

   // regra: nome obrigatório
   se nomeTurma = "" entao
      escreval("Aviso: o nome da turma é obrigatório.")
      cadastroValido <- falso
   fimse

   // regra: a turma tem de 1 a 60 alunos
   se (alunos < 1) ou (alunos > 60) entao
      escreval("Aviso: o número de alunos deve ser de 1 a 60.")
      cadastroValido <- falso
   fimse

   se cadastroValido entao
      escreval("Turma cadastrada: ", nomeTurma, " - ", alunos, " alunos")

      // ---------- RESERVA SIMPLES ----------
      escreval("")
      escreval("=== NOVA RESERVA ===")
      escreval("Laboratório:")
      escreval("1 Eletrotécnica (20) | 2 Informática (30) | 3 Radiologia (15)")
      escreval("4 Segurança no trabalho (25) | 5 Enfermagem (20)")
      leia(laboratorio)
      escreval("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb")
      leia(dia)
      escreval("Turno: 1 Manhã | 2 Tarde | 3 Noite")
      leia(turno)

      reservaValida <- verdadeiro

      // os laboratórios são fixos (os mesmos de dados/laboratorios.csv)
      escolha laboratorio
      caso 1
         nomeLab <- "Eletrotécnica"
         capacidade <- 20
      caso 2
         nomeLab <- "Informática"
         capacidade <- 30
      caso 3
         nomeLab <- "Radiologia"
         capacidade <- 15
      caso 4
         nomeLab <- "Segurança no trabalho"
         capacidade <- 25
      caso 5
         nomeLab <- "Enfermagem"
         capacidade <- 20
      outrocaso
         escreval("Laboratório inválido. Escolha de 1 a 5.")
         reservaValida <- falso
      fimescolha

      // regra: a turma precisa caber no laboratório
      // (só confere se o laboratório escolhido existe)
      se reservaValida entao
         se alunos > capacidade entao
            escreval("A turma não cabe: ", alunos, " alunos para ", capacidade, " lugares.")
            reservaValida <- falso
         fimse
      fimse

      // regra: dias de 1 (segunda) a 6 (sábado)
      se (dia < 1) ou (dia > 6) entao
         escreval("Dia inválido. Escolha de 1 a 6.")
         reservaValida <- falso
      fimse

      // o turno inteiro, com o horário
      escolha turno
      caso 1
         nomeDoTurno <- "Manhã, 08h às 12h"
      caso 2
         nomeDoTurno <- "Tarde, 13h30 às 17h30"
      caso 3
         nomeDoTurno <- "Noite, 18h30 às 22h30"
      outrocaso
         escreval("Turno inválido. Escolha de 1 a 3.")
         reservaValida <- falso
      fimescolha

      // regra: no sábado (dia 6), só o turno da manhã (turno 1)
      se (dia = 6) e (turno <> 1) entao
         escreval("No sábado, só o turno da manhã.")
         reservaValida <- falso
      fimse

      se reservaValida entao
         vagas <- capacidade - alunos
         escreval("Reserva confirmada!")
         escreval("Turma ", nomeTurma, " - ", nomeLab, " - dia ", dia, " - ", nomeDoTurno)
         escreval("Lugares que sobram: ", vagas)
      senao
         escreval("Reserva recusada.")
      fimse
   senao
      escreval("Cadastro recusado. Execute o programa de novo.")
   fimse
fimalgoritmo
