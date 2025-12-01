# Handbook Demo Runbook

How to build, run, and present the employee handbook booklet proof-of-concept.

## Quick Start

```bash
# Validate the content and build the site
make build

# Serve the booklet locally
make serve
```

Open `http://localhost:1313` in a browser. The cover page loads first.

`make build` writes the complete static site to `www/StarterSite/public`. It can be served from any HTTP server:

```bash
python3 -m http.server 8080 --directory www/StarterSite/public
```

For POC purposes the artifact is sufficient; deploying to a remote environment is out of scope.

## Recommended Demo Flow

The demo is a narrative walk through the handbook. Follow the pages in sequence so the viewer experiences the booklet as a designed object, not a slide deck.

### 1. The Cover (45 seconds)

Open `http://localhost:1313`. The cover is a single warm paper-toned page with the title "Field Guide to the Organization," a subtitle, and a "First Edition" stamp rotated at an angle.

**Point out:** The stamp pattern, the serif typeface (Crimson Pro), the warm paper background (`#f5f1e8`). This is not a landing page — there is no hero banner, no CTA button, no navigation bar. There is one link: "Open the Field Guide."

**What the viewer should feel:** *This is an object, not a website.*

### 2. The Table of Contents (30 seconds)

Click "Open the Field Guide." The TOC lists every chapter with its short title and page number — roman numeral front matter, arabic body pages. It reads like a book's contents page, not a site map.

**Point out:** Page numbers are stable references (p. 1, p. 5, p. 15). The sequence follows a deliberate arc: arrival → orientation → practice → belonging.

### 3. How to Use This Field Guide (1 minute)

Navigate to p. i (linked from the TOC). This page teaches the reader how to read the handbook before they start reading. It explains symbols, marginalia, navigation conventions, and the voice.

**Point out:** The handbook orients the reader to itself. This is a field-guide convention — teaching the reader how to use the guide. The sentence "Start where you need to" signals that sequential reading is offered, not required.

### 4. Chapter 1: Getting Your Bearings (2 minutes)

Navigate to p. 1. The chapter opener shows "Chapter 1" above the title, a compass-rose illustration with three directional arrows (Product, Craft, People), and a description of what the chapter covers.

**Point out:** The illustration is custom SVG, not a stock icon. The running header reads "Field Guide — Getting Your Bearings" in small caps.

Navigate to pp. 2-3 (spread). Two facing pages side by side: left page explains how to use the guide; right page introduces the three organizational domains.

**Point out the spread layout:** Two `.booklet-spread__page` cards with a visible gap between them. This is a spread, not a two-column layout. The left page has its own running header and folio (p. 2). The right page has its own as well (p. 3). The domain icons illustration reinforces the metaphor with diamond, interlocking-circles, and overlapping-rings symbols.

**What the viewer should feel:** *This organization has structure, and the structure is explained visually, not just in prose.*

### 5. Chapter 2: The Lay of the Land (3 minutes)

Navigate to p. 4 (chapter opener). Custom SVG illustration showing three overlapping territorial contours.

Navigate to p. 5 (full-bleed). This is one of the most distinctive pages. An embedded SVG territory map fills the page — three overlapping domain ellipses connected by dashed paths, with a legend. Below the map, foldable `<details>` panels describe each territory in detail.

**Discovery moment 1 — foldable diagram details:** Click any of the three panels ("Product — What we build", "Craft — How we work", "People — How we grow"). Each expands to reveal a detailed description of the territory. Native HTML `<details>` — no JavaScript required.

Navigate to p. 6 (marginalia-heavy). Detailed territory descriptions in the main content column, with annotation notes in a sidebar column to the right. The sidebar uses the Caveat handwriting font in terracotta.

**Discovery moment 2 — hover-reveal marginalia:** The last marginalia note on p. 6 ("A good field guide is never finished. Annotate yours.") tilts slightly (2.5°) and straightens on hover. Reduced motion preference is respected.

