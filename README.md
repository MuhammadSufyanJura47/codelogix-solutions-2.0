# CODELOGIX Solutions Website

Modern Next.js website for CODELOGIX Solutions with public pages, admission workflows, contact management, Prisma/MySQL persistence, secure admin login, and dashboard analytics.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Prisma ORM
- MySQL
- bcryptjs
- zod validation

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Configure `DATABASE_URL`, `SESSION_SECRET`, and optional `FORMSPREE_ENDPOINT`.

4. Create database tables and seed courses/admin:

```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Run development server:

```bash
npm run dev
```

## Initial Admin

The seed script reads these environment variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Default first-deployment values are provided in `.env.example` and are hashed before storage.

## Deployment

Deploy to Vercel with a MySQL provider and configure:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `FORMSPREE_ENDPOINT` when using Formspree forwarding

Run Prisma migration and seed during deployment setup, then rotate the initial admin password after first access.
