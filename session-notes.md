# Bonnie Mara Animal Hospital — Session Notes

**Client:** Bonnie Mara Animal Hospital (BMAH)
**Owner:** Dr. Le Putnam — `leputvet@gmail.com`
**Location:** 4860 Calle Real, Santa Barbara, CA 93111 (across from In-N-Out, off the 101 Turnpike exit)
**Domain:** `bonniemaraah.com`
**Opening:** Summer 2026 (date TBD — fire-sprinkler permitting / roadwork pending)
**Hours:** Mon–Fri 8am–6pm, appointments preferred
**Species:** Dogs and cats only

**Project status:** Splash page v3 — Style B "Ocean Horizon" with vet imagery + cooled palette. Awaiting Brees' next round of feedback.

---

## Build scope

**One-page pre-launch splash site.** Full multi-page build will follow after the hospital opens and final service-page copy is locked.

**Primary CTA:** Mailing list signup ("be notified when appointments become available")

---

## Section structure (current — `index.html`)

1. **Hero** — Full viewport ocean video (Pexels 2915385, loops, muted, autoplay, playsinline). Santa Barbara sunrise photo (Pexels 28687639) as poster + reduced-motion fallback. NO blue band beneath (V1 had a tide band; V3 killed it). Headline bottom-left: *"A new kind of animal hospital for Santa Barbara"* with the "new kind of" set in lighter italic sea-pale. Location pin + opening date bottom-right.

2. **Name story (V1-reverted)** — Centered. Logo seal cuts into the horizon line via a circular cream inset with a thin ink ring. Eyebrow "A note from Dr. Putnam." Headline "Bonnie Mara, in *two languages.*" Story prose (verbatim from Drive PDF, lightly compressed). Signature. Mailing-list signup form below. **This section was NOT supposed to change between V1 → V2 → V3 — V2 broke it and V3 reverted.**

3. **Editorial image band — dog on beach** (Pexels 15298212). Full-bleed. Caption pulled from the story: *"The beaches I've walked with my dogs — the calm that lives in the water."* Bridges name story → differentiator. Navy scrim 0.40 to keep it cool.

4. **Brick-wall pull-quote** — Brick wall image (Pexels 11275509) full-bleed with heavy navy scrim 0.86 (V1 was 0.65 — too orange). Single oversized pull-quote: *"Proudly independently owned — with the time to focus on making each visit a positive one."* Reads as deep navy with subtle masonry texture.

5. **Services (split: list + image)** — Asymmetric grid. Left column: typographic list of 6 numbered services (Wellness, Surgery, Dentistry & COHAT, Diagnostics, Urgent & same-day, End-of-life). No icons, no cards — just numbered prose. Right column: full-bleed owner-cuddling-dog image (Pexels 7788655, faceless owner).

6. **Q&A (interview format)** — Cool sea-mist background (was beige `--cream-deep`, V3 swapped to `--mist #EAF0F6`). Two-column flow with all 14 questions visible at once. Q. in ink-blue italic-ish, A. in 15px body sans. NOT an accordion.

7. **Quiet cat moment** — Sleeping tabby (Pexels 9757142) full-bleed with navy scrim 0.45. Caption: "Low-stress, by design." Punctuation between Q&A and Careers.

8. **Careers (bulletin)** — Ink-night band. "Now hiring · Summer 2026" + "A note from the founder" header line. Big display headline "Help us build the hospital we've *always wanted to work in.*" Drop the founder quote. Three roles in a 3-col stripe. Apply CTA in brick (intentional single warm pop) + aside note.

9. **Invitation closer** — Cream band. Asymmetric 2-col. Left: address typeset huge ("4860 Calle Real" + "Santa Barbara, California 93111") with 2×2 details grid beneath (Hours · Opening · Patients · Visits). Right: ink-deep card with "Final ask" + mailing-list signup. **No Google Maps embed** (V1 had one; V3 removed it — felt utility, not editorial).

10. **Footer** — Ink-night, single row. Seal + brand + tagline + footer nav + DE credit.

---

## Design direction (locked)

- **Logo as visual anchor** — palette derived from logo (deep blue ring, dusty sea blue disc, cream paper background)
- **Modern but not sterile or overly minimal**
- **Warm, welcoming, low-stress** — leans into the "calming essence of nature" mission
- **Blues + whites dominant** — brick is a SECONDARY accent, used sparingly (was overused in V1/V2, fixed in V3 palette cool-down)
- **Avoid clinical stainless-steel feel**
- **Higher-end without sounding luxurious or exclusive**
- **No gradients** (DE house rule)
- **Real vet imagery** — dogs and cats actually present on the page (V2 was text-only and felt like an editorial publication, not a vet site)

