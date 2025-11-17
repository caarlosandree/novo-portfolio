#!/bin/bash

# Script inteligente para executar migrations no banco de dados
# Rastreia quais migrations já foram executadas e executa apenas as novas
# Uso: ./scripts/run_migrations.sh

set -e  # Para na primeira erro

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
    echo "❌ Erro: psql não está instalado. Instale o PostgreSQL client."
    exit 1
fi

# Função para verificar se uma migration já foi executada
migration_executed() {
    local version=$1
    local result=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM schema_migrations WHERE version = '$version';" 2>/dev/null | xargs)
    [ "$result" = "1" ]
}

# Função para registrar uma migration como executada
record_migration() {
    local version=$1
    local description=$2
    psql "$DATABASE_URL" -c "INSERT INTO schema_migrations (version, description) VALUES ('$version', '$description') ON CONFLICT (version) DO NOTHING;" > /dev/null 2>&1
}

# Função para criar a tabela de migrations se não existir
ensure_migrations_table() {
    local migration_table_sql="
        CREATE TABLE IF NOT EXISTS schema_migrations (
            version VARCHAR(255) PRIMARY KEY,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            description TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_schema_migrations_executed_at ON schema_migrations(executed_at);
    "
    psql "$DATABASE_URL" -c "$migration_table_sql" > /dev/null 2>&1
}

echo "🔍 Verificando tabela de controle de migrations..."
ensure_migrations_table

echo "📦 Verificando migrations pendentes..."
echo ""

# Contadores
executed_count=0
skipped_count=0
total_count=0

# Executa migrations em ordem (ordenado numericamente)
for migration in migrations/*.up.sql; do
    if [ ! -f "$migration" ]; then
        continue
    fi
    
    total_count=$((total_count + 1))
    
    # Extrai o nome da migration (ex: 001_initial_schema.up.sql -> 001_initial_schema)
    migration_name=$(basename "$migration" .up.sql)
    migration_version=$(echo "$migration_name" | cut -d'_' -f1)
    
    # Verifica se já foi executada
    if migration_executed "$migration_name"; then
        echo "⏭️  [$migration_version] $migration_name - Já executada (pulando)"
        skipped_count=$((skipped_count + 1))
        continue
    fi
    
    echo "▶️  [$migration_version] Executando: $migration_name"
    
    # Executa a migration
    if psql "$DATABASE_URL" -f "$migration" > /dev/null 2>&1; then
        # Registra como executada
        record_migration "$migration_name" "Migration executada via script"
        echo "✅ [$migration_version] $migration_name - Executada com sucesso"
        executed_count=$((executed_count + 1))
    else
        echo "❌ [$migration_version] Erro ao executar: $migration_name"
        echo "   Verifique os logs acima para mais detalhes"
        exit 1
    fi
    
    echo ""
done

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Resumo:"
echo "   Total de migrations: $total_count"
echo "   ✅ Executadas: $executed_count"
echo "   ⏭️  Puladas (já executadas): $skipped_count"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $executed_count -gt 0 ]; then
    echo ""
    echo "🎉 Migrations executadas com sucesso!"
elif [ $skipped_count -eq $total_count ] && [ $total_count -gt 0 ]; then
    echo ""
    echo "ℹ️  Todas as migrations já foram executadas anteriormente."
fi
