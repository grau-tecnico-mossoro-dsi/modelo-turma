**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-16-pratica-contexto-extra/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-18-projeto-publicacao-e-apresentacao/README.md)

---

# AULA 17 — Projeto: integração das 3 telas, testes e README

## Objetivos da aula

- **Integrar** os microprojetos M1 a M9 nas 3 telas completas (agenda, cadastros, arquivos), na pasta `app/`;
- Resolver os **três problemas** que aparecem ao juntar arquivos que foram feitos separados:
  1. a **ordem** dos `<script>`;
  2. a **mesma função** em vários arquivos (vale a última carregada, sem nenhum erro);
  3. **funções repetidas** nas seções → uma cópia só, no `tela.js`;
- Testar **todos os fluxos** do app integrado com uma lista de testes, comparando o **esperado** com o **obtido**;
- Escrever o **README final** do projeto.

## 17.1 Do microprojeto para a tela completa

Até a aula 16, cada seção morou numa página só dela. O app real tem **3 telas**, e cada tela junta várias seções:

| Tela | Arquivo | Seções (microprojetos) |
|---|---|---|
| Agenda | `index.html` | M7 Nova reserva, M8 Calendário, M9 Cancelar e espera |
| Cadastros | `cadastros.html` | M2 Cursos, M5 Turmas, M6 Professores, M1 Laboratórios |
| Arquivos | `arquivos.html` | M3 Importar, M4 Exportar e restaurar |

O professor entrega hoje a pasta **`app/`** com as 3 telas completas (`index.html`, `cadastros.html`, `arquivos.html` e `estilo.css`). As telas **não têm nenhum `<script>`**: no `<head>` de cada uma há um comentário dizendo onde você vai escrevê-los.

Os microprojetos usaram os **mesmos `id`** das telas finais (`#form-turma`, `#res-curso`, `#lista-cursos`...). Por isso a **lógica** de cada `.js` não muda. O que muda é que agora várias seções dividem a mesma página, e isso traz três problemas. Eles vão aparecer de propósito, um de cada vez.

## 17.2 Passo 1: copiar os arquivos

1. Crie a branch do CP7. Se o PR do CP6 já teve merge, parta da `main`:

   ```bash
   git switch main
   git pull
   git switch -c joao-lucas/cp7
   ```

   Se o PR do CP6 ainda está aberto, parta da branch dele: `git switch joao-lucas/cp6` e `git switch -c joao-lucas/cp7`. Troque `joao-lucas` pelo nome da sua pasta.
2. Copie a pasta `app/` entregue para a sua pasta (`alunos/<sua-pasta>/`), ao lado de `microprojetos/` e `dados/`. De dentro de `alunos/<sua-pasta>/`:

   ```bash
   cp -r ../../projeto/para-os-alunos/app .
   ```

3. **Copie** (não mova) para dentro de `app/`:
   - os dois arquivos de `microprojetos/comum/`: `dados.js` e `regras.js`;
   - o `.js` de cada microprojeto: `laboratorios.js`, `cursos.js`, `importar.js`, `exportar.js`, `turmas.js`, `professores.js`, `nova-reserva.js`, `calendario.js` e `cancelar-e-espera.js`.

```
   alunos/joao-lucas/
   ├── dados/                  .csv (aulas 3 e 4)
   ├── microprojetos/          ficam como estão (o histórico das aulas 13 a 16)
   └── app/
       ├── index.html  cadastros.html  arquivos.html  estilo.css    (entregues)
       ├── dados.js  regras.js                                       (de microprojetos/comum/)
       ├── laboratorios.js  cursos.js  turmas.js  professores.js     (seções dos cadastros)
       ├── nova-reserva.js  calendario.js  cancelar-e-espera.js      (seções da agenda)
       └── importar.js  exportar.js                                  (seções dos arquivos)
```

Por que copiar, e não mover? Os microprojetos continuam funcionando, como registro do que você fez em cada aula. A partir de agora, **mexa só nos arquivos de `app/`**: mudar o `microprojetos/m5-turmas/turmas.js` não muda o `app/turmas.js`.

Commit: `git add app` e `git commit -m "feat: copia as telas e os microprojetos para o app"`.

## 17.3 Problema 1: a ordem dos `<script>`

Abra o `app/cadastros.html`. **Faça de propósito:** no lugar do comentário do `<head>`, escreva só os `.js` das seções, na ordem em que elas aparecem na página:

```html
<script src="cursos.js" defer></script>
<script src="turmas.js" defer></script>
<script src="professores.js" defer></script>
<script src="laboratorios.js" defer></script>
<script src="dados.js" defer></script>
<script src="regras.js" defer></script>
```

Abra com o Live Server, F12 → Console:

```
✖ Uncaught ReferenceError: cursos is not defined
      at atualizarCursos (cursos.js:...)
      at cursos.js:...
```

