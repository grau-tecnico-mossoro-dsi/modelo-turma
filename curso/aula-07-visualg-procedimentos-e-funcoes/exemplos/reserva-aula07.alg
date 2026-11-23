algoritmo "Reserva de Laboratorios - versao Portugol"
// =====================================================================
// Versão em Portugol (VisualG) do projeto da disciplina.
//   [AULA 4] variáveis, leia/escreva, operadores e decisão
//   [AULA 5] menu validado com repita...ate, contadores
//   [AULA 6] vetores (laboratórios e turmas) e matriz (grade)   [CP2]
//   [AULA 7] procedimentos e funções
//
// Simplificações em relação ao JS: a grade (matriz) é de UM laboratório
// (Informática) e guarda o nome da turma. Os laboratórios são fixos:
// são espaços físicos, não têm cadastro.
//
// Horários: Manhã 08h-12h | Tarde 13h30-17h30 | Noite 18h30-22h30
// Dias: 1 Segunda ... 6 Sábado. No sábado, só o turno da manhã.
//
// [AULA 6] Comando arquivo (opcional): com a linha
//    arquivo "turmas.txt"
// o leia passa a buscar as respostas nesse arquivo texto em vez do
// teclado. A posição exata da linha, a pasta onde o VisualG procura o
// arquivo e o comportamento sem o arquivo dependem da versão: conferir
// no VisualG do laboratório (ver aula 6).
// =====================================================================

var
   nomesLabs: vetor[1..5] de caractere       // [AULA 6] vetores paralelos
   capacidades: vetor[1..5] de inteiro
   nomesTurmas: vetor[1..20] de caractere
   alunosTurmas: vetor[1..20] de inteiro
   grade: vetor[1..6, 1..3] de caractere     // [AULA 6] matriz: dia x turno
   quantidadeTurmas, opcao, d, t, n: inteiro
   dia, turno, escolhida, minimo, ocupados: inteiro
   percentual: real

// [AULA 7] procedimento: faz uma tarefa e não devolve valor
procedimento linha
inicio
   escreval("----------------------------------------------")
fimprocedimento

// [AULA 5 -> AULA 7] menu validado (regras do desafioCadastro):
// sem 0 ou negativo; inválido -> pergunta de novo.
// Obs.: no VisualG, digitar letras num leia de inteiro já gera erro.
funcao lerOpcao(maximo: inteiro): inteiro
var
   valor: inteiro
inicio
   repita
      leia(valor)
      se (valor < 1) ou (valor > maximo) entao
         escreval("Opção inválida. Escolha de 1 a ", maximo, ".")
      fimse
   ate (valor >= 1) e (valor <= maximo)
   retorne valor
fimfuncao

// [AULA 4 -> AULA 7] no sábado (dia 6), só o turno da manhã (turno 1)
funcao turnoPermitido(dd, tt: inteiro): logico
inicio
   retorne (dd <> 6) ou (tt = 1)
fimfuncao

// [AULA 4 -> AULA 7] a turma cabe no laboratório?
funcao turmaCabe(alunos, capacidade: inteiro): logico
inicio
   retorne alunos <= capacidade
fimfuncao

// [AULA 6 -> AULA 7] o horário está livre se a célula da matriz está vazia
funcao horarioLivre(dd, tt: inteiro): logico
inicio
   retorne grade[dd, tt] = ""
fimfuncao

// [AULA 4] o horário do turno por extenso
funcao horarioDoTurno(tt: inteiro): caractere
inicio
   escolha tt
   caso 1
      retorne "Manhã, 08h às 12h"
   caso 2
      retorne "Tarde, 13h30 às 17h30"
   outrocaso
      retorne "Noite, 18h30 às 22h30"
   fimescolha
fimfuncao

// [AULA 6 -> AULA 7] mostra a matriz linha por linha (laço aninhado)
procedimento mostrarGrade
var
   x, y: inteiro
