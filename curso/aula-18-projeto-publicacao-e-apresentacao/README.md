**Lógica de Programação** · Técnico em Desenvolvimento de Sistemas · Grau Técnico

[← Anterior](../aula-17-projeto-testes-e-readme/README.md) · [Índice do curso](../README.md) · [Próxima →](../aula-19-revisao/README.md)

---

# AULA 18 — Projeto: publicação no GitHub Pages e apresentação

## Objetivos da aula

- Entender a diferença entre **abrir um arquivo** no seu computador e **acessar um site** na internet;
- Publicar o sistema de reservas (a pasta `app/`, integrada na aula 17) no **GitHub Pages**, passo a passo;
- Conferir o site publicado e corrigir os problemas típicos de publicação;
- Apresentar o projeto em **3 minutos**, com roteiro, **comparando** o seu sistema com o app real de agenda da escola;
- Conhecer os **critérios de avaliação** do projeto;
- Fechar o **CP7**: `app/` integrado (3 telas) + GitHub Pages + README final + apresentação de 3 min.

## 18.1 Do seu computador para a internet

Até hoje o sistema rodou em dois lugares: com dois cliques no `index.html` (endereço `file:///C:/Users/...`) ou com o Live Server (`http://127.0.0.1:5500/...`). Os dois só existem **no seu computador**. Para alguém abrir o sistema pelo celular, os arquivos precisam estar num **servidor**: um computador ligado o tempo todo, que entrega os arquivos para quem pedir.

```
   VOCÊ                       GITHUB                         QUALQUER PESSOA
   ┌──────────┐ PR + merge  ┌──────────────────┐   pede o   ┌──────────────┐
   │ sua pasta│ ──────────► │ repo. da turma   │ ◄──────── │ navegador    │
   │ projeto  │             │ + GitHub Pages   │ ─────────► │ (PC, celular)│
   └──────────┘             │ (servidor)       │  entrega   └──────────────┘
                            └──────────────────┘  index.html,
                                                   dados.js...
```

O **GitHub Pages** é um serviço gratuito do GitHub que transforma um repositório em site. Ele só entrega arquivos prontos (HTML, CSS, JS, `.csv`): não roda programa no servidor e não tem banco de dados. Para o nosso sistema, é suficiente, porque tudo roda **no navegador** de quem acessa.

## 18.2 Antes de publicar: confira a sua pasta

| Confira | Por quê |
|---|---|
| O app integrado está em `alunos/<sua-pasta>/app/` (com o `index.html`, o `cadastros.html` e o `arquivos.html`) e a pasta `dados/` está em `alunos/<sua-pasta>/dados/` | O Pages publica o repositório da turma inteiro; o seu sistema abre no endereço terminado em `/alunos/<sua-pasta>/app/` |
| A chave do `localStorage` é `reservaLab.<sua-pasta>` | Toda a turma divide o mesmo endereço base no Pages (veja o 18.4) |
| Os nomes nos links e nos `<script src>` são **idênticos** aos nomes dos arquivos, inclusive maiúsculas | O Windows não diferencia `Cadastros.html` de `cadastros.html`; o servidor do GitHub diferencia |
| Os caminhos são **relativos** (`dados.js`, `../dados/laboratorios.csv`) | Um caminho como `C:\Users\aluno\...` só existe no seu computador |
| O último `git push` foi feito na branch `<sua-pasta>/cp7` | O PR mostra o que está no GitHub, não o que está na sua máquina |

Para conferir os nomes, abra a sua pasta **no site do GitHub**, na sua branch, e compare com os `href` e `src` do HTML.

## 18.3 Publicando: Pull Request do CP7 e merge

O GitHub Pages do repositório da turma **já está ligado**: o professor ativou uma vez, na branch `main`, pasta `/ (root)`. Você **não** mexe em Settings. Tudo o que entra na `main` vai para o site. Por isso, o seu app só aparece no site **depois do merge** do PR do CP7.