(E outros parecidos logo abaixo, um para cada seção: `turmas is not defined`, `professores is not defined`...)

**Por quê?** O `defer` diz ao navegador: "espere o HTML terminar de carregar e então rode os scripts **na ordem em que aparecem**". O `cursos.js` rodou primeiro, e a última linha dele chama `atualizarCursos()`, que usa a lista `cursos`. Mas quem cria a lista é o `dados.js`, que ainda não tinha rodado. Para o navegador, `cursos` não existe.

Repare: um script com erro **para naquela linha**, mas os outros continuam. Por isso parte da tela pode funcionar e parte não. Não confie no "parece que funciona": olhe o console.

**Correção:** quem **cria** vem antes de quem **usa**. O `dados.js` cria as listas, as constantes e o Map/Set; o `regras.js` usa o `dados.js`; as seções usam os dois. Ordem: `dados.js` → `regras.js` → as seções. Corrija nas 3 telas e confira o console de cada uma.

Commit: `git commit -am "fix: corrige a ordem dos scripts das telas"`.

## 17.4 Problema 2: a mesma função em vários arquivos

Com a ordem certa, o console está limpo. Agora teste a tela de cadastros: **Restaurar dados iniciais** (tela Arquivos), volte para Cadastros e cadastre o curso `QUI` - `Química`.

- A mensagem "Cadastrado: Id 11 - QUI - Química" aparece.
- Mas o `QUI` **não** aparece na lista de cursos, nem no select "Curso" das turmas.
- Aperte F5: agora ele aparece. Então o curso **foi** salvo; a tela é que não foi atualizada.

Nenhum erro no console. Para investigar, digite no console o **nome** da função, sem parênteses, e aperte Enter:

```
> atualizarTela
ƒ atualizarTela() {
    atualizarLaboratorios();
}
```

**Por quê?** Cada microprojeto tinha a sua `atualizarTela()`. O `cursos.js` criou uma que chama a `atualizarCursos()`; o `turmas.js` criou **outra**, com o mesmo nome; e assim por diante. Quando dois arquivos criam uma `function` com o mesmo nome, o JavaScript **não reclama**: a segunda **substitui** a primeira. Vale a **última carregada**, que, na ordem do 17.3, é a do `laboratorios.js`. O `concluirCurso` chama `atualizarTela()`, e quem responde só atualiza os laboratórios.

```
   cursos.js        function atualizarTela() { atualizarCursos(); }        ─┐
   turmas.js        function atualizarTela() { atualizarTurmas(); }         ├─ cada uma apaga a anterior
   professores.js   function atualizarTela() { atualizarProfessores(); }    │
   laboratorios.js  function atualizarTela() { atualizarLaboratorios(); }  ─┘ ◄── só esta vale
```

Na agenda acontece o mesmo: faça uma reserva e veja que ela aparece no select de cancelar, mas **não** no calendário (vale a `atualizarTela()` do `cancelar-e-espera.js`, o último).

É o bug mais traiçoeiro da integração, porque **não há erro nenhum**: só uma tela que "às vezes não atualiza".

**Correção: uma `atualizarTela()` por tela.**

1. **Apague** a `atualizarTela()` de **todos** os `.js` das seções (as `atualizarX()` ficam: cada seção continua sabendo se mostrar).
2. Crie o `app/cadastros.js`, com a única `atualizarTela()` da tela de cadastros, que chama a `atualizarX()` de **cada** seção:

```javascript
function atualizarTela() {
    atualizarCursos();
    atualizarTurmas();
    atualizarProfessores();
    atualizarLaboratorios();
}
```

3. Crie o `app/agenda.js`, com a da agenda:

```javascript
function atualizarTela() {
    atualizarNovaReserva();
    atualizarCalendario();
    atualizarCancelarEEspera();
}
```

4. Carregue o `cadastros.js` e o `agenda.js` **por último**, cada um na sua tela. Assim, mesmo que uma `atualizarTela()` tenha ficado esquecida numa seção, a da tela é a que vale.

E a tela de arquivos? O `importar.js` e o `exportar.js` não mostram listas e nunca chamaram `atualizarTela()`. Ela não precisa de um `.js` de tela.

Teste de novo: o curso `QUI` aparece na lista **e** no select de turmas, sem F5; a reserva nova aparece no calendário **e** no select de cancelar. No console, `atualizarTela` mostra a função que chama as quatro (ou as três) seções.

**Por que `function` repetida não dá erro, mas `let` repetido dá?** Teste: se dois arquivos tiverem `let ultimaReserva = null;`, o console mostra `Uncaught SyntaxError: Identifier 'ultimaReserva' has already been declared`. O `let` e o `const` não deixam criar duas vezes o mesmo nome; a `function` deixa, em silêncio. Por isso, numa página com vários scripts, **nomes de funções iguais são perigosos**.

