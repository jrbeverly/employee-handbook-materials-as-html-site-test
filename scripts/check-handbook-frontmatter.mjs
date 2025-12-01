import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

// Validate handbook front matter against the full authoring schema defined in
// docs/handbook-authoring.md. Complements check-handbook.mjs, which validates
// structural conventions (kebab-case filenames, unique page_numbers,
// illustration references, cover/TOC existence).
//
// This script validates:
//   - Forbidden fields per page_form
//   - Value constraints (chapter_number, weight, marginalia, diagram_details)
//
// Invoked by `make check`.

const root = process.cwd();
const contentDir = join(root, 'www', 'StarterSite', 'content');
const handbookDir = join(contentDir, 'handbook');

// Forbidden fields per page_form (from docs/handbook-authoring.md)
const forbiddenFields = {
  cover: [
    'chapter_number', 'description', 'spread_left', 'left_chapter',
    'left_page_number', 'caption', 'diagram_details', 'marginalia',
  ],
  'chapter-opener': [
    'subtitle', 'stamp', 'spread_left', 'left_chapter',
    'left_page_number', 'caption', 'diagram_details', 'marginalia',
  ],
  'single-page': [
    'subtitle', 'stamp', 'chapter_number', 'description',
    'spread_left', 'left_chapter', 'left_page_number', 'caption',
    'diagram_details', 'marginalia',
  ],
  spread: [
    'subtitle', 'stamp', 'chapter_number', 'description',
    'caption', 'diagram_details', 'marginalia',
  ],
  'full-bleed': [
    'subtitle', 'stamp', 'chapter_number', 'description',
    'spread_left', 'left_chapter', 'left_page_number', 'marginalia',
  ],
  'marginalia-heavy': [
    'subtitle', 'stamp', 'chapter_number', 'description',
    'spread_left', 'left_chapter', 'left_page_number', 'caption',
    'diagram_details',
  ],
  toc: [
    'subtitle', 'stamp', 'chapter_number', 'description',
    'spread_left', 'left_chapter', 'left_page_number', 'caption',
    'diagram_details', 'marginalia',
  ],
};

const failures = [];

function parseFrontMatter(content) {
  if (!content.startsWith('---')) return { raw: '', body: content };
  const end = content.indexOf('---', 3);
  if (end === -1) return { raw: content.slice(3), body: '' };
  return { raw: content.slice(3, end), body: content.slice(end + 3) };
}

// Parses simple YAML front matter into a Map.
// Handles: scalars, arrays of objects with nested keys.
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

    // Sub-key in array item (indented at least 2 spaces)
    if (indent >= 2 && currentArrayItem) {
      const subKv = trimmed.match(/^([a-z_]+):\s*(.*)$/i);
      if (subKv) {
        const subVal = subKv[2].replace(/^['"](.*)['"]$/, '$1');
        currentArrayItem[subKv[1]] = subVal;
        continue;
      }
    }

    // Array item: "  - key: value"
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

    // Top-level key: value
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

const handbookFiles = collectMdFiles(handbookDir);
const coverFile = join(contentDir, '_index.md');
const allContentFiles = [coverFile, ...handbookFiles];

for (const filePath of allContentFiles) {
  const relPath = relative(root, filePath);
  const content = readFileSync(filePath, 'utf8');
  const { raw } = parseFrontMatter(content);

  if (!raw.trim()) {
    failures.push(`${relPath}: missing front matter`);
    continue;
  }

  const fm = parseSimpleYaml(raw);
  const pageForm = fm.get('page_form');

  // --- Forbidden fields per page_form ---
  if (pageForm && forbiddenFields[pageForm]) {
    for (const forbidden of forbiddenFields[pageForm]) {
      if (fm.has(forbidden)) {
        failures.push(
          `${relPath}: field "${forbidden}" is forbidden for page_form "${pageForm}" (field is ignored by this layout; misclassifying the page?)`,
        );
      }
    }
  }

  // --- chapter_number must be a positive integer ---
  if (fm.has('chapter_number')) {
    const raw = fm.get('chapter_number');
    const num = Number(raw);
    if (!Number.isInteger(num) || num < 1) {
      failures.push(
        `${relPath}: chapter_number must be a positive integer (got: ${JSON.stringify(raw)})`,
      );
    }
  }

  // --- weight must be an integer ---
  if (fm.has('weight')) {
    const raw = fm.get('weight');
    const num = Number(raw);
    if (!Number.isInteger(num)) {
      failures.push(
        `${relPath}: weight must be an integer (got: ${JSON.stringify(raw)})`,
      );
    }
  }

  // --- marginalia array validation ---
  const marginalia = fm.get('marginalia');
  if (marginalia && Array.isArray(marginalia)) {
    for (let i = 0; i < marginalia.length; i++) {
      const item = marginalia[i];
      if (!item.text || typeof item.text !== 'string' || !item.text.trim()) {
        failures.push(
          `${relPath}: marginalia[${i}] must have a non-empty "text" field`,
        );
      }
      if (item.discovery !== undefined && item.discovery !== '' && item.discovery !== 'true' && item.discovery !== 'false') {
        failures.push(
          `${relPath}: marginalia[${i}].discovery must be a boolean (got: ${JSON.stringify(item.discovery)})`,
        );
      }
    }
  }

  // --- diagram_details array validation ---
  const details = fm.get('diagram_details');
  if (details && Array.isArray(details)) {
    for (let i = 0; i < details.length; i++) {
      const item = details[i];
      if (!item.id || typeof item.id !== 'string' || !item.id.trim()) {
        failures.push(
          `${relPath}: diagram_details[${i}] must have a non-empty "id" field`,
        );
      }
      if (!item.label || typeof item.label !== 'string' || !item.label.trim()) {
        failures.push(
          `${relPath}: diagram_details[${i}] must have a non-empty "label" field`,
        );
      }
      if (!item.description || typeof item.description !== 'string' || !item.description.trim()) {
        failures.push(
          `${relPath}: diagram_details[${i}] must have a non-empty "description" field`,
        );
      }
    }
  }
}

// --- report ---
if (failures.length > 0) {
  console.error('Handbook front matter validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Handbook front matter validation passed.');
