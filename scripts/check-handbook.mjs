import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

// Validate handbook content against authoring conventions defined in
// docs/handbook-authoring.md. Runs separately from Hugo build so issues
// surface with descriptive messages before the build pipeline runs.
//
// Invoked by `make check`.

const root = process.cwd();
const contentDir = join(root, 'www', 'StarterSite', 'content');
const handbookDir = join(contentDir, 'handbook');
const illustrationsDir = join(root, 'www', 'StarterSite', 'assets', 'illustrations');

const validPageForms = new Set([
  'cover',
  'toc',
  'chapter-opener',
  'single-page',
  'spread',
  'full-bleed',
  'marginalia-heavy',
]);

const failures = [];

// kebab-case: lowercase, start with letter, only hyphens, letters, digits, end with .md
const kebabRe = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.md$/;

function parseFrontMatter(content) {
  if (!content.startsWith('---')) return { raw: '', body: content };
  const end = content.indexOf('---', 3);
  if (end === -1) return { raw: content.slice(3), body: '' };
  const raw = content.slice(3, end);
  const body = content.slice(end + 3);
  return { raw, body };
}

function parseSimpleYaml(raw) {
  const map = new Map();
  const lines = raw.split('\n');
  let currentKey = null;
  let currentArray = null;
  let currentArrayItem = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.length - line.trimStart().length;

    // Sub-key in array item (has leading whitespace, currentArrayItem is active)
    if (indent >= 2 && currentArrayItem) {
      const subKv = trimmed.match(/^([a-z_]+):\s*(.*)$/i);
      if (subKv) {
        currentArrayItem[subKv[1]] = subKv[2].replace(/^['"](.*)['"]$/, '$1');
        continue;
      }
    }

    // Array item start: "  - key: value"
    const arrItem = trimmed.match(/^-\s+(.+)$/);
    if (arrItem && currentKey) {
      if (!currentArray) {
        currentArray = [];
        map.set(currentKey, currentArray);
      }
      currentArrayItem = {};
      currentArray.push(currentArrayItem);
      const itemKv = arrItem[1].match(/^([a-z_]+):\s*(.*)$/i);
      if (itemKv) {
        currentArrayItem[itemKv[1]] = itemKv[2].replace(/^['"](.*)['"]$/, '$1');
      }
      continue;
    }

    // Top-level key: value (no leading whitespace)
    if (indent === 0) {
      const kv = trimmed.match(/^([a-z_]+):\s*(.*)$/i);
      if (kv) {
        currentKey = kv[1];
        currentArray = null;
        currentArrayItem = null;
        const val = kv[2].trim();
        if (val === '') {
          map.set(currentKey, '');
        } else {
          map.set(currentKey, val.replace(/^['"](.*)['"]$/, '$1'));
        }
        continue;
      }
    }
  }

  return map;
}

function collectMdFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    if (extname(entry.name) === '.md') {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

function collectIllustrations() {
  const files = new Set();
  if (!existsSync(illustrationsDir)) return files;
  for (const entry of readdirSync(illustrationsDir, { withFileTypes: true })) {
    if (entry.isFile() && extname(entry.name) === '.svg') {
      files.add(entry.name.replace(/\.svg$/, ''));
    }
  }
  return files;
}

const knownIllustrations = collectIllustrations();
const handbookFiles = collectMdFiles(handbookDir);
const coverFile = join(contentDir, '_index.md');
const allContentFiles = [coverFile, ...handbookFiles];
const pageNumbers = new Map(); // page_number -> filePath

// --- validation ---

for (const filePath of allContentFiles) {
  const relPath = relative(root, filePath);
  const content = readFileSync(filePath, 'utf8');
  const { raw } = parseFrontMatter(content);

  if (!raw.trim()) {
    failures.push(`${relPath}: missing front matter (must have at least title and page_form)`);
    continue;
  }

  const fm = parseSimpleYaml(raw);

  // Required fields for all pages
  if (!fm.get('title')) {
    failures.push(`${relPath}: missing required front matter field: title`);
  }

  const pageForm = fm.get('page_form');
  if (!pageForm) {
    failures.push(`${relPath}: missing required front matter field: page_form`);
  } else if (!validPageForms.has(pageForm)) {
    failures.push(`${relPath}: invalid page_form "${pageForm}" (must be one of: ${[...validPageForms].join(', ')})`);
  }

  // Check kebab-case naming for handbook content files
  if (filePath.startsWith(handbookDir)) {
    const filename = filePath.split('/').pop();
    if (filename !== '_index.md' && !kebabRe.test(filename)) {
      failures.push(`${relPath}: filename must be kebab-case (lowercase, hyphens, e.g. "getting-started.md")`);
    }
  }

  // Check for duplicate page_numbers
  const pageNumber = fm.get('page_number');
  if (pageNumber) {
    const existing = pageNumbers.get(pageNumber);
    if (existing) {
      failures.push(`${relPath}: duplicate page_number "${pageNumber}" (also used in ${relative(root, existing)})`);
    } else {
      pageNumbers.set(pageNumber, filePath);
    }
  }

  // Check illustrations exist
  const illRaw = fm.get('illustrations');
  if (illRaw && Array.isArray(illRaw)) {
    for (const ill of illRaw) {
      const name = ill.name;
      if (name && !knownIllustrations.has(name)) {
        failures.push(`${relPath}: illustration "${name}" not found in assets/illustrations/`);
      }
      if (!ill.alt) {
        failures.push(`${relPath}: illustration "${name}" is missing required alt text`);
      }
    }
  }
}

// Check that cover page exists with page_form: cover
if (existsSync(coverFile)) {
  const coverContent = readFileSync(coverFile, 'utf8');
  const { raw } = parseFrontMatter(coverContent);
  const fm = parseSimpleYaml(raw);
  if (fm.get('page_form') !== 'cover') {
    failures.push(`${relative(root, coverFile)}: must have page_form: cover`);
  }
} else {
  failures.push('content/_index.md: cover page is required but not found');
}

// Check that handbook _index.md exists with page_form: toc
const handbookIndex = join(handbookDir, '_index.md');
if (existsSync(handbookIndex)) {
  const tocContent = readFileSync(handbookIndex, 'utf8');
  const { raw } = parseFrontMatter(tocContent);
  const fm = parseSimpleYaml(raw);
  if (fm.get('page_form') !== 'toc') {
    failures.push(`${relative(root, handbookIndex)}: must have page_form: toc`);
  }
} else {
  failures.push('content/handbook/_index.md: table of contents page is required but not found');
}

// --- report ---
if (failures.length > 0) {
  console.error('Handbook content validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Handbook content validation passed.');
