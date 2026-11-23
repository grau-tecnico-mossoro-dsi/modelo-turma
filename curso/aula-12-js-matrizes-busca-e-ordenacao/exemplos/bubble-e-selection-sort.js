// =====================================================
// AULA 12 — Ordenação feita à mão: bubble sort e selection sort
// Cada função mostra o passo a passo e conta as comparações.
// Rode no console do navegador (F12) ou no terminal: node bubble-e-selection-sort.js
// =====================================================

function copiarLista(lista) {
    let copia = [];
    for (let i = 0; i < lista.length; i++) {
        copia.push(lista[i]);
    }
    return copia;
}

// BUBBLE SORT: compara VIZINHOS e troca se estiverem fora de ordem.
// A cada volta, o maior que sobrou "borbulha" até o fim.
function bubbleSort(original) {
    let lista = copiarLista(original);
    let comparacoes = 0;
    for (let volta = 0; volta < lista.length - 1; volta++) {
        for (let i = 0; i < lista.length - 1 - volta; i++) {
            comparacoes = comparacoes + 1;
            if (lista[i] > lista[i + 1]) {
                let auxiliar = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = auxiliar;
            }
        }
        console.log("bubble, fim da volta " + (volta + 1) + ": [" + lista.join(", ") + "]");
    }
    console.log("bubble: " + comparacoes + " comparações");
    return lista;
}

// SELECTION SORT: acha o MENOR do que sobrou e coloca na frente.
function selectionSort(original) {
    let lista = copiarLista(original);
    let comparacoes = 0;
    for (let i = 0; i < lista.length - 1; i++) {
        let menor = i;
        for (let j = i + 1; j < lista.length; j++) {
            comparacoes = comparacoes + 1;
            if (lista[j] < lista[menor]) {
                menor = j;
            }
        }
        let auxiliar = lista[i];
        lista[i] = lista[menor];
        lista[menor] = auxiliar;
        console.log("selection, fim da volta " + (i + 1) + ": [" + lista.join(", ") + "]");
    }
    console.log("selection: " + comparacoes + " comparações");
    return lista;
}

let numeros = [5, 1, 4, 2, 8];
bubbleSort(numeros);
selectionSort(numeros);
console.log("original continua igual: [" + numeros.join(", ") + "]");
