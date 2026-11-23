// AULA 16 (prévia na pasta da aula 13) — Um <select> que muda outro <select> (evento "change").
// Escolheu o curso: a lista de turmas mostra só as turmas DAQUELE curso.
// É o mesmo passo curso -> turma do microprojeto M7 (nova reserva).

let cursos = [
    { id: 1, sigla: "ADM", nome: "Administração" },
    { id: 3, sigla: "DSI", nome: "Desenvolvimento de sistemas" },
    { id: 2, sigla: "BCV", nome: "BCV" }
];

let turmas = [
    { id: 1, nome: "ADM09", curso: 1, alunos: 28 },
    { id: 2, nome: "ADM10", curso: 1, alunos: 25 },
    { id: 6, nome: "DSI02", curso: 3, alunos: 24 }
];

// [RECEITA] cria um <option> e coloca dentro do <select>
function adicionarOpcao(select, valor, texto) {
    let opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = texto;
    select.appendChild(opcao);
}

function turmasDoCurso(idCurso) {
    let encontradas = [];
    for (let i = 0; i < turmas.length; i++) {
        if (turmas[i].curso === idCurso) {
            encontradas.push(turmas[i]);
        }
    }
    return encontradas;
}

function preencherCursos() {
    let select = document.querySelector("#curso");
    for (let i = 0; i < cursos.length; i++) {
        adicionarOpcao(select, cursos[i].id, cursos[i].sigla + " - " + cursos[i].nome);
    }
}

// Roda de novo toda vez que o curso muda
function preencherTurmas() {
    let select = document.querySelector("#turma");
    select.textContent = "";   // apaga as opções antigas
    let lista = turmasDoCurso(Number(document.querySelector("#curso").value));   // .value é texto
    if (lista.length === 0) {
        adicionarOpcao(select, "", "(nenhuma turma neste curso)");
    }
    for (let i = 0; i < lista.length; i++) {
        adicionarOpcao(select, lista[i].id, lista[i].nome + " (" + lista[i].alunos + " alunos)");
    }
}

function confirmar(evento) {
    evento.preventDefault();
    let turma = document.querySelector("#turma").value;
    if (turma === "") {
        document.querySelector("#mensagem").textContent = "Este curso não tem turmas.";
        return;
    }
    document.querySelector("#mensagem").textContent = "Escolhida a turma de id " + turma + ".";
}

document.querySelector("#curso").addEventListener("change", preencherTurmas);
document.querySelector("#form-escolha").addEventListener("submit", confirmar);

preencherCursos();
preencherTurmas();   // primeira vez: as turmas do curso que já aparece escolhido
