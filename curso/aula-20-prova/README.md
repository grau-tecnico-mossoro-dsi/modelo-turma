**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-19-revisao/README.md) · [Índice do curso](../README.md)

---

# AULA 20 — Prova padrão Grau Técnico

## Objetivos da aula

- Saber **como funciona a prova** e chegar sem surpresas;
- Ter uma **estratégia** para questões de múltipla escolha e de leitura de algoritmo;
- Treinar com um **simulado de 10 questões** no estilo da prova (Portugol, teste de mesa e JavaScript);
- Fechar a disciplina e enxergar o próximo passo (Programação Orientada a Objetos).

## 20.1 Como é a prova

A prova é a **prova padrão do Grau Técnico** para a disciplina de Lógica de Programação. O professor confirma com a turma, antes do dia, os detalhes que dependem da coordenação:

| Item | Confirme com o professor |
|---|---|
| Duração | quanto tempo de prova |
| Número de questões | quantas, e quantas de cada tipo |
| Tipo de questão | múltipla escolha (a–e), leitura de algoritmo, teste de mesa |
| Consulta | se pode consultar algo (folha de estudo, caderno) ou não |
| Material | caneta (azul ou preta), lápis e borracha para o rascunho, documento |
| Peso | quanto a prova vale na nota da disciplina |

O conteúdo é o da disciplina inteira, com mais peso em:

- algoritmo, fluxograma, compilação × interpretação;
- **Portugol** (VisualG): variáveis, operadores, decisão, repetição, vetor, matriz, procedimento e função;
- **teste de mesa**;
- **JavaScript**: tipos, operadores, decisão, laços, arrays, funções, objetos, pilha, fila, matriz, busca e ordenação.

## 20.2 Estratégia para a prova

```
   1. LEIA A PROVA INTEIRA (2 min)  →  marque as fáceis com um ✓
   2. FAÇA AS FÁCEIS PRIMEIRO       →  ganha confiança e tempo
   3. TESTE DE MESA NO RASCUNHO     →  tabela, sempre; nunca "de cabeça"
   4. VOLTE NAS DIFÍCEIS            →  elimine alternativas absurdas
   5. REVISE E PASSE A LIMPO        →  confira se marcou a letra certa
```

**Em questões de múltipla escolha:**

- Resolva **antes** de olhar as alternativas. Se você olha primeiro, a alternativa "parecida" engana.
- As alternativas erradas costumam ser os **erros típicos**: errar uma volta do laço, somar texto como número, confundir fila com pilha. Se a sua resposta bate com uma delas, confira se você não caiu na armadilha.
- Se não souber, **elimine**: cada alternativa descartada aumenta a sua chance.

**Em questões de leitura de algoritmo:**

1. Encontre o **algoritmo principal** (o último `inicio`, em Portugol; as linhas fora das `function`, em JS).
2. Faça uma coluna para cada variável e anote os valores iniciais.
3. Siga linha por linha. Ao chamar uma função, anote o valor de cada **parâmetro** e "entre" nela; o valor do `retorne` volta para o lugar da chamada.
4. Num laço, escreva a condição a cada volta: "i = 4: 4 <= 5? sim".
5. Anote a **saída** à parte, na ordem em que aparece.

## 20.3 Simulado

Faça como se fosse a prova: **40 minutos**, sem consulta, sem computador. Use o rascunho para os testes de mesa. A correção, com a justificativa de cada questão, é feita com o professor, depois do simulado.

---

**Questão 1.** Em um fluxograma, o símbolo em forma de **losango** representa:

a) o início ou o fim do algoritmo
b) uma entrada de dados
c) uma decisão, com dois caminhos (sim / não)
d) um processamento, como uma conta ou uma atribuição
e) um conector entre partes do fluxograma

---

**Questão 2.** No VisualG, depois de executar

```
a <- 17 mod 5
b <- 17 \ 5
```

os valores de `a` e `b` são, respectivamente:

a) 3 e 2
b) 2 e 3
c) 2 e 3.4
d) 3.4 e 2
e) 12 e 3

---

**Questão 3.** Faça o teste de mesa. O que aparece na tela?

```
x <- 1
c <- 0
repita
   x <- x * 3
   c <- c + 1
ate x > 50
escreval(x, " ", c)
```

a) 27 3
b) 81 3
c) 243 5
d) 81 4
e) 54 4

---

**Questão 4.** Leia o algoritmo. Depois da linha de traços, o que aparece na tela?

```
algoritmo "q4"
var
   x, y: inteiro

funcao maior(a, b: inteiro): inteiro
inicio
   se a > b entao
      retorne a
   senao
      retorne b
   fimse
fimfuncao

procedimento linha
inicio
   escreval("---")
fimprocedimento

inicio
   x <- maior(4, 9)
   y <- maior(x, 7)
   linha
   escreval(x + y)
fimalgoritmo
```

a) 13
b) 16
c) 18
d) 9
e) 7

---

**Questão 5.** No sistema de reservas, a grade da semana de um laboratório foi declarada no VisualG como

```
grade: vetor[1..6, 1..3] de caractere
```

com as linhas sendo os dias (1 = segunda ... 6 = sábado) e as colunas os turnos (1 manhã, 2 tarde, 3 noite). Quantas posições tem a matriz e o que representa `grade[2, 3]`?

