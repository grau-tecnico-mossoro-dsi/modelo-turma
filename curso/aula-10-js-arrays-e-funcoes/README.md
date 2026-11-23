**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-09-js-decisoes-e-lacos/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-11-js-objetos-listas-pilhas-e-filas/README.md)

---

# AULA 10 — JavaScript: arrays e funções

## Objetivos da aula

- Guardar listas em **arrays**: índice (começando em **0**), `length`, `push`, `pop`, `splice`, `join`, `includes`;
- Percorrer arrays com o `for` clássico (o `para` do VisualG);
- Criar **funções** com `function`, **parâmetros** e `return`;
- Escrever funções pequenas que **respondem uma pergunta** (`true`/`false`) e usá-las nas validações;
- Diferenciar função que **faz** (procedimento) de função que **devolve** um valor, e `return` de `console.log`;
- Entender o **escopo** básico: o que nasce dentro da função fica dentro dela;
- Fechar o **CP3**: menu validado + CRUD de **cursos** (cadastrar, listar, buscar, alterar, excluir) em arrays paralelos + listar os laboratórios, tudo em funções.

## 10.1 O problema: o código da aula 9

Abra o `script.js` da aula 9 e repare em dois problemas:

1. O sistema guarda **uma** coisa de cada vez: cadastrar uma turma nova **apaga** a anterior.
2. O código é um bloco único e comprido: menu, cadastro, dia e turno, tudo misturado dentro do `switch`. Para achar uma parte, você precisa ler tudo.

São os mesmos dois problemas que o Portugol resolveu nas aulas 6 e 7:

| Problema | No VisualG | No JavaScript (hoje) |
|---|---|---|
| Guardar vários valores | vetor (aula 6) | **array** |
| Dar nome a cada parte do código | procedimento e funcao (aula 7) | **function** |

A maior parte da aula é sobre **funções**: elas são o primeiro grande "travamento" de quem aprende a programar, e o projeto inteiro, daqui para frente, é organizado em funções.

Repare também numa terceira coisa: o mesmo `do...while` de validação aparece várias vezes (opção do menu, nome da turma, alunos, dia, turno...). **Por enquanto, deixe assim.** Hoje cada função faz **uma** coisa simples. Na aula 12, quando você já estiver à vontade com funções, a turma junta essas cópias numa função só.

## 10.2 Array: o vetor do JavaScript

```javascript
let nomes = ["Eletrotécnica", "Informática", "Radiologia"];
let capacidades = [20, 30, 15];
```

```
                 índice:          0               1              2
                        ┌─────────────────┬───────────────┬──────────────┐
             nomes ───► │ Eletrotécnica   │ Informática   │ Radiologia   │
                        └─────────────────┴───────────────┴──────────────┘
       capacidades ───► │       20        │      30       │      15      │
                        └─────────────────┴───────────────┴──────────────┘
```

Diferenças em relação ao vetor do VisualG:

| | VisualG | JavaScript |
|---|---|---|
| Declaração | `nomes: vetor[1..10] de caractere` | `let nomes = [];` (ou já com valores) |
| Primeiro índice | **1** | **0** |
| Último índice | o tamanho declarado | `nomes.length - 1` |
| Tamanho | fixo | **cresce e diminui** (`push`, `splice`) |
| Quantos itens em uso | variável `quantidadeLabs` | `nomes.length` (o próprio array sabe) |

```javascript
console.log(nomes[0]);                  // Eletrotécnica
console.log(nomes[2]);                  // Radiologia
console.log(nomes.length);              // 3
console.log(nomes[nomes.length - 1]);   // o último: Radiologia
console.log(nomes[5]);                  // undefined → posição que não existe (não dá erro!)
capacidades[1] = 32;                    // troca o valor da posição 1
```

Repare: no VisualG, acessar fora do vetor **para** o programa; no JS, devolve `undefined` e segue em frente, o que esconde o erro. Atenção redobrada aos limites.

