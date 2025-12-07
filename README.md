# Swagger AI Agent (TypeScript / Playwright mapping)

This repository contains a TypeScript implementation scaffold for the Swagger AI Agent architecture. It is an incremental project: start with the in-memory implementation and move to DB-backed persistence and real LLM providers later.

Quick start

1. Install dependencies

```powershell
npm install
```

2. Run in development mode

```powershell
npm run dev
```

3. Run tests

```powershell
npm test
```

Environment variables

- Copy `.env.example` to `.env` and set secrets such as `OPENAI_API_KEY` if needed.
- `LLM_PROVIDER` can be `none`, `openai`, or `azure` (adapters planned).
- `PERSISTENCE` can be `inmemory` or `mongo`.

Project layout

See `src/` for layers (`domain`, `application`, `infrastructure`, `api`, `core`, `generation`).

Contributing

Open PRs for small, well-scoped changes. Keep controllers thin and add unit tests for use-cases.
