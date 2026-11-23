**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-02-fluxogramas/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-04-visualg-variaveis-operadores-e-decisao/README.md)

---

# AULA 3 — Terminal, Git e GitHub (+ o que é um .csv)

## Objetivos da aula

- Usar o **terminal** para navegar em pastas e criar pastas (`cd`, `dir`/`ls`, `mkdir`), no Windows e no Linux/macOS;
- Entender o que é **controle de versão** e para que serve o **Git**;
- Criar um repositório de treino e registrar mudanças com `git init`, `git status`, `git add`, `git commit` e `git log`;
- Entrar no **repositório da turma** no GitHub: aceitar o convite, baixar com `git clone`, criar a sua **branch** e enviar com `git push`;
- Abrir um **Pull Request** e responder aos comentários do professor;
- **Sair da conta do GitHub** em computador compartilhado;
- Entender o que é um arquivo **.csv** e abri-lo no Excel e no Bloco de Notas;
- Entregar o **CP1** do projeto.

## 3.1 O problema: `trabalho-final-AGORA-VAI-v3.docx`

Todo mundo já viu uma pasta assim:

```
trabalho.docx
trabalho-v2.docx
trabalho-final.docx
trabalho-final-corrigido.docx
trabalho-final-AGORA-VAI-v3.docx
```

Qual é a versão certa? O que mudou de uma para outra? E se o pen drive estragar? Programadores resolveram esse problema com um **sistema de controle de versão**: um programa que tira "fotos" do projeto, guarda quem mudou o quê e quando, e permite voltar no tempo. O mais usado no mundo é o **Git**. E o **GitHub** é um site que guarda uma cópia do seu projeto na internet.

A partir de hoje, **toda aula termina com um commit** (uma "foto" do projeto) enviado para o GitHub.

## 3.2 O terminal

O **terminal** (ou linha de comando) é uma janela onde você dá ordens ao computador **digitando**, em vez de clicar. O Git é usado principalmente por ele.

**Como abrir:**

- **Windows:** tecla Windows, digite `cmd` (Prompt de Comando) ou `PowerShell` e pressione Enter. Outra opção: o **Git Bash**, que vem junto com o Git.
- **Linux:** procure "Terminal" nos aplicativos (ou `Ctrl + Alt + T`).
- **macOS:** `Cmd + Espaço`, digite `Terminal` e pressione Enter.

A janela mostra em que pasta você está, seguida de um cursor piscando:

```
C:\Users\aluno>                          (Windows, cmd)
aluno@lab01:~$                           (Linux)
```

**Os comandos de hoje:**

| O que fazer | Windows (cmd) | Linux / macOS / Git Bash |
|---|---|---|
| Ver em que pasta estou | `cd` (sozinho) | `pwd` |
| Listar o que tem na pasta | `dir` | `ls` |
| Entrar em uma pasta | `cd Documentos` | `cd Documentos` |
| Voltar uma pasta (subir) | `cd ..` | `cd ..` |
| Criar uma pasta | `mkdir projetos` | `mkdir projetos` |
| Limpar a tela | `cls` | `clear` |

No **PowerShell** do Windows, `ls`, `pwd` e `clear` também funcionam.

**Exemplo: criar uma pasta de estudos e entrar nela.**

```
C:\Users\aluno> cd Documentos
C:\Users\aluno\Documentos> mkdir logica
C:\Users\aluno\Documentos> cd logica
C:\Users\aluno\Documentos\logica> dir
```

O `dir` mostra a pasta vazia. Pronto: você criou e entrou numa pasta sem usar o mouse.

**Três dicas que economizam tempo:**

- **Tab completa o nome.** Digite `cd Docu` e pressione Tab: o terminal completa `Documentos`.
- **Seta para cima** repete os últimos comandos.
- **Nomes sem espaço e sem acento.** `reserva-laboratorio` é ótimo; `Reserva de Laboratório` dá trabalho no terminal (precisa de aspas).

