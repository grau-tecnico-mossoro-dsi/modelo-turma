// =====================================================
// RESERVA DE LABORATÓRIOS — CHECKPOINT 3 (aula 10)
// Conteúdo usado até aqui: variáveis, operadores, if/else,
// switch, laços, arrays e funções.
// Ainda NÃO usamos objetos (eles chegam na aula 11), por isso
// cada informação do curso fica num array separado.
// =====================================================


// -----------------------------------------------------
// DADOS: um array para cada informação (arrays "paralelos")
// A posição 0 de todos os arrays é o mesmo curso.
// -----------------------------------------------------

// Laboratórios são espaços físicos: o sistema só mostra, não cadastra.
let nomesDosLaboratorios = ["Eletrotécnica", "Informática", "Radiologia", "Segurança no trabalho", "Enfermagem"];
let capacidadesDosLaboratorios = [20, 30, 15, 25, 20];

let idsDosCursos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let siglasDosCursos = ["ADM", "BCV", "DSI", "EIC", "ELP", "ELT", "ENF", "FLB", "RAD", "SEG"];
let nomesDosCursos = [
    "Administração", "BCV", "Desenvolvimento de sistemas", "EIC", "ELP",
    "Eletrotécnica", "Enfermagem", "FLB", "Radiologia", "Segurança no trabalho"
];
let proximoIdCurso = 11;


// -----------------------------------------------------
// FUNÇÕES DE PERGUNTA (aula 10): recebem um valor e respondem
// true ou false. Não usam prompt nem alert.
// A leitura com do...while continua no código que chama.
// -----------------------------------------------------

// Confere se o texto tem só números (desafio da aula 9).
function somenteDigitos(texto) {
    if (texto === "") {
        return false;
    }
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        if (letra < "0" || letra > "9") {
            return false;
        }
    }
    return true;
}

// Confere se o número está entre o mínimo e o máximo.
function estaNaFaixa(numero, minimo, maximo) {
    return numero >= minimo && numero <= maximo;
}

// Busca linear: alguma OUTRA posição já usa essa sigla?
// posicaoIgnorada = -1 no cadastro; no alterar, é a posição do próprio curso.
function siglaJaExiste(sigla, posicaoIgnorada) {
    for (let i = 0; i < siglasDosCursos.length; i++) {
        if (i !== posicaoIgnorada && siglasDosCursos[i] === sigla.toUpperCase()) {
            return true;
        }
    }
    return false;
}


// -----------------------------------------------------
// LABORATÓRIOS (só listar)
// -----------------------------------------------------
function listarLaboratorios() {
    let texto = "";
    for (let i = 0; i < nomesDosLaboratorios.length; i++) {
        texto = texto + (i + 1) + ". " + nomesDosLaboratorios[i] + " - " + capacidadesDosLaboratorios[i] + " lugares\n";
    }
    alert("LABORATÓRIOS\n\n" + texto);
}


// -----------------------------------------------------
// CURSOS (aula 10)
// -----------------------------------------------------

// Monta o texto de um curso a partir da posição dele.
function textoDoCurso(posicao) {
    return siglasDosCursos[posicao] + " - " + nomesDosCursos[posicao];
}

// Monta a lista numerada de TODOS os cursos.
function listaDeCursos() {
    let texto = "";
    for (let i = 0; i < siglasDosCursos.length; i++) {
        texto = texto + (i + 1) + ". " + textoDoCurso(i) + "\n";
    }
    return texto;
}

function listarCursos() {
    if (siglasDosCursos.length === 0) {
        alert("Nenhum curso cadastrado.");
    } else {
        alert("CURSOS\n\n" + listaDeCursos());
    }
}

// Mostra a lista numerada e devolve a POSIÇÃO escolhida (ou -1 se cancelar).
function escolherCurso(pergunta) {
    let numero = 0;
    let cancelou = false;
    do {
        let resposta = prompt(pergunta + "\n\n" + listaDeCursos());
        if (resposta === null) {
            cancelou = true;
        } else if (somenteDigitos(resposta.trim()) === false) {
            alert("Digite apenas números.");
        } else if (estaNaFaixa(Number(resposta), 1, siglasDosCursos.length) === false) {
            alert("Escolha de 1 a " + siglasDosCursos.length + ".");
        } else {
            numero = Number(resposta);
        }
    } while (numero === 0 && cancelou === false);   // repete enquanto não escolheu e não cancelou
    if (cancelou === true) {
        return -1;
    }
    return numero - 1;
}

function cadastrarCurso() {
    let cancelou = false;

    let sigla = "";
    do {
        let resposta = prompt("Sigla do curso (ex.: ADM):");
        if (resposta === null) {
            cancelou = true;
        } else if (resposta.trim() === "") {
            alert("A sigla é obrigatória.");
        } else if (siglaJaExiste(resposta.trim(), -1)) {
            alert("A sigla " + resposta.trim().toUpperCase() + " já existe.");
        } else {
            sigla = resposta.trim().toUpperCase();
        }
    } while (sigla === "" && cancelou === false);
    if (cancelou === true) {
        return;
    }

    let nome = "";
    do {
        let resposta = prompt("Nome do curso:");
        if (resposta === null) {
            cancelou = true;
        } else if (resposta.trim() === "") {
            alert("O nome é obrigatório.");
        } else {
            nome = resposta.trim();
        }
    } while (nome === "" && cancelou === false);
    if (cancelou === true) {
        return;
    }

    idsDosCursos.push(proximoIdCurso);
    siglasDosCursos.push(sigla);
    nomesDosCursos.push(nome);
    proximoIdCurso = proximoIdCurso + 1;
    alert("Curso cadastrado: " + sigla + " - " + nome);
}

