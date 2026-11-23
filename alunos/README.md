# Pastas dos alunos

Cada aluno tem **uma** pasta aqui, criada por ele na aula 3. Todo o seu trabalho da disciplina fica dentro dela.

## Nome da pasta

`nome-sobrenome`, só com letras minúsculas, números e hífen. Sem acento, sem espaço.

| Certo | Errado |
|---|---|
| `joao-lucas` | `João Lucas`, `joao_lucas`, `JoaoLucas` |
| `maria-souza` | `maria-souza-da-silva-santos` (use o nome curto: o repositório é público) |

## O que vai dentro

```
alunos/joao-lucas/
├── README.md                     requisitos, algoritmo e, no fim, o README do projeto
├── dados/                        laboratorios.csv, cursos.csv… (aulas 3 e 4)
├── portugol/reserva-laboratorio.alg   (aulas 4 a 7)
├── prompt/                       aulas 8 a 12: index.html copiado + o seu script.js
├── microprojetos/                aulas 13 a 16: as telas copiadas + os seus .js
└── app/                          aulas 17 e 18: o projeto final
```

As telas prontas (HTML e CSS) estão em `projeto/para-os-alunos/`. Copie para a sua pasta na aula em que forem usadas. De dentro de `alunos/joao-lucas/`:

```bash
cp -r ../../projeto/para-os-alunos/prompt .          # aula 8
cp -r ../../projeto/para-os-alunos/microprojetos .   # aula 13
cp -r ../../projeto/para-os-alunos/app .             # aula 17
```

Nunca altere os originais em `projeto/`: trabalhe na sua cópia.
