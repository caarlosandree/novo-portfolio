# Integração Frontend-Backend

Este documento descreve como o frontend está integrado com o backend.

## Estrutura da Integração

### 1. Serviço de API (`src/services/api.ts`)

Cliente HTTP para consumir os endpoints do backend:

- `getSkills()` - Busca habilidades técnicas
- `getInterpersonalSkills()` - Busca habilidades interpessoais
- `getExperiences()` - Busca experiências profissionais
- `getProjects()` - Busca projetos
- `healthCheck()` - Verifica se a API está disponível

### 2. Hook `usePortfolioData` (`src/hooks/usePortfolioData.ts`)

Hook customizado que:
- Busca dados da API automaticamente
- Usa dados hardcoded como fallback em caso de erro
- Gerencia estados de loading e erro
- Retorna dados formatados para os componentes

### 3. Configuração

#### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_BASE_URL=http://localhost:8080
```

**Importante**: No Vite, variáveis de ambiente devem começar com `VITE_` para serem expostas ao código.

#### Em Produção

Configure a URL da API de produção:

```env
VITE_API_BASE_URL=https://api.seudominio.com
```

## Como Funciona

1. **Ao carregar a página**: O hook `usePortfolioData` tenta buscar dados da API
2. **Se a API estiver disponível**: Usa os dados do backend
3. **Se houver erro**: Usa automaticamente os dados hardcoded de `portfolioData.ts`
4. **Feedback visual**: Mostra um alerta quando está usando dados locais (fallback)

## Endpoints Consumidos

- `GET /api/portfolio/skills` - Habilidades técnicas
- `GET /api/portfolio/interpersonal-skills` - Habilidades interpessoais
- `GET /api/portfolio/experiences` - Experiências profissionais
- `GET /api/portfolio/projects` - Projetos
- `GET /health` - Health check

## Tratamento de Erros

- **Erro de conexão**: Usa dados locais automaticamente
- **API indisponível**: Usa dados locais e mostra alerta
- **Erro de rede**: Usa dados locais e mostra alerta

## Desenvolvimento

### Iniciar Backend

```bash
cd backend
go run cmd/server/main.go
```

### Iniciar Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (ou outra porta do Vite).

### Testar Integração

1. Com backend rodando: Os dados virão da API
2. Sem backend: Os dados virão do fallback (hardcoded)
3. Verifique o console do navegador para logs de erro

## Troubleshooting

### Erro: "API não está disponível"

**Causa**: Backend não está rodando ou URL incorreta

**Solução**:
1. Verifique se o backend está rodando na porta 8080
2. Verifique a variável `VITE_API_BASE_URL` no `.env`
3. Verifique CORS no backend (deve permitir requisições do frontend)

### Erro: CORS

**Causa**: Backend não está permitindo requisições do frontend

**Solução**: Configure CORS no backend para permitir a origem do frontend:

```go
e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
    AllowOrigins: []string{"http://localhost:5173"}, // URL do frontend
    AllowMethods: []string{http.MethodGet},
    AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType},
}))
```

### Dados não aparecem

**Causa**: API retornando dados vazios ou erro

**Solução**:
1. Verifique se as migrations foram executadas no banco
2. Teste os endpoints diretamente: `curl http://localhost:8080/api/portfolio/skills`
3. Verifique o console do navegador para erros

## Vantagens da Abordagem

✅ **Resiliente**: Funciona mesmo se a API estiver offline  
✅ **Transparente**: Usuário não percebe se está usando API ou dados locais  
✅ **Desenvolvimento**: Pode desenvolver frontend sem backend  
✅ **Produção**: Usa dados dinâmicos do banco de dados  
✅ **Fallback**: Sempre tem dados para exibir  