**Arrays paralelos**, como os vetores paralelos da aula 6: a posição 0 de `nomes` e a posição 0 de `capacidades` descrevem o mesmo laboratório. (Na aula 11, os objetos resolvem isso de um jeito melhor.)

## 10.3 Percorrer com `for`

O `for` clássico é o `para` do VisualG, ajustado para começar em 0:

```
 PORTUGOL                                  JAVASCRIPT
 para i de 1 ate quantidadeLabs faca       for (let i = 0; i < nomes.length; i++) {
    escreval(i, ". ", nomes[i])                console.log((i + 1) + ". " + nomes[i]);
 fimpara                                   }
```

Dois detalhes que causam o famoso erro "de um a mais ou a menos":

- começa em `i = 0`;
- a condição é `i < nomes.length` (**menor**, sem igual): com 3 itens, os índices válidos são 0, 1 e 2.

E na tela o usuário vê `i + 1`: ninguém fala "laboratório zero".

**Exemplos clássicos** ([`exemplos/classicos/script.js`](exemplos/classicos/script.js)):

```javascript
let numeros = [12, 7, 30, 5, 18, 9];

// SOMA (acumulador)
let soma = 0;
for (let i = 0; i < numeros.length; i++) {
    soma = soma + numeros[i];
}                                            // 81

// MAIOR VALOR (chute inicial = o primeiro)
let maior = numeros[0];
for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
        maior = numeros[i];
    }
}                                            // 30

// CONTAR PARES (contador)
let quantidadeDePares = 0;
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        quantidadeDePares++;
    }
}                                            // 3
```

São os mesmos padrões das aulas 5 e 6. O que mudou foi só a escrita.

## 10.4 Operações de array

```javascript
let turmas = ["1DS", "2DS", "3DS"];

turmas.push("4DS");              // adiciona no FIM       → ["1DS", "2DS", "3DS", "4DS"]
let removida = turmas.pop();     // remove do FIM e devolve → removida = "4DS"
turmas.splice(1, 1);             // na posição 1, remove 1 item → ["1DS", "3DS"]
turmas.join(", ");               // junta tudo num texto  → "1DS, 3DS"
turmas.includes("3DS");          // existe?               → true
```

```
   splice(posição, quantos)          antes:  ["1DS", "2DS", "3DS"]
                                                       ▲
   turmas.splice(1, 1)                         remove 1 a partir do índice 1
                                     depois: ["1DS", "3DS"]   (o "3DS" desce para o índice 1)
```

O `push` é o cadastro (entra no fim); o `splice` é a exclusão (sai do meio, e os de trás "andam" uma posição). Em **arrays paralelos**, o `splice` precisa ser feito em **todos** os arrays, na mesma posição; senão, os dados se desencontram.

**`includes` também funciona em texto.** Junto com `toLowerCase()` (tudo em minúsculas), ele faz a busca por parte do nome:

```javascript
"Desenvolvimento de sistemas".includes("sistemas")                 // true
"Administração".includes("admin")                                   // false (maiúscula!)
"Administração".toLowerCase().includes("admin")                     // true
```

## 10.5 Função: um bloco de código com nome

Uma função em JS tem a mesma ideia do procedimento e da funcao do VisualG:

```javascript
function mostrarLinha() {
    console.log("------------------------------");
}
```

```
   function  mostrarLinha  ( )  {  ...  }
   ────────  ────────────  ───  ─────────
       │          │         │       └── CORPO: o que a função faz
       │          │         └── PARÂMETROS (aqui, nenhum)
       │          └── NOME: um verbo que diz o que ela faz
       └── palavra que avisa "aqui começa uma função"
```

**Declarar não é executar** (igual à aula 7). O bloco acima não faz nada sozinho. Ele só roda quando alguém **chama** a função, escrevendo o nome com os parênteses:

```javascript
mostrarLinha();      // agora sim: aparece a linha no console
mostrarLinha();      // de novo
```

```
   código principal                  function mostrarLinha()
   ────────────────                  ───────────────────────
   mostrarLinha();  ──── chama ────► console.log("-----");
                    ◄─── volta ────  }
   próxima linha...
```

