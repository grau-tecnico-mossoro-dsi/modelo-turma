**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-08-js-primeiro-contato-tipos-e-operadores/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-10-js-arrays-e-funcoes/README.md)

---

# AULA 9 — JavaScript: decisões e laços

## Objetivos da aula

- Decidir com `if`, `else if` e `else` (o `se ... senao` do Portugol);
- Escolher entre várias opções com `switch` (o `escolha ... caso`);
- Tratar o **Cancelar** do `prompt` (`null`) e a digitação inválida (`NaN`, com `isNaN`);
- Repetir com `while`, `do...while` e `for` (o `enquanto`, o `repita` e o `para`);
- Usar contador e acumulador em JavaScript;
- Reconhecer o **operador ternário** e o **`for...of`** ao ler código de outras pessoas (o projeto não usa);
- Montar o **menu principal validado** do projeto, as validações do cadastro de turma com laço e o dia e o turno com `switch`.

## 9.1 Da aula 8 para a aula 9: o JS começa a decidir

Na aula 8, o programa mostrava `A turma cabe? false` e seguia em frente como se nada fosse. Um sistema de verdade precisa **reagir**: se a turma não cabe, avisar e perguntar de novo. Para isso, o JS precisa das duas estruturas que você já conhece do VisualG: **decisão** e **repetição**.

A lógica é a mesma das aulas 4 e 5. Muda só a escrita:

```
 PORTUGOL                                   JAVASCRIPT
 se cond entao ... senao ... fimse          if (cond) { ... } else { ... }
 escolha x  caso 1 ... outrocaso ...        switch (x) { case 1: ... break; default: ... }
 enquanto cond faca ... fimenquanto         while (cond) { ... }
 repita ... ate cond                        do { ... } while (!cond);
 para i de 1 ate n faca ... fimpara         for (let i = 1; i <= n; i++) { ... }
```

As **chaves** `{ }` fazem o papel do `fimse`, `fimenquanto` e `fimpara`: marcam onde o bloco começa e termina.

## 9.2 `if`, `else if`, `else`

```javascript
let alunos = Number(prompt("Número de alunos:"));
let capacidade = 30;

if (alunos <= capacidade) {
    alert("A turma cabe no laboratório.");
} else {
    alert("A turma NÃO cabe: faltam " + (alunos - capacidade) + " lugares.");
}
```

- a condição fica **entre parênteses**;
- o bloco de cada caminho fica **entre chaves**;
- o `else` é opcional.

Quando há **mais de dois caminhos**, encadeamos com `else if`. **Exemplo clássico: aprovado, recuperação ou reprovado** ([`exemplos/classicos/script.js`](exemplos/classicos/script.js)):

```javascript
let media = Number(prompt("Média final do aluno (0 a 10):"));

if (media >= 7) {
    alert("Aprovado");
} else if (media >= 5) {
    alert("Recuperação");
} else {
    alert("Reprovado");
}
```

```
         media >= 7 ? ── sim ──► Aprovado
              │
             não
              ▼
         media >= 5 ? ── sim ──► Recuperação
              │
             não
              ▼
          Reprovado
```

O JS testa **de cima para baixo** e para no **primeiro** caminho verdadeiro. Por isso, no segundo teste, não precisamos escrever `media < 7 && media >= 5`: se chegou ali, já sabemos que a média é menor que 7.

Condições compostas usam os operadores lógicos da aula 8:

```javascript
if (alunos >= 1 && alunos <= 60) { ... }              // e
if (dia < 1 || dia > 6) { ... }                        // ou
if (!confirmou) { ... }                                // não
```

## 9.3 `switch`: o `escolha ... caso`

Quando a decisão compara **uma** variável com **vários valores fixos**, o `switch` fica mais limpo que uma fila de `else if`. **Exemplo clássico: dia da semana.**

