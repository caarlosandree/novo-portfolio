# Scripts de Migrations

Scripts inteligentes para gerenciar migrations do banco de dados com rastreamento automático.

## Características

✅ **Rastreamento Automático**: Mantém registro de quais migrations já foram executadas  
✅ **Idempotente**: Pode ser executado múltiplas vezes sem problemas  
✅ **Seguro**: Verifica se migrations já foram executadas antes de rodar  
✅ **Backup**: Mantém todas as migrations como histórico/backup  

## Scripts Disponíveis

### 1. `run_migrations.sh` - Executar Migrations

Executa apenas as migrations pendentes (que ainda não foram executadas).

```bash
cd backend
./scripts/run_migrations.sh
```

**O que faz:**
- Cria a tabela `schema_migrations` se não existir
- Verifica quais migrations já foram executadas
- Executa apenas as migrations pendentes
- Registra cada migration executada no banco

**Exemplo de saída:**
```
🔍 Verificando tabela de controle de migrations...
📦 Verificando migrations pendentes...

⏭️  [000] 000_create_migrations_table - Já executada (pulando)
⏭️  [001] 001_initial_schema - Já executada (pulando)
▶️  [002] Executando: 002_insert_initial_data
✅ [002] 002_insert_initial_data - Executada com sucesso

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Resumo:
   Total de migrations: 3
   ✅ Executadas: 1
   ⏭️  Puladas (já executadas): 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. `list_migrations.sh` - Listar Status

Lista todas as migrations e seu status (executada ou pendente).

```bash
./scripts/list_migrations.sh
```

**Exemplo de saída:**
```
📋 Status das Migrations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Migrations Executadas:
 version              | executed_at          | description
----------------------+----------------------+------------------
 000_create_migrations | 2025-01-15 10:30:00 | Migration executada via script
 001_initial_schema    | 2025-01-15 10:30:01 | Migration executada via script

📁 Migrations Disponíveis:
   [000] 000_create_migrations_table - ✅ Executada
   [001] 001_initial_schema - ✅ Executada
   [002] 002_insert_initial_data - ⏳ Pendente
   [003] 003_insert_experiences_and_projects - ⏳ Pendente
```

### 3. `rollback_migration.sh` - Fazer Rollback

Faz rollback de uma migration específica (executa o arquivo `.down.sql`).

```bash
./scripts/rollback_migration.sh <version>
```

**Exemplo:**
```bash
./scripts/rollback_migration.sh 003_insert_experiences_and_projects
```

**⚠️ ATENÇÃO**: Este script pede confirmação antes de executar o rollback.

## Como Funciona

### Tabela de Controle

O sistema cria uma tabela `schema_migrations` no banco de dados para rastrear:

```sql
CREATE TABLE schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);
```

### Nomenclatura de Migrations

As migrations devem seguir o padrão:
```
<numero>_<nome_descritivo>.up.sql
<numero>_<nome_descritivo>.down.sql
```

Exemplos:
- `000_create_migrations_table.up.sql`
- `001_initial_schema.up.sql`
- `002_insert_initial_data.up.sql`

### Ordem de Execução

As migrations são executadas em ordem numérica (000, 001, 002, ...).

## Vantagens

1. **Backup**: Todas as migrations ficam como histórico
2. **Segurança**: Não executa migrations já aplicadas
3. **Rastreabilidade**: Sabe exatamente quando cada migration foi executada
4. **Flexibilidade**: Pode fazer rollback de migrations específicas
5. **Idempotência**: Pode executar o script múltiplas vezes sem problemas

## Exemplo de Uso Completo

```bash
# 1. Ver status atual
./scripts/list_migrations.sh

# 2. Executar migrations pendentes
./scripts/run_migrations.sh

# 3. Verificar novamente
./scripts/list_migrations.sh

# 4. Se necessário, fazer rollback
./scripts/rollback_migration.sh 003_insert_experiences_and_projects
```

## Troubleshooting

### Erro: "DATABASE_URL não está definida"
- Certifique-se de que o arquivo `.env` existe e contém `DATABASE_URL`

### Erro: "psql não está instalado"
- Instale o PostgreSQL client: `sudo apt-get install postgresql-client` (Linux)

### Migration não aparece como executada
- Verifique se a tabela `schema_migrations` existe
- Execute `run_migrations.sh` novamente (ele criará a tabela se necessário)

### Quer reexecutar uma migration já executada
- Use `rollback_migration.sh` para fazer rollback primeiro
- Depois execute `run_migrations.sh` novamente

## Notas Importantes

- ⚠️ As migrations devem ser **idempotentes** (usar `IF NOT EXISTS`, `WHERE NOT EXISTS`, etc.)
- ⚠️ Nunca modifique migrations já executadas em produção
- ⚠️ Sempre teste migrations em ambiente de desenvolvimento primeiro
- ✅ Mantenha as migrations como backup/histórico
- ✅ Use rollback apenas quando necessário