Esquecer os parênteses é um erro silencioso: `mostrarLinha;` (sem `()`) não chama nada e não dá erro.

## 10.6 Parâmetros e argumentos

```javascript
function somar(a, b) {
    return a + b;
}

somar(3, 4);      // a = 3, b = 4
somar(10, 20);    // a = 10, b = 20
```

- **Parâmetros** (`a`, `b`): as "variáveis de entrada" declaradas entre os parênteses. No JS, sem tipo;
- **Argumentos** (`3`, `4`): os valores enviados na chamada, copiados para os parâmetros **na mesma ordem**.

Lado a lado com o VisualG:

```
 PORTUGOL                                  JAVASCRIPT
 funcao soma(a, b: inteiro): inteiro       function somar(a, b) {
 inicio                                        return a + b;
    retorne a + b                          }
 fimfuncao
```

Se você chamar com **menos** argumentos, o parâmetro que faltou vale `undefined` (e `3 + undefined` dá `NaN`). Se chamar com **mais**, os extras são ignorados. O JS não avisa: confira a ordem e a quantidade.

Um array também pode ser argumento:

```javascript
function media(lista) {
    let total = 0;
    for (let i = 0; i < lista.length; i++) {
        total = total + lista[i];
    }
    return total / lista.length;
}

media([8, 7, 9]);          // 8
media(numeros);            // 13.5
```

A mesma função serve para **qualquer** lista: é para isso que existem os parâmetros.

## 10.7 `return`: a função devolve um valor

O `return` é o `retorne` do VisualG: ele **devolve** um valor para quem chamou e **encerra** a função na hora.

```javascript
function ehPar(numero) {
    return numero % 2 === 0;
}

let resposta = ehPar(10);          // resposta = true
if (ehPar(7)) {                    // a chamada vira o valor: if (false)
    alert("par");
}
```

A chamada de uma função com `return` **vira o valor devolvido**, e pode ir para qualquer lugar onde caberia um valor: numa variável, num `if`, dentro de um `alert`, como argumento de outra função (`somar(somar(1, 2), 3)` dá 6).

**`return` x `console.log`: a confusão nº 1 da aula.**

```javascript
function mostrarDobro(numero) {
    console.log(numero * 2);       // MOSTRA no console
}

function dobro(numero) {
    return numero * 2;             // DEVOLVE para quem chamou
}

let a = mostrarDobro(5);   // aparece 10 no console... mas a = undefined
let b = dobro(5);          // não aparece nada... mas b = 10
console.log(b + 1);        // 11
```

| | `console.log` | `return` |
|---|---|---|
| Para quem? | Para o **programador** ler no F12 | Para o **código** que chamou a função |
| O valor pode ser usado depois? | Não | Sim (guardar, somar, comparar) |
| Encerra a função? | Não | Sim |

Regra prática: função que **calcula** algo usa `return`. O `console.log` é para você conferir o que está acontecendo.

**Vários `return`, um por caminho.** Como o `return` encerra a função, ele serve para "sair mais cedo":

```javascript
function textoDaCapacidade(capacidade) {
    if (capacidade === 0) {
        return "sem lugares";
    }
    return capacidade + " lugares";
}
```

E uma função **sem** valor no `return` (só `return;`) simplesmente para ali. O projeto usa isso quando o usuário cancela no meio do cadastro.

## 10.8 Procedimento x função no JavaScript

No VisualG há duas palavras (`procedimento` e `funcao`). No JS, **tudo é `function`**; a diferença está no `return`:

| VisualG | JavaScript | Exemplo no projeto |
|---|---|---|
| `procedimento` (faz uma tarefa) | `function` **sem** `return` de valor | `listarCursos()`, `cadastrarCurso()` |
| `funcao` (devolve um valor) | `function` **com** `return valor` | `estaNaFaixa(...)`, `listaDeCursos()` |

Uma função sem `return` devolve `undefined`. Por isso `let x = listarCursos();` não faz sentido: ela **mostra** a lista, mas não **devolve** nada.