1. Faça o último `git push` na branch `<sua-pasta>/cp7`.
2. No GitHub, abra o repositório da turma e crie o Pull Request: base `main`, compare `<sua-pasta>/cp7`, título `CP7 - <seu nome>`.
3. Espere o GitHub Action do PR. Ele confere as mesmas coisas do CP6: só a sua pasta mudou, todo `.js` passa no `node --check` e não há arquivo indevido. Vermelho = abra os detalhes, corrija e faça `git push` **na mesma branch**.
4. O professor revisa e comenta no PR. Corrija na mesma branch, do mesmo jeito.
5. O professor faz o merge. Espere 1 a 2 minutos. Para acompanhar, abra a aba **Actions** do repositório da turma: o processo **pages build and deployment** fica amarelo enquanto publica e verde quando termina.

O endereço segue sempre o mesmo padrão:

```
   https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/<sua-pasta>/

   o sistema (pasta app/):
            https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/joao-lucas/app/
```

Como o `index.html` está dentro de `app/`, **o link do sistema termina em `/app/`**. A sua pasta sem o `/app/` não tem `index.html`, e o Pages normalmente mostra o README no lugar. Isso não é erro: o README tem o link para o sistema.

Você já sabe o endereço antes do merge. Então coloque o link **terminado em `/app/`** no topo do README (o campo "Site publicado" do modelo da aula 17) **antes** de abrir o PR. Assim, o link entra no site junto com o app.

Depois do merge, **toda mudança no site segue o mesmo caminho**: `git switch main`, `git pull`, uma branch nova (ex.: `joao-lucas/ajustes`), commits, PR e merge. Se a mudança não aparecer depois do merge, confira a aba Actions e recarregue a página com `Ctrl+F5` (o navegador às vezes mostra a versão guardada).

## 18.4 Conferindo o site publicado

Abra o link numa **janela anônima** (`Ctrl+Shift+N`) e no **celular**. Janela anônima começa com o `localStorage` vazio, como um visitante novo.

| Teste no site publicado | Esperado |
|---|---|
| Abrir o link terminado em `/app/` | A agenda aparece, com o calendário da próxima semana (não o README, não erro 404) |
| Clicar em todos os links do menu | As 3 telas abrem; console (F12) sem erro vermelho |
| Cadastrar um professor e trocar de tela | O cadastro continua lá (`localStorage` funcionando) |
| Arquivos → importar os 5 `.csv` | Mensagem com as 5 contagens, sem avisos |
| Exportar reservas da semana | O `reservas-semana-DD-MM.csv` é baixado |
| Fazer uma reserva e baixar o comprovante | O `.txt` é baixado com o nome `AAAAMMDDTHHMM-PROFESSOR.txt` |
| Abrir no celular | Dá para ler e usar (mesmo que fique simples) |

Problemas típicos:

| O que aparece | Causa | Correção |
|---|---|---|
| 404 no link `.../app/` | O PR ainda não teve merge, a pasta tem outro nome (`App/`, `apps/`), não foi enviada (`git status`), ou o Pages ainda não terminou | Esperar o merge; deixar a pasta como `app/`; esperar a aba Actions ficar verde |
| O README aparece no lugar do sistema | Você abriu a sua pasta no site, sem o `/app/` | Acrescentar `/app/` no fim do endereço (e usar esse link no README) |
| Uma tela dá 404, as outras abrem | Maiúscula/minúscula diferente entre o link e o arquivo | Deixar os dois iguais (tudo em minúsculas é o mais seguro) |
| A tela abre, mas nada funciona | Um `.js` não foi encontrado (console: `404` no `dados.js`, no `regras.js` ou no `tela.js`) | Conferir o `<script src>` e se o arquivo foi enviado (`git status`) |
| Acentos estranhos (`EletrotÃ©cnica`) | Falta `<meta charset="UTF-8">` no HTML | Acrescentar no `<head>` de todas as telas |
| A mudança não aparece | PR sem merge, publicação em andamento, ou cache | Esperar o merge; aba Actions; `Ctrl+F5` |

