// =====================================================
// AULA 12 — Busca linear x busca binária, contando as comparações
// Rode no console do navegador (F12) ou no terminal: node busca-linear-e-binaria.js
// =====================================================

// Busca linear: olha um por um, do começo ao fim. Funciona em qualquer lista.
function buscaLinear(lista, procurado) {
    let comparacoes = 0;
    for (let i = 0; i < lista.length; i++) {
        comparacoes = comparacoes + 1;
        if (lista[i] === procurado) {
            console.log("linear: achou " + procurado + " na posição " + i + " com " + comparacoes + " comparações");
            return i;
        }
    }
    console.log("linear: " + procurado + " não está na lista (" + comparacoes + " comparações)");
    return -1;
}

// Busca binária: SÓ funciona se a lista estiver ORDENADA.
// Olha o meio e descarta a metade onde o número não pode estar.
function buscaBinaria(lista, procurado) {
    let inicio = 0;
    let fim = lista.length - 1;
    let comparacoes = 0;
    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);
        comparacoes = comparacoes + 1;
        if (lista[meio] === procurado) {
            console.log("binária: achou " + procurado + " na posição " + meio + " com " + comparacoes + " comparações");
            return meio;
        }
        if (lista[meio] < procurado) {
            inicio = meio + 1;      // está à direita: descarta a esquerda
        } else {
            fim = meio - 1;         // está à esquerda: descarta a direita
        }
    }
    console.log("binária: " + procurado + " não está na lista (" + comparacoes + " comparações)");
    return -1;
}

let ordenados = [3, 8, 15, 23, 42, 57, 91];
buscaLinear(ordenados, 57);
buscaBinaria(ordenados, 57);
buscaLinear(ordenados, 50);
buscaBinaria(ordenados, 50);

// Uma lista de 1000 números já ordenados: 1, 2, 3, ..., 1000
let mil = [];
for (let i = 1; i <= 1000; i++) {
    mil.push(i);
}
buscaLinear(mil, 1000);
buscaBinaria(mil, 1000);

// Adivinhar um número de 1 a 100 com a estratégia da busca binária
let segredo = 73;
let menor = 1;
let maior = 100;
let tentativas = 0;
let acertou = false;
while (acertou === false) {
    let chute = Math.floor((menor + maior) / 2);
    tentativas = tentativas + 1;
    if (chute === segredo) {
        console.log("Tentativa " + tentativas + ": " + chute + " - acertou!");
        acertou = true;
    } else if (chute < segredo) {
        console.log("Tentativa " + tentativas + ": " + chute + " - é maior");
        menor = chute + 1;
    } else {
        console.log("Tentativa " + tentativas + ": " + chute + " - é menor");
        maior = chute - 1;
    }
}