**Caminho relativo e absoluto.** `cd Documentos` procura a pasta `Documentos` **dentro** da pasta atual (caminho relativo). `cd C:\Users\aluno\Documentos` vai direto para ela, de qualquer lugar (caminho absoluto). Se aparecer "O sistema não pode encontrar o caminho especificado" (Windows) ou "No such file or directory" (Linux), confira em que pasta você está.

## 3.3 Preparando o Git

**1. O Git está instalado?** No terminal:

```
git --version
```

Deve aparecer algo como `git version 2.x.x`. Se aparecer "'git' não é reconhecido como um comando interno", o Git não está instalado (avise o professor; em casa, baixe em `git-scm.com` e instale com as opções padrão).

**2. Quem é você?** O Git grava o autor de cada commit. Existem dois jeitos de configurar:

```
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

- Com `--global`, vale para **todos** os projetos daquele usuário do computador. Use no **seu** computador, em casa.
- **No laboratório**, a máquina é compartilhada. Configure **sem** o `--global`, de dentro da pasta do repositório (depois do `git init` ou do `git clone`, nas seções 3.4 e 3.5). Assim o próximo aluno não faz commits com o seu nome.

Use o **mesmo e-mail** da sua conta do GitHub.

## 3.4 O ciclo do Git: init, status, add, commit, log

Vamos treinar com uma pasta de teste.

```
mkdir teste-git
cd teste-git
git init
```

O `git init` transforma a pasta em um **repositório**: o Git cria uma pasta oculta chamada `.git`, onde ele guarda todas as "fotos". Nunca apague a pasta `.git`.

Agora, no laboratório, configure seu nome **só para este repositório**:

```
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"
```

Crie um arquivo `anotacoes.txt` na pasta (pelo Bloco de Notas ou pelo VS Code) com uma frase qualquer, salve, e volte ao terminal:

```
git status
```

O Git mostra o arquivo em vermelho, como **untracked** (não rastreado): ele viu o arquivo, mas ainda não está guardando. O ciclo tem três passos:

```
git status                                  1. O QUE MUDOU?
git add anotacoes.txt                       2. PREPARA o arquivo para a foto
git commit -m "adiciona primeiras anotacoes"   3. TIRA A FOTO (com uma mensagem)
```

Para preparar **todos** os arquivos alterados de uma vez, use `git add .` (o ponto significa "esta pasta inteira").

```
   PASTA DO PROJETO          ÁREA DE PREPARAÇÃO         HISTÓRICO (.git)
   (onde você edita)         (o que vai na foto)        (as fotos)
   ┌────────────────┐        ┌────────────────┐         ┌────────────────┐
   │ anotacoes.txt  │ ─────► │ anotacoes.txt  │ ──────► │ commit 1       │
   │ (alterado)     │ git add│                │ git     │ commit 2       │
   └────────────────┘        └────────────────┘ commit  │ ...            │
                                                        └────────────────┘
