**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-14-arquivos-txt-e-csv/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-16-pratica-contexto-extra/README.md)

---

# AULA 15 — Prática: microprojetos M5 (turmas) e M6 (professores)

> **Aula prática, em formato de roteiro de laboratório.** Não há conteúdo novo. Você repete o padrão do **M2 (cursos.js)** da aula 13 em mais dois microprojetos, cada um com **mais regras** e **menos ajuda** que o anterior. O professor entrega o HTML e o CSS (`microprojetos/m5-turmas/index.html` e `microprojetos/m6-professores/index.html`); você escreve o `.js`. Trabalhe em dupla: um no teclado e o outro conferindo o roteiro; troquem a cada microprojeto.

## Objetivos da aula

- Reaproveitar a **estrutura** de um `.js` de seção (o padrão do M2) num problema parecido, sem copiar e colar às cegas;
- **M5 Turmas** (`turmas.js`): curso escolhido num `<select>`, nome único, alunos de 1 a 60, a turma precisa continuar cabendo nos laboratórios que já reservou, exclusão bloqueada se tiver reserva;
- **M6 Professores** (`professores.js`): nome completo, exclusão bloqueada se tiver reserva, **busca linear** por parte do nome e **ordem alfabética** com o selection sort do `regras.js`;
- Conferir cada microprojeto com a lista **"Pronto quando"** e fazer **um commit para cada um**.

## 15.1 Antes de começar (checklist)

- [ ] `microprojetos/comum/dados.js` e `microprojetos/comum/regras.js` (M0) estão prontos e na sua branch `<sua-pasta>/cp6` no GitHub;
- [ ] M1 (`laboratorios.js`), M2 (`cursos.js`), M3 (`importar.js`) e M4 (`exportar.js`) funcionam, cada um com o seu commit;
- [ ] As pastas `microprojetos/m5-turmas/` e `microprojetos/m6-professores/` (com o `index.html` entregue) estão na sua pasta (`alunos/<sua-pasta>/`);
- [ ] Você abre os microprojetos pelo **Live Server**, a partir da sua pasta (assim todos usam o mesmo `localStorage`).

**Confira o desafio da aula 14.** Abra o M3, importe o arquivo [`exemplos/turmas-com-curso-inexistente.csv`](exemplos/turmas-com-curso-inexistente.csv) renomeado para `turmas.csv` e confira:

- o aviso `Turma SEG04: curso 12 não existe.` aparece (é o `conferirVinculos` do `regras.js`);
- a turma `dsi02` do arquivo entra como `DSI02` (o `toUpperCase()` do `importarTurmas`).

Depois abra o M4 e clique em **Restaurar dados iniciais**. Todos os resultados desta aula usam os dados de exemplo.

## 15.2 Relembrando o padrão do M2

Todo `.js` de seção tem as **mesmas partes**, na mesma ordem. Abra o seu `cursos.js` ao lado e encontre cada uma:

```
   1. AJUDANTES ........ mostrarMensagem, adicionarOpcao, textoDoCurso
   2. MOSTRAR .......... atualizarCursos()   lista + <select> da seção
   3. ATUALIZAR TELA ... atualizarTela()     chama a atualizarCursos()
   4. CONCLUIR ......... concluirCurso(mensagem)
                         salvarDados + limpa os campos + atualizarTela + mensagem
   5. AÇÕES ............ cadastrarCurso(evento), alterarCurso(), excluirCurso(), buscarCurso()
   6. LIGAÇÕES ......... addEventListener de cada botão (e o "submit" do form)
   7. CHAMADA INICIAL .. atualizarCursos();   o que aparece ao abrir a página
```

Hoje os nomes mudam, mas as partes são as mesmas:

| Parte | M2 Cursos | M5 Turmas | M6 Professores |
|---|---|---|---|
| Texto de um item | `textoDoCurso` | `textoDaTurma` | (dentro de `mostrarProfessores`) |
| Mostrar | `atualizarCursos` | `atualizarTurmas` | `atualizarProfessores` |
| Concluir | `concluirCurso` | `concluirTurma` | `concluirProfessor` |
| Regras do `regras.js` | `siglaValida`, `siglaJaExiste`, `cursoTemTurma` | `turmaJaExiste`, `alunosValidos`, `turmaCabeNasReservas`, `turmaTemReserva` | `nomeCompleto`, `professorTemReserva`, `ordenarPorNome` |
| Mensagens em | `#msg-cursos` | `#msg-turmas` | `#msg-professores` |