Commit: `git add app` e `git commit -m "refactor: cria uma atualizarTela por tela"`.

## 17.5 Problema 3: funções repetidas → `tela.js`

Pegue o desafio da aula 16 (o mapa das funções repetidas). Algumas funções foram copiadas em vários microprojetos:

| Função | Aparece em |
|---|---|
| `mostrarMensagem` | `cursos.js`, `turmas.js`, `professores.js`, `importar.js`, `exportar.js`, `nova-reserva.js`, `cancelar-e-espera.js` |
| `adicionarOpcao` | `cursos.js`, `turmas.js`, `professores.js`, `nova-reserva.js`, `cancelar-e-espera.js` |
| `textoDoHorario` | `nova-reserva.js`, `cancelar-e-espera.js` |
| `textoDaReserva` | `nova-reserva.js`, `cancelar-e-espera.js` |

Hoje as cópias são iguais, e o problema 2 não aparece. Mas imagine que você corrige um erro de texto na `textoDaReserva` do `nova-reserva.js`. Na tela da agenda, vale a cópia do `cancelar-e-espera.js` (a última). A correção **não aparece**, e de novo não há erro nenhum. Código repetido é bug esperando para acontecer.

**Correção:** crie o `app/tela.js` com **uma cópia só** das quatro funções e apague as cópias das seções:

```javascript
function mostrarMensagem(seletor, texto) {
    document.querySelector(seletor).textContent = texto;
}

// Cria um <option> e coloca dentro do <select>
function adicionarOpcao(select, valor, texto) {
    let opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = texto;
    select.appendChild(opcao);
}

function textoDoHorario(dia, turno) {
    return DIAS[dia - 1] + " " + dataDoDia(dia) + ", " + TURNOS.get(turno).nome + " (" + TURNOS.get(turno).horario + ")";
}

function textoDaReserva(reserva) {
    return "Nº " + reserva.id + " - " + textoDoHorario(reserva.dia, reserva.turno) + " - " +
        nomeDoLaboratorio(reserva.laboratorio) + " - " + nomeDaTurma(reserva.turma) + " - Prof. " +
        nomeDoProfessor(reserva.professor);
}
```

Onde carregar o `tela.js`? **Depois do `regras.js` e antes das seções**, nas 3 telas. As seções chamam as ajudantes logo ao abrir (a última linha de cada uma é a `atualizarX()`, que usa a `adicionarOpcao`). Se o `tela.js` vier depois, aparece `adicionarOpcao is not defined`.

Por que não pôr essas funções no `dados.js` ou no `regras.js`? Porque elas mexem na **página** (`document`, `textContent`, `<option>`). O `dados.js` guarda dados e o `regras.js` decide; quem mostra é a tela. Cada arquivo com **uma** responsabilidade.

Para conferir que não sobrou nenhuma cópia: `Ctrl+Shift+F` na pasta `app/` e procure `function mostrarMensagem`. Deve aparecer **um** resultado só, no `tela.js`. Repita para as outras três e para `function atualizarTela` (dois resultados: `cadastros.js` e `agenda.js`).

Commit: `git add app` e `git commit -m "refactor: junta as funções de tela no tela.js"`.

## 17.6 A ordem final dos `<script>`

A regra: **quem cria vem antes de quem usa**.

```
   dados.js  →  regras.js  →  tela.js  →  os .js das seções  →  o .js da tela (por último)
   (listas)     (regras)      (ajudantes)  (cursos.js...)        (cadastros.js, agenda.js)
```

**Agenda** (`index.html`):

```html
<script src="dados.js" defer></script>
<script src="regras.js" defer></script>
<script src="tela.js" defer></script>
<script src="nova-reserva.js" defer></script>
<script src="calendario.js" defer></script>
<script src="cancelar-e-espera.js" defer></script>
<script src="agenda.js" defer></script>
```

**Cadastros** (`cadastros.html`):

```html
<script src="dados.js" defer></script>
<script src="regras.js" defer></script>
<script src="tela.js" defer></script>
<script src="cursos.js" defer></script>
<script src="turmas.js" defer></script>
<script src="professores.js" defer></script>
<script src="laboratorios.js" defer></script>
<script src="cadastros.js" defer></script>
```

**Arquivos** (`arquivos.html`):

```html
<script src="dados.js" defer></script>
<script src="regras.js" defer></script>
<script src="tela.js" defer></script>
<script src="importar.js" defer></script>
<script src="exportar.js" defer></script>
```

E a pasta `app/` no fim da integração:

