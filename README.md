# QuizMaster Frontend

Vue 3 single-page application for the QuizMaster online exam platform. Provides separate admin and student dashboards, a public landing page, and the full exam-taking flow.

Live site: https://quizmaster.showcaseproject.my.id

## Stack

- Vue 3, TypeScript, Vite, Pinia, Vue Router
- Tailwind CSS v4
- shadcn-vue components

## Features

- Public landing page with platform overview
- Admin dashboard: categories, exams, questions, students, results
- Student dashboard: exam enrollment, timed exam UI, score review, leaderboard
- JWT auth with role-based routing

## Environment variables

Create a local `.env` file. Do not commit it.

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8080/api` | Backend API base URL (dev) |
| `VITE_DEV_SKIP_AUTH` | `false` | Set to `true` to bypass auth with mock data in dev |

In production, leave `VITE_API_URL` empty so requests go to same-origin `/api` via nginx.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default. Requires the backend running on port 8080.

## Production build

```bash
VITE_API_URL= VITE_DEV_SKIP_AUTH=false npm run build
```

Output goes to `dist/`.

## Project structure

```
src/
├── components/   UI primitives, brand elements, layouts
├── views/        Pages (admin, student, auth, landing)
├── lib/          API client, utilities
├── stores/       Pinia stores (auth)
└── router/       Route definitions and guards
```

## Production

Server path: `/opt/quizmaster/frontend/dist`

nginx serves the built files and proxies `/api` to the backend.

## CI/CD

Required GitHub repository secrets: `DEPLOY_SSH_KEY`, `VPS_HOST`, `VPS_PORT`, `VPS_USER`

Pushes to `main` build the app and rsync `dist/` to the VPS.