```

**Ver o histórico:**

```
git log
git log --oneline
```

O `git log` mostra cada commit com autor, data e mensagem. O `--oneline` mostra um por linha, com um código curto:

```
3f2a9c1 adiciona segunda frase
a71b0d4 adiciona primeiras anotacoes
```

Se a lista for grande e o terminal "travar" mostrando `:` no fim, aperte `q` para sair.

**Mensagens de commit.** A mensagem é para uma pessoa ler daqui a um mês. Escreva **o que** a mudança faz, com o verbo no imperativo: `adiciona algoritmo da reserva`, `corrige capacidade da radiologia`. Evite `ajustes`, `teste`, `asdf`.

No projeto, a mensagem começa com um **prefixo** que diz o tipo da mudança:

| Prefixo | Quando usar | Exemplo |
|---|---|---|
| `feat:` | coisa nova no projeto | `feat: adiciona laboratorios da escola em csv` |
| `fix:` | correção | `fix: corrige capacidade da radiologia` |
| `docs:` | só texto, como o README | `docs: adiciona README com requisitos e algoritmo` |

## 3.5 GitHub: o repositório da turma

O Git funciona no seu computador. O **GitHub** guarda uma cópia do repositório na internet: serve de backup, de portfólio e para o professor corrigir.

Na disciplina, a turma inteira usa **um repositório só**: o **repositório da turma**. Ele fica na organização `grau-tecnico-mossoro-dsi` do GitHub, neste endereço:

```
https://github.com/grau-tecnico-mossoro-dsi/<repo-da-turma>
```

O professor passa o nome certo para colocar no lugar de `<repo-da-turma>`. Por dentro, o repositório é assim:

```
<repo-da-turma>/
├── README.md
├── curso/              as aulas (esta que você está lendo)
├── projeto/            o enunciado do projeto, os .csv de exemplo e as telas em HTML e CSS
├── alunos/             uma pasta para cada aluno
│   ├── joao-lucas/
│   ├── maria-clara/
│   └── ...
└── .github/            a conferência automática (ninguém mexe aqui)
```

**Você só mexe na sua pasta**, `alunos/<sua-pasta>/`. O nome da pasta é o seu nome curto: primeiro nome e sobrenome, em minúsculas, sem acento e sem espaço (`alunos/joao-lucas/`). O repositório é **público**: nunca use o seu nome completo.

**1. Aceitar o convite.** O professor convidou a sua conta para a organização. Entre em `github.com`, abra o convite (no e-mail da conta ou em `https://github.com/orgs/grau-tecnico-mossoro-dsi/invitation`) e clique em **Join**. Sem isso, o GitHub recusa o seu `push`.

**2. Clonar (uma vez só).** O `git clone` baixa o repositório inteiro, com todo o histórico, para o seu computador:

```
cd Documentos
git clone https://github.com/grau-tecnico-mossoro-dsi/<repo-da-turma>.git
cd <repo-da-turma>
```

No laboratório, configure o seu nome **só para este repositório**, como na seção 3.4:

```
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"
```

O `git clone` já cadastra o endereço do GitHub com o apelido `origin`. Por isso, aqui não tem `git init` nem `git remote add`.

**3. Criar a sua branch.** Uma **branch** (ramo) é uma linha de trabalho separada. A linha principal se chama `main`: é a versão oficial, que todo mundo vê. Você não trabalha nela. Você cria a **sua** branch, com o padrão `<sua-pasta>/<assunto>`:

```
git switch -c joao-lucas/cp1
```

O `-c` cria a branch e já entra nela. Para ver em que branch você está, use `git branch` (a atual aparece com `*`). Para voltar a uma branch que já existe, use `git switch` sem o `-c`.

```
   main               ●────●──────────────────●     versão oficial da turma
                            \                /
   joao-lucas/cp1            ●────●────●────┘      os seus commits; o merge junta na main
```

**4. Enviar a branch.** Faça os commits como na seção 3.4. Para enviar:

```
git push -u origin joao-lucas/cp1
```

Na primeira vez, o `-u` liga a sua branch à branch de mesmo nome no GitHub. Nas próximas, basta `git push`. Faça commit e push quantas vezes quiser: a branch é sua.

**Login.** No primeiro `push`, abre uma janela pedindo para entrar no GitHub pelo navegador (**Sign in with your browser**). Autorize. O GitHub **não aceita a senha da conta** digitada no terminal.

**Por que não fazer push direto na `main`?** A `main` é **protegida**: uma regra do repositório recusa push direto nela, de qualquer pessoa. São dezenas de alunos no mesmo repositório. Um erro na `main` atrapalha todo mundo. Na `main` só entra o que passou pela conferência automática e pelo professor.

**5. Abrir o Pull Request.** Um **Pull Request** (PR) é um pedido: "professor, confira a minha branch e junte na `main`". Você abre um PR em cada **checkpoint** (CP1 a CP7). Depois do push:

1. Abra a página do repositório da turma. O GitHub mostra uma faixa amarela com a sua branch e o botão **Compare & pull request**. Se a faixa não aparecer: aba **Pull requests** → **New pull request** → em **compare**, escolha a sua branch.
2. Confira as setas: **base: main** ← **compare: joao-lucas/cp1**.
3. Título: `CP1 - joao-lucas`. Na descrição, escreva em uma ou duas linhas o que você entregou.
4. Clique em **Create pull request**.

**6. O check: ✔ ou ✘.** Logo depois, um robô do GitHub (um **GitHub Action**) confere o PR sozinho:

- você só mexeu na **sua** pasta;
- os arquivos `.js` não têm erro de sintaxe (vale a partir da aula 8);
- não tem arquivo indevido, como o `.DS_Store` (um arquivo escondido que o macOS cria).

Na página do PR, aparece uma bolinha amarela (conferindo) e depois um **✔ verde** (tudo certo) ou um **✘ vermelho** (algo errado). No ✘, clique em **Details** e leia o motivo. Corrija na sua pasta, faça commit e push na mesma branch: o check roda de novo.

**7. Os comentários do professor.** O professor lê o PR na aba **Files changed** e comenta nas linhas do seu arquivo. A correção acontece ali, nos comentários. Para responder:

1. Corrija o arquivo na sua pasta, na **mesma branch**.
2. Faça o commit e o push: `git add`, `git commit -m "fix: ..."`, `git push`.
3. O PR se atualiza sozinho com o commit novo. Responda ao comentário (por exemplo, "corrigido"). Não abra outro PR.

Quando estiver tudo certo, o professor faz o **merge**: a sua branch entra na `main`, e o PR fica roxo, com a palavra **Merged**.

**8. Pegar as novidades da `main`.** A `main` muda: o professor coloca aulas novas e correções, e os PRs dos colegas entram. Para trazer essas mudanças para o seu computador:

```
git switch main
git pull
```

Depois, volte para a sua branch (`git switch joao-lucas/cp1`). No próximo checkpoint, crie a branch nova a partir da `main` atualizada (`git switch -c joao-lucas/cp2`).

**O ciclo de toda aula, a partir de hoje** (dentro do repositório da turma, na sua branch):

```
git status
git add alunos/joao-lucas
git commit -m "feat: mensagem que explica a mudança"
git push
```

Prefira `git add` com o caminho da sua pasta em vez de `git add .`: assim nada de fora dela entra no commit.

## 3.6 Saindo da conta em computador compartilhado

O computador do laboratório é usado por várias turmas. Se você sair sem desconectar, o próximo aluno consegue enviar commits **com a sua conta**, inclusive para o repositório da turma. Ao fim de **toda** aula:

1. **No navegador:** em `github.com`, clique na sua foto (canto de cima, à direita) → **Sign out**. Feche o navegador.
2. **No Windows, remova a senha guardada pelo Git:** abra o **Painel de Controle** → **Contas de Usuário** → **Gerenciador de Credenciais** → **Credenciais do Windows**. Procure `git:https://github.com`, clique nela e em **Remover**.
3. **No Linux ou macOS** (ou pelo Git Bash, em qualquer sistema), o comando padrão do Git para apagar a credencial guardada é:

   ```
   printf "protocol=https\nhost=github.com\n\n" | git credential reject
   ```

4. Se você usou `git config --global` sem querer, desfaça:

   ```
   git config --global --unset user.name
   git config --global --unset user.email
   ```

```
   ANTES DE LEVANTAR DA MÁQUINA
   [ ] git push feito (o trabalho está no GitHub)
   [ ] Sign out no github.com e navegador fechado
   [ ] Credencial git:https://github.com removida
```

## 3.7 O que é um arquivo .csv

Um **.csv** é uma **tabela guardada como texto**. Cada linha do arquivo é uma linha da tabela, e as colunas são separadas por um caractere, que no nosso projeto é o **ponto e vírgula** (`;`). A primeira linha é o **cabeçalho**: o nome de cada coluna.

Abrindo o `laboratorios.csv` no **Bloco de Notas**, você vê o texto puro:

```
id;nome;capacidade
1;Eletrotécnica;20
2;Informática;30
3;Radiologia;15
4;Segurança no trabalho;25
5;Enfermagem;20
```

Abrindo o **mesmo arquivo** no **Excel**, você vê uma tabela:

```
   ┌────┬───────────────────────┬────────────┐
   │ id │ nome                  │ capacidade │
   ├────┼───────────────────────┼────────────┤
   │ 1  │ Eletrotécnica         │ 20         │
   │ 2  │ Informática           │ 30         │
   │ 3  │ Radiologia            │ 15         │
   │ 4  │ Segurança no trabalho │ 25         │
   │ 5  │ Enfermagem            │ 20         │
   └────┴───────────────────────┴────────────┘
```

É o mesmo arquivo: o Excel só **desenha** a tabela trocando cada `;` por uma coluna. Por que isso importa? Porque um programa (o nosso, a partir da aula 14) consegue ler um texto assim com facilidade: separa as linhas, depois separa cada linha no `;`. O `.csv` vai ser o "banco de dados de brinquedo" do projeto.

Repare na coluna `id`: é um número que **identifica** cada linha e nunca se repete. Os outros arquivos do projeto vão usar esse número para apontar para um laboratório ("a reserva é no laboratório 2" = Informática).

Por que `;` e não vírgula? Porque um texto pode ter **vírgula** dentro (por exemplo, "Informática, sala 12"), e no Brasil a vírgula também é o separador decimal (2,5). Se o separador fosse a vírgula, o texto seria cortado no meio.

**Criando um .csv no Excel:**

1. Digite o cabeçalho na linha 1 (uma coluna por célula) e os dados nas linhas de baixo.
2. **Arquivo → Salvar como** → em "Tipo", escolha **CSV UTF-8 (delimitado por vírgulas)**. O UTF-8 mantém os acentos.
3. O Excel avisa que algumas funções podem ser perdidas: clique em **Sim / Manter o formato atual**.
4. **Confira no Bloco de Notas:** clique com o botão direito no arquivo → **Abrir com → Bloco de Notas**. As colunas precisam estar separadas por `;`.

Apesar do nome "delimitado por vírgulas", o Excel em português do Brasil costuma salvar com `;`, porque aqui a vírgula é o separador decimal. **Por isso a conferência no Bloco de Notas é obrigatória.**

- **LibreOffice Calc:** em "Salvar como", escolha "Texto CSV", marque "Editar configurações do filtro" e escolha `;` como delimitador de campo e "Unicode (UTF-8)" como conjunto de caracteres.
- **Google Planilhas:** o download em .csv sempre usa vírgula. Se for a única opção, crie o arquivo direto no **Bloco de Notas**, digitando os `;`, e salve com a codificação **UTF-8**.

## 3.8 Projeto da disciplina: o que fazemos hoje (CP1)

Hoje o projeto ganha casa: a **sua pasta** no repositório da turma. A estrutura no fim da aula:

```
alunos/joao-lucas/
├── README.md                   descrição + requisitos e algoritmo da aula 1
├── fluxogramas/
│   ├── reserva.jpg             foto do fluxograma da reserva (aula 2)
│   └── menu.jpg                foto do fluxograma do menu (aula 2)
└── dados/
    ├── laboratorios.csv        os laboratórios reais da escola
    └── cursos.csv              os cursos reais da escola
```

Nas próximas aulas, a pasta ganha `portugol/` (aula 4), `prompt/` (aula 8), `microprojetos/` (aula 13) e `app/` (aula 17). Nos comandos abaixo, troque `joao-lucas` pelo nome da **sua** pasta.

**Passo 1: clonar, criar a branch e a sua pasta.** Aceite o convite da organização (seção 3.5, item 1) e rode:

```
cd Documentos
git clone https://github.com/grau-tecnico-mossoro-dsi/<repo-da-turma>.git
cd <repo-da-turma>
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"
git switch -c joao-lucas/cp1
cd alunos
mkdir joao-lucas
cd joao-lucas
mkdir fluxogramas
mkdir dados
```

