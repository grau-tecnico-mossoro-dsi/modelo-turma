algoritmo "Reserva de Laboratorios - CP2"
// =====================================================================
// Projeto da disciplina - versão do CHECKPOINT 2 (aula 6)
//   [AULA 5] menu validado com repita...ate
//   [AULA 6] laboratórios em vetores paralelos (nomes, capacidades)
//   [AULA 6] turmas em vetores paralelos (nomes, alunos)
//   [AULA 6] grade da semana em matriz: 6 dias x 3 turnos
// Ainda sem procedimentos e funções (aula 7): por isso o mesmo
// "repita ... ate" de validação aparece várias vezes.
//
// Simplificação: a grade é só de UM laboratório, o de Informática
// (posição 2). Os laboratórios são espaços físicos: não têm cadastro.
//
// Horários: Manhã 08h-12h | Tarde 13h30-17h30 | Noite 18h30-22h30
// Dias: 1 Segunda ... 6 Sábado. No sábado, só o turno da manhã.
// =====================================================================
var
   nomesLabs: vetor[1..5] de caractere
   capacidades: vetor[1..5] de inteiro
   nomesTurmas: vetor[1..20] de caractere
   alunosTurmas: vetor[1..20] de inteiro
   grade: vetor[1..6, 1..3] de caractere
   quantidadeTurmas, opcao, i, d, t: inteiro
   dia, turno, escolhida, minimo, encontrados, ocupados: inteiro
   percentual: real
