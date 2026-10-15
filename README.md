# vakastudio.com

Static site for Vaka Studio on Cloudflare Pages, plus one Pages Function for app waitlists.

```
src/apps.json        every app: slug, name, tagline, icon, status ("soon" | "live"), App Store link
src/pages/           pages; x/index.html is served at /x (no trailing slash)
src/partials/        shared markup (head, nav, footer, LastMark sections)
src/assets/          site.css, site.js, theme.js, images
functions/api/       POST /api/waitlist (D1 binding DB); open for every app with status "soon"
migrations/          D1 schema
scripts/frame.py     puts simulator screenshots into Apple's iPhone frame
build.mjs            src -> dist (fills partials, apps grid, closing cards, sitemap)
```

```bash
npm install
npm run db:local      # create the local waitlist tables (once)
npm run dev           # build + serve on http://localhost:8788
npm run waitlist:local
npm run deploy        # build and publish to Cloudflare Pages (run `npx wrangler login` once first)
npm run waitlist      # read the live waitlist
```

## Adding an app
1. Add an entry to `src/apps.json` with `"status": "soon"`. The home and studio "Our apps" grids and the waitlist pick it up.
2. Copy `src/pages/lastmark/` to `src/pages/<slug>/` (landing, support, privacy) and edit the copy. Use `<!-- @get <slug> -->` for the closing card.
3. Screenshots: capture from the simulator, then `scripts/frame.py` (see its header).
4. Launch day: set `"status": "live"` and `"appStore"`. Every waitlist card for that app becomes an App Store button.

Design rule: nothing moves unless the visitor hovers, clicks or scrolls.