```javascript
let numeroDoDia = Number(prompt("Número do dia (1 = segunda ... 5 = sexta):"));
let nomeDoDia = "";

switch (numeroDoDia) {
    case 1:
        nomeDoDia = "Segunda";
        break;
    case 2:
        nomeDoDia = "Terça";
        break;
    // ... casos 3, 4 e 5 ...
    default:
        nomeDoDia = "Dia inválido";
}
```

| Portugol | JavaScript |
|---|---|
| `escolha numeroDoDia` | `switch (numeroDoDia) {` |
| `caso 1` | `case 1:` |
| `outrocaso` | `default:` |
| `fimescolha` | `}` |

**O `break` é obrigatório** em cada `case`. Sem ele, o JS **continua executando** os casos de baixo (isso se chama "cair" para o próximo caso):

```javascript
switch (2) {
    case 1:
        console.log("um");
    case 2:
        console.log("dois");      // entra aqui...
    case 3:
        console.log("três");      // ...e continua aqui, porque faltou o break!
}
// mostra "dois" e "três"
```

O `switch` compara com `===`: `switch ("2")` **não** entra no `case 2`, porque texto não é igual a número. Por isso o `Number()` antes é essencial.

## 9.4 Quando o usuário clica em Cancelar: `null`

Na aula 8, ficou uma pergunta no ar: o que acontece quando o usuário clica em **Cancelar** no `prompt`? O `prompt` devolve um valor especial: **`null`** ("nada").

```javascript
let nome = prompt("Nome:");
console.log(nome);           // null (se cancelou)
console.log(typeof nome);    // "object" (curiosidade do JS: typeof null é "object")
```

E o `null` causa problemas em cascata:

```javascript
Number(null)        // 0      → como se tivesse digitado zero!
"Turma " + null     // "Turma null"
null.trim()         // ERRO: Cannot read properties of null (reading 'trim')
```

Regra do curso: **teste o `null` logo depois do `prompt`, antes de qualquer outra coisa.**

```javascript
let resposta = prompt("Nome da turma:");
if (resposta === null) {
    alert("Cadastro cancelado.");
} else {
    let nome = resposta.trim();     // trim() tira os espaços do começo e do fim
    alert("Nome: " + nome);
}
```

## 9.5 Quando o usuário digita letras: `isNaN`

O outro problema da aula 8: `Number("abc")` dá `NaN`. E o `NaN` é traiçoeiro: **toda comparação com `NaN` dá `false`**.

```javascript
let alunos = Number("abc");        // NaN
alunos < 1                          // false
alunos > 60                         // false   → passaria numa validação de faixa!
alunos === NaN                      // false   → nem ele é igual a ele mesmo
```

Para perguntar "isso é `NaN`?", existe o **`isNaN()`**:

```javascript
let alunos = Number(prompt("Número de alunos (1 a 60):"));

if (isNaN(alunos)) {
    alert("Digite apenas números.");
} else if (alunos < 1 || alunos > 60) {
    alert("A turma deve ter de 1 a 60 alunos.");
} else {
    alert("Alunos: " + alunos);
}
```

A ordem importa: **primeiro** o `isNaN`, depois a faixa.

### 9.5.1 *Truthy* e *falsy*: o que o `if` entende como verdadeiro

No Portugol, o `se` só aceita uma condição lógica (`verdadeiro` ou `falso`). No JavaScript, o `if` aceita **qualquer valor**: se não for `true` nem `false`, ele converte sozinho. Os valores que viram `false` são chamados de ***falsy*** ("falsos"); todo o resto é ***truthy*** ("verdadeiros").

A lista de *falsy* é curta. São só **6**, e vale decorar:

| Valor *falsy* | Onde aparece no nosso projeto |
|---|---|
| `false` | Uma condição que deu falso |
| `0` | `Number("")` (campo vazio) ou `Number(null)` |
| `""` (texto vazio) | O usuário só apertou Enter no `prompt` |
| `null` | O usuário clicou em **Cancelar** no `prompt` |
| `undefined` | Variável criada sem valor (`let x;`) |
| `NaN` | `Number("abc")` |

