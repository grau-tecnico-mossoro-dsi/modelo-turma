// AULA 14 — Gerar e baixar um arquivo .txt

// [RECEITA] BAIXAR UM ARQUIVO
// Cria um arquivo na memória (Blob), cria um link invisível
// apontando para ele e "clica" no link: o navegador baixa.
// O "\uFEFF" no começo (BOM) avisa ao Excel e ao Bloco de Notas que o texto é UTF-8.
function baixarArquivo(nomeDoArquivo, conteudo) {
    let arquivo = new Blob(["\uFEFF" + conteudo], { type: "text/plain;charset=utf-8" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = nomeDoArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
}

function mostrarMensagem(texto) {
    document.querySelector("#mensagem").textContent = texto;
}

function baixarFrase(evento) {
    evento.preventDefault();
    let frase = document.querySelector("#frase").value.trim();
    if (frase === "") {
        mostrarMensagem("Digite uma frase.");
        return;
    }
    baixarArquivo("frase.txt", frase + "\n");
    mostrarMensagem("Arquivo frase.txt gerado. Confira a pasta Downloads.");
}

// padEnd completa À DIREITA até o tamanho pedido; padStart completa À ESQUERDA.
function baixarTabela() {
    let nomes = ["Ana", "Bruno", "Carla"];
    let notas = [8.5, 10, 7];
    let texto = "ALUNO".padEnd(10, " ") + "NOTA".padStart(6, " ") + "\n";
    texto = texto + "-".repeat(16) + "\n";
    for (let i = 0; i < nomes.length; i++) {
        texto = texto + nomes[i].padEnd(10, ".") + notas[i].toFixed(1).padStart(6, " ") + "\n";
    }
    baixarArquivo("notas.txt", texto);
    mostrarMensagem("Arquivo notas.txt gerado.");
}

document.querySelector("#form-frase").addEventListener("submit", baixarFrase);
document.querySelector("#btn-tabela").addEventListener("click", baixarTabela);
