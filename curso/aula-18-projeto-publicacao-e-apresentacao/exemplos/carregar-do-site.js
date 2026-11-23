// =====================================================
// EXTRA (aula 18): CARREGAR OS .CSV DIRETO DO SITE PUBLICADO
// Vai no app/importar.js. Usa lerCsv, importarPeloNome e
// mostrarAvisosDeVinculo, que já existem nesse arquivo,
// salvarDados do dados.js e mostrarMensagem do tela.js.
//
// HTML para colocar no app/arquivos.html, abaixo do <input type="file">:
//
//   <button type="button" id="btn-carregar-do-site">Carregar dados do site</button>
//
// ATENÇÃO: o fetch NÃO funciona abrindo o arquivo com dois cliques
// (endereço file:///...). Funciona no Live Server e no GitHub Pages.
// O caminho "../dados/" sobe um nível: as telas ficam em app/ e a
// pasta dados/ fica na pasta do aluno (alunos/<sua-pasta>/). No Live
// Server, abra a sua pasta ou o repositório inteiro (e não só a pasta app/); senão, a
// pasta dados/ fica fora do servidor e o fetch dá 404.
// =====================================================

// [RECEITA] fetch pede um arquivo ao site, do mesmo jeito que o navegador
// pede uma página. O "await" espera a resposta chegar (como na aula 14).
async function carregarDoSite() {
    let nomes = ["laboratorios.csv", "cursos.csv", "turmas.csv", "professores.csv", "reservas.csv"];
    let mensagem = "Carregados do site:";
    for (let i = 0; i < nomes.length; i++) {
        let resposta = await fetch("../dados/" + nomes[i]);
        if (resposta.ok === false) {
            // 404 = arquivo não encontrado (nome ou pasta diferentes)
            mostrarMensagem("#msg-importar", "Não foi possível baixar dados/" + nomes[i] + " (erro " + resposta.status + ").");
            return;
        }
        let texto = await resposta.text();
        let registros = lerCsv(texto);
        importarPeloNome(nomes[i], registros);   // daqui em diante, tudo igual à aula 14
        mensagem = mensagem + " " + nomes[i] + " (" + registros.length + ")";
    }
    salvarDados();
    mostrarMensagem("#msg-importar", mensagem);
    mostrarAvisosDeVinculo();
}

// No fim do importar.js, junto com a outra ligação:
//   document.querySelector("#btn-carregar-do-site").addEventListener("click", carregarDoSite);