```
   app/
   ├── index.html  cadastros.html  arquivos.html  estilo.css
   ├── dados.js  regras.js  tela.js                              (todas as telas)
   ├── nova-reserva.js  calendario.js  cancelar-e-espera.js      + agenda.js
   ├── cursos.js  turmas.js  professores.js  laboratorios.js     + cadastros.js
   └── importar.js  exportar.js
```

**Um ganho que você talvez não tenha notado:** nos microprojetos, uma aba aberta antes da mudança ficava com os dados velhos (aula 15). Agora as seções que precisam conversar estão na **mesma** página e dividem as mesmas listas na memória: cadastrou o curso, o select de turmas já sabe.

## 17.7 Testando o app integrado

**Testar** é tentar quebrar o próprio programa de propósito, antes que outra pessoa quebre. Um teste manual tem sempre quatro partes:

```
   ┌──────────────┬───────────────────────────┬─────────────────────────┬──────────┐
   │  REQUISITO   │  PASSOS (o que eu faço)   │  ESPERADO (o que deve   │  OBTIDO  │
   │              │                           │  acontecer)             │  OK/FALHA│
   └──────────────┴───────────────────────────┴─────────────────────────┴──────────┘
```

O **esperado** é escrito **antes** de testar, a partir das regras de negócio. Se você olha o resultado primeiro e depois decide se ele está certo, você não está testando, está concordando com o programa. E teste sempre três tipos de caso: **normal** (turma de 24 alunos num laboratório de 30), **limite** (turma de 20 num laboratório de exatamente 20; 1 e 60 alunos) e **inválido** (61, `abc`, vazio, `0`, sábado à tarde).

Antes de **cada bloco**: **Arquivos → Restaurar dados iniciais**. Os valores esperados usam os dados de exemplo (5 laboratórios, 10 cursos, 10 turmas, 4 professores e as reservas nº 1 a 4). As datas (`30/11`) dependem da semana em que você testa.

Copie as tabelas para um arquivo `TESTES.md` na sua pasta (`alunos/<sua-pasta>/TESTES.md`, ao lado do `README.md`) e preencha a última coluna.

### Integração (as seções conversam)

| ID | Passos | Esperado | OK? |
|---|---|---|---|
| I01 | Abrir as 3 telas pelo menu do topo, com o F12 aberto | Todas abrem; nenhum erro vermelho e nenhum `404` no console | |
| I02 | Cadastros: cadastrar o curso `QUI` - `Química` | Aparece na lista de cursos **e** no select "Curso" das turmas, sem F5 | |
| I03 | Cadastros: cadastrar a turma `QUI01` (curso QUI, 20 alunos) e ir para a Agenda; escolher o curso QUI | A turma `QUI01 (20 alunos)` aparece no select "Turma" | |
| I04 | Agenda: Prof. Carla, ELT03, Eletrotécnica, segunda, manhã | A reserva aparece no calendário (segunda/manhã com dois cartões) **e** no select "Reserva" de cancelar, sem F5 | |
| I05 | No console de cada tela, digitar `atualizarTela` | Agenda: chama `atualizarNovaReserva`, `atualizarCalendario` e `atualizarCancelarEEspera`. Cadastros: chama as 4 `atualizar...` das seções | |
| I06 | `Ctrl+Shift+F` na pasta `app/`: `function mostrarMensagem` | Um resultado só, no `tela.js` | |

### Navegação e calendário

| ID | Passos | Esperado | OK? |
|---|---|---|---|
| T01 | Clicar em cada link do menu do topo, nas 3 telas | Todas abrem; a página atual aparece marcada no menu | |
| T02 | Olhar o calendário da agenda | Segunda/manhã: `ADM09 · Informática · Rafael Costa`; terça/tarde: `ENF05 · Enfermagem · Juliana Alves`; quarta/noite: `DSI02 · Informática · Carla Mendes`; quinta/noite: `ELT03 · Eletrotécnica · Marcos Pereira`; sábado à tarde e à noite: `fechado`; o resto `livre` | |
| T03 | Na agenda, escolher o curso **BCV** e clicar em **Confirmar reserva** | A turma mostra `(nenhuma turma neste curso)` e aparece "Escolha uma turma. Se a lista está vazia, cadastre uma turma para este curso." | |

### Cadastros: cursos, turmas e professores

