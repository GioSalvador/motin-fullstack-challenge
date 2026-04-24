# Motin Films Challenge – Sistema de Captação de Leads

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de **Desenvolvedor Full-Stack**.

O objetivo foi criar um **Mini-Ecossistema de Captação de Leads**, composto por:

* Uma Landing Page otimizada para conversão
* Um Dashboard Administrativo seguro para gestão dos leads

---

## Tecnologias Utilizadas

* **Framework:** Next.js 13+
* **Linguagem:** TypeScript 
* **Estilização:** Tailwind CSS (mobile-first)
* **Backend & Banco de Dados:** Supabase (PostgreSQL + Auth + RLS)
* **Deploy:** Vercel

---

## Acesso ao Projeto

👉 [Acessar aplicação](https://motin-fullstack-challenge.vercel.app/)

---

## Funcionalidades

### Landing Page

* Seção Hero + métricas (baseadas na estrutura da Motin Films)
* Design responsivo (mobile-first)
* Otimizada para performance (Lighthouse 90+ Performance)
* Formulário funcional de captação de leads

### Captação de Leads

* Campos: Nome, Email, Telefone e Necessidade
* Feedback em tempo real (loading, sucesso e erro)
* Persistência dos dados no Supabase

### Autenticação

* Login via Magic Link (Supabase Auth)
* Gerenciamento de sessão com SSR

### Dashboard Administrativo

* Rota protegida (`/admin`)
* Verificação de autenticação no server
* Listagem de leads em tempo real
* Alteração de status (new ↔ contacted)

### Dashboard Analytics

Foi implementado um gráfico de Leads por dia utilizando a biblioteca Recharts.

Os dados são agrupados a partir do campo created_at, permitindo visualizar a quantidade de leads gerados ao longo do tempo.

O gráfico é responsivo, possui tooltip customizado e se integra diretamente com os dados do Supabase.

---

## Segurança (RLS)

Foi implementado **Row Level Security (RLS)** para garantir:

* ✅ Inserção pública de leads (anon)
* ❌ Leitura restrita a usuários autenticados
* ✅ Atualização permitida apenas para usuários autenticados

---

## Decisões de Arquitetura

### Server vs Client Components

* **Server Components**

  * Dashboard
  * Fetch de dados
  * Proteção de rotas

* **Client Components**

  * Interações do formulário
  * Disparo de autenticação

Essa abordagem reduz JavaScript no client e melhora a performance.

---

### Integração com Supabase

* `createBrowserClient` → operações no client (formulário e login)
* `createServerClient` → autenticação e queries no server

---

## Performance

* Lighthouse:

  * Desktop: 100
  * Mobile: 93

### Otimizações aplicadas:

* Renderização server-first com App Router
* Uso de `next/font` para carregamento otimizado de fontes
* Redução de JavaScript no client
* Estrutura limpa com Tailwind

---

## Estrutura do Projeto

```bash
/app
  /admin
  /login
/components
/lib
```

---

## Como rodar o projeto

### 1. Clonar repositório

```bash
git clone https://github.com/GioSalvador/motin-fullstack-challenge
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 4. Rodar o projeto

```bash
npm run dev
```

---

## Possíveis melhorias

* Gráfico de leads por dia (BI)
* Paginação e filtros no dashboard
* Validação mais robusta (Zod / React Hook Form)
* Melhorias visuais e animações

---

## Uso de IA

Ferramentas de IA (ChatGPT) foram utilizadas para:

* Acelerar a estruturação do projeto
* Auxiliar na integração com Supabase
* Apoiar na resolução de erros e organização do código

---

## Vídeo de demonstração

👉 [Assistir vídeo](COLE_AQUI_O_LINK_DO_VIDEO)

---

## Autor

Desenvolvido por **Giovani Salvador**