### Palette — V3 (CSS custom properties)
- `--ink-night #1B2F47` — careers / footer / deepest band
- `--ink-deep  #2A4360` — closer-signup card, "Notify me" buttons
- `--ink       #3D5A7A` — primary accent (eyebrows, service nums, Q markers, address labels, dividers)
- `--sea       #A3BBD2` — sea-pale accents, "Notify me" (closer) button
- `--sea-pale  #C9D8E6` — italic accent text on dark panels, hero pin/dot
- `--mist      #EAF0F6` — cool sea-mist (Q&A section bg) — replaces former warm `--cream-deep`
- `--cream     #F9F5EE` — page bg / paper. **Was `#F4ECDC` in V1/V2** — cooled in V3 to fight "old beige" feel
- `--cream-paper #FFFFFF` — input fields, card surfaces
- `--brick     #B86E4A` — used ONLY for Apply CTA button + brick wall image
- `--brick-deep #9A5736` — Apply CTA hover
- `--paper-line #DDE3EA` — neutral grey-blue divider line (was warm tan in V1/V2)

### Typography — V3
- Display: **Outfit** (300/400/500/600/700) — geometric warm sans, echoes the logo's wide caps wordmark
- Body / UI: **Inter** (400/500/600 + italics)
- **No serif anywhere.** V2 used Cormorant Garamond throughout — wrong move, the logo is sans. V3 swapped to full sans system.
- Headline emphasis pattern: heavy weight + tight letter-spacing for main words, lighter weight (300) + italic for descriptors (e.g. "A *new kind of* animal hospital" — main words 500, "new kind of" in 300 italic ink-blue)

### Animation
- Scroll-triggered fades via IntersectionObserver, ~1s ease-out with 28px y-offset
- Honors `prefers-reduced-motion` — disables both video autoplay AND reveals
- No parallax, no scroll-jacking

---

## Version history (what changed and why)

### V1 — first ship
Single-direction pick from 3 mockups. Style B "Ocean Horizon" chosen. Hero video had a flat ink-blue tide band beneath. Sections: hero · paper name story · ink-deep differentiator with i./ii./iii. pillars · cream-deep services grid (3×2 icon cards) · cream FAQs accordion · ink-deep careers · cream location with Google Maps · footer. Cormorant serif throughout. No vet imagery.

**Brees feedback:** "kill the band; lower sections feel like other sites we've done and scream AI."

### V2 — over-correction (rejected)
- Killed the band ✓
- Rebuilt sections 3+ as editorial magazine spread (chapter labels, marginalia, etymology notes, drop caps, typographic services list, interview Q&A, newspaper bulletin careers)
- Used full-bleed brick wall pull-quote (light scrim — too orange)
- Added Celtic-rose ornaments
- **Mistake:** also rebuilt section 2 (name story) into 3-col editorial spread — Brees did not ask for that
- **Mistake:** kept Cormorant serif everywhere — Brees called out: logo is sans, fonts should match
- **Mistake:** no vet imagery — Brees called out: "this is a veterinary website, there isn't one piece that makes it feel that way"

### V3 — corrected
- Reverted section 2 to V1 centered Putnam letter design
- Replaced ALL Cormorant with **Outfit (display) + Inter (body)** sans system
- Added 3 real Pexels images: dog on beach (image band), owner cuddling dog (services split), sleeping cat (quiet moment between Q&A and Careers)
- Then Brees flagged: "too much orange and dark beige — drifting into 'old'"
- Cooled palette: cream `#F4ECDC → #F9F5EE`, Q&A bg `cream-deep → mist (cool blue)`, ALL eyebrows + numbers + Q markers + dividers brick → ink, brick-wall scrim 0.65 → 0.86, image band scrims raised to 0.40+, dividers brick-pale → sea-pale
- Brick now lives in: 1 CTA button (Apply), 1 image (brick wall behind navy scrim). Everywhere else: blues.

---

## Copy mode

**Verbatim, BMAH-specific only.** Service-page templates in Drive are still customizable placeholders — they are NOT used in this build. Only finalized BMAH-specific copy is used:

- `Bonnie Mara Animal Hospital name.pdf` — naming story (verbatim, lightly compressed for splash)
- `Website FAQs.docx` — full FAQs (verbatim, light copy editing: "How can be notified" → "How can I be notified")
- `Employment at BMAH.docx` — careers blurb (verbatim)
- Opening date / contact details / location pulled from FAQs doc

Local source-of-truth lives in `assets/copy/{name-story,faqs,careers}.md`.

---

## Google Drive

**Main folder:** `Bonnie Mara Animal Hospital (bonniemaraah.com)`
- ID: `1DP1DeeK0_I7KTX8IUekkI3ngM6niHLCY`
- URL: https://drive.google.com/drive/folders/1DP1DeeK0_I7KTX8IUekkI3ngM6niHLCY
- Owner: brees@digitalempathyinc.com
- Parent: `184mDMe9zSStFNwsHEioJ7pG-igijKV-E` (NOT one of the standard Brees/Letty accounts folders — pre-standard structure)

