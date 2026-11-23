// AULA 14 — Ler um arquivo .txt escolhido pelo usuário

function mostrarResultado(texto) {
    document.querySelector("#resultado").textContent = texto;
}

// [RECEITA] LER O ARQUIVO ESCOLHIDO
// O evento "change" acontece quando a pessoa escolhe o arquivo.
// arquivo.text() demora um pouco (o arquivo precisa ser lido do disco):
// o "await" espera terminar. Toda função que usa await começa com "async".
async function lerArquivo(evento) {
    let arquivo = evento.target.files[0];
    if (arquivo === undefined) {
        return;                                  // a pessoa cancelou a escolha
    }
    let texto = await arquivo.text();

    // daqui para baixo é lógica comum: o arquivo virou um TEXTO
    let linhas = texto.trim().split("\n");
    let naoVazias = 0;
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].trim() !== "") {
            naoVazias = naoVazias + 1;
        }
    }
    mostrarResultado(
        "Arquivo: " + arquivo.name + "\n" +
        "Linhas: " + linhas.length + " (" + naoVazias + " com texto)\n" +
        "Primeira linha: " + linhas[0].trim()
    );
}

document.querySelector("#arquivo").addEventListener("change", lerArquivo);
