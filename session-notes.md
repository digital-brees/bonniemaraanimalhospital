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

## ⭐ BRANCH MODEL (read first — set 2026-06-23)

There are intentionally **TWO versions of this site, on two branches:**

1. **`main` = THE LIVE SITE.** Home-page splash only, with **careers removed** ("Opening Summer 2026" band, no Careers nav). Deployed to production (`bonniemaraah.com`); auto-deploys from `main`. **Leave it as-is — do not push the full site here until approved to go live.** NOTE: `main` is AHEAD of this branch on the homepage — it has later work (SEO meta, a11y `<main>` landmark, footer/Google-Maps links, the "Opening Summer 2026" band) committed after `staging` split off.
2. **`staging` = THE FULL MULTI-PAGE SITE (work-in-progress, NOT live).** Where we build out the real site. Gets a Vercel **preview** URL only, never production. **You are here.** Branched from `main` at `3d40764` (before the "stop hiring" pivot), so its `index.html`/nav still include careers — **needs reconciling** (see Tomorrow).

**`staging` pages (all present + backed up to `origin/staging` as of 2026-06-23):**
`index.html` · `careers.html` · `contact.html` · `wellness.html` · `surgery.html` · `dentistry.html` · `diagnostics.html` · `end-of-life.html`
- wellness + contact came from commit `8a98f7d` (also added nav-v2: dropdowns + mobile menu).
- 4 service pages came from commit `15893d5` ("WIP: service pages") — **local-only until today**; pushed to `origin/staging` 2026-06-23 so they're safe.

**Eventual flow:** finish full site on `staging` → reconcile with main's "no careers" decision → merge `staging` → `main` to go live.

### 2026-06-23 session — what happened
- Found the wellness/contact/service pages weren't lost — they live on `staging`, which had diverged from `main`. Pushed the local-only WIP service-page commit to GitHub to back it up.
- Verified all 8 pages render correctly via Playwright (0 console errors; proper nav/hero/body). Screenshots in `.playwright-cli/` (gitignored).
- **GOTCHA logged:** after `git checkout` between branches, the browser serves the **cached `site.css` from the old branch** → pages look "unstyled / messed up." NOT a real CSS bug. Fix: hard-refresh (Ctrl+Shift+R) or, more reliably, open in an **incognito window** (ignores cache). Pages were fine the whole time.

### 2026-06-29 session — homepage sync + service-page polish (on `staging`, w/ Brees)
- **Careers DROPPED everywhere (Brees decision).** Mirrored live `main`'s "no longer hiring" pivot onto the full site: removed the `<a href="careers.html">Careers</a>` footer link from ALL 8 pages (index, careers, contact, wellness, surgery, dentistry, diagnostics, end-of-life). `careers.html` stays in the repo but is now **unlinked/orphaned** (no page links to it). Top nav never had Careers, so nothing to change there.
- **Homepage synced to main's content decisions.** Staging's `index.html` `<head>` already matched main's (full SEO meta/OG/JSON-LD). Replaced staging's old **"We're hiring →"** band (`id="careers"`, button → careers.html) with main's **"Opening Summer 2026"** band (`id="opening"`, eyebrow "Coming soon", lede naming Santa Barbara/Goleta/Montecito/**Summerland**/Carpinteria, button "Join the list" → `#mailing-list`). KEPT staging's nav v2 (dropdowns + mobile menu) + `site.js` — those are the full-site enhancements main lacks. Net: homepage now reflects the live no-hiring decision while keeping the multi-page nav.
- **All 4 service pages validated (Playwright) — clean:** surgery/dentistry/diagnostics/end-of-life each have 0 horizontal overflow at 375/768/1440, exactly 1 `<h1>`, NO heading-level skips, 0 missing-alt, 0 broken images, `<main id="main">` + skip link present, 0 console errors. They were far more built-out than the "WIP" label implied — each has a bespoke, **fully-styled** layout (`sg-*` surgery / `dn-*` dentistry / `dx-*` diagnostics / `eol-*` end-of-life — all classes confirmed present in site.css) with real verbatim-style DE service copy.
- **Media-rule fix — surgery hero.** It was reusing `careers-hero-poster.jpg`, which shows a **staff face in-clinic** + a **dog mouth-open indoors** (violates 2 CLAUDE.md image rules). Swapped to the compliant **`brick-wall.jpg`** (paw-in-brick; echoes the homepage motif) as an interim placeholder. Hero `<img>` + `<link rel=preload>` both updated.

