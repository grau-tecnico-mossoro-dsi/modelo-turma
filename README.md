# Lógica de Programação

Técnico em Desenvolvimento de Sistemas · Grau Técnico Mossoró · 20 aulas de 3 horas

Este é o repositório da turma. Aqui ficam as aulas, o projeto da disciplina e a pasta de cada aluno.

| Pasta | O que tem | Quem altera |
|---|---|---|
| [`curso/`](curso/README.md) | As 20 aulas, uma pasta por aula | Professor |
| [`projeto/`](projeto/README.md) | O projeto **Agenda de Laboratórios**: regras, dados `.csv` e as telas prontas (HTML e CSS) | Professor |
| [`alunos/`](alunos/README.md) | Uma pasta por aluno, com o seu código | **Você, só na sua pasta** |
| `.github/` | Regras de revisão e a conferência automática dos Pull Requests | Professor |

## Como você trabalha

A `main` é protegida: ninguém faz push direto nela. Todo código entra por **Pull Request** (PR), revisado pelo professor.

```
main ──────────────●──────────────────●──────────▶
                    \                 ↑ merge (o professor aprova)
joao-lucas/cp3       ●──●──●──●──●────┘
                     commits e push quantas vezes quiser
```

### Uma vez só (aula 3)

```bash
git clone https://github.com/grau-tecnico-mossoro-dsi/<repo-da-turma>.git
cd <repo-da-turma>
```

### A cada checkpoint

```bash
git switch main
git pull                              # pega as novidades da main
git switch -c joao-lucas/cp3          # branch nova: <sua-pasta>/<assunto>

# trabalhe SÓ em alunos/joao-lucas/
git add alunos/joao-lucas
git commit -m "feat: adiciona CRUD de cursos"
git push -u origin joao-lucas/cp3     # nos próximos push, só: git push
```

No GitHub, abra o **Pull Request** da sua branch para a `main` e preencha o checklist.

### O que acontece no Pull Request

1. **Conferência automática (GitHub Actions).** Em 1 ou 2 minutos aparece ✔ ou ✘. O ✘ diz o motivo:
   - você alterou algo fora da sua pasta;
   - um `.js` tem erro de sintaxe;
   - há arquivo que não deve ir para o repositório (`.DS_Store`, `node_modules/`, arquivo maior que 5 MB);
   - o nome da pasta tem maiúscula, acento ou espaço.
2. **Revisão do professor.** A correção vem nos comentários do PR, linha por linha.
3. **Correção.** Corrija na mesma branch, faça commit e `git push`. O PR se atualiza sozinho.
4. **Merge.** Quando estiver certo, o professor aprova e faz o merge. Pronto: o checkpoint foi entregue.

## Checkpoints

| CP | Aula | Branch sugerida | Entrega |
|---|---|---|---|
| CP1 | 3 | `<sua-pasta>/cp1` | Sua pasta, README com o algoritmo, fluxograma, `dados/laboratorios.csv` e `dados/cursos.csv` |
| CP2 | 6 | `<sua-pasta>/cp2` | Portugol: menu validado, laboratórios em vetores, matriz dia × turno |
| CP3 | 10 | `<sua-pasta>/cp3` | JS: menu validado + CRUD de cursos |
| CP4 | 11 | `<sua-pasta>/cp4` | Objetos, turmas e professores, reserva, fila e pilha |
| CP5 | 12 | `<sua-pasta>/cp5` | Calendário, buscas, Map e Set, ordenações |
| CP6 | 16 | `<sua-pasta>/cp6` | Microprojetos M0 a M9 |
| CP7 | 18 | `<sua-pasta>/cp7` | `app/` integrado, publicado no GitHub Pages, README final |

## Regras do repositório

- Use o **nome curto** na pasta (`joao-lucas`), nunca o nome completo: este repositório é público.
- Não altere a pasta de um colega nem os arquivos do professor.
- Mensagens de commit em português, com o tipo na frente: `feat:`, `fix:`, `docs:`.
- Seu app publicado fica em `https://grau-tecnico-mossoro-dsi.github.io/<repo-da-turma>/alunos/<sua-pasta>/app/` depois do merge do CP7.
