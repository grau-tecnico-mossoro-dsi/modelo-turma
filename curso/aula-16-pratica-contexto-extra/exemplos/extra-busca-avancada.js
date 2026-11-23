// =====================================================
// EXTRA: BUSCA AVANÇADA DE TURMAS
//   1. ignora acentos e maiúsculas ("administracao" acha "Administração")
//   2. combina 2 critérios: parte do nome do curso E turma que cabe em N lugares
//
// EXTRA OPCIONAL: use DEPOIS da integração (aula 17). Os nomes
// de arquivo são os da pasta app/.
//
// HTML para colocar no cadastros.html, na seção de turmas
// (antes do <p id="msg-turmas">):
//
//   <h3>Busca avançada</h3>
//   <p>
//       <label for="av-curso">Parte do nome do curso</label> <input id="av-curso">
//       <label for="av-lugares">Lugares no laboratório</label> <input id="av-lugares" inputmode="numeric">
//       <button type="button" id="btn-busca-avancada">Buscar</button>
//   </p>
// =====================================================


// -----------------------------------------------------
// PARTE 1 - regras.js (pode ser usada por qualquer tela)
// -----------------------------------------------------

// A letra na posição i de COM_ACENTO vira a letra na mesma posição de SEM_ACENTO
const COM_ACENTO = "áàâãäéèêëíìîïóòôõöúùûüç";
const SEM_ACENTO = "aaaaaeeeeiiiiooooouuuuc";

function semAcentos(texto) {
    let minusculo = texto.toLowerCase();
    let resultado = "";
    for (let i = 0; i < minusculo.length; i++) {
        let posicao = COM_ACENTO.indexOf(minusculo[i]);
        if (posicao === -1) {
            resultado = resultado + minusculo[i];
        } else {
            resultado = resultado + SEM_ACENTO[posicao];
        }
    }
    return resultado;
}

// Nome do curso da turma, ou "" se o curso não existe (pode acontecer depois de importar um .csv)
function nomeDoCursoDaTurma(turma) {
    let curso = buscarPorId(cursos, turma.curso);
    if (curso === null) {
        return "";
    }
    return curso.nome;
}


// -----------------------------------------------------
// PARTE 2 - turmas.js
// (textoDaTurma já existe nesse arquivo; mostrarMensagem está no tela.js)
// -----------------------------------------------------
function buscaAvancadaDeTurmas() {
    let procurado = semAcentos(document.querySelector("#av-curso").value.trim());
    let textoLugares = document.querySelector("#av-lugares").value.trim();

    // lugares em branco = qualquer tamanho de turma
    let lugares = MAXIMO_DE_ALUNOS;
    if (textoLugares !== "") {
        if (somenteDigitos(textoLugares) === false) {
            mostrarMensagem("#msg-turmas", "Os lugares devem ser um número.");
            return;
        }
        lugares = Number(textoLugares);
    }

    let texto = "";
    for (let i = 0; i < turmas.length; i++) {
        let cursoSemAcento = semAcentos(nomeDoCursoDaTurma(turmas[i]));
        // os DOIS critérios precisam ser verdadeiros: &&
        if (cursoSemAcento.includes(procurado) && turmas[i].alunos <= lugares) {
            texto = texto + textoDaTurma(turmas[i]) + "\n";
        }
    }
    if (texto === "") {
        texto = "Nenhuma turma encontrada.";
    }
    mostrarMensagem("#msg-turmas", "Busca: curso com \"" + procurado + "\" e até " + lugares + " alunos");
    document.querySelector("#lista-turmas").textContent = texto;
}

// No fim do turmas.js, junto com as outras ligações:
//   document.querySelector("#btn-busca-avancada").addEventListener("click", buscaAvancadaDeTurmas);
