#!/bin/bash

# Script de deploy para Google Cloud Run
# Uso: ./deploy.sh [PROJECT_ID] [SERVICE_NAME] [REGION]

set -e

# Adicionar gcloud ao PATH se não estiver disponível
if ! command -v gcloud &> /dev/null; then
    if [ -f ~/google-cloud-sdk/bin/gcloud ]; then
        export PATH="$HOME/google-cloud-sdk/bin:$PATH"
    fi
fi

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações padrão
PROJECT_ID="${1:-$(gcloud config get-value project 2>/dev/null)}"
SERVICE_NAME="${2:-portfolio-backend}"
REGION="${3:-southamerica-east1}"  # São Paulo
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Validações
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Erro: PROJECT_ID não especificado e não encontrado no gcloud config${NC}"
    echo "Uso: ./deploy.sh [PROJECT_ID] [SERVICE_NAME] [REGION]"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}Aviso: DATABASE_URL não está definida. Certifique-se de configurá-la no Cloud Run após o deploy.${NC}"
fi

echo -e "${GREEN}=== Deploy para Cloud Run ===${NC}"
echo "Project ID: $PROJECT_ID"
echo "Service Name: $SERVICE_NAME"
echo "Region: $REGION"
echo "Image: $IMAGE_NAME"
echo ""

# Verificar se gcloud está autenticado
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}Erro: Nenhuma conta ativa no gcloud. Execute 'gcloud auth login'${NC}"
    exit 1
fi

# Definir projeto
echo -e "${YELLOW}Definindo projeto...${NC}"
gcloud config set project "$PROJECT_ID"

# Habilitar APIs necessárias
echo -e "${YELLOW}Habilitando APIs necessárias...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Obter diretório do script (garantir que estamos no diretório backend)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Verificar se estamos no diretório correto
if [ ! -f "Dockerfile" ] || [ ! -d "cmd/server" ]; then
    echo -e "${RED}Erro: Dockerfile ou cmd/server não encontrado no diretório atual${NC}"
    echo "Diretório atual: $(pwd)"
    exit 1
fi

# Verificar se cloudbuild.yaml existe
if [ ! -f "cloudbuild.yaml" ]; then
    echo -e "${RED}Erro: cloudbuild.yaml não encontrado${NC}"
    exit 1
fi

# Build e Deploy usando cloudbuild.yaml
echo -e "${YELLOW}Construindo e fazendo deploy usando cloudbuild.yaml...${NC}"
echo -e "${YELLOW}Diretório de build: $(pwd)${NC}"
echo -e "${YELLOW}Verificando arquivos necessários...${NC}"
ls -la cmd/server/main.go || echo -e "${RED}ERRO: cmd/server/main.go não encontrado!${NC}"

# Executar build com cloudbuild.yaml
gcloud builds submit \
    --config cloudbuild.yaml \
    --substitutions _SERVICE_NAME="$SERVICE_NAME,_REGION=$REGION" \
    --project "$PROJECT_ID"

# Obter URL do serviço
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
    --platform managed \
    --region "$REGION" \
    --format 'value(status.url)' \
    --project "$PROJECT_ID")

echo ""
echo -e "${GREEN}=== Deploy concluído com sucesso! ===${NC}"
echo -e "${GREEN}URL do serviço: $SERVICE_URL${NC}"
echo ""
echo -e "${YELLOW}Nota: DATABASE_URL deve estar configurada como secret no Cloud Run${NC}"
echo "Se ainda não configurou, execute:"
echo "  ./setup-secret.sh $PROJECT_ID"
echo ""
echo "2. Teste o health check:"
echo "   curl $SERVICE_URL/health"
echo ""

