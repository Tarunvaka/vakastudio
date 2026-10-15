# vakastudio.com

React site for Vaka Studio, prerendered to static HTML and served by Cloudflare Pages, plus one Pages Function for app waitlists.

```
src/design/          React components GENERATED from the design project (do not edit; re-import)
src/routes.jsx       every page: URL, output file, title, description
src/entry-server.jsx renders a page to HTML at build time
src/entry-client.jsx hydrates the page in the browser (FAQ toggles, waitlist form)
src/waitlist.js      the waitlist form's submit handler (POST /api/waitlist)
src/styles.css       global styles and the self-hosted Bricolage Grotesque font
src/apps.json        every app: slug, name, status ("soon" | "live"), App Store link
functions/api/       POST /api/waitlist (D1 binding DB); open for every app with status "soon"
scripts/import-design.mjs  design .dc.html files -> src/design/*.jsx
scripts/prerender.mjs      writes dist/<page>.html and sitemap.xml after the Vite builds
```

## Commands
```bash
npm install
npm run dev            # Vite dev server (pages only, no waitlist API)
npm run preview        # full build + local Cloudflare server with the waitlist API on :8788
npm run db:local       # create the local waitlist tables (once)
npm run build          # dist/ ready to publish
npm run deploy         # build and publish from this machine
npm run waitlist       # read the live waitlist
```

## Updating the design
1. Download the design project's `.dc.html` files into `../design-import/`.
2. `npm run import-design` regenerates `src/design/`.
3. `npm run preview`, check, then commit and push.

## Publishing
Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to Cloudflare Pages.
It needs the repository secret `CLOUDFLARE_API_TOKEN` (a Cloudflare API token with "Cloudflare Pages: Edit").

Design rule: nothing moves unless the visitor clicks or scrolls.
