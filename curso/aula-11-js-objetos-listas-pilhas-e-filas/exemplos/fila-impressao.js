// =====================================================
// AULA 11 — FILA (FIFO: o primeiro que entra é o primeiro que sai)
// Exemplo: a fila de impressão do laboratório.
// Rode no console do navegador (F12) ou no terminal: node fila-impressao.js
// =====================================================

let filaDeImpressao = [];

function mostrarFila() {
    let nomes = [];
    for (let i = 0; i < filaDeImpressao.length; i++) {
        nomes.push(filaDeImpressao[i].arquivo);
    }
    console.log("   fila (começo à esquerda): [" + nomes.join(" | ") + "]");
}

function enviarParaImprimir(aluno, arquivo, paginas) {
    filaDeImpressao.push({ aluno: aluno, arquivo: arquivo, paginas: paginas });   // entra no FIM
    console.log(aluno + " enviou " + arquivo + ". Posição na fila: " + filaDeImpressao.length + "º");
    mostrarFila();
}

function imprimirProximo() {
    if (filaDeImpressao.length === 0) {
        console.log("A fila está vazia.");
        return;
    }
    let documento = filaDeImpressao.shift();   // sai do COMEÇO
    console.log("Imprimindo " + documento.arquivo + " (" + documento.paginas + " páginas) de " + documento.aluno);
    mostrarFila();
}

enviarParaImprimir("Ana", "trabalho.pdf", 3);
enviarParaImprimir("Bruno", "relatorio.pdf", 10);
enviarParaImprimir("Carla", "fluxograma.png", 1);
imprimirProximo();
enviarParaImprimir("Diego", "prova.pdf", 2);
imprimirProximo();
imprimirProximo();
imprimirProximo();
imprimirProximo();