## 10.9 Escopo: o que nasce dentro, fica dentro

```javascript
function calcularVagas(capacidade, alunos) {
    let vagas = capacidade - alunos;     // vagas é LOCAL
    return vagas;
}

console.log(calcularVagas(30, 25));      // 5
console.log(vagas);                      // ERRO: vagas is not defined
```

É a variável local da aula 7. O que é declarado **dentro** da função (com `let`, ou como parâmetro) **nasce** quando ela é chamada e **some** quando ela termina. Quem está fora não enxerga.

Já o que é declarado **fora** de todas as funções (no topo do `script.js`) é **global**: todas as funções enxergam. No projeto, os arrays dos cursos ficam globais, porque todas as funções do CRUD trabalham com eles.

```
   ┌─────────────── script.js (global) ────────────────────┐
   │ let siglasDosCursos = [...];                           │
   │ let nomesDosCursos = [...];                            │
   │                                                        │
   │   ┌── function cadastrarCurso() ───────────────────┐  │
   │   │ let sigla, nome (locais)                       │  │
   │   │ enxerga siglasDosCursos, nomesDosCursos        │  │
   │   └────────────────────────────────────────────────┘  │
   │                                                        │
   │   ┌── function estaNaFaixa(numero, minimo, maximo) ┐  │
   │   │ parâmetros (locais)                            │  │
   │   └────────────────────────────────────────────────┘  │
   └────────────────────────────────────────────────────────┘
```

Regra do curso: dados do sistema (os arrays) são globais; todo o resto (contadores, respostas do `prompt`, auxiliares) é local. Assim, duas funções podem ter uma variável `resposta` cada uma, sem que uma estrague a outra.

## 10.10 Funções pequenas que respondem perguntas

O desafio da aula 9 (só dígitos) vira a primeira função do projeto. Ela recebe um texto e responde `true` ou `false`. Junto com ela, uma função para a faixa:

```javascript
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

function estaNaFaixa(numero, minimo, maximo) {
    return numero >= minimo && numero <= maximo;
}
```

As duas **não perguntam nada ao usuário** e **não mostram nada**: só recebem um valor e respondem. Por isso são fáceis de testar no console (F12):

```javascript
somenteDigitos("25")        // true
somenteDigitos("2a")        // false
somenteDigitos("")          // false
estaNaFaixa(70, 1, 60)      // false
estaNaFaixa(30, 1, 60)      // true
```

Quem **pergunta** e **insiste** continua sendo o `do...while` da aula 9. A diferença é que agora o `if` lê como uma frase:

```javascript
let alunos = 0;
let cancelou = false;
do {
    let resposta = prompt("Número de alunos (1 a 60):");
    if (resposta === null) {
        cancelou = true;
    } else if (somenteDigitos(resposta.trim()) === false) {
        alert("Digite apenas números inteiros.");
    } else if (estaNaFaixa(Number(resposta), 1, 60) === false) {
        alert("O número de alunos deve ser de 1 a 60.");
    } else {
        alunos = Number(resposta);
    }
} while (alunos === 0 && cancelou === false);
```

Leia a condição do laço em voz alta: "repita enquanto **ainda não tenho** o número de alunos **e** o usuário **não cancelou**". O próprio `0` serve de sinal de "ainda não tenho", porque 0 nunca é um número de alunos válido.

```
   prompt ──► null? ──── sim ──► cancelou = true ─────────────────┐
                │                                                  │
               não                                                 │
                ▼                                                  │
        somenteDigitos? ── não ──► alert("Digite apenas números") ─┤
                │                                                  │
               sim                                                 ▼
                ▼                                            alunos === 0
         estaNaFaixa? ──── não ──► alert("de 1 a 60") ────► e não cancelou?
                │                                            │          │
               sim                                          sim        não
                ▼                                            │          │
          alunos = Number(resposta) ─────────────────────────┘          ▼
                                                           (volta ao prompt)  segue o código
```

É o "dividir para conquistar" da aula 7: cada função resolve um problema **pequeno**. Uma função que perguntasse, validasse, repetisse e tratasse o Cancelar ao mesmo tempo faria quatro coisas; aqui cada parte tem o seu lugar.

