---
title: "Organizational Map"
chapter: "The Lay of the Land"
section: "Field Guide"
page_form: full-bleed
page_number: 5
weight: 5
caption: "Fig. 1 — Conceptual map of the organizational landscape. Domains are territories; paths are workflows and communication channels."
diagram_details:
  - id: territory-product
    label: "Product — What we build"
    description: |
      The Product domain covers the things we make, the problems we solve, and the people we serve. Every decision about what to work on next traces back to product thinking. This territory is about understanding the landscape of needs and choosing where to focus.

      **Key concepts:** problem discovery, user research, prioritization, roadmapping, outcomes over output.
  - id: territory-craft
    label: "Craft — How we work"
    description: |
      The Craft domain covers engineering standards, design practices, collaboration norms, and the bar for quality. Craft is not about perfection — it is about deliberate, improving practice. How we build is as defining as what we build.

      **Key concepts:** code review, testing, documentation, technical design, pairing, deliberate practice.
  - id: territory-people
    label: "People — How we grow"
    description: |
      The People domain covers hiring, onboarding, feedback, career development, and the culture we build together. People work is everyone's work, not just a function. A healthy organization grows its people as carefully as it grows its products.

      **Key concepts:** feedback, mentorship, psychological safety, inclusion, career growth, team health.
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" role="img" aria-label="Organizational territory map">
  <rect width="600" height="400" fill="var(--color-paper)" />

  <!-- Territory: Product -->
  <ellipse cx="150" cy="140" rx="100" ry="60" fill="var(--color-diagram-fill)" stroke="var(--color-diagram-stroke)" stroke-width="1.5" data-diagram-territory="territory-product" />
  <text x="150" y="135" font-family="Crimson Pro, Georgia, serif" font-size="16" fill="var(--color-ink)" text-anchor="middle" font-weight="600">Product</text>
  <text x="150" y="155" font-family="Crimson Pro, Georgia, serif" font-size="12" fill="var(--color-ink-muted)" text-anchor="middle">What we build</text>

  <!-- Territory: Craft -->
  <ellipse cx="300" cy="280" rx="100" ry="60" fill="var(--color-diagram-fill)" stroke="var(--color-diagram-stroke)" stroke-width="1.5" data-diagram-territory="territory-craft" />
  <text x="300" y="275" font-family="Crimson Pro, Georgia, serif" font-size="16" fill="var(--color-ink)" text-anchor="middle" font-weight="600">Craft</text>
  <text x="300" y="295" font-family="Crimson Pro, Georgia, serif" font-size="12" fill="var(--color-ink-muted)" text-anchor="middle">How we work</text>

  <!-- Territory: People -->
  <ellipse cx="450" cy="140" rx="100" ry="60" fill="var(--color-diagram-fill)" stroke="var(--color-diagram-stroke)" stroke-width="1.5" data-diagram-territory="territory-people" />
  <text x="450" y="135" font-family="Crimson Pro, Georgia, serif" font-size="16" fill="var(--color-ink)" text-anchor="middle" font-weight="600">People</text>
  <text x="450" y="155" font-family="Crimson Pro, Georgia, serif" font-size="12" fill="var(--color-ink-muted)" text-anchor="middle">How we grow</text>

  <!-- Paths between territories -->
  <line x1="220" y1="190" x2="260" y2="240" stroke="var(--color-diagram-stroke)" stroke-width="1" stroke-dasharray="6,4" />
  <line x1="340" y2="240" x2="380" y2="190" stroke="var(--color-diagram-stroke)" stroke-width="1" stroke-dasharray="6,4" />
  <line x1="250" y1="120" x2="350" y2="120" stroke="var(--color-diagram-stroke)" stroke-width="1" stroke-dasharray="6,4" />

  <!-- Legend -->
  <rect x="20" y="360" width="560" height="30" fill="none" />
  <line x1="20" y1="375" x2="60" y2="375" stroke="var(--color-diagram-stroke)" stroke-width="1" stroke-dasharray="6,4" />
  <text x="65" y="380" font-family="Crimson Pro, Georgia, serif" font-size="12" fill="var(--color-ink-muted)">Path / Workflow</text>
  <ellipse cx="180" cy="375" rx="20" ry="10" fill="var(--color-diagram-fill)" stroke="var(--color-diagram-stroke)" stroke-width="1" />
  <text x="205" y="380" font-family="Crimson Pro, Georgia, serif" font-size="12" fill="var(--color-ink-muted)">Domain Territory</text>
</svg>
