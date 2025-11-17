#!/bin/bash

# Script para listar o status das migrations
# Uso: ./scripts/list_migrations.sh

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

echo "📋 Status das Migrations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verifica se a tabela existe
table_exists=$(psql "$DATABASE_URL" -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'schema_migrations');" 2>/dev/null | xargs)

if [ "$table_exists" != "t" ]; then
    echo "⚠️  Tabela de controle de migrations não existe ainda."
    echo "   Execute o script run_migrations.sh pela primeira vez."
    exit 0
fi

# Lista migrations executadas
echo "✅ Migrations Executadas:"
psql "$DATABASE_URL" -c "SELECT version, executed_at, description FROM schema_migrations ORDER BY executed_at;" 2>/dev/null || echo "   Nenhuma migration executada ainda."

echo ""
echo "📁 Migrations Disponíveis:"

# Lista todos os arquivos de migration
for migration in migrations/*.up.sql; do
    if [ -f "$migration" ]; then
        migration_name=$(basename "$migration" .up.sql)
        migration_version=$(echo "$migration_name" | cut -d'_' -f1)
        
        # Verifica se foi executada
        executed=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM schema_migrations WHERE version = '$migration_name';" 2>/dev/null | xargs)
        
        if [ "$executed" = "1" ]; then
            status="✅ Executada"
        else
            status="⏳ Pendente"
        fi
        
        echo "   [$migration_version] $migration_name - $status"
    fi
done

