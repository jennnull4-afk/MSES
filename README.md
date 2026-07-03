# MSES

## Deployment Checklist

- Add these environment variables in Vercel: `VITE_GA_MEASUREMENT_ID`, `VITE_GSC_VERIFICATION`, `WEB3FORMS_ACCESS_KEY`.
- Redeploy after adding them.
- Verify GA4 real-time tracking.
- Verify Google Search Console for https://www.mses.online.
- Submit https://www.mses.online/sitemap.xml to Google Search Console.
- Test the contact form after deployment (requires `WEB3FORMS_ACCESS_KEY`).