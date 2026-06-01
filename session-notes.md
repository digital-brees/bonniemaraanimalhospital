# Bonnie Mara Animal Hospital — Session Notes

**Client:** Bonnie Mara Animal Hospital (BMAH)
**Owner:** Dr. Laura Putnam — `leputvet@gmail.com`
**Location:** 4860 Calle Real, Santa Barbara, CA 93111
**Domain:** `bonniemaraah.com`
**Opening:** Summer 2026 (date TBD — fire-sprinkler permitting / roadwork pending)
**Hours:** Mon–Fri 8am–6pm, appointments preferred
**Species:** Dogs and cats only

**Status:** Pre-launch splash + dedicated careers page. Actively iterating with Brees. Last big pass: emotional careers page (video hero), site-wide border-radius, blue→cream gradients, JotForm wiring.

---

## Architecture (IMPORTANT — read before editing)

**TWO pages now, sharing one external stylesheet:**
- `index.html` — pre-launch splash (one page)
- `careers.html` — dedicated careers/hiring page
- `assets/css/site.css` — **shared stylesheet, linked by both pages.** Was inline `<style>`; extracted this session. **Gotcha:** `url()` paths inside site.css are relative to the CSS file, so they use `../images/...` (NOT `assets/images/...`). The brick + hiring-teaser backgrounds rely on this.

**Preview:** `python -m http.server 8767` from project root → http://127.0.0.1:8767/ and /careers.html
**Standalone git repo** (own `.git`). GitHub: `digital-brees/bonniemaraanimalhospital`. Vercel: pending first manual import.

---

## Design system (in `:root` of site.css)

- **Fonts:** Outfit (display) + Inter (body/UI). All sans — matches the logo wordmark. No serif.
- **Palette:** `--ink-night #1B2F47` · `--ink-deep #2A4360` · `--ink #3D5A7A` · `--sea #A3BBD2` · `--sea-pale #C9D8E6` · `--mist #EAF0F6` (cool sea-mist) · `--cream #F9F5EE` · `--cream-paper #FFF` · `--paper-line #DDE3EA` · `--muted #4A5868` · `--quiet #7A8696` · `--brick #B86E4A` (now used ONLY on the brick photo, nowhere else — palette is fully cool).
- **Radius tokens:** `--radius: 10px` (buttons, inputs, cards), `--radius-lg: 18px` (feature images, panels). Applied site-wide this session.

**Header (both pages):** fixed; transparent white over the hero → solid navy (`.scrolled`) on scroll (JS toggles at scrollY>80). 3-col grid: logo+"Opening Summer 2026" lockup (left) / centered nav / "Join the list" button (right). Centered via `1fr auto 1fr` grid so nav is true-viewport-centered. On mobile nav + opening hide.
- Splash nav: The name · Services · FAQ · Careers(→careers.html)
- Careers nav: Home(→index.html) · Services · FAQ · Careers(current)

---

## `index.html` — splash structure

**Tide / sticky-hero effect:** `.hero` is `position: sticky; top:0`. Everything after it is wrapped in `<div class="scroll-over">` (z-index 1) so the page scrolls UP over the pinned hero — the "tide coming in" effect. Pure CSS (works regardless of reduced-motion / JS).

