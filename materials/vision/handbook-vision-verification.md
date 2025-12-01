# Handbook Vision Verification

**Date:** 2026-06-13
**Branch:** `act-or-s/22-verify-demo-against-vision-non-negotiables`
**Method:** Structured walk of every VISION.md non-negotiable against the built Hugo demo (17 pages, 7 page forms). Evidence drawn from rendered HTML, design tokens, content structure, CSS layout system, build pipeline output, and existing e2e/a11y/link checks.

The retained content and build checks are reproducible with `make build`.

---

## Non-Negotiable 1: Must feel like a handbook, manual, or booklet rather than a normal website

**Evidence from demo:**

- **Pages are discrete units, not a scrolling column.** Every page is wrapped in a `.booklet-viewport` (darker `--color-paper-dark` background) → `.booklet-page` (warm `--color-paper` card, `max-width: 36rem`, `min-height: 48rem`). This is the single most important break from default web layout — there is no infinite vertical scroll of content.
- **Spreads, not single-column flows.** The `spread` page form (`layouts/partials/booklet/spread.html`) renders two facing `.booklet-spread__page` units side by side with a visible `--spread-gap` division. Two of the 17 pages use this form.
- **Page-turn navigation, not top-nav + sidebar.** Every page footer carries `.booklet-sequential-nav` with `rel="prev"` and `rel="next"` links. Keyboard navigation (arrow keys) is supported. A "Contents" link appears on every page footer. No top navigation bar, no sidebar tree.
- **Page-turn animation.** CSS `@keyframes booklet-page-enter` applies a subtle translateX + fade on page entry, evoking a physical page turn. Respected by `prefers-reduced-motion`.
- **Booklet physical vocabulary.** The running header carries section/chapter names (small caps, lowercase). Folios show page numbers — roman numerals (i, ii) for front matter, arabic (1, 2, 3…) for body. The cover carries an edition stamp. Chapter openers show "Chapter N" above the title. Chapter endings carry a closing stamp ("End of Orientation") with a fleuron ornament.
- **Design brief constraint #1 (falsifiable check):** "Does the experience use page-like or spread-like composition (not a scrollable landing page)?" — YES. "Does it use booklet-native navigation (page turns, spreads, sections) rather than top-nav + footer web patterns?" — YES.

**Verdict: PASS.** The experience reads as a booklet, not a website. A viewer would describe it using page/spread/section language, not site/nav-bar/scroll language.

---

## Non-Negotiable 2: Must be visually distinctive

**Evidence from demo:**

- **50+ design tokens** in `tokens.css` form a closed, coherent visual system. No values leak from a framework default.
- **Palette.** Warm cream paper (`#f5f1e8`), dark brown-black ink (`#1e1a16`), muted secondary (`#5c5650`), sage green accent (`#4a6741`), faded navy stamp (`#3a5070`), terracotta marginalia (`#b4512e`). This palette has no overlap with Material Design, Tailwind defaults, or any generic corporate blue/grey scheme.
- **Typography pair.** Crimson Pro (Garamond-inspired serif, variable weight) for body and display. Caveat (handwriting-adjacent) for marginalia, stamps, and annotations. No system sans-serif stack. No generic "Inter + blue accent" pattern.
- **Stamp pattern.** `.booklet-stamp` uses `--font-marginalia`, `--stamp-color`, `border-style: dashed`, `transform: rotate(-3deg)`. Rendered as an ink stamp applied at an angle. No component library has this.
- **Marginalia system.** Sidebar column (CSS grid) with handwriting font and terracotta color, mimicking penciled annotations. Discovery marginalia tilts 2.5° then straightens on hover. Inline marginalia uses a left border inset. Both mechanisms use the same design tokens — visual voice is identical.
- **No borrowed component defaults.** Every CSS class is `booklet-` prefixed and references design tokens. No Vuetify, no Material Design, no Tailwind utility classes.
- **Coherence across page forms.** All seven page forms (cover, toc, chapter-opener, single-page, spread, full-bleed, marginalia-heavy) share the same token system. The visual language is consistent from cover to colophon.

**Verdict: PASS.** If you removed the content, an observer would still recognize the visual system as belonging to *this* handbook. The token system, typeface pair, stamp pattern, and marginalia voice are distinctive and coherent.

---

