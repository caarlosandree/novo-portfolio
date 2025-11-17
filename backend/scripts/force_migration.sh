#!/bin/bash

# Script para forçar a reexecução de uma migração específica
# Uso: ./scripts/force_migration.sh 009_insert_all_translations_pt_br

set -e

# Carrega variáveis de ambiente
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Verifica se DATABASE_URL está definida
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erro: DATABASE_URL não está definida no .env"
    exit 1
fi

MIGRATION_NAME=$1

if [ -z "$MIGRATION_NAME" ]; then
    echo "❌ Erro: Especifique o nome da migração"
    echo "Uso: ./scripts/force_migration.sh 009_insert_all_translations_pt_br"
    exit 1
fi

MIGRATION_FILE="migrations/${MIGRATION_NAME}.up.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Erro: Arquivo de migração não encontrado: $MIGRATION_FILE"
    exit 1
fi

echo "🔄 Forçando reexecução da migração: $MIGRATION_NAME"
echo ""

# Executa a migração diretamente (sem verificar se já foi executada)
if psql "$DATABASE_URL" -f "$MIGRATION_FILE" 2>&1; then
    echo ""
    echo "✅ Migração executada com sucesso!"
    echo "   Nota: A migração usa ON CONFLICT, então traduções existentes foram atualizadas"
    echo "         e novas traduções foram inseridas."
else
    echo ""
    echo "❌ Erro ao executar a migração"
    exit 1
fi

