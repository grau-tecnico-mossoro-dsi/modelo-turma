// AULA 13 — Contador de cliques
// querySelector encontra o elemento; textContent troca o texto;
// addEventListener liga o clique a uma função.
// Versão 2: o total fica salvo no localStorage e sobrevive ao F5.

const CHAVE_DO_CONTADOR = "aula13.contador";

let cliques = 0;

function mostrarTotal() {
    document.querySelector("#total").textContent = cliques;
}

function salvarTotal() {
    localStorage.setItem(CHAVE_DO_CONTADOR, String(cliques));
}

function carregarTotal() {
    let texto = localStorage.getItem(CHAVE_DO_CONTADOR);
    if (texto !== null) {          // null = nunca foi salvo
        cliques = Number(texto);
    }
}

function somarUm() {
    cliques = cliques + 1;
    salvarTotal();
    mostrarTotal();
}

function zerar() {
    cliques = 0;
    salvarTotal();
    mostrarTotal();
}

// o NOME da função, sem parênteses: ela roda só quando clicarem
document.querySelector("#btn-mais").addEventListener("click", somarUm);
document.querySelector("#btn-zerar").addEventListener("click", zerar);

carregarTotal();
mostrarTotal();
