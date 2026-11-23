**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-07-visualg-procedimentos-e-funcoes/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-09-js-decisoes-e-lacos/README.md)

---

# AULA 8 — JavaScript: primeiro contato, tipos e operadores

## Objetivos da aula

- Saber o que é JavaScript, de onde ele veio e onde ele roda;
- Rodar JavaScript no navegador com um `index.html` (pronto) e um `script.js` com `defer`;
- Usar o **console** (F12) para ver resultados e erros;
- Conversar com o usuário com `prompt`, `alert` e `confirm`;
- Declarar variáveis com `let` e constantes com `const`;
- Reconhecer os tipos `string`, `number` e `boolean` com `typeof`;
- Converter texto em número com `Number()` e entender o bug `"2" + "3" = "23"`;
- Usar os operadores aritméticos, de atribuição, de comparação e lógicos;
- Traduzir para JS o cadastro de uma turma e a reserva simples da aula 4 (lugares que sobram e % de ocupação).

## 8.1 Do Portugol para uma linguagem de verdade

Até aqui você escreveu algoritmos em Portugol, que só roda no VisualG. A partir de hoje, a lógica é a **mesma**, mas a linguagem é o **JavaScript** (JS), que roda em qualquer navegador do mundo.

Um pouco de história, bem curta:

- **1995:** Brendan Eich cria o JavaScript em cerca de 10 dias, na Netscape, para deixar as páginas da web "vivas" (responder a cliques, validar formulários);
- o nome "Java" foi marketing: **JavaScript não é Java**. São linguagens diferentes (Java você vê em POO);
- hoje o JS roda **no navegador** (Chrome, Edge, Firefox), **no servidor** (Node.js) e até em aplicativos de celular.

Lembra da aula 1? O JS é uma linguagem **interpretada**: o navegador lê o código e executa linha por linha, sem um passo separado de compilação. Por isso basta salvar o arquivo e recarregar a página.

## 8.2 Onde o JS roda: `index.html` + `script.js`

Neste curso, o HTML vem **pronto**. Você só escreve o `script.js`. No repositório da turma, a sua pasta fica assim:

```
alunos/joao-lucas/
├── README.md
├── portugol/
│   └── reserva-laboratorio.alg
├── prompt/
│   ├── index.html  ← entregue pronto (a "casca" da página)
│   └── script.js   ← o SEU código
└── dados/
    ├── laboratorios.csv
    └── cursos.csv
```

O `index.html` vem de `projeto/para-os-alunos/prompt/`, no repositório da turma. Você copia esse arquivo para a sua pasta e **não** mexe no original.

O `index.html` entregue:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Reserva de Laboratórios</title>
    <script src="script.js" defer></script>
</head>
<body>
    <h1>Reserva de Laboratórios</h1>
    <p>O sistema funciona pelas janelas do navegador. Para abrir de novo, recarregue a página (F5).</p>
</body>
</html>
```

A linha que importa hoje é esta:

```html
<script src="script.js" defer></script>
```

- `src="script.js"`: o navegador busca o arquivo `script.js` na **mesma pasta**;
- `defer`: "espere a página terminar de carregar e **só então** rode o script". Sem o `defer`, o script rodaria antes do título aparecer na tela.

Para abrir: dê dois cliques no `index.html` ou, no VS Code, use a extensão **Live Server** (botão "Go Live"). Com o Live Server, a página recarrega sozinha a cada vez que você salva.

## 8.3 O console (F12): a janela do programador

Aperte **F12** no navegador e clique na aba **Console**. É ali que o JS mostra mensagens para **você** (o usuário da página não vê).

```javascript
console.log("Olá, console!");
console.log("Capacidade:", 30);       // vários valores separados por vírgula
```

O console também mostra os **erros**, em vermelho, com o nome do arquivo e a linha:

```
Uncaught ReferenceError: capacidad is not defined     script.js:12
```

Leia a mensagem com calma: ela diz **o que** (uma variável `capacidad` não existe: erro de digitação) e **onde** (linha 12). O console é o seu melhor amigo daqui até o fim do curso.

Dica: você pode digitar JS direto no console e apertar Enter, como uma calculadora: `2 + 3`, `typeof "oi"`.

## 8.4 `prompt`, `alert` e `confirm`: o `leia` e o `escreva` do navegador

| Portugol | JavaScript | O que faz |
|---|---|---|
| `leia(nome)` | `nome = prompt("Nome:")` | Abre uma janela com uma pergunta e devolve o que foi digitado |
| `escreval("Olá")` | `alert("Olá")` | Abre uma janela com uma mensagem |
| — | `resposta = confirm("Confirmar?")` | Abre uma janela com OK e Cancelar; devolve `true` ou `false` |
| `escreval(x)` (para conferir) | `console.log(x)` | Escreve no console (F12) |

```javascript
let nome = prompt("Qual é o seu nome?");
alert("Olá, " + nome + "!");

