// AULA 13 — cadastro.js: só a tela de cadastro.
// Os dados (alunos) e o salvarDados() vêm do dados.js;
// notaValida() e textoDoAluno() vêm do regras.js.

function mostrarMensagem(texto) {
    document.querySelector("#mensagem").textContent = texto;
}

function cadastrar(evento) {
    evento.preventDefault();

    let nome = document.querySelector("#nome").value.trim();
    let nota = document.querySelector("#nota").value.trim();

    if (nome === "") {
        mostrarMensagem("O nome é obrigatório.");
        return;
    }
    if (notaValida(nota) === false) {
        mostrarMensagem("A nota deve ser um número de 0 a 10.");
        return;
    }

    let novo = { nome: nome, nota: Number(nota) };
    alunos.push(novo);
    salvarDados();                         // salva a cada alteração

    mostrarMensagem("Cadastrado: " + textoDoAluno(novo) + ". Total: " + alunos.length);
    document.querySelector("#form-aluno").reset();
}

document.querySelector("#form-aluno").addEventListener("submit", cadastrar);
