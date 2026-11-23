// =====================================================
// RESERVA DE LABORATÓRIOS — AULA 9
// Menu principal validado (do...while) + cadastro de turma
// com validação em laço + reserva com dia e turno (switch).
// Ainda sem funções próprias (aula 10) e sem arrays (aula 10):
// por isso guardamos UMA turma e as validações se repetem.
// =====================================================


// -----------------------------------------------------
// CONSTANTES
// -----------------------------------------------------
const MAXIMO_DE_ALUNOS = 60;
const SABADO = 6;
const MANHA = 1;
const OPCAO_SAIR = 4;

// O laboratório é um espaço físico: não é cadastrado, já vem pronto.
const NOME_DO_LABORATORIO = "Informática";
const CAPACIDADE_DO_LABORATORIO = 30;


// -----------------------------------------------------
// DADOS: uma turma só (o cadastro substitui esta)
// -----------------------------------------------------
let nomeDaTurma = "ADM09";
let alunos = 28;


// -----------------------------------------------------
// MENU PRINCIPAL: repete até escolher Sair (ou cancelar)
// Regras: só números, sem 0, sem negativo, sem passar do máximo.
// -----------------------------------------------------
let opcao = 0;
do {
    // 1) ler uma opção válida: pergunta de novo até ser válida
    let opcaoValida = false;
    while (opcaoValida === false) {
        let resposta = prompt(
            "RESERVA DE LABORATÓRIOS\n\n" +
            "1 - Cadastrar turma\n" +
            "2 - Ver turma\n" +
            "3 - Nova reserva (laboratório de " + NOME_DO_LABORATORIO + ")\n" +
            "4 - Sair"
        );
        if (resposta === null) {
            // Cancelar no menu = Sair
            opcao = OPCAO_SAIR;
            opcaoValida = true;
        } else {
            opcao = Number(resposta);
            if (isNaN(opcao)) {
                alert("Digite apenas números.");
            } else if (opcao % 1 !== 0 || opcao < 1 || opcao > OPCAO_SAIR) {
                alert("Opção inválida. Escolha de 1 a " + OPCAO_SAIR + ".");
            } else {
                opcaoValida = true;
            }
        }
    }

    // 2) executar a opção escolhida
    switch (opcao) {
        case 1:
            // ---------- CADASTRAR TURMA ----------
            let novoNome = "";
            while (novoNome === "") {
                let respostaNome = prompt("Nome da turma (ex.: ADM09):");
                if (respostaNome === null) {
                    respostaNome = "";
                }
                novoNome = respostaNome.trim();
                if (novoNome === "") {
                    alert("O nome da turma é obrigatório.");
                }
            }

            let novosAlunos = 0;
            do {
                novosAlunos = Number(prompt("Número de alunos (1 a " + MAXIMO_DE_ALUNOS + "):"));
                if (isNaN(novosAlunos) || novosAlunos < 1 || novosAlunos > MAXIMO_DE_ALUNOS) {
                    alert("A turma deve ter de 1 a " + MAXIMO_DE_ALUNOS + " alunos.");
                }
            } while (isNaN(novosAlunos) || novosAlunos < 1 || novosAlunos > MAXIMO_DE_ALUNOS);

            nomeDaTurma = novoNome;
            alunos = novosAlunos;
            alert("Turma " + nomeDaTurma + " cadastrada com " + alunos + " alunos.");
            break;

        case 2:
            // ---------- VER TURMA ----------
            alert(
                "TURMA\n\n" +
                nomeDaTurma + " - " + alunos + " alunos"
            );
            break;

        case 3:
            // ---------- NOVA RESERVA ----------
            let dia = 0;
            do {
                dia = Number(prompt("Dia:\n1 - Segunda\n2 - Terça\n3 - Quarta\n4 - Quinta\n5 - Sexta\n6 - Sábado"));
                if (isNaN(dia) || dia < 1 || dia > 6) {
                    alert("Escolha um dia de 1 a 6.");
                }
            } while (isNaN(dia) || dia < 1 || dia > 6);

            let nomeDoDia = "";
            switch (dia) {
                case 1:
                    nomeDoDia = "Segunda";
                    break;
                case 2:
                    nomeDoDia = "Terça";
                    break;
                case 3:
                    nomeDoDia = "Quarta";
                    break;
                case 4:
                    nomeDoDia = "Quinta";
                    break;
                case 5:
                    nomeDoDia = "Sexta";
                    break;
                case 6:
                    nomeDoDia = "Sábado";
                    break;
            }

            let turno = 0;
            do {
                turno = Number(prompt("Turno:\n1 - Manhã (08h às 12h)\n2 - Tarde (13h30 às 17h30)\n3 - Noite (18h30 às 22h30)"));
                if (isNaN(turno) || turno < 1 || turno > 3) {
                    alert("Escolha um turno de 1 a 3.");
                }
            } while (isNaN(turno) || turno < 1 || turno > 3);

            let nomeDoTurno = "";
            let horario = "";
            switch (turno) {
                case 1:
                    nomeDoTurno = "Manhã";
                    horario = "08h às 12h";
                    break;
                case 2:
                    nomeDoTurno = "Tarde";
                    horario = "13h30 às 17h30";
                    break;
                case 3:
                    nomeDoTurno = "Noite";
                    horario = "18h30 às 22h30";
                    break;
            }

            // as regras da aula 4, agora decidindo de verdade
            if (dia === SABADO && turno !== MANHA) {
                alert("No sábado, só o turno da manhã.");
            } else if (alunos > CAPACIDADE_DO_LABORATORIO) {
                alert(
                    "A turma não cabe: " + nomeDaTurma + " tem " + alunos + " alunos e o laboratório de " +
                    NOME_DO_LABORATORIO + " tem " + CAPACIDADE_DO_LABORATORIO + " lugares."
                );
            } else {
                let lugaresQueSobram = CAPACIDADE_DO_LABORATORIO - alunos;
                let ocupacao = alunos / CAPACIDADE_DO_LABORATORIO * 100;

                let confirmou = confirm(
                    "Confirmar a reserva?\n\n" +
                    "Laboratório de " + NOME_DO_LABORATORIO + "\n" +
                    "Turma " + nomeDaTurma + " (" + alunos + " alunos, sobram " + lugaresQueSobram + " lugares)\n" +
                    "Ocupação: " + ocupacao.toFixed(0) + "%\n" +
                    nomeDoDia + ", " + nomeDoTurno + " (" + horario + ")"
                );
                if (confirmou) {
                    alert("Reserva confirmada!");
                } else {
                    alert("Reserva cancelada.");
                }
            }
            break;
    }
} while (opcao !== OPCAO_SAIR);

alert("Até logo!");