| ID | Passos | Esperado | OK? |
|---|---|---|---|
| T04 | Cadastrar curso com sigla `A`, depois `ABCDE`, depois `A1` | "A sigla deve ter de 2 a 4 letras." Nada é cadastrado | |
| T05 | Cadastrar curso com sigla `adm` | "A sigla ADM já existe." | |
| T06 | Cadastrar sigla `inf` com nome vazio | "O nome é obrigatório." | |
| T07 | Cadastrar sigla `inf`, nome `Informática para internet` | "Cadastrado: Id 11 - INF - Informática para internet" | |
| T08 | Buscar curso `eletro` | Aparece só `Id 6 - ELT - Eletrotécnica` | |
| T09 | Excluir o curso ADM | "O curso ADM tem turmas e não pode ser excluído." | |
| T10 | Excluir o curso INF e clicar em **Cancelar**; depois excluir de novo e confirmar | Na 1ª vez nada muda; na 2ª, "Curso excluído com sucesso.", e o INF sai também do select "Curso" das turmas | |
| T11 | Cadastrar turma do curso DSI com nome `dsi02` | "A turma DSI02 já existe." | |
| T12 | Cadastrar turma com alunos `61`, depois `0`, depois `abc` | "O número de alunos deve ser de 1 a 60." | |
| T13 | Cadastrar turma DSI, nome `dsi03`, `60` alunos | "Cadastrada: Id 11 - DSI03 (DSI) - 60 alunos" | |
| T14 | Alterar a DSI02 para `31` alunos; depois para `30` | 1ª: "Com 31 alunos, a turma não cabe em um laboratório que ela já reservou."; 2ª: "Alterada: Id 6 - DSI02 (DSI) - 30 alunos" | |
| T15 | Excluir a turma DSI02 | "A turma DSI02 tem reservas e não pode ser excluída." | |
| T16 | Cadastrar professor `Ana` | "Digite o nome completo (nome e sobrenome)." | |
| T17 | Cadastrar `Ana Souza` e clicar em **Ordem alfabética** | Ana Souza, Carla Mendes, Juliana Alves, Marcos Pereira, Rafael Costa | |
| T18 | Excluir a Prof. Carla Mendes | "Prof. Carla Mendes tem reservas e não pode ser excluído." | |

### Reservas: capacidade, sábado, conflito, fila e pilha

| ID | Passos | Esperado | OK? |
|---|---|---|---|
| T19 | Reservar a ADM11 (30 alunos) na Eletrotécnica (20 lugares) | "A turma não cabe: ADM11 tem 30 alunos e Eletrotécnica tem 20 lugares." | |
| T20 | Reservar qualquer turma no sábado, tarde | "No sábado, só o turno da manhã." | |
| T21 | Prof. Carla, ELT03 (20 alunos), Eletrotécnica (20 lugares), segunda, manhã | "Reserva confirmada! Nº 5 - Segunda 30/11, Manhã (08h às 12h) - Eletrotécnica - ELT03 - Prof. Carla Mendes" | |
| T22 | Prof. Juliana, ADM10, Informática, segunda, manhã (a reserva nº 2 ocupa) e responder **Cancelar** ao confirm | "Reserva não feita: o horário está ocupado." | |
| T23 | Repetir o T22 e responder **OK** | "Você é o 1º da lista de espera." A lista de espera, na mesma tela, mostra o pedido | |
| T24 | Prof. Carla, DSI02, Informática, segunda, **tarde** | Confirmada (mesmo dia, outro turno não conflita) | |
| T25 | Cancelar a reserva nº 2 | "Reserva cancelada. A reserva passou para Prof. Juliana Alves (lista de espera)." O calendário mostra a Juliana na segunda/manhã | |
| T26 | Desfazer a última reserva e confirmar | "Reserva nº 7 desfeita." (a última criada foi a da lista de espera) | |
| T27 | Restaurar dados iniciais, voltar à agenda e clicar em Desfazer | "Não há reserva para desfazer." | |
| T28 | Apertar F5 na agenda e baixar comprovante sem ter feito reserva | "Faça uma reserva primeiro." | |
| T29 | Fazer uma reserva e baixar o comprovante | Arquivo `AAAAMMDDTHHMM-NOMEDOPROFESSOR.txt` (ex.: `20261123T1430-CARLAMENDES.txt`) com os dados da reserva | |
| T30 | Com os dados iniciais, buscar a reserva nº `3` | A reserva da ENF05; busca linear: 3 comparações; busca binária: 2 comparações | |

### Arquivos e localStorage

| ID | Passos | Esperado | OK? |
|---|---|---|---|
| T31 | Importar os 5 `.csv` da pasta `dados/` juntos | "Importados:" com laboratorios.csv (5), cursos.csv (10), turmas.csv (10), professores.csv (4), reservas.csv (4); nenhum aviso | |
| T32 | Importar o [`turmas-com-curso-inexistente.csv`](../aula-15-pratica-integrando-os-dados/exemplos/turmas-com-curso-inexistente.csv) da aula 15, renomeado para `turmas.csv` | Aviso "Turma SEG04: curso 12 não existe." | |
| T33 | Exportar as reservas da semana e abrir no Bloco de Notas | `reservas-semana-DD-MM.csv` com o cabeçalho `id;professor;turma;laboratorio;dia;turno`, separador `;`, em ordem de dia e turno (2, 3, 1, 4) | |
| T34 | Fazer uma reserva, exportar, restaurar, renomear o exportado para `reservas.csv` e importar | A reserva nova volta ao calendário (nada se perde na ida e volta) | |
| T35 | Cadastrar algo, apertar **F5**, trocar de tela | O cadastro continua lá | |
| T36 | F12 → **Application** (Aplicativo) → Local Storage → a chave `reservaLab.<sua-pasta>` (ex.: `reservaLab.joao-lucas`) | Existe e tem o texto JSON com as listas (sem Map nem Set) | |
| T37 | Restaurar dados iniciais | Volta aos dados de exemplo (4 reservas no calendário) | |
| T38 | **(Opcional) O seu extra:** 3 testes (normal, limite, inválido) | (você escreve o esperado) | |