**Todo o resto é *truthy***, inclusive alguns que enganam:

```javascript
if ("0")     { }   // entra! "0" é um TEXTO com um caractere, não o número zero
if (" ")     { }   // entra! um espaço já não é texto vazio
if ("false") { }   // entra! é a PALAVRA false, um texto qualquer
if (-5)      { }   // entra! só o 0 é falsy; negativo é truthy
```

Por isso você vai encontrar, em códigos da internet, coisas assim:

```javascript
let resposta = prompt("Nome da turma:");
if (resposta) {
    alert("Nome: " + resposta);          // entra com qualquer texto preenchido
} else {
    alert("Cancelou ou deixou vazio");   // null (Cancelar) e "" (Enter) caem aqui
}
```

E o `!` (não) também usa essa conversão: `!""` dá `true`, `!"Carla"` dá `false`. Daí o padrão `if (!resposta)`, que significa "se não tem resposta".

Funciona, mas tem dois problemas para quem está começando:

1. **Junta casos diferentes:** `null` (o usuário **desistiu**) e `""` (o usuário **esqueceu** de digitar) caem no mesmo `else`. No nosso sistema, o primeiro deve cancelar o cadastro e o segundo deve perguntar de novo.
2. **Esconde a intenção:** quem lê `if (alunos)` não sabe se você quis dizer "não é zero", "não é `NaN`" ou "não está vazio".

> **Regra do curso:** escreva a comparação completa: `resposta === null`, `nome === ""`, `isNaN(alunos)`, `opcaoValida === false`. É mais longo, mas cada `if` diz exatamente o que testa. *Truthy* e *falsy* são para **reconhecer** no código dos outros, não para usar no projeto.

```javascript
let resposta = prompt("Nome da turma:");
if (resposta === null) {
    alert("Cadastro cancelado.");            // desistiu
} else if (resposta.trim() === "") {
    alert("O nome é obrigatório.");          // esqueceu
} else {
    alert("Nome: " + resposta.trim());
}
```

## 9.6 `while`: repita enquanto

O `while` testa **antes** de entrar (pode rodar zero vezes), como o `enquanto` do VisualG. **Exemplo clássico: adivinhe o número.**

```javascript
const SEGREDO = Math.floor(Math.random() * 10) + 1;   // receita: sorteia de 1 a 10
let palpite = 0;
let tentativas = 0;
let desistiu = false;

while (palpite !== SEGREDO && desistiu === false) {
    let resposta = prompt("Adivinhe o número (1 a 10):");
    if (resposta === null) {
        desistiu = true;                  // Cancelar encerra o jogo
    } else {
        palpite = Number(resposta);
        tentativas++;                     // contador
        if (palpite > SEGREDO) {
            alert("Alto demais.");
        } else if (palpite < SEGREDO) {
            alert("Baixo demais.");
        }
    }
}
```

Repare na variável `desistiu`: um `boolean` que controla o laço é uma **bandeira** (*flag*), como o `livre` da aula 6. Sem ela, o Cancelar viraria `Number(null) = 0`, que nunca é o segredo, e o laço **nunca terminaria**.

> **Laço infinito:** se a condição nunca ficar falsa, a aba congela. Feche a aba (ou o navegador) e confira: algo **dentro** do laço precisa caminhar para encerrar a condição.

## 9.7 `do...while`: o `repita ... ate`

O `do...while` testa **depois**, então roda **pelo menos uma vez**. É a escolha natural para "pergunte até a resposta ser válida":

```javascript
let alunos = 0;
do {
    alunos = Number(prompt("Número de alunos (1 a 60):"));
    if (isNaN(alunos) || alunos < 1 || alunos > 60) {
        alert("A turma deve ter um número de 1 a 60 alunos.");
    }
} while (isNaN(alunos) || alunos < 1 || alunos > 60);
```