1. **Hero** — sticky. Video `assets/video/hero-bmah.mp4` (from `shutterstock_3640401615.mov`), poster `hero-bmah-poster.jpg`. Lead-in "Bonnie Mara Animal Hospital", headline "A *new kind of* animal hospital for Santa Barbara." Bottom: left = "Independently owned, low-stress veterinary care for dogs and cats." / right = address + opening (no pin glyph). Hero scrim = bottom-weighted navy gradient.
2. **Name story** — centered, logo seal-inset cut into the top (centered; do NOT add it to the scroll-reveal selector or its centering transform gets clobbered). Headline "Bonnie Mara, in *two languages.*" Verbatim prose. Signature "Dr. Laura Putnam." Mailing-list signup form (#mailing-list). `.story-rise` wraps the text content.
3. **Brick pull-quote** — two-paw brick photo (`brick-wall.jpg`, ChatGPT-generated). Hero-style overlay (lighter, bottom-weighted) + text-shadow on the quote so the brick/paws read. "Proudly independently owned — *with the time to focus on making each visit a positive one.*"
4. **Services + FAQ** — both wrapped in `.grad-blue-cream` = one continuous **mist→cream** gradient behind both (sections are transparent). Services = split (numbered list + `dog-cat-sleeping.jpg`, rounded). FAQ = single-open accordion, two-column grid, smooth grid-rows animation.
5. **Hiring teaser** — navy band with `hiring-teaser.jpg` (cat + person, Shutterstock) behind a navy scrim. "We're *hiring.*" + roles line + "View open positions" → careers.html.
6. **Invite / contact** — title "We can't wait to *meet you.*" + "Visit us" eyebrow. Address card + closer mailing-list signup (dark card).
7. **Footer** — navy. Logo + "Bonnie Mara Animal Hospital" + "OPENING SUMMER 2026" (sea-pale). Nav + credit "Designed by Digital Empathy". (Tagline "beautiful ocean · Scot's Gaelic" was removed.)

**Removed this session:** dog-on-beach band, "Low-stress, by design" cat band, the "Across from In-N-Out…" location headline + paragraph.

---

## `careers.html` — dedicated careers page

- **Video hero** — `assets/video/careers-hero.mp4` (from `shutterstock_1100516735.mov`, owner comforting pug in exam room, cool-blue tones), poster `careers-hero-poster.jpg`. Eyebrow "Careers · Now hiring · Summer 2026". Title **"Come work where *it's worth it.*"** (verbatim-derived from "makes coming to work each day worth it"). Header transparent→solid like home.
- **Content section** (`.careers.is-page`) — light **mist→cream gradient** spanning the full section (down through the form). "Why work for Bonnie Mara Animal Hospital?" (verbatim heading) + surfaced emotional verbatim copy ("she isn't above… cleaning a cage. We will be a true team", "work isn't your whole life").
- **Roles** — clean **divided list** (NOT boxes), full-width rows w/ hairline dividers, hover slides right. Each role click prefills the form's position dropdown + scrolls to the form.
- **Perks Q&A** — pull-quote "Besides coming to work with an awesome team every day, and *saving lives?*" immediately answered by "We offer competitive wages…" (the verbatim setup→payoff; do NOT strand the question alone).
- **Application form** — shown directly (not gated; it's clearly a careers page). Fields: full name, email, phone, position dropdown, resume upload. Two-column with `careers.jpg` (lab+cat cuddle) beside it.
- Footer same as splash.

---

## Forms — JotForm (account: `digitalempathy`, API key in jotform-integration.md)

Wired via hidden-iframe POST (`<iframe name="jotform-submit">` near `</body>`); `.jf-form` JS swaps in a success message on submit. Notifications → **info@bonniemaraah.com**.

| Form | ID | Fields | Used on |
|---|---|---|---|
| Mailing List | `261485153773463` | q2_email | name-story signup + contact closer signup |
| Careers Application | `261485187097469` | q2_fullName, q3_email, q4_phone, q5_position, q6_resume | careers.html form |

**⚠️ PENDING manual dashboard steps (API can't set these — DE Standard §5):**
1. Both autoresponders → set Sender Name to "Bonnie Mara Animal Hospital" (else mail comes from "JotForm").
2. Both notifications → toggle **Attach PDF** ON.
3. Move both into a BMAH folder if one exists.
4. **`info@bonniemaraah.com` must be a live inbox** to receive notifications.

---

## Copy mode

**Verbatim BMAH-specific.** Local source-of-truth in `assets/copy/{name-story,faqs,careers}.md`. Careers headline "Why work for Bonnie Mara Animal Hospital?" is the verbatim doc heading; hero/quote lines ("Come work where it's worth it", "true team", "saving lives") are verbatim-derived. **Removed the invented "Help us build the hospital we've always wanted to work in" headline** — Brees flagged it as not-her-words.

---

## Lessons captured this session

- **Extracting inline CSS to a file breaks relative `url()` paths** — they become relative to the CSS file. Fixed brick bg to `../images/`. (This caused the brick image to disappear; the "lone favicon 404" was actually this.)
- **Reduced-motion gates ALL scroll motion** (parallax + IntersectionObserver reveals). Brees runs with Reduce Motion ON, so JS scroll effects don't show for her — that's why the JS tide-parallax "didn't move." The fix was a **CSS-only sticky-hero** (works regardless). Use CSS, not JS, for motion she must be able to preview.
- **Don't strand a rhetorical pull-quote** — keep its payoff attached (the "saving lives?" → "We offer…" pairing).
- **Careers as its own page** solved the "applicants' form looks like a client contact box" problem cleanly.
- The seal-inset centers via `transform: translate(-50%,-50%)` — keep it OUT of the scroll-reveal selector or `transform:none` clobbers the centering.

---

## SEO / metadata (DONE this session — launch-ready)

Both `index.html` + `careers.html` now have full launch-grade head metadata:
- **Canonical** URLs (`https://bonniemaraah.com/` and `/careers.html`).
- **Open Graph** (type, site_name, title, description, url, locale, image + width/height/alt) and **Twitter Card** (`summary_large_image`).
- **Favicon links** — `/favicon.ico`, 16/32px PNGs, apple-touch-icon.
- `index.html` only: **JSON-LD `VeterinaryCare`** structured data — name, url, founder (Dr. Putnam), full postal address, areaServed, Mon–Fri 08:00–18:00 hours. (No `telephone` yet — add when phone is known.)

**Assets generated from the logo** via `make_seo_assets.py` (kept in repo root; re-run if logo changes):
- `assets/images/og-bmah.jpg` — branded 1200×630 share card (navy gradient + circle-masked seal + "OPENING SUMMER 2026"). Built with Inter (no Outfit TTF on machine; Inter is the brand body font). Used as og/twitter image on BOTH pages.
- `favicon.ico` (16/32/48 multi-res) + `assets/images/favicon-{16,32,48,180,192,512}.png` + `apple-touch-icon.png` (cream bg). All circle-masked with transparent corners; logo autocropped from its white padding via ImageChops bbox.
- `sitemap.xml` (home priority 1.0 + careers 0.8); `Sitemap:` line added to `robots.production.txt`.

**Still TODO for SEO at launch:** add `telephone` to JSON-LD once phone exists; the real `sitemap.xml` is in place (no longer "pending"). Consider a tighter favicon glyph if 16px legibility matters (current seal is detailed but reads as navy ring + cat/dog).

---

## Responsiveness audit (DONE this session)

Rendered both pages via Playwright at 375 / 768 / 1440 with measured horizontal-overflow checks.
- **Layout is solid:** all multi-column grids (services, qa-list, careers-grid/apply/form, invite-card, address-grid) collapse to 1col at the single `max-width: 920px` breakpoint; header nav + "Opening" lockup hide correctly; mostly `clamp()`-fluid type.
- **Bug found + fixed:** footer `<nav>` (5 uppercase links, `display:flex`, no wrap) overflowed the viewport by **42px at 375px** on BOTH pages → horizontal scroll. Fix: added `footer.site nav { flex-wrap: wrap; gap: 14px 22px; }` to the 920px block. Now wraps to two rows ("The Name · Services · FAQ · Careers" / "Mailing List").
- **Re-verified:** overflowX = 0 at 375/768/1440 on both pages after the fix. Header + footer clips confirmed visually.
- Note: site uses ONE breakpoint (920px). It holds up, but if future polish is wanted, a ≤480px tier could tighten hero/footer spacing further. Not blocking.

---

## Outstanding / pending

- **Phone number** for pre-opening (not in FAQs doc). Also feeds JSON-LD `telephone`.
- **Real BMAH photos** — swap placeholders (hero videos, services image, careers image, hiring-teaser) for real interior/exterior/team photos when available (Drive folder still empty).
- **Hiring-teaser image** (`hiring-teaser.jpg`) shows an identifiable person in scrubs in a clinic — bumps the "no staff faces in clinic settings" media guideline. Brees chose it explicitly for the careers band; flagged for her final call.
- JotForm manual dashboard steps (above).
- ~~Favicon set, OG share image, Schema.org VeterinaryCare data.~~ ✅ DONE (see SEO section above).
- **Launch:** swap `robots.txt` ← `robots.production.txt` (now includes Sitemap line); confirm Vercel + production domain; sitemap.xml live.

---

## Asset inventory (after cleanup)

`assets/images/`: brick-wall.jpg · careers-hero-poster.jpg · careers.jpg · dog-cat-sleeping.jpg · hero-bmah-poster.jpg · hiring-teaser.jpg · og-bmah.jpg · apple-touch-icon.png · favicon-{16,32,48,180,192,512}.png · `logo/logo-page-1.png`
`assets/video/`: careers-hero.mp4 · hero-bmah.mp4
Root: `favicon.ico` · `sitemap.xml` · `make_seo_assets.py` (asset generator)
(Orphans removed this session: dog-beach, cat-sleeping, owner-dog-cuddle, careers-hero.jpg still, santa-barbara-sunrise, ocean-horizon.mp4)
