# BilimBox

A multilingual educational platform (Kyrgyz, Russian, English) built with Next.js, TypeScript, Tailwind CSS and Prisma ORM on SQLite.

## Features

- **Multilingual** – KG / RU / EN with one-click language switching
- **Course catalog** – structured courses with modules and lessons
- **Lesson page** – embedded video, text content, Practice Card task and file download
- **Smart Next Lesson** – automatically links to the next lesson after completing one
- **Lite Mode** – text-first approach for weak internet connections
- **Telegram Sync** – displays Telegram channel access info after course purchase
- **Student dashboard** – enrolled courses with progress bars
- **Admin dashboard** – course, user, enrollment and completion analytics
- **REST API** – `/api/courses`, `/api/enroll`, `/api/progress`

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| ORM | Prisma |
| Database | SQLite (dev) — swap to PostgreSQL for production |
| Icons | Lucide React |

## Getting started

```bash
# Install dependencies
npm install

# Copy env and set up the database
cp .env.example .env
npm run db:push
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000/kg](http://localhost:3000/kg) (or `/ru` / `/en`).

## Project structure

```
app/
  [locale]/           # KG, RU, EN locales
    page.tsx          # Home page
    courses/          # Course catalog + detail + lesson
    dashboard/        # Student progress
    admin/            # Admin analytics
  api/
    courses/          # GET /api/courses
    enroll/           # POST /api/enroll
    progress/         # POST /api/progress
components/
  header.tsx          # Sticky nav with language switcher
  course-card.tsx     # Course card
  progress-bar.tsx    # Progress bar
lib/
  i18n.ts             # UI string translations
  data.ts             # Data access layer (Prisma queries)
  prisma.ts           # Prisma client singleton
prisma/
  schema.prisma       # Database schema
  seed.ts             # Demo data seeder
```

## Database schema

`User · Course · CourseI18n · Module · ModuleI18n · Lesson · LessonI18n · Enrollment · Progress`

## Deployment

For production, replace the SQLite `DATABASE_URL` with a PostgreSQL connection string and run `prisma migrate deploy`.

A `Dockerfile` and `docker-compose.yml` are provided for container-based deployments.
