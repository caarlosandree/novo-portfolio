# Teste dos Endpoints da API

## Pré-requisitos

1. Certifique-se de que as migrations foram executadas no Supabase
2. O arquivo `.env` está configurado com a `DATABASE_URL`
3. O servidor está rodando

## Iniciar o Servidor

```bash
cd backend
go run cmd/server/main.go
```

O servidor estará disponível em `http://localhost:8080` (ou na porta configurada no `.env`)

## Testar os Endpoints

### 1. Health Check
```bash
curl http://localhost:8080/health
```

Resposta esperada:
```json
{"status":"ok"}
```

### 2. Habilidades Técnicas
```bash
curl http://localhost:8080/api/portfolio/skills
```

Resposta esperada:
```json
[
  {
    "nome": "Front-end & Frameworks",
    "habilidades": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React"]
  }
]
```

### 3. Habilidades Interpessoais
```bash
curl http://localhost:8080/api/portfolio/interpersonal-skills
```

### 4. Experiências Profissionais
```bash
curl http://localhost:8080/api/portfolio/experiences
```

### 5. Projetos
```bash
curl http://localhost:8080/api/portfolio/projects
```

## Teste com jq (formatação JSON)

Se você tiver `jq` instalado, pode formatar as respostas:

```bash
curl -s http://localhost:8080/api/portfolio/skills | jq '.'
```

## Teste com HTTPie

Se você tiver `httpie` instalado:

```bash
http GET http://localhost:8080/api/portfolio/skills
```

## Verificar Status HTTP

Para ver apenas o status HTTP:

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:8080/api/portfolio/skills
```

Resposta esperada: `200`

## Troubleshooting

### Erro de conexão com banco
- Verifique se a `DATABASE_URL` no `.env` está correta
- Verifique se o Supabase está acessível
- Verifique se as migrations foram executadas

### Erro 500 (Internal Server Error)
- Verifique os logs do servidor
- Verifique se as tabelas existem no banco de dados
- Verifique se há dados nas tabelas

### Erro 404 (Not Found)
- Verifique se o servidor está rodando
- Verifique se a porta está correta
- Verifique a URL do endpoint