let querContinuar = confirm("Deseja continuar?");
console.log(querContinuar);        // true (OK) ou false (Cancelar)
```

Duas diferenças em relação ao Portugol:

- o `prompt` **mostra a pergunta** na própria janela (no VisualG, era um `escreval` antes do `leia`);
- o `prompt` **sempre devolve texto**, mesmo quando o usuário digita um número. Guarde isso: é o assunto da seção 8.7.

## 8.5 `let` e `const`: variáveis e constantes

No VisualG, toda variável era declarada no `var`, com o tipo. No JS, declaramos **onde for usar**, e **sem dizer o tipo**:

```
 PORTUGOL                                  JAVASCRIPT
 var                                       let nome = "Informática";
    nome: caractere                        let capacidade = 30;
    capacidade: inteiro
 inicio
    nome <- "Informática"
    capacidade <- 30
```

- **`let`**: variável. O valor pode mudar depois (`capacidade = 32;`);
- **`const`**: constante. O valor é definido uma vez e **não muda**. Tentar mudar dá erro.

```javascript
const MAXIMO_DE_ALUNOS = 60;
const SABADO = 6;
MAXIMO_DE_ALUNOS = 70;       // ERRO: Assignment to constant variable.
```

Por convenção, constantes com regras do sistema são escritas em **MAIÚSCULAS_COM_SUBLINHADO**. Elas evitam "números mágicos": `dia !== SABADO` explica o que `dia !== 6` não explica.

Outros detalhes da sintaxe:

- `=` é a **atribuição** (o `<-` do Portugol);
- cada instrução termina com `;`;
- comentários: `// até o fim da linha`, igual ao VisualG;
- maiúsculas e minúsculas são **diferentes**: `nome` e `Nome` são duas variáveis.

> Você pode encontrar `var` em códigos antigos da internet. Não use: `let` e `const` são o jeito atual.

## 8.6 Tipos: `string`, `number`, `boolean`

| Portugol | JavaScript | Exemplos |
|---|---|---|
| `caractere` | `string` (texto) | `"Carla"`, `'ADM09'`, `""` (texto vazio) |
| `inteiro` e `real` | `number` (um tipo só!) | `30`, `7.5`, `-2` |
| `logico` | `boolean` | `true`, `false` |

O JS descobre o tipo pelo **valor**. Para perguntar o tipo, use `typeof`:

```javascript
console.log(typeof "Carla");    // "string"
console.log(typeof 30);         // "number"
console.log(typeof 7.5);        // "number"
console.log(typeof true);       // "boolean"
console.log(typeof "30");       // "string"  ← entre aspas é texto!
```

Cuidado com a última linha: `30` é número; `"30"` é texto. Na tela, os dois parecem iguais.

Repare também: no JS, o número decimal usa **ponto** (`7.5`), nunca vírgula.

## 8.7 O bug mais famoso: `"2" + "3" = "23"`

Este programa parece certo:

```javascript
let primeiro = prompt("Digite um número:");     // usuário digita 2
let segundo = prompt("Digite outro número:");   // usuário digita 3
alert("A soma é " + (primeiro + segundo));      // A soma é 23 (!)
```

O resultado é **23**. O que aconteceu:

```
   prompt devolve TEXTO:     primeiro = "2"     segundo = "3"
                                  │                  │
   o + entre dois textos  ──►   "2"   +   "3"   =   "23"   (CONCATENA: junta)
   o + entre dois números ──►    2    +    3    =    5     (SOMA)
```

O `+` tem **dois trabalhos** no JS: soma números e **junta** (concatena) textos. Se um dos lados é texto, ele junta.

A correção é converter o texto em número com **`Number()`**:

```javascript
let primeiro = Number(prompt("Digite um número:"));
let segundo = Number(prompt("Digite outro número:"));
alert("A soma é " + (primeiro + segundo));      // A soma é 5
```

E se o usuário digitar algo que não é número?

