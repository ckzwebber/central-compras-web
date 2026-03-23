# Central de Compras Frontend

Frontend web do projeto Central de Compras.

Aplicacao criada no contexto academico e adaptada para live demo publica com foco em UX, estabilidade de sessao e navegacao por perfil.

## Contexto do projeto

O frontend nasceu como entrega academica e foi refatorado para suportar um cenario real de demonstracao:

- areas privadas por papel (admin, fornecedor, loja)
- home e catalogo acessiveis sem login
- credenciais demo visiveis no proprio app
- fluxo de sessao alinhado com cookie HttpOnly do backend

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Radix UI
- Zustand

## Estrutura

- src/app: paginas publicas e privadas
- src/components: UI reutilizavel e blocos por dominio
- src/lib: servicos de API/autenticacao
- src/config: cliente Axios
- src/hooks: estado de carrinho e utilitarios
- src/types: contratos TypeScript

## Contas demo

As credenciais sao exibidas por modal de primeira visita e botao fixo "Demo Accounts".

- Admin: admin@demo.com / demo1234
- Supplier: fornecedor@demo.com / demo1234
- Store User: usuario@demo.com / demo1234

## Rodando localmente

Pre-requisito: backend ativo em `http://localhost:3000`.

1. Instalar dependencias:
   - pnpm install
2. Configurar ambiente:
   - cp .env.example .env.local
3. Iniciar frontend:
   - pnpm run dev
4. Abrir no navegador:
   - http://localhost:3001 (ou porta indicada pelo Next)

## Variaveis de ambiente

Veja `.env.example`.

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_DEMO_ADMIN_EMAIL`
- `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD`
- `NEXT_PUBLIC_DEMO_SUPPLIER_EMAIL`
- `NEXT_PUBLIC_DEMO_SUPPLIER_PASSWORD`
- `NEXT_PUBLIC_DEMO_USER_EMAIL`
- `NEXT_PUBLIC_DEMO_USER_PASSWORD`

## Sessao e seguranca no cliente

- login com cookie HttpOnly emitido pela API
- dados minimos do usuario em `localStorage` apenas para UX
- remocao do uso de token JWT no navegador
- middleware de protecao de rotas privadas por papel
- tratamento de 401 para evitar quebra da home publica

## Fluxos principais

- Publico:
  - home, busca e pagina de produto
  - visualizacao de campanhas/descontos
- Admin:
  - dashboard
  - gestao de usuarios, lojas, fornecedores e produtos
- Supplier:
  - dashboard
  - produtos, campanhas, termos comerciais e pedidos
- Store User:
  - catalogo, carrinho, checkout, pedidos e perfil

## Deploy recomendado

- Frontend: Vercel
- Backend: Render/Railway

Checklist de deploy:

1. Publicar backend e validar API
2. Definir `NEXT_PUBLIC_API_BASE_URL` no frontend
3. Publicar frontend
4. Validar navegacao anonima na home
5. Validar login e dashboards dos 3 perfis
6. Validar logout e expiracao de sessao

## Resumo academico

Esta interface manteve o escopo original da disciplina (plataforma multi-perfil de compras), mas ganhou padrao de demonstracao publica: melhor confiabilidade, UX de onboarding demo e fluxo de autenticacao mais seguro.