Para cada teste que falhar, anote **o passo exato** e **o que apareceu**. "Não funciona" não é um relato de bug; "no T25, apareceu `Reserva cancelada.` sem passar para a Juliana" é. Corrija uma falha de cada vez: **reproduzir** (o passo exato), **localizar** (ler o console, digitar as variáveis), **corrigir** e **testar de novo**. Um commit por correção (`git commit -m "fix: ..."`).

## 17.8 O console na integração

O console (F12 → **Console**) mostra os **erros** e o que você mandar escrever com `console.log`. Leia de cima para baixo: **o que** aconteceu, **onde** (arquivo:linha; clique no link azul) e **quem chamou** quem. Você também pode **digitar** no console: o nome de uma lista (`reservas`, `turmas`) mostra o conteúdo; uma função com parênteses roda (`horarioLivre(2, 3, 3)`); uma função **sem** parênteses mostra o código dela (foi assim que o problema 2 apareceu).

| Mensagem no console | O que significa na integração |
|---|---|
| `Uncaught ReferenceError: cursos is not defined` | Uma seção rodou antes do `dados.js`: confira a ordem dos `<script>` (problema 1) |
| `adicionarOpcao is not defined` (ou `mostrarMensagem`) | O `tela.js` está faltando ou vem **depois** das seções |
| `atualizarTela is not defined` (ao clicar num botão) | Apagou a `atualizarTela()` das seções, mas faltou o `cadastros.js` / `agenda.js` (ou o `<script>` dele) |
| `atualizarCalendario is not defined` (ao reservar) | A `atualizarTela()` da agenda chama uma seção que não foi carregada nesta tela |
| `Uncaught SyntaxError: Identifier '...' has already been declared` | Um `let`/`const` com o mesmo nome em dois arquivos |
| `Cannot read properties of null (reading 'addEventListener')` | Um `id` no `querySelector` não existe nesta tela: o `.js` foi carregado na tela errada, ou um `id` foi trocado no microprojeto |
| `Failed to load resource: 404 (Not Found)` | O nome no `<script src>` é diferente do nome do arquivo (maiúsculas contam!) ou o arquivo não foi copiado para `app/` |
| `TypeError: horariosOcupados.has is not a function` | O Set foi salvo no `localStorage` (virou `{}`); salve só as listas e restaure os dados iniciais |

E os bugs que **não** mostram erro: uma seção que não atualiza (problema 2), `NaN` na tela (conta com algo que não é número), `2015` no lugar de `35` (faltou `Number()`), mensagem que pisca e some (faltou `preventDefault()`).

## 17.9 O README final

O `README.md` da sua pasta (`alunos/<sua-pasta>/README.md`) é a **porta de entrada** do seu projeto: é a primeira coisa que o professor, o colega e o futuro recrutador veem. Use este modelo e troque o que está entre `< >`:

~~~markdown
# Agenda de Laboratórios

Sistema para os professores reservarem os laboratórios da escola na semana seguinte,
inspirado no app de agenda que a escola usa.
Projeto da disciplina de Lógica de Programação (Técnico em Desenvolvimento de Sistemas, Grau Técnico).

**Site publicado:** <link do GitHub Pages terminando em /app/, entra na aula 18>

## Como usar

1. Abra o site (ou o `app/index.html` com o Live Server, a partir desta pasta).
2. Use o menu do topo: **Agenda**, **Cadastros** e **Arquivos**.
3. O sistema já vem com dados de exemplo. Para usar os da pasta `dados/`: **Arquivos → Importar dados** e selecione os 5 arquivos juntos.
4. Os dados ficam salvos no navegador. Para recomeçar: **Arquivos → Restaurar dados iniciais**.

## Regras de negócio