// Alterar: em branco = mantém o valor atual. O id não muda.
function alterarCurso() {
    if (siglasDosCursos.length === 0) {
        alert("Nenhum curso cadastrado.");
        return;
    }
    let posicao = escolherCurso("Qual curso deseja alterar?");
    if (posicao === -1) {
        return;
    }

    let cancelou = false;
    let sigla = "";
    do {
        let resposta = prompt("Nova sigla (em branco = manter " + siglasDosCursos[posicao] + "):");
        if (resposta === null) {
            cancelou = true;
        } else if (resposta.trim() === "") {
            sigla = siglasDosCursos[posicao];
        } else if (siglaJaExiste(resposta.trim(), posicao)) {
            alert("A sigla " + resposta.trim().toUpperCase() + " já existe.");
        } else {
            sigla = resposta.trim().toUpperCase();
        }
    } while (sigla === "" && cancelou === false);
    if (cancelou === true) {
        return;
    }

    let nome = prompt("Novo nome (em branco = manter " + nomesDosCursos[posicao] + "):");
    if (nome === null) {
        return;
    }
    if (nome.trim() === "") {
        nome = nomesDosCursos[posicao];
    }

    siglasDosCursos[posicao] = sigla;
    nomesDosCursos[posicao] = nome.trim();
    alert("Curso alterado: " + textoDoCurso(posicao));
}

// Busca por sigla ou parte do nome: "admin" encontra "Administração".
function buscarCurso() {
    let procurado = "";
    let cancelou = false;
    do {
        let resposta = prompt("Sigla ou parte do nome:");
        if (resposta === null) {
            cancelou = true;
        } else if (resposta.trim() === "") {
            alert("Digite o que deseja procurar.");
        } else {
            procurado = resposta.trim().toLowerCase();
        }
    } while (procurado === "" && cancelou === false);
    if (cancelou === true) {
        return;
    }

    let resultado = "";
    for (let i = 0; i < siglasDosCursos.length; i++) {
        let achouNaSigla = siglasDosCursos[i].toLowerCase() === procurado;
        let achouNoNome = nomesDosCursos[i].toLowerCase().includes(procurado);
        if (achouNaSigla || achouNoNome) {
            resultado = resultado + (i + 1) + ". " + textoDoCurso(i) + "\n";
        }
    }
    if (resultado === "") {
        alert("Nenhum curso encontrado.");
    } else {
        alert("RESULTADO DA BUSCA\n\n" + resultado);
    }
}

// Excluir: mostra a lista, o usuário escolhe o número e confirma.
function excluirCurso() {
    if (siglasDosCursos.length === 0) {
        alert("Nenhum curso cadastrado.");
        return;
    }
    let posicao = escolherCurso("Qual curso deseja excluir?");
    if (posicao === -1) {
        return;
    }
    if (confirm("Excluir " + textoDoCurso(posicao) + "?")) {
        // splice(posição, 1) remove 1 item; precisa ser feito nos 3 arrays
        idsDosCursos.splice(posicao, 1);
        siglasDosCursos.splice(posicao, 1);
        nomesDosCursos.splice(posicao, 1);
        alert("Curso excluído com sucesso.");
    }
}


// -----------------------------------------------------
// MENU PRINCIPAL (aula 9): Cancelar no menu = Sair
// -----------------------------------------------------
function menuPrincipal() {
    let textoDoMenu =
        "RESERVA DE LABORATÓRIOS\n\n" +
        "1 - Cadastrar curso\n" +
        "2 - Listar cursos\n" +
        "3 - Buscar curso\n" +
        "4 - Alterar curso\n" +
        "5 - Excluir curso\n" +
        "6 - Listar laboratórios\n" +
        "7 - Sair";
    let opcao = 0;
    do {
        opcao = 0;
        let cancelou = false;
        do {
            let resposta = prompt(textoDoMenu);
            if (resposta === null) {
                cancelou = true;
            } else if (somenteDigitos(resposta.trim()) === false) {
                alert("Digite apenas números.");
            } else if (estaNaFaixa(Number(resposta), 1, 7) === false) {
                alert("Opção inválida. Escolha de 1 a 7.");
            } else {
                opcao = Number(resposta);
            }
        } while (opcao === 0 && cancelou === false);
        if (cancelou === true) {
            opcao = 7;
        }

        switch (opcao) {
            case 1:
                cadastrarCurso();
                break;
            case 2:
                listarCursos();
                break;
            case 3:
                buscarCurso();
                break;
            case 4:
                alterarCurso();
                break;
            case 5:
                excluirCurso();
                break;
            case 6:
                listarLaboratorios();
                break;
        }
    } while (opcao !== 7);
    alert("Até logo!");
}

menuPrincipal();