As **regras** já existem: você escreveu todas no `regras.js` (M0), a partir do CP5. O `.js` da seção só **lê o formulário**, **chama a regra** e **mostra o resultado**. Se você se pegar escrevendo um laço para saber se a turma tem reserva, pare: a `turmaTemReserva` já faz isso.

**Por que copiar o `mostrarMensagem` e o `adicionarOpcao` de novo?** Cada microprojeto é uma página separada e precisa ter tudo o que usa. Na aula 17, quando as seções forem juntadas numa tela só, essas cópias vão virar **uma só** (no `tela.js`). Por enquanto, copie.

## 15.3 M5 Turmas (`turmas.js`)

Abra `microprojetos/m5-turmas/index.html` e leia o HTML **antes** de programar. Anote os `id`: `#form-turma`, `#turma-curso`, `#turma-nome`, `#turma-alunos`, `#turma-escolhida`, `#turma-novo-nome`, `#turma-novos-alunos`, `#btn-alterar-turma`, `#btn-excluir-turma`, `#msg-turmas` e `#lista-turmas`. Não mude nenhum: na aula 17 o mesmo `.js` vai funcionar na tela de cadastros, que tem os **mesmos** `id`.

### Passo 1: mostrar (lista + dois `<select>`)

A diferença para o M2 é que esta seção tem **dois** `<select>`: o curso da turma nova (`#turma-curso`) e a turma que vai ser alterada ou excluída (`#turma-escolhida`). Os dois são enchidos na `atualizarTurmas`:

```javascript
function textoDaTurma(turma) {
    return "Id " + turma.id + " - " + turma.nome + " (" + siglaDoCurso(turma.curso) + ") - " + turma.alunos + " alunos";
}

// Lista de turmas + os dois <select> desta seção (curso e turma)
function atualizarTurmas() {
    let texto = "";
    for (let i = 0; i < turmas.length; i++) {
        texto = texto + textoDaTurma(turmas[i]) + "\n";
    }
    if (texto === "") {
        texto = "Nenhuma turma cadastrada.";
    }
    document.querySelector("#lista-turmas").textContent = texto;

    let selectDeCurso = document.querySelector("#turma-curso");
    selectDeCurso.textContent = "";
    for (let i = 0; i < cursos.length; i++) {
        adicionarOpcao(selectDeCurso, cursos[i].id, cursos[i].sigla + " - " + cursos[i].nome);
    }

    let selectDeTurma = document.querySelector("#turma-escolhida");
    selectDeTurma.textContent = "";
    for (let i = 0; i < turmas.length; i++) {
        adicionarOpcao(selectDeTurma, turmas[i].id, turmas[i].nome);
    }
}
```

A turma guarda o **id** do curso (`curso: 3`), e não a sigla. Para mostrar `DSI`, a `siglaDoCurso` do `dados.js` busca o curso pelo id. Teste: abra a página. A lista deve mostrar `Id 1 - ADM09 (ADM) - 28 alunos` e mais 9 turmas, e o select de cursos deve ter os 10 cursos.

Escreva agora a `atualizarTela()` e a `concluirTurma(mensagem)`, iguais às do M2, trocando os nomes. A `concluirTurma` limpa os campos **de alterar** (`#turma-novo-nome` e `#turma-novos-alunos`).

### Passo 2: cadastrar (as regras em ordem)

O cadastro confere as regras **uma de cada vez**, na ordem em que o usuário lê o formulário, e para na primeira que falhar (`return`):

