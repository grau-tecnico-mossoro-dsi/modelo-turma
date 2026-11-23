// =====================================================
// AULA 10 — Exemplos clássicos: arrays e funções
// Abra o console (F12) para ver os resultados.
// =====================================================


// -----------------------------------------------------
// 1. ARRAYS: soma, maior valor e contar pares
// -----------------------------------------------------
let numeros = [12, 7, 30, 5, 18, 9];

let soma = 0;
for (let i = 0; i < numeros.length; i++) {
    soma = soma + numeros[i];
}
console.log("Soma:", soma);                  // 81

let maior = numeros[0];
for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
        maior = numeros[i];
    }
}
console.log("Maior:", maior);                // 30

let quantidadeDePares = 0;
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        quantidadeDePares++;
    }
}
console.log("Pares:", quantidadeDePares);    // 3


// -----------------------------------------------------
// 2. Operações de array: push, pop, splice, join, includes
// -----------------------------------------------------
let turmas = ["1DS", "2DS", "3DS"];
turmas.push("4DS");                 // adiciona no fim
console.log(turmas.join(", "));     // 1DS, 2DS, 3DS, 4DS
let removida = turmas.pop();        // remove do fim e devolve
console.log("Removida:", removida); // 4DS
turmas.splice(1, 1);                // remove 1 item na posição 1
console.log(turmas.join(", "));     // 1DS, 3DS
console.log(turmas.includes("3DS")); // true
console.log("Administração".includes("Admin")); // true (em texto também)


// -----------------------------------------------------
// 3. FUNÇÕES: somar, ehPar, media
// -----------------------------------------------------
function somar(a, b) {
    return a + b;
}

function ehPar(numero) {
    return numero % 2 === 0;
}

function media(lista) {
    let total = 0;
    for (let i = 0; i < lista.length; i++) {
        total = total + lista[i];
    }
    return total / lista.length;
}

console.log(somar(3, 4));                    // 7
console.log(somar(somar(1, 2), 3));          // 6
console.log(ehPar(10), ehPar(7));            // true false
console.log(media([8, 7, 9]));               // 8
console.log(media(numeros).toFixed(1));      // 13.5


// -----------------------------------------------------
// 4. Procedimento x função (e return x console.log)
// -----------------------------------------------------

// "Procedimento": faz uma tarefa e não devolve nada
function mostrarLinha() {
    console.log("------------------------------");
}

// Mostra o dobro, mas NÃO devolve: quem chama recebe undefined
function mostrarDobro(numero) {
    console.log(numero * 2);
}

// Devolve o dobro: quem chama pode guardar, somar, comparar
function dobro(numero) {
    return numero * 2;
}

mostrarLinha();
let resultadoMostrado = mostrarDobro(5);     // aparece 10 no console...
console.log(resultadoMostrado);              // ...mas o valor guardado é undefined
let resultadoDevolvido = dobro(5);
console.log(resultadoDevolvido + 1);         // 11
mostrarLinha();


// -----------------------------------------------------
// 5. Escopo: variável criada dentro da função só existe lá
// -----------------------------------------------------
function calcularVagas(capacidade, alunos) {
    let vagas = capacidade - alunos;         // variável LOCAL
    return vagas;
}

console.log(calcularVagas(30, 25));          // 5
// console.log(vagas);   // ERRO: vagas is not defined (descomente para ver)
