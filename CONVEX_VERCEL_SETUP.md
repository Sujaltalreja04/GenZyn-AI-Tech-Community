# Connect GenZyn to Convex and Vercel

This guide is written for the site owner. You do **not** need to understand the code to follow it.

## What this connection does

Convex becomes the private place where GenZyn stores and manages:

- events, projects, blog posts, resources, and bootcamps;
- contact messages and newsletter consent;
- event RSVPs, project submissions, and applications;
- staff-only review decisions and an activity history.

The public website remains a normal React/Vite website on Vercel. Visitors do **not** receive a sign-up or login area. The private staff workspace is deliberately not linked in public navigation.

> Important: a value starting with `VITE_` is visible to website visitors. The Convex URL may be public. A deploy key, password, API secret, or staff allow-list must never be placed in a `VITE_` variable.

## Before you begin

You need:

1. Access to the GenZyn Git repository.
2. The email account that should own the Convex project.
3. Access to the GenZyn project in Vercel.
4. Node.js installed on the developer computer (Node 20 or newer is recommended).

Keep this file private if you later add your own deployment names, emails, or secret values to it.

## Part 1 — Create the Convex account and project

1. Open [Convex](https://www.convex.dev/) and choose **Sign up**.
2. Sign in with the owner’s email address. Use an organization-owned email if possible, not a personal developer email.
3. Create a new project. A clear name is `genzyn-community`.
4. Choose a development deployment when Convex asks. Convex will give you a URL similar to:

   ```text
   https://your-project.convex.cloud
   ```

5. Copy that URL somewhere safe. It is the value used for `VITE_CONVEX_URL` later.

Do not share any deployment key in chat, commit it to Git, or paste it into a React file.

## Part 2 — Link the developer copy of the site

1. Open the GenZyn project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the Convex setup command:

   ```bash
   npx convex dev
   ```

4. The first time it runs, Convex opens a browser page. Choose the project created in Part 1.
5. Leave the command running until it reports that the schema/functions were pushed. You can stop it with `Ctrl + C` once the first upload finishes.

This step creates the generated Convex files that connect the checked-in database code in the `convex` folder to the client’s own Convex project. The developer should commit the generated `convex/_generated` type files after checking that they contain no secrets. The local deployment selection and any secret values must not be committed to Git.

## Part 3 — Add the local website setting

1. At the top level of the project, make a copy of `.env.example` called `.env.local`.
2. Open `.env.local`.
3. Set the Convex URL you copied earlier:

   ```dotenv
   VITE_CONVEX_URL=https://your-project.convex.cloud
   ```

4. Save the file and restart the local website command if it is running:

   ```bash
   npm run dev
   ```

5. Visit the private staff address provided by the site owner (or the local address Vite shows). You should see a message that the Convex URL is configured.

Seeing that message confirms the public URL is available to the website. It does **not** grant anyone staff access.

## Part 4 — Set up staff-only access before using admin data

The `admins` database table is an allow-list. Convex staff functions reject every request unless both conditions are true:

1. the person has a verified identity from your selected staff identity provider; and
2. their identity subject is listed in `admins` with `isActive: true`.

Recommended policy:

- Use one organization-controlled identity provider for staff (for example, Google Workspace restricted to approved email addresses).
- Give the site owner the `owner` role.
- Use `editor` for people who publish/update content.
- Use `reviewer` for people who only review messages, RSVPs, and applications.
- Do not create a public registration option.

The current implementation purposely does not contain a public login or signup screen. Before live staff data is enabled, your developer must connect the chosen staff identity provider to Convex and insert the first owner allow-list record. This is a security step, not a cosmetic setting: a hidden URL by itself does not protect data.

After the first owner exists, the owner can add or deactivate other staff records. Record the staff email, identity subject, role, and activation state. Never make a Convex mutation public just to avoid this access-control step.

## Part 5 — Add environment variables in Vercel

1. Open [Vercel](https://vercel.com/) and select the GenZyn project.
2. Open **Settings** → **Environment Variables**.
3. Add this variable for **Production**, **Preview**, and **Development** as appropriate:

   | Name | Value | Safe to expose? |
   | --- | --- | --- |
   | `VITE_CONVEX_URL` | Your `https://…convex.cloud` URL | Yes, it is a deployment address. |

4. For production deployment from Vercel, create a Convex deploy key in the Convex dashboard and add:

   | Name | Value | Safe to expose? |
   | --- | --- | --- |
   | `CONVEX_DEPLOY_KEY` | The key from Convex | **No. Keep it secret.** |

5. Save the variables.

`CONVEX_DEPLOY_KEY` has no `VITE_` prefix. That is essential: Vercel uses it while building; browsers must never receive it.

## Part 6 — Configure the Vercel deployment

The included `vercel.json` already sends direct links such as event and blog pages to the React app correctly.

In Vercel → **Settings** → **Build and Deployment**, use:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npx convex deploy --cmd "npm run build"` |
| Output directory | `dist` |

Then select **Deployments** → **Redeploy**. Vercel will deploy Convex first, give the Vite build the deployment URL, and publish the updated static site.

## Part 7 — Test safely

After deployment, test these separately:

1. Open the home page in a private/incognito browser. Confirm no account, dashboard, or notification UI is visible.
2. Open a public content page. Confirm only published events/projects/posts appear.
3. Submit one test contact message and one newsletter address using an address you control.
4. As a staff owner, confirm the submissions appear only in the staff review area.
5. Change the test submission to `in review`, then `closed`, and confirm the activity is recorded.
6. Unsubscribe the newsletter test address and confirm its status changes without deleting the consent history.
7. Try the staff endpoint without staff identity. It must be rejected.

## Ongoing maintenance

- Publish events, projects, blog posts, resources, and bootcamps from the staff workspace.
- Keep older events visible as archived/past content if desired; do not duplicate them.
- Review contact messages, RSVPs, and applications regularly.
- Export newsletter data only to a legitimate mail provider and retain proof of consent.
- Remove staff access immediately when someone leaves the team.
- Rotate the Convex deploy key if it is ever copied into an unsafe place.

## If something goes wrong

| Problem | First thing to check |
| --- | --- |
| The site says Convex is not connected | Check that `VITE_CONVEX_URL` is present, starts with `https://`, and the site was redeployed after adding it. |
| Vercel build fails at the Convex step | Confirm `CONVEX_DEPLOY_KEY` is a Vercel environment variable, has no `VITE_` prefix, and belongs to the right Convex project. |
| A staff member sees “not authorized” | Confirm their identity provider subject matches an active record in `admins`; email alone is not enough. |
| A visitor can see staff data | Disable the affected deployment/function immediately and ask the developer to review the authorization check before re-enabling it. |
| Forms receive spam | Do not connect public forms until bot protection (such as Turnstile) and rate limiting are configured. |

## Files prepared in this repository

- `convex/schema.ts` — the database structure.
- `convex/content.ts` — safe public reads of published content.
- `convex/submissions.ts` — separate contact, subscriber, and RSVP writes.
- `convex/admin.ts` — staff-only queries and review status changes.
- `src/pages/Admin.tsx` — the unlinked staff workspace UI.
- `.env.example` — the public Convex URL placeholder.
- `vercel.json` — React direct-link routing for Vercel.
