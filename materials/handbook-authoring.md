# Handbook Authoring Guide

This document is the contract for authoring handbook content. It defines the file format, front-matter schema, folder layout, slug rules, shortcodes, and workflow so a new chapter can be added without engineering follow-up.

Everything the runtime consumes is documented here. If a field or shortcode is not in this document, the runtime does not read it.

## Quick Start

Add a chapter in three steps:

1. **Create a Markdown file** in `www/StarterSite/content/handbook/` with YAML front matter.
2. **Assign a `page_form`** to choose the layout (single-page, spread, chapter-opener, etc.).
3. **Run `make serve`** to preview locally at `http://localhost:1313`.

That is it. No template editing, no Hugo configuration changes, no build-pipeline wiring.

## Folder Layout

```text
www/StarterSite/content/
├── _index.md              # Cover page (home page, page_form: cover)
└── handbook/
    ├── _index.md           # Table of Contents (section list, page_form: toc)
    ├── orientation.md      # Chapter 1 opener
    ├── domains.md          # Spread (left: How to Use / right: Three Domains)
    ├── resources.md        # Single-page content
    ├── map.md              # Full-bleed SVG diagram
    └── reference.md        # Marginalia-heavy closing page
```

### Rules

- **Every handbook page lives in `www/StarterSite/content/handbook/`.** This directory is the `handbook` Hugo section.
- **`content/_index.md` is the cover.** It is the Hugo home page — the first thing a reader sees.
- **`content/handbook/_index.md` is the table of contents.** Hugo treats it as the section list page. The TOC partial auto-generates the entry list from child pages ordered by `page_number` front matter.
- **Each chapter is one or more `.md` files** inside `content/handbook/`. A chapter opener plus its content pages are sibling files, ordered by `page_number` or `weight`.
- **Do not create nested subdirectories** inside `handbook/`. The booklet navigation system expects a flat section structure (section → pages). Nesting would require engineering changes to the sequential navigation and TOC partials.

### Filename conventions (slugs)

Filenames use **kebab-case**: lowercase alphanumeric with hyphens between words.

```text
✅ orientation.md
✅ getting-your-bearings.md
✅ the-three-domains.md

❌ Orientation.md
❌ getting_your_bearings.md
❌ TheThreeDomains.md
```

The filename becomes the Hugo slug (URL path). `content/handbook/orientation.md` is served at `/handbook/orientation/`. Choose a filename that produces a readable, stable URL — it is part of the handbook's public surface and should not change after publication.

## File Format

Every handbook page is a **Markdown file with YAML front matter**, delimited by `---`:

```markdown
---
title: "Getting Your Bearings"
short_title: "Orientation"
chapter: "Orientation"
section: "Field Guide"
chapter_number: 1
description: "This chapter introduces the organization's structure, rhythm, and essential patterns."
page_form: chapter-opener
page_number: 1
weight: 1
---

Body content here. Standard Markdown with optional shortcodes.
```

Hugo processes the body through its Markdown renderer (Goldmark). Shortcodes are Hugo template calls delimited by `{{</* ... */>}}`.

## Front-Matter Schema

Every field the runtime reads is listed below. Fields not in this table are ignored by the runtime and should not appear in content files.

### All page forms

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `title` | string | **Yes** | Page title. Displayed in the browser tab, the page `<h1>` (single-page, spread right), chapter-opener title, and as fallback link text in the TOC and sequential nav. |
| `page_form` | string | **Yes** | Layout form. One of: `cover`, `toc`, `chapter-opener`, `single-page`, `spread`, `full-bleed`, `marginalia-heavy`. Defaults to `single-page` if unset or unrecognized. |
| `page_number` | string \| number | No | Folio number displayed at page bottom. Front matter uses roman numerals (`"i"`, `"ii"`); body uses arabic (`1`, `2`, …). Used as the page container `id` (`id="page-N"`) for cross-reference linking. Pages without `page_number` have no folio. |
| `weight` | number | No | Ordering hint for Hugo's page sort. Sequential navigation and the TOC use `page_number` ordering; `weight` is the fallback when `page_number` is absent or equal. Set `weight` to control the order of pages with matching or missing `page_number`. |
| `short_title` | string | No | Compact title for constrained spaces: the TOC entry and the sequential nav link text. Falls back to `title` when absent. |
| `section` | string | No | Left side of the running header. Typically `"Field Guide"` for all pages. When absent, the left header slot is empty. |
| `chapter` | string | No | Right side of the running header — the chapter name. Displayed in small caps. When absent, the right header slot is empty. |

