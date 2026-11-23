// AULA 13 — Conversor de temperatura com <select>
// O .value do select é o value da <option> escolhida.

function celsiusParaFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function fahrenheitParaCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function converter(evento) {
    evento.preventDefault();

    let texto = document.querySelector("#valor").value.trim();
    let direcao = document.querySelector("#direcao").value;
    let resultado = document.querySelector("#resultado");

    if (texto === "" || isNaN(Number(texto))) {
        resultado.textContent = "Digite uma temperatura válida.";
        return;
    }
    let valor = Number(texto);
    if (direcao === "CF") {
        resultado.textContent = valor + " °C = " + celsiusParaFahrenheit(valor).toFixed(1) + " °F";
    } else {
        resultado.textContent = valor + " °F = " + fahrenheitParaCelsius(valor).toFixed(1) + " °C";
    }
}

document.querySelector("#form-conversor").addEventListener("submit", converter);
