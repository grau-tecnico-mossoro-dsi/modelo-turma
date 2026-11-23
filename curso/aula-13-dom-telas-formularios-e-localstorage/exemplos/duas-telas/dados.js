// AULA 13 — dados.js: carregado em TODAS as telas, PRIMEIRO.
// Aqui ficam os dados e o salvamento no navegador (localStorage).

const CHAVE_DO_NAVEGADOR = "aula13.alunos";

let alunos = [];

// [RECEITA] o localStorage só guarda TEXTO:
// JSON.stringify transforma a lista em texto; JSON.parse faz o caminho de volta.
function salvarDados() {
    localStorage.setItem(CHAVE_DO_NAVEGADOR, JSON.stringify(alunos));
}

function carregarDados() {
    let texto = localStorage.getItem(CHAVE_DO_NAVEGADOR);
    if (texto === null) {      // primeira vez: nada salvo ainda
        alunos = [];
        return;
    }
    alunos = JSON.parse(texto);
}

// toda tela começa carregando o que estava salvo
carregarDados();