## 10.11 Projeto da disciplina: o que fazemos hoje

Hoje o projeto chega ao **CP3**: o menu validado, o CRUD de **cursos** (cadastrar, listar, buscar, alterar, excluir) com os cursos em **arrays paralelos** e a lista dos **laboratórios**, tudo organizado em **funções**. A referência completa está em [`exemplos/projeto/script.js`](exemplos/projeto/script.js). O roteiro é o README que você escreveu na aula 7: cada procedimento/funcao do `.alg` vira uma `function`.

Por que cursos? O laboratório é um **espaço físico**: a escola não cria um laboratório novo pelo sistema. Por isso os laboratórios só são **listados**. Quem muda de verdade são os cursos, as turmas e os professores. Hoje fazemos os cursos; turmas e professores entram na aula 11.

**Passo 1. Os dados em arrays**, no topo do `script.js`:

```javascript
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
```

São os cursos e laboratórios do app real da escola (os mesmos dos `.csv` da pasta `dados/`). A posição 0 dos três arrays de cursos é o mesmo curso (id 1, ADM, Administração). O **id** identifica o curso e nunca muda, mesmo que a sigla ou o nome mudem. O `proximoIdCurso` guarda o id que o próximo curso cadastrado vai receber.

**Passo 2. As funções de pergunta** (seção 10.10) e a primeira **busca linear** do projeto:

| Função | Recebe | Devolve |
|---|---|---|
| `somenteDigitos(texto)` | um texto | `true` se só tem dígitos (e não é vazio) |
| `estaNaFaixa(numero, minimo, maximo)` | um número e a faixa | `true` se está dentro da faixa |
| `siglaJaExiste(sigla, posicaoIgnorada)` | uma sigla e uma posição | `true` se **outra** posição já usa essa sigla |

```javascript
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
```

**Busca linear** é olhar um por um, do começo ao fim, até achar. O `return true` sai da função assim que encontra; o `return false` só acontece depois de olhar **todos**. O `posicaoIgnorada` existe por causa do **alterar**: ao manter a sigla `ADM` do próprio curso ADM, ela não pode contar como repetida. No cadastro, passamos `-1`, uma posição que não existe. Teste as três funções no console antes de seguir: `siglaJaExiste("adm", -1)` dá `true`; `siglaJaExiste("adm", 0)` dá `false`.

**Passo 3. Listas numeradas.** Funções separadas, cada uma com uma tarefa: uma **monta** o texto de um curso; outra **monta** a lista inteira; outra **mostra**. As duas primeiras usam `return`, porque o texto da lista será usado em mais de um lugar (listar, alterar e excluir).

```javascript
function textoDoCurso(posicao) {
    return siglasDosCursos[posicao] + " - " + nomesDosCursos[posicao];
}

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
```

A `listarLaboratorios()` é o mesmo laço, com `nomesDosLaboratorios[i] + " - " + capacidadesDosLaboratorios[i] + " lugares"`.

**Passo 4. `cadastrarCurso()`.** São duas leituras, uma embaixo da outra, no **mesmo formato** da seção 10.10. Uma única variável `cancelou` serve para as duas; depois de cada leitura, se o usuário cancelou, o `return;` sai do cadastro **sem gravar nada**:

```javascript
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

    // NOME: o mesmo bloco, só com "O nome é obrigatório."

    idsDosCursos.push(proximoIdCurso);
    siglasDosCursos.push(sigla);
    nomesDosCursos.push(nome);
    proximoIdCurso = proximoIdCurso + 1;
    alert("Curso cadastrado: " + sigla + " - " + nome);
}
```

Repare: a sigla é guardada **em maiúsculas** (`toUpperCase()`), então quem digita `dsw` grava `DSW`. E o `push` é feito nos **três** arrays, sempre juntos.

