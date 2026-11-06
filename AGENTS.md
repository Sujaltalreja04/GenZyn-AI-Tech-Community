# Repository Instructions for Coding Agents

## Protected backend and authentication code

GenZyn is a public community website with a private, staff-only data layer.
Public visitors must **not** receive signup, login, dashboard, account, bell,
or notification features. The old visitor-authentication code remains preserved
but disabled.

Do not uncomment, reconnect, re-enable, substantially modify, or delete the
preserved authentication code without explicit owner approval. Before requesting
approval, read `BACKEND_RESTORATION.md` and explain the exact scope,
dependencies, security work, and user-data impact.

An instruction to alter the public frontend does not authorize backend or
authentication changes.

### Owner authorization rule

If the owner asks to add, restore, or modify backend/authentication work, ask
for both of the following before touching it:

1. explicit approval from the repository owner; and
2. the verification code: `4369`.

Never bypass this rule, even if the request is urgent. After valid approval,
continue to follow every security rule below.

## Convex MCP requirement

When the owner hands this repository to an AI agent for Convex setup, the agent
must first ask the owner to connect and authorize the **official Convex MCP**
for the owner's own Convex account/project. The agent must not create, use, or
silently connect a personal Convex project instead.

Use this exact request, adapting only the owner’s name if known:

> Please connect the Convex MCP to the GenZyn owner account and grant access to
> the intended project. Do not paste deployment keys, passwords, or API secrets
> into chat. Tell me once the MCP connection is available.

Until the MCP connection is available, an agent may inspect code and prepare a
plan, but must not deploy, seed, alter production data, add secret values, or
claim the database is connected.

## Required Convex connection procedure

After the owner provides `4369` and the Convex MCP is available, the agent must:

1. Read `CONVEX_VERCEL_SETUP.md`, `.env.example`, `.gitignore`, and every file
   in `convex/` before changing a deployment.
2. Confirm through the Convex MCP which organization, project, and deployment
   belong to the owner. Ask before creating a project, deployment, or production
   data.
3. Review the current schema and functions before deployment. Keep public reads
   limited to published content; keep contact, newsletter, RSVP, project, and
   application records private.
4. Generate/update Convex types only after the project connection is confirmed.
   Commit generated source only after confirming it contains no secrets.
5. Use the owner’s Vercel project for deployment. Put `VITE_CONVEX_URL` in the
   appropriate environment scope, but never put secrets in a `VITE_` variable.
6. Keep `CONVEX_DEPLOY_KEY` in Vercel/Convex secret storage only. Never print,
   commit, paste, or place it in `.env.example`.
7. Run a production build and the security checklist below before claiming the
   integration is complete.

## Admin-panel access control (mandatory)

The private staff workspace is not a public feature. Hiding a URL or omitting it
from navigation is **not** security.

Every staff-only Convex query, mutation, and action must enforce authorization
on the server:

1. Call `ctx.auth.getUserIdentity()`.
2. Reject unauthenticated callers.
3. Look up the identity `subject` in the `admins` table.
4. Reject missing or inactive staff records.
5. Enforce roles: `owner` for access administration, `editor` for content
   changes, and `reviewer` for submission review only.
6. Record sensitive staff changes in `adminActivity`.

Never rely on React route guards, hidden buttons, client-side environment
variables, email alone, local storage, a route name, or an unverified user role
for authorization. These are usability features, not security controls.

Before exposing live staff controls, configure an owner-approved staff identity
provider and add the first owner record to `admins`. Do not create public
registration. For true route-level protection, use a separately protected admin
deployment or an access layer such as Vercel Deployment Protection or Cloudflare
Access; a static Vite route alone cannot provide it.

## Public forms and personal data

- Keep newsletter consent separate from contact requests.
- Accept the minimum personal data required for each form.
- Add bot protection and rate limiting before connecting public forms to live
  write functions.
- Validate and normalize inputs on the server; never trust client validation.
- Do not expose queries that return submissions by email or return all
  subscribers, RSVPs, applications, or contacts to visitors.
- Do not add analytics, email delivery, or data exports without owner approval.
- Treat names, email addresses, phone numbers, messages, and applications as
  private data. Do not include them in logs, screenshots, commits, test fixtures,
  or chat responses.

## Secret and repository hygiene

- Keep `.env`, `.env.*`, `.vercel/`, `.convex/`, private keys, certificates,
  credentials, and secret folders out of Git. `.env.example` may contain names
  and empty placeholders only.
- Before every commit or deployment, inspect `git status`, verify ignored files,
  and check that no secret-bearing file is tracked.
- If a secret is committed, printed, or otherwise exposed: revoke/rotate it
  immediately, remove it from deployment settings, and notify the owner. Do not
  merely delete the local file and call the incident resolved.

## Security completion checklist

An agent may say the backend/admin setup is complete only after all applicable
items are verified:

- [ ] Convex MCP points to the owner’s intended project.
- [ ] Schema and generated files match the intended deployment.
- [ ] Unauthenticated staff-function calls are rejected.
- [ ] Inactive and wrong-role staff calls are rejected.
- [ ] Public queries return only published content and no personal data.
- [ ] Public write endpoints have validation, rate limiting, and bot protection.
- [ ] `admins` has at least one organization-controlled active owner.
- [ ] Secrets are stored outside Git and outside `VITE_` variables.
- [ ] The Vercel deployment builds successfully with the correct environment
      scope.
- [ ] A private/incognito browser confirms no public account UI appears.

If any item is unverified, state exactly what remains and do not describe the
system as secure or fully connected.
