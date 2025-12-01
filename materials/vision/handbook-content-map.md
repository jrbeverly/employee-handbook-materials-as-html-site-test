# Handbook Content Map

This document defines the chapter structure and page-form classifications for the employee handbook proof-of-concept. It translates the content scope from [VISION.md](../../VISION.md) and the design constraints from the [booklet design brief](handbook-booklet-experience.md) into a concrete table of contents — a sequence a reader would want to follow.

Every chapter is named in the vocabulary of a field guide, not a corporate HR taxonomy. Every page has an explicit page-form classification so the runtime layout system (`page_form` frontmatter → `booklet/` partials) has a known target.

## Content Architecture

The handbook is organized as a field guide to the organization: front matter that teaches the reader how to use the guide itself, seven chapters that build understanding from arrival through mastery, and back matter that makes the guide last beyond first reading.

The sequence is deliberate. A field guide is not a wiki — early chapters orient, middle chapters equip, later chapters deepen. The arc mirrors joining an organization: arrival, orientation, practice, belonging.

### Priority tiers

|Tier|Meaning|
|----|-------|
|**Demo**|Full content written and designed for the proof-of-concept. These chapters prove the direction.|
|**Stub**|Chapter structure and opening page exist; remaining pages are placeholder spreads. The shape of the handbook is visible without every page being complete.|

Four chapters are demo-tier (1, 2, 5, 7). Three are stub-tier (3, 4, 6). The stubs exist so the table of contents reads as a credible whole and future content work has a known place to land.

---

## Front Matter

Front matter orients the reader to the guide itself before the main body begins.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|—|Cover|`cover`|The handbook's front door. Title, subtitle, edition stamp. No folio.|
|i|How to Use This Field Guide|`single-page`|Explains the guide's conventions: symbols, marginalia, stamps, page numbering, how to navigate. Teaches the reader to read before they start reading.|
|ii|Contents|`toc`|Generated table of contents listing every chapter, its starting page, and a one-line description.|

---

## Chapters

### Chapter 1 — Getting Your Bearings

**Priority:** Demo

**Purpose:** The entry point. What a newcomer needs to understand in their first days — how the organization is structured, what to expect, and how to begin.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|1|Getting Your Bearings|`chapter-opener`|Chapter title page. Sets the tone and previews what this chapter covers.|
|2–3|How to Use This Guide / The Three Domains|`spread`|Left page: how to navigate this field guide, what marginalia and symbols mean, the ethos of starting where you need to. Right page: the three organizational domains (Product, Craft, People) as the fundamental lens for understanding how the organization works.|

**Seed content:** The existing `orientation.md` (chapter-opener) and `domains.md` (spread) map here.

---

### Chapter 2 — The Lay of the Land

**Priority:** Demo

**Purpose:** A visual map of the organizational landscape. Territories, paths, and relationships — explained through a signature diagram rather than prose alone.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|4|The Lay of the Land|`chapter-opener`|Chapter title page. Introduces the map as a way of seeing the organization spatially.|
|5|Organizational Map|`full-bleed`|An SVG territory map showing the three domains as overlapping territories, with paths connecting them. The map is the primary content; a caption anchors it.|
|6|Reading the Territory|`marginalia-heavy`|Detailed descriptions of each territory (Product, Craft, People) and how to navigate between them. Marginalia adds navigational tips and cross-references.|

**Seed content:** The existing `map.md` (full-bleed with SVG diagram and foldable `<details>` panels) maps to page 5.

---

### Chapter 3 — Field Notes for the First Week

**Priority:** Stub

**Purpose:** A practical, day-by-day companion for the first week. What to set up, who to meet, what rituals to join, what to read. Compact enough to actually use.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|7|Field Notes for the First Week|`chapter-opener`|Chapter title page. Frames the first week as exploration, not onboarding.|
|8|Setting Up Camp|`single-page`|The essentials to set up on day one: accounts, tools, communication channels, workspace. A checklist in prose form.|
|9–10|The First Week by Day|`spread`|Left page: Monday–Wednesday. Right page: Thursday–Friday. An annotated timeline of what to do and who to meet, with marginalia adding tips from previous arrivals.|

**Seed content:** None. This chapter is new.

---

### Chapter 4 — Tools of the Trade

**Priority:** Stub

**Purpose:** A compact reference to the systems, tools, and resources the organization uses. Not an exhaustive catalog — a field guide lists only what you need in the field.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|11|Tools of the Trade|`chapter-opener`|Chapter title page.|
|12|What You Will Need|`single-page`|Communication channels, documentation practices, development environment, support resources. Organized by need, not by system name.|
|13|The Workshop|`single-page`|Deeper dive into the development toolchain and how work gets built. Can be a stub in the proof-of-concept.|

**Seed content:** The existing `resources.md` (single-page) maps to page 12.

---

### Chapter 5 — Ways of the Work

