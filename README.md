# Tierra Origen Prestige Capital

Investment platform for Colombians in Spain to invest in income-producing real estate in Colombia. Built with Next.js 14, Tailwind CSS, and Wix Headless.

## Structure

- **Homepage** – Hero, how it works, two investment paths, security, returns & fees, CTA
- **Full ownership** (`/full-ownership`) – For legal residents in Spain
- **Fractional** (`/fractional`) – For Colombians in regularization process
- **Sign up** (`/signup`) – Unified application flow (account → KYC → investment preference) → Pending approval
- **Dashboard** (`/dashboard`) – Investor overview (placeholder; Wix-backed data in later stage)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   - A `.env.local` file is included with your Wix Client ID, Account ID, and Site ID. **Paste your Wix API key** into `WIX_API_KEY` (from [API Key Manager](https://manage.wix.com/account/api-keys)). For a fresh setup, copy `.env.local.example` to `.env.local` and fill in:
     - `WIX_CLIENT_ID` – OAuth app client ID (Headless settings)
     - `WIX_API_KEY` – API key from [API Key Manager](https://manage.wix.com/account/api-keys)
     - `WIX_ACCOUNT_ID` – Your Wix account ID
     - `WIX_SITE_ID` – Your Wix site/project ID (optional for some APIs)

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Deploy to Vercel**
   - Push the project to a Git repository (e.g. GitHub)
   - Import the repo in [Vercel](https://vercel.com) and add the same env vars in Project Settings → Environment Variables
   - Deploy

## Wix Headless

- Server-side data is available via `getWixClient()` in `src/lib/wix.ts` (API key auth). Use it in Server Components or API routes to read/write Wix CMS collections.
- For member login and dashboard persistence, add Wix OAuth (client ID) and visitor/member tokens in a later stage.

## Tech

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- @wix/sdk, @wix/data for Wix Headless
