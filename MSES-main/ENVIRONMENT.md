MSES — Environment & Deployment Checklist

Required environment variables

- `VITE_GA_MEASUREMENT_ID` — GA4 Measurement ID (example: `G-XXXXXXXXXX`).
- `VITE_GSC_VERIFICATION` — Google Search Console verification token.
- `WEB3FORMS_ACCESS_KEY` — Web3Forms API key (server-side secret used by `api/contact.js`).

Local development

1. Copy `.env.example` to `.env` and populate placeholder values for local testing.
2. Run the dev server:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

Production (Vercel)

1. In the Vercel dashboard, open your project → Settings → Environment Variables.
2. Add the three variables above; set the environment to `Production` (and add to `Preview`/`Development` if desired).
3. Build command: `npm run build`
4. Output directory: `dist` (Vercel auto-detects Vite projects).

Verification steps after deploy

- Google Search Console: add `https://www.mses.online` and verify ownership (the meta tag is injected from `VITE_GSC_VERIFICATION`).
- Google Analytics: open GA4 Realtime and trigger site navigation; verify page views and events (phone clicks, contact submits).
- Contact form: submit a test message to confirm email delivery (requires `WEB3FORMS_ACCESS_KEY`).
- Sitemap: submit `https://www.mses.online/sitemap.xml` to Search Console.

Security notes

- Never commit `.env` with secrets. Use Vercel or your host's environment settings.
- `WEB3FORMS_ACCESS_KEY` must remain server-side — do not expose it to client JavaScript.

If you want, I can also add a short README section with these steps or create a Vercel checklist screenshot-ready list.