### Cover (`page_form: cover`)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `subtitle` | string | No | Subtitle below the cover title. Rendered in italic Crimson Pro at `--text-md`. |
| `stamp` | string | No | Edition stamp text (e.g. `"First Edition"`). Rendered as a rotated, dashed-border label in the stamp font and color. |

### Chapter opener (`page_form: chapter-opener`)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `chapter_number` | number | No | Displayed as "Chapter N" above the title. |
| `description` | string | No | Paragraph below the chapter title describing what the chapter covers. |

### Spread (`page_form: spread`)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `spread_left` | string | **Yes** | Markdown content for the left page. Multi-line via YAML `\|`. |
| `left_chapter` | string | No | Chapter name for the left page's running header (right slot). When absent, the left page has no chapter in the header. |
| `left_page_number` | string \| number | No | Folio for the left page. When absent, the left page has no folio. |

### Full-bleed (`page_form: full-bleed`)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `caption` | string | No | Caption below the full-bleed content (e.g. `"Fig. 1 — Description"`). Rendered in italic at the page bottom. |
| `diagram_details` | array | No | Foldable detail panels below the full-bleed content. Each item has `id` (anchor target), `label` (summary text), and `description` (Markdown body revealed when expanded). |

### Marginalia-heavy (`page_form: marginalia-heavy`)

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `marginalia` | array | No | Marginalia items rendered in the sidebar column. Each item has `text` (Markdown string) and optional `discovery` (boolean, default `false`). When `discovery: true`, the note tilts slightly and straightens on hover — the hover-reveal signature moment. |

### Table of contents (`page_form: toc`)

The TOC page needs no additional front matter beyond the all-page-form fields. The TOC list is auto-generated from child pages in the `handbook` section, ordered by `page_number`.

### Illustrations (`illustrations` array)

The `illustrations` front-matter field references SVG illustrations that render through the illustration slot. Illustrations are looked up by name from `www/StarterSite/assets/illustrations/`.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `illustrations` | array | No | Page-level illustrations (plates, diagrams, sketches). Rendered by the illustration slot in the page layout. |

Each item in the `illustrations` array has:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `name` | string | **Yes** | SVG filename without extension, looked up from `assets/illustrations/`. |
| `alt` | string | **Yes** | Meaningful alt text describing the illustration. Must not be decorative. |
| `caption` | string | No | Optional figure caption rendered below the illustration. |

**Example:**

```yaml
illustrations:
  - name: "chapter-1-bearings"
    alt: "Compass rose with three directional arrows labeled Product, Craft, and People"
    caption: "Fig. 1 — The three domains as navigational directions"
```

### Future fields

These fields are reserved in the schema but not yet consumed by the runtime:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `tags` | array of strings | Topic tags for future filtered listing or search. Store now; the runtime will consume them when those features are added. |

## Shortcodes

Shortcodes place page furniture inline within Markdown body content. They work on any page form.

### stamp

Places a stamped label.

```text
{{</* stamp "Official" */>}}
```

Arguments: one positional (stamp text).

Renders as a rotated, dashed-border label in `--color-stamp` using the marginalia font.

### callout

Places a boxed note that interrupts the main flow.

```text
{{</* callout */>}}
**Important:** This section describes how the organization makes decisions.
Reading it will help you understand how to get things approved.
{{</* /callout */>}}
```

Paired shortcode. Inner content is Markdown.

Renders as a bordered box with `--color-callout-bg` background and `--color-callout-border` border.

### rule

Places a horizontal hairline rule.

```text
{{</* rule */>}}
```

No arguments. Renders as a `--rule-thickness` solid line in `--rule-color`.

### ornament

Places a horizontal rule with a centered ornament symbol.

```text
{{</* ornament "*" */>}}
```

Arguments: one positional (ornament character). Defaults to `*`. Common choices: `*`, `◆`, `⁂`, `~`.

Renders as a rule followed by a centered ornament in `--color-ink-muted`.

### marginalia (inline)

Places an annotation note within the content flow.

