/**
 * Resize homepage-only assets to match max display width (fewer bytes, faster decode).
 * Run from repo root: node optimize-homepage-images.js
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const outDir = path.join(root, 'images', 'home');

fs.mkdirSync(outDir, { recursive: true });

async function emit(inputRel, outName, width, quality = 78) {
  const input = path.join(root, ...inputRel.split('/'));
  if (!fs.existsSync(input)) {
    console.error('Missing input:', input);
    return null;
  }
  const dest = path.join(outDir, outName);
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`${outName} → ${meta.width}×${meta.height}, ${kb} KB`);
  return { width: meta.width, height: meta.height };
}

const jobs = [
  {
    input: 'images/compressed/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-15_3.jpg',
    out: 'home-story-village.jpg',
    w: 900,
  },
  {
    input: 'images/compressed/Distribution of school supplies to students in Yaoundé/PHOTO-2026-03-02-17-17-05.jpg',
    out: 'home-story-yaounde.jpg',
    w: 900,
  },
  {
    input: 'images/compressed/International Minister Ghana/PHOTO-2025-06-02-15-06-38.jpg',
    out: 'home-portrait-shekinah.jpg',
    w: 480,
  },
  {
    input: 'images/People/Apotre Daniel batela.jpg',
    out: 'home-portrait-daniel.jpg',
    w: 480,
  },
  {
    input: 'images/People/Mendo Zolo Jeanne Esther.jpg',
    out: 'home-portrait-mendo.jpg',
    w: 480,
  },
  {
    input: 'images/People/Bivina Hervé Martial.jpg',
    out: 'home-portrait-bivina.jpg',
    w: 480,
  },
  {
    input: 'images/People/Nguh Sylvia Bih.jpg',
    out: 'home-portrait-nguh.jpg',
    w: 480,
  },
];

const dims = {};
for (const j of jobs) {
  const m = await emit(j.input, j.out, j.w);
  if (m) dims[j.out] = m;
}

fs.writeFileSync(
  path.join(outDir, 'dimensions.json'),
  JSON.stringify(dims, null, 2),
  'utf8'
);
console.log('Wrote images/home/dimensions.json');
