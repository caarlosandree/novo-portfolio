#!/bin/bash

# Script para fazer rollback de uma migration específica
# Uso: ./scripts/rollback_migration.sh <version>
# Exemplo: ./scripts/rollback_migration.sh 001_initial_schema

set -e

if [ -z "$1" ]; then
    echo "❌ Erro: Especifique a versão da migration para fazer rollback"
    echo "   Uso: ./scripts/rollback_migration.sh <version>"
    echo "   Exemplo: ./scripts/rollback_migration.sh 001_initial_schema"
    exit 1
fi

VERSION=$1

# Carrega variáveis de ambiente
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Verifica se DATABASE_URL está definida
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erro: DATABASE_URL não está definida no .env"
    exit 1
fi

# Verifica se psql está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ Erro: psql não está instalado."
    exit 1
fi

# Verifica se a migration foi executada
executed=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM schema_migrations WHERE version = '$VERSION';" 2>/dev/null | xargs)

if [ "$executed" != "1" ]; then
    echo "⚠️  Migration $VERSION não foi executada ainda."
    exit 0
fi

# Procura o arquivo .down.sql correspondente
down_file="migrations/${VERSION}.down.sql"

if [ ! -f "$down_file" ]; then
    echo "❌ Erro: Arquivo de rollback não encontrado: $down_file"
    exit 1
fi

echo "⚠️  ATENÇÃO: Você está prestes a fazer rollback da migration: $VERSION"
echo "   Isso pode remover dados ou estruturas do banco de dados!"
echo ""
read -p "   Deseja continuar? (sim/não): " confirm

if [ "$confirm" != "sim" ] && [ "$confirm" != "s" ] && [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo "   Operação cancelada."
    exit 0
fi

echo ""
echo "🔄 Executando rollback: $VERSION"

# Executa o rollback
if psql "$DATABASE_URL" -f "$down_file" > /dev/null 2>&1; then
    # Remove o registro da migration
    psql "$DATABASE_URL" -c "DELETE FROM schema_migrations WHERE version = '$VERSION';" > /dev/null 2>&1
    echo "✅ Rollback executado com sucesso!"
    echo "   Migration $VERSION foi removida do registro."
else
    echo "❌ Erro ao executar rollback. Verifique os logs."
    exit 1
fi

