import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'images');
const compressedDir = path.join(__dirname, 'images', 'compressed');

// Ensure compressed directory exists
if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir, { recursive: true });
}

async function compressImage(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;
    
    const metadata = await sharp(inputPath).metadata();
    const shouldResize = metadata.width > 1920;
    
    let pipeline = sharp(inputPath);
    
    if (shouldResize) {
      pipeline = pipeline.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    await pipeline
      .jpeg({
        quality: 75,
        mozjpeg: true,
        progressive: true
      })
      .toFile(outputPath);
    
    const compressedStats = await fs.promises.stat(outputPath);
    const compressedSize = compressedStats.size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      compressedSize,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const outputDir = path.join(compressedDir, relativePath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let processed = 0;
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativeFilePath = path.join(relativePath, entry.name);
    
    if (entry.isDirectory()) {
      const result = await processDirectory(fullPath, relativeFilePath);
      processed += result.processed;
      totalOriginalSize += result.totalOriginalSize;
      totalCompressedSize += result.totalCompressedSize;
    } else if (entry.isFile() && /\.(jpg|jpeg)$/i.test(entry.name)) {
      const outputPath = path.join(outputDir, entry.name);
      console.log(`Processing: ${relativeFilePath}`);
      
      const result = await compressImage(fullPath, outputPath);
      if (result) {
        processed++;
        totalOriginalSize += result.originalSize;
        totalCompressedSize += result.compressedSize;
        console.log(`  ✓ Reduced by ${result.reduction}% (${(result.originalSize / 1024).toFixed(1)}KB → ${(result.compressedSize / 1024).toFixed(1)}KB)`);
      }
    }
  }
  
  return { processed, totalOriginalSize, totalCompressedSize };
}

async function main() {
  console.log('Starting image compression...\n');
  
  const startTime = Date.now();
  const result = await processDirectory(imagesDir);
  const endTime = Date.now();
  
  console.log('\n=== Compression Summary ===');
  console.log(`Images processed: ${result.processed}`);
  console.log(`Total original size: ${(result.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total compressed size: ${(result.totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${((result.totalOriginalSize - result.totalCompressedSize) / result.totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`Time taken: ${((endTime - startTime) / 1000).toFixed(1)} seconds`);
  console.log(`\nCompressed images saved to: ${compressedDir}`);
}

main().catch(console.error);
