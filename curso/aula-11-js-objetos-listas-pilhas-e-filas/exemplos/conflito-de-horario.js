// =====================================================
// AULA 11 — Regras da reserva: conflito, capacidade e sábado
// As mesmas funções que você escreve no projeto (CP4),
// testadas com console.log, sem prompt.
// Rode no console do navegador (F12) ou no terminal: node conflito-de-horario.js
// =====================================================

const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const TURNOS = ["Manhã", "Tarde", "Noite"];
const HORARIOS = ["08h às 12h", "13h30 às 17h30", "18h30 às 22h30"];
const SABADO = 6;
const MANHA = 1;

let laboratorios = [
    { id: 1, nome: "Eletrotécnica", capacidade: 20 },
    { id: 2, nome: "Informática", capacidade: 30 },
    { id: 3, nome: "Radiologia", capacidade: 15 },
    { id: 4, nome: "Segurança no trabalho", capacidade: 25 },
    { id: 5, nome: "Enfermagem", capacidade: 20 }
];

let turmas = [
    { id: 1, nome: "ADM09", curso: 1, alunos: 28 },
    { id: 6, nome: "DSI02", curso: 3, alunos: 24 },
    { id: 8, nome: "ENF05", curso: 7, alunos: 18 }
];

// dia 1 a 6 (segunda a sábado) · turno 1 manhã, 2 tarde, 3 noite
let reservas = [
    { id: 1, professor: 1, turma: 6, laboratorio: 2, dia: 3, turno: 3 },
    { id: 2, professor: 2, turma: 1, laboratorio: 2, dia: 1, turno: 1 },
    { id: 3, professor: 3, turma: 8, laboratorio: 5, dia: 2, turno: 2 },
    { id: 4, professor: 4, turma: 7, laboratorio: 1, dia: 4, turno: 3 }
];

function buscarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i];
        }
    }
    return null;
}

// No sábado, só o turno da manhã
function turnoPermitido(dia, turno) {
    return dia !== SABADO || turno === MANHA;
}

function turmaCabe(turma, laboratorio) {
    return turma.alunos <= laboratorio.capacidade;
}

// Livre = nenhuma reserva do mesmo laboratório, no mesmo dia e turno
function horarioLivre(idLaboratorio, dia, turno) {
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.laboratorio === idLaboratorio && reserva.dia === dia && reserva.turno === turno) {
            return false;
        }
    }
    return true;
}

function textoDoHorario(dia, turno) {
    return DIAS[dia - 1] + ", " + TURNOS[turno - 1] + " (" + HORARIOS[turno - 1] + ")";
}

function mostrarResultado(numero, resultado, esperado) {
    let situacao = "ERRO";
    if (resultado === esperado) {
        situacao = "ok";
    }
    console.log("teste " + numero + ": " + resultado + " (esperado " + esperado + ") " + situacao);
}

// Reservas que já existem: confira com a tabela do README
for (let i = 0; i < reservas.length; i++) {
    let reserva = reservas[i];
    console.log("Nº " + reserva.id + " - " + textoDoHorario(reserva.dia, reserva.turno) + " - " +
        buscarPorId(laboratorios, reserva.laboratorio).nome);
}

// CONFLITO: [laboratório, dia, turno, resultado esperado de horarioLivre]
console.log("--- horarioLivre ---");
let testesDeConflito = [
    [2, 1, 1, false],   // Informática, segunda, manhã: a ADM09 já está lá
    [2, 1, 2, true],    // Informática, segunda, tarde: livre
    [2, 3, 3, false],   // Informática, quarta, noite: a DSI02 já está lá
    [1, 1, 1, true],    // Eletrotécnica, segunda, manhã: outro laboratório, livre
    [5, 2, 2, false],   // Enfermagem, terça, tarde: a ENF05 já está lá
    [5, 3, 2, true]     // Enfermagem, quarta, tarde: outro dia, livre
];
for (let i = 0; i < testesDeConflito.length; i++) {
    let t = testesDeConflito[i];
    mostrarResultado(i + 1, horarioLivre(t[0], t[1], t[2]), t[3]);
}

// CAPACIDADE: [id da turma, id do laboratório, resultado esperado de turmaCabe]
console.log("--- turmaCabe ---");
let testesDeCapacidade = [
    [1, 2, true],    // ADM09 (28) na Informática (30)
    [1, 1, false],   // ADM09 (28) na Eletrotécnica (20)
    [8, 1, true],    // ENF05 (18) na Eletrotécnica (20)
    [6, 3, false]    // DSI02 (24) na Radiologia (15)
];
for (let i = 0; i < testesDeCapacidade.length; i++) {
    let t = testesDeCapacidade[i];
    let turma = buscarPorId(turmas, t[0]);
    let laboratorio = buscarPorId(laboratorios, t[1]);
    mostrarResultado(i + 1, turmaCabe(turma, laboratorio), t[2]);
}

// SÁBADO: [dia, turno, resultado esperado de turnoPermitido]
console.log("--- turnoPermitido ---");
let testesDoSabado = [
    [6, 1, true],    // sábado de manhã
    [6, 2, false],   // sábado à tarde
    [6, 3, false],   // sábado à noite
    [5, 3, true]     // sexta à noite
];
for (let i = 0; i < testesDoSabado.length; i++) {
    let t = testesDoSabado[i];
    mostrarResultado(i + 1, turnoPermitido(t[0], t[1]), t[2]);
}
