# Bonnie Mara Animal Hospital — Session Notes

**Client:** Bonnie Mara Animal Hospital (BMAH)
**Owner:** Dr. Le Putnam — `leputvet@gmail.com`
**Location:** 4860 Calle Real, Santa Barbara, CA 93111 (across from In-N-Out, off the 101 Turnpike exit)
**Domain:** `bonniemaraah.com`
**Opening:** Summer 2026 (date TBD — fire-sprinkler permitting / roadwork pending)
**Hours:** Mon–Fri 8am–6pm, appointments preferred
**Species:** Dogs and cats only

**Project status:** Setup complete. Splash/pre-launch page in design.

---

## Build scope (this round)

**One-page pre-launch splash site.** Full multi-page veterinary site will be built after the hospital opens and final service copy is locked.

**Page sections (planned):**
1. Hero — "Opening Summer 2026" + mailing list signup as primary CTA
2. The name — "Bonnie Mara" story (Scottish roots, Gaelic for sea/ocean, Santa Barbara connection)
3. What makes us different — independently owned, individualized care, low-stress philosophy
4. What we'll offer — Wellness · Surgery · Dentistry · Diagnostics · Urgent Care · End-of-Life (overview only)
5. FAQs — verbatim from Drive
6. Careers teaser — "we're hiring" (CSR, RVT, vet assistants) + link to apply
7. Location + opening details
8. Footer — mailing list, social, contact

**Primary CTA:** Mailing list signup ("be notified when appointments become available")

---

## Design direction (locked in by Brees)

- **Logo as visual anchor** — palette/feel derives from the final logo
- **Modern but not sterile or overly minimal**
- **Warm, welcoming, low-stress** — leans into the "calming essence of nature" mission
- **Brick textures/colors** inspired by hospital exterior/interior — warm terracotta accents grounding the blues
- **Blues + whites** as primary palette
- **Avoid clinical stainless-steel feel** — no chrome, no cold gray, no "vet office" cliché
- **Higher-end feel without sounding luxurious or exclusive** — premium polish, friendly accessibility
- Typography: TBD after logo inspection (fonts must echo the wordmark)
- No gradients (DE house rule)

---

## Copy mode

**Verbatim, BMAH-specific only.** Service-page templates in Drive are still customizable placeholders — they are NOT used in this build. Only finalized BMAH-specific copy is used:

- `Bonnie Mara Animal Hospital name.pdf` — naming story (verbatim)
- `Website FAQs.docx` — full FAQs (verbatim, light formatting cleanup OK)
- `Employment at BMAH.docx` — careers blurb (verbatim)
- "Opening Summer 2026" / contact details / location pulled from FAQs doc

---

## Google Drive (existing)

Main folder: **Bonnie Mara Animal Hospital (bonniemaraah.com)**
- ID: `1DP1DeeK0_I7KTX8IUekkI3ngM6niHLCY`
- URL: https://drive.google.com/drive/folders/1DP1DeeK0_I7KTX8IUekkI3ngM6niHLCY
- Owner: brees@digitalempathyinc.com
- Parent: `184mDMe9zSStFNwsHEioJ7pG-igijKV-E` (NOT one of the standard Brees/Letty accounts folders — existing pre-standard structure)

Subfolders:
- `Logo/` → `bonnie mara final logo.pdf` (ID `1jlxHVS_fKo3qOHpXI9gge71Yy6vVbJeS`)
- `Bios/` → `Bonnie Mara Animal Hospital name.pdf` (naming story, ID `1YxsL-bYOQMqR8Or4FtZ-CfXtkB0BVZ2j`)
  - `Splash Page info?/` → `Employment at BMAH.docx` (ID `1_TWQj_bOgZsyC2H_9ENbqKDgpAMt5Pyz`), `Website FAQs.docx` (ID `1X-pa558Lf8hYeoRwFEnBlp5VP-4bh5gj`)
- `Services Content/` → 5 customizable templates (Wellness, Surgery, Dentistry, Diagnostics, End-of-Life) — NOT USED for splash; reserved for full build
- `Images/Videos/` → currently empty

---

## Repo

- Local: `C:\Users\brees\Claude Projects\Bonnie Mara Animal Hospital\`
- GitHub: `digital-brees/bonniemaraanimalhospital` (to be created)
- Vercel: pending (connect after first push)

---

## File structure

```
Bonnie Mara Animal Hospital/
├── index.html              (splash page in progress)
├── robots.txt              (block — preview/staging)
├── robots.production.txt   (allow — swap in at launch)
├── .gitignore
├── session-notes.md
└── assets/
    ├── logo/               (final logo PDF + extracted color/font cues)
    ├── images/             (hospital interior/exterior + lifestyle imagery TBD)
    └── copy/               (verbatim BMAH copy stored locally as source-of-truth)
```

---

## Outstanding / next up

- [ ] Download and inspect final logo PDF for exact palette + typographic cues
- [ ] Pull verbatim copy of FAQs + Employment + Naming Story into `assets/copy/`
- [ ] Design splash page (3-4 hero direction options before committing)
- [ ] Wire mailing list signup form (JotForm per DE Standard, once form provider confirmed)
- [ ] Confirm whether hospital interior/exterior photos exist anywhere (Drive folder is empty — ask Dr. Putnam)
- [ ] Confirm phone number to display pre-opening (none in FAQs doc yet)
- [ ] Confirm Indeed/apply URL for careers section
