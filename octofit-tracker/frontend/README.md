# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces. The
frontend uses this value to build API URLs like:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs with:

```js
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to
`http://localhost:8000` instead of creating an `https://undefined-8000...` URL.

## Scripts

```bash
npm run dev
npm run build
```
