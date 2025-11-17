#!/bin/bash

# Script para iniciar o servidor e testar os endpoints
# Uso: ./scripts/start_and_test.sh

cd "$(dirname "$0")/.."

PORT=${PORT:-8080}
BASE_URL="http://localhost:$PORT"

echo "Iniciando servidor na porta $PORT..."
echo ""

# Inicia o servidor em background
/usr/bin/go run cmd/server/main.go &
SERVER_PID=$!

# Aguarda o servidor iniciar
echo "Aguardando servidor iniciar..."
sleep 3

# Verifica se o servidor está rodando
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "Erro: Servidor não iniciou corretamente"
    exit 1
fi

echo "Servidor iniciado (PID: $SERVER_PID)"
echo ""

# Testa os endpoints
echo "Testando endpoints..."
echo ""

# Health check
echo "1. Health Check:"
curl -s "$BASE_URL/health" | jq '.' 2>/dev/null || curl -s "$BASE_URL/health"
echo ""
echo ""

# Skills
echo "2. Habilidades Técnicas:"
curl -s "$BASE_URL/api/portfolio/skills" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/portfolio/skills" | head -c 500
echo ""
echo ""

# Interpersonal Skills
echo "3. Habilidades Interpessoais:"
curl -s "$BASE_URL/api/portfolio/interpersonal-skills" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/portfolio/interpersonal-skills" | head -c 500
echo ""
echo ""

# Experiences
echo "4. Experiências Profissionais:"
curl -s "$BASE_URL/api/portfolio/experiences" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/portfolio/experiences" | head -c 500
echo ""
echo ""

# Projects
echo "5. Projetos:"
curl -s "$BASE_URL/api/portfolio/projects" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/portfolio/projects" | head -c 500
echo ""
echo ""

echo "Testes concluídos!"
echo ""
echo "Para parar o servidor, execute: kill $SERVER_PID"

