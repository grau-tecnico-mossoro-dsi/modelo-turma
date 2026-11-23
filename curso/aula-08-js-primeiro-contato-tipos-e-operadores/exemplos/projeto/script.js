// =====================================================
// RESERVA DE LABORATÓRIOS — AULA 8
// Tradução para JS do cadastro de UMA turma e da
// reserva simples da aula 4.
// Ainda sem if (aula 9): as regras aparecem como true/false.
// =====================================================


// -----------------------------------------------------
// CONSTANTES (valores que não mudam)
// -----------------------------------------------------
const MAXIMO_DE_ALUNOS = 60;
const SABADO = 6;
const MANHA = 1;

// O laboratório é um espaço físico: não é digitado, já vem pronto.
const NOME_DO_LABORATORIO = "Informática";
const CAPACIDADE_DO_LABORATORIO = 30;


// -----------------------------------------------------
// CADASTRO DE UMA TURMA
// -----------------------------------------------------
let nomeDaTurma = prompt("Nome da turma (ex.: ADM09):");
let alunos = Number(prompt("Número de alunos (1 a " + MAXIMO_DE_ALUNOS + "):"));

let nomeValido = nomeDaTurma !== "";
let alunosValido = alunos >= 1 && alunos <= MAXIMO_DE_ALUNOS;

console.log("Turma:", nomeDaTurma, "| nome válido?", nomeValido);
console.log("Alunos:", alunos, "| tipo:", typeof alunos, "| válido?", alunosValido);


// -----------------------------------------------------
// RESERVA SIMPLES (no laboratório de Informática)
// -----------------------------------------------------
let dia = Number(prompt("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb"));
let turno = Number(prompt("Turno: 1 Manhã (08h-12h) | 2 Tarde (13h30-17h30) | 3 Noite (18h30-22h30)"));

let turmaCabe = alunos <= CAPACIDADE_DO_LABORATORIO;
let lugaresQueSobram = CAPACIDADE_DO_LABORATORIO - alunos;
let ocupacao = alunos / CAPACIDADE_DO_LABORATORIO * 100;
let turnoPermitido = dia !== SABADO || turno === MANHA;

let confirmou = confirm("Confirmar a reserva da turma " + nomeDaTurma + " no laboratório de " + NOME_DO_LABORATORIO + "?");

console.log("A turma cabe?", turmaCabe);
console.log("Lugares que sobram:", lugaresQueSobram);
console.log("Ocupação (sem arredondar):", ocupacao);
console.log("Turno permitido (sábado só de manhã)?", turnoPermitido);
console.log("Reserva confirmada pelo professor?", confirmou);

alert(
    "RESUMO DA RESERVA\n\n" +
    "Laboratório: " + NOME_DO_LABORATORIO + " (" + CAPACIDADE_DO_LABORATORIO + " lugares)\n" +
    "Turma: " + nomeDaTurma + " (" + alunos + " alunos)\n" +
    "Dia " + dia + ", turno " + turno + "\n" +
    "Turno permitido? " + turnoPermitido + "\n" +
    "A turma cabe? " + turmaCabe + "\n" +
    "Lugares que sobram: " + lugaresQueSobram + "\n" +
    "Ocupação: " + ocupacao.toFixed(1) + "%\n" +
    "Confirmada? " + confirmou
);