**Subfolders:**
- `Logo/` → `bonnie mara final logo.pdf` (ID `1jlxHVS_fKo3qOHpXI9gge71Yy6vVbJeS`)
- `Bios/` → `Bonnie Mara Animal Hospital name.pdf` (naming story, ID `1YxsL-bYOQMqR8Or4FtZ-CfXtkB0BVZ2j`)
  - `Splash Page info?/` → `Employment at BMAH.docx` (`1_TWQj_bOgZsyC2H_9ENbqKDgpAMt5Pyz`), `Website FAQs.docx` (`1X-pa558Lf8hYeoRwFEnBlp5VP-4bh5gj`)
- `Services Content/` → 5 customizable templates (Wellness, Surgery, Dentistry, Diagnostics, End-of-Life) — NOT USED for splash; reserved for full build
- `Images/Videos/` → currently empty (ask Dr. Putnam for interior/exterior photos for v2)

---

## Repo

- Local: `C:\Users\brees\Claude Projects\Bonnie Mara Animal Hospital\` (standalone git repo)
- GitHub: `digital-brees/bonniemaraanimalhospital`
- Vercel: pending — connect after first push (https://vercel.com → import `digital-brees/bonniemaraanimalhospital` → framework: Other → deploy)

---

## File structure

```
Bonnie Mara Animal Hospital/
├── index.html                       (splash v3 — Style B, sans fonts, vet imagery, cool palette)
├── robots.txt                       (block — preview/staging)
├── robots.production.txt            (allow — swap in at launch)
├── .gitignore
├── session-notes.md
├── mockups/
│   ├── index.html                   (picker page from V0)
│   ├── style-a-editorial-letter.html (rejected)
│   ├── style-b-ocean-horizon.html   (original V0 mockup, pre-video)
│   └── style-c-seal-front.html      (rejected)
└── assets/
    ├── logo/
    │   ├── bonnie-mara-final-logo.pdf
    │   └── logo-page-1.png          (2200x2200, rendered via pymupdf)
    ├── images/
    │   ├── santa-barbara-sunrise.jpg  (Pexels 28687639, 1600x1064, 123KB — hero poster + reduced-motion fallback)
    │   ├── dog-beach.jpg            (Pexels 15298212, 1600x2399, 603KB — editorial band)
    │   ├── owner-dog-cuddle.jpg     (Pexels 7788655, 1600x1066, 194KB — services split)
    │   ├── cat-sleeping.jpg         (Pexels 9757142, 1600x1067, 339KB — quiet moment)
    │   └── brick-wall.jpg           (Pexels 11275509, 1600x1200, 886KB — pull-quote bg behind 0.86 scrim)
    ├── video/
    │   └── ocean-horizon.mp4        (Pexels 2915385, 1280x720, 6.6MB, 60s — hero loop)
    └── copy/
        ├── name-story.md            (verbatim)
        ├── faqs.md                  (verbatim)
        └── careers.md               (verbatim)
```

## Local preview
- Static server on port 8767 (running in background): `python -m http.server 8767`
- Splash: http://127.0.0.1:8767/
- Mockup picker: http://127.0.0.1:8767/mockups/

---

## Outstanding / next up

### Pending content from client
- [ ] **Indeed apply URL** — for the Careers section "Apply now" button (currently a placeholder)
- [ ] **Mailing list provider** — confirm JotForm vs. Mailchimp/Beehiiv embed; then wire signup form per DE JotForm Standard
- [ ] **Phone number** — none in FAQs doc; ask Dr. Putnam if she wants to show one pre-opening
- [ ] **Hospital interior/exterior photos** — Drive `Images/Videos` folder is empty. Ask Dr. Putnam for construction-progress or finished-space photos to swap in for the Pexels stand-ins
- [ ] **Gaelic spelling check** — FAQs/naming-story say "Mara" (sea/ocean); used verbatim, worth flagging if she wants "Mhuir" anywhere

### Build polish (post-feedback)
- [ ] Wire actual JotForm signup form when provider confirmed
- [ ] Swap Pexels lifestyle images for real BMAH photos when available
- [ ] OG/Twitter share image (likely the seal on cream)
- [ ] Favicon set
- [ ] Add structured data (VeterinaryCare schema, address, openingHoursSpecification) when phone confirmed

### Launch readiness
- [ ] On launch, swap `robots.txt` ← `robots.production.txt` (block → allow)
- [ ] Verify Vercel project + production domain bound (`bonniemaraah.com`)
- [ ] Add real sitemap reference