```text
{{</* marginalia */>}}
This is a note from someone who has been here before you.
It rewards attention but is not required reading.
{{</* /marginalia */>}}
```

Paired shortcode. Inner content is Markdown.

Renders as a left-bordered inset block using the marginalia font (Caveat), color (`--color-notation`), and size. Works on any page form.

### chapter-end

Places a closing stamp at the end of a chapter.

```text
{{</* chapter-end "End of Orientation" */>}}
```

Arguments: one positional (stamp text), optional `ornament` named parameter (defaults to `❧`).

Renders as an ornament followed by a stamp that reveals on scroll (IntersectionObserver). Without JavaScript, the stamp is static and visible.

### illustration

Places an inline spot illustration within body content.

```text
{{</* illustration name="weekly-cadence" alt="Weekly rhythm diagram" caption="Fig. 2 — The working week" */>}}
```

Arguments: `name` (required, SVG filename without extension), `alt` (required, meaningful description), `caption` (optional figure caption).

Renders as an inline SVG from `assets/illustrations/` wrapped in a `<figure>` with accessible markup. Works on any page form.

## Marginalia: Two Mechanisms

### Inline marginalia (any page form)

Use the `{{</* marginalia */>}}` shortcode within body Markdown. The note renders within the content column as a styled `<aside>`. Best for one-off annotations embedded in prose.

### Sidebar marginalia (`marginalia-heavy` only)

Use the `marginalia` front matter array. Items render in a dedicated sidebar column to the right of the content via CSS grid layout. Best when a page carries several notes and the sidebar placement reinforces the field-guide aesthetic.

Both mechanisms use the same design tokens, so their visual voice is identical.

### Discovery marginalia

Add `discovery: true` to a sidebar marginalia item to enable the hover-reveal signature moment: the note renders at a slight angle (2.5°) with subtly reduced opacity, and straightens on hover. Only the last marginalia item on a page should carry `discovery: true` — restraint over excess.

```yaml
marginalia:
  - text: "A standard note."
  - text: "A good field guide is never finished. Annotate yours."
    discovery: true
```

## Authoring Workflow

### Adding a new chapter

1. Create a new `.md` file in `www/StarterSite/content/handbook/` with a kebab-case filename:

   ```bash
   touch www/StarterSite/content/handbook/ways-of-the-work.md
   ```

2. Add YAML front matter at the top of the file:

   ```markdown
   ---
   title: "Ways of the Work"
   short_title: "Ways of Work"
   chapter: "Ways of the Work"
   section: "Field Guide"
   page_form: chapter-opener
   page_number: 14
   weight: 6
   ---
   ```

3. Add body content using Markdown and shortcodes.

4. Assign a `page_number` that fits into the handbook sequence. See the content map (`docs/vision/handbook-content-map.md`) for the planned page-number allocation.

5. Set `weight` to control ordering. Pages are ordered by `page_number` within the section; `weight` is the tiebreaker.

### How the runtime picks it up

- Hugo discovers all `.md` files in `content/handbook/` automatically when it builds.
- The `single.html` and `list.html` default templates read `page_form` from front matter and dispatch to the matching `layouts/partials/booklet/<form>.html`.
- The TOC partial (`toc.html`) lists all child pages ordered by `page_number`.
- The sequential-nav partial computes prev/next from the same ordered list.
- No registration, configuration, or build-pipeline change is needed.

### Previewing locally

```bash
# Start the Hugo dev server with live reload
make serve

# Or directly:
hugo server --source www/StarterSite
```

Open `http://localhost:1313` in a browser. Pages rebuild on save.

### Building the static site

```bash
# Validate the content and build into the site directory's public/ folder
make build

# Or directly:
hugo --source www/StarterSite
```

### Running checks

| Command | What it checks |
| ------- | -------------- |
| `make check` | Validate content structure and front matter. |
| `make build` | Run the content checks and build the Hugo site. |
| `make serve` | Start the Hugo development server with live reload. |

Always run `make build` after adding or editing content.

## Schema for Validation

Content files must conform to this schema so `make check` can validate them before Hugo builds the site.

### Required-per-form rules

