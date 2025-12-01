# Handbook Booklet Experience: Design Brief

This is the authoritative concrete design brief for the employee handbook proof-of-concept. It translates the creative direction in `VISION.md` into falsifiable constraints that designers, content authors, and engineers can check work against.

Subsequent issues reference this brief, not `VISION.md` directly, for their design constraints.

## Chosen Booklet Metaphor

**Field guide.**

A field guide is a compact, illustrated reference carried into unfamiliar territory. It helps the reader orient, identify what matters, and understand how things work. It is authored with care, organized for discovery, and designed to be used — not just read.

**Why field guide over the other candidates:**

| Candidate        | Weakness for this use case                                           |
| ---------------- | -------------------------------------------------------------------- |
| Game manual      | Risks reading as unserious or decorative for real workplace content  |
| Operating manual | Too technical, cold; lacks the warmth and invitation VISION asks for |
| Grimoire         | Too obscure and arcane; works against clarity and usefulness         |

A field guide preserves the tactile, illustrated, authored sensibility of the _Tunic_-inspired instruction booklet while avoiding game-specific connotations. It is inherently about _orientation_ and _place_ — which is exactly what an employee handbook should provide.

The frame: _this is a guide to the organization, like a field guide to a landscape — compact, visual, annotated, and built for discovery._

## Non-Negotiables → Design Constraints

Each row maps a `VISION.md` non-negotiable to a concrete, checkable constraint. A reviewer can answer yes/no to every check.