A partir daqui, você está **dentro da sua pasta**. Todos os caminhos dos próximos passos começam nela.

**Passo 2: o README.md.** Crie o arquivo `README.md` na sua pasta, `alunos/joao-lucas/` (no VS Code ou no Bloco de Notas, com "Salvar como" → Tipo "Todos os arquivos" para não virar `README.md.txt`). O `.md` é **Markdown**: texto simples em que `#` vira título, `-` vira item de lista e três crases abrem um bloco de texto que aparece do jeito que foi digitado. Modelo:

````
# Reserva de Laboratórios

Sistema para os professores reservarem os laboratórios da escola na semana seguinte.
Projeto da disciplina de Lógica de Programação - Grau Técnico.

Autor: João Lucas

## Regras

- Reservas sempre para a semana seguinte, de segunda a sábado.
- Turnos inteiros: manhã (08h-12h), tarde (13h30-17h30) e noite (18h30-22h30).
- No sábado, só o turno da manhã.
- A turma precisa caber no laboratório.
- O mesmo laboratório não pode ter duas reservas no mesmo dia e turno.
- Horário ocupado: o professor pode entrar na lista de espera.

## Requisitos (o que o app real pede)

- ...

## Algoritmo: reservar um laboratório

```
1. Mostrar a lista de professores e pedir que o professor escolha o seu nome.
2. ...
```

## Fluxogramas

![Fluxograma da reserva](fluxogramas/reserva.jpg)
![Fluxograma do menu](fluxogramas/menu.jpg)
````

No `Autor`, use o seu nome curto (primeiro nome e sobrenome), nunca o nome completo: o repositório é público. Cole no lugar dos `...` a sua lista de requisitos e o seu algoritmo da aula 1 (com as correções da aula 2). A linha `![texto](caminho)` mostra a imagem dentro da página do GitHub.

Primeiro commit:

```
git status
git add README.md
git commit -m "docs: adiciona README com requisitos e algoritmo"
```

**Passo 3: as fotos dos fluxogramas.** Passe as fotos do celular para o computador (cabo, e-mail ou Google Drive), renomeie para `reserva.jpg` e `menu.jpg` (minúsculas, sem espaço) e coloque na pasta `fluxogramas/` da sua pasta.

```
git add fluxogramas
git commit -m "docs: adiciona fotos dos fluxogramas"
```

**Passo 4: o `dados/laboratorios.csv`.** No Excel, monte a tabela com os **laboratórios reais da escola** (os mesmos que aparecem no app de agenda; o professor passa as capacidades). Colunas, exatamente nesta ordem e sem acento no cabeçalho:

```
id;nome;capacidade
```

Regras: `id` começa em 1 e não se repete; `nome` é obrigatório; `capacidade` de 1 a 60. Salve como **CSV UTF-8** dentro de `dados/` da sua pasta, com o nome `laboratorios.csv`, e **confira no Bloco de Notas**.

```
git add dados/laboratorios.csv
git commit -m "feat: adiciona laboratorios da escola em csv"
```

**Passo 5: o `dados/cursos.csv`.** Do mesmo jeito, monte a tabela com os **cursos reais da escola** (os mesmos da lista de cursos do app de agenda). Colunas:

```
id;sigla;nome
```

Regras: `id` começa em 1 e não se repete; `sigla` tem de 2 a 4 letras, em maiúsculas, e não se repete (ex.: `ADM`); `nome` é obrigatório (ex.: `Administração`). As três primeiras linhas ficam assim:

```
id;sigla;nome
1;ADM;Administração
2;BCV;BCV
```

Quando o app mostra só a sigla (como BCV), repita a sigla no nome. Salve como `dados/cursos.csv`, confira no Bloco de Notas e faça o commit:

```
git add dados/cursos.csv
git commit -m "feat: adiciona cursos da escola em csv"
git log --oneline
```

