algoritmo "Reserva de Laboratorios - aula 5"
// Projeto da disciplina, versão da aula 5.
// - Menu principal validado (regras do desafioCadastro): só aceita as
//   opções do menu, sem 0 ou negativo; opção inválida mostra o menu de novo.
// - Cadastro de turma, laboratório, dia e turno perguntam de novo até o
//   dado ser válido.
// - Várias reservas seguidas: contadores de reservas aceitas e recusadas.
// Ainda com UMA turma por vez e sem conferir conflito de horário
// (isso chega na aula 6, com vetores e matriz).
//
// Horários: Manhã 08h-12h | Tarde 13h30-17h30 | Noite 18h30-22h30
// Dias: 1 Segunda ... 6 Sábado. No sábado, só o turno da manhã.
var
   nomeTurma, nomeLab, nomeDoTurno: caractere
   opcao, alunos, laboratorio, capacidade, dia, turno: inteiro
   aceitas, recusadas: inteiro
inicio
   // turma inicial (a mesma de dados/turmas.csv; a opção 1 troca a turma)
   nomeTurma <- "ADM09"
   alunos <- 28

   aceitas <- 0
   recusadas <- 0

   repita
      // ---------- MENU VALIDADO ----------
      repita
         escreval("")
         escreval("===== RESERVA DE LABORATÓRIOS =====")
         escreval("Turma atual: ", nomeTurma, " (", alunos, " alunos)")
         escreval("1 - Cadastrar turma")
         escreval("2 - Nova reserva")
         escreval("3 - Resumo da semana")
         escreval("4 - Sair")
         escreva("Opção: ")
         leia(opcao)
         se (opcao < 1) ou (opcao > 4) entao
            escreval("Opção inválida. Escolha de 1 a 4.")
         fimse
      ate (opcao >= 1) e (opcao <= 4)

      escolha opcao
      caso 1
         // ---------- CADASTRO DE TURMA COM AS REGRAS ----------
         repita
            escreva("Nome da turma (ex.: ADM09): ")
            leia(nomeTurma)
            se nomeTurma = "" entao
               escreval("O nome da turma é obrigatório.")
            fimse
         ate nomeTurma <> ""

         repita
            escreva("Número de alunos (1 a 60): ")
            leia(alunos)
            se (alunos < 1) ou (alunos > 60) entao
               escreval("O número de alunos deve ser de 1 a 60.")
            fimse
         ate (alunos >= 1) e (alunos <= 60)

         escreval("Turma cadastrada: ", nomeTurma, " - ", alunos, " alunos")

      caso 2
         // ---------- NOVA RESERVA ----------
         repita
            escreval("Laboratório:")
            escreval("1 Eletrotécnica (20) | 2 Informática (30) | 3 Radiologia (15)")
            escreval("4 Segurança no trabalho (25) | 5 Enfermagem (20)")
            leia(laboratorio)
            se (laboratorio < 1) ou (laboratorio > 5) entao
               escreval("Laboratório inválido. Escolha de 1 a 5.")
            fimse
         ate (laboratorio >= 1) e (laboratorio <= 5)

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
         outrocaso
            nomeLab <- "Enfermagem"
            capacidade <- 20
         fimescolha

         repita
            escreval("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb")
            leia(dia)
            se (dia < 1) ou (dia > 6) entao
               escreval("Dia inválido. Escolha de 1 a 6.")
            fimse
         ate (dia >= 1) e (dia <= 6)

         repita
            escreval("Turno: 1 Manhã | 2 Tarde | 3 Noite")
            leia(turno)
            se (turno < 1) ou (turno > 3) entao
               escreval("Turno inválido. Escolha de 1 a 3.")
            fimse
         ate (turno >= 1) e (turno <= 3)

         escolha turno
         caso 1
            nomeDoTurno <- "Manhã, 08h às 12h"
         caso 2
            nomeDoTurno <- "Tarde, 13h30 às 17h30"
         outrocaso
            nomeDoTurno <- "Noite, 18h30 às 22h30"
         fimescolha

         // regras: sábado só de manhã; a turma precisa caber.
         // Uma reserva que quebra uma regra é RECUSADA (não pergunta de novo).
         se (dia = 6) e (turno <> 1) entao
            escreval("Recusada: no sábado, só o turno da manhã.")
            recusadas <- recusadas + 1
         senao
            se alunos > capacidade entao
               escreval("Recusada: a turma não cabe (", alunos, " alunos para ", capacidade, " lugares).")
               recusadas <- recusadas + 1
            senao
               aceitas <- aceitas + 1
               escreval("Reserva ", aceitas, " aceita: ", nomeTurma, " - ", nomeLab, " - dia ", dia, " - ", nomeDoTurno)
               escreval("Lugares que sobram: ", capacidade - alunos)
            fimse
         fimse

      caso 3
         // ---------- RESUMO ----------
         escreval("Reservas aceitas: ", aceitas)
         escreval("Reservas recusadas: ", recusadas)
         escreval("Pedidos de reserva: ", aceitas + recusadas)
      fimescolha
   ate opcao = 4

   escreval("Até logo!")
fimalgoritmo
