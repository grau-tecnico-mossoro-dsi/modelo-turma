// =====================================================
// AULA 9 — Exemplos clássicos: decisões e laços
// Ainda sem funções próprias e sem arrays.
// =====================================================


// -----------------------------------------------------
// 1. Aprovado / recuperação / reprovado (if, else if, else)
// -----------------------------------------------------
let media = Number(prompt("Média final do aluno (0 a 10):"));

if (isNaN(media)) {
    alert("Isso não é um número.");
} else if (media >= 7) {
    alert("Aprovado");
} else if (media >= 5) {
    alert("Recuperação");
} else {
    alert("Reprovado");
}


// -----------------------------------------------------
// 2. Dia da semana (switch)
// -----------------------------------------------------
let numeroDoDia = Number(prompt("Número do dia (1 = segunda ... 5 = sexta):"));
let nomeDoDia = "";

switch (numeroDoDia) {
    case 1:
        nomeDoDia = "Segunda";
        break;
    case 2:
        nomeDoDia = "Terça";
        break;
    case 3:
        nomeDoDia = "Quarta";
        break;
    case 4:
        nomeDoDia = "Quinta";
        break;
    case 5:
        nomeDoDia = "Sexta";
        break;
    default:
        nomeDoDia = "Dia inválido";
}
console.log(nomeDoDia);


// -----------------------------------------------------
// 3. Tabuada (for)
// -----------------------------------------------------
let numeroDaTabuada = Number(prompt("Tabuada de qual número?"));
let tabuada = "";
for (let i = 1; i <= 10; i++) {
    tabuada = tabuada + numeroDaTabuada + " x " + i + " = " + (numeroDaTabuada * i) + "\n";
}
alert(tabuada);


// -----------------------------------------------------
// 4. Adivinhe o número (while + null do Cancelar)
// Math.random() é receita: sorteia um número de 1 a 10.
// -----------------------------------------------------
const SEGREDO = Math.floor(Math.random() * 10) + 1;
let palpite = 0;
let tentativas = 0;
let desistiu = false;

while (palpite !== SEGREDO && desistiu === false) {
    let resposta = prompt("Adivinhe o número (1 a 10):");
    if (resposta === null) {
        desistiu = true;
    } else {
        palpite = Number(resposta);
        tentativas++;
        if (palpite > SEGREDO) {
            alert("Alto demais.");
        } else if (palpite < SEGREDO) {
            alert("Baixo demais.");
        }
    }
}

if (desistiu) {
    alert("Você desistiu. O número era " + SEGREDO + ".");
} else {
    alert("Acertou em " + tentativas + " tentativa(s)!");
}


// -----------------------------------------------------
// 5. Média de N notas (contador + acumulador, do...while)
// -----------------------------------------------------
let quantidade = 0;
do {
    quantidade = Number(prompt("Quantas notas? (1 a 10)"));
    if (isNaN(quantidade) || quantidade < 1 || quantidade > 10) {
        alert("Digite um número de 1 a 10.");
    }
} while (isNaN(quantidade) || quantidade < 1 || quantidade > 10);

let soma = 0;
for (let i = 1; i <= quantidade; i++) {
    let nota = Number(prompt("Nota " + i + ":"));
    soma = soma + nota;
}
alert("Média: " + (soma / quantidade).toFixed(1));