O `git log --oneline` mostra os **seus 4 commits** no topo da lista. Embaixo deles vêm os commits que já estavam no repositório da turma.

**Passo 6: enviar a branch e abrir o Pull Request do CP1.**

```
git push -u origin joao-lucas/cp1
```

Abra `https://github.com/grau-tecnico-mossoro-dsi/<repo-da-turma>` e abra o Pull Request (seção 3.5, item 5) com o título `CP1 - joao-lucas`. Depois, confira:

- o check ficou **✔**;
- na aba **Files changed**, só aparecem arquivos de `alunos/joao-lucas/`;
- na aba **Files changed**, clique em `laboratorios.csv`: o GitHub mostra o arquivo como uma tabela;
- no seletor de branch da página inicial (o botão `main`, acima da lista de arquivos), escolha `joao-lucas/cp1` e entre em `alunos/joao-lucas`: o README mostra os requisitos, o algoritmo e as fotos.

Se o check ficar ✘ ou faltar alguma coisa, corrija, faça commit e push na mesma branch. O PR se atualiza sozinho.

**Passo 7: saia da conta** (seção 3.6). Não precisa mandar link para o professor: ele vê o seu PR na aba **Pull requests** do repositório da turma.

## 3.9 Erros comuns

| Sintoma | Causa |
|---|---|
| `'git' não é reconhecido como um comando interno` | Git não instalado, ou o terminal foi aberto antes da instalação (feche e abra de novo) |
| `fatal: not a git repository` | Você está fora da pasta do repositório; confira com `cd` (Windows) ou `pwd` e entre na pasta |
| `Author identity unknown` / `Please tell me who you are` | Faltou o `git config user.name` e `user.email` |
| `nothing to commit, working tree clean` | Você não salvou o arquivo, ou já fez commit de tudo |
| `fatal: destination path '...' already exists` no `git clone` | O repositório já foi clonado nesta máquina. Entre na pasta com `cd`, rode o `git config` com o **seu** nome, depois `git switch main` e `git pull` |
| `Permission ... denied` ou erro `403` no push | Você ainda não aceitou o convite da organização (seção 3.5, item 1) |
| `GH006` ou `GH013` (`protected branch`, `rule violations`) no push | Você está na `main`, e ela é protegida. Crie a sua branch com `git switch -c joao-lucas/cp1` (os commits vão junto) e faça o push dela |
| `error: src refspec ... does not match any` | O nome da branch no `git push` está diferente do nome que você criou; confira com `git branch` |
| `! [rejected] ... (fetch first)` no push | A sua branch no GitHub tem um commit que o seu computador não tem (por exemplo, feito em outra máquina). Rode `git pull` e depois `git push` |
| Check **✘** vermelho no PR | Clique em **Details** e leia o motivo: arquivo fora da sua pasta, arquivo indevido (`.DS_Store`) ou erro de sintaxe num `.js` |
| Pede usuário e senha e recusa a senha | O GitHub não aceita a senha no terminal: use a janela de login pelo navegador |
| Arquivo virou `README.md.txt` | O Bloco de Notas acrescentou `.txt`; salve com Tipo "Todos os arquivos" |
| Excel mostra tudo numa coluna só | O arquivo foi salvo com `,` e o Excel esperava `;` (ou o contrário); confira no Bloco de Notas |
| Acentos viram `Ã³` ou `�` | O arquivo não foi salvo em UTF-8 |
| Imagem não aparece no README | Nome diferente (`Reserva.JPG` ≠ `reserva.jpg`) ou caminho errado |

## 3.10 Exercícios em aula