```javascript
Number("30")      // 30
Number("7.5")     // 7.5
Number("7,5")     // NaN   ← vírgula não vale
Number("abc")     // NaN   ← "Not a Number": não é um número
Number("")        // 0     ← cuidado: texto vazio vira 0
```

`NaN` é um valor especial do tipo `number` que significa "isso não deu um número". Na aula 9 você aprende a **detectar** o `NaN` e pedir de novo. Lá também aparece um assunto parente do `==`: os valores *truthy* e *falsy*, ou seja, o que o `if` considera verdadeiro quando recebe algo que não é `true` nem `false`.

Os outros operadores (`-`, `*`, `/`) não têm esse problema, porque não "juntam" texto: `"6" * "2"` dá `12`. Mas não confie nisso: **converta sempre** com `Number()` logo depois do `prompt`.

## 8.8 Operadores

**Aritméticos** (como no Portugol):

| Operador | Exemplo | Resultado | No Portugol |
|---|---|---|---|
| `+` | `7 + 2` | `9` | `+` |
| `-` | `7 - 2` | `5` | `-` |
| `*` | `7 * 2` | `14` | `*` |
| `/` | `7 / 2` | `3.5` | `/` (o `\` inteiro não existe no JS) |
| `%` | `7 % 2` | `1` (resto) | `mod` |

O `%` é o `mod` do VisualG: `numero % 2` é `0` quando o número é par.

**Atribuição com conta** (atalhos):

```javascript
let total = 10;
total += 5;     // o mesmo que total = total + 5   → 15
total -= 3;     // total = total - 3               → 12
total++;        // total = total + 1               → 13 (contador!)
```

**Comparação** (devolvem `true` ou `false`):

| JS | Portugol | Significado |
|---|---|---|
| `===` | `=` | igual (valor **e** tipo) |
| `!==` | `<>` | diferente |
| `>` `<` `>=` `<=` | iguais | maior, menor... |

```javascript
console.log(30 === 30);       // true
console.log(30 === "30");     // false  ← número x texto
console.log(alunos <= capacidade);
```

### `===` (três sinais) × `==` (dois sinais)

O JavaScript tem **dois** "igual":

- **`===` (igualdade estrita):** só dá `true` se o **valor** e o **tipo** forem iguais. Número com texto? `false`, sem conversa.
- **`==` (igualdade "solta"):** se os tipos forem diferentes, ele **converte** um dos lados antes de comparar, tentando "adivinhar" o que você quis dizer. Na maioria das vezes, transforma tudo em número.

```
   30  ===  "30"                       30  ==  "30"
   │         │                         │        │
 number    string                    number   string ──► converte para 30
   └── tipos diferentes ──► false      └──── 30 == 30 ──► true
```

| Comparação | `==` | `===` | O que o `==` fez |
|---|---|---|---|
| `30` e `"30"` | `true` | `false` | Converteu o texto `"30"` em número |
| `0` e `""` | `true` | `false` | O texto vazio virou o número `0` |
| `0` e `false` | `true` | `false` | `false` virou `0` |
| `"1"` e `true` | `true` | `false` | Os dois viraram `1` |
| `" "` (espaço) e `0` | `true` | `false` | Texto só com espaço vira `0` |
| `null` e `undefined` | `true` | `false` | Regra especial: o `==` considera os dois "vazios" iguais |
| `null` e `0` | `false` | `false` | …mas `null` **não** vira `0` aqui (outra regra especial) |

Viu o problema? Com `==`, um campo **vazio** (`""`) é "igual" a **zero**, e `false` é "igual" a `0`. As regras de conversão são muitas, cheias de exceções, e quase ninguém decora todas. Por isso:

> **Regra do curso (e da maioria das equipes profissionais):** use sempre `===` e `!==`. O `==` e o `!=` ficam só para reconhecer quando aparecerem num código da internet.

O diferente segue a mesma lógica: `"30" != 30` dá `false` (converteu e achou igual), e `"30" !== 30` dá `true` (tipos diferentes).

**Onde isso morde no nosso projeto:** o `prompt` **sempre** devolve texto (seção 8.7). Se o menu fizer `opcao == 1` com `opcao = "1"`, funciona "sem querer", porque o `==` converte. Mas o `switch` que veremos na aula 9 compara com `===`, e aí o mesmo código para de funcionar. O jeito certo é converter **você mesmo** e comparar estrito:

```javascript
let opcao = Number(prompt("Escolha uma opção:"));   // converte de propósito
if (opcao === 1) {                                  // compara valor E tipo
    alert("Nova reserva");
}
```

Quem converte é você, não o `==`. Assim o código faz exatamente o que está escrito.

**Lógicos:**

| JS | Portugol | Exemplo |
|---|---|---|
| `&&` | `e` | `alunos >= 1 && alunos <= 60` |
| `\|\|` | `ou` | `dia < 1 \|\| dia > 6` |
| `!` | `nao` | `!turmaCabe` |

## 8.9 Formatando a saída: `toFixed` e template string

Divisões geram números "feios": `25 / 30 * 100` dá `83.33333333333334`. O **`toFixed(n)`** arredonda para `n` casas e devolve um **texto**:

```javascript
let ocupacao = 25 / 30 * 100;
console.log(ocupacao.toFixed(1));     // "83.3"
console.log(ocupacao.toFixed(0));     // "83"
```

É o `:5:1` do `escreval` do VisualG.

**Template string** é outro jeito de montar textos: com **crase** (`` ` ``) em vez de aspas, e as variáveis dentro de `${ }`:

```javascript
let nome = "Carla";
let alunos = 25;
console.log("Professora " + nome + ", " + alunos + " alunos");   // com +
console.log(`Professora ${nome}, ${alunos} alunos`);             // com template string
```

As duas linhas mostram a mesma coisa. Neste curso, **os exemplos usam `+`** (fica mais parecido com o `escreval` do Portugol), mas você pode usar template string se preferir. A crase fica, em geral, na tecla ao lado do 1 ou junto do acento agudo (depende do teclado).

## 8.10 Projeto da disciplina: o que fazemos hoje

Hoje o projeto ganha a primeira versão em JavaScript: o cadastro de **uma turma** e a reserva simples da **aula 4**, lado a lado com o Portugol. A referência está em [`exemplos/projeto/`](exemplos/projeto/).

> Ainda **não** usamos `if` (aula 9): as regras aparecem como `true` ou `false`. Hoje o JS **calcula e mostra**; amanhã ele **decide**.

**Passo 1. Copiar o `index.html` pronto** para a sua pasta. Primeiro, confira se está na branch do CP3 (`git branch` mostra a branch atual com `*`). Se ainda não criou, crie agora:

```
git switch main
git pull
git switch -c joao-lucas/cp3
```

Depois, de dentro de `alunos/joao-lucas/`, copie a pasta `prompt` entregue (ou copie pelo explorador de arquivos do VS Code):

```
cp -r ../../projeto/para-os-alunos/prompt .
```

Dentro de `alunos/joao-lucas/prompt/`, crie um `script.js` vazio ao lado do `index.html`. Abra com o Live Server e o console (F12).

**Passo 2. Constantes.** No topo do `script.js`:

```javascript
const MAXIMO_DE_ALUNOS = 60;
const SABADO = 6;
const MANHA = 1;

// O laboratório é um espaço físico: não é digitado, já vem pronto.
const NOME_DO_LABORATORIO = "Informática";
const CAPACIDADE_DO_LABORATORIO = 30;
```

Como no `.alg`, a reserva de hoje é sempre no laboratório de **Informática** (30 lugares). Laboratório não tem cadastro: por isso ele virou constante.

**Passo 3. Cadastro de uma turma, lado a lado:**

```
 PORTUGOL (aula 4)                         JAVASCRIPT (hoje)
 escreval("Nome da turma:")                let nomeDaTurma = prompt("Nome da turma (ex.: ADM09):");
 leia(nomeTurma)
 escreval("Número de alunos (1 a 60):")    let alunos = Number(prompt("Número de alunos (1 a 60):"));
 leia(alunos)
 se nomeTurma = "" entao ...               let nomeValido = nomeDaTurma !== "";
 se (alunos >= 1) e                        let alunosValido = alunos >= 1 && alunos <= MAXIMO_DE_ALUNOS;
    (alunos <= 60) entao ...
```

```javascript
let nomeDaTurma = prompt("Nome da turma (ex.: ADM09):");
let alunos = Number(prompt("Número de alunos (1 a " + MAXIMO_DE_ALUNOS + "):"));

let nomeValido = nomeDaTurma !== "";
let alunosValido = alunos >= 1 && alunos <= MAXIMO_DE_ALUNOS;

console.log("Turma:", nomeDaTurma, "| nome válido?", nomeValido);
console.log("Alunos:", alunos, "| tipo:", typeof alunos, "| válido?", alunosValido);
```

