// caca-aos-bugs.js: este código TEM 4 BUGS de propósito.
// Nenhum deles é erro de digitação que impede o arquivo de abrir:
// todos aparecem só quando o programa RODA (ou quando você testa).
// Use o console (F12), console.log e o teste de mesa para achar cada um.

let laboratorios = [
    { id: 1, nome: "Eletrotécnica", capacidade: 20 },
    { id: 2, nome: "Informática", capacidade: 30 },
    { id: 3, nome: "Radiologia", capacidade: 15 },
    { id: 4, nome: "Segurança no trabalho", capacidade: 25 },
    { id: 5, nome: "Enfermagem", capacidade: 20 }
];

function mostrarResultado(texto) {
    document.querySelector("#resultado").textContent = texto;
}

// Esperado: 20 + 15 = 35 alunos
function somarTurmas() {
    let turmaA = document.querySelector("#turma-a").value;
    let turmaB = document.querySelector("#turma-b").value;
    let total = turmaA + turmaB;
    mostrarResultado("Total: " + total + " alunos");
}

// Esperado: "Maior: Informática (30 lugares)"
function maiorLaboratorio() {
    let maior = laboratorios[0];
    for (let i = 1; i <= laboratorios.length; i++) {
        if (laboratorios[i].capacidade > maior.capacidade) {
            maior = laboratorios[i];
        }
    }
    mostrarResultado("Maior: " + maior.nome + " (" + maior.capacidade + " lugares)");
}

// Esperado: "Média: 22.0 lugares"
function mediaDeCapacidade() {
    let soma = 0;
    for (let i = 0; i < laboratorios.length; i++) {
        soma = soma + laboratorios[i].capacidade;
    }
    let media = soma / laboratorios.lenght;
    mostrarResultado("Média: " + media.toFixed(1) + " lugares");
}

document.querySelector("#btn-somar").addEventListener("click", somarTurmas);
document.querySelector("#btn-maior").addEventListener("click", maiorLaboratorio);
document.querySelector("#btn-medias").addEventListener("click", mediaDeCapacidade);