| Regra | Detalhe |
|---|---|
| Semana | Reservas sempre para a semana seguinte (dia 1 = segunda ... 6 = sábado) |
| Turnos | Manhã 08h-12h, Tarde 13h30-17h30, Noite 18h30-22h30; a reserva é do turno inteiro |
| Sábado | Só o turno da manhã |
| Conflito | Um laboratório não pode ter duas reservas no mesmo dia e turno |
| Capacidade | Os alunos da turma precisam caber no laboratório |
| Lista de espera | Horário ocupado: o professor pode entrar na fila; ao cancelar, o 1º da fila assume |
| Desfazer | Desfaz a última reserva feita (pilha) |
| Laboratório | Só leitura: vem dos dados iniciais ou do `laboratorios.csv` |
| Curso | Sigla de 2 a 4 letras, única; nome obrigatório; curso com turma não pode ser excluído |
| Turma | Curso da lista; nome único; 1 a 60 alunos; turma com reserva não pode ser excluída |
| Professor | Nome completo (2 palavras ou mais); professor com reserva não pode ser excluído |

## Arquivos da pasta `dados/`

| Arquivo | Colunas |
|---|---|
| `laboratorios.csv` | `id;nome;capacidade` |
| `cursos.csv` | `id;sigla;nome` |
| `turmas.csv` | `id;nome;curso;alunos` |
| `professores.csv` | `id;nome` |
| `reservas.csv` | `id;professor;turma;laboratorio;dia;turno` |

Separador `;`, primeira linha = cabeçalho, UTF-8. Os campos `curso`, `professor`, `turma` e `laboratorio` guardam o id. Códigos: dia 1 a 6; turno 1 manhã, 2 tarde, 3 noite.

Arquivos gerados pelo sistema: `reservas-semana-DD-MM.csv` (exportação) e `AAAAMMDDTHHMM-PROFESSOR.txt` (comprovante).

## Estrutura do código

- `app/`: o sistema (3 telas).
  - `dados.js`: constantes, dados, Map/Set e localStorage (todas as telas).
  - `regras.js`: validação, conflito, capacidade, fila, pilha, calendário, busca e ordenação (todas as telas).
  - `tela.js`: as ajudantes de tela usadas em várias seções (todas as telas).
  - Um `.js` por seção: `nova-reserva.js`, `calendario.js`, `cancelar-e-espera.js`, `cursos.js`, `turmas.js`, `professores.js`, `laboratorios.js`, `importar.js`, `exportar.js`.
  - Um `.js` por tela, carregado por último: `agenda.js` e `cadastros.js` (a `atualizarTela()` de cada tela).
  - Ordem dos scripts: `dados.js` → `regras.js` → `tela.js` → seções → `.js` da tela.
- `microprojetos/`: cada seção feita separada (aulas 13 a 16).
- `prompt/`: a versão em `prompt`/`alert` (aulas 8 a 12).
- `portugol/`: a versão em VisualG (aulas 4 a 7).

## Extra (opcional)

<Se você fez um extra: qual, como usar, como testar e as decisões que tomou. Se não fez, apague esta seção.>

## Testes

A lista de testes e os resultados estão em [TESTES.md](TESTES.md).

## Autores

<Nome(s)> · <turma>

## Créditos

