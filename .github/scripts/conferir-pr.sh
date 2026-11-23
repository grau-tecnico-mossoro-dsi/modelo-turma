#!/usr/bin/env bash
# Conferência automática dos Pull Requests da turma.
# Entradas (variáveis de ambiente): BASE_SHA, HEAD_SHA, BRANCH, AUTOR.
# Os valores vêm do aluno (nome da branch, nomes de arquivo): são sempre
# usados entre aspas e nunca executados.
set -u

TAMANHO_MAXIMO=5242880   # 5 MB (foto de fluxograma tirada no celular)
erros=0

erro() {
    echo "::error::$1"
    erros=$((erros + 1))
}

professores=$(grep -o '@[A-Za-z0-9-]*' .github/CODEOWNERS | tr -d '@')
for professor in $professores; do
    if [ "$AUTOR" = "$professor" ]; then
        echo "PR do professor ($AUTOR): conferência de pasta dispensada."
        exit 0
    fi
done

pasta="${BRANCH%%/*}"
echo "Branch: $BRANCH"
echo "Pasta esperada: alunos/$pasta/"

if [ "$pasta" = "$BRANCH" ]; then
    erro "A branch '$BRANCH' não segue o padrão <sua-pasta>/<assunto> (ex.: joao-lucas/cp3)."
fi
if ! [[ "$pasta" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    erro "O nome '$pasta' deve ter só letras minúsculas, números e hífen (ex.: joao-lucas)."
fi

merge_base=$(git merge-base "$BASE_SHA" "$HEAD_SHA")
alterados=$(git diff --name-only "$merge_base" "$HEAD_SHA")

if [ -z "$alterados" ]; then
    erro "O PR não altera nenhum arquivo."
fi

while IFS= read -r arquivo; do
    [ -z "$arquivo" ] && continue

    case "$arquivo" in
        "alunos/$pasta/"*) ;;
        *) erro "Fora da sua pasta: $arquivo" ;;
    esac

    nome=$(basename "$arquivo")
    case "$arquivo" in
        */node_modules/*) erro "Não envie node_modules: $arquivo" ;;
    esac
    case "$nome" in
        .DS_Store|Thumbs.db|desktop.ini) erro "Arquivo do sistema, apague e adicione ao .gitignore: $arquivo" ;;
        .env|.env.*) erro "Arquivo de configuração secreta não vai para o repositório: $arquivo" ;;
    esac

    if [ -f "$arquivo" ]; then
        tamanho=$(wc -c < "$arquivo")
        if [ "$tamanho" -gt "$TAMANHO_MAXIMO" ]; then
            erro "Arquivo maior que 5 MB: $arquivo"
        fi
        case "$arquivo" in
            *.js)
                if ! saida=$(node --check "$arquivo" 2>&1); then
                    erro "Erro de sintaxe em $arquivo"
                    echo "$saida"
                fi
                ;;
        esac
    fi
done <<< "$alterados"

echo
echo "Arquivos conferidos:"
echo "$alterados"
echo

if [ "$erros" -gt 0 ]; then
    echo "✘ $erros problema(s). Corrija na mesma branch, faça commit e git push."
    exit 1
fi
echo "✔ Tudo certo. Agora é com o professor."