a) 9 posições; quarta-feira, à noite
b) 18 posições; terça-feira, à tarde (13h30 às 17h30)
c) 18 posições; quarta-feira, de manhã (08h às 12h)
d) 9 posições; terça-feira, à noite
e) 18 posições; terça-feira, à noite (18h30 às 22h30)

---

**Questão 6.** O que aparece no console?

```javascript
let a = "2";
let b = 3;
console.log(a + b * 2);
```

a) 10
b) 26
c) 8
d) 232
e) NaN

---

**Questão 7.** Qual é o valor de `soma` no fim?

```javascript
let soma = 0;
for (let i = 1; i <= 10; i++) {
    if (i % 3 === 0) {
        soma = soma + i;
    }
}
```

a) 18
b) 9
c) 12
d) 30
e) 55

---

**Questão 8.** A lista de espera do sistema de reservas é uma **fila**. O que aparece no console?

```javascript
let fila = [];
fila.push("A");
fila.push("B");
fila.push("C");
fila.shift();
fila.push("D");
console.log(fila[0], fila.length);
```

a) A 3
b) B 4
c) D 4
d) B 3
e) C 3

---

**Questão 9.** Qual é o valor de `cabem` no fim?

```javascript
function turmaCabe(turma, laboratorio) {
    return turma.alunos <= laboratorio.capacidade;
}

let laboratorio = { id: 2, nome: "Informática", capacidade: 30 };
let turmas = [{ nome: "ADM09", alunos: 28 }, { nome: "ADM11", alunos: 30 }, { nome: "DSI03", alunos: 31 }];
let cabem = 0;
for (let i = 0; i < turmas.length; i++) {
    if (turmaCabe(turmas[i], laboratorio)) {
        cabem = cabem + 1;
    }
}
```

a) 1
b) 2
c) 3
d) 0
e) 30

---

**Questão 10.** O **bubble sort** compara cada par de vizinhos e troca os dois se o da esquerda for maior. Como fica o array `[7, 3, 9, 2]` depois da **primeira volta** (uma passada completa do começo ao fim)?

a) [3, 7, 2, 9]
b) [2, 3, 7, 9]
c) [3, 7, 9, 2]
d) [2, 7, 9, 3]
e) [3, 2, 7, 9]

---

## 20.4 Projeto da disciplina: o que fazemos hoje

Nada de código novo. O projeto já foi entregue e apresentado (CP7). Depois da prova:

1. **Devolutiva do projeto:** cada dupla recebe a rubrica da aula 18 preenchida.
2. **Retrospectiva:** abra o histórico dos seus commits (`git log --oneline -- alunos/<sua-pasta>`, que mostra só os commits que mexeram na sua pasta) e veja o caminho: do `README` com o algoritmo em português (aula 3) ao sistema publicado (aula 18). Cada etapa usou o conteúdo de uma aula.
3. **Portfólio:** a sua pasta no repositório da turma é pública. Deixe o README dela caprichado, com o link do site no topo: é o primeiro projeto do seu portfólio.

## 20.5 Erros comuns na prova

| Erro | Como evitar |
|---|---|
| Marcar a alternativa "parecida" sem fazer a conta | Resolva no rascunho antes de olhar as alternativas |
| Errar uma volta do laço | Escreva a condição testada em cada linha do teste de mesa |
| Somar `"2" + 6` como número | `+` com texto concatena |
| Confundir `retorne` com `escreval` | `retorne` não mostra nada: devolve o valor para quem chamou |
| Parar o `repita` na hora errada | Ele para quando a condição do `ate` fica **verdadeira** |
| Contar o índice do VisualG a partir de 0 | VisualG começa em 1; JavaScript em 0 |
| Deixar questão em branco | Elimine alternativas e marque a mais provável |
| Errar a letra ao passar a limpo | Reserve os últimos minutos para conferir |

## 20.6 Exercícios em aula

O exercício desta aula é o **simulado do 20.3**. Depois de fazer:

1. Corrija o simulado com o professor.
2. Para cada questão errada, refaça o teste de mesa e escreva **em uma frase** onde estava o erro.
3. Volte à seção da aula 19 do tema da questão errada (19.3 a 19.11).

## 20.7 Desafio para depois da disciplina

**A ponte para POO.** As mecânicas do cadastro do nosso projeto vieram do [desafioCadastro](https://github.com/karilho/desafioCadastro), de Lucas Carrilho (@devmagro), que é escrito em **Java**. Na disciplina de Programação Orientada a Objetos vocês vão fazer o desafio original. Para chegar preparados:

1. Abra o repositório do desafio e leia o enunciado.
2. Encontre nele 3 coisas que vocês já fizeram no sistema de reservas (por exemplo: menu validado, lista numerada para escolher o item, nome de arquivo com data e hora).
3. Escreva, no README da sua pasta (numa branch nova, com PR), uma seção "Próximos passos" com essas 3 coisas e uma frase sobre o que você acha que muda quando o sistema for escrito em Java.

## 20.8 Resumo

- Confirme antes do dia: duração, número e tipo de questões, consulta e material.
- Estratégia: ler tudo, fáceis primeiro, teste de mesa no rascunho, eliminar alternativas, revisar.
- Resolva antes de olhar as alternativas: as erradas são os erros típicos.
- Leitura de algoritmo: comece pelo programa principal, siga as chamadas, anote parâmetros e retornos.
- A disciplina termina aqui, mas o projeto continua: ele é o primeiro item do seu portfólio, e o desafioCadastro em Java é o próximo passo, em POO.