```javascript
function cadastrarTurma(evento) {
    evento.preventDefault();
    let curso = buscarPorId(cursos, Number(document.querySelector("#turma-curso").value));
    let nome = document.querySelector("#turma-nome").value.trim();
    let alunos = document.querySelector("#turma-alunos").value.trim();

    if (curso === null) {
        mostrarMensagem("#msg-turmas", "Escolha o curso. Se a lista está vazia, cadastre um curso primeiro.");
        return;
    }
    if (nome === "") {
        mostrarMensagem("#msg-turmas", "O nome é obrigatório.");
        return;
    }
    if (turmaJaExiste(nome, 0)) {
        mostrarMensagem("#msg-turmas", "A turma " + nome.toUpperCase() + " já existe.");
        return;
    }
    if (alunosValidos(alunos) === false) {
        mostrarMensagem("#msg-turmas", "O número de alunos deve ser de 1 a " + MAXIMO_DE_ALUNOS + ".");
        return;
    }

    let turma = { id: proximoId(turmas), nome: nome.toUpperCase(), curso: curso.id, alunos: Number(alunos) };
    turmas.push(turma);
    document.querySelector("#form-turma").reset();
    concluirTurma("Cadastrada: " + textoDaTurma(turma));
}
```

Três detalhes:

- **Select vazio.** Se não há nenhum curso, o `.value` do select é `""`, e `Number("")` dá `0`. Nenhum curso tem id 0, então a `buscarPorId` devolve `null` e a primeira regra avisa. Uma regra só cobre os dois casos: "não escolheu" e "não tem o que escolher".
- **`turmaJaExiste(nome, 0)`.** O segundo parâmetro é o id que a busca deve **ignorar**. No cadastro não há o que ignorar (nenhuma turma tem id 0). No alterar, ele vai ser o id da própria turma (passo 3).
- **`alunosValidos(alunos)` recebe o texto**, antes do `Number`. Ela confere se só tem dígitos e se está de 1 a 60. Por isso `"abc"` e `""` também são recusados.

### Passo 3: alterar (com menos ajuda)

Escreva a `alterarTurma()` seguindo o `alterarCurso()` do M2:

1. Busque a turma escolhida no `#turma-escolhida` (se for `null`: "Escolha uma turma.").
2. Leia o novo nome e o novo número de alunos. **Só muda o que foi preenchido**: campo vazio = manter o valor atual.
3. Se o nome foi preenchido, ele não pode ser de **outra** turma: `turmaJaExiste(nome, turma.id)`. Assim, alterar a `DSI02` para `dsi02` não é recusado (é ela mesma).
4. Se os alunos foram preenchidos, use `alunosValidos`.
5. **Regra nova:** a turma precisa continuar cabendo nos laboratórios que ela já reservou. A `turmaCabeNasReservas` do `regras.js` percorre as reservas da turma e compara com a capacidade de cada laboratório:

```javascript
    // regra: a turma precisa continuar cabendo nos laboratórios que já reservou
    if (alunos !== "" && turmaCabeNasReservas(turma.id, Number(alunos)) === false) {
        mostrarMensagem("#msg-turmas", "Com " + alunos + " alunos, a turma não cabe em um laboratório que ela já reservou.");
        return;
    }
```

6. Só **depois** de passar por todas as regras, mude o objeto (`turma.nome = nome.toUpperCase()`, `turma.alunos = Number(alunos)`) e chame `concluirTurma("Alterada: " + textoDaTurma(turma))`.

Por que mudar o objeto só no fim? Se você mudar o nome e **depois** descobrir que os alunos são inválidos, a turma fica meio alterada. Conferir tudo primeiro e mudar tudo depois evita isso.

### Passo 4: excluir

Escreva a `excluirTurma()` seguindo o `excluirCurso()` do M2: turma escolhida → `turmaTemReserva(turma.id)` bloqueia → `confirm` → `turmas.splice(turmas.indexOf(turma), 1)` → `concluirTurma("Turma excluída com sucesso.")`. As mensagens estão na lista "Pronto quando".

Termine com as ligações (`"submit"` do `#form-turma`, `"click"` dos dois botões) e a chamada inicial `atualizarTurmas();`.

### Pronto quando (M5)

Restaure os dados iniciais (M4) e confira, nesta ordem:

- [ ] Ao abrir: 10 turmas na lista, com a sigla do curso; 10 cursos no select "Curso"; 10 turmas no select "Turma"; console (F12) sem erro;
- [ ] Cadastrar curso `DSI`, nome `dsi02`, `24` alunos → "A turma DSI02 já existe.";
- [ ] Cadastrar com alunos `61`, depois `0`, depois `abc` → "O número de alunos deve ser de 1 a 60." (nas três vezes);
- [ ] Cadastrar com o nome vazio → "O nome é obrigatório.";
- [ ] Cadastrar curso `DSI`, nome `dsi03`, `60` alunos → "Cadastrada: Id 11 - DSI03 (DSI) - 60 alunos", e a DSI03 aparece na lista e no select "Turma";
- [ ] Alterar a `DSI02` para `31` alunos → "Com 31 alunos, a turma não cabe em um laboratório que ela já reservou." (ela tem reserva na Informática, de 30 lugares);
- [ ] Alterar a `DSI02` para `30` alunos → "Alterada: Id 6 - DSI02 (DSI) - 30 alunos";
- [ ] Alterar a `DSI02` com o novo nome `adm09` → "A turma ADM09 já existe.";
- [ ] Excluir a `DSI02` → "A turma DSI02 tem reservas e não pode ser excluída.";
- [ ] Excluir a `DSI03`, clicar em **Cancelar** (nada muda); excluir de novo e confirmar → "Turma excluída com sucesso.";
- [ ] Apertar **F5**: o que você alterou continua lá (o `concluirTurma` chama o `salvarDados`).

Commit:

```bash
git add microprojetos/m5-turmas
git commit -m "feat: microprojeto M5 de turmas"
git push
```

## 15.4 M6 Professores (`professores.js`)

Agora com **ainda menos ajuda**: você já fez dois CRUD em formulário. Leia o `microprojetos/m6-professores/index.html` e anote os `id` (`#form-professor`, `#professor-nome`, `#professor-escolhido`, `#professor-novo-nome`, `#btn-alterar-professor`, `#btn-excluir-professor`, `#professor-busca`, `#btn-buscar-professor`, `#btn-professores-cadastro`, `#btn-professores-nome`, `#msg-professores`, `#lista-professores`).

### Uma função de mostrar que recebe a lista

Esta seção mostra **três** listas diferentes no mesmo `<pre>`: todos os professores, o resultado da busca e a lista em ordem alfabética. Em vez de três funções parecidas, uma só recebe a lista que vai mostrar:

```javascript
function mostrarProfessores(lista) {
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        texto = texto + "Id " + lista[i].id + " - " + lista[i].nome + "\n";
    }
    if (texto === "") {
        texto = "Nenhum professor encontrado.";
    }
    document.querySelector("#lista-professores").textContent = texto;
}
```

A `atualizarProfessores()` chama `mostrarProfessores(professores)` e enche o select `#professor-escolhido`. É o mesmo truque do `mostrarCursos(lista)` do M2.

### O que você escreve sozinho

| Função | O que faz | Regra / mensagem |
|---|---|---|
| `atualizarTela()` e `concluirProfessor(mensagem)` | Iguais às do M2 | A `concluirProfessor` limpa o `#professor-novo-nome` |
| `cadastrarProfessor(evento)` | `preventDefault`; lê o nome; cadastra com `proximoId` | `nomeCompleto(nome)` falso → "Digite o nome completo (nome e sobrenome)."; certo → "Cadastrado: " + nome |
| `alterarProfessor()` | Professor escolhido; novo nome | Sem professor → "Escolha um professor."; `nomeCompleto` falso → "Digite o novo nome completo (nome e sobrenome)."; certo → "Alterado: " + nome |
| `excluirProfessor()` | Igual ao `excluirTurma` | `professorTemReserva` → "Prof. " + nome + " tem reservas e não pode ser excluído."; `confirm("Excluir Prof. " + nome + "?")`; → "Professor excluído com sucesso." |
| `buscarProfessor()` | **Busca linear** por parte do nome | Veja abaixo |
| `listarProfessoresPorCadastro()` | Mostra todos, na ordem em que foram cadastrados | `mostrarProfessores(professores)` |
| `listarProfessoresPorNome()` | Mostra em ordem alfabética | Veja abaixo |

**Busca linear por parte do nome.** É o padrão "filtrar" da aula 10: uma lista nova vazia, um laço por **todos** os professores e um `push` em quem passa no teste. Para não diferenciar maiúsculas, compare os dois textos em minúsculas (`toLowerCase()`), e use `includes` para achar **parte** do nome (`"costa"` acha `Rafael Costa`). No fim, `mostrarProfessores(encontrados)`. Ela é **linear** porque olha um por um: com 4 professores, 4 comparações; com 400, 400.