inicio
   // ---------- dados iniciais (os mesmos de dados/laboratorios.csv) ----------
   nomesLabs[1] <- "Eletrotécnica"
   capacidades[1] <- 20
   nomesLabs[2] <- "Informática"
   capacidades[2] <- 30
   nomesLabs[3] <- "Radiologia"
   capacidades[3] <- 15
   nomesLabs[4] <- "Segurança no trabalho"
   capacidades[4] <- 25
   nomesLabs[5] <- "Enfermagem"
   capacidades[5] <- 20

   quantidadeTurmas <- 2
   nomesTurmas[1] <- "ADM09"
   alunosTurmas[1] <- 28
   nomesTurmas[2] <- "DSI02"
   alunosTurmas[2] <- 24

   // grade vazia: "" significa horário livre
   para d de 1 ate 6 faca
      para t de 1 ate 3 faca
         grade[d, t] <- ""
      fimpara
   fimpara

   // ---------- menu principal ----------
   repita
      escreval("----------------------------------------------")
      escreval("RESERVA DE LABORATÓRIOS")
      escreval("1 - Listar laboratórios")
      escreval("2 - Buscar laboratório por capacidade mínima")
      escreval("3 - Cadastrar turma")
      escreval("4 - Listar turmas")
      escreval("5 - Reservar o laboratório de ", nomesLabs[2])
      escreval("6 - Ver grade da semana")
      escreval("7 - Ocupação da semana")
      escreval("8 - Sair")
      repita
         leia(opcao)
         se (opcao < 1) ou (opcao > 8) entao
            escreval("Opção inválida. Escolha de 1 a 8.")
         fimse
      ate (opcao >= 1) e (opcao <= 8)

      escolha opcao
      caso 1
         // LISTAR: lista numerada (é por ela que o usuário escolhe depois)
         para i de 1 ate 5 faca
            escreval(i, ". ", nomesLabs[i], " - ", capacidades[i], " lugares")
         fimpara

      caso 2
         // BUSCAR: busca linear, olhando posição por posição
         escreval("Quantos lugares você precisa?")
         leia(minimo)
         encontrados <- 0
         para i de 1 ate 5 faca
            se capacidades[i] >= minimo entao
               escreval(i, ". ", nomesLabs[i], " - ", capacidades[i], " lugares")
               encontrados <- encontrados + 1
            fimse
         fimpara
         se encontrados = 0 entao
            escreval("Nenhum laboratório com ", minimo, " lugares ou mais.")
         fimse

      caso 3
         // CADASTRAR TURMA: a nova turma entra na próxima posição livre
         se quantidadeTurmas = 20 entao
            escreval("Limite de 20 turmas atingido.")
         senao
            quantidadeTurmas <- quantidadeTurmas + 1
            repita
               escreval("Nome da turma (ex.: ADM09):")
               leia(nomesTurmas[quantidadeTurmas])
               se nomesTurmas[quantidadeTurmas] = "" entao
                  escreval("O nome é obrigatório.")
               fimse
            ate nomesTurmas[quantidadeTurmas] <> ""
            repita
               escreval("Número de alunos (1 a 60):")
               leia(alunosTurmas[quantidadeTurmas])
               se (alunosTurmas[quantidadeTurmas] < 1) ou (alunosTurmas[quantidadeTurmas] > 60) entao
                  escreval("A turma deve ter de 1 a 60 alunos.")
               fimse
            ate (alunosTurmas[quantidadeTurmas] >= 1) e (alunosTurmas[quantidadeTurmas] <= 60)
            escreval("Turma cadastrada na posição ", quantidadeTurmas, ".")
         fimse

      caso 4
         // LISTAR TURMAS: só até quantidadeTurmas (o resto está vazio)
         para i de 1 ate quantidadeTurmas faca
            escreval(i, ". ", nomesTurmas[i], " - ", alunosTurmas[i], " alunos")
         fimpara

      caso 5
         // RESERVAR: a turma vem da lista; o número de alunos vem da turma
         para i de 1 ate quantidadeTurmas faca
            escreval(i, ". ", nomesTurmas[i], " - ", alunosTurmas[i], " alunos")
         fimpara
         repita
            escreval("Qual turma? (1 a ", quantidadeTurmas, ")")
            leia(escolhida)
         ate (escolhida >= 1) e (escolhida <= quantidadeTurmas)
         repita
            escreval("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb")
            leia(dia)
         ate (dia >= 1) e (dia <= 6)
         repita
            escreval("Turno: 1 Manhã (08h-12h) | 2 Tarde (13h30-17h30) | 3 Noite (18h30-22h30)")
            leia(turno)
         ate (turno >= 1) e (turno <= 3)

         // três regras, uma depois da outra: sábado, capacidade, conflito
         se (dia = 6) e (turno <> 1) entao
            escreval("No sábado, só o turno da manhã.")
         senao
            se alunosTurmas[escolhida] > capacidades[2] entao
               escreval("A turma não cabe: ", alunosTurmas[escolhida], " alunos para ", capacidades[2], " lugares.")
            senao
               se grade[dia, turno] = "" entao
                  grade[dia, turno] <- nomesTurmas[escolhida]
                  escreval("Reserva confirmada. Sobram ", capacidades[2] - alunosTurmas[escolhida], " lugares.")
               senao
                  escreval("Horário ocupado pela turma ", grade[dia, turno], ". Escolha outro dia ou turno.")
               fimse
            fimse
         fimse

      caso 6
         // GRADE: laço aninhado (linha = dia, coluna = turno)
         escreval("GRADE DA SEMANA - ", nomesLabs[2])
         escreval("Colunas: manhã | tarde | noite")
         para d de 1 ate 6 faca
            escreva("Dia ", d, ": ")
            para t de 1 ate 3 faca
               se (d = 6) e (t <> 1) entao
                  escreva("[fechado] ")
               senao
                  se grade[d, t] = "" entao
                     escreva("[livre] ")
                  senao
                     escreva("[", grade[d, t], "] ")
                  fimse
               fimse
            fimpara
            escreval("")
         fimpara

      caso 7
         // [DESAFIO 6.11] ocupação = horários ocupados / 16 * 100
         // (5 dias x 3 turnos + a manhã de sábado = 16 horários)
         ocupados <- 0
         para d de 1 ate 6 faca
            para t de 1 ate 3 faca
               se grade[d, t] <> "" entao
                  ocupados <- ocupados + 1
               fimse
            fimpara
         fimpara
         percentual <- ocupados / 16 * 100
         escreval("Ocupação da semana: ", percentual:5:1, "%")
      fimescolha
   ate opcao = 8

   escreval("Até logo!")
fimalgoritmo