1. **Navegação.** No terminal, descubra em que pasta você está, entre em `Documentos`, liste o conteúdo e volte uma pasta.
2. **Pastas.** Crie, só pelo terminal, a estrutura `estudos/logica/aula03`. Confira com `dir` ou `ls` em cada nível.
3. **Primeiro commit.** Na pasta `teste-git`, crie `anotacoes.txt`, faça um commit; altere o arquivo, faça outro commit. Mostre os dois com `git log --oneline`.
4. **Dois commits separados.** Crie dois arquivos (`a.txt` e `b.txt`), mas faça um commit para cada um, usando `git add` com o nome do arquivo. Confira no `git status` entre um e outro.
5. **CSV na mão.** No Bloco de Notas, crie `turma.csv` com o cabeçalho `numero;nome;idade` e 3 colegas. Salve em UTF-8 e abra no Excel: as colunas apareceram certas?
6. **CSV no Excel.** Faça o caminho contrário: crie uma tabela de 3 filmes (`titulo;ano;genero`) no Excel, salve como CSV UTF-8 e abra no Bloco de Notas. Qual é o separador?
7. **(Projeto)** Faça o CP1 completo (seção 3.8): 4 commits na sua branch, push e Pull Request com o check ✔.
8. **(Projeto)** Acrescente ao README a foto do fluxograma do desafio da aula 2 (excluir curso), faça commit e push na mesma branch. No PR, abra a aba **Commits** e confira que agora são 5 commits, sem abrir outro PR.

## 3.11 Desafio para a próxima aula

**O arquivo de turmas.** Na sua pasta (`alunos/<sua-pasta>/`), crie `dados/turmas.csv` com as colunas:

```
id;nome;curso;alunos
```

A coluna `curso` **não** guarda o nome do curso: guarda o **id** do curso, igual ao do `cursos.csv`. Exemplo:

```
id;nome;curso;alunos
1;ADM09;1;28
2;ADM10;1;25
3;DSI02;3;24
```

Aqui, `1;ADM09;1;28` quer dizer: a turma ADM09 é do curso 1 (Administração) e tem 28 alunos. Coloque pelo menos 5 turmas, com `id` começando em 1 e sem repetição, `curso` igual a um `id` que existe no `cursos.csv` e `alunos` de 1 a 60. Crie no Excel (ou no Bloco de Notas), salve em **CSV UTF-8**, **confira no Bloco de Notas** que o separador é `;`, e então, na branch do CP1:

```
git add dados/turmas.csv
git commit -m "feat: adiciona turmas em csv"
git push
```

Escreva também, no fim do README, uma seção `## Dados` explicando em uma linha o que tem em cada arquivo da pasta `dados/` (faça um commit só para isso, com o prefixo `docs:`). Os dois commits entram no mesmo PR do CP1, e o professor confere por ele.

## 3.12 Resumo

- **Terminal:** `cd` entra (e `cd ..` volta), `dir` (Windows) ou `ls` (Linux/macOS) lista, `mkdir` cria pasta, `pwd` mostra onde estou;
- **Git** tira "fotos" do projeto: `git init` (num repositório novo), depois o ciclo `git status → git add → git commit -m "..."`; `git log --oneline` mostra o histórico;
- **Mensagens de commit** no imperativo, com prefixo: `feat:` (novo), `fix:` (correção), `docs:` (texto);
- **Repositório da turma:** aceitar o convite, `git clone` (uma vez), mexer **só** em `alunos/<sua-pasta>/`;
- **Branch** = a sua linha de trabalho (`git switch -c <sua-pasta>/cp1`); a `main` é protegida; `git push -u origin <branch>` na primeira vez, depois `git push`;
- **Pull Request** em cada checkpoint: o check confere (✔/✘), o professor comenta, você corrige com commit novo na mesma branch, o professor faz o merge; `git switch main` + `git pull` trazem as novidades;
- No laboratório: `git config` **sem** `--global`, e no fim da aula **Sign out** + remover a credencial;
- **.csv** é uma tabela em texto: uma linha por registro, colunas separadas por `;`, primeira linha = cabeçalho, salvo em UTF-8;
- **CP1:** pasta `alunos/<sua-pasta>/` com README (requisitos e algoritmo), fotos dos fluxogramas, `dados/laboratorios.csv` e `dados/cursos.csv`, entregue por Pull Request.
