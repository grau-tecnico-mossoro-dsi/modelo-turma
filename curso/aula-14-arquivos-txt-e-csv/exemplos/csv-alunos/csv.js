// AULA 14 — Ler um .csv, calcular e gerar outro .csv

let alunos = [];

// [RECEITA] BAIXAR UM ARQUIVO (a mesma do exemplo baixar-txt)
function baixarArquivo(nomeDoArquivo, conteudo) {
    let arquivo = new Blob(["\uFEFF" + conteudo], { type: "text/plain;charset=utf-8" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = nomeDoArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Texto de um .csv -> lista de objetos, usando o cabeçalho como nome dos campos
function lerCsv(texto) {
    let linhas = texto.replace("\uFEFF", "").trim().split("\n");   // tira o BOM e a linha vazia do fim
    let colunas = linhas[0].trim().split(";");                      // cabeçalho
    let registros = [];
    for (let i = 1; i < linhas.length; i++) {                       // começa em 1: pula o cabeçalho
        let linha = linhas[i].trim();                               // trim tira o \r do Windows
        if (linha !== "") {
            let valores = linha.split(";");
            let registro = {};
            for (let c = 0; c < colunas.length; c++) {
                registro[colunas[c]] = valores[c];                  // objeto[coluna] = valor
            }
            registros.push(registro);
        }
    }
    return registros;
}

// Lista de objetos -> texto .csv, na ordem das colunas pedidas
function gerarCsv(lista, colunas) {
    let texto = colunas.join(";") + "\n";
    for (let i = 0; i < lista.length; i++) {
        let valores = [];
        for (let c = 0; c < colunas.length; c++) {
            valores.push(lista[i][colunas[c]]);
        }
        texto = texto + valores.join(";") + "\n";
    }
    return texto;
}

// O que vem do .csv é TEXTO: Number() antes de fazer conta
function converterAlunos(registros) {
    let lista = [];
    for (let i = 0; i < registros.length; i++) {
        let nota1 = Number(registros[i].nota1);
        let nota2 = Number(registros[i].nota2);
        lista.push({
            nome: registros[i].nome,
            nota1: nota1,
            nota2: nota2,
            media: ((nota1 + nota2) / 2).toFixed(1)
        });
    }
    return lista;
}

function mostrarAlunos() {
    let texto = "";
    for (let i = 0; i < alunos.length; i++) {
        texto = texto + alunos[i].nome.padEnd(8, " ") + " média " + alunos[i].media + "\n";
    }
    document.querySelector("#resultado").textContent = texto;
}

// [RECEITA] ler o arquivo escolhido (await espera a leitura terminar)
async function carregarAlunos(evento) {
    let arquivo = evento.target.files[0];
    if (arquivo === undefined) {
        return;
    }
    let texto = await arquivo.text();
    alunos = converterAlunos(lerCsv(texto));
    mostrarAlunos();
}

function exportarAlunos() {
    if (alunos.length === 0) {
        document.querySelector("#resultado").textContent = "Carregue o alunos.csv primeiro.";
        return;
    }
    let colunas = ["nome", "nota1", "nota2", "media"];
    baixarArquivo("alunos-com-media.csv", gerarCsv(alunos, colunas));
}

document.querySelector("#arquivo").addEventListener("change", carregarAlunos);
document.querySelector("#btn-exportar").addEventListener("click", exportarAlunos);