**Um cuidado com o `localStorage` no Pages:** o app de todos os alunos da turma fica no mesmo endereço base (`grau-tecnico-mossoro-dsi.github.io`), e o navegador separa o `localStorage` por esse endereço. Ou seja, todos os apps da turma **dividem** o mesmo `localStorage` naquele navegador. É por isso que a chave tem o nome da sua pasta (`reservaLab.joao-lucas`): o app de um colega, com outra chave, não apaga os seus dados. Se dois alunos usarem a mesma chave, um sobrescreve os dados do outro.

## 18.5 Extra: carregar os `.csv` direto do site (`fetch`)

Com o site publicado, a pasta `dados/` também está na internet. Teste: abra `https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/joao-lucas/dados/laboratorios.csv`. O arquivo aparece no navegador!

Repare no caminho: as telas estão em `app/`, e a pasta `dados/` está **um nível acima**, na sua pasta (`alunos/<sua-pasta>/`). Para o `arquivos.html` chegar lá, o caminho relativo sobe uma pasta com `../`: `"../dados/laboratorios.csv"`.

Então o sistema pode **buscar** os arquivos sozinho, sem o usuário escolher nada. Quem faz isso é o `fetch` ("buscar"), que pede um arquivo ao servidor, como o navegador pede uma página:

```javascript
// [RECEITA] mesma ideia do "await arquivo.text()" da aula 14
let resposta = await fetch("../dados/" + nomes[i]);
if (resposta.ok === false) {
    // 404 = arquivo não encontrado (nome ou pasta diferentes)
    mostrarMensagem("#msg-importar", "Não foi possível baixar dados/" + nomes[i] + " (erro " + resposta.status + ").");
    return;
}
let texto = await resposta.text();
let registros = lerCsv(texto);
importarPeloNome(nomes[i], registros);   // daqui em diante, tudo igual à aula 14
```

Esse trecho fica dentro de um laço pelos 5 nomes de arquivo, numa função nova `carregarDoSite()` no **`importar.js`** (o arquivo da seção de importar, M3). Depois do laço: `salvarDados()`, a mensagem e a `mostrarAvisosDeVinculo()`, que já existe no `importar.js`. Repare que, depois do `fetch`, o caminho é o mesmo de sempre: texto → `lerCsv` → `importarPeloNome` → `salvarDados` → `conferirVinculos`. Só mudou **de onde vem o texto**: antes, do arquivo que o usuário escolheu; agora, do servidor. O código completo, com os 5 arquivos e o botão, está em [`exemplos/carregar-do-site.js`](exemplos/carregar-do-site.js).

```
   aula 14:   usuário escolhe o arquivo ──► arquivo.text() ──┐
                                                             ├──► lerCsv ──► importarPeloNome ──► salvarDados
   aula 18:   fetch("../dados/...") ────► resposta.text() ──┘
```

Limitações:

- O `fetch` **não funciona** com o arquivo aberto por dois cliques (`file:///`): o navegador bloqueia por segurança. Use o Live Server ou o site publicado.
- No Live Server, abra no VS Code a **sua pasta** (`alunos/<sua-pasta>/`) ou o repositório inteiro. Se você abrir só a pasta `app/`, o servidor não enxerga nada acima dela, e o `../dados/` dá 404.
- O `fetch` só **lê**. O site não consegue gravar de volta no `reservas.csv` do GitHub. Gravar dados num servidor exige um **back-end** e um **banco de dados**, que são assunto das próximas disciplinas.

## 18.6 A apresentação de 3 minutos

Três minutos passam muito rápido. Quem improvisa gasta dois minutos procurando o botão certo. Siga o roteiro, **ensaie com cronômetro** e deixe tudo aberto antes de começar (site publicado em uma aba, código em outra, dados iniciais restaurados).