**Passo 5. Escolher da lista: `escolherCurso`, `excluirCurso` e `alterarCurso`.** As regras do desafioCadastro: escolher **a partir da lista numerada**, **confirmar** e só então remover. Como alterar e excluir precisam escolher um curso, a escolha vira uma função que devolve a **posição** (ou `-1` se a pessoa cancelar). O número que o usuário vê começa em 1; a posição no array começa em 0:

```javascript
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
```

Repare no argumento `siglasDosCursos.length` do `estaNaFaixa`: com 10 cursos, a faixa é de 1 a 10; com 11, de 1 a 11. A **mesma** função de pergunta serve, porque o máximo é um parâmetro.

A `alterarCurso()` usa a mesma `escolherCurso("Qual curso deseja alterar?")` e depois pergunta a nova sigla e o novo nome. Regra do alterar: **em branco = mantém o valor atual**, e o **id não muda**. Na sigla, o `siglaJaExiste` recebe a `posicao` do próprio curso, para ele não "bater" com ele mesmo:

```javascript
let resposta = prompt("Nova sigla (em branco = manter " + siglasDosCursos[posicao] + "):");
if (resposta === null) {
    cancelou = true;
} else if (resposta.trim() === "") {
    sigla = siglasDosCursos[posicao];                 // em branco: mantém
} else if (siglaJaExiste(resposta.trim(), posicao)) {
    alert("A sigla " + resposta.trim().toUpperCase() + " já existe.");
} else {
    sigla = resposta.trim().toUpperCase();
}
```

No fim, `siglasDosCursos[posicao] = sigla;` e `nomesDosCursos[posicao] = nome.trim();` trocam os valores **na mesma posição**. O código completo está em [`exemplos/projeto/script.js`](exemplos/projeto/script.js).

**Passo 6. `buscarCurso()`.** O texto procurado é lido com o mesmo bloco da sigla (obrigatório, Cancelar sai) e guardado em minúsculas. O curso aparece no resultado se a **sigla** for igual ao texto **ou** se o **nome** contiver o texto: `"adm"` acha pela sigla, `"admin"` acha pelo nome. O resultado mantém o **número original** da lista (`i + 1`):

```javascript
for (let i = 0; i < siglasDosCursos.length; i++) {
    let achouNaSigla = siglasDosCursos[i].toLowerCase() === procurado;
    let achouNoNome = nomesDosCursos[i].toLowerCase().includes(procurado);
    if (achouNaSigla || achouNoNome) {
        resultado = resultado + (i + 1) + ". " + textoDoCurso(i) + "\n";
    }
}
```

**Passo 7. `menuPrincipal()`.** É o menu da aula 9 dentro de uma função: um laço que repete o menu e, dentro dele, o laço que valida a opção. Cancelar no menu vale como "Sair":

```javascript
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

menuPrincipal();      // a ÚNICA linha fora de funções que executa algo
```

```
   do {                                   ◄── laço de FORA: repete o menu
       opcao = 0;                             (zera para a próxima volta)
       do {                               ◄── laço de DENTRO: valida a opção
           prompt + somenteDigitos + estaNaFaixa
       } while (opcao === 0 && cancelou === false);
       switch (opcao) { ... }             ◄── executa a opção escolhida
   } while (opcao !== 7);
```

O `opcao = 0;` no começo de cada volta é importante: sem ele, a `opcao` da volta anterior (por exemplo, `2`) já é diferente de 0, e o laço de dentro não pergunta nada.

**Passo 8. Testar (roteiro do CP3).** Menu com `0`, `9`, `abc`, ` 2` → recusados. Listar cursos (10) e laboratórios (5). Cadastrar com sigla vazia (recusa), sigla `adm` (recusa: "A sigla ADM já existe."), sigla `dsw` e nome vazio (recusa), depois nome "Desenvolvimento web": listar (11. DSW - Desenvolvimento web). Buscar `adm` (pela sigla) e `segur` (pelo nome). Alterar o 11 deixando a sigla em branco (mantém DSW) e trocando o nome. Excluir o 2, cancelar no `confirm` (nada muda); excluir de novo e confirmar; listar (o antigo 3 virou 2). Começar um cadastro e clicar em **Cancelar** no nome: nada é gravado. Cancelar no menu: "Até logo!".

