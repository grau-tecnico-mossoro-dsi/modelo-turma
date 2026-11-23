// =====================================================
// AULA 12 — Matriz (array de arrays) e laço aninhado
// Rode no console do navegador (F12) ou no terminal: node matriz-notas-e-tabuada.js
// =====================================================

// 1) Matriz de notas: 3 alunos (linhas) x 4 bimestres (colunas)
let alunos = ["Ana", "Bruno", "Carla"];
let notas = [
    [8.0, 7.5, 9.0, 6.5],    // linha 0: Ana
    [5.5, 6.0, 7.0, 8.0],    // linha 1: Bruno
    [9.5, 9.0, 10.0, 9.0]    // linha 2: Carla
];

console.log("Nota do Bruno no 3º bimestre: " + notas[1][2]);   // linha 1, coluna 2

// Média de cada aluno: laço de fora = linhas, laço de dentro = colunas
for (let linha = 0; linha < notas.length; linha++) {
    let soma = 0;                                   // zera a cada aluno
    for (let coluna = 0; coluna < notas[linha].length; coluna++) {
        soma = soma + notas[linha][coluna];
    }
    let media = soma / notas[linha].length;
    console.log(alunos[linha] + ": média " + media.toFixed(1));
}

// Média de cada bimestre: agora o laço de fora percorre as COLUNAS
for (let coluna = 0; coluna < notas[0].length; coluna++) {
    let soma = 0;
    for (let linha = 0; linha < notas.length; linha++) {
        soma = soma + notas[linha][coluna];
    }
    console.log((coluna + 1) + "º bimestre: média " + (soma / notas.length).toFixed(1));
}


// 2) Tabuada em matriz: tabuada[i][j] guarda (i + 1) * (j + 1)
let tabuada = [];
for (let i = 0; i < 5; i++) {
    let novaLinha = [];                             // cada linha nasce com o seu próprio []
    for (let j = 0; j < 5; j++) {
        novaLinha.push((i + 1) * (j + 1));
    }
    tabuada.push(novaLinha);
}

for (let i = 0; i < tabuada.length; i++) {
    let texto = "";
    for (let j = 0; j < tabuada[i].length; j++) {
        texto = texto + String(tabuada[i][j]).padStart(4, " ");
    }
    console.log(texto);
}
console.log("3 x 4 = " + tabuada[2][3]);
