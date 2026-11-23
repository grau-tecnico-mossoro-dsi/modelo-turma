// =====================================================
// AULA 11 — PILHA (LIFO: o último que entra é o primeiro que sai)
// Exemplo: o "desfazer" (Ctrl+Z) de um editor de texto.
// Rode no console do navegador (F12) ou no terminal: node pilha-desfazer.js
// =====================================================

let texto = "";
let historico = [];   // PILHA: guarda como o texto estava ANTES de cada mudança

function mostrarPilha() {
    let desenho = "";
    for (let i = 0; i < historico.length; i++) {
        desenho = desenho + "['" + historico[i] + "'] ";
    }
    console.log("   pilha (topo à direita): " + desenho);
}

function digitar(palavra) {
    historico.push(texto);          // empilha o estado antigo (push = coloca no topo)
    texto = texto + palavra;
    console.log("digitou '" + palavra + "' -> texto: '" + texto + "'");
    mostrarPilha();
}

function desfazer() {
    if (historico.length === 0) {
        console.log("Nada para desfazer.");
        return;
    }
    texto = historico.pop();        // desempilha (pop = tira do topo)
    console.log("desfez -> texto: '" + texto + "'");
    mostrarPilha();
}

digitar("Olá");
digitar(", turma");
digitar("!");
desfazer();
desfazer();
desfazer();
desfazer();