O fio da apresentação é a **comparação com o app real** de agenda da escola, aquele que a turma olhou na aula 1 para levantar os requisitos. O nosso projeto imita a tela de visitante dele (formulário "Nova reserva" + calendário da "Próxima semana"). Mostre o que ficou **igual**, o que ficou **diferente** e **por quê**.

| Tempo | O que mostrar | Dica |
|---|---|---|
| 0:00–0:20 | Quem são e qual problema o sistema resolve | Uma frase: "professores reservam os laboratórios da próxima semana sem conflito, como no app da escola" |
| 0:20–1:20 | **Demonstração do fluxo principal**: nova reserva (professor → curso → turma → laboratório → dia → turno), tentar o mesmo horário (conflito → lista de espera), cancelar e ver o 1º da fila assumir | Use os dados de exemplo; não digite textos longos |
| 1:20–1:50 | **Comparação com o app real**: 2 coisas iguais e 2 diferentes | Ex.: iguais: calendário da próxima semana, sábado só de manhã; diferentes: lista de espera e comprovante `.txt` (o nosso tem), login administrativo (o nosso não tem) |
| 1:50–2:20 | **A integração**: um dos 3 problemas da aula 17 e como você resolveu | Ex.: a `atualizarTela()` que "sumia" (vale a última carregada). Quem fez o extra opcional pode mostrá-lo aqui |
| 2:20–2:50 | Um trecho de código de que você se orgulha **ou** o bug mais difícil que corrigiu | Mostre a função, não o arquivo inteiro |
| 2:50–3:00 | O link do site e a sua pasta no GitHub | "O link está no README" |

Para a comparação, use o que vocês anotaram na aula 1. Algumas diferenças têm um **porquê** que vale contar:

| No app real | No nosso projeto | Por quê |
|---|---|---|
| Os dados ficam num servidor: todos os professores veem a mesma agenda | Os dados ficam no `localStorage`: cada navegador tem a sua agenda | Ainda não temos back-end nem banco de dados (próximas disciplinas) |
| Tem "Acesso administrativo" com senha | Não tem senha | Senha guardada no front-end qualquer um lê no DevTools (F12): seria uma falha de segurança |
| Os laboratórios são cadastrados pela escola | Laboratório é só leitura, vem dos dados iniciais ou do `.csv` | Laboratório é espaço físico: não se cria pelo sistema |

**Não mostre o endereço do app real** na apresentação nem no README: ele é um sistema interno da escola, com dados de verdade. Fale dele e, se quiser, mostre uma foto da tela de visitante sem dados pessoais.

Em dupla, combinem quem fala cada parte. Os dois precisam saber explicar o código: o professor pode perguntar qualquer trecho a qualquer um dos dois.

Perguntas que costumam aparecer (prepare a resposta):

- Onde fica a regra de conflito e como ela funciona? (Dica: o Set `horariosOcupados`.)
- Por que a lista de espera é uma **fila** e o desfazer é uma **pilha**?
- Por que a reserva guarda a **turma** e não o curso nem o número de alunos?
- O que acontece com os dados se eu abrir o site em outro computador? (Resposta: não aparecem, porque o `localStorage` fica neste navegador, neste computador.)
- O que são o `dados.js` e o `regras.js` e por que eles são carregados antes das seções?
- Para que serve o `tela.js`? O que acontece quando dois arquivos têm uma `function` com o mesmo nome?

## 18.7 Critérios de avaliação do projeto

Esta é a rubrica do projeto final. A mesma lista está em `projeto/README.md`, no repositório da turma.

