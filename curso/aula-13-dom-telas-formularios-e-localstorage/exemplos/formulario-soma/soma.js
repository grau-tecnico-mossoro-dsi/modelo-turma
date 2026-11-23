// AULA 13 — Formulário de soma
// O .value de um input é SEMPRE texto: Number() antes de somar.
// O submit recarrega a página; preventDefault() impede isso.

function mostrarResultado(texto) {
    document.querySelector("#resultado").textContent = texto;
}

function somar(evento) {
    evento.preventDefault();   // sem isso a página recarrega e o resultado some

    let texto1 = document.querySelector("#numero1").value.trim();
    let texto2 = document.querySelector("#numero2").value.trim();

    if (texto1 === "" || texto2 === "") {
        mostrarResultado("Preencha os dois números.");
        return;
    }
    let numero1 = Number(texto1);
    let numero2 = Number(texto2);
    if (isNaN(numero1) || isNaN(numero2)) {
        mostrarResultado("Digite apenas números.");
        return;
    }
    mostrarResultado(numero1 + " + " + numero2 + " = " + (numero1 + numero2));
}

document.querySelector("#form-soma").addEventListener("submit", somar);
