# AGENTS.md — BrightNest Cleaning demo

Static portfolio-demo site (fictional US residential cleaning company, all content in **English**). Plain HTML5 + CSS3 + vanilla JS. **No build step, no dependencies, no backend, no package manager.**

## Run / view

- Open `index.html` directly in a browser, or serve with `python3 -m http.server 8000`.
- There is no lint/test tooling. Minimum verification: `node --check js/main.js`.

## Structure

- `index.html` — all content and copy; every icon/illustration is inline SVG (no image files, no icon CDN).
- `css/styles.css` — design tokens (colors, fonts, radii, shadows) live in `:root` at the top; change colors there, not inline.
- `js/main.js` — one IIFE, loaded with `defer`: mobile nav, scroll effects, reveal animations, counters, demo form.

## Demo-only by design (do not "fix" these)

- The contact form must **never** actually send data: it validates locally and shows an explicit "nothing was sent" success panel. No backend, no fake network delay, no external form services.
- Testimonials are fictional and must keep their visible demo markers: the disclaimer under the heading, each "Demo review" badge, plus the top banner and footer statement that the company is fictional.
- Phone, email, stats and prices are invented placeholder content. Don't add tracking, analytics, or paid third-party services.

## Gotchas

- Anchor IDs `#home #services #about #testimonials #contact` are referenced by the header nav, footer, skip link, CTA buttons and the active-link JS (`main.js` maps nav `href`s to section IDs). Renaming an ID breaks all of them at once.
- Reveal animations hide `[data-reveal]` elements only under `html.js` + `prefers-reduced-motion: no-preference` (see `css/styles.css`). Keep the `.js` gate (set by the inline script in `<head>`) so content stays visible with JS disabled.
- Stat counters ship their **final value in the HTML** (no-JS fallback); JS resets to 0 and animates only when scrolled into view. Don't change HTML values back to `0`.
- Breakpoints: 860px (mobile nav panel + hamburger), 900px, 640px, 480px. The sticky header offset for anchor jumps is `scroll-padding-top` on `html`.
- All animations/transitions must respect `prefers-reduced-motion` (there is a global kill-switch media query at the end of `styles.css`).
- Only external request is Google Fonts (free); system-font fallback keeps the site fully usable offline. Keep it that way.
- The owner communicates in Spanish; user-facing site content stays in English.
