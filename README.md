# Brookhaven Wellness + Aesthetics — Website

Marketing website for BWA, opening Q4 2026 in Town Brookhaven, Suite 1220, Atlanta GA.

## Structure

```
bwa-website/
├── index.html       # Main site
├── styles.css       # All styles (CSS variables, responsive)
├── script.js        # Interactivity (sidebar nav, scroll effects, form)
└── README.md
```

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `brookhaven-wellness-website`)
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch** → `main` → `/ (root)`
4. Your site will be live at `https://[your-username].github.io/[repo-name]/`

### Custom Domain (when ready)
1. In **Settings → Pages → Custom domain**, enter your domain (e.g. `brookhavenwellness.com`)
2. Add a CNAME record with your DNS provider pointing to `[your-username].github.io`
3. Check **Enforce HTTPS**

## Sections

- **Hero** — Full-bleed forest green with headline and CTA
- **Services** — Left-sidebar navigation (Ovme-style) with 6 service panels
- **Philosophy** — Brand pillars with card grid
- **Membership** — 3-tier pricing (Essential $149 / Signature $299 / Longevity $599)
- **About** — Founder story + clinic stats
- **Contact** — Inquiry form (currently front-end only — wire to Formspree or similar for production)

## Form Integration (Formspree — free tier)

Replace the form's submit handler in `script.js` with:

```js
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  // show success...
});
```

Sign up at [formspree.io](https://formspree.io) — free tier handles 50 submissions/month.

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--cream` | `#F5F0E8` | Page background |
| `--forest` | `#1C3028` | Primary dark / nav |
| `--gold` | `#B8975A` | Accent / CTAs |
| Cormorant Garamond | Google Fonts | Display / headings |
| Jost | Google Fonts | Body / UI |

## Next Steps

- [ ] Add real photography (hero, team headshots, space renders)
- [ ] Connect contact form to Formspree or Netlify Forms
- [ ] Add Google Analytics / Meta Pixel
- [ ] Add `/blog` for SEO content
- [ ] Set up custom domain when `brookhavenwellness.com` is registered
- [ ] Add booking widget (Jane App, Vagaro, or Zenoti embed)
