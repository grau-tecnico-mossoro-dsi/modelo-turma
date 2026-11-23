// =====================================================
// AULA 11 — Objetos e array de objetos
// Rode no console do navegador (F12) ou no terminal: node objetos-e-lista-de-contatos.js
// =====================================================

// 1) UM objeto: várias informações sobre a mesma coisa
let aluno = { nome: "Ana", nota: 8.5, turma: "DSW-1A" };

console.log(aluno.nome);        // Ana   (acesso com ponto)
console.log(aluno["nota"]);     // 8.5   (acesso com colchetes)

aluno.nota = 9;                 // altera uma propriedade
aluno.situacao = "Aprovada";    // cria uma propriedade nova
console.log(aluno);
console.log(aluno.email);       // undefined: essa propriedade não existe


// 2) Colchetes com uma VARIÁVEL: o nome do campo vem de fora
let campos = ["nome", "nota", "turma"];
for (let i = 0; i < campos.length; i++) {
    let campo = campos[i];
    console.log(campo + ": " + aluno[campo]);
}


// 3) Array de objetos: uma lista de contatos
let contatos = [
    { nome: "Bruno", telefone: "99999-1111" },
    { nome: "Carla", telefone: "99999-2222" },
    { nome: "Diego", telefone: "99999-3333" }
];

// LISTA: inserir no fim
contatos.push({ nome: "Elisa", telefone: "99999-4444" });

// LISTA: mostrar numerado
function listarContatos() {
    for (let i = 0; i < contatos.length; i++) {
        console.log((i + 1) + ". " + contatos[i].nome + " - " + contatos[i].telefone);
    }
}

// LISTA: buscar (devolve o OBJETO ou null)
function buscarContato(nome) {
    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].nome === nome) {
            return contatos[i];
        }
    }
    return null;
}

// LISTA: remover pela posição
function removerContato(posicao) {
    contatos.splice(posicao, 1);
}

listarContatos();

let carla = buscarContato("Carla");
carla.telefone = "98888-0000";      // altera o objeto que ESTÁ na lista
console.log("Depois de alterar a Carla:");
listarContatos();

removerContato(0);                  // remove o Bruno
console.log("Depois de remover o primeiro:");
listarContatos();

console.log(buscarContato("Zeca"));  // null