**Passo 4. Reserva simples.** A turma cabe? Quantos lugares sobram? Que percentual do laboratório a turma ocupa? O turno é permitido (sábado só de manhã)?

```
 PORTUGOL (aula 4)                         JAVASCRIPT (hoje)
 leia(dia)                                 let dia = Number(prompt("Dia: 1 Seg ... 6 Sáb"));
 cabe <- alunos <= capacidade              let turmaCabe = alunos <= CAPACIDADE_DO_LABORATORIO;
 sobram <- capacidade - alunos             let lugaresQueSobram = CAPACIDADE_DO_LABORATORIO - alunos;
 se (dia = 6) e (turno <> 1) entao ...     let turnoPermitido = dia !== SABADO || turno === MANHA;
```

```javascript
let dia = Number(prompt("Dia: 1 Seg | 2 Ter | 3 Qua | 4 Qui | 5 Sex | 6 Sáb"));
let turno = Number(prompt("Turno: 1 Manhã (08h-12h) | 2 Tarde (13h30-17h30) | 3 Noite (18h30-22h30)"));

let turmaCabe = alunos <= CAPACIDADE_DO_LABORATORIO;
let lugaresQueSobram = CAPACIDADE_DO_LABORATORIO - alunos;
let ocupacao = alunos / CAPACIDADE_DO_LABORATORIO * 100;
let turnoPermitido = dia !== SABADO || turno === MANHA;

let confirmou = confirm("Confirmar a reserva da turma " + nomeDaTurma + " no laboratório de " + NOME_DO_LABORATORIO + "?");
```

Repare na regra do sábado: no Portugol era "**bloqueia** se `(dia = 6) e (turno <> 1)`". Aqui perguntamos o contrário, "o turno é **permitido**?": não é sábado **ou** é de manhã. É a mesma regra da função `turnoPermitido` da aula 7. Faça o teste: dia `6` e turno `1` → `true`; dia `6` e turno `3` → `false`; dia `2` e turno `3` → `true`.

**Passo 5. Mostrar o resumo** com `alert`, montando o texto com `+` e `"\n"` (quebra de linha dentro do texto):

```javascript
alert(
    "RESUMO DA RESERVA\n\n" +
    "Laboratório: " + NOME_DO_LABORATORIO + " (" + CAPACIDADE_DO_LABORATORIO + " lugares)\n" +
    "Turma: " + nomeDaTurma + " (" + alunos + " alunos)\n" +
    "Dia " + dia + ", turno " + turno + "\n" +
    "Turno permitido? " + turnoPermitido + "\n" +
    "A turma cabe? " + turmaCabe + "\n" +
    "Lugares que sobram: " + lugaresQueSobram + "\n" +
    "Ocupação: " + ocupacao.toFixed(1) + "%\n" +
    "Confirmada? " + confirmou
);
```

Por enquanto o resumo mostra "Dia 3, turno 2". Mostrar "Quarta, tarde (13h30 às 17h30)" precisa **decidir** qual texto usar: é o `switch` da aula 9.

**Passo 6. Testar o bug de propósito.** Tire o `Number()` dos alunos e digite `24`: os lugares que sobram continuam certos (`-` converte), mas tente `CAPACIDADE_DO_LABORATORIO + alunos` no console (`"3024"`). Depois devolva o `Number()`. Teste também uma turma de `35` alunos: a turma cabe? Quantos lugares sobram?

**Passo 7. Commit.**

```
git add prompt/
git commit -m "feat: traduz cadastro de turma e reserva simples para JavaScript"
git push
```

Na primeira vez, o `git push` da branch nova pede `git push -u origin joao-lucas/cp3`. Você pode fazer push na branch quantas vezes quiser: o Pull Request só abre no CP3 (aula 10).

## 8.11 Erros comuns