**Atenção à tradução do Portugol.** O `repita ... ate` diz quando **parar**; o `do...while` diz quando **continuar**. A condição fica **invertida**:

```
 PORTUGOL (para quando for válida)           JAVASCRIPT (continua enquanto for inválida)
 repita                                      do {
    leia(alunos)                                 alunos = Number(prompt("..."));
 ate (alunos >= 1) e (alunos <= 60)          } while (alunos < 1 || alunos > 60);
```

Para inverter: `>=` vira `<`, `<=` vira `>`, e o `e` vira `ou` (`||`).

## 9.8 `for`: o `para`

Quando você sabe **quantas vezes** vai repetir, use o `for`. **Exemplo clássico: tabuada.**

```javascript
let numeroDaTabuada = Number(prompt("Tabuada de qual número?"));
let tabuada = "";                           // acumulador de TEXTO
for (let i = 1; i <= 10; i++) {
    tabuada = tabuada + numeroDaTabuada + " x " + i + " = " + (numeroDaTabuada * i) + "\n";
}
alert(tabuada);
```

```
   for ( let i = 1 ;  i <= 10 ;  i++ )
         ─────────    ───────    ───
             │           │        └── PASSO: depois de cada volta (o "de 1 em 1")
             │           └── CONDIÇÃO: continua ENQUANTO for verdadeira
             └── INÍCIO: roda uma vez, antes de tudo
```

É o `para i de 1 ate 10 faca`. Repare no truque do `alert`: em vez de 10 janelas, **acumulamos** as linhas num texto e mostramos uma vez só.

**Contador e acumulador** funcionam como no VisualG. Média de N notas:

```javascript
let soma = 0;                                        // acumulador: nasce FORA do laço
for (let i = 1; i <= quantidade; i++) {
    let nota = Number(prompt("Nota " + i + ":"));
    soma = soma + nota;                              // ou: soma += nota;
}
alert("Média: " + (soma / quantidade).toFixed(1));
```

**Qual laço usar?**

| Situação | Laço |
|---|---|
| Sei quantas vezes (10 notas, tabuada até 10) | `for` |
| Preciso perguntar pelo menos uma vez e repetir se inválido | `do...while` |
| Repito enquanto algo for verdade, podendo não entrar nenhuma vez | `while` |

### 9.8.1 Para reconhecer ao ler código: operador ternário e `for...of`

Duas formas curtas aparecem muito em códigos da internet, em tutoriais e em respostas de IA. **O projeto não usa nenhuma das duas**: elas estão aqui só para você reconhecer quando encontrar.

**Operador ternário** (`condição ? valorSeVerdadeiro : valorSeFalso`). É um `if/else` que **devolve um valor**, escrito numa linha só:

```javascript
let situacao = media >= 7 ? "Aprovado" : "Reprovado";
```

Leia assim: "a média é maior ou igual a 7? Se sim, `"Aprovado"`; se não, `"Reprovado"`". É o mesmo que:

```javascript
let situacao = "";
if (media >= 7) {
    situacao = "Aprovado";
} else {
    situacao = "Reprovado";
}
```

**`for...of`**. Percorre uma lista entregando **cada valor**, sem o contador `i`. As listas (arrays) chegam na aula 10; por enquanto, veja com um texto, que também tem posições:

```javascript
let sigla = "ADM";
for (const letra of sigla) {
    console.log(letra);          // "A", depois "D", depois "M"
}
```

É o mesmo que o `for` clássico:

```javascript
for (let i = 0; i < sigla.length; i++) {
    console.log(sigla[i]);
}
```

> **Regra do curso:** no projeto, use sempre `if/else` e o `for` clássico (`let i = 0; i < ...; i++`). Eles são mais longos, mas mostram cada passo, como o `se` e o `para` do Portugol. O ternário e o `for...of` são para **ler** o código de outras pessoas.

## 9.9 Projeto da disciplina: o que fazemos hoje

