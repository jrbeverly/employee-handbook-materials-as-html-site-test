# Handbook Visual Language

This document defines the visual language and design tokens for the employee handbook proof-of-concept. Every decision is traceable to a constraint in the [design brief](handbook-booklet-experience.md). Implementation artifacts (`tokens.css`, Hugo templates) read from this document, not the brief.

## Typography

The type system uses two faces: one serif for body and display, one handwriting-adjacent face for annotations and marginalia. A single serif family at different optical sizes carries the field-guide voice — studied, warm, authoritative. The annotation face provides the second-reader layer that makes the handbook feel authored.

### Text and display: Crimson Pro

**Crimson Pro** (variable, Google Fonts, OFL) is a Garamond-inspired workhorse serif. It was designed explicitly for readability and economy — it sets well at small sizes (field-guide compactness) and has enough character at display sizes to carry headings without needing a second display face.

**Why Crimson Pro over the alternatives:**

|   Candidate            |   Problem for this handbook                                                                    |
|   ------------------   |   ---------------------------------------------------------------------------------------      |
|   Inter / system-ui    |   Brief constraint #3: no generic sans-serif + blue-accent. Default web stack fail.            |
|   Source Serif 4       |   Solid but reads as "documentation" rather than "designed artefact."                          |
|   Lora                 |   Good but its contemporary curves read as blog, not field guide.                              |
|   Libre Baskerville    |   Excellent but heavier on screen; works against compactness.                                  |
|   Playfair Display     |   Striking at display sizes but distracting at text sizes. Would require a second body face.   |

Crimson Pro is a single-face solution: its variable weight axis (200–900) and optical sizing cover every role from dense marginalia to chapter titles. It reads as _printed_ without being precious.

**Usage:**

|   Role             |   Weight   |   Size range          |   Notes                                                |
|   --------------   |   ------   |   -----------------   |   --------------------------------------------------   |
|   Body text        |   400      |   1rem–1.0625rem      |   Slightly generous x-height aids compact layout       |
|   Lead / intro     |   400      |   1.125rem–1.25rem    |   Slightly larger, maybe italic                        |
|   Subhead          |   600      |   1rem                |   Small caps via `font-feature-settings`               |
|   Section title    |   600      |   1.5rem–2rem         |   Variable optical sizing kicks in                     |
|   Chapter title    |   700      |   2.5rem–3.5rem       |   Display optical size                                 |

### Annotation and marginalia: Caveat

**Caveat** (Google Fonts, OFL) is a handwriting-style face with natural variation. It is informal without being childish, legible at small sizes, and reads as a real person's hand — exactly the authored-marginalia quality the brief demands.

**Why Caveat over the alternatives:**

|   Candidate                 |   Problem                                                    |
|   -----------------------   |   --------------------------------------------------------   |
|   Indie Flower              |   Too casual, reads as doodle not annotation.                |
|   Kalam                     |   Too decorative; draws attention to itself, not the note.   |
|   Architects Daughter       |   Too whimsical for a field guide.                           |
|   Reenie Beanie             |   Good energy but too large and loose at small sizes.        |

Caveat sits in the right register: a person marking up their own guide with a pencil or pen. It is used _only_ for marginalia, annotations, stamps, and callout asides — never for body text or primary navigation.

### Font stack fallback

```text
body:        Crimson Pro, Georgia, 'Times New Roman', serif
marginalia:  Caveat, 'Segoe Script', 'Comic Sans MS', cursive
monospace:   'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace
```

Georgia is the best available system serif fallback on all platforms.

---

## Palette

The palette evokes ink on paper with restrained, earthy accents. Every color has a role; there are no unused slots.

### Core colors

|   Token                  |   Hex         |   Role                                                       |
|   --------------------   |   ---------   |   --------------------------------------------------------   |
|   `--color-paper`        |   `#f5f1e8`   |   Page background — warm cream, not stark white              |
|   `--color-ink`          |   `#1e1a16`   |   Primary text — dark brown-black, not #000                  |
|   `--color-ink-muted`    |   `#5c5650`   |   Secondary text, captions, folios                           |
|   `--color-accent`       |   `#4a6741`   |   Primary accent — muted sage/forest green                   |
|   `--color-stamp`        |   `#3a5070`   |   Stamp marks — faded navy, like an ink stamp                |
|   `--color-notation`     |   `#c75b39`   |   Marginalia, annotations — terracotta red, like red pencil  |
|   `--color-rule`         |   `#d4c9b8`   |   Hairlines, rules, borders — warm tan                       |

