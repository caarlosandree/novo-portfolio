#!/bin/bash

# Script para testar os endpoints da API
# Uso: ./scripts/test_endpoints.sh [base_url]

BASE_URL=${1:-http://localhost:8080}

echo "Testando endpoints em: $BASE_URL"
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    
    echo -e "${YELLOW}Testando: $description${NC}"
    echo "  $method $endpoint"
    
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ Status: $http_code${NC}"
        echo "  Resposta (primeiras 200 chars):"
        echo "$body" | head -c 200
        echo ""
    else
        echo -e "${RED}✗ Status: $http_code${NC}"
        echo "  Erro: $body"
    fi
    echo ""
}

# Testa cada endpoint
test_endpoint "GET" "/health" "Health Check"
test_endpoint "GET" "/api/portfolio/skills" "Habilidades Técnicas"
test_endpoint "GET" "/api/portfolio/interpersonal-skills" "Habilidades Interpessoais"
test_endpoint "GET" "/api/portfolio/experiences" "Experiências Profissionais"
test_endpoint "GET" "/api/portfolio/projects" "Projetos"

echo "Testes concluídos!"

