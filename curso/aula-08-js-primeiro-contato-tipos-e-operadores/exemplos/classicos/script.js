// =====================================================
// AULA 8 — Exemplos clássicos (código sequencial)
// Abra o console (F12) para ver os console.log.
// =====================================================


// -----------------------------------------------------
// 1. Olá, nome
// -----------------------------------------------------
let nome = prompt("Qual é o seu nome?");
alert("Olá, " + nome + "!");
console.log("Nome digitado:", nome);


// -----------------------------------------------------
// 2. Soma de dois números e o bug "2" + "3" = "23"
// -----------------------------------------------------
let primeiroTexto = prompt("Digite um número:");
let segundoTexto = prompt("Digite outro número:");

// prompt SEMPRE devolve texto (string): o + junta os textos
console.log("Com o bug:", primeiroTexto + segundoTexto);
console.log("Tipo do que o prompt devolve:", typeof primeiroTexto);

// Number() converte o texto em número: agora o + soma
let primeiroNumero = Number(primeiroTexto);
let segundoNumero = Number(segundoTexto);
let soma = primeiroNumero + segundoNumero;
console.log("Sem o bug:", soma);
alert("A soma é " + soma);


// -----------------------------------------------------
// 3. Par ou ímpar com % (resto da divisão)
// Ainda sem if (aula 9): mostramos o resto e um true/false
// -----------------------------------------------------
let numero = Number(prompt("Digite um número inteiro:"));
let resto = numero % 2;
let ehPar = resto === 0;
console.log(numero + " % 2 = " + resto);
console.log(numero + " é par? " + ehPar);


// -----------------------------------------------------
// 4. IMC = peso / (altura * altura)
// -----------------------------------------------------
let peso = Number(prompt("Peso em kg (ex.: 70.5):"));
let altura = Number(prompt("Altura em metros (ex.: 1.75):"));
let imc = peso / (altura * altura);
console.log("IMC sem arredondar:", imc);
alert("Seu IMC é " + imc.toFixed(1));

// A mesma frase com template string (crase e ${ }):
console.log(`Seu IMC é ${imc.toFixed(1)}`);


// -----------------------------------------------------
// 5. typeof: perguntando o tipo de cada valor
// -----------------------------------------------------
console.log(typeof "Carla");     // string
console.log(typeof 30);          // number
console.log(typeof 7.5);         // number
console.log(typeof true);        // boolean
console.log(typeof Number("abc"), Number("abc"));   // number NaN