O `prompt/script.js` da aula 8 vira um **sistema com menu**. A referência completa está em [`exemplos/projeto/script.js`](exemplos/projeto/script.js).

> Ainda não temos **arrays** nem **funções** (aula 10): o sistema guarda **uma** turma em variáveis, e cada validação é escrita no lugar onde é usada. Repare quantas vezes o mesmo `do...while` aparece: é o mesmo incômodo da aula 7, e a solução será a mesma.

**Passo 1. Os dados de uma turma**, com valores iniciais, no topo (depois das constantes da aula 8):

```javascript
const OPCAO_SAIR = 4;

let nomeDaTurma = "ADM09";
let alunos = 28;
```

O laboratório continua sendo as constantes `NOME_DO_LABORATORIO` e `CAPACIDADE_DO_LABORATORIO` (Informática, 30 lugares): ele é um espaço físico, não tem cadastro.

**Passo 2. O menu principal validado** (regras do desafioCadastro: só números, sem 0 ou negativo, inválido mostra de novo). Um `do...while` de fora repete o menu até Sair; um `while` de dentro repete a pergunta até a opção ser válida:

```javascript
let opcao = 0;
do {
    let opcaoValida = false;
    while (opcaoValida === false) {
        let resposta = prompt(
            "RESERVA DE LABORATÓRIOS\n\n" +
            "1 - Cadastrar turma\n" +
            "2 - Ver turma\n" +
            "3 - Nova reserva (laboratório de " + NOME_DO_LABORATORIO + ")\n" +
            "4 - Sair"
        );
        if (resposta === null) {
            opcao = OPCAO_SAIR;                    // Cancelar = Sair
            opcaoValida = true;
        } else {
            opcao = Number(resposta);
            if (isNaN(opcao)) {
                alert("Digite apenas números.");
            } else if (opcao % 1 !== 0 || opcao < 1 || opcao > OPCAO_SAIR) {
                alert("Opção inválida. Escolha de 1 a " + OPCAO_SAIR + ".");
            } else {
                opcaoValida = true;
            }
        }
    }

    switch (opcao) {
        case 1:
            // cadastrar turma
            break;
        case 2:
            // ver turma
            break;
        case 3:
            // nova reserva
            break;
    }
} while (opcao !== OPCAO_SAIR);

alert("Até logo!");
```

O `opcao % 1 !== 0` recusa números quebrados (`2.5`): o resto da divisão por 1 de um número inteiro é sempre 0.

**Passo 3. Cadastro de turma com validação em laço.** Cada campo é perguntado **até ser válido**:

- **nome** obrigatório: `while (novoNome === "")`, tratando o `null` e usando `trim()`;
- **alunos** de 1 a 60: `do...while` com `isNaN` (seção 9.7).

```javascript
let novoNome = "";
while (novoNome === "") {
    let respostaNome = prompt("Nome da turma (ex.: ADM09):");
    if (respostaNome === null) {
        respostaNome = "";
    }
    novoNome = respostaNome.trim();
    if (novoNome === "") {
        alert("O nome da turma é obrigatório.");
    }
}
```

Repare: Cancelar no nome vira `""`, e o laço pergunta de novo. O `trim()` faz um nome só com espaços contar como vazio. Só **depois** dos dois laços o programa troca `nomeDaTurma` e `alunos` pelos valores novos.

**Passo 4. Nova reserva com dia e turno por `switch`.** Cada número é validado com `do...while` e depois o `switch` transforma o número em texto. É o desafio da aula 4 ("Terça, tarde: 13h30 às 17h30"), agora em JS:

```javascript
let nomeDoTurno = "";
let horario = "";
switch (turno) {
    case 1:
        nomeDoTurno = "Manhã";
        horario = "08h às 12h";
        break;
    case 2:
        nomeDoTurno = "Tarde";
        horario = "13h30 às 17h30";
        break;
    case 3:
        nomeDoTurno = "Noite";
        horario = "18h30 às 22h30";
        break;
}
```

