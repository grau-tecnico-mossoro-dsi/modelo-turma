// AULA 13 — regras.js: carregado em TODAS as telas, DEPOIS do dados.js
// e ANTES do script da tela. Aqui ficam as regras, que não mexem na tela:
// recebem valores e DEVOLVEM respostas.

// Nota: texto com um número de 0 a 10
function notaValida(texto) {
    return texto !== "" && isNaN(Number(texto)) === false && Number(texto) >= 0 && Number(texto) <= 10;
}

function textoDoAluno(aluno) {
    return aluno.nome + " - nota " + aluno.nota;
}