### ▶ NEXT — pick up here (on `staging`)
- **Hero imagery still placeholder on all 4 service pages** (dentistry=`dog-cat-sleeping.jpg` ✅compliant, end-of-life=`hero-bmah-poster.jpg` ✅compliant outdoor run, diagnostics=`careers.jpg` ⚠️held dog mouth slightly open indoors — borderline, surgery=`brick-wall.jpg` interim). **Ask Brees if she wants real/licensed surgery + diagnostics photography** (per CLAUDE.md, don't pull new Shutterstock without her ask). Drive photo folder still empty.
- **Other placeholder pages to build:** `team.html`, `payment-options.html` (both linked in nav but will 404).
- Still-open content confirmations (unchanged): real Instagram URL, main phone (`000-000-0000` placeholder), confirm 805-819-7333 is voice or text-only.
- Wire a **Vercel preview URL** for `staging` so Brees has a shareable non-live link.
- Preview locally: `python -m http.server 8767` from project root.

**Latest edits (2026-06-04):**
- Footer credit "Designed by Digital Empathy" now links to `https://digitalempathyinc.com` (new tab) on BOTH index.html + careers.html. Styled `.bottom .credit a` in site.css (inherits italic credit, subtle underline → sea-pale on hover).
- Both addresses in index.html now hyperlink to Google Maps **directions** (`maps/dir/?api=1&destination=4860+Calle+Real...`), new tab, with aria-labels. Hero `.right` address = underlined link; "Visit us" contact card `.address` = clickable block with a "Get directions →" affordance. Styled `.address .addr-link` + `.hero-row .right .addr-link` in site.css. careers.html has no visible address (unchanged).

---

## Architecture (IMPORTANT — read before editing)

**TWO pages now, sharing one external stylesheet:**
- `index.html` — pre-launch splash (one page)
- `careers.html` — dedicated careers/hiring page
- `assets/css/site.css` — **shared stylesheet, linked by both pages.** Was inline `<style>`; extracted this session. **Gotcha:** `url()` paths inside site.css are relative to the CSS file, so they use `../images/...` (NOT `assets/images/...`). The brick + hiring-teaser backgrounds rely on this.

**Preview:** `python -m http.server 8767` from project root → http://127.0.0.1:8767/ and /careers.html
**Standalone git repo** (own `.git`). GitHub: `digital-brees/bonniemaraanimalhospital`.

### Branch + preview workflow (set up & verified 2026-06-17) — BUILD NEW PAGES HERE
- **Branches:** `main` = production (auto-deploys live). **`staging` = background build branch.** Build all new/in-progress pages on `staging`; never commit WIP to `main`.
- **Promote when ready:** merge `staging → main` (PR or direct) — that merge is the ONLY thing that puts work on the live site.
- **Preview deployments (EMPIRICALLY VERIFIED):** pushing `staging` triggers a Vercel **Preview** deployment (GitHub deployment env = "Preview", NOT Production). A canary push left `www.bonniemaraah.com` byte-identical (md5 unchanged before/after) — production is fully isolated. ✓
- **Which project builds previews:** `bonniemara` under team `brees-projects-61eb3847` ("Digital Empathy - Brees"). Per-branch preview URL: `https://bonniemara-git-staging-brees-projects-61eb3847.vercel.app/`.
  - ⚠️ **Preview Deployment Protection is ON** — that URL returns 401 + `_vercel_sso_nonce` to anonymous/curl requests. **To view: open it in a browser while logged into Vercel** as a member of the `brees-projects-61eb3847` team (SSO passes). Previews are `X-Robots-Tag: noindex` (won't get indexed). Preview URL also reachable via the Vercel status link on each pushed commit in GitHub.
  - CLI quirk: `vercel project ls` shows "No projects found" under this team even though deployments land in `brees-projects-61eb3847/bonniemara` — likely a CLI token/scope mismatch; the git-integration pipeline works regardless. The browser dashboard is the reliable way in.
- **Topology note:** the repo is connected to (at least) TWO Vercel projects that both build `main`: the real-domain project (under a DIFFERENT account Brees's CLI can't see — owns `bonniemaraah.com`) AND `bonniemara` (Brees's team, builds main to its own *.vercel.app, no custom domain). Merging to main rebuilds both; only the real-domain project goes live. The `bonniemara` main build is a harmless shadow.
**Vercel: ALREADY LIVE — auto-deploys from GitHub.** The production site is `https://www.bonniemaraah.com` (apex `bonniemaraah.com` 307-redirects to www), served by Vercel and connected to the GitHub repo. **`git push` to `main` = auto-deploy to production.** (Verified 2026-06-04: pushing the DE-footer-link + Google-Maps-address edits made them live on www.bonniemaraah.com automatically.) The hosting Vercel project lives under a DIFFERENT account/team — NOT `brees-projects-61eb3847` (that scope shows no projects). Do not assume a manual import is needed; the prior "pending first manual import" note was WRONG.
  - **2026-06-04 cleanup note (RESOLVED 2026-06-17):** Mistakenly created a DUPLICATE Vercel project `bonniemaraanimalhospital` under scope `brees-projects-61eb3847`. **Verified 2026-06-17 it is GONE and never threatened the live site:** `vercel project ls` → "No projects found", `vercel project inspect bonniemaraanimalhospital` → "There is no project". The duplicate also never owned the domain — `vercel domains inspect bonniemaraah.com` returns "You don't have access to the domain ... under brees-projects-61eb3847", confirming the real hosting project (which owns the domain) lives under a DIFFERENT account/team. Live `www.bonniemaraah.com` serves 200 OK from that other project; apex 307→www. No action needed.

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

## `contact.html` — dedicated contact page (built 2026-06-17, on `staging`)

**IMPORTANT framing decision (Brees, 2026-06-17):** the `staging` branch is the FULL "we're open" site, NOT a pre-launch splash. New pages should read as if the practice is open — no "coming soon." (Exception she chose: KEEP "Opening Summer 2026" in the header lockup + footer "for now.")
- Built from the careers.html template (same header/logo/nav/footer chrome). Nav order: Home · Services · FAQ · Careers · **Contact** (current). Contact link added to nav + footer on index.html + careers.html too.
- **Hero** — reuses `.careers-hero` markup with a static poster only (no video): `hero-bmah-poster.jpg` (beach/dog) + scrim. Eyebrow "Get in touch", h1 "We can't wait to *meet you.*" (verbatim from splash invite).
- **Visit-us card** (`.invite.is-page`, balanced 1fr/1fr) — left: clickable address → Google Maps directions + 4-cell info grid **Hours / Phone (805-819-7333, "Call or text") / Patients / Visits** (the old "Opening — date TBD" cell was replaced by Phone to read open). Right: **"Send us a message."** form card (`.contact-form-col`, white paper card) → JotForm `261675891444165`.
- **Google Map** — embedded `<iframe>` via keyless `maps.google.com/maps?q=...&output=embed`, full-width below the card, rounded (`--radius-lg`), lazy-loaded, titled for a11y.
- New CSS lives in site.css: `.contact-map`, `.invite.is-page` overrides, `.contact-form-col`/`.contact-form`, `.address .tel-link`; `.closer-signup h2` added alongside `h3`. Breakpoints: card stacks at 920px, inner form stacks at 540px. Verified: heading order h1→h2, all inputs labeled, mobile overflow 0 at 375.

**⚠️ Phone note:** 805-819-7333 is a **texting number Brees gave**; she's unsure if it's also the main voice line. Shown as "Call or text" and deliberately NOT added to JSON-LD `telephone` yet. Confirm before treating as the primary number.

---

## `wellness.html` — first service page (built 2026-06-17, on `staging`)

**Service-page template established here** — reusable pattern for the other service pages.
- Same chrome (header/logo/nav/footer). Nav join button → "Contact us" (→contact.html) on service pages. **Added a skip link + `<main id="main" tabindex="-1">`** and a **global `:focus-visible` ring** to site.css (a11y baseline — retrofit other pages later).
- **Hero** — reuses `.careers-hero` static-poster pattern (`.service-hero` adds shorter min-height). Image: `dog-cat-sleeping.jpg` (placeholder, swap for real). Eyebrow "Preventive Care", h1 "Wellness & *preventive care.*"
- **Intro** lead (verbatim opening paragraph), then **`.svc-section`** of repeating **`.svc-block`s** — grid `0.7fr 1.5fr`, left `.svc-head` (number + h2) is **sticky** on desktop, right `.svc-body`. Blocks: 01 Wellness visits, 02 Physical exams, 03 Vaccinations, 04 Parasite prevention, 05 Wellness diagnostics.
- **Vaccinations** → intro + two `.vax-card`s (Canine / Feline lists) + `.svc-note` titers callout (mist, sea left-border). **Parasite prevention / Wellness diagnostics** → `.svc-list` two-col check lists.
- **CTA band** (`.svc-cta`, navy) reuses approved "We can't wait to *meet you.*" → Contact us button.
- New CSS appended to site.css (skip-link, focus ring, `.svc-*`, `.vax-*`). Verified: heading order h1→h2→h3 valid, skip link + #main present, mobile overflow 0 at 375 (re-checked after a stale-tab false alarm — 8767 confirmed serving BMAH).
- Copy saved verbatim at `assets/copy/wellness-care.md`.

**⚠️ Wellness copy — sections to confirm before publish** (per the doc's own "include only what applies" instruction; flagged to Brees): Lyme vaccine (uncommon in S. CA), Rattlesnake toxoid, Canine influenza, and Blood cancer screening/liquid biopsy. Built with the FULL template; trim to BMAH's actual offerings.

**Wellness page v2 (2026-06-17, Brees feedback):**
- **Hero is now a VIDEO** (reuses `careers-hero.mp4` + `careers-hero-poster.jpg` as a placeholder — exam-room footage fits wellness). ⚠️ Site disables autoplay hero video under `prefers-reduced-motion` (a11y) and **Brees runs Reduce Motion ON, so she sees the poster, not motion** — normal visitors see the video. Told her to toggle Reduce Motion off to preview. Needs a wellness-specific clip eventually.
- **Layout (FINAL, Brees-approved via preview pick) = clean stacked list + small thumbnail** (`.svc-items` > `.svc-item` = grid `[thumb | main]`; main = num + h2 + `.svc-body`). Small square `.svc-thumb` (sticky `top:104px`) left of each section; number eyebrow + title + full verbatim body (incl. vax cards + lists) on the right; hairline dividers between; several services visible at once. Mobile (<=920): single column (thumb 72px above text), vax-grid stacks. Verified: 5 items, desktop + mobile overflow 0.
  - **Layout iteration history (so we don't loop):** v1 text-only clean stacked (she liked polish, wanted images) → v2 full-height sticky-media-swap (one image swaps per section; "this is good" but wanted to see >1 service) → v3 alternating image+text rows ("No I don't like this") → **v4 clean list + small thumbnail = the keeper.**
  - **Dead CSS left in site.css (harmless, can delete):** `.svc-scroller/.svc-media/.svc-media-img` (v2), `.svc-content .svc-block`/`.svc-block-img` (v2), `.svc-rows/.svc-row/.svc-row-media/.svc-row-text/.svc-row-wide` (v3). The media-swap IntersectionObserver in site.js no-ops (no `.svc-media` in DOM).
- ⚠️ **All 5 thumbnails are branded `placehold.co` placeholders** (navy squares labeled 01–05; the number also shows as an eyebrow, so real photos remove the apparent dup). Swap for real wellness photos — or pull licensed Shutterstock if Brees asks (per CLAUDE.md, placeholders by default).

**Page not yet linked in nav top-level** — reachable via the new Services dropdown (see nav v2 below).

---

## Nav v2 — sitewide header/footer rebuild (2026-06-17)

Per Brees: **Home · Team · Services ▾ · Client Corner ▾** + Request-an-appointment button. Applied to ALL pages (index, careers, contact, wellness).
- **Shared `assets/js/site.js`** (loaded `defer` on every page) now owns: sticky header, desktop dropdowns (click/keyboard toggle + `aria-expanded`; CSS `:hover` reveal on desktop pointers — the two were fighting when both were JS, so hover is CSS-only now), mobile hamburger (focus-trap incl. burger, Esc, body-scroll-lock, accordion sub-menus), and the wellness media-swap IO. Inline per-page sticky scripts removed; careers/contact keep their inline `.jf-form` + role-chip scripts (site.js does NOT touch forms, to avoid double-binding index's inline handler).
- **Services dropdown** = service pages: Wellness (built) + Surgery / Dentistry / Diagnostics / End-of-Life (placeholders, will 404 until built). **Client Corner** = Payment Options (placeholder), FAQs (`#faqs`), Contact, Call/Text phone, Request an Appointment (→contact.html). **Team** = `team.html` (placeholder).
- **Careers dropped from top nav** (per Brees's spec) → still reachable in the **footer**. Flag: confirm where Careers should live.
- **Footer**: fuller sitemap nav + new `.foot-contact` column (Call/Text + Instagram). 
- **Phone:** Call `000-000-0000` (placeholder per Brees), Text `805-819-7333`. **Social:** Instagram only, `href="https://www.instagram.com/"` placeholder — **need the real handle/URL.**
- **Request an Appointment** → contact form (interim; no booking system yet).
- New CSS: `.nav-list/.has-menu/.nav-menu/.nav-trigger/.caret`, `.nav-burger`, `.mobile-nav/.mobile-list/.m-trigger/.m-menu`, `.social`, `footer .foot-contact`. Mobile breakpoint 920px: topnav→hamburger.
- Verified: dropdown hover+click+aria all correct, mobile menu + accordions work, index splash intact, no console errors.

### Nav v2 — open confirmations for Brees
- Real **Instagram URL** (+ any other socials later).
- **Main phone** number (currently `000-000-0000`).
- Where **Careers** should live in the nav (currently footer only).
- Placeholder pages to build: **team.html**, **payment-options.html**, and service pages **surgery/dentistry/diagnostics/end-of-life**.

## Remaining service pages (copy in Drive, same `parentId` folder `1Im2hIZOt4uB90-DNg3KM_6EX2xM-ZVps`)
DE "Non-Customizable" service docs Brees provided 2026-06-17 (build like wellness):
- **Surgery** — `1YbwaYhYjPjkVhcUTtlOuLS2WTLBcRK2BR1Y63IaNnVY`
- **End-of-Life Care** — `1ZKkXaChBeVJfUFlKUK0joLyqqgDZhCV3D9cTTzPQqcc`
- **Diagnostics** — `15Wxow2R9hasfCC7CKJ2Mg6YC0Jp2YzkYnSEN8IsLYpw`
- **Dentistry** — `14rR2xgXw-_ZYwjLj8QWfonlfEUd7GbfwcwQm2QYwLNw`

---

## Forms — JotForm (account: `digitalempathy`, API key in jotform-integration.md)

Wired via hidden-iframe POST (`<iframe name="jotform-submit">` near `</body>`); `.jf-form` JS swaps in a success message on submit. Notifications → **info@bonniemaraah.com**.

| Form | ID | Fields | Used on |
|---|---|---|---|
| Mailing List | `261485153773463` | q2_email | name-story signup (index.html only now) |
| Careers Application | `261485187097469` | q2_fullName, q3_email, q4_phone, q5_position, q6_resume | careers.html form |
| Contact Form | `261675891444165` | q1_fullName, q2_email, q3_phone (optional), q4_message | contact.html "Send us a message" |

**Contact Form created 2026-06-17** (DE Standard naming `Bonnie Mara Animal Hospital - Contact Form`). Emails set via API: notification → `info@bonniemaraah.com` (reply-to = submitter `{email}`, subject `...- {fullName}`); autoresponder → submitter (reply-to = `info@`, one-business-day promise, no fake emergency number). **API quirk:** this key only ADDS questions via `POST /form/{id}/questions` with **`question[...]` bracket params, one per call** — the JSON-body and singular `/question` + `/question/{qid}` endpoints all 404/400. Question EDIT/DELETE not available, so q1_fullName's server-side `required` flag is `None` (couldn't set it) — enforced on the frontend with the HTML `required` attr instead (fine for our iframe-POST integration).

**⚠️ PENDING manual dashboard steps (API can't set these — DE Standard §5):**
1. All THREE autoresponders → set Sender Name to "Bonnie Mara Animal Hospital" (else mail comes from "JotForm"). [Contact Form autoresponder included now.]
2. All THREE notifications → toggle **Attach PDF** ON.
3. Move all into a BMAH folder if one exists.
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
- **Second pass — small phones (≤400px):** re-audited at 320/375/414/768/1024. Found two more breaks at 320px:
  1. `.ml-form` (name-story signup) is inline input+button with `overflow:hidden` → the submit button got clipped off the right edge below ~400px (unusable).
  2. `.careers-roles .role` is a space-between flex with a `white-space:nowrap` `.ab` badge → badges ("FULL-TIME OPENINGS" etc.) ran off the right edge at 320 (50px overflow).
  - Fix: added a `@media (max-width: 400px)` block — `.ml-form` stacks (input over full-width button + divider border); `.careers-roles .role` stacks title over badge (`flex-direction: column`, `.ab` white-space normal). Verified visually + overflowX=0 (320 has a cosmetic 1px sub-pixel rounding in the address/closer block — no visible scroll).
  - Note: the closer-signup form (contact dark card) was already `flex-direction: column`, so no change there.
- Site now has TWO breakpoints: 920px (layout collapse) + 400px (small-phone inline-pair stacking). Clean across 320→1440.

---

## Accessibility / a11y pass (DONE this session)

Ran axe-core (wcag2a + wcag2aa + best-practice, injected via CDN through Playwright) + custom DOM checks on both pages.
- **Already passing:** valid `<title>` + meta description, `lang="en"`, exactly one `<h1>`/page, logical heading order, every `<img>` has alt, every input is labeled, no empty links/buttons, CTA buttons meet tap-target size.
- **Fixed — color contrast (was 3 serious violations):** footer `.bottom` copyright + `.credit` ("Designed by Digital Empathy") were `rgba(201,216,230,0.55)` on navy = 3.94:1 → bumped to `0.8`. Closer-signup `.fine` was `rgba(244,236,220,0.6)` on ink-deep = 4.22:1 → bumped to `0.82`. Both now ≥4.5:1.
- **Fixed — landmarks (region + landmark-one-main):** wrapped primary content in `<main>` on both pages.
  - **index.html GOTCHA:** the footer lived INSIDE `.scroll-over` (needed so it paints above the `z-index:0` sticky "tide" hero). Couldn't wrap `<main>` cleanly because `.scroll-over` crossed the footer boundary. Fix: closed `.scroll-over` + `</main>` BEFORE the footer, made footer a body-level sibling (so it's a proper `contentinfo` landmark), and added `footer.site { position: relative; z-index: 1; }` so it still layers above the hero. Verified: hero still `position:sticky`, footer renders on top (elementFromPoint at footer center is inside footer, not hero), tide effect intact.
- **Result: 0 axe violations on both pages.** Tag balance verified (1 `<main>` open/close each).
- Note: axe flags inline nav/footer text links as <40px tall (18px) — normal/acceptable for inline text links, not fixed. Smallest UI text is 10px (eyebrows/footer labels) — passes contrast, but tiny; left as-is per design.

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
