# GenZyn Tech Community

GenZyn is a React and TypeScript community platform built with Vite.

## Requirements

- Node.js 20 or newer
- npm

## Local development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

The app is configured to run at:

```text
http://localhost:5000
```

Vite is required for local development because it transforms the TypeScript and TSX source files before the browser loads them. Do not use `python -m http.server`, `http-server`, or another static server against the repository root; those servers return `src/main.tsx` as a static file and the browser will show a blank page because it cannot execute raw TSX.

If port 5000 is already in use, stop the existing process and restart Vite:

```powershell
Get-NetTCPConnection -LocalPort 5000 -State Listen
Stop-Process -Id <PID>
npm run dev
```

## Production preview

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

The preview server also runs at `http://localhost:5000`.

Vite emits hashed JavaScript assets, including the deferred 3D chunk. Production hosting should serve `/assets/*` with `Cache-Control: public, max-age=31536000, immutable` and keep `index.html` revalidated. This lets the browser's HTTP cache reuse the 3D bundle after the first visit without storing executable code in `localStorage` or `sessionStorage`.

## Checks

```bash
npm run build
npm run lint
```

## Icons

The application uses [`iconoir-react`](https://iconoir.com/) for interface and social icons. Iconoir is an MIT-licensed open-source icon library; all icon imports are centralized in [`src/components/icons.tsx`](./src/components/icons.tsx) so the visual system can be updated consistently. The unused starter SVG assets were removed, and no Lucide or hand-authored social SVG icons remain in the application source.

## Backend

The repository includes Convex function definitions under [`convex/`](./convex). Connecting those functions requires the repository owner to configure a Convex deployment and its environment variables. No credentials or deployment-specific values should be committed to this repository.

## Authentication integration

The frontend authentication flow is implemented in [`src/auth/auth.tsx`](./src/auth/auth.tsx). It expects a backend that owns password hashing, user lookup, session creation, cookie management, and authorization.

Required endpoints:

| Method | Endpoint | Expected response |
|---|---|---|
| `GET` | `/api/auth/session` | `{ "data": { "user": null | { "id": "...", "name": "...", "email": "..." } } }` |
| `POST` | `/api/auth/signup` | `{ "data": { "user": { ... } } }` |
| `POST` | `/api/auth/login` | `{ "data": { "user": { ... } } }` |
| `POST` | `/api/auth/logout` | `2xx` and an expired session cookie |
| `GET` | `/api/notifications` | `{ "data": { "notifications": [...] } }` |
| `POST` | `/api/notifications/:id/read` | `2xx` |

The browser sends requests with `credentials: "include"` so the backend can use a `Secure`, `HttpOnly`, `SameSite` session cookie. The frontend deliberately does not store passwords, user IDs, access tokens, or session tokens in localStorage, sessionStorage, or readable cookies.

The backend must:

- Hash passwords with Argon2id or bcrypt and compare hashes server-side.
- Use opaque, random, expiring session tokens stored server-side.
- Set the session cookie as `HttpOnly`, `Secure` in production, and an appropriate `SameSite` value.
- Return generic login errors so account existence is not disclosed.
- Validate input, rate-limit authentication endpoints, and enforce authorization for dashboard and notification resources.