## Non-Negotiable 3: Must avoid generic corporate web design

**Checklist walk against the demo:**

| Pattern to avoid | Present in demo? | Evidence |
|-----------------|------------------|----------|
| Generic cards | No | No `.card`, no card components. Content lives in pages/spreads/callouts. |
| Generic icon grids | No | No icon grids anywhere. Custom SVG illustrations serve specific explanatory roles. |
| SaaS gradients | No | No gradients in CSS. All colors are flat, warm paper tones. |
| Generic rounded panels | No | No `border-radius` on content containers. Callout borders are straight. |
| Hero banner with gradient + CTA | No | Cover page is a centered title + subtitle + stamp on paper background. No hero section. |
| Three-column icon grid | No | Not present on any page. |
| Rounded-card testimonial section | No | No testimonial or review sections. |
| Generic sans-serif + blue-accent palette | No | Serif body font (Crimson Pro), sage green accent (#4a6741). |
| "Last updated" footer dominating every page | No | Footer carries page-turn navigation and contents link. No date-dominant footers. |
| Portal-of-links homepage | No | Homepage is a cover with a single "Open the Field Guide" link. |
| Policy-numbered documents | No | Content is organized by chapter, not by policy number. |
| CTA buttons | No | No call-to-action buttons anywhere. |
| Stock library feel | No | All 6 SVG illustrations are custom-drawn for this handbook. |

**Design brief constraint #3 (falsifiable check):** "No hero banner with gradient + CTA button. No three-column icon grid. No rounded-card testimonial section. No generic sans-serif + blue-accent palette." — ALL CLEAN.

**Verdict: PASS.** Every item on the "do not include" checklist is absent. The demo systematically avoids every pattern VISION.md's "What This Is Not" section forbids.

---

## Non-Negotiable 4: Must not feel like a standard Tailwind template with handbook content added afterward

**Evidence from demo:**

- **No Tailwind or utility-first CSS.** The codebase contains zero Tailwind classes (`bg-white`, `rounded-lg`, `shadow-md`, `p-4`, `flex`, `grid`, etc.). All styles are semantic (`booklet-` prefixed) and reference design tokens.
- **No generic container/content pattern.** Different page forms get genuinely different treatments: a chapter-opener centers vertically, a spread arranges two pages side by side, a full-bleed removes padding and fills the page with SVG, a marginalia-heavy page expands to a grid layout with a sidebar column. This is not a single template with swapped content.
- **Form-content inseparability.** The "How We Talk to Each Other" single-page uses a callout for "If you are stuck, say so." The "Reading the Territory" marginalia-heavy page puts navigational tips in the sidebar annotation column. The "Organizational Map" full-bleed page uses `<details>` foldable panels below the SVG. Each content type receives a layout treatment appropriate to its nature.
- **Design brief constraint #4 (falsifiable check):** "Does the visual language feel inseparable from the handbook concept — or can you mentally swap in any other text and still have the same site?" — The running headers, folios, stamps, marginalia annotations, chapter openers, and colophon are all field-guide-specific. Swapping the text would leave the visual system intact but semantically hollow — the form carries the metaphor.
- **Design brief constraint #14:** "No hero sections with gradient overlays. No SVG icon grids. No 'card' components lifted from a component library's default styling. No rounded-rectangle-with-box-shadow content panels." — ALL CLEAN.

**Verdict: PASS.** The handbook does not read as content dropped into a pre-existing template. The visual form and content were designed together around the field-guide metaphor. This would not be achievable by taking a Tailwind template and swapping the text.

---

## Non-Negotiable 5: Must show that the web experience has been designed around the handbook concept from the beginning

**Evidence from the artifact trail (commits on this branch):**

1. **Design brief** (`docs/vision/handbook-booklet-experience.md`): Defines the field-guide metaphor, maps every VISION non-negotiable to a falsifiable constraint, establishes reference vocabulary (spread, marginalia, stamp, folio, colophon…), and records design decisions with rationale.
2. **Visual language** (`docs/vision/handbook-visual-language.md`): Derives design tokens, typeface choices, palette, and geometry from the field-guide metaphor.
3. **Implementation platform** (`docs/decisions/ADR-014-handbook-implementation-platform.md`): Explicitly rejects Vue + Vuetify because "Material Design defaults are the generic corporate web patterns the brief forbids." Chooses Hugo + CSS/SVG because "CSS and SVG, delivered through Hugo templates, satisfy every constraint in the brief."
4. **Content map** (`docs/vision/handbook-content-map.md`): Structures chapters in field-guide vocabulary. Assigns every page a `page_form`. Defines the arc: arrival → orientation → practice → belonging.
5. **Navigation model** (`docs/vision/handbook-navigation-model.md`): Sequential page-turn navigation with prev/next, keyboard support, TOC auto-generation — all derived from the booklet metaphor.
6. **Design tokens** (`tokens.css`): Every visual value is a CSS custom property named for its role in the booklet system (`--color-paper`, `--color-ink`, `--color-stamp`, `--color-notation`, `--folio-font-size`…).
7. **Layout system** (`layouts.css`): Every layout form is named for its booklet role (`booklet-cover`, `booklet-spread`, `booklet-chapter-opener`, `booklet-full-bleed`, `booklet-marginalia`). No layout exists that is not motivated by the field-guide concept.
8. **Content authoring contract** (`docs/handbook-authoring.md`): Defines the front-matter schema, shortcode catalog, and filename conventions so new chapters enter the system as field-guide pages, not as generic Markdown.

**Design brief constraint #5 (falsifiable check):** "Can someone trace every major visual decision (layout, navigation, illustration style, use of margins, sequencing) back to the field-guide metaphor? Is there a documented rationale for each choice?" — YES. The commit sequence and documentation chain trace every major decision back to the field-guide metaphor with rationale.

**Verdict: PASS.** The handbook concept drove decisions from platform selection through design tokens through layout system through content structure. The artifact trail demonstrates this was designed *for* the concept, not a template retrofitted to it.

---

## Non-Negotiable 6: Must be usable enough that the concept feels viable, not merely decorative

**Real handbook flow walkthrough — find first-day information:**

1. Open cover → "Open the Field Guide" link → TOC (page ii) — 1 click
2. TOC lists: "How to Use This Guide" (p. i) and "Orientation" (p. 1) as first entries
3. "How to Use This Guide" (p. i) explains: how the handbook is organized, how to navigate (page-by-page, by contents, by cross-reference, by page number), how to read the symbols (stamps, marginal notes, callouts, rules, diagrams), and voice conventions. This is a meta-orientation before the content begins.
4. "Getting Your Bearings" (p. 1, chapter-opener) introduces the three-domain organizational structure with a compass-rose illustration
5. "Resources and Tools" (p. 12) covers: communication channels, documentation practices, code and tooling setup, support contacts — answers "what do I need?"
6. "How We Talk to Each Other" (p. 15) covers: writing-first culture, where things live (Signal/Record/Forge/Map), writing well, asking questions — answers "how do I communicate?"

**Usability evidence:**

| Criterion | Evidence |
|-----------|----------|
| Navigation functional | Sequential prev/next on every page. Keyboard navigation (arrow keys, Escape). "Contents" link on every page. |
| Content scannable | Clear heading hierarchy (h1 chapter titles, h2 sections, h3 subsections). Short paragraphs. Callouts for important items. |
| Accessibility | Zero axe-core violations across all 14 unique pages (392 pass checks). Skip link. ARIA landmarks (`main`, `article`, `nav[aria-label]`). `forced-colors: active` support. `prefers-reduced-motion` respected. `prefers-contrast: more` supported. |
| Orientation provided | "How to Use This Field Guide" page explicitly teaches the reader how to navigate and read the handbook before content begins. |
| Stable addressing | Every page has a folio number. Page numbers are stable references ("see page 17"). |
| Discovery moments degrade gracefully | Hover marginalia: static at 78% opacity without CSS. Foldable panels: native `<details>` without JS. Chapter-end stamp: static and visible without JS. |
| Voice is present, not neutral | "This field guide was made to help you find your way." "Pretending to know is more expensive than asking." "Annotate yours. Add what you learn. Pass it on." |

**Known demo-scope limitations (not failures — chapters are explicitly stubs per `docs/vision/handbook-content-map.md`):**

- Chapter 3 (Field Notes for the First Week): stub — day-by-day first-week timeline not yet written
- Chapter 4 (Tools of the Trade): partially present (Resources and Tools page exists, Workshop page is not)
- Chapter 6 (Field Marks & Characters): stub — culture and roles pages not yet written
- Specific policy details (time-off, benefits, compensation) are outside demo scope

**Design brief constraint #6 (falsifiable check):** "Can a real employee find key information (culture, expectations, resources, ways of working) without confusion? Are readability, scannability, and navigation functional — not sacrificed for atmosphere?" — YES, within the demo scope. Navigation is clear and functional. Content is readable and scannable. Atmosphere enhances rather than obscures.

**Verdict: PASS (with noted scope limitations).** Within the demo scope, the handbook is usable. Navigation functions. Content addresses real employee needs. Accessibility is solid. The field-guide metaphor clarifies rather than confuses. Stub chapters are known and tracked — they do not undermine the concept's viability; they are content to be written against a proven form.

---

## Design Brief Constraint Cross-Reference

Each of the 14 falsifiable constraints in `docs/vision/handbook-booklet-experience.md` is addressed by the evidence above:

| # | Design brief constraint | Verdict | Where addressed |
|---|------------------------|---------|-----------------|
| 1 | Page-like or spread-like composition, not scrolling landing page | PASS | Non-negotiable 1 |
| 2 | Coherent visual system, not borrowed from framework defaults | PASS | Non-negotiable 2 |
| 3 | No hero/gradient/CTA, no icon grid, no card testimonial, no generic palette | PASS | Non-negotiable 3 |
| 4 | Visual language inseparable from handbook concept | PASS | Non-negotiable 4 |
| 5 | Every major visual decision traceable to field-guide metaphor | PASS | Non-negotiable 5 |
| 6 | Real employee can find key info; readability and navigation functional | PASS | Non-negotiable 6 |
| 7 | Described in booklet language, not web language | PASS | Non-negotiable 1 (vocabulary) |
| 8 | Form communicates field guide without needing explanation | PASS | Non-negotiables 1-4 collectively |
| 9 | Discernible authorial voice, not stock/AI-generic | PASS | Content analysis (voice, colophon) |
| 10 | Completes orientation journey end-to-end | PASS (demo scope) | Non-negotiable 6 walkthrough |
| 11 | Field-guide framing adds clarity, not decorative noise | PASS | Usability evidence |
| 12 | Content explains *why* and *how*, not just *what* | PASS | Content analysis (e.g., "How We Talk" explains rationale) |
| 13 | Different content types get appropriate treatments, not one generic layout | PASS | 7 page forms exercised |
| 14 | No hero/gradient, no icon grid, no component-library cards, no box-shadow panels | PASS | Non-negotiable 3 checklist |

---

## Verification Reproducibility

Anyone can rerun this verification:

```bash
# Validate the content and build the demo
make build

# Serve and inspect visually
make serve
```

---

## Open Risks

1. **Stub chapters create content gaps.** Chapters 3, 4, and 6 are stub-tier per `docs/vision/handbook-content-map.md`. A real employee would hit dead ends when looking for first-week timeline, full tool setup, or culture/roles information. This is known and tracked — the content map assigns page numbers and page forms for these chapters so content can be authored without engineering follow-up.

2. **No search functionality.** The handbook relies on sequential navigation, TOC, and cross-references. A reader who needs to find a specific term quickly must scan the TOC or navigate sequentially. This is consistent with a printed field guide — they don't have search either — but may frustrate web-conditioned users. The content map reserves `tags` front matter for future filtered listing.

3. **Cover page `data-next-url` attribute.** The cover's "Open the Field Guide" link carries `data-next-url="/handbook/"` suggesting a JavaScript-enhanced page transition. This works correctly in the demo but would need verification if the handbook root URL changes.

4. **Font loading dependency on Google Fonts.** The handbook loads Crimson Pro and Caveat from Google Fonts CDN. Without network access, fallback font stacks are defined but the visual experience degrades. For production, self-hosting fonts would improve reliability and privacy.

---

## Summary

**6 of 6 VISION non-negotiables PASS.** The demo satisfies every falsifiable constraint in the design brief. The handbook feels like a field guide, not a website. It is visually distinctive. It avoids every category of generic corporate web design. It was designed around the handbook concept from platform selection through content structure. It is usable within its scope. The stub chapters are known limitations, not verification failures.
