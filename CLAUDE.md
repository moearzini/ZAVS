# ZAVS – Zentrales Anliegen- und Verwaltungssystem

## What is this?
A ticket system for DHBW (Duale Hochschule Baden-Württemberg). Students and staff submit requests (IT issues, facility problems, admin inquiries) which get routed to the right department.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- **Backend**: Express 5 + TypeScript + Prisma ORM + Zod validation
- **Database**: SQLite (dev), PostgreSQL (prod)

## Project Structure
- `frontend/` — React SPA with Vite
- `backend/` — Express API server
- `backend/prisma/schema.prisma` — Database schema (source of truth for data model)

## Commands

### Frontend
```bash
cd frontend && npm run dev     # Dev server on :5173
cd frontend && npm run build   # Production build
```

### Backend
```bash
cd backend && npm run dev      # Dev server on :8000 (tsx watch)
cd backend && npx prisma db push       # Apply schema to DB
cd backend && npx prisma migrate dev   # Create migration
cd backend && npx prisma studio        # DB GUI
```

## Key Conventions
- Frontend views are in `frontend/src/app/views/`
- Reusable UI primitives (shadcn) in `frontend/src/app/components/ui/`
- Project-specific components in `frontend/src/app/components/zavs/`
- API routes in `backend/src/routes/`
- Validation schemas (Zod) in `backend/src/validation.ts`
- Brand color: `#E2001A` (DHBW Red)
- All user-facing text is German
- The frontend proxies `/api` to `localhost:8000` via Vite config

## Ticket Statuses
new → assigned → in_progress → waiting → forwarded → completed | rejected | auth_required

## Categories
IT, Facility Management, Sekretariat, Verwaltung, Unterrichtsmaterial, Sonstiges Anliegen
