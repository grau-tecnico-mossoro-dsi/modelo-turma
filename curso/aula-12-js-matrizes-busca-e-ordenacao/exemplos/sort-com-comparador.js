// =====================================================
// AULA 12 — sort pronto do JavaScript, a armadilha e o comparador
// Rode no console do navegador (F12) ou no terminal: node sort-com-comparador.js
// =====================================================

// A armadilha: sem comparador, o sort ordena como TEXTO (ordem de dicionário)
let numeros = [10, 9, 1];
numeros.sort();
console.log(numeros);                 // [ 1, 10, 9 ]  errado para números!

// Com comparador: a função recebe dois itens (a e b) e devolve
// negativo -> a vem antes | positivo -> b vem antes | zero -> tanto faz
numeros.sort(function (a, b) {
    return a - b;                     // crescente
});
console.log(numeros);                 // [ 1, 9, 10 ]

numeros.sort(function (a, b) {
    return b - a;                     // decrescente
});
console.log(numeros);                 // [ 10, 9, 1 ]

// Lista de objetos: ordenar pela nota, da maior para a menor
let alunos = [
    { nome: "Ana", nota: 7.5 },
    { nome: "Bruno", nota: 9 },
    { nome: "Carla", nota: 6 }
];
alunos.sort(function (a, b) {
    return b.nota - a.nota;
});
for (let i = 0; i < alunos.length; i++) {
    console.log((i + 1) + "º " + alunos[i].nome + " - " + alunos[i].nota);
}

// Dois critérios: primeiro o dia; no mesmo dia, o turno
// (dia 1 = segunda ... 6 = sábado; turno 1 = manhã, 2 = tarde, 3 = noite)
let aulas = [
    { turma: "DSI02", dia: 3, turno: 3 },
    { turma: "ADM09", dia: 1, turno: 2 },
    { turma: "ENF05", dia: 3, turno: 1 },
    { turma: "ADM10", dia: 1, turno: 1 }
];
aulas.sort(function (a, b) {
    if (a.dia !== b.dia) {
        return a.dia - b.dia;
    }
    return a.turno - b.turno;
});
for (let i = 0; i < aulas.length; i++) {
    console.log("dia " + aulas[i].dia + ", turno " + aulas[i].turno + ": " + aulas[i].turma);
}