| Critério | O que é avaliado | Pontos |
|---|---|---|
| 1. Menu e validação | Telas ligadas pelo menu; campos numéricos aceitam só dígitos, sem 0 ou negativo; mensagens claras | 0,5 |
| 2. Cadastros | Laboratórios listados (só leitura); CRUD de cursos (sigla de 2 a 4 letras, única), turmas (curso da lista, nome único, 1 a 60 alunos) e professores (nome completo), sempre a partir de uma lista, com confirmação; exclusão bloqueada por vínculo | 1,0 |
| 3. Reserva | Professor → curso → turma (só as do curso) → laboratório → dia → turno; bloqueia conflito, turma que não cabe e sábado à tarde/noite | 1,0 |
| 4. Fila e pilha | Lista de espera assume ao cancelar; desfazer a última reserva | 0,75 |
| 5. Matriz, busca e ordenação | Calendário da semana (dia × turno); busca linear, binária e Map; Set de horários ocupados e de siglas; selection e bubble sort à mão | 1,0 |
| 6. Arquivos | Importa os 5 `.csv` e confere os vínculos; exporta `reservas-semana-DD-MM.csv` ordenado; comprovante `.txt` com o nome no padrão | 1,0 |
| 7. Microprojetos e `localStorage` | M0 a M9 prontos, cada um com commit (CP6); formulários, `textContent`, dados sobrevivem ao F5, restaurar dados iniciais | 0,75 |
| 8. Integração | `app/` com as 3 telas (agenda, cadastros, arquivos); `<script>` na ordem certa; uma `atualizarTela()` por tela; ajudantes num `tela.js` só, sem cópias | 1,0 |
| 9. Código | Funções com uma tarefa, nomes claros, `dados.js` + `regras.js` + `tela.js` + um `.js` por seção + um `.js` por tela, sem código morto | 1,0 |
| 10. GitHub | Commits ao longo das aulas (não um commit só no fim), PR de cada checkpoint, README final, `TESTES.md` | 0,5 |
| 11. GitHub Pages | Site publicado (depois do merge do CP7) e funcionando pelo link | 0,5 |
| 12. Apresentação | Dentro dos 3 min, demonstra o fluxo principal, explica um problema da integração, compara com o app real, responde às perguntas sobre o código | 1,0 |
| | **Total** | **10,0** |

Em cada critério: **completo** (nota cheia), **parcial** (metade: funciona com falhas ou faltou uma parte) ou **ausente** (zero). O extra opcional (aula 16) **não** está na rubrica.

## 18.8 Projeto da disciplina: o que fazemos hoje

1. Conferir a sua pasta com a tabela 18.2.
2. Colocar o link do site (18.3) no topo do README e enviar:

```
git add .
git commit -m "docs: link do GitHub Pages no README"
git push
```

3. Abrir o Pull Request do CP7 (18.3) e acompanhar o GitHub Action.
4. (Opcional) Implementar o `fetch` do 18.5, testar no Live Server e, depois do merge, **no site publicado**.
5. Ensaiar a apresentação com cronômetro (18.6), em dupla.
6. Depois do merge, conferir o site publicado (18.4) em janela anônima e no celular. Para corrigir: branch nova, PR e merge.
7. Apresentar.

## 18.9 Erros comuns

| Sintoma | Causa |
|---|---|
| O link do Pages dá 404 logo depois de abrir o PR | O PR ainda não teve merge: o site só publica o que está na `main` |
| O GitHub Action do PR ficou vermelho | O PR mexe fora da sua pasta, um `.js` tem erro de sintaxe (`node --check`) ou há arquivo indevido; corrija na mesma branch |
| O link do Pages funciona, mas mostra a versão antiga | A correção ainda não teve merge, publicação em andamento (aba Actions) ou cache (`Ctrl+F5`) |
| Os dados de um colega aparecem no seu app, ou os seus somem | A chave do `localStorage` não tem o nome da sua pasta (`reservaLab.<sua-pasta>`) |
| `fetch` dá `Failed to fetch` no console | O arquivo foi aberto com dois cliques (`file:///`); use Live Server ou o site |
| `fetch` dá erro 404 | O caminho não começa com `../` (as telas estão em `app/` e a pasta `dados/` está um nível acima, na sua pasta); o Live Server foi aberto só na pasta `app/`; ou o nome do `.csv` é diferente (maiúsculas contam) |
| Os dados sumiram ao abrir o site | Não sumiram: estão no `localStorage` do Live Server (`127.0.0.1`), que é outro endereço; o site publicado começa com os dados iniciais |
| A apresentação passou de 5 minutos | Não ensaiou com cronômetro; digitou textos longos ao vivo |
| O endereço do app real da escola apareceu no slide ou no README | Ele é um sistema interno, com dados de verdade: fale dele, mostre uma foto sem dados pessoais, mas não publique o endereço |