| #   | VISION non-negotiable                                                                              | Falsifiable design constraint                                                                                                                                                                                                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Must feel like a handbook, manual, or booklet rather than a normal website                         | Does the experience use page-like or spread-like composition (not a scrollable landing page)? Does it use booklet-native navigation (page turns, spreads, sections) rather than top-nav + footer web patterns?                                                                                                            |
| 2   | Must be visually distinctive                                                                       | If you removed the content, would an observer still recognize this as _this_ handbook and not a generic site? Is there a coherent visual system (not borrowed from a CSS framework's defaults)?                                                                                                                           |
| 3   | Must avoid generic corporate web design                                                            | No hero banner with gradient + CTA button. No three-column icon grid. No rounded-card testimonial section. No generic sans-serif + blue-accent palette applied as a thin skin over Tailwind defaults. If a pattern appears in the first page of search results for "corporate website template," it does not belong here. |
| 4   | Must not feel like a standard Tailwind template with handbook content added afterward              | Does the visual language feel inseparable from the handbook concept — or can you mentally swap in any other text and still have the same site? The layout, typography, illustration, and composition must all read as _handbook_, not as _neutral container that happens to hold handbook text_.                          |
| 5   | Must show that the web experience has been designed around the handbook concept from the beginning | Can someone trace every major visual decision (layout, navigation, illustration style, use of margins, sequencing) back to the field-guide metaphor? Is there a documented rationale for each choice, not just "it looked good"?                                                                                          |
| 6   | Must be usable enough that the concept feels viable, not merely decorative                         | Can a real employee find key information (culture, expectations, resources, ways of working) without confusion? Are readability, scannability, and navigation functional — not sacrificed for atmosphere?                                                                                                                 |
| 7   | This should feel like a handbook first and a website second                                        | If someone described the experience, would they reach for "handbook" or "booklet" language ("opening," "page," "spread," "section") rather than web language ("site," "page load," "nav bar")?                                                                                                                            |
| 8   | The visual form should carry the concept                                                           | Does the form itself communicate _field guide_ — compact, illustrated, annotated, navigable — without needing an introductory paragraph to explain what it is?                                                                                                                                                            |
| 9   | The experience should feel authored                                                                | Is there a discernible authorial voice? Do illustrations, annotations, and marginalia feel like they came from _someone_ — not from a stock library or an AI's generic output?                                                                                                                                            |
| 10  | It should remain useful, readable, and grounded in real employee needs                             | Can a new hire complete the orientation journey end-to-end and answer: _what is this organization about, how does it work, and what do I need to know?_                                                                                                                                                                   |
| 11  | The concept should make the handbook more engaging and memorable, not less clear                   | Does the field-guide framing add clarity (through illustration, annotation, sequencing) or does it add decorative noise? Every booklet device must earn its place by improving comprehension or retention.                                                                                                                |
| 12  | The reader should feel introduced to how the organization works, not handed a set of rules         | Does the content explain _why_ and _how_, or does it only state _what_? Does the sequencing build understanding progressively, from orientation through detail?                                                                                                                                                           |
| 13  | Must avoid content‑placed‑into‑a‑template feel                                                     | Is every content section composed as if the visual form was designed _for it_, rather than poured into a pre-built layout? Do different content types (values, resources, processes) each get a treatment appropriate to their nature, or do they all share one generic layout?                                           |
| 14  | The demo must reject the default visual language of modern corporate web design                    | No hero sections with gradient overlays. No SVG icon grids. No "card" components lifted from a component library's default styling. No rounded-rectangle-with-box-shadow content panels. If it feels like a startup's /careers page, it fails.                                                                            |

## Signature Qualities

### Must feel

- **Authored.** The handbook reads as if a person — not a committee or a CMS — made it. Voice is present. Imperfections (marginalia, annotations, asides) are deliberate.
- **Tactile.** The experience evokes physicality: pages, paper, ink, stamps, wear, texture. Even though this is a web document, the visual language suggests a printed object.
- **Compact.** Content is curated and concise. The handbook earns its size — no filler, no generic padding. A field guide you can carry, not an encyclopedia you dread.
- **Illustrated, not decorated.** Every visual element explains, orients, or reveals. No ornamentation for its own sake. If an illustration were removed, meaning would be lost.
- **Sequenced with intention.** Content builds. Early sections orient; later sections detail. The order is the message — this is not a flat wiki where every page is equally accessible from a sidebar.
- **Of a specific world.** The handbook belongs to _this_ organization. It has a sense of place. Someone reading it should feel they are learning about a particular entity with its own character, not reading generic onboarding text.
- **Discoverable.** The reader is invited to explore — to turn the page, to follow a marginal note, to unfold a diagram. Not everything is visible at once. The experience rewards attention.

### Must not feel

- **Like a website that happens to have handbook content.** If the browser chrome disappeared, would the experience still hold together? If yes, the form leads. If no, the web template leads.
- **Like a SaaS product page.** No feature grids. No "pricing" energy. No benefit-driven marketing copy.
- **Like a documentation wiki.** No exhaustive sidebar trees. No search-as-primary-navigation. No dry, neutral technical voice.
- **Like a slide deck.** No one-idea-per-screen pacing. No bullet-point lists as the primary content unit. No pitch-deck visual rhythm.
- **Like a standard HR intranet.** No portal-of-links homepage. No policy-numbered documents. No "last updated" footer dominating every page.
- **Like a startup landing page.** No "revolutionary culture" marketing tone. No team photo grid masquerading as handbook content. No CTA buttons.

## Design Freedom: Scope and Limits

### What is locked down

- The field-guide booklet metaphor. Every significant design decision must reference it.
- The non-negotiable → constraint table above. Every constraint must be satisfied in the final demo.
- The signature qualities. Any deviation that makes the handbook feel like one of the "must not feel" categories is a regression.
- The rule: the visual form carries the concept. Form and content are inseparable in the final demo.

### What the implementation team owns

- The specific visual language: illustration style, color palette, typography, layout system.
- The interaction model: how page turns, navigation, and discovery work on the web.
- The content structure: what sections exist, how they sequence, how deep each goes.
- Which booklet devices to use and how: margins, marginalia, stamps, diagrams, page numbers, symbols, maps, sketches, annotated pages, callout boxes, fold-out or reveal patterns.
- The tone of voice: how the authorial presence manifests.
- The technical platform: Hugo templates, Vue components, CSS approach — within the repository's existing technology stack and the guard rule in `docs/plans/handbook-implementation.md` ("add alongside; integrate; do not replace").

### Guardrails, not prescriptions

- The _Tunic_ instruction booklet is a reference point for _sensibility_, not a source to copy. Do not reproduce its specific illustration style, layout, or content structure.
- The field-guide metaphor is a _lens_, not a straitjacket. If a particular content section works better as a diagram than a page spread, do that.
- "Tactile" and "printed" are qualities to achieve _on the web_, not requirements to simulate a physical book. Use web-native techniques (CSS, SVG, typography, layout) to evoke the feeling; do not render a PDF-in-browser.
- The proof-of-concept is about proving the direction. Not every section needs to be complete. The experience must be coherent and convincing, not exhaustive.

## Reference Vocabulary

These are the booklet-native terms that later design and implementation artifacts should use when describing components, layouts, and content structures. Using this vocabulary keeps the team aligned on the field-guide metaphor and avoids falling back into generic web terminology.

| Term                           | Definition                                                                         | When to use                                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Spread**                     | A pair of facing pages viewed together as one composition                          | The primary layout unit. Content should be composed for spreads, not for an infinite scrolling viewport.                                |
| **Page**                       | A single side within a spread                                                      | The atomic navigation unit. Readers advance by page, not by scroll depth.                                                               |
| **Marginalia**                 | Notes, symbols, or small illustrations placed in the margin alongside body content | For asides, callouts, tips, warnings, and annotations that add a second layer of reading.                                               |
| **Stamp**                      | A small, repeated mark indicating ownership, approval, or category                 | For section markers, status indicators, or organizational identity marks. Should feel applied, not rendered.                            |
| **Diagram**                    | A visual explanation of structure, process, or relationship                        | For org structure, workflows, decision trees, resource maps. Must explain, not decorate.                                                |
| **Plate**                      | A full-page or full-spread illustration, potentially with a caption                | For moments that deserve pause — chapter openings, key concepts, orientation visuals.                                                   |
| **Callout**                    | A boxed or set-apart note that interrupts the main flow                            | For important warnings, key takeaways, or "in practice" examples.                                                                       |
| **Key / Legend**               | A visual glossary mapping symbols to meanings                                      | For establishing the visual system. A field guide always explains its symbols.                                                          |
| **Folio**                      | Page number, often with section or chapter identifier                              | For navigation and orientation. Readers should always know where they are in the handbook.                                              |
| **Colophon**                   | A note about how the handbook was made, typically at the end                       | For the closing experience — reinforces that this is an authored, intentional object.                                                   |
| **Front matter / Back matter** | Introductory and closing material outside the main body                            | For welcome, how-to-use-this-guide, colophon, and reference sections.                                                                   |
| **Annotation**                 | A handwritten or hand-drawn note layered onto existing content                     | For the "second reader" layer — commentary, tips, or insider notes that make the handbook feel alive and used.                          |
| **Map**                        | A visual representation of spatial or conceptual relationships                     | For orientation — where things are, how they connect. May be conceptual (org structure as territory) or literal (office layout as map). |

## Signature Discovery Moments

The handbook includes a few restrained, interactive moments that reward attention. These are signatures — distinctive details that make the booklet feel alive and reward exploration — not pervasive motion or animation. Each moment is additive: without it, the booklet still reads correctly.

### Guiding principle

**Restraint over excess.** A field guide rewards attention through detail, not through spectacle. Every discovery moment must earn its place by reinforcing the field-guide metaphor and improving the reading experience. If a moment feels decorative rather than meaningful, it does not belong.

### Moment 1: Hover marginalia reveal

**Where:** References and Further Reading (page 6), final marginal note ("A good field guide is never finished...").

**What:** The note sits at a slight angle (2.5°) with subtly reduced opacity, as if penciled in by hand. Hovering straightens it to full legibility — the digital equivalent of noticing and focusing on a handwritten annotation.

**How it works:** CSS transform and opacity transition on `:hover`. The note is fully readable without interaction (78% opacity with a 2.5° rotation is still legible content). When `prefers-reduced-motion` is set, the note renders at full opacity, no rotation — a static marginal note indistinguishable from its neighbors.

**Why it's there:** This moment embodies the "authored" signature quality. Marginalia in a physical field guide is often written at a slight angle, in a hurry, by a previous reader. The hover straightening rewards the reader who pauses to look closely. It also makes the annotation layer feel hand-applied rather than typeset.

**Graceful degradation:** Without CSS or with reduced motion, the note is a fully readable static marginal note.

### Moment 2: Foldable diagram territory panels

**Where:** Organizational Map (page 5), below the SVG territory map.

**What:** Three detail panels — one per domain territory (Product, Craft, People) — sit below the map as native HTML disclosure widgets (`<details>`/`<summary>`). Clicking a territory on the SVG map toggles its corresponding detail panel. Each panel describes the domain's purpose and key concepts.

**How it works:** The `<details>` elements provide the core interaction natively (no JavaScript required). The JS enhancement adds SVG territory → panel sync: clicking a territory ellipse opens that territory's panel and closes the others. A small triangular marker (▸) rotates to indicate open state. The JS also adds keyboard support (`Enter`/`Space` to toggle) and ARIA attributes for accessibility.

**Why it's there:** Field guides use fold-out plates and layered maps to pack dense information into a compact form. The foldable panels mirror this — the map shows spatial relationships at a glance, and unfolding a territory reveals its depth. It rewards the reader who wants to go deeper without overwhelming the reader who wants the overview.

**Graceful degradation:** Without JavaScript, `<details>` elements function natively. The SVG ellipses are not clickable, but the panels below the map are fully operable. Every piece of information in the panels is accessible.

### Moment 3: Chapter-end vignette stamp

**Where:** Resources and Tools (page 4), at the bottom of the page after the final content section.

**What:** A closing stamp reading "End of Orientation" appears at the natural end of the Orientation chapter, preceded by a small fleuron ornament (❧). The stamp fades and scales into view when it scrolls into the viewport, as if being pressed onto the page.

**How it works:** The stamp starts invisible and slightly scaled down. An `IntersectionObserver` watches for it to enter the viewport (30% threshold), then adds the `.is-visible` class to trigger a CSS transition (fade + scale to final position + rotation to stamp angle). The CSS `no-js` fallback class shows the stamp immediately, static, when JavaScript is unavailable. `prefers-reduced-motion` disables the animation entirely — the stamp renders at its final position.

**Why it's there:** A chapter-end mark punctuates the reading experience and signals completion. In a printed field guide, chapters often end with a small ornament or stamp — a visual breath before the next section. The subtle reveal makes the stamp feel applied rather than rendered, reinforcing the tactile, object-like quality of the handbook.

**Graceful degradation:** Without JavaScript, the stamp is fully visible as a static element. Without CSS (or with reduced motion), it appears without animation.

### Implementation notes

- All discovery CSS lives in `www/StarterSite/assets/css/discovery.css` and references design tokens exclusively.
- All discovery JS lives in `www/StarterSite/assets/js/discovery.js` — vanilla, no dependencies, under 2 KB uncompressed.
- The `<html>` element carries a `no-js` class that is removed by `discovery.js` on load, allowing CSS to provide fallback static rendering when JS is unavailable.
- Both `discovery.css` and `discovery.js` are piped through Hugo's asset pipeline (`resources.Get`, `minify`, `fingerprint`) in `baseof.html`.

## Decision Log

- **2026-06-13:** Field guide chosen as the booklet metaphor over game manual, operating manual, and grimoire. Rationale: field guide maps most naturally to employee orientation and onboarding; supports the tactile, illustrated, authored qualities in VISION.md without game-specific or arcane connotations.
- **2026-06-13:** "Spread" selected as the primary layout unit rather than scrollable pages. This is the single most consequential design decision for rejecting "website" conventions — it forces composition for facing pages, not infinite viewports.
- **2026-06-13:** Authorial voice and marginalia/annotation layer are required, not optional. VISION.md's "must feel authored" and the field-guide metaphor both demand a visible creator presence. A handbook that reads as neutral institutional text fails.
- **2026-06-13:** Three signature discovery moments selected for the proof-of-concept: hover marginalia reveal, foldable diagram territory panels, and chapter-end vignette stamp. Rationale: these three are distinctly different mechanisms (hover, click, scroll); each reinforces a different aspect of the field-guide metaphor (annotation, layered maps, chapter punctuation); all three degrade gracefully without JavaScript and respect `prefers-reduced-motion`. Restraint over excess — three signatures, not pervasive motion.