O dia funciona igual, com 6 casos (`"Segunda"` ... `"Sábado"`).

Depois, as regras da aula 4 **decidem de verdade**, com `if / else if / else`:

```javascript
if (dia === SABADO && turno !== MANHA) {
    alert("No sábado, só o turno da manhã.");
} else if (alunos > CAPACIDADE_DO_LABORATORIO) {
    alert("A turma não cabe: ...");
} else {
    let lugaresQueSobram = CAPACIDADE_DO_LABORATORIO - alunos;
    let ocupacao = alunos / CAPACIDADE_DO_LABORATORIO * 100;
    // confirm com o resumo: turma, lugares que sobram, ocupação, dia e turno
}
```

No fim, um `confirm` com o resumo e um `if` para a resposta. (O conflito de horário volta na aula 11, quando as reservas forem guardadas numa lista.)

**Passo 5. Testar como usuário chato.** No menu: `0`, `-1`, `9`, `abc`, `2.5`, vazio e Cancelar. No cadastro: nome só com espaços, alunos `70` e `trinta`. Na reserva: sábado à noite (deve recusar), sábado de manhã (deve aceitar) e uma turma de 35 alunos (não cabe nos 30 lugares).

**Passo 6. Commit.** Ainda na branch `joao-lucas/cp3`, dentro de `alunos/joao-lucas/`:

```
git add prompt/script.js
git commit -m "feat: adiciona menu validado e validacoes do cadastro de turma"
git push
```

## 9.10 Erros comuns

| Sintoma | Causa |
|---|---|
| O `switch` executa dois casos seguidos | Faltou o `break` |
| O `switch` cai sempre no `default` | Comparou texto com número: faltou `Number()` (o `switch` usa `===`) |
| `Cannot read properties of null (reading 'trim')` | O usuário cancelou e o código chamou `.trim()` no `null`; teste o `null` antes |
| Cancelar no menu é aceito como opção | `Number(null)` é `0`; trate o `null` antes de converter |
| Letras passam na validação de faixa | Faltou `isNaN`: comparações com `NaN` dão sempre `false` |
| A aba congelou | Laço infinito: nada dentro do laço torna a condição falsa (o Cancelar é o suspeito nº 1) |
| O `do...while` aceita valor inválido e recusa o válido | Copiou a condição do `repita ... ate` sem **inverter** |
| `else` sem `if` (`Unexpected token 'else'`) | Chave `}` fechada no lugar errado ou `;` depois do `if (...)` |
| O acumulador mostra só o último valor | Declarado **dentro** do laço: nasce de novo a cada volta |
| `if (x = 5)` sempre entra | Usou `=` (atribuição) em vez de `===` (comparação) |
| `if (resposta)` trata Cancelar e campo vazio do mesmo jeito | *Truthy/falsy*: `null` e `""` são ambos *falsy*. Compare explicitamente (`=== null`, `=== ""`) |
| `if (alunos)` recusa o 0, mas aceita texto | Só `0` e `NaN` são *falsy* entre os números; use `isNaN` e a faixa |
| Reserva aceita no sábado à noite | Usou `\|\|` no lugar de `&&` em `dia === SABADO && turno !== MANHA`, ou testou a capacidade antes e esqueceu o sábado |

## 9.11 Exercícios em aula