**What the viewer should feel:** *This is a map you can explore, not a wall of text. The marginalia makes it feel annotated by someone who has been here before.*

### 6. Chapter 5: Ways of the Work (3 minutes)

Navigate to the TOC and select "The Rhythm of Work" (pp. 16-17, spread). This spread explains the weekly cadence (Monday check-in, Wednesday deep work, Thursday office hours, Friday demo) on the left page, and the decision-making framework on the right.

**Point out the callout pattern:** Boxed notes with a subtle background interrupt the flow for important guidance ("If you are in a meeting and you do not know why you are there, it is acceptable to ask."). Callouts use the same rule color for borders.

Navigate to "How We Talk to Each Other" (p. 15, single-page). This page establishes the organization's communication culture: writing-first, four named spaces (Signal, Record, Forge, Map), and the habit of writing after talking.

**Experience the voice:** The sentence "Pretending to know is more expensive than asking" captures the handbook's tone — direct, generous, not corporate. The callout "If you are stuck, say so" reads like advice from someone who has been there, not policy.

**What the viewer should feel:** *This handbook tells me how things actually work, not just what the policies are.*

### 7. Chapter 7: Signs & Signals (2 minutes)

Navigate to p. 22 (chapter opener). A visual glossary SVG shows the handbook's symbols: stamp, marginalia mark, folio number, callout panel, diagram node.

Navigate to the final page (p. 24, marginalia-heavy). The colophon closes the handbook: "Set in Crimson Pro, a Garamond-inspired serif. Marginal notes in Caveat. Built with Hugo. Composed as pages and spreads, not as an infinite scrolling column."

**Discovery moment 3 — chapter-end stamp:** Scroll through "The Rhythm of Work" (p. 17) to see the chapter-end stamp ("End of Ways of the Work") with a fleuron ornament. The stamp reveals on scroll via IntersectionObserver; without JavaScript, it is static and visible.

**What the viewer should feel:** *The handbook is a crafted object, right down to the closing note. Someone made this with care.*

### Demo Flow Summary

| Step | Page(s) | Form | Time |
|------|---------|------|------|
| Cover | — | cover | 45s |
| Contents | p. ii | toc | 30s |
| How to Use This Guide | p. i | single-page | 1m |
| Getting Your Bearings | pp. 1-3 | chapter-opener, spread | 2m |
| The Lay of the Land | pp. 4-6 | chapter-opener, full-bleed, marginalia-heavy | 3m |
| Ways of the Work | pp. 15-17 | single-page, spread | 3m |
| Signs & Signals | pp. 22, 24 | chapter-opener, marginalia-heavy | 2m |

**Total:** approximately 12 minutes.

### Navigation During the Demo

- **Arrow keys:** Left/PageUp for previous page, Right/PageDown for next page. Escape returns to the TOC.
- **"Contents" link:** Present in every page footer. Always one click from the TOC.
- **Page-turn animation:** A subtle translateX + fade between pages. Respected by `prefers-reduced-motion`.

The demo works without JavaScript — all navigation is standard anchor links. Keyboard shortcuts and the page-turn animation are progressive enhancements.

## Discovery Moments to Highlight

These are the interactive or unexpected details that make the booklet feel authored:

1. **Foldable diagram details** (p. 5): Native `<details>` elements below the territory map. Click to reveal; click to fold. Works without JS.
2. **Hover-reveal marginalia** (p. 6 and p. 24): The last sidebar note tilts and straightens on hover. Subtle, not flashy.
3. **Chapter-end stamps** (end of each chapter): A closing stamp with a fleuron ornament. Reveals on scroll.
4. **Keyboard navigation**: Arrow keys turn pages. Escape returns to contents. Feels like a reading app, not a website.
5. **Page-turn animation**: The CSS `booklet-page-enter` keyframes evoke a physical page turn.

Not every discovery moment needs to be pointed out. Let the viewer discover one or two on their own — that is the point.

