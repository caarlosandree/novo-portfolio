# Portfolio Backend

Backend da aplicação de portfólio desenvolvido em Go com Echo Framework e PostgreSQL.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Banco de Dados](#banco-de-dados)
- [Executando o Servidor](#executando-o-servidor)
- [API Endpoints](#api-endpoints)
- [Arquitetura](#arquitetura)
- [Logging](#logging)
- [Desenvolvimento](#desenvolvimento)
- [Build e Deploy](#build-e-deploy)
- [Scripts Úteis](#scripts-úteis)
- [Troubleshooting](#troubleshooting)

## 🎯 Sobre o Projeto

API REST desenvolvida em Go para fornecer dados do portfólio. O backend utiliza arquitetura em camadas (handlers, services, repositories) e suporta múltiplos idiomas através de traduções no banco de dados.

### Características

- 🚀 **Performance**: Go nativo com alta performance
- 🏗️ **Arquitetura Limpa**: Separação de responsabilidades
- 🌍 **Multi-idioma**: Suporte para pt-BR, en e es
- 📊 **Logging Estruturado**: Sistema de logs completo
- 🔒 **Segurança**: Middlewares de segurança e CORS
- 🗄️ **Migrations**: Sistema versionado de migrações SQL
- ⚡ **Graceful Shutdown**: Encerramento seguro do servidor

## 🛠️ Stack Tecnológica

### Core

- **Go 1.25** - Linguagem de programação
- **Echo Framework 4.12** - Framework web HTTP
- **PostgreSQL 18** - Banco de dados relacional

### Dependências Principais

- **pgx/v5 5.5** - Driver PostgreSQL para Go
- **godotenv 1.5** - Gerenciamento de variáveis de ambiente
- **labstack/gommon 0.4** - Utilitários do Echo

## 📁 Estrutura do Projeto

```
backend/
├── cmd/
│   └── server/
│       └── main.go              # Ponto de entrada da aplicação
│
├── internal/
│   ├── config/                  # Configurações
│   │   └── config.go            # Carregamento de variáveis de ambiente
│   │
│   ├── database/                # Conexão com banco de dados
│   │   └── database.go          # Pool de conexões PostgreSQL
│   │
│   ├── handlers/                # HTTP handlers (controllers)
│   │   ├── health_handler.go    # Health check endpoint
│   │   └── portfolio_handler.go # Handlers do portfólio
│   │
│   ├── services/               # Lógica de negócio
│   │   └── portfolio_service.go # Serviços do portfólio
│   │
│   ├── repositories/            # Camada de acesso a dados
│   │   └── portfolio_repository.go # Queries SQL
│   │
│   ├── models/                  # Modelos de dados
│   │   ├── about.go
│   │   ├── categoria_habilidade.go
│   │   ├── certification.go
│   │   ├── contact.go
│   │   ├── education.go
│   │   ├── experiencia.go
│   │   ├── projeto.go
│   │   └── translation.go
│   │
│   ├── middleware/              # Middlewares HTTP
│   │   ├── error_handler.go     # Tratamento centralizado de erros
│   │   ├── request_id.go        # Geração de Request ID
│   │   └── structured_logger.go # Logger estruturado
│   │
│   └── logger/                  # Sistema de logging
│       ├── logger.go            # Logger principal
│       └── pretty_handler.go    # Handler para desenvolvimento
│
├── migrations/                  # Scripts de migração SQL
│   ├── 000_create_migrations_table.up.sql
│   ├── 001_initial_schema.up.sql
│   ├── 002_insert_initial_data.up.sql
│   └── ...                      # Outras migrations
│
├── scripts/                     # Scripts utilitários
│   ├── run_migrations.sh        # Executar migrations
│   ├── list_migrations.sh       # Listar status das migrations
│   ├── rollback_migration.sh    # Fazer rollback
│   ├── force_migration.sh       # Forçar execução
│   ├── test_endpoints.sh        # Testar endpoints
│   ├── start_and_test.sh        # Iniciar e testar
│   └── README.md                # Documentação dos scripts
│
├── .env                         # Variáveis de ambiente (não versionado)
├── .gitignore                  # Arquivos ignorados pelo Git
├── go.mod                       # Dependências Go
├── go.sum                       # Checksums das dependências
├── TEST_ENDPOINTS.md            # Documentação de testes
└── README.md                    # Este arquivo
```

## 📦 Pré-requisitos

- **Go** 1.25 ou superior
- **PostgreSQL** 18 ou superior (ou acesso a um banco PostgreSQL)
- **Git** (para clonar o repositório)

## 🚀 Instalação

1. **Clone o repositório** (se ainda não fez):
```bash
git clone <url-do-repositorio>
cd novo-portfolio/backend
```

2. **Instale as dependências**:
```bash
go mod download
```

3. **Verifique a instalação**:
```bash
go version
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
# URL de conexão com o banco de dados PostgreSQL
DATABASE_URL=postgresql://usuario:senha@localhost:5432/portfolio_db

# Porta do servidor HTTP
PORT=8080

# Ambiente (development, production)
ENV=development
```

### Exemplo de DATABASE_URL

```env
# Formato: postgresql://[user]:[password]@[host]:[port]/[database]
DATABASE_URL=postgresql://postgres:senha123@localhost:5432/portfolio_db

# Para Supabase ou serviços cloud:
DATABASE_URL=postgresql://postgres.xxxxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

### Configuração para Produção

```env
DATABASE_URL=postgresql://...
PORT=8080
ENV=production
```

## 🗄️ Banco de Dados

### Executando Migrations

O projeto possui um sistema de migrations versionado. Existem três formas de executar:

#### Opção 1: Script Automatizado (Recomendado) ⭐

O script `run_migrations.sh` é inteligente e rastreia quais migrations já foram executadas:

```bash
cd backend
./scripts/run_migrations.sh
```

**Vantagens:**
- ✅ Rastreia migrations executadas automaticamente
- ✅ Executa apenas migrations pendentes
- ✅ Pode ser executado múltiplas vezes sem problemas
- ✅ Mantém histórico completo (backup)

**Ver status das migrations:**
```bash
./scripts/list_migrations.sh
```

**Fazer rollback (se necessário):**
```bash
./scripts/rollback_migration.sh <version>
```

**Forçar execução de uma migration:**
```bash
./scripts/force_migration.sh <version>
```

Para mais detalhes, consulte `scripts/README.md`.

#### Opção 2: Executar Manualmente no Supabase/PostgreSQL

1. Acesse o SQL Editor no Supabase (ou cliente PostgreSQL)
2. Execute os arquivos em ordem:
   - `migrations/000_create_migrations_table.up.sql`
   - `migrations/001_initial_schema.up.sql`
   - `migrations/002_insert_initial_data.up.sql`
   - `migrations/003_insert_experiences_and_projects.up.sql`
   - ... (demais migrations em ordem)

#### Opção 3: Usando golang-migrate

```bash
# Instalar golang-migrate
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Executar migrations
migrate -path ./migrations -database "$DATABASE_URL" up

# Fazer rollback
migrate -path ./migrations -database "$DATABASE_URL" down 1
```

### Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas principais:

- `habilidades` - Habilidades técnicas
- `categorias_habilidades` - Categorias de habilidades
- `habilidades_interpessoais` - Soft skills
- `experiencias` - Experiências profissionais
- `projetos` - Projetos desenvolvidos
- `educacoes` - Formações acadêmicas
- `certificacoes` - Certificações
- `categorias_certificacoes` - Categorias de certificações
- `trilhas_certificacoes` - Trilhas de certificações
- `about` - Informações sobre mim
- `contact` - Informações de contato
- `translations` - Traduções multi-idioma
- `migrations` - Controle de migrations executadas

## 🏃 Executando o Servidor

### Modo Desenvolvimento

```bash
go run cmd/server/main.go
```

O servidor estará disponível em `http://localhost:8080`

### Modo Produção

```bash
# Build
go build -o bin/server cmd/server/main.go

# Executar
./bin/server
```

### Com Graceful Shutdown

O servidor suporta graceful shutdown (Ctrl+C):
- Aguarda até 10 segundos para finalizar requisições em andamento
- Fecha conexões do banco de dados adequadamente
- Registra logs do processo de encerramento

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Resposta:
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX..."
}
```

### Portfolio Endpoints

#### Habilidades

```
GET /api/portfolio/skills
```

Retorna categorias de habilidades técnicas.

#### Habilidades Interpessoais

```
GET /api/portfolio/interpersonal-skills
```

Retorna categorias de habilidades interpessoais.

#### Experiências

```
GET /api/portfolio/experiences
```

Retorna experiências profissionais.

#### Projetos

```
GET /api/portfolio/projects
```

Retorna projetos desenvolvidos.

#### Sobre Mim

```
GET /api/portfolio/about?language={lang}
```

Parâmetros:
- `language` (opcional): `pt-BR`, `en`, `es` (padrão: `pt-BR`)

#### Formações

```
GET /api/portfolio/educations?language={lang}
```

Parâmetros:
- `language` (opcional): `pt-BR`, `en`, `es` (padrão: `pt-BR`)

#### Categorias de Certificações

```
GET /api/portfolio/certification-categories?language={lang}
```

#### Trilhas de Certificações

```
GET /api/portfolio/certification-tracks?language={lang}
```

#### Contato

```
GET /api/portfolio/contact
```

#### Traduções

```
GET /api/portfolio/translations/{language}
```

Parâmetros:
- `language`: `pt-BR`, `en`, `es`

### Exemplos de Resposta

#### GET /api/portfolio/skills
```json
[
  {
    "nome": "Front-end & Frameworks",
    "habilidades": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React"]
  }
]
```

#### GET /api/portfolio/experiences
```json
[
  {
    "cargo": "Desenvolvedor FullStack",
    "empresa": "DocSend",
    "localizacao": "Florianópolis",
    "periodo": "2025 – atual",
    "atividades": ["Atividade 1", "Atividade 2"]
  }
]
```

Para mais exemplos, consulte `TEST_ENDPOINTS.md`.

## 🏗️ Arquitetura

### Camadas

1. **Handlers** (`internal/handlers/`)
   - Recebem requisições HTTP
   - Validam entrada
   - Chamam services
   - Retornam respostas HTTP

2. **Services** (`internal/services/`)
   - Contêm lógica de negócio
   - Orquestram chamadas aos repositories
   - Aplicam regras de negócio

3. **Repositories** (`internal/repositories/`)
   - Acesso ao banco de dados
   - Queries SQL
   - Mapeamento de dados

4. **Models** (`internal/models/`)
   - Estruturas de dados
   - Tipos Go

### Middlewares

- **RequestIDMiddleware**: Gera ID único para cada requisição
- **StructuredLogger**: Logging estruturado de requisições
- **ErrorHandler**: Tratamento centralizado de erros
- **CORS**: Configuração de CORS
- **Recover**: Recuperação de panics
- **Secure**: Headers de segurança

### Fluxo de uma Requisição

```
Cliente → Echo → Middlewares → Handler → Service → Repository → Database
                                                              ↓
Cliente ← Echo ← Middlewares ← Handler ← Service ← Repository ← Database
```

## 📊 Logging

O projeto utiliza logging estruturado com diferentes formatos para desenvolvimento e produção.

### Desenvolvimento

No modo `development`, os logs são formatados de forma legível (pretty) com cores.

### Produção

No modo `production`, os logs são em formato JSON estruturado.

### Níveis de Log

- **Info**: Informações gerais
- **Error**: Erros que ocorrem
- **Debug**: Informações de debug (apenas desenvolvimento)

### Exemplo de Uso

```go
logger.Info("Servidor iniciado", "port", cfg.Port)
logger.Error("Erro ao conectar", "error", err)
```

## 💻 Desenvolvimento

### Formatação de Código

```bash
go fmt ./...
```

### Linting

```bash
# Instalar golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Executar lint
golangci-lint run

# Executar lint com correções automáticas
golangci-lint run --fix
```

### Testes

```bash
# Executar todos os testes
go test ./...

# Executar testes com coverage
go test -cover ./...

# Executar testes verbosos
go test -v ./...
```

### Adicionando Novos Endpoints

1. **Crie o handler** em `internal/handlers/`
2. **Crie o service** em `internal/services/` (se necessário)
3. **Crie o repository** em `internal/repositories/` (se necessário)
4. **Adicione a rota** em `cmd/server/main.go` na função `setupRoutes`

### Adicionando Novos Models

1. Crie o arquivo em `internal/models/`
2. Defina a struct com tags JSON apropriadas
3. Use nos repositories e handlers

## 🏗️ Build e Deploy

### Build Local

```bash
go build -o bin/server cmd/server/main.go
```

### Build para Linux

```bash
GOOS=linux GOARCH=amd64 go build -o bin/server-linux cmd/server/main.go
```

### Build para Windows

```bash
GOOS=windows GOARCH=amd64 go build -o bin/server.exe cmd/server/main.go
```

### Docker (Exemplo)

```dockerfile
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/server .
CMD ["./server"]
```

### Variáveis de Ambiente em Produção

Certifique-se de configurar:
- `DATABASE_URL`: URL de conexão com o banco
- `PORT`: Porta do servidor (padrão: 8080)
- `ENV`: Ambiente (deve ser `production`)

## 📜 Scripts Úteis

Todos os scripts estão em `scripts/`:

| Script | Descrição |
|--------|-----------|
| `run_migrations.sh` | Executa migrations pendentes |
| `list_migrations.sh` | Lista status das migrations |
| `rollback_migration.sh <version>` | Faz rollback de uma migration |
| `force_migration.sh <version>` | Força execução de uma migration |
| `test_endpoints.sh` | Testa todos os endpoints |
| `start_and_test.sh` | Inicia servidor e testa endpoints |

Para mais detalhes, consulte `scripts/README.md`.

## 🐛 Troubleshooting

### Erro: "DATABASE_URL não configurada"

**Causa**: Variável de ambiente não encontrada

**Solução**: Verifique se o arquivo `.env` existe e contém `DATABASE_URL`

### Erro: "connection refused"

**Causa**: Banco de dados não está acessível

**Solução**:
1. Verifique se o PostgreSQL está rodando
2. Verifique a URL de conexão no `.env`
3. Verifique firewall/rede

### Erro: "relation does not exist"

**Causa**: Migrations não foram executadas

**Solução**: Execute as migrations usando `./scripts/run_migrations.sh`

### Erro: "port already in use"

**Causa**: Porta 8080 já está em uso

**Solução**: Altere a porta no `.env` ou encerre o processo que está usando a porta

### Logs não aparecem

**Causa**: Configuração de logging incorreta

**Solução**: Verifique a variável `ENV` no `.env` (deve ser `development` ou `production`)

## 🔄 Próximos Passos

- [ ] Adicionar validação de dados com `validator`
- [ ] Implementar cache (Redis ou in-memory)
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar rate limiting
- [ ] Implementar autenticação (se necessário)
- [ ] Configurar CI/CD
- [ ] Adicionar métricas (Prometheus)
- [ ] Implementar health checks mais detalhados

## 📚 Recursos Adicionais

- [Documentação do Go](https://go.dev/doc)
- [Documentação do Echo](https://echo.labstack.com)
- [Documentação do pgx](https://github.com/jackc/pgx)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs)

---

Desenvolvido com ❤️ usando Go, Echo e PostgreSQL
