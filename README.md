
# CYBER KING TOP-UP — Starter Project

Premium glassmorphism game top-up storefront for MLBB Diamonds, PUBG UC, and other games. Built for Android-friendly editing and deployment to Vercel. Uses Supabase for database/auth and server-side API routes.

## Important payment status
This project does **not** claim to process real payments. Payment methods are shown as **manual payment / pending verification**. An order is not marked paid until an administrator verifies it. Do not collect card numbers or payment PINs.

## Features
- Responsive glassmorphism storefront and animated UI
- Game/product selection and order form
- Supabase-backed orders and catalog
- Admin page for viewing/updating order status (requires Supabase Auth admin allow-list)
- Vercel API routes; Supabase service key stays server-side
- SQL schema and Row Level Security policies

## Setup
1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. Create an admin user in Supabase Auth. Copy that user's UUID.
4. In Supabase SQL Editor, run `supabase/make_admin.sql` after replacing `YOUR_ADMIN_USER_UUID`.
5. Import this folder into a GitHub repository, then import the repo into Vercel.
6. In Vercel Project Settings → Environment Variables, set:
   - `SUPABASE_URL` = project URL
   - `SUPABASE_ANON_KEY` = anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (server-side only; never put it in frontend code)
7. Redeploy.
8. Open `/admin.html` and sign in with the admin account.

## Local preview
Because API routes need a server runtime, use Vercel CLI (`vercel dev`) or deploy to Vercel. Opening `index.html` directly will render the UI but database actions will not work.

## Security notes
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in Vercel environment variables.
- Never disable RLS or expose the service-role key in browser code.
- Admin API checks Supabase Auth user and `admins` table membership.
- This is a starter project; before public launch add rate limiting, abuse protection, order expiry, audit logs, and verify your local legal/payment requirements.
