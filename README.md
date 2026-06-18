# ZAVS – Zentrales Anliegen- und Verwaltungssystem

Digitales Ticketsystem für die DHBW. Studierende, Bedienstete und Interessenten können Anliegen (IT-Störungen, Facility Management, Verwaltung etc.) zentral einreichen und den Bearbeitungsstand jederzeit nachverfolgen.

## Tech Stack

| Layer    | Technologie                                      |
| -------- | ------------------------------------------------ |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4, shadcn/ui |
| Backend  | Node.js, Express 5, TypeScript, Prisma, Zod      |
| Database | SQLite (dev) → PostgreSQL (prod)                 |

## Projektstruktur

```
ZAVS/
├── frontend/          # React SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── views/         # Seiten (Home, TicketNew, TicketStatus, ...)
│   │   │   └── components/
│   │   │       ├── ui/        # shadcn/ui Basiskomponenten
│   │   │       └── zavs/      # Projekt-spezifische Komponenten
│   │   └── styles/            # Tailwind, Theme, Fonts
│   └── index.html
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/            # API-Endpunkte
│   │   ├── services/          # Business-Logik
│   │   └── middleware/        # Auth, Validation etc.
│   └── prisma/
│       └── schema.prisma      # Datenbankschema
└── README.md
```

## Setup

### Voraussetzungen

- Node.js >= 20
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma db push   # Datenbank initialisieren
npm run dev          # → http://localhost:8000
```

## API-Endpunkte

| Methode | Pfad                             | Beschreibung               |
| ------- | -------------------------------- | -------------------------- |
| GET     | `/api/health`                    | Health Check               |
| POST    | `/api/tickets`                   | Ticket erstellen           |
| GET     | `/api/tickets`                   | Alle Tickets (Backend)     |
| GET     | `/api/tickets/:id`               | Ticket Details (Backend)   |
| GET     | `/api/tickets/status/:token`     | Ticketstatus (öffentlich)  |
| PATCH   | `/api/tickets/:id/status`        | Status aktualisieren       |

## Features (Projektboard)

Siehe [GitHub Project](https://github.com/users/moearzini/projects/4) für alle User Stories und den aktuellen Stand.

### Kernfeatures (basic)
- Ticket-Erstellung mit Kategorie, Betreff, Beschreibung, E-Mail
- KI-basierte Kategorievorschläge
- Eindeutige Ticketnummer
- Statusverfolgung per Link (ohne Login)
- E-Mail-Benachrichtigungen
- Dateianhänge (PDF, PNG, JPG)
- Backend-Ticketverwaltung mit Suche & Routing
- Rollenbasierte Berechtigungen

### Geplante Features (should/nice-to-have)
- Mehrsprachigkeit (DE/EN)
- Raumplan-Integration
- Stundenplan-Verknüpfung
- Statistik-Dashboard
- Feedback-System
- Terminbuchung
