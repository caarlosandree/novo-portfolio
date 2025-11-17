#!/bin/bash

# Script para configurar o secret DATABASE_URL no Google Cloud
# Uso: ./setup-secret.sh [PROJECT_ID] [DATABASE_URL]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ID="${1:-$(gcloud config get-value project 2>/dev/null)}"
DATABASE_URL="${2:-postgresql://postgres:THa03QRfHCayEySE@db.lvryabfbpcqramyruykk.supabase.co:5432/postgres}"
SECRET_NAME="DATABASE_URL"
SERVICE_NAME="${3:-portfolio-backend}"
REGION="${4:-southamerica-east1}"

# Validações
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Erro: PROJECT_ID não especificado e não encontrado no gcloud config${NC}"
    echo "Uso: ./setup-secret.sh [PROJECT_ID] [DATABASE_URL] [SERVICE_NAME] [REGION]"
    exit 1
fi

echo -e "${GREEN}=== Configurando Secret DATABASE_URL ===${NC}"
echo "Project ID: $PROJECT_ID"
echo "Secret Name: $SECRET_NAME"
echo "Service Name: $SERVICE_NAME"
echo "Region: $REGION"
echo ""

# Definir projeto
gcloud config set project "$PROJECT_ID"

# Habilitar Secret Manager API
echo -e "${YELLOW}Habilitando Secret Manager API...${NC}"
gcloud services enable secretmanager.googleapis.com

# Criar ou atualizar o secret
echo -e "${YELLOW}Criando/atualizando secret...${NC}"
if gcloud secrets describe "$SECRET_NAME" --project "$PROJECT_ID" &>/dev/null; then
    echo -e "${YELLOW}Secret já existe. Atualizando...${NC}"
    echo -n "$DATABASE_URL" | gcloud secrets versions add "$SECRET_NAME" \
        --data-file=- \
        --project "$PROJECT_ID"
else
    echo -e "${YELLOW}Criando novo secret...${NC}"
    echo -n "$DATABASE_URL" | gcloud secrets create "$SECRET_NAME" \
        --data-file=- \
        --replication-policy="automatic" \
        --project "$PROJECT_ID"
fi

# Dar permissão ao Cloud Run para acessar o secret
echo -e "${YELLOW}Configurando permissões do Cloud Run...${NC}"

# Obter o service account do Cloud Run
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

# Adicionar permissão
gcloud secrets add-iam-policy-binding "$SECRET_NAME" \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor" \
    --project "$PROJECT_ID" \
    &>/dev/null || echo -e "${YELLOW}Permissão já configurada ou erro ao configurar (pode ser normal)${NC}"

# Atualizar o serviço Cloud Run para usar o secret
echo -e "${YELLOW}Atualizando serviço Cloud Run para usar o secret...${NC}"
gcloud run services update "$SERVICE_NAME" \
    --update-secrets "${SECRET_NAME}=${SECRET_NAME}:latest" \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    || echo -e "${YELLOW}Serviço ainda não existe. O secret será configurado no próximo deploy.${NC}"

echo ""
echo -e "${GREEN}=== Secret configurado com sucesso! ===${NC}"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "1. O secret DATABASE_URL foi criado/atualizado"
echo "2. O Cloud Run será atualizado no próximo deploy para usar o secret"
echo "3. Execute o deploy: ./deploy.sh $PROJECT_ID"
echo ""