**Ordem alfabética.** O selection sort já está no `regras.js` (`ordenarPorNome`, aula 12). Ele devolve uma **cópia** ordenada e não mexe na lista original:

```javascript
function listarProfessoresPorNome() {
    mostrarProfessores(ordenarPorNome(professores));   // selection sort do regras.js
}
```

Por que uma cópia? Porque o botão "Ordem de cadastro" precisa continuar funcionando. Se a ordenação trocasse os professores de lugar na própria lista `professores`, a ordem de cadastro se perderia (e seria salva assim no `localStorage`).

### Pronto quando (M6)

Restaure os dados iniciais (M4) e confira:

- [ ] Ao abrir: 4 professores na lista e no select, na ordem de cadastro (Carla, Rafael, Juliana, Marcos); console sem erro;
- [ ] Cadastrar `Ana` → "Digite o nome completo (nome e sobrenome).";
- [ ] Cadastrar `Ana Souza` → "Cadastrado: Ana Souza", e ela aparece como `Id 5 - Ana Souza`;
- [ ] **Ordem alfabética** → Ana Souza, Carla Mendes, Juliana Alves, Marcos Pereira, Rafael Costa; **Ordem de cadastro** → volta para Carla, Rafael, Juliana, Marcos, Ana;
- [ ] Buscar `COSTA` → só `Id 2 - Rafael Costa`; buscar `xyz` → "Nenhum professor encontrado.";
- [ ] Alterar a Ana Souza para `Ana` → "Digite o novo nome completo (nome e sobrenome).";
- [ ] Excluir a Carla Mendes → "Prof. Carla Mendes tem reservas e não pode ser excluído.";
- [ ] Excluir a Ana Souza e confirmar → "Professor excluído com sucesso.";
- [ ] F5: tudo continua como você deixou.

Commit:

```bash
git add microprojetos/m6-professores
git commit -m "feat: microprojeto M6 de professores"
git push
```

## 15.5 Os microprojetos conversam pelo `localStorage`

Todos os microprojetos carregam o mesmo `dados.js` e abrem no mesmo Live Server. Por isso o `localStorage` é o mesmo: o que um salva, o outro carrega. Faça este teste em 3 abas:

1. No **M2**, cadastre o curso `QUI` - `Química`.
2. No **M5**, aperte F5: o `QUI - Química` aparece no select "Curso". Cadastre a turma `QUI01` com 20 alunos.
3. Volte ao **M2**, aperte **F5** e tente excluir o `QUI`: "O curso QUI tem turmas e não pode ser excluído." O M2 nunca viu a tela de turmas, mas a regra `cursoTemTurma` enxerga a turma, porque ela está nos dados salvos.

Repare no **F5**: cada página só carrega os dados quando abre (`carregarDados()`, no fim do `dados.js`). Uma aba aberta antes da mudança continua com os dados **antigos na memória**. Se você excluir o `QUI` no M2 **sem** o F5, a regra não enxerga a `QUI01` e deixa excluir; e o `salvarDados` dessa aba ainda grava a lista antiga de turmas por cima da nova. Regra prática: trocou de microprojeto, aperte F5. Na aula 17, as seções vão ficar na **mesma** página e esse problema some.

## 15.6 Erros comuns