| Sintoma | Causa |
|---|---|
| Nada acontece ao abrir a página | O `script.js` não está na mesma pasta do `index.html`, ou o nome está diferente (`Script.js`, `script.js.txt`) |
| `ReferenceError: x is not defined` | Variável escrita diferente (maiúscula, acento, letra trocada) ou usada antes do `let` |
| `Assignment to constant variable` | Tentou mudar um valor declarado com `const` |
| `SyntaxError: Unexpected identifier` | Faltou aspas, `+` ou vírgula ao montar o texto |
| Soma dá `23` em vez de `5` | Faltou `Number()` no `prompt` |
| Resultado `NaN` | O usuário digitou letras, vírgula decimal (`7,5`) ou cancelou; o `Number()` não conseguiu converter |
| Número de alunos vazio vira `0` | `Number("")` é `0`, não `NaN` |
| Comparação dá `false` sem motivo | Comparando número com texto: `30 === "30"`. Converta com `Number()` antes |
| Copiou um código da internet com `==` e ele "funciona", mas o seu com `===` não | O `==` estava convertendo os tipos escondido. Converta com `Number()` e use `===` |
| `ocupacao.toFixed is not a function` | `toFixed` só funciona em número; a variável era texto |
| O `alert` mostra `\n` em vez de pular linha | Usou a barra errada (`/n`) |

## 8.12 Exercícios em aula

1. **Apresentação.** Peça nome e idade e mostre num `alert`: "Olá, Ana! Daqui a 10 anos você terá 27 anos." (a idade precisa de `Number()`).
2. **Celsius para Fahrenheit.** Leia a temperatura em Celsius e mostre em Fahrenheit (`F = C * 9 / 5 + 32`) com 1 casa decimal.
3. **Detetive de tipos.** Sem rodar, escreva o resultado de: `typeof 10`, `typeof "10"`, `"10" + 5`, `"10" - 5`, `Number("10") + 5`, `Number("dez")`, `10 % 3`, `5 === "5"`, `5 == "5"`, `0 == ""`, `0 === ""`. Depois confira no console e explique, com as suas palavras, por que `5 == "5"` e `5 === "5"` dão resultados diferentes.
4. **Média de duas notas.** Leia duas notas, mostre a média com 1 casa e um `true/false` dizendo se a média é maior ou igual a 7.
5. **Troco.** Leia o valor da compra e o valor pago; mostre o troco com 2 casas (`toFixed(2)`). Teste com `10.30` e `20`.
6. **Divisão inteira e resto.** Leia uma quantidade de minutos e mostre em horas e minutos (ex.: 135 → 2 h e 15 min). Dica: `Math.floor(minutos / 60)` dá a parte inteira e `%` dá o resto.
7. **(Projeto) Horas na semana.** Cada reserva é um turno inteiro de **4 horas**. Crie a constante `HORAS_POR_TURNO = 4`, pergunte quantas reservas iguais a esta a turma fará na semana e mostre o total de horas no laboratório.
8. **(Projeto) Laboratório quase lotado?** Mostre `true/false` para "a turma ocupa mais de 90% do laboratório" usando `ocupacao` e `>`. Teste com 28 alunos (93%) e com 24 (80%).

## 8.13 Desafio para a próxima aula

**Frase de ocupação.** No `prompt/script.js` do projeto, mostre num `alert` a frase:

```
A turma DSI02 ocupa 80% do laboratório de Informática
```

Regras:

- a frase deve ser montada com **template string** (crase e `${ }`);
- o percentual deve estar **sem casas decimais**, com `toFixed(0)`;
- o nome da turma vem do que o usuário digitou; o nome do laboratório vem da constante `NOME_DO_LABORATORIO`.

Teste com `DSI02` e `24` alunos: 24 / 30 = 80%.

Faça o commit e o push na branch `joao-lucas/cp3`. Pergunta para pensar (responda num comentário no `script.js`): o que aparece na frase se o usuário clicar em **Cancelar** no `prompt` do nome? Na aula 9 vamos tratar isso.

## 8.14 Resumo

- JavaScript é interpretado, roda no navegador e **não é Java**;
- `index.html` pronto + `script.js` com `defer`; o console (F12) mostra `console.log` e os erros;
- `prompt` (lê, **sempre devolve texto**), `alert` (mostra), `confirm` (devolve `true`/`false`);
- `let` para variável, `const` para constante (MAIÚSCULAS para regras do sistema);
- Tipos: `string`, `number`, `boolean`; `typeof` pergunta o tipo;
- `+` com texto **junta**: `"2" + "3" = "23"`. Use `Number()` logo depois do `prompt`; letras viram `NaN`;
- Operadores: `+ - * / %`, `+=`, `++`, `===`, `!==`, `&&`, `||`, `!`;
- `toFixed(n)` arredonda para mostrar; template string é uma alternativa ao `+`;
- No projeto: cadastro de uma turma e reserva simples em JS (lugares que sobram, % de ocupação), com as regras como `true/false` (o `if` vem na aula 9).
