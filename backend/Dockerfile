# Build stage
FROM golang:1.25-alpine AS builder

# Instalar dependências do sistema necessárias para compilar
RUN apk add --no-cache git ca-certificates tzdata

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY go.mod go.sum ./

# Baixar dependências
RUN go mod download

# Copiar código fonte
COPY . .

# Debug: verificar estrutura copiada
RUN echo "=== Verificando estrutura ===" && \
    ls -la /app && \
    echo "=== Verificando cmd ===" && \
    ls -la /app/cmd 2>/dev/null || (echo "ERRO: cmd/ não encontrado!" && exit 1) && \
    echo "=== Verificando cmd/server ===" && \
    ls -la /app/cmd/server 2>/dev/null || (echo "ERRO: cmd/server/ não encontrado!" && exit 1) && \
    echo "=== Verificando main.go ===" && \
    ls -la /app/cmd/server/main.go 2>/dev/null || (echo "ERRO: cmd/server/main.go não encontrado!" && exit 1) && \
    echo "=== Verificando internal ===" && \
    ls -la /app/internal 2>/dev/null || (echo "ERRO: internal/ não encontrado!" && exit 1)

# Compilar a aplicação
# CGO_ENABLED=0 para criar um binário estático
# GOOS=linux para Linux (Cloud Run usa Linux)
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server ./cmd/server/main.go

# Runtime stage - imagem mínima
FROM alpine:latest

# Instalar ca-certificates para HTTPS e tzdata para timezone
RUN apk --no-cache add ca-certificates tzdata

# Criar usuário não-root para segurança
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser

WORKDIR /app

# Copiar binário do stage de build
COPY --from=builder /app/server .

# Copiar migrations (se necessário rodar no container)
COPY --from=builder /app/migrations ./migrations

# Mudar ownership para usuário não-root
RUN chown -R appuser:appuser /app

# Mudar para usuário não-root
USER appuser

# Expor porta (Cloud Run usa PORT do ambiente, mas definimos 8080 como padrão)
EXPOSE 8080

# Health check (usando wget que precisa ser instalado ou removido)
# Cloud Run tem health check próprio, então podemos remover este
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-8080}/health || exit 1

# Comando para executar a aplicação
CMD ["./server"]