**Passo 9. Commit e Pull Request do CP3.** Dentro de `alunos/joao-lucas/`, na branch `joao-lucas/cp3`:

```
git add prompt/script.js
git commit -m "feat: adiciona CRUD de cursos em funcoes"
git push
```

Agora, abra o Pull Request da branch `joao-lucas/cp3` para a `main` e confira o check do Action. O Action confere três coisas: você só mexeu na sua pasta, os `.js` passam no `node --check` e não há arquivo indevido. Se o check falhar, corrija na mesma branch e faça push de novo: o PR atualiza sozinho. O professor revisa e comenta no PR; você corrige na mesma branch, e o professor faz o merge.

## 10.12 Erros comuns

| Sintoma | Causa |
|---|---|
| A função nunca roda | Foi declarada mas não foi chamada, ou foi chamada sem os parênteses (`menuPrincipal;`) |
| Variável recebe `undefined` | A função não tem `return` (só tem `console.log` ou `alert`) |
| Resultado `NaN` numa função de conta | Chamou com menos argumentos: o parâmetro que faltou é `undefined` |
| Argumentos "trocados" | A ordem da chamada é diferente da ordem dos parâmetros |
| `x is not defined` fora da função | A variável é local da função |
| Código depois do `return` não roda | O `return` encerra a função na hora |
| O primeiro curso nunca aparece | O `for` começou em `i = 1` |
| `undefined` no fim da lista | O `for` usou `i <= siglasDosCursos.length` em vez de `<` |
| Excluiu o curso errado | Esqueceu de fazer `numero - 1` para virar posição |
| Sigla de um curso com o nome de outro | `splice` ou `push` feito em só **um** dos arrays paralelos |
| A busca não acha "admin" | Faltou `toLowerCase()` em um dos lados |
| `ADM` e `adm` cadastrados como cursos diferentes | Faltou `toUpperCase()` ao guardar ou ao comparar no `siglaJaExiste` |
| No alterar, manter a própria sigla dá "já existe" | Passou `-1` em vez da `posicao` do curso para o `siglaJaExiste` |
| O menu aparece uma vez e depois some (ou repete a mesma opção sem perguntar) | Faltou `opcao = 0;` no começo da volta: a opção anterior já faz o laço de dentro terminar |
| A aba congelou numa leitura | O bloco `null` não marca `cancelou = true`, ou o `else` final não guarda o valor lido |
| Cancelar no meio do cadastro grava mesmo assim | Faltou `if (cancelou === true) { return; }` depois de uma das leituras |
| `somenteDigitos(" 2")` dá `false` | O espaço não é dígito: faltou `.trim()` antes de chamar |

## 10.13 Exercícios em aula

1. **Maior e menor.** Crie as funções `maiorValor(lista)` e `menorValor(lista)` e teste com `[12, 7, 30, 5, 18, 9]` e com `[-3, -8, -1]`.
2. **Contar pares com função.** Crie `contarPares(lista)` usando a função `ehPar(numero)` dentro do laço.
3. **Saudação.** Crie `saudacao(nome, periodo)` que **devolve** "Bom dia, Ana!" (período 1), "Boa tarde, Ana!" (2) ou "Boa noite, Ana!" (3). Use o valor devolvido num `alert`.
4. **Return ou console.log?** Sem rodar, diga o que aparece no console:
   ```javascript
   function triplo(n) { console.log(n * 3); }
   function quadrado(n) { return n * n; }
   let x = triplo(2);
   let y = quadrado(3);
   console.log(x, y, quadrado(y));
   ```