**Priority:** Demo

**Purpose:** How the organization communicates, decides, and collaborates. This is not a policy document — it is a field guide to getting things done.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|14|Ways of the Work|`chapter-opener`|Chapter title page.|
|15|How We Talk to Each Other|`single-page`|Communication channels, async-first culture, where decisions live, how to write things down so others can find them.|
|16–17|The Rhythm of Work|`spread`|Left page: recurring rituals, meetings, cadences. Right page: how decisions get made and how to unblock yourself. Marginalia adds "in practice" notes from people who have been here.|

**Seed content:** None. This chapter is new.

---

### Chapter 6 — Field Marks & Characters

**Priority:** Stub

**Purpose:** How to recognize the organization's culture, values, and roles. Field marks are the distinctive features that tell you what kind of place this is. Characters are the roles you will encounter.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|18|Field Marks & Characters|`chapter-opener`|Chapter title page.|
|19–20|Field Marks / Characters|`spread`|Left page: the organization's values expressed as observable behaviors (field marks), not abstract statements. Right page: key roles and what they do, described as characters in the landscape rather than org-chart boxes.|
|21|Reading the Signals|`marginalia-heavy`|How to interpret what you see: recurring phrases, rituals, unwritten norms. The annotation layer carries the insider perspective.|

**Seed content:** None. This chapter is new.

---

### Chapter 7 — Signs & Signals

**Priority:** Demo

**Purpose:** Closing the guide. A key to the symbols used throughout, references for further exploration, and a colophon that reinforces the handbook as an authored object.

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|22|Signs & Signals|`chapter-opener`|Chapter title page.|
|23|Key to Symbols|`single-page`|A visual glossary mapping every stamp, marginalia convention, diagram symbol, and ornament to its meaning. Field guides always explain their symbols.|
|24|References & Further Reading|`marginalia-heavy`|Annotated references for going deeper. Marginalia carries the authorial voice — the "second reader" who has been here before.|
|25|Colophon|`single-page`|How this handbook was made. Typefaces, tools, design rationale. Closes the experience by reminding the reader this is an authored, intentional object — not a template.|

**Seed content:** The existing `reference.md` (marginalia-heavy) maps to page 24.

---

## Back Matter

|Page|Title|Page Form|Purpose|
|----|-----|---------|-------|
|26|Endpaper|`single-page`|A final page with a closing stamp and a note: _This field guide is never finished. Annotate yours. Add what you learn. Pass it on._|

---

## Page-Form Summary

The proof-of-concept exercises every implemented page form at least once:

|Page Form|Chapters Using It|Notes|
|---------|-----------------|-----|
|`cover`|Front matter|Single use — the handbook's front door.|
|`toc`|Front matter|Auto-generated from chapter structure.|
|`chapter-opener`|Every chapter (×7)|Title page for each chapter. Establishes the chapter numbering and visual rhythm.|
|`single-page`|Chapters 3, 4, 5, 7, front/back matter|The default prose form. Used for reference pages, how-to pages, and the colophon.|
|`spread`|Chapters 1, 3, 5, 6|The signature layout. Used when two ideas face each other (domains, timeline, rituals/decisions, marks/characters).|
|`full-bleed`|Chapter 2|The organizational map. The only full-bleed in the demo — restraint makes it a moment.|
|`marginalia-heavy`|Chapters 2, 6, 7|Used when the annotation layer carries significant meaning: territory descriptions, reading signals, references.|

---

## How This Map Satisfies the Design Brief

- **Constraint #1 (booklet, not website):** Content is composed for pages and spreads, not scrolling viewports. The chapter-opener → spread → single-page rhythm creates a printed-book pacing.
- **Constraint #6 (usable):** The chapter sequence answers the questions a real newcomer asks: _Where am I? How does this place work? What do I need? How do I get things done? Who are these people?_
- **Constraint #9 (authored):** Every chapter has a voice. Marginalia-heavy pages carry the second-reader layer. The colophon and key to symbols make the authorship visible.
- **Constraint #12 (explains why and how):** Chapters 5 (Ways of the Work) and 6 (Field Marks & Characters) explain _how_ and _why_, not just _what_.
- **Field-guide metaphor:** Chapter titles use field-guide vocabulary (Bearings, Lay of the Land, Field Notes, Tools of the Trade, Field Marks, Signs & Signals) without sacrificing legibility for a real employee.
- **Sequence with intention (design brief signature quality):** The arc from Getting Your Bearings through Signs & Signals mirrors the arc of joining — arrival, orientation, practice, belonging.

## What This Map Does Not Cover

- Writing chapter content (separate issue).
- Implementing cross-chapter navigation (separate issue).
- Assigning final page numbers (derived from content depth at implementation time).
- Defining the Hugo content taxonomy (sections, bundles, frontmatter schema) — the implementation issue owns that translation.
