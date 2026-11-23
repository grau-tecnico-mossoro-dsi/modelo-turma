# Agenda de Laboratórios

Projeto da disciplina de **Lógica de Programação** (Técnico em Desenvolvimento de Sistemas · Grau Técnico).

O projeto imita o app de agenda de laboratórios que a escola usa: o professor escolhe turma, laboratório, dia e turno na **semana seguinte**, e o calendário mostra o que está ocupado. Em volta disso, o aluno faz os cadastros de cursos, turmas e professores, guarda tudo no navegador e troca dados por arquivos `.csv`.

**Todo o JavaScript é seu.** As telas (HTML e CSS) vêm prontas em `para-os-alunos/`: você copia para a sua pasta e escreve os `.js`.

## Estrutura

```
projeto/
├── dados/                      .csv de referência (dados iniciais)
└── para-os-alunos/             telas prontas: só HTML e CSS
    ├── prompt/index.html       aulas 8 a 12 (o sistema em prompt/alert)
    ├── microprojetos/          aulas 13 a 16: um index.html por seção de tela
    │   ├── index.html          lista dos microprojetos
    │   ├── estilo.css
    │   ├── comum/index.html    M0: página para testar dados.js e regras.js no console
    │   └── m1-laboratorios/ … m9-cancelar-e-espera/
    └── app/                    aula 17: as 3 telas completas, sem os <script>
```

Na sua pasta (`alunos/<sua-pasta>/`), o projeto cresce assim:

```
alunos/joao-lucas/
├── README.md
├── dados/                      .csv feitos por você (aulas 3 e 4)
├── portugol/reserva-laboratorio.alg
├── prompt/                     index.html (copiado) + script.js (cresce até o CP5)
├── microprojetos/
│   ├── estilo.css  index.html  (copiados)
│   ├── comum/                  dados.js + regras.js (M0, escritos por você)
│   └── m1-laboratorios/ …      index.html (copiado) + o .js da seção (seu)
└── app/                        aula 17: telas copiadas + os seus .js integrados
```

Todos os microprojetos carregam o **mesmo** `../comum/dados.js` e `../comum/regras.js`. Como abrem no mesmo Live Server, o `localStorage` também é o mesmo: um curso cadastrado no M2 aparece no M5 e no M7.

## Microprojetos

| Aula | Microprojeto | Você escreve | O que pratica |
|---|---|---|---|
| 13 | M0 Comum | `comum/dados.js`, `comum/regras.js` | Separar o `script.js` do CP5; funções que devolvem; `localStorage` |
| 13 | M1 Laboratórios | `laboratorios.js` | `querySelector`, `textContent` |
| 13 | M2 Cursos | `cursos.js` | Formulário, `submit`, `preventDefault`, `<select>`, CRUD |
| 14 | M3 Importar | `importar.js` | `input file`, `await`, `lerCsv`, `conferirVinculos` |
| 14 | M4 Exportar e restaurar | `exportar.js` | `gerarCsv`, download, restaurar |
| 15 | M5 Turmas | `turmas.js` | O padrão do M2 com mais regras |
| 15 | M6 Professores | `professores.js` | O padrão do M2, busca e ordem alfabética |
| 16 | M7 Nova reserva | `nova-reserva.js` | Select encadeado (`change`), regras, fila, comprovante `.txt` |
| 16 | M8 Calendário | `calendario.js` | Matriz → `<table>` |
| 16 | M9 Cancelar e espera | `cancelar-e-espera.js` | Fila, pilha, busca linear × binária |

Cada `.js` de seção segue o mesmo formato:

- uma função `atualizarX()` que mostra a seção (por exemplo, `atualizarCursos()`);
- uma função `atualizarTela()` que chama a `atualizarX()` da seção e roda depois de cada mudança;
- os `addEventListener` dos botões;
- no fim, a chamada `atualizarX()` para a primeira exibição.

Os microprojetos usam os **mesmos `id`** das telas finais. Por isso, na integração, o `.js` de cada seção funciona sem mudar a lógica.

## Integração (aula 17)

Você recebe as 3 telas completas (`para-os-alunos/app/`), copia para o seu `app/` o `comum/` e os `.js` das seções e escreve os `<script>` de cada tela. Na integração aparecem problemas que não existiam nos microprojetos: a ordem dos `<script>`, a mesma `function` em mais de um arquivo e funções repetidas. A aula 17 mostra como resolver cada um.

## Regras de negócio