inicio
   linha
   escreval("GRADE DA SEMANA - ", nomesLabs[2])
   escreval("Colunas: manhã | tarde | noite")
   linha
   para x de 1 ate 6 faca
      escreva("Dia ", x, ": ")
      para y de 1 ate 3 faca
         se turnoPermitido(x, y) = falso entao
            escreva("[fechado] ")
         senao
            se grade[x, y] = "" entao
               escreva("[livre] ")
            senao
               escreva("[", grade[x, y], "] ")
            fimse
         fimse
      fimpara
      escreval("")
   fimpara
fimprocedimento

// [AULA 6 -> AULA 7] lista numerada (o desafio pede sempre uma lista)
procedimento mostrarLaboratorios
var
   k: inteiro
inicio
   linha
   para k de 1 ate 5 faca
      escreval(k, ". ", nomesLabs[k], " - ", capacidades[k], " lugares")
   fimpara
fimprocedimento

procedimento mostrarTurmas
var
   k: inteiro
inicio
   linha
   se quantidadeTurmas = 0 entao
      escreval("Nenhuma turma cadastrada.")
   fimse
   para k de 1 ate quantidadeTurmas faca
      escreval(k, ". ", nomesTurmas[k], " - ", alunosTurmas[k], " alunos")
   fimpara
fimprocedimento

inicio
   // dados iniciais (os mesmos de dados/laboratorios.csv)
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

   para d de 1 ate 6 faca
      para t de 1 ate 3 faca
         grade[d, t] <- ""
      fimpara
   fimpara

   // [AULA 5] menu principal: repete até escolher Sair
   repita
      linha
      escreval("RESERVA DE LABORATÓRIOS")
      escreval("1 - Listar laboratórios")
      escreval("2 - Buscar laboratório por capacidade mínima")
      escreval("3 - Cadastrar turma")
      escreval("4 - Listar turmas")
      escreval("5 - Reservar o laboratório de ", nomesLabs[2])
      escreval("6 - Ver grade da semana")
      escreval("7 - Ocupação da semana")
      escreval("8 - Sair")
      opcao <- lerOpcao(8)

      escolha opcao
      caso 1
         mostrarLaboratorios
      caso 2
         // [AULA 6] busca linear no vetor
         escreval("Quantos lugares você precisa?")
         leia(minimo)
         para n de 1 ate 5 faca
            se capacidades[n] >= minimo entao
               escreval(n, ". ", nomesLabs[n], " - ", capacidades[n], " lugares")
            fimse
         fimpara
      caso 3
         // [AULA 4] cadastro com regras: nome obrigatório, alunos de 1 a 60
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
            ate (alunosTurmas[quantidadeTurmas] >= 1) e (alunosTurmas[quantidadeTurmas] <= 60)
            escreval("Turma cadastrada.")
         fimse
      caso 4
         mostrarTurmas
      caso 5
         se quantidadeTurmas = 0 entao
            escreval("Cadastre uma turma primeiro.")
         senao
            mostrarTurmas
            escreval("Qual turma?")
            escolhida <- lerOpcao(quantidadeTurmas)
            escreval("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb")
            dia <- lerOpcao(6)
            escreval("Turno: 1 Manhã | 2 Tarde | 3 Noite")
            turno <- lerOpcao(3)

            // [AULA 4] regras: sábado só de manhã; a turma precisa caber
            // [AULA 6] conflito: a célula da matriz já tem uma turma
            se turnoPermitido(dia, turno) = falso entao
               escreval("No sábado, só o turno da manhã.")
            senao
               se turmaCabe(alunosTurmas[escolhida], capacidades[2]) = falso entao
                  escreval("A turma não cabe: ", alunosTurmas[escolhida], " alunos para ", capacidades[2], " lugares.")
               senao
                  se horarioLivre(dia, turno) entao
                     grade[dia, turno] <- nomesTurmas[escolhida]
                     escreval("Reserva confirmada: ", horarioDoTurno(turno), ", ", capacidades[2] - alunosTurmas[escolhida], " lugares sobrando.")
                  senao
                     escreval("Horário ocupado pela turma ", grade[dia, turno], ".")
                  fimse
               fimse
            fimse
         fimse
      caso 6
         mostrarGrade
      caso 7
         // [AULA 6] desafio: ocupação = horários ocupados / 16 * 100
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