| Sintoma | Causa |
|---|---|
| `Uncaught ReferenceError: turmas is not defined` | O `<script>` do `dados.js` não carregou: confira se o arquivo está em `microprojetos/comum/dados.js` (o HTML usa `../comum/dados.js`) |
| `turmaJaExiste is not defined` | A função não está no seu `regras.js` (M0); confira com o `regras.js` do CP5 |
| `Cannot read properties of null (reading 'addEventListener')` | Um `id` no `querySelector` está diferente do HTML (por exemplo, `#btn-alterar` no lugar de `#btn-alterar-turma`) |
| A lista mostra `(curso 12 não cadastrado)` | Uma turma aponta para um curso que não existe (sobrou do teste do M3); restaure os dados iniciais |
| A turma é cadastrada com o nome em minúsculas e depois aparece repetida | Faltou o `toUpperCase()` ao guardar o nome; a `turmaJaExiste` compara em maiúsculas |
| A turma é cadastrada com `"24"` (texto) e a regra de capacidade falha | Faltou o `Number(alunos)` ao montar o objeto |
| Alterar a DSI02 para o próprio nome dá "já existe" | Chamou `turmaJaExiste(nome, 0)` no alterar; passe `turma.id` |
| A ordem alfabética estraga a "Ordem de cadastro" | A ordenação mexeu na lista `professores`; use a `ordenarPorNome`, que devolve uma cópia |
| A mensagem pisca e some ao cadastrar | Faltou `evento.preventDefault()` no `cadastrar...` |
| O curso novo do M2 não aparece no M5 | A aba do M5 estava aberta antes; aperte F5 |

## 15.7 Exercícios em aula

1. **Teste de mesa.** Com os dados iniciais, quanto vale `turmaJaExiste("dsi02", 0)`? E `turmaJaExiste("dsi02", 6)`? Explique a diferença.
2. **Teste de mesa.** Com os dados iniciais, quanto vale `turmaCabeNasReservas(6, 31)`? E `turmaCabeNasReservas(9, 31)` (a RAD02)? Por que a RAD02 pode ter 31 alunos se ela é a menor turma?
3. **Select vazio.** No console do M5, digite `Number("")`. O que aparece? Por que isso faz a `buscarPorId` devolver `null` quando não há curso no select?
4. **Selection sort à mão.** Faça o teste de mesa de `ordenarPorNome` com a lista `[Rafael Costa, Carla Mendes, Juliana Alves]`. Escreva a lista depois de cada volta do laço de fora.
5. **(Projeto) M6.** Na busca, mostre em `#msg-professores` quantos professores foram encontrados, por exemplo `"1 professor(es) encontrado(s)."`.
6. **(Projeto) M5.** Depois de cadastrar, a mensagem também diz quantas turmas o curso tem agora, por exemplo `"Cadastrada: Id 11 - DSI03 (DSI) - 60 alunos. O curso DSI tem 2 turma(s)."`. Dica: a `turmasDoCurso` do `regras.js` devolve uma lista.

## 15.8 Desafio para a próxima aula

**No M5, mostre as turmas agrupadas por curso.** Troque a lista do `#lista-turmas` por uma lista em que cada curso aparece uma vez, com as turmas dele embaixo. Cursos sem turma não aparecem. Com os dados iniciais, o começo fica assim:

```
ADM - Administração
   ADM09 (28 alunos)
   ADM10 (25 alunos)
   ADM11 (30 alunos)
   ADM12 (22 alunos)
   ADM13 (18 alunos)
DSI - Desenvolvimento de sistemas
   DSI02 (24 alunos)
ELT - Eletrotécnica
   ELT03 (20 alunos)
...
```

Dicas: escreva uma função `textoDasTurmasPorCurso()` que **devolve** o texto; um laço pelos cursos e, para cada curso, a `turmasDoCurso(curso.id)` do `regras.js`. Use a função dentro da `atualizarTurmas`, no lugar do laço que monta a lista. Pense: quantas comparações a `turmasDoCurso` faz no total, com 10 cursos e 10 turmas?

Commit com a mensagem `feat: mostra as turmas agrupadas por curso no M5`.

## 15.9 Resumo

- Um `.js` de seção tem sempre as mesmas partes: ajudantes, mostrar (`atualizarX`), `atualizarTela`, concluir, ações, ligações e chamada inicial;
- O `.js` da seção **não** tem regra de negócio: ele lê o formulário, chama a regra do `regras.js` e mostra o resultado;
- Regras em ordem, uma por vez, com `return` na primeira que falhar; o objeto só muda **depois** de passar por todas;
- `turmaJaExiste(nome, idIgnorado)`: 0 no cadastro, o id da própria turma no alterar;
- Busca linear por parte do nome: `toLowerCase` + `includes` + `push` numa lista nova; ordem alfabética com a `ordenarPorNome`, que devolve uma **cópia**;
- Os microprojetos dividem o mesmo `localStorage`: o que um salva, o outro carrega (depois de um F5).