| Regra | Detalhe |
|---|---|
| Semana | Reservas sempre para a **semana seguinte**. O sistema guarda só o dia (1 = segunda … 6 = sábado); a data aparece apenas na tela |
| Turnos | Manhã 08h–12h · Tarde 13h30–17h30 · Noite 18h30–22h30. A reserva é do turno inteiro |
| Sábado | Só o turno da manhã |
| Conflito | Não pode haver duas reservas do mesmo laboratório no mesmo dia e turno |
| Capacidade | Os alunos da turma precisam caber no laboratório |
| Lista de espera | Horário ocupado → o professor pode entrar na fila; ao cancelar, o primeiro da fila para aquele horário assume |
| Desfazer | Desfaz a última reserva feita (pilha) |
| Laboratório | Espaço físico: só leitura, vem do init data ou do `laboratorios.csv` |
| Curso | Sigla de 2 a 4 letras, única · nome obrigatório · **não pode excluir se tiver turma** |
| Turma | Curso obrigatório · nome único · 1 a 60 alunos · não pode passar da capacidade dos laboratórios que já reservou · **não pode excluir se tiver reserva** |
| Professor | Nome completo (2 palavras ou mais) · **não pode excluir se tiver reserva** |

## Checkpoints

| CP | Aula | O que precisa estar pronto |
|---|---|---|
| CP1 | 3 | Sua pasta, README com o algoritmo, fluxograma, `laboratorios.csv` e `cursos.csv` |
| CP2 | 6 | Portugol: menu validado, laboratórios em vetores, matriz dia × turno com conflito e capacidade |
| CP3 | 10 | JS: menu validado + CRUD de cursos em funções (arrays paralelos) |
| CP4 | 11 | Objetos, CRUD de turmas e professores, reserva com conflito e capacidade, fila e pilha |
| CP5 | 12 | Calendário (matriz), buscas, Map e Set, ordenações. **Regra de negócio pronta** |
| CP6 | 16 | Microprojetos M0 a M9 prontos, cada um com commit |
| CP7 | 18 | `app/` integrado, GitHub Pages, README final, apresentação |

Cada checkpoint é entregue por um **Pull Request** da sua branch `<sua-pasta>/cpN` para a `main` (veja o [README do repositório](../README.md)).

## Regras de escrita do código (nível da turma)

- `function nome() { }` sempre; nada de arrow function (`=>`).
- `for (let i = 0; i < lista.length; i++)` clássico, como o `para` do VisualG.
- `if / else` explícito. O operador ternário (`? :`) e o `for...of` são **explicados na aula 9**, para o aluno reconhecer ao ler código de outras pessoas, mas o projeto não usa.
- Textos montados com `+` (concatenação).
- Funções pequenas, uma tarefa cada.
- Funções **não** recebem outras funções como parâmetro. Exceções, e só a partir da aula em que aparecem: `sort(function (a, b) { ... })` (aula 12) e `addEventListener("click", nomeDaFuncao)` (aula 13).
- Na tela, só `textContent` (nunca `innerHTML` com dados digitados).
- Trechos marcados como **[RECEITA]** são entregues prontos: datas (`dataDoDia`), download (`baixarArquivo`), `localStorage`, leitura com `await`.

## Map e Set (aula 12)

A lista de objetos continua sendo a **fonte** dos dados. O Map e o Set são **atalhos** montados a partir dela, para buscar sem laço:

| Estrutura | Para quê | Antes (CP4) | Depois (CP5) |
|---|---|---|---|
| `laboratoriosPorId` (Map) | achar o laboratório pelo id | laço na lista | `get(id)` |
| `TURNOS` (Map) | nome e horário do turno | dois arrays paralelos | `TURNOS.get(2).horario` |
| `siglasCadastradas` (Set) | "a sigla já existe?" | laço na lista | `has(sigla)` |
| `horariosOcupados` (Set) | conflito de horário | laço nas reservas | `has("2-3-3")` |

Cuidado com o `localStorage`: **Map e Set não viram JSON** (`JSON.stringify(new Map())` devolve `"{}"` e os dados somem sem erro). Por isso o `salvarDados` guarda só as listas, e o `carregarDados` monta os índices de novo.

## Arquivos de dados (`dados/`)

Separador `;`, primeira linha = cabeçalho, UTF-8. Os campos `curso`, `professor`, `turma` e `laboratorio` guardam o **id**.

| Arquivo | Colunas |
|---|---|
| `laboratorios.csv` | `id;nome;capacidade` |
| `cursos.csv` | `id;sigla;nome` |
| `turmas.csv` | `id;nome;curso;alunos` |
| `professores.csv` | `id;nome` |
| `reservas.csv` | `id;professor;turma;laboratorio;dia;turno` |

Saídas: `reservas-semana-DD-MM.csv` (exportação) e `AAAAMMDDTHHMM-PROFESSOR.txt` (comprovante).

As capacidades dos laboratórios e as turmas são **exemplos**: troque pelos dados reais da escola.

## Créditos

Mecânicas do CRUD (menu validado, lista numerada, confirmação, nome do comprovante) inspiradas no [desafioCadastro](https://github.com/karilho/desafioCadastro), de Lucas Carrilho (@devmagro).