Mecânicas do cadastro inspiradas no [desafioCadastro](https://github.com/karilho/desafioCadastro), de Lucas Carrilho (@devmagro).
~~~

Para ver como o README fica, abra o arquivo no VS Code e aperte `Ctrl+Shift+V` (pré-visualização do Markdown).

## 17.10 Extra opcional

Terminou a integração, os testes e o README? Escolha **um** extra do [16.7 da aula 16](../aula-16-pratica-contexto-extra/README.md#167-extra-opcional-para-depois-da-integração) (busca avançada sem acento, turma ou professor em dois laboratórios no mesmo turno, reserva recorrente, resumo de ocupação). Os exemplos já usam os nomes do `app/`. O extra é **opcional**: ele não vale no lugar de nenhum item obrigatório, e um app integrado e testado sem extra vale mais que um app com extra e sem testes.

## 17.11 Projeto da disciplina: o que fazemos hoje

1. Se o M9 ficou pendente, termine-o primeiro (aula 16).
2. **Integrar** (17.2 a 17.6), com um commit por problema resolvido:

```
git commit -m "feat: copia as telas e os microprojetos para o app"
git commit -m "fix: corrige a ordem dos scripts das telas"
git commit -m "refactor: cria uma atualizarTela por tela"
git commit -m "refactor: junta as funções de tela no tela.js"
```

3. **Testar** com a lista 17.7 inteira, em dupla: um executa, o outro lê o esperado e anota (quem escreveu o código tende a "ajudar" o programa). Preencha o `TESTES.md`.
4. **Corrigir** cada falha, uma de cada vez, com um commit `fix:` por correção.
5. **Escrever o README** com o modelo 17.9 e conferir a pré-visualização.
6. Commit e push:

```
git add .
git commit -m "docs: README final e lista de testes"
git push -u origin joao-lucas/cp7
```

O primeiro `push` da branch nova leva o `-u origin <sua-pasta>/cp7`. O Pull Request do CP7 é aberto na aula 18.

7. Sobrou tempo? Extra opcional (17.10).

## 17.12 Erros comuns

| Sintoma | Causa |
|---|---|
| A tela abre em branco, sem nenhuma lista | Nenhum `<script>` foi escrito, ou o `src` aponta para `../comum/dados.js` (caminho dos microprojetos); no `app/`, é `dados.js` |
| Cadastrou um curso e a lista não mudou; com F5, ele aparece | Ainda há uma `atualizarTela()` numa seção carregada **depois** do `cadastros.js`, ou o `cadastros.js` não foi carregado |
| A reserva não aparece no calendário até o F5 | Faltou a `atualizarCalendario()` na `atualizarTela()` do `agenda.js` |
| Corrigiu uma mensagem e nada mudou na tela | A função existe em dois arquivos e vale a outra cópia; procure com `Ctrl+Shift+F` |
| Corrigiu no `microprojetos/` e o app não mudou | O app usa a **cópia** em `app/`; mexa lá |
| Corrigiu um bug e outro apareceu em outra tela | Mudou o `dados.js`, o `regras.js` ou o `tela.js`, que as 3 telas usam; rode a lista de testes de novo |
| Os testes dão resultados diferentes a cada vez | Não restaurou os dados iniciais antes do bloco |
| O README aparece todo numa linha só no GitHub | Faltou linha em branco entre os parágrafos e antes das tabelas |
| A tabela do README não aparece como tabela | Faltou a linha `|---|---|` logo abaixo do cabeçalho |

## 17.13 Exercícios em aula

1. **Ordem.** Um colega carregou na agenda: `tela.js`, `dados.js`, `regras.js`, `nova-reserva.js`, `calendario.js`, `cancelar-e-espera.js`, `agenda.js`. Vai dar erro ao abrir? Por quê? (Dica: o `tela.js` só **cria** funções; quando elas são **chamadas**?)
2. **A última vence.** Sem abrir o navegador: se a tela de cadastros carregar `cadastros.js` **antes** de `turmas.js`, e o `turmas.js` ainda tiver a `atualizarTela()` do microprojeto, o que acontece ao cadastrar um curso?
3. **Caça aos bugs.** Abra o [`exemplos/caca-aos-bugs.html`](exemplos/caca-aos-bugs.html) com o Live Server. O console já mostra um erro ao abrir. Qual é? Corrija.
4. No mesmo exemplo, clique em **Somar** com 20 e 15. O que aparece? Por quê? Corrija.
5. Clique em **Maior laboratório**. Leia a mensagem do console, ache a linha e corrija.
6. Clique em **Média de capacidade**. Não há erro no console, mas o resultado está errado. Use `console.log` para descobrir o motivo e corrija. A média certa é 22.0.
7. Escreva 3 casos de teste (normal, limite e inválido) para a regra "turma de 1 a 60 alunos" no cadastro, no formato da tabela do 17.7.

## 17.14 Desafio para a próxima aula

**Teste cruzado.** Troque o nome da branch com outra dupla (ex.: `maria-souza/cp7`). Cada dupla traz a branch da outra (`git fetch` e `git switch maria-souza/cp7`), roda a lista 17.7 **inteira** no `alunos/maria-souza/app/` e abre uma *issue* no repositório da turma para cada falha encontrada (aba **Issues** → **New issue**). O título começa com o nome da pasta do colega (`maria-souza: ...`) e o texto traz os passos para reproduzir. No fim, volte para a sua branch (`git switch <sua-pasta>/cp7`). Na aula 18, cada dupla chega com as issues recebidas **corrigidas** (commit `fix: ...` citando o problema) e o README pronto.

## 17.15 Resumo

- Integrar = juntar arquivos feitos separados numa página só. A lógica não muda (os `id` são os mesmos); o que muda é a **convivência** entre os arquivos;
- Problema 1: **ordem** dos `<script>`. Quem cria vem antes de quem usa: `dados.js` → `regras.js` → `tela.js` → seções → `.js` da tela;
- Problema 2: `function` com o mesmo nome em dois arquivos **não dá erro**: vale a **última** carregada. Uma `atualizarTela()` por tela (`cadastros.js`, `agenda.js`), carregada por último, chamando a `atualizarX()` de cada seção;
- Problema 3: funções repetidas viram **uma cópia só** no `tela.js` (`mostrarMensagem`, `adicionarOpcao`, `textoDoHorario`, `textoDaReserva`);
- Teste = requisito + passos + **esperado escrito antes** + obtido; restaure os dados antes de cada bloco; método: reproduzir → localizar → corrigir → testar de novo;
- README: o que é, como usar, regras, dados, estrutura, testes, autores, créditos.
