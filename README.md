# Portfólio Pessoal - Full Stack

Portfólio pessoal moderno e responsivo desenvolvido com tecnologias de ponta, apresentando experiências profissionais, projetos, habilidades técnicas e interpessoais, educação, certificações e informações de contato.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando o Projeto](#executando-o-projeto)
- [API Endpoints](#api-endpoints)
- [Internacionalização](#internacionalização)
- [Desenvolvimento](#desenvolvimento)
- [Build e Deploy](#build-e-deploy)
- [Scripts Úteis](#scripts-úteis)

## 🎯 Sobre o Projeto

Este é um portfólio pessoal completo desenvolvido com arquitetura moderna, separando frontend e backend. O projeto demonstra habilidades em desenvolvimento full stack, utilizando as melhores práticas de desenvolvimento web moderno.

### Características Principais

- ✨ **Interface Moderna**: Design responsivo e acessível com Material-UI
- 🌍 **Multi-idioma**: Suporte completo para Português (pt-BR), Inglês (en) e Espanhol (es)
- ⚡ **Performance**: Lazy loading de componentes, code splitting e otimizações de build
- 🎨 **Animações**: Transições suaves com Framer Motion
- 🔒 **Segurança**: Middlewares de segurança, CORS configurado e tratamento de erros robusto
- 📊 **Logging Estruturado**: Sistema de logs completo e organizado
- 🗄️ **Banco de Dados**: PostgreSQL com sistema de migrações versionado

## 🚀 Funcionalidades

### Seções do Portfólio

1. **Hero Section**: Apresentação inicial com call-to-actions
2. **Sobre Mim**: Informações pessoais e características profissionais
3. **Educação**: Histórico acadêmico e formações
4. **Experiências**: Trajetória profissional detalhada
5. **Habilidades Técnicas**: Tecnologias e ferramentas dominadas
6. **Habilidades Interpessoais**: Soft skills e competências comportamentais
7. **Certificações**: Cursos e certificações organizados por categorias e trilhas
8. **Projetos**: Portfólio de projetos desenvolvidos
9. **Contato**: Informações e meios de contato

### Recursos Técnicos

- Navegação suave entre seções
- Detecção automática de idioma do navegador
- Tema claro/escuro (preparado para implementação)
- Scroll to top automático
- Skeletons de loading para melhor UX
- Responsividade completa (mobile-first)
- Acessibilidade (a11y) com skip to content

## 🛠️ Stack Tecnológica

### Frontend

- **React 19.2** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Vite 7.2** (rolldown-vite) - Build tool e dev server ultra-rápido
- **Material-UI (MUI) 7.3** - Biblioteca de componentes React
- **Framer Motion 12.23** - Biblioteca de animações
- **React i18next 16.3** - Sistema de internacionalização
- **React Icons 5.5** - Ícones populares
- **ESLint 9.39** - Linter para qualidade de código

### Backend

- **Go 1.25** - Linguagem de programação
- **Echo Framework 4.12** - Framework web HTTP
- **PostgreSQL 18** - Banco de dados relacional
- **pgx/v5 5.5** - Driver PostgreSQL para Go
- **godotenv 1.5** - Gerenciamento de variáveis de ambiente

### DevOps e Ferramentas

- **Sistema de Migrações**: Scripts SQL versionados
- **Logging Estruturado**: Sistema de logs customizado
- **Scripts de Automação**: Shell scripts para migrations e testes

## 📁 Estrutura do Projeto

```
novo-portfolio/
├── backend/                    # Backend em Go
│   ├── cmd/
│   │   └── server/
│   │       └── main.go         # Ponto de entrada do servidor
│   ├── internal/
│   │   ├── config/             # Configurações e variáveis de ambiente
│   │   ├── database/           # Conexão e pool de conexões
│   │   ├── handlers/           # HTTP handlers (controllers)
│   │   ├── services/           # Lógica de negócio
│   │   ├── repositories/       # Camada de acesso a dados
│   │   ├── models/             # Modelos de dados
│   │   ├── middleware/         # Middlewares HTTP
│   │   └── logger/             # Sistema de logging
│   ├── migrations/             # Scripts de migração SQL
│   ├── scripts/                # Scripts utilitários
│   ├── go.mod                  # Dependências Go
│   └── README.md               # Documentação do backend
│
├── frontend/                   # Frontend em React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   └── skeletons/     # Componentes de loading
│   │   ├── contexts/           # Context API (Language, Theme)
│   │   ├── hooks/              # Custom hooks
│   │   ├── i18n/               # Configuração de i18n
│   │   │   └── locales/        # Arquivos de tradução
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── services/           # Serviços de API
│   │   ├── styles/             # Estilos e temas
│   │   ├── types/              # Definições TypeScript
│   │   └── utils/              # Funções utilitárias
│   ├── public/                 # Arquivos estáticos
│   ├── package.json            # Dependências Node.js
│   └── README.md               # Documentação do frontend
│
└── README.md                   # Este arquivo
```

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ e npm
- **Go** 1.25+
- **PostgreSQL** 18+ (ou acesso a um banco PostgreSQL)
- **Git**

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd novo-portfolio
```

### 2. Configuração do Backend

```bash
cd backend

# Instale as dependências
go mod download

# Crie um arquivo .env na pasta backend
# Exemplo:
DATABASE_URL=postgresql://usuario:senha@localhost:5432/portfolio_db
PORT=8080
ENV=development
```

### 3. Configuração do Banco de Dados

Execute as migrações do banco de dados:

```bash
# Usando o script automatizado (recomendado)
./scripts/run_migrations.sh

# Ou verifique o status das migrations
./scripts/list_migrations.sh
```

Para mais detalhes sobre migrations, consulte `backend/scripts/README.md`.

### 4. Configuração do Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Crie um arquivo .env (opcional)
# Exemplo:
VITE_API_BASE_URL=http://localhost:8080
```

## 🏃 Executando o Projeto

### Backend

```bash
cd backend
go run cmd/server/main.go
```

O servidor estará disponível em `http://localhost:8080`

### Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

> **Nota**: Certifique-se de que o backend está rodando antes de iniciar o frontend para evitar erros de conexão.

## 🔌 API Endpoints

### Health Check

- `GET /health` - Verifica o status da API

### Portfolio

- `GET /api/portfolio/skills` - Lista habilidades técnicas
- `GET /api/portfolio/interpersonal-skills` - Lista habilidades interpessoais
- `GET /api/portfolio/experiences` - Lista experiências profissionais
- `GET /api/portfolio/projects` - Lista projetos
- `GET /api/portfolio/about?language={lang}` - Informações sobre mim
- `GET /api/portfolio/educations?language={lang}` - Formações acadêmicas
- `GET /api/portfolio/certification-categories?language={lang}` - Categorias de certificações
- `GET /api/portfolio/certification-tracks?language={lang}` - Trilhas de certificações
- `GET /api/portfolio/contact` - Informações de contato
- `GET /api/portfolio/translations/{language}` - Traduções para um idioma específico

### Parâmetros de Idioma

Os endpoints que suportam tradução aceitam o parâmetro `language` com os valores:
- `pt-BR` (padrão)
- `en`
- `es`

## 🌍 Internacionalização

O projeto suporta três idiomas:

- **Português (pt-BR)** - Idioma padrão
- **Inglês (en)**
- **Espanhol (es)**

### Como Funciona

1. O frontend detecta automaticamente o idioma do navegador
2. O idioma é armazenado no `localStorage` para persistência
3. As traduções são carregadas dinamicamente do backend
4. O usuário pode alternar entre idiomas através da interface

### Adicionando Novos Idiomas

1. Adicione os arquivos de tradução em `frontend/src/i18n/locales/`
2. Configure o novo idioma em `frontend/src/i18n/config.ts`
3. Adicione as traduções no banco de dados através de migrations
4. Atualize o seletor de idioma no componente de navegação

## 💻 Desenvolvimento

### Backend

#### Formatação de Código

```bash
go fmt ./...
```

#### Linting

```bash
# Instalar golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Executar lint
golangci-lint run
```

#### Criar Nova Migration

```bash
# Crie os arquivos .up.sql e .down.sql na pasta migrations
# Siga a numeração sequencial (ex: 014_nome_da_migration.up.sql)
```

### Frontend

#### Type Checking

```bash
npm run typecheck
```

#### Linting

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

#### Estrutura de Componentes

Os componentes seguem a estrutura:
- Componentes principais em `src/components/`
- Skeletons de loading em `src/components/skeletons/`
- Hooks customizados em `src/hooks/`
- Tipos TypeScript em `src/types/`

## 🏗️ Build e Deploy

### Backend

```bash
cd backend
go build -o bin/server cmd/server/main.go
```

### Frontend

```bash
cd frontend
npm run build
```

O build otimizado será gerado na pasta `dist/` com:
- Code splitting por vendor
- Minificação de código
- Remoção de console.logs
- Otimização de assets

### Variáveis de Ambiente para Produção

**Backend:**
```env
DATABASE_URL=postgresql://...
PORT=8080
ENV=production
```

**Frontend:**
```env
VITE_API_BASE_URL=https://api.seudominio.com
```

## 📜 Scripts Úteis

### Backend

```bash
# Executar migrations
./scripts/run_migrations.sh

# Listar status das migrations
./scripts/list_migrations.sh

# Fazer rollback de uma migration
./scripts/rollback_migration.sh <version>

# Forçar execução de uma migration
./scripts/force_migration.sh <version>

# Testar endpoints da API
./scripts/test_endpoints.sh

# Iniciar servidor e testar
./scripts/start_and_test.sh
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar tipos
npm run typecheck

# Linting
npm run lint
npm run lint:fix
```

## 🎨 Personalização

### Cores e Tema

As cores das seções podem ser personalizadas em:
- `frontend/src/utils/sectionColors.ts`
- `frontend/src/styles/theme.ts`

### Conteúdo

O conteúdo é gerenciado através do banco de dados. Para atualizar:
1. Modifique diretamente no banco de dados, ou
2. Crie novas migrations SQL

### Traduções

As traduções são gerenciadas em:
- Frontend: `frontend/src/i18n/locales/`
- Backend: Tabela `translations` no banco de dados

## 🔒 Segurança

- CORS configurado (ajuste `AllowOrigins` em produção)
- Middleware de segurança (helmet-like)
- Tratamento de erros centralizado
- Validação de dados (preparado para implementação)
- Logging estruturado para auditoria

## 📝 Próximos Passos

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar cache (Redis ou in-memory)
- [ ] Adicionar validação de dados com `validator`
- [ ] Configurar CI/CD
- [ ] Implementar tema claro/escuro completo
- [ ] Adicionar analytics
- [ ] Otimizar SEO

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

## 👤 Autor

**Carlos André**

- Portfólio: [Seu portfólio online]
- LinkedIn: [Seu LinkedIn]
- Email: [Seu email]

---

Desenvolvido com ❤️ usando React, Go e PostgreSQL