1. **Positivo, negativo ou zero.** Leia um número e mostre se ele é positivo, negativo ou zero. Se o usuário digitar letras, mostre "Isso não é um número".
2. **Calculadora com `switch`.** Leia dois números e uma operação (`+`, `-`, `*`, `/`) e mostre o resultado. Divisão por zero deve dar uma mensagem de erro. (O `switch` também funciona com texto: `case "+":`.)
3. **Contagem regressiva.** Com `for`, mostre num único `alert` a contagem de 10 até 1 e depois "Fogo!". Dica: `i--`.
4. **Senha com 3 tentativas.** A senha correta é `"1234"`. Use `while` para pedir a senha até acertar ou errar 3 vezes. Trate o Cancelar.
5. **Soma até zero.** Leia números até o usuário digitar 0 (valor sentinela). Mostre a soma, a quantidade de números e a média. Se o primeiro número já for 0, mostre "Nenhum número digitado" (evite dividir por zero).
6. **Pares de 1 a N.** Leia N (validado com `do...while`, de 1 a 100) e mostre quantos números pares existem de 1 a N e a soma deles.
7. **(Projeto) Recusar nome repetido.** No cadastro, se o nome digitado for igual ao da turma atual, mostre "Já existe uma turma com esse nome" e pergunte de novo. Compare sem diferenciar maiúsculas (`toLowerCase()`).
8. **(Projeto) Resumo da semana.** Acrescente ao menu a opção "Resumo da semana": cada nova reserva confirmada conta +1 num contador e soma 4 horas num acumulador (cada reserva é um turno inteiro de 4 h); o resumo mostra o total de reservas, o total de horas e quantos dos **16 horários** da semana foram usados.
9. **Entra ou não entra?** Sem rodar o código, diga se o `if (valor)` **entra** ou **não entra** para cada `valor`. Depois confira no console. Por fim, reescreva o `if` com comparações explícitas para que só um nome preenchido entre.

   `0` · `"0"` · `""` · `" "` · `null` · `"false"` · `-1` · `NaN` · `Number("")`

## 9.12 Desafio para a próxima aula

**Só dígitos no menu.** Hoje o menu aceita algumas respostas que não deveria: `" 2"` (com espaço) vira `2`, e o vazio é tratado como "opção inválida" em vez de "campo vazio". Mude a validação do menu para aceitar **somente dígitos** e mostrar a mensagem certa para cada erro:

| O usuário digitou | Mensagem |
|---|---|
| `""` (vazio) | "Digite uma opção." |
| `"1a"`, `" 2"`, `"-1"`, `"2.5"` | "Digite apenas números." |
| `"0"`, `"9"` | "Opção inválida. Escolha de 1 a 4." |

Dica: um texto também tem posições, como um vetor. `resposta[0]` é o primeiro caractere e `resposta.length` é o tamanho. Percorra o texto com `for` e confira se **cada** caractere está entre `"0"` e `"9"` (`letra < "0" || letra > "9"` quer dizer "não é dígito"). Use uma bandeira `somenteDigitos`.

Commit e push na branch `joao-lucas/cp3`: na aula 10, essa verificação vira uma função.

## 9.13 Resumo

- `if (cond) { } else if (cond) { } else { }`: testa de cima para baixo e para no primeiro verdadeiro;
- `switch` compara uma variável com valores fixos (usando `===`); cada `case` precisa de `break`; `default` é o `outrocaso`;
- Cancelar no `prompt` devolve **`null`**: teste antes de converter ou de usar `.trim()`;
- `Number("abc")` é **`NaN`**, e comparações com `NaN` dão `false`: use **`isNaN()`** antes da faixa;
- *Falsy* são só 6 valores: `false`, `0`, `""`, `null`, `undefined`, `NaN`; o resto é *truthy* (até `"0"` e `" "`). Reconheça no código dos outros, mas no projeto compare explicitamente;
- `while` testa antes; `do...while` testa depois e roda ao menos uma vez (condição **invertida** em relação ao `repita ... ate`); `for` quando o número de voltas é conhecido;
- Contador e acumulador nascem **fora** do laço; bandeiras (`boolean`) deixam a condição legível;
- Operador ternário (`cond ? a : b`) e `for...of`: só para **reconhecer** ao ler código; o projeto usa `if/else` e o `for` clássico;
- No projeto: menu principal em `do...while` com validação, cadastro de turma com laços, dia e turno com `switch`, regras do sábado e da capacidade com `if`.