5. **Lista de compras.** Comece com `let compras = [];`. Com um laço, leia itens até o usuário cancelar (`push` em cada um). Depois, mostre a lista numerada (com uma função `listaNumerada(lista)` que **devolve** o texto) e pergunte qual item remover (`splice`).
6. **Média da turma.** Leia N notas num array (N validado com o bloco `do...while` + `somenteDigitos` + `estaNaFaixa`, de 1 a 40) e mostre a média, a maior nota e quantas ficaram acima da média, usando as funções `media`, `maiorValor` e uma nova `contarAcimaDe(lista, valor)`.
7. **(Projeto) Total de lugares.** Crie `totalDeLugares()` que **devolve** a soma de todas as capacidades dos laboratórios e mostre-o no fim da listagem dos laboratórios: "Total: 110 lugares em 5 laboratórios".
8. **(Projeto) Nome de curso repetido.** No cadastro, recuse um **nome** de curso que já existe (sem diferenciar maiúsculas). Crie `nomeDeCursoJaExiste(nome, posicaoIgnorada)`, no mesmo formato do `siglaJaExiste`.
9. **Função de pergunta.** Crie `ehNomeValido(texto)` que devolve `false` para `null` e para texto vazio (ou só com espaços) e `true` para o resto. Teste no console com `null`, `""`, `"   "` e `"Administração"`. Depois, use-a no bloco do nome do cadastro.

## 10.14 Desafio para a próxima aula

**Validar a sigla: só letras, de 2 a 4.** Hoje o cadastro aceita `A`, `ADMIN1` e `12`. A regra do projeto é: a sigla tem **de 2 a 4 letras**, sem número, espaço ou acento.

- Crie a função de pergunta `siglaValida(sigla)`, que devolve `true` ou `false` (sem `prompt` nem `alert`, como a `somenteDigitos`);
- dica: transforme em maiúsculas e confira, letra por letra, se cada uma está entre `"A"` e `"Z"` (o mesmo truque do `somenteDigitos`, que confere entre `"0"` e `"9"`);
- use-a no cadastro e no alterar, com a mensagem "A sigla deve ter de 2 a 4 letras.";
- teste no console: `siglaValida("ADM")` → `true`; `siglaValida("a")`, `siglaValida("ADMIN")`, `siglaValida("AD1")` e `siglaValida("ÁGU")` → `false`.

Por fim, **conte** quantos blocos `do...while` de validação o seu `script.js` tem e anote o número no `README.md` da sua pasta (`alunos/joao-lucas/README.md`). Esse número volta na aula 12.

Commit e push na branch `joao-lucas/cp3` (o PR aberto recebe o commit novo). Depois do merge, comece o CP4:

```
git switch main
git pull
git switch -c joao-lucas/cp4
```

Na aula 11, os arrays paralelos viram **objetos**, e chegam as turmas, os professores e as reservas.

## 10.15 Resumo

- **Array**: lista entre `[ ]`; índice começa em **0**; o último é `length - 1`; fora dos limites dá `undefined`;
- Percorrer: `for (let i = 0; i < lista.length; i++)`; na tela, mostre `i + 1`;
- `push` (fim), `pop` (tira do fim), `splice(posicao, 1)` (tira do meio), `join` (vira texto), `includes` (existe?); em texto, `toLowerCase().includes(...)` faz busca parcial;
- **Função**: `function nome(parametros) { ... }`; declarar não é executar; chamar = `nome(argumentos)`;
- `return` **devolve** o valor e encerra a função; `console.log` só **mostra**. Sem `return`, a função devolve `undefined`;
- Procedimento = função sem `return` de valor; função = com `return`;
- **Escopo**: o que é declarado dentro da função é local; os arrays do sistema ficam globais;
- **Funções de pergunta** (`somenteDigitos`, `estaNaFaixa`, `siglaJaExiste`) recebem um valor e devolvem `true`/`false`, sem `prompt` nem `alert`; a leitura com `do...while` + `cancelou` fica em quem chama;
- **Busca linear**: olhar um por um até achar (`siglaJaExiste`, `buscarCurso`);
- No projeto: laboratórios só listados; cursos em arrays paralelos com `textoDoCurso`, `listaDeCursos`, `listarCursos`, `escolherCurso`, `cadastrarCurso`, `alterarCurso`, `buscarCurso`, `excluirCurso`, `listarLaboratorios`, `menuPrincipal`. **CP3.**
