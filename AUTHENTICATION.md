# Sistema de Autenticação - Guri's Store

## 📋 Visão Geral

Sistema de autenticação universal para a plataforma Guri's Store, utilizado por **Administradores**, **Fornecedores** e **Lojas**.

## 🎯 Funcionalidades

### ✅ Implementadas

- **Login Universal** - Uma única tela de login para todos os tipos de usuários
- **Recuperação de Senha** - Fluxo completo de reset de senha via email
- **Validação de Formulários** - Validação client-side com feedback visual
- **Detecção Automática de Role** - Redireciona automaticamente baseado no tipo de usuário
- **Feedback Visual** - Estados de loading, erro e sucesso
- **Armazenamento Seguro** - Token JWT armazenado no localStorage
- **Página de Contato** - Para solicitação de novo acesso
- **Acessibilidade** - Labels ARIA, foco adequado, navegação por teclado

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── (public)/
│       ├── login/
│       │   └── page.tsx              # Tela de login universal
│       ├── forgot-password/
│       │   └── page.tsx              # Recuperação de senha
│       └── contact/
│           └── page.tsx              # Solicitação de acesso
├── components/
│   └── ui/
│       └── alert.tsx                 # Componente Alert (novo)
├── lib/
│   └── auth.ts                       # Serviço de autenticação
└── types/
    └── auth.ts                       # Tipos TypeScript
```

## 🔐 Fluxo de Autenticação

### 1. Login

```typescript
// Usuário preenche email e senha
// Sistema valida credenciais
// Backend retorna token JWT + dados do usuário
// Token é armazenado no localStorage
// Redirecionamento baseado no role:
//   - Admin    → /admin
//   - Supplier → /supplier
//   - Store    → /store
```

### 2. Recuperação de Senha

```typescript
// Usuário informa email
// Sistema envia email com link de reset
// Usuário clica no link e define nova senha
```

### 3. Logout

```typescript
// Remove token do localStorage
// Remove dados do usuário
// Redireciona para /login
```

## 🔧 Integração com Backend

### Endpoints Esperados

#### POST `/api/auth/login`

**Request:**

```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "nome": "Nome do Usuário",
    "email": "user@example.com",
    "role": "admin|supplier|store",
    "status": "active|inactive"
  }
}
```

#### POST `/api/auth/forgot-password`

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "Password recovery email sent successfully",
  "success": true
}
```

#### POST `/api/auth/reset-password`

**Request:**

```json
{
  "token": "reset-token-from-email",
  "newPassword": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

**Response:**

```json
{
  "message": "Password reset successfully",
  "success": true
}
```

## 🎨 Design System

O sistema de autenticação segue **exatamente** o mesmo padrão visual do checkout/shipping:

- **Paleta de Cores:** Zinc (950/900/800/700/400/300/200)
- **Tipografia:** Sistema padrão do Tailwind
- **Componentes:** Shadcn UI (Card, Input, Button, Alert, etc.)
- **Espaçamento:** Consistente com o resto da aplicação
- **Responsividade:** Mobile-first, centralizado na tela

### Cores por Estado

```css
/* Backgrounds */
bg-zinc-950    /* Fundo principal */
bg-zinc-900    /* Inputs e cards */
bg-zinc-800    /* Hover states */

/* Borders */
border-zinc-800    /* Padrão */
border-zinc-700    /* Focus */

/* Text */
text-white         /* Títulos principais */
text-zinc-100      /* Texto padrão */
text-zinc-300      /* Labels */
text-zinc-400      /* Placeholders/links */
text-zinc-500      /* Footer */

/* Estados de Erro */
border-red-900 bg-red-950/50 text-red-300

/* Estados de Sucesso */
border-green-900 bg-green-950/50 text-green-300
```

## 🧪 Teste Manual

### Cenário 1: Login como Admin

1. Acesse `/login`
2. Email: `admin@guristore.com`
3. Senha: qualquer (modo mock)
4. Deve redirecionar para `/admin`

### Cenário 2: Login como Supplier

1. Acesse `/login`
2. Email: `supplier@example.com`
3. Senha: qualquer (modo mock)
4. Deve redirecionar para `/supplier`

### Cenário 3: Login como Store

1. Acesse `/login`
2. Email: `store@example.com`
3. Senha: qualquer (modo mock)
4. Deve redirecionar para `/store`

### Cenário 4: Recuperação de Senha

1. Acesse `/login`
2. Clique em "Forgot password?"
3. Informe email válido
4. Deve exibir mensagem de sucesso

### Cenário 5: Solicitação de Acesso

1. Acesse `/login`
2. Clique em "Request access"
3. Visualize informações de contato

## 🔄 Próximos Passos

### Integração com Backend Real

1. **Atualizar variável de ambiente:**

   ```bash
   NEXT_PUBLIC_API_URL=https://api.guristore.com
   ```

2. **Descomentar código no `auth.ts`:**

   ```typescript
   // Remover os mocks e habilitar as chamadas fetch reais
   ```

3. **Implementar middleware de autenticação:**
   ```typescript
   // Proteger rotas privadas verificando token
   ```

### Melhorias Futuras

- [ ] Implementar refresh token
- [ ] Adicionar autenticação 2FA
- [ ] Implementar "Lembrar-me" (remember me)
- [ ] Adicionar limite de tentativas de login
- [ ] Implementar CAPTCHA após X tentativas
- [ ] Adicionar logs de auditoria
- [ ] Implementar sessões múltiplas
- [ ] Adicionar notificação de novo login

## 📞 Contato para Acesso

**Email:** support@guristore.com  
**Telefone:** +55 (11) 1234-5678  
**Endereço:** Av. Paulista, 1578 - São Paulo, SP

## 📝 Observações

- ⚠️ **Modo Mock Ativo:** O sistema está configurado com dados mockados
- 🔒 **Segurança:** Em produção, use HTTPS e armazene tokens de forma segura
- 🌐 **Internacionalização:** Pronto para i18n (labels em inglês)
- ♿ **Acessibilidade:** Totalmente compatível com screen readers

---

**Desenvolvido para Guri's Store** - Central de Compras B2B