## 18.10 Exercícios em aula

1. O repositório da turma se chama `logica-tds-2026` e a pasta do aluno é `alunos/maria-souza/`. Qual é o endereço do app dele no GitHub Pages?
2. No Live Server tudo funciona. No site publicado, a tela Cadastros dá 404. O menu tem `<a href="Cadastros.html">` e o arquivo se chama `cadastros.html`. Explique o problema e a correção.
3. Depois do merge, uma aluna abre `https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/ana-clara/` e vê o texto do README em vez do sistema. As telas estão em `alunos/ana-clara/app/index.html`. O que aconteceu? Qual link ela deve pôr no README?
4. Por que o `fetch("../dados/laboratorios.csv")` funciona no Live Server e no Pages, mas não com dois cliques no `arquivos.html`? E por que o caminho começa com `../`?
5. Um colega diz: "cadastrei 10 turmas no site publicado pelo meu PC; quando abri pelo celular, eles não estavam lá. O GitHub Pages perdeu meus dados". Ele tem razão? Explique.
6. **Projeto:** escreva o roteiro da sua apresentação numa tabela igual à do 18.6, com o que **você** vai mostrar em cada faixa de tempo, e cronometre um ensaio. Inclua as 2 semelhanças e as 2 diferenças com o app real que você vai citar.
7. **Projeto:** faça a conferência 18.4 no site publicado de outra dupla e conte a ela o que encontrou.

## 18.11 Desafio para a próxima aula

**Melhoria publicada + ponte para a revisão.**

1. Corrija no projeto os pontos levantados na sua apresentação (pelo professor ou pela turma). Use uma branch nova a partir da `main` atualizada (ex.: `joao-lucas/ajustes`), faça commit, push e abra um PR. Depois do merge, confira na aba **Actions** que a publicação terminou; abra o site e confirme a mudança.
2. Prepare-se para a revisão: escolha a função `turnoPermitido(dia, turno)` (mais fácil) ou `motivoDaRecusa` do seu `regras.js` e **traduza de volta para Portugol** (VisualG), como uma `funcao` com parâmetros e `retorne`. No `motivoDaRecusa`, em vez dos objetos `turma` e `laboratorio`, receba os números `dia`, `turno`, `alunos` e `capacidade`. Traga escrita no caderno; vamos usar na aula 19.

## 18.12 Resumo

- Arquivo no seu computador (`file:///` ou Live Server) ≠ site na internet; o GitHub Pages é o servidor gratuito que entrega os seus arquivos para qualquer pessoa.
- Publicar: o professor ligou o Pages uma vez (`main`, `/ (root)`); o seu app entra no site com o merge do PR do CP7; endereço `https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/<sua-pasta>/app/`.
- O sistema fica em `app/`: o link termina em `/app/`; nomes com maiúsculas idênticas, caminhos relativos (`../dados/` para sair de `app/`).
- Todo merge na `main` atualiza o site; acompanhe na aba Actions; `Ctrl+F5` contra o cache.
- O `localStorage` fica no navegador de quem acessa: cada computador tem os seus dados. No Pages, a turma toda divide o mesmo endereço: por isso a chave é `reservaLab.<sua-pasta>`.
- `fetch` busca arquivos do site (só leitura); gravar exige back-end e banco de dados.
- Apresentação: 3 minutos, roteiro com tempo, fluxo principal + comparação com o app real + um problema da integração + um trecho de código; ensaie. O endereço do app real não aparece.
