// AULA 13 — lista.js: só a tela da lista.
// Os alunos cadastrados na OUTRA tela aparecem aqui porque o dados.js
// carregou tudo do localStorage ao abrir a página. O textoDoAluno vem do regras.js.

function mostrarLista() {
    let texto = "";
    for (let i = 0; i < alunos.length; i++) {
        texto = texto + (i + 1) + ". " + textoDoAluno(alunos[i]) + "\n";
    }
    if (texto === "") {
        texto = "Nenhum aluno cadastrado.";
    }
    document.querySelector("#lista").textContent = texto;
}

function apagarTodos() {
    if (confirm("Apagar todos os alunos?")) {
        alunos = [];
        salvarDados();
        mostrarLista();
    }
}

document.querySelector("#btn-limpar").addEventListener("click", apagarTodos);

mostrarLista();