### Extended palette

|   Token                      |   Hex         |   Role                                               |
|   ------------------------   |   ---------   |   ------------------------------------------------   |
|   `--color-paper-dark`       |   `#e8e0d0`   |   Alternate paper tone (callout backgrounds)         |
|   `--color-accent-light`     |   `#dce8d6`   |   Tinted panel behind accent content                 |
|   `--color-diagram-line`     |   `#8c8273`   |   Diagram strokes — warm grey, recedes from ink      |
|   `--color-diagram-fill`     |   `#e6e0d5`   |   Diagram fills — subtle tone distinct from paper    |
|   `--color-callout-bg`       |   `#faf7f0`   |   Callout background — slightly lighter paper        |
|   `--color-callout-border`   |   `#d4c9b8`   |   Callout border — same as rule                      |

### Rationale

**Why these colors satisfy the brief:**

- **Not SaaS-dashboard.** No blue-primary (#2563eb, #0d47a1), no purple accent, no gradient-over-hero palette. The dominant tone is paper, not brand.
- **Printed/manual feel.** Ink is brown-black, not screen-optimized near-black (#111, #222). The paper base is cream, not white — it suggests physical pages.
- **Constraint #3 (no generic corporate web):** The palette has no blue at all. The green accent reads as geographic/field-guide (maps, landscape) rather than corporate. The terracotta marginalia reads as red-pencil annotation.
- **Constraint #9 (authored):** A red-pencil annotation color (`--color-notation`) is reserved for the authorial layer. It is a signature of the handbook, not a generic alert/warning color.
- **Compactness works with restraint.** Fewer colors, used consistently, make the object feel designed rather than themed.

### Anti-palette (what must not appear)

- No Tailwind defaults: no `slate-*`, `blue-*`, `indigo-*`, `emerald-*`
- No pure black (`#000`) or pure white (`#fff`)
- No CSS system-color keywords for primary roles
- No transparency overlays over photography (hero-gradient pattern)

---

## Page Geometry

The handbook is composed for **pages** and **spreads**, not for an infinite scrolling viewport. Every dimension is a design token so templates never hard-code values.

### Page and spread

```text
┌─────────────────────────────────────────────────────┐
│                   viewport                           │
│  ┌───────────────────────────────────────────────┐  │
│  │                spread background               │  │
│  │  ┌──────────────────┐  ┌──────────────────┐   │  │
│  │  │                  │  │                  │   │  │
│  │  │   left page      │  │   right page     │   │  │
│  │  │                  │  │                  │   │  │
│  │  │                  │  │                  │   │  │
│  │  │                  │  │                  │   │  │
│  │  │                  │  │                  │   │  │
│  │  └──────────────────┘  └──────────────────┘   │  │
│  │                                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

|   Token                  |   Value                                                   |   Notes                                                   |
|   --------------------   |   -----------------------------------------------------   |   -----------------------------------------------------   |
|   `--page-width`         |   `36rem`                                                 |   Compact: a field guide you carry, not an encyclopedia   |
|   `--page-min-height`    |   `48rem`                                                 |   Minimum page depth; content can exceed (pages "grow")   |
|   `--spread-gap`         |   `2rem`                                                  |   Visible division between facing pages                   |
|   `--spread-max-width`   |   `calc(2 * var(--page-width) + var(--spread-gap))`       |   Full spread width                                       |

### Page margins

```text
┌──────────────────── page ────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← page edge
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │                                       │   │
│  │        content area                   │   │
│  │                                       │   │
│  │                                       │   │
│  │  ┌─ marginalia slot (right page)      │   │
│  │  │                                    │   │
│  └──│────────────────────────────────────┘   │
│     │                                        │
│     └────────────────────────────────────────│
│                                              │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← folio zone
└──────────────────────────────────────────────┘
```

|   Token                     |   Value      |   Notes                                                  |
|   -----------------------   |   --------   |   ----------------------------------------------------   |
|   `--page-padding-top`      |   `3rem`     |   Breathing room above content                           |
|   `--page-padding-bottom`   |   `3rem`     |   Breathing room below content, folio sits here          |
|   `--page-padding-left`     |   `2.5rem`   |   Inner margin — keeps text away from spine/binding      |
|   `--page-padding-right`    |   `1.5rem`   |   Outer margin — tighter, marginalia extends into it     |
|   `--marginalia-width`      |   `10rem`    |   Width of the marginalia column                         |
|   `--marginalia-offset`     |   `1rem`     |   Gap between content edge and marginalia start          |

The asymmetrical margins (wider left on left pages, wider right on right pages — mirrored for the spread) echo bound-book geometry and create space for marginalia on the outer edge of each page.

### Baseline rhythm

|   Token                  |   Value       |   Notes                                              |
|   --------------------   |   ---------   |   -----------------------------------------------    |
|   `--baseline`           |   `1.5rem`    |   Base line-height and vertical spacing unit         |
|   `--baseline-half`      |   `0.75rem`   |   Half-unit for tighter spacing                      |
|   `--baseline-double`    |   `3rem`      |   Double unit for section breaks                     |

All vertical spacing (margins, padding between sections, paragraph spacing) must be a multiple of `--baseline`. This creates a printed-page rhythm even though the web has no literal baseline grid.

### Column and content geometry

|   Token                     |   Value      |   Notes                                                      |
|   -----------------------   |   --------   |   --------------------------------------------------------   |
|   `--content-width`         |   `30rem`    |   Available content width within a page (after padding)      |
|   `--content-measure`       |   `28rem`    |   Max width for prose blocks (readability line length)       |
|   `--spread-content-max`    |   `62rem`    |   Content area spanning both pages (for plates, maps)        |

---

## Page Furniture Vocabulary

Every furniture element is a design token, not a one-off style. Templates reference the vocabulary; tokens enforce consistency.

### Folio (page number)

```text
┌──────────────────────────────────────────────┐
│                                              │
│                   content                    │
│                                              │
│                                    ── 7 ──   │  ← folio
└──────────────────────────────────────────────┘
```

- Position: bottom-right on right pages, bottom-left on left pages
- Type: `--font-marginalia` or small `--font-text` at `0.875rem`
- Color: `--color-ink-muted`
- Token: `--folio-font-size`, `--folio-color`
- Spacing: sits within `--page-padding-bottom`, vertically centered in that zone

### Running header

```text
  Field Guide                                Orientation
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                   page content                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- Position: top of page, left-aligned section name, right-aligned chapter name
- Type: small caps via `font-feature-settings: "smcp"` on `--font-text`
- Color: `--color-ink-muted`
- Token: `--running-header-font-size`, `--running-header-color`

### Marginalia

```text
                                ┌─────────────────────┐
  Body text continues here      │ ↪ This is a note     │
  through the content column.   │ in the margin —      │
  The marginalia column sits     │ an authorial aside   │
  to the outer edge.            │ or a pointer to      │
                                │ related content.     │
                                └─────────────────────┘
```

- Position: outer margin of each page, right of content on right pages
- Width: `--marginalia-width`
- Type: `--font-marginalia` (Caveat)
- Color: `--color-notation`
- Content: annotations, cross-references, tips, warnings, asides
- Token: `--marginalia-font-size`, `--marginalia-color`, `--marginalia-width`, `--marginalia-offset`

### Stamp

A stamp is a small, repeated mark of ownership or category — like an ink stamp pressed onto a page. It should feel _applied_, not _rendered_.

- Visual: CSS border + border-radius with a slightly irregular treatment (rotation via `transform: rotate(-3deg)`), optionally a dashed or double border
- Color: `--color-stamp`
- Placement: top-right corner of a section or beside a key term
- Token: `--stamp-border-color`, `--stamp-border-style`, `--stamp-color`, `--stamp-font-size`

### Callout

A boxed note that interrupts the main flow for something important.

```text
┌─────────────────────────────────────────────────┐
│ ⚠  Important: This section describes how        │
│    the organization makes decisions. Reading it  │
│    will help you understand how to get things    │
│    approved.                                     │
└─────────────────────────────────────────────────┘
```

- Background: `--color-callout-bg`
- Border: `1px solid var(--color-callout-border)`
- Type: `--font-text`, slightly smaller or tighter
- Token: `--callout-bg`, `--callout-border`, `--callout-padding`

### Rule / ornament

Horizontal dividers between sections. Should feel like a printed rule, not a CSS border.

- Style: thin (`1px`) solid line in `--color-rule`
- Optional: a small centered ornament (◆, *, ⁂) replacing or overprinting the rule
- Token: `--rule-color`, `--rule-thickness`

### Diagram

Line-based visual explanation. Diagrams use a constrained stroke vocabulary.

- Stroke: `--color-diagram-line`
- Fill: `--color-diagram-fill`
- Line weight: 1.5px for primary, 1px for secondary
- Token: `--diagram-stroke`, `--diagram-fill`, `--diagram-stroke-width`, `--diagram-stroke-width-thin`

---

## Moodboard: Annotated Spread Sketch

The following ASCII sketch shows how a representative spread assembles the typography, palette, geometry, and furniture into a coherent page. This is a layout reference, not a final layout — actual template implementation is the runtime milestone.

```text
┌─ Left page (p.2) ─────────────────────┬─ Right page (p.3) ───────────────────┐
│                                        │                                       │
│  HOW TO USE THIS GUIDE                 │  ORIENTATION                          │
│  ──────────────────────                │  ────────────                         │
│                                        │                                       │
│  This handbook is a field guide to     │  The organization is structured       │
│  the organization. Like any field      │  around three domains:                │
│  guide, it is meant to be carried,     │                                       │
│  annotated, and returned to.           │    ┌──────────────────────┐           │
│                                        │    │  PRODUCT             │           │
│  ≡ You do not need to read it in       │    │  ───────             │           │
│    order. Start where you need to.     │    │  What we build and   │           │
│    The key on page 4 explains the      │    │  why it matters.     │           │
│    symbols used throughout.            │    └──────────────────────┘           │
│                                        │                                       │
│  ≡ Marginal notes like this one are    │    ┌──────────────────────┐           │
│    asides — commentary, tips, or       │    │  CRAFT               │           │
│    reminders from someone who has      │    │  ─────               │           │
│    been here before you.               │    │  How we work and     │           │
│                                        │    │  the standards we    │
│                                        │    │  hold ourselves to.  │
│                                        │    └──────────────────────┘           │
│                                        │                                       │
│  ┌─ marginalia ──────────────────┐     │    ┌──────────────────────┐           │
│  │ ↪ The symbols are explained    │     │    │  PEOPLE              │           │
│  │   in more detail in the Key    │     │    │  ──────              │           │
│  │   on page 4.                   │     │    │  How we grow, who    │           │
│  └────────────────────────────────┘     │    │  we are, and how we  │           │
│                                        │    │  support each other. │           │
│                                        │    └──────────────────────┘           │
│                                        │                                       │
│                             ── 2 ──    │                             ── 3 ──   │
└────────────────────────────────────────┴───────────────────────────────────────┘
        │                                                          │
        └── spread background: warm paper (--color-paper) ────────┘
```

**How this sketch satisfies the brief:**

- **Spread composition (constraint #1):** Content is composed for facing pages, not scrollable columns. The two-page structure is visible even in this wireframe.
- **Not a landing page (constraint #3):** No hero, no gradient, no CTA. The spread opens directly into content.
- **Marginalia (constraint #9, authored):** The annotation column on the left page demonstrates the second-reader layer.
- **Diagram (field-guide):** Simple box diagrams on the right page explain structure — illustrated, not just stated.
- **Page numbers (foliage):** Bottom corners ground the reader.
- **Compact:** The page width (~36rem) keeps lines to a readable ~65–75 characters.

### Visual references

These are not sources to copy; they are touchstones for the sensibility the visual language should produce. The implementation team should not reproduce their specific layouts, illustration styles, or content structures.

|   Reference                            |   What to draw from it                                                                                                                |
|   ----------------------------------   |   ------------------------------------------------------------------------------------------------------------------                  |
|   Peterson Field Guides                |   Compact page proportions, integration of illustrations with text, restrained use of color for identification, margin symbols/keys   |
|   Sibley Guides                        |   Diagrammatic precision, visual explanation as primary communication mode, page-as-canvas composition                                |
|   National Park visitor guides         |   Warm, inviting tone; maps and orientation; the sense of entering a place                                                            |
|   Vintage Boy Scout field books        |   Stamp and badge vocabulary, annotated illustrations, "handed-down" feel, uncoated-paper aesthetic                                   |
|   _Tunic_ instruction booklet          |   Atmosphere and intentionality (not layout or illustration style). The booklet is an object, not a document.                         |
|   Edward Tufte's book designs          |   Margin notes as equal citizens with body text, generous use of space for thought, typographic restraint                             |

---

## Design Tokens

The visual language is encoded as CSS custom properties in `www/StarterSite/assets/css/tokens.css`. Every value above has a corresponding token; no magic numbers appear in templates.

### Token naming convention

```text
--<category>-<property>[-<variant>]
```

|   Category        |   Example tokens                                                       |
|   -------------   |   ------------------------------------------------------------------   |
|   `font`          |   `--font-text`, `--font-marginalia`                                   |
|   `color`         |   `--color-paper`, `--color-ink`, `--color-notation`                   |
|   `page`          |   `--page-width`, `--page-padding-top`                                 |
|   `marginalia`    |   `--marginalia-width`, `--marginalia-color`                           |
|   `baseline`      |   `--baseline`, `--baseline-half`                                      |
|   `folio`         |   `--folio-font-size`, `--folio-color`                                 |
|   `stamp`         |   `--stamp-color`, `--stamp-border-color`                              |
|   `callout`       |   `--callout-bg`, `--callout-padding`                                  |
|   `rule`          |   `--rule-color`, `--rule-thickness`                                   |
|   `diagram`       |   `--diagram-stroke`, `--diagram-fill`                                 |
|   `spread`        |   `--spread-gap`, `--spread-max-width`                                 |

### Token consumption

Templates (`layouts/`, `assets/css/`) reference tokens exclusively:

```css
/* ✅ Correct: token-driven */
.page {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-text);
  padding: var(--page-padding-top) var(--page-padding-right)
           var(--page-padding-bottom) var(--page-padding-left);
}

/* ❌ Wrong: magic value */
.page {
  background: #f5f1e8;
  color: #1e1a16;
  font-family: 'Crimson Pro', serif;
}
```

---

## Illustration Art Style

This section defines the illustration and iconography art style for the handbook. Illustrations are SVG assets stored in `www/StarterSite/assets/illustrations/` and rendered through the `illustrations` front-matter slot mechanism (see `docs/handbook-authoring.md`).

### Guiding principles

- **Illustrated, not decorated.** Every illustration explains, orients, or reveals structure. If removing an illustration would not reduce understanding, the illustration does not earn its place.
- **Line art first.** Illustrations are built from strokes, not filled shapes. The primary visual vocabulary is lines, circles, ellipses, and simple geometric paths — not complex bezier curves, gradients, or photographic textures.
- **Restrained palette.** Illustrations use only the diagram tokens: `var(--color-diagram-fill)` for fills, `var(--color-diagram-stroke)` for strokes, `var(--color-ink)` and `var(--color-ink-muted)` for labels, and `var(--color-accent)` for emphasis elements. Never introduce ad-hoc colors.
- **Field-guide economy.** An illustration should feel compact and intentional, like a diagram in a Peterson or Sibley field guide. There are no gradients, no drop shadows, no photographic fills.
- **SVG-first.** All illustrations are standalone SVG files with `viewBox`, `role="img"`, and meaningful `aria-label`. They scale responsively via CSS `max-width: 100%; height: auto`.

### Stroke vocabulary

| Element | Stroke | Color | Notes |
| ------- | ------ | ----- | ----- |
| Primary shapes (ellipses, circles, rects) | 1.5px | `var(--color-diagram-stroke)` | Matches `--diagram-stroke-width` token |
| Secondary lines (connectors, paths, axes) | 1px | `var(--color-diagram-stroke)` | Matches `--diagram-stroke-width-thin` token |
| Dashed paths (routes, connections) | 1px, dasharray 6,4 | `var(--color-diagram-stroke)` | Indicates conceptual rather than physical connections |
| Decorative contours | 0.75px | `var(--color-diagram-stroke)` | Low opacity, recedes from primary content |
| Accent paths (feedback loops, emphasis) | 1px | `var(--color-accent)` | Used sparingly for key relationships |

### Typography in illustrations

All text in illustrations uses the font stack `"Crimson Pro", Georgia, serif` (matching `--font-text`). Size conventions:

| Role | Font size | Weight | Color |
| ---- | --------- | ------ | ----- |
| Title label | 14–16px | 600 | `var(--color-ink)` |
| Body label | 11–13px | 600 | `var(--color-ink)` |
| Subtitle or qualifier | 9–11px | 400 | `var(--color-ink-muted)` |
| Italic note | 10–11px | 400 italic | `var(--color-accent)` or `var(--color-ink-muted)` |

No text below 9px. Text should be horizontally centered on its anchor point using `text-anchor="middle"` for labels centered on shapes, or `text-anchor="start"` for labels beside shapes.

### Fill conventions

| Element | Fill | Purpose |
| ------- | ---- | ------- |
| Territory/region shape | `var(--color-diagram-fill)` | Distinguishes a conceptual region from the paper |
| Emphasis node (e.g., Wednesday) | `var(--color-accent-light)` | Highlights a single element within a set |
| Background panel | `var(--color-paper)` | Rests on the paper — provides a defined frame |
| Center mark | `var(--color-ink)` | Small filled circle for a focal point |

Most shapes use no fill (`fill="none"`) — the line art aesthetic prefers strokes over filled areas.

### Proportions and viewBox

| Illustration type | viewBox size | Placement |
| ----------------- | ------------ | --------- |
| Chapter-opener plate | ~400×240 | Centered within `.booklet-chapter-opener` flex column |
| Spot diagram | ~360×200 | Within `.booklet-content` measure (28rem max) |
| Wide diagram (full-bleed) | ~600×400 | Fills `.booklet-full-bleed` container |

viewBox aspect ratios are intentionally horizontal — the page width (~36rem) is wider than it is tall, and illustrations should not force unnecessary scrolling within a page.

### Accessibility requirements

Every illustration SVG must:
- Carry `role="img"` and `aria-label` on the root `<svg>` element
- Use text elements for all readable labels (not paths or images of text)
- Ensure sufficient contrast: text labels using `var(--color-ink)` (#1e1a16) on `var(--color-diagram-fill)` (#e6e0d5) achieve 10.5:1 contrast ratio
- Function as static content without JavaScript, CSS, or animation
- Reference CSS custom properties so illustrations adapt to forced-colors mode via the existing `forced-colors: active` media query

The `alt` field on each illustration reference (in front matter or shortcode) must be meaningful — it describes what the illustration depicts and why it matters, not merely its visual appearance. Decorative alt text ("Illustration", "Diagram") fails the accessibility requirement.

### File organization

Illustration SVGs live in `www/StarterSite/assets/illustrations/` and follow kebab-case naming:

```text
chapter-{N}-{slug}.svg     # Chapter-opener plates (one per chapter)
{descriptive-name}.svg      # Spot illustrations and diagrams
```

Examples: `chapter-1-bearings.svg`, `weekly-cadence.svg`, `domain-icons.svg`.

---

## Decision Log

- **2026-06-13:** Crimson Pro selected as the single serif face for text and display. Rationale: variable font covers all optical sizes; Garamond-inspired design reads as printed/field-guide without being precious; single-face system enforces restraint (constraint #11: every element must earn its place).
- **2026-06-13:** Caveat selected for marginalia and annotations. Rationale: handwriting-adjacent without being childish; legible at small sizes; supports the "authored" quality in constraint #9.
- **2026-06-13:** Palette centered on cream paper (`#f5f1e8`) and brown-black ink (`#1e1a16`). Rationale: no blue (constraint #3), no pure black/white, evokes printed pages. Accent colors are all earthy/muted — forest green, terracotta, faded navy.
- **2026-06-13:** Page width set to `36rem`. Rationale: compact field-guide proportions; ~65–75 characters per line for readability; works on viewports down to ~400px with margin reduction.
- **2026-06-13:** Spread chosen as the primary layout unit. Rationale: constraint #1 and the design brief decision log; forces composition for facing pages rather than infinite scrolling.
- **2026-06-13:** Asymmetrical page margins (wider inner, narrower outer with marginalia slot). Rationale: echoes bound-book geometry; reserves outer margin for the annotation layer without shrinking the content column.
- **2026-06-13:** Baseline rhythm set at `1.5rem`. Rationale: all vertical spacing is a multiple of this unit, creating the printed-page rhythm that constraint #2 (visually distinctive) and constraint #8 (form carries concept) require.
- **2026-06-13:** Font stacks include web-safe fallbacks for every face, including `Georgia` as the serif fallback (best available system serif on all platforms).
- **2026-06-13:** Illustration art style defined. Line art aesthetic using diagram tokens exclusively (no ad-hoc colors). Stroke vocabulary: 1.5px primary shapes, 1px connectors, 0.75px decorative. Text at 9–16px in Crimson Pro. All illustrations are standalone SVGs with `role="img"` and meaningful `aria-label`, rendered through the `illustrations` front-matter slot mechanism.
