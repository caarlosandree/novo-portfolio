#!/bin/bash

# Script para obter informações necessárias para configurar secrets do GitHub Actions
# Uso: ./get-github-secrets.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Obter Informações para GitHub Actions Secrets ===${NC}"
echo ""

# Verificar se gcloud está instalado e autenticado
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Erro: gcloud CLI não está instalado${NC}"
    echo "Instale em: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar autenticação
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}Aviso: Nenhuma conta ativa no gcloud${NC}"
    echo "Execute: gcloud auth login"
    exit 1
fi

# Obter PROJECT_ID atual
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Erro: Nenhum projeto configurado${NC}"
    echo "Execute: gcloud config set project SEU_PROJECT_ID"
    exit 1
fi

echo -e "${GREEN}✅ Project ID encontrado: ${PROJECT_ID}${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}1. GCP_PROJECT_ID${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Valor para o secret GCP_PROJECT_ID:${NC}"
echo -e "${BLUE}${PROJECT_ID}${NC}"
echo ""

# Nome da Service Account para GitHub Actions
SA_NAME="github-actions-deploy"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
KEY_FILE="github-actions-key.json"

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}2. Criando/Verificando Service Account${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Verificar se a Service Account já existe
if gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" &>/dev/null; then
    echo -e "${GREEN}✅ Service Account já existe: ${SA_EMAIL}${NC}"
else
    echo -e "${YELLOW}Criando Service Account...${NC}"
    gcloud iam service-accounts create "$SA_NAME" \
        --display-name="GitHub Actions Deploy Service Account" \
        --description="Service Account para deploy automático via GitHub Actions" \
        --project="$PROJECT_ID"
    echo -e "${GREEN}✅ Service Account criada: ${SA_EMAIL}${NC}"
fi

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}3. Configurando Permissões${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Roles necessárias
ROLES=(
    "roles/cloudbuild.builds.editor"
    "roles/run.admin"
    "roles/iam.serviceAccountUser"
    "roles/storage.admin"
    "roles/artifactregistry.writer"
)

echo "Atribuindo roles à Service Account..."
for ROLE in "${ROLES[@]}"; do
    if gcloud projects add-iam-policy-binding "$PROJECT_ID" \
        --member="serviceAccount:${SA_EMAIL}" \
        --role="$ROLE" \
        --condition=None &>/dev/null; then
        echo -e "${GREEN}✅ Role ${ROLE} atribuída${NC}"
    else
        echo -e "${YELLOW}⚠️  Role ${ROLE} já atribuída ou erro ao atribuir${NC}"
    fi
done

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}4. Criando Chave JSON${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Criar nova chave
if [ -f "$KEY_FILE" ]; then
    echo -e "${YELLOW}Arquivo ${KEY_FILE} já existe. Deseja sobrescrever? (s/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Ss]$ ]]; then
        echo -e "${YELLOW}Mantendo arquivo existente.${NC}"
        exit 0
    fi
    rm -f "$KEY_FILE"
fi

echo "Criando nova chave JSON..."
gcloud iam service-accounts keys create "$KEY_FILE" \
    --iam-account="$SA_EMAIL" \
    --project="$PROJECT_ID"

echo -e "${GREEN}✅ Chave criada: ${KEY_FILE}${NC}"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}5. Informações para GitHub Secrets${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}📋 Copie os valores abaixo e adicione como secrets no GitHub:${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Secret: GCP_PROJECT_ID${NC}"
echo -e "${GREEN}${PROJECT_ID}${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Secret: GCP_SA_KEY${NC}"
echo -e "${GREEN}(Conteúdo completo do arquivo ${KEY_FILE})${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Mostrar conteúdo da chave
echo -e "${YELLOW}Conteúdo do arquivo ${KEY_FILE}:${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
cat "$KEY_FILE"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}✅ Tudo pronto!${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Acesse: https://github.com/SEU_USUARIO/SEU_REPO/settings/secrets/actions"
echo "2. Clique em 'New repository secret'"
echo "3. Adicione GCP_PROJECT_ID com o valor: ${PROJECT_ID}"
echo "4. Adicione GCP_SA_KEY com o conteúdo completo do arquivo ${KEY_FILE}"
echo ""
echo -e "${RED}⚠️  IMPORTANTE: Mantenha o arquivo ${KEY_FILE} seguro e não o commite no Git!${NC}"
echo -e "${YELLOW}O arquivo já deve estar no .gitignore${NC}"