| Page form | Required fields | Forbidden fields |
| --------- | --------------- | ---------------- |
| `cover` | `title` | `chapter_number`, `description`, `spread_left`, `left_chapter`, `left_page_number`, `caption`, `diagram_details`, `marginalia` |
| `chapter-opener` | `title` | `subtitle`, `stamp`, `spread_left`, `left_chapter`, `left_page_number`, `caption`, `diagram_details`, `marginalia` |
| `single-page` | `title` | `subtitle`, `stamp`, `chapter_number`, `description`, `spread_left`, `left_chapter`, `left_page_number`, `caption`, `diagram_details`, `marginalia` |
| `spread` | `title`, `spread_left` | `subtitle`, `stamp`, `chapter_number`, `description`, `caption`, `diagram_details`, `marginalia` |
| `full-bleed` | `title` | `subtitle`, `stamp`, `chapter_number`, `description`, `spread_left`, `left_chapter`, `left_page_number`, `marginalia` |
| `marginalia-heavy` | `title` | `subtitle`, `stamp`, `chapter_number`, `description`, `spread_left`, `left_chapter`, `left_page_number`, `caption`, `diagram_details` |
| `toc` | `title` | `subtitle`, `stamp`, `chapter_number`, `description`, `spread_left`, `left_chapter`, `left_page_number`, `caption`, `diagram_details`, `marginalia` |

A field is "forbidden" when the page form's partial does not read it. Including a spread-only field on a single-page form is harmless (it is ignored), but it signals a misclassification to reviewers. A future handbook-lint check will flag forbidden fields as warnings.

### Value constraints

| Field | Constraint |
| ----- | ---------- |
| `page_form` | Must be one of: `cover`, `toc`, `chapter-opener`, `single-page`, `spread`, `full-bleed`, `marginalia-heavy` |
| `page_number` | Must be unique within the `handbook` section. Front matter pages use roman numerals; body pages use arabic numerals. |
| `weight` | Integer. Lower values sort first. |
| `marginalia` | Each item must have a `text` field (non-empty string). `discovery` must be boolean when present. |
| `diagram_details` | Each item must have `id` (non-empty string), `label` (non-empty string), and `description` (non-empty string). |
| `chapter_number` | Positive integer. |
| `illustrations` | Each item must have `name` (non-empty string) and `alt` (non-empty string). `caption` is optional. |
| `tags` | Array of non-empty kebab-case strings. |

### Shortcode usage rules

| Shortcode | Constraints |
| --------- | ----------- |
| `stamp` | Must have a non-empty first argument. |
| `callout` | Must have non-whitespace inner content. |
| `marginalia` | Must have non-whitespace inner content. |
| `chapter-end` | Must have a non-empty first argument. |
| `rule` | No arguments. |
| `illustration` | Must have non-empty `name` and `alt` arguments. |
| `ornament` | First argument (if given) should be a single character. |

### Structural invariants

- Every page in `content/handbook/` must set `page_form`.
- `_index.md` at content root must be `page_form: cover`.
- `handbook/_index.md` must be `page_form: toc`.
- `page_number` values must form a contiguous sequence within the section (no gaps without documented justification).
- A `chapter-opener` page must be immediately followed (by `page_number` order) by its content pages, and another `chapter-opener` must not appear until the previous chapter's content pages are complete.

These invariants are enforced by review, not by the build system. A future `handbook-lint` script will automate them.

## Design Token Reference

Content authors do not normally need to reference tokens directly — templates and shortcodes apply them. When composing custom SVG diagrams or inline styles, use these CSS custom properties:

| Token | Role |
| ----- | ---- |
| `--color-paper` | Page background (`#f5f1e8`) |
| `--color-ink` | Primary text (`#1e1a16`) |
| `--color-ink-muted` | Secondary text, captions, folios (`#5c5650`) |
| `--color-accent` | Links, accents (`#4a6741`) |
| `--color-stamp` | Stamp marks (`#3a5070`) |
| `--color-notation` | Marginalia, annotations (`#b4512e`) |
| `--color-diagram-line` | Diagram strokes (`#8c8273`) |
| `--color-diagram-fill` | Diagram fills (`#e6e0d5`) |
| `--color-rule` | Hairlines, borders (`#d4c9b8`) |
| `--font-text` | Body typeface (Crimson Pro) |
| `--font-marginalia` | Annotation typeface (Caveat) |
| `--font-mono` | Monospace typeface |
| `--baseline` | Vertical rhythm unit (`1.5rem`) |

See `www/StarterSite/assets/css/tokens.css` for the full token catalog.