## VISION Non-Negotiables: Verification Status

The demo satisfies all six VISION non-negotiables. Evidence is drawn from the structured verification walk at `docs/vision/handbook-vision-verification.md`. Reproduce it:

```bash
make build
```

| Non-negotiable | Verdict | Key evidence |
|----------------|---------|--------------|
| 1. Must feel like a handbook, manual, or booklet rather than a normal website | PASS | Pages are discrete units (`.booklet-viewport` → `.booklet-page`), not a scrolling column. Spreads, folios, running headers, sequential navigation. Page-turn vocabulary throughout. |
| 2. Must be visually distinctive | PASS | 50+ design tokens form a closed system. Warm cream palette, Crimson Pro + Caveat type pair, stamp pattern, marginalia system. No framework default values. |
| 3. Must avoid generic corporate web design | PASS | Zero cards, icon grids, gradients, rounded panels, hero banners, CTA buttons, or generic sans-serif + blue-accent patterns. All 12 "avoid" checklist items clean. |
| 4. Must not feel like a standard Tailwind template with content added afterward | PASS | No Tailwind classes anywhere. Seven distinct page form layouts. Form-content inseparability — layout treatment matches content type. |
| 5. Must show the web experience was designed around the handbook concept from the beginning | PASS | Artifact trail from design brief → visual language → platform ADR → content map → navigation model → tokens → layouts → content. Every decision traces to the field-guide metaphor. |
| 6. Must be usable enough that the concept feels viable, not merely decorative | PASS | Navigation functional (25/25 e2e assertions). Zero a11y violations (392 pass checks). Orientation page teaches the reader how to read. Content addresses real employee needs. Atmosphere enhances rather than obscures. |

The full 14-constraint cross-reference from the design brief (`docs/vision/handbook-booklet-experience.md`) is satisfied — see `docs/vision/handbook-vision-verification.md` for the detailed walk.

## Validation

Run these checks to verify the demo independently:

| Command | What it verifies | Expected result |
|---------|-----------------|-----------------|
| `make check` | Content structure and front-matter schema | All pages pass |
| `make build` | Content checks followed by a Hugo build | 17 pages, no errors |

All checks pass on the demo branch.

## Known Limitations

These are documented scope boundaries — not defects.

### Stub Chapters

Three chapters have structure (chapter opener, page number, place in the TOC) but incomplete content:

- **Chapter 3** (Field Notes for the First Week, pp. 7-10): Day-by-day first-week timeline not yet written.
- **Chapter 4** (Tools of the Trade, pp. 11-13): Resources page exists (p. 12); Workshop page not written.
- **Chapter 6** (Field Marks & Characters, pp. 19-21): Culture and roles pages not yet written.

The content map (`docs/vision/handbook-content-map.md`) assigns page numbers and page forms for every stub page. Content can be authored without engineering follow-up — create a Markdown file, assign a `page_form`, and the runtime picks it up.

### No Search

The handbook relies on sequential navigation, the TOC, and cross-references. There is no full-text search. This is consistent with the printed field-guide metaphor — they do not have search either — but may surprise web-conditioned users. The `tags` front matter field is reserved for future filtered listing.

### Font Loading

Crimson Pro and Caveat are loaded from Google Fonts CDN. Fallback font stacks are defined, but offline the visual experience degrades (Georgia for body, Comic Sans MS for marginalia — the best available system substitutes).

### Out of Scope

The following are deliberately excluded from the POC:

- Remote deployment of the demo
- Authentication or user accounts
- Search functionality
- PDF or print output
- Mobile-optimized responsive layout (the page geometry targets desktop screens; the booklet metaphor assumes a spread that can be seen)
- Content for stub chapters (Chapters 3, 4, 6)
- Content management or editing UI

## Reproducibility

Anyone can reproduce the demo from a clean checkout:

```bash
make build           # validate content and build the site
make serve           # serve the booklet at http://localhost:1313
```
