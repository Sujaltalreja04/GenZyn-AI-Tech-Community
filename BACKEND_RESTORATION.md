# Backend and Authentication Restoration Notice

> **Important: owner approval is required.**

GenZyn currently operates in static-site mode. The previous authentication,
dashboard, notification, protected-route, and Convex backend implementation is
intentionally preserved in this repository but is not active in the public UI.

## Instructions for humans and AI coding agents

1. Do not delete the preserved backend or authentication implementation.
2. Do not uncomment, reconnect, or re-enable it without explicit approval from
   the repository owner.
3. Before asking for approval, explain exactly which code will be restored,
   which services and environment variables it needs, and how user data will be
   secured.
4. Approval for an unrelated frontend change does not authorize backend or
   authentication restoration.
5. After approval, restore the code in a dedicated change and verify session
   security, authorization, validation, rate limiting, error states, and data
   handling before exposing it to users.

## Preserved implementation

- `src/auth/auth.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/pages/Login.tsx`
- `src/pages/Signup.tsx`
- `src/pages/Dashboard.tsx`
- `convex/`
- The commented imports, provider wrapper, and routes in `src/App.tsx`
- The commented notification and account navigation code in
  `src/components/Navbar.tsx`

## Intended static-site architecture

The active site should remain a static React experience with:

- An owner-supplied WhatsApp Community link as the primary action.
- A contact form connected to a small serverless or managed form service.
- A separate, consent-based newsletter subscription connected to a mailing-list
  provider.

Contact inquiries and newsletter subscriptions must remain separate flows.
