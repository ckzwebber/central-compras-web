# central-compras-web

Next.js frontend for a multi-role procurement platform supporting admin, supplier, and store user workflows.

Originally built as an academic project and adapted for public live demo with focus on UX, session stability, and role-based navigation.

**Live demo:** https://central-compras.vercel.app

---

## Stack

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Axios
* Radix UI
* Zustand

---

## Architecture

```text
src/
├── app/          # Public and private pages (App Router)
├── components/   # Reusable UI and domain blocks
├── lib/          # API and auth services
├── config/       # Axios client
├── hooks/        # Cart state and utilities
└── types/        # TypeScript contracts
```

---

## Demo Accounts

Credentials are shown via a first-visit modal and a persistent **"Demo Accounts"** button.

| Role     | Email                                             | Password |
| -------- | ------------------------------------------------- | -------- |
| Admin    | [admin@demo.com](mailto:admin@demo.com)           | demo1234 |
| Supplier | [fornecedor@demo.com](mailto:fornecedor@demo.com) | demo1234 |
| Store    | [usuario@demo.com](mailto:usuario@demo.com)       | demo1234 |

---

## Setup

Requires the backend running at:

```text
http://localhost:3000
```

```bash
pnpm install

cp .env.example .env.local

pnpm run dev
```

Open:

```text
http://localhost:3001
```

(or the port Next.js assigns).

---

## Environment Variables

See `.env.example`.

### Key Variables

* `NEXT_PUBLIC_API_BASE_URL`
* `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` / `_PASSWORD`
* `NEXT_PUBLIC_DEMO_SUPPLIER_EMAIL` / `_PASSWORD`
* `NEXT_PUBLIC_DEMO_USER_EMAIL` / `_PASSWORD`

---

## Auth and Session

* Login issues an HttpOnly cookie from the API — no JWT in the browser
* Minimal user data in `localStorage` for UX only
* Private routes protected by Next.js middleware with role checks
* 401 handling preserves the public home without breaking anonymous navigation

---

## Main Flows

| Area     | Features                                                 |
| -------- | -------------------------------------------------------- |
| Public   | Home, search, product pages, campaign/discount display   |
| Admin    | Dashboard, user/store/supplier/product management        |
| Supplier | Dashboard, products, campaigns, commercial terms, orders |
| Store    | Catalog, cart, checkout, orders, profile                 |
