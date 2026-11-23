// =====================================================
// AULA 12 — Map e Set: buscar pela CHAVE, sem laço
// Rode no console do navegador (F12) ou no terminal: node map-e-set.js
// =====================================================


// -----------------------------------------------------
// 1. SET: lista de presença sem repetidos
// Um Set guarda valores SEM repetição. add, has, delete, size.
// -----------------------------------------------------
let chamada = ["Ana", "Bruno", "Ana", "Carla", "Bruno", "Ana"];   // Ana respondeu 3 vezes
let presentes = new Set();
for (let i = 0; i < chamada.length; i++) {
    presentes.add(chamada[i]);          // se já existe, o add não faz nada
}
console.log("Respostas: " + chamada.length);         // 6
console.log("Presentes: " + presentes.size);         // 3
console.log("A Carla veio? " + presentes.has("Carla"));   // true
console.log("O Diego veio? " + presentes.has("Diego"));   // false
presentes.delete("Bruno");                           // o Bruno saiu mais cedo
console.log("Presentes no fim: " + presentes.size);  // 2


// -----------------------------------------------------
// 2. MAP: chave -> valor. set, get, has, delete, size.
// Aqui: número do turno -> nome e horário (igual ao projeto).
// -----------------------------------------------------
const TURNOS = new Map([
    [1, { nome: "Manhã", horario: "08h às 12h" }],
    [2, { nome: "Tarde", horario: "13h30 às 17h30" }],
    [3, { nome: "Noite", horario: "18h30 às 22h30" }]
]);
console.log(TURNOS.get(2).nome + " - " + TURNOS.get(2).horario);   // Tarde - 13h30 às 17h30
console.log("Existe o turno 4? " + TURNOS.has(4));                 // false
console.log("Quantos turnos? " + TURNOS.size);                     // 3


// -----------------------------------------------------
// 3. A LISTA CONTINUA SENDO A FONTE; o Map é um atalho montado a partir dela
// -----------------------------------------------------
let laboratorios = [
    { id: 1, nome: "Eletrotécnica", capacidade: 20 },
    { id: 2, nome: "Informática", capacidade: 30 },
    { id: 3, nome: "Radiologia", capacidade: 15 },
    { id: 4, nome: "Segurança no trabalho", capacidade: 25 },
    { id: 5, nome: "Enfermagem", capacidade: 20 }
];

let laboratoriosPorId = new Map();
for (let i = 0; i < laboratorios.length; i++) {
    laboratoriosPorId.set(laboratorios[i].id, laboratorios[i]);
}
console.log(laboratoriosPorId.get(5).nome);   // Enfermagem, sem percorrer a lista


// -----------------------------------------------------
// 4. CONTAR COMPARAÇÕES: busca linear x Map, procurando o último
// -----------------------------------------------------
function buscaLinearPorId(lista, id) {
    let comparacoes = 0;
    for (let i = 0; i < lista.length; i++) {
        comparacoes = comparacoes + 1;
        if (lista[i].id === id) {
            return comparacoes;
        }
    }
    return comparacoes;
}

let muitos = [];
let muitosPorId = new Map();
for (let id = 1; id <= 1000; id++) {
    let item = { id: id, nome: "Item " + id };
    muitos.push(item);
    muitosPorId.set(id, item);
}
console.log("linear: " + buscaLinearPorId(muitos, 1000) + " comparações");   // 1000
console.log("Map: " + muitosPorId.get(1000).nome + " na hora, sem laço");    // Item 1000


// -----------------------------------------------------
// 5. A CHAVE DO SET PODE SER UM TEXTO MONTADO: "laboratorio-dia-turno"
// -----------------------------------------------------
let horariosOcupados = new Set();
horariosOcupados.add(2 + "-" + 3 + "-" + 3);   // Informática, quarta, noite
horariosOcupados.add(2 + "-" + 1 + "-" + 1);   // Informática, segunda, manhã
console.log(horariosOcupados.has("2-3-3"));    // true  -> ocupado
console.log(horariosOcupados.has("2-3-2"));    // false -> livre (outro turno)


// -----------------------------------------------------
// 6. CUIDADO: Map e Set NÃO viram JSON (vai doer na aula 13)
// -----------------------------------------------------
console.log(JSON.stringify(TURNOS));              // {}  -> os dados somem, sem erro!
console.log(JSON.stringify(laboratorios).length > 2);   // true: a LISTA vira JSON normalmente
