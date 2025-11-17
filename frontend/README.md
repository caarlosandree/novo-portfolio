# Portfolio Frontend

Frontend da aplicação de portfólio desenvolvido com React, TypeScript e Vite.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Componentes](#estrutura-de-componentes)
- [Internacionalização](#internacionalização)
- [Integração com Backend](#integração-com-backend)
- [Build e Deploy](#build-e-deploy)
- [Desenvolvimento](#desenvolvimento)
- [Troubleshooting](#troubleshooting)

## 🎯 Sobre o Projeto

Frontend moderno e responsivo para exibição de portfólio pessoal, desenvolvido com as melhores práticas de React e TypeScript. O projeto utiliza Material-UI para componentes, Framer Motion para animações e i18next para suporte multi-idioma.

### Características

- ⚡ **Performance**: Lazy loading, code splitting e otimizações de build
- 🎨 **UI Moderna**: Material-UI com design responsivo
- 🌍 **Multi-idioma**: Suporte para pt-BR, en e es
- 🎬 **Animações**: Transições suaves com Framer Motion
- ♿ **Acessibilidade**: Recursos de a11y implementados
- 📱 **Responsivo**: Mobile-first design

## 🛠️ Stack Tecnológica

### Core

- **React 19.2** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Vite 7.2** (rolldown-vite) - Build tool e dev server

### UI e Estilização

- **Material-UI (MUI) 7.3** - Biblioteca de componentes React
- **Emotion** - CSS-in-JS para estilização
- **Framer Motion 12.23** - Biblioteca de animações

### Internacionalização

- **i18next 25.6** - Framework de internacionalização
- **react-i18next 16.3** - Integração React para i18next
- **i18next-browser-languagedetector 8.2** - Detecção automática de idioma

### Ferramentas

- **React Icons 5.5** - Ícones populares
- **ESLint 9.39** - Linter para qualidade de código
- **TypeScript ESLint** - Linting específico para TypeScript

## 📁 Estrutura do Projeto

```
frontend/
├── public/                 # Arquivos estáticos públicos
│   ├── favicon.svg
│   └── vite.svg
│
├── src/
│   ├── assets/            # Recursos estáticos (imagens, etc)
│   │   └── img/
│   │
│   ├── components/        # Componentes React
│   │   ├── skeletons/    # Componentes de loading
│   │   ├── AboutSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InterpersonalSkillsSection.tsx
│   │   ├── NavigationBar.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── index.ts       # Barrel exports
│   │
│   ├── contexts/          # Context API
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/             # Custom hooks
│   │   ├── useActiveSection.ts
│   │   ├── useMobileMenu.ts
│   │   ├── usePortfolioData.ts
│   │   └── useScrollToSection.ts
│   │
│   ├── i18n/              # Configuração de internacionalização
│   │   ├── config.ts
│   │   └── locales/       # Arquivos de tradução
│   │       ├── pt-BR.json
│   │       ├── en.json
│   │       └── es.json
│   │
│   ├── pages/             # Páginas da aplicação
│   │   └── HomePage.tsx
│   │
│   ├── services/          # Serviços de API
│   │   └── api.ts
│   │
│   ├── styles/            # Estilos e temas
│   │   └── theme.ts
│   │
│   ├── types/             # Definições TypeScript
│   │   ├── About.ts
│   │   ├── Certification.ts
│   │   ├── Contact.ts
│   │   ├── Education.ts
│   │   ├── Experiencia.ts
│   │   ├── Habilidade.ts
│   │   ├── Projeto.ts
│   │   └── index.ts
│   │
│   ├── utils/             # Funções utilitárias
│   │   ├── sectionColors.ts
│   │   └── techIcons.tsx
│   │
│   ├── App.tsx            # Componente raiz
│   ├── App.css            # Estilos globais do App
│   ├── main.tsx           # Ponto de entrada
│   ├── index.css          # Estilos globais
│   └── vite-env.d.ts      # Tipos do Vite
│
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore            # Arquivos ignorados pelo Git
├── eslint.config.js      # Configuração do ESLint
├── index.html            # HTML principal
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── tsconfig.app.json     # TSConfig para aplicação
├── tsconfig.node.json    # TSConfig para Node
├── vite.config.ts        # Configuração do Vite
├── INTEGRATION.md        # Documentação de integração
└── README.md             # Este arquivo
```

## 📦 Pré-requisitos

- **Node.js** 18+ (recomendado: LTS)
- **npm** ou **yarn** ou **pnpm**
- Acesso ao backend rodando (opcional para desenvolvimento)

## 🚀 Instalação

1. **Clone o repositório** (se ainda não fez):
```bash
git clone <url-do-repositorio>
cd novo-portfolio/frontend
```

2. **Instale as dependências**:
```bash
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
# URL base da API backend
VITE_API_BASE_URL=http://localhost:8080
```

**Importante**: No Vite, variáveis de ambiente devem começar com `VITE_` para serem expostas ao código.

### Configuração para Produção

```env
VITE_API_BASE_URL=https://api.seudominio.com
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173`

### Preview do Build

```bash
npm run build
npm run preview
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Verifica problemas de linting |
| `npm run lint:fix` | Corrige automaticamente problemas de linting |
| `npm run typecheck` | Verifica tipos TypeScript |

## 🧩 Estrutura de Componentes

### Componentes Principais

- **HeroSection**: Seção inicial com apresentação
- **AboutSection**: Informações sobre mim
- **EducationSection**: Formações acadêmicas
- **ExperienceSection**: Experiências profissionais
- **SkillsSection**: Habilidades técnicas
- **InterpersonalSkillsSection**: Habilidades interpessoais
- **CertificationsSection**: Certificações e cursos
- **ProjectsSection**: Portfólio de projetos
- **ContactSection**: Informações de contato
- **NavigationBar**: Barra de navegação
- **Footer**: Rodapé
- **ScrollToTop**: Botão de voltar ao topo

### Skeletons

Componentes de loading (skeletons) para melhor UX:
- `AboutSectionSkeleton`
- `SkillsSectionSkeleton`
- `EducationSectionSkeleton`
- `CertificationsSectionSkeleton`
- `ProjectsSectionSkeleton`
- `ContactSectionSkeleton`

## 🌍 Internacionalização

O projeto suporta três idiomas:

- **Português (pt-BR)** - Idioma padrão
- **Inglês (en)**
- **Espanhol (es)**

### Como Funciona

1. Detecção automática do idioma do navegador
2. Armazenamento no `localStorage` para persistência
3. Carregamento dinâmico de traduções do backend
4. Alternância manual através da interface

### Adicionando Novos Idiomas

1. Crie arquivo de tradução em `src/i18n/locales/novo-idioma.json`
2. Configure em `src/i18n/config.ts`:
```typescript
import novoIdioma from './locales/novo-idioma.json'

resources: {
  'novo-idioma': {
    translation: novoIdioma,
  },
}
```
3. Adicione traduções no backend através de migrations
4. Atualize o seletor de idioma no `NavigationBar`

## 🔌 Integração com Backend

O frontend consome a API do backend através do serviço `api.ts`.

### Endpoints Consumidos

- `GET /api/portfolio/skills` - Habilidades técnicas
- `GET /api/portfolio/interpersonal-skills` - Habilidades interpessoais
- `GET /api/portfolio/experiences` - Experiências profissionais
- `GET /api/portfolio/projects` - Projetos
- `GET /api/portfolio/about?language={lang}` - Sobre mim
- `GET /api/portfolio/educations?language={lang}` - Formações
- `GET /api/portfolio/certification-categories?language={lang}` - Categorias de certificações
- `GET /api/portfolio/certification-tracks?language={lang}` - Trilhas de certificações
- `GET /api/portfolio/contact` - Contato
- `GET /api/portfolio/translations/{language}` - Traduções
- `GET /health` - Health check

### Tratamento de Erros

- **Erro de conexão**: Usa dados locais como fallback
- **API indisponível**: Exibe alerta e usa dados locais
- **Erro de rede**: Tratamento automático com fallback

Para mais detalhes, consulte `INTEGRATION.md`.

## 🏗️ Build e Deploy

### Build de Produção

```bash
npm run build
```

O build otimizado será gerado na pasta `dist/` com:
- ✅ Code splitting por vendor (React, MUI, Framer Motion, etc)
- ✅ Minificação de código
- ✅ Remoção de console.logs
- ✅ Otimização de assets
- ✅ CSS code splitting

### Otimizações do Build

O `vite.config.ts` está configurado com:
- **Manual chunks**: Separação de vendors para melhor cache
- **Terser**: Minificação avançada
- **Tree shaking**: Remoção de código não utilizado
- **Source maps**: Desabilitados em produção

### Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática:

- **Vercel**: Deploy automático via Git
- **Netlify**: Deploy automático via Git
- **GitHub Pages**: Via GitHub Actions
- **AWS S3 + CloudFront**: Hospedagem estática
- **Outros**: Qualquer servidor que sirva arquivos estáticos

## 💻 Desenvolvimento

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

### Adicionando Novos Componentes

1. Crie o componente em `src/components/`
2. Exporte através de `src/components/index.ts` (barrel export)
3. Use lazy loading para componentes pesados:
```typescript
const NovoComponente = lazy(() => 
  import('@/components/NovoComponente').then(module => ({ 
    default: module.NovoComponente 
  }))
)
```

### Adicionando Novos Hooks

1. Crie o hook em `src/hooks/`
2. Use a convenção `useNomeDoHook.ts`
3. Exporte diretamente do arquivo

### Adicionando Novos Tipos

1. Crie o arquivo de tipo em `src/types/`
2. Exporte através de `src/types/index.ts`

## 🐛 Troubleshooting

### Erro: "API não está disponível"

**Causa**: Backend não está rodando ou URL incorreta

**Solução**:
1. Verifique se o backend está rodando na porta 8080
2. Verifique a variável `VITE_API_BASE_URL` no `.env`
3. Verifique CORS no backend

### Erro: CORS

**Causa**: Backend não está permitindo requisições do frontend

**Solução**: Configure CORS no backend para permitir a origem do frontend

### Dados não aparecem

**Causa**: API retornando dados vazios ou erro

**Solução**:
1. Verifique se as migrations foram executadas no banco
2. Teste os endpoints diretamente: `curl http://localhost:8080/api/portfolio/skills`
3. Verifique o console do navegador para erros

### Erro de TypeScript

**Causa**: Tipos não encontrados ou incompatíveis

**Solução**:
1. Execute `npm run typecheck` para ver erros detalhados
2. Verifique se todos os tipos estão exportados corretamente
3. Reinicie o TypeScript server no editor

### Build falha

**Causa**: Erros de TypeScript ou linting

**Solução**:
1. Execute `npm run typecheck` e corrija erros
2. Execute `npm run lint` e corrija problemas
3. Verifique se todas as dependências estão instaladas

## 📚 Recursos Adicionais

- [Documentação do React](https://react.dev)
- [Documentação do Vite](https://vite.dev)
- [Documentação do Material-UI](https://mui.com)
- [Documentação do Framer Motion](https://www.framer.com/motion)
- [Documentação do i18next](https://www.i18next.com)
- [Documentação de Integração](./INTEGRATION.md)

## 🔄 Próximos Passos

- [ ] Implementar testes unitários (Vitest)
- [ ] Adicionar testes E2E (Playwright)
- [ ] Implementar tema claro/escuro completo
- [ ] Adicionar PWA support
- [ ] Otimizar imagens (lazy loading, WebP)
- [ ] Adicionar analytics
- [ ] Melhorar SEO (meta tags, sitemap)

---

Desenvolvido com ❤️ usando React, TypeScript e Vite
