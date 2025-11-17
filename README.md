# Portfólio Pessoal - Full Stack

Portfólio pessoal moderno e responsivo desenvolvido com tecnologias de ponta, apresentando experiências profissionais, projetos, habilidades técnicas e interpessoais, educação, certificações e informações de contato.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
  - [Seções do Portfólio](#seções-do-portfólio)
  - [Recursos Técnicos](#recursos-técnicos)
  - [Painel de Administração](#painel-de-administração)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando o Projeto](#executando-o-projeto)
- [API Endpoints](#api-endpoints)
- [Documentação Swagger](#documentação-swagger)
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
- 📚 **Documentação Swagger**: API completamente documentada com Swagger/OpenAPI

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

### Painel de Administração

O sistema inclui um painel administrativo completo com autenticação JWT para gerenciar o conteúdo do portfólio:

#### 🔐 Autenticação
- Sistema de login seguro com JWT tokens
- Middleware de autenticação para rotas protegidas
- Gerenciamento de sessão com armazenamento local

#### 📝 Gerenciamento de Traduções
- Visualização de todas as traduções organizadas por idioma (pt-BR, en, es)
- Edição de traduções existentes através de interface intuitiva
- Adição de novas chaves de tradução
- Busca e filtragem de traduções
- Suporte completo para estrutura hierárquica de chaves (ex: `section.subsection.key`)

#### 💼 Gerenciamento de Experiências Profissionais
- **CRUD Completo**: Criar, visualizar, editar e deletar experiências
- **Traduções Multi-idioma**: Gerenciar traduções de experiências para os 3 idiomas suportados
- **Interface com Abas**: Edição separada por idioma (pt-BR, en, es) em um único modal
- **Atividades Dinâmicas**: Adicionar/remover atividades de forma dinâmica
- **Ordem de Exibição**: Definir a ordem de exibição das experiências no portfólio
- **Validação**: Validação obrigatória dos campos principais em português
- **Fallback Inteligente**: Traduções opcionais com fallback para pt-BR quando não preenchidas

#### 🚧 Gerenciamento de Projetos (Em Desenvolvimento)
- Interface preparada para gerenciamento de projetos
- Funcionalidade será implementada em breve

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
- **Swagger/OpenAPI** - Documentação interativa da API (swaggo/echo-swagger, swaggo/swag)

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
│   ├── docs/                   # Documentação Swagger gerada
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

### Documentação Swagger

A documentação interativa da API está disponível através do Swagger UI:

```
http://localhost:8080/swagger/index.html
```

#### Recursos do Swagger

- 📖 **Documentação Completa**: Todos os endpoints documentados com exemplos
- 🧪 **Teste Interativo**: Teste os endpoints diretamente pela interface
- 🔐 **Autenticação Integrada**: Suporte para autenticação JWT Bearer Token
- 📋 **Modelos de Dados**: Visualização dos modelos de request/response
- 🏷️ **Tags Organizadas**: Endpoints organizados por categorias (portfolio, auth, admin, health)

#### Como Usar o Swagger

1. **Acesse a Interface**: Navegue até `http://localhost:8080/swagger/index.html`
2. **Autenticação**: Para testar endpoints protegidos:
   - Clique no botão **"Authorize"** no topo da página
   - Informe o token JWT no formato: `Bearer <seu-token>`
   - O token pode ser obtido fazendo login via `/api/auth/login`
3. **Testar Endpoints**: Clique em qualquer endpoint para expandir e ver detalhes, exemplos e testar diretamente

#### Regenerar Documentação

Após adicionar ou modificar anotações Swagger nos handlers:

```bash
cd backend
# Instalar swag CLI (se ainda não tiver)
go install github.com/swaggo/swag/cmd/swag@latest

# Gerar documentação
~/go/bin/swag init -g cmd/server/main.go --output docs
```

### Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

> **Nota**: Certifique-se de que o backend está rodando antes de iniciar o frontend para evitar erros de conexão.

### Acessando o Painel de Administração

1. Acesse a página de login em `http://localhost:5173/#/login`
2. Faça login com suas credenciais de administrador
3. Após o login bem-sucedido, você será redirecionado para o painel admin em `http://localhost:5173/#/admin`
4. O painel permite gerenciar traduções, experiências profissionais e projetos (em desenvolvimento)

## 🔌 API Endpoints

> 💡 **Documentação Interativa**: Para uma documentação completa e interativa com exemplos, acesse o [Swagger UI](http://localhost:8080/swagger/index.html) quando o servidor estiver rodando.

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

### Autenticação

- `POST /api/auth/login` - Realiza login e retorna token JWT
- `POST /api/auth/logout` - Realiza logout (requer autenticação)

### Administração (Requer Autenticação)

Todas as rotas abaixo requerem o header `Authorization: Bearer <token>`.

#### Traduções

- `PUT /api/admin/translations/{language}` - Atualiza uma tradução específica
  - Body: `{ "key": "string", "value": "string" }`
  - Parâmetros: `language` (pt-BR, en, es)

#### Experiências Profissionais

- `GET /api/admin/experiences` - Lista todas as experiências
- `GET /api/admin/experiences/{id}` - Obtém uma experiência por ID
- `POST /api/admin/experiences` - Cria uma nova experiência
  - Body: `CreateExperienciaRequest`
- `PUT /api/admin/experiences/{id}` - Atualiza uma experiência existente
  - Body: `UpdateExperienciaRequest`
- `DELETE /api/admin/experiences/{id}` - Deleta uma experiência
- `GET /api/admin/experiences/{id}/translations` - Obtém traduções de uma experiência
- `POST /api/admin/experiences/{id}/translations` - Salva traduções de uma experiência
  - Body: `{ "en": UpdateExperienciaRequest, "es": UpdateExperienciaRequest }`

#### Projetos

- `PUT /api/admin/projects/{id}` - Atualiza um projeto (em desenvolvimento)

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

#### Documentação Swagger

```bash
# Instalar swag CLI (se ainda não tiver)
go install github.com/swaggo/swag/cmd/swag@latest

# Gerar documentação Swagger
~/go/bin/swag init -g cmd/server/main.go --output docs

# A documentação estará disponível em:
# http://localhost:8080/swagger/index.html
```

**Nota**: Após adicionar ou modificar anotações Swagger nos handlers, é necessário regenerar a documentação executando o comando acima.

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

O conteúdo pode ser gerenciado de duas formas:

1. **Painel de Administração** (Recomendado): Acesse `/admin` após fazer login para gerenciar traduções, experiências e projetos através de uma interface visual intuitiva.

2. **Banco de Dados Direto**: Modifique diretamente no banco de dados ou crie novas migrations SQL.

### Traduções

As traduções são gerenciadas em:
- **Frontend**: `frontend/src/i18n/locales/` - Traduções estáticas do frontend
- **Backend**: Tabela `translations` no banco de dados - Traduções dinâmicas gerenciáveis via painel admin
- **Painel Admin**: Interface visual para editar traduções sem necessidade de acessar o banco de dados

## 🔒 Segurança

- **Autenticação JWT**: Sistema de autenticação baseado em tokens JWT
- **Middleware de Autenticação**: Proteção de rotas administrativas com validação de token
- **CORS configurado**: Ajuste `AllowOrigins` em produção
- **Middleware de segurança**: Headers de segurança (helmet-like)
- **Tratamento de erros centralizado**: Respostas de erro padronizadas
- **Validação de dados**: Validação de campos obrigatórios
- **Logging estruturado**: Sistema de logs completo para auditoria e debugging
- **Armazenamento seguro**: Tokens JWT armazenados no localStorage do cliente

## 📝 Próximos Passos

- [ ] Implementar testes unitários e de integração
- [x] Adicionar documentação Swagger/OpenAPI ✅
- [ ] Implementar cache (Redis ou in-memory)
- [ ] Configurar CI/CD
- [ ] Implementar tema claro/escuro completo
- [ ] Adicionar analytics
- [ ] Otimizar SEO
- [ ] Completar gerenciamento de projetos no painel admin
- [ ] Adicionar gerenciamento de educação e certificações no painel admin

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

