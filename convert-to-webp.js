import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compressedDir = path.join(__dirname, 'images', 'compressed');
const webpDir = path.join(__dirname, 'images', 'compressed-webp');

// Ensure webp directory exists
if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

async function convertToWebP(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;
    
    const metadata = await sharp(inputPath).metadata();
    
    // Determine target size based on image dimensions
    const isThumbnail = metadata.width < 800 || metadata.height < 600;
    const maxSizeKB = isThumbnail ? 80 : 150; // WebP can be smaller
    const maxSizeBytes = maxSizeKB * 1024;
    
    // Resize if needed
    const shouldResize = metadata.width > 1600;
    const targetWidth = shouldResize ? 1600 : metadata.width;
    
    let pipeline = sharp(inputPath);
    
    if (shouldResize) {
      pipeline = pipeline.resize(targetWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Start with quality and iteratively reduce if needed
    let quality = 75;
    let compressedSize = maxSizeBytes + 1;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (compressedSize > maxSizeBytes && attempts < maxAttempts && quality >= 50) {
      await pipeline
        .webp({
          quality: quality,
          effort: 6,
          smartSubsample: true
        })
        .toFile(outputPath);
      
      const compressedStats = await fs.promises.stat(outputPath);
      compressedSize = compressedStats.size;
      
      if (compressedSize > maxSizeBytes) {
        quality -= 5;
        attempts++;
      }
    }
    
    // Final conversion with optimized settings
    await pipeline
      .webp({
        quality: Math.max(quality, 50),
        effort: 6,
        smartSubsample: true,
        nearLossless: false
      })
      .toFile(outputPath);
    
    const compressedStats = await fs.promises.stat(outputPath);
    const finalCompressedSize = compressedStats.size;
    const reduction = ((originalSize - finalCompressedSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      compressedSize: finalCompressedSize,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const outputDir = path.join(webpDir, relativePath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let processed = 0;
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativeFilePath = path.join(relativePath, entry.name);
    
    if (entry.isDirectory() && entry.name !== 'compressed-webp') {
      const result = await processDirectory(fullPath, relativeFilePath);
      processed += result.processed;
      totalOriginalSize += result.totalOriginalSize;
      totalCompressedSize += result.totalCompressedSize;
    } else if (entry.isFile() && /\.(jpg|jpeg)$/i.test(entry.name)) {
      const baseName = path.basename(entry.name, path.extname(entry.name));
      const outputPath = path.join(outputDir, `${baseName}.webp`);
      console.log(`Converting: ${relativeFilePath}`);
      
      const result = await convertToWebP(fullPath, outputPath);
      if (result) {
        processed++;
        totalOriginalSize += result.originalSize;
        totalCompressedSize += result.compressedSize;
        console.log(`  ✓ WebP: ${(result.compressedSize / 1024).toFixed(1)}KB (${result.reduction}% reduction)`);
      }
    }
  }
  
  return { processed, totalOriginalSize, totalCompressedSize };
}

async function main() {
  console.log('Starting WebP conversion...\n');
  
  if (!fs.existsSync(compressedDir)) {
    console.error('Compressed directory not found. Please run compress-images.js first.');
    process.exit(1);
  }
  
  const startTime = Date.now();
  const result = await processDirectory(compressedDir);
  const endTime = Date.now();
  
  console.log('\n=== WebP Conversion Summary ===');
  console.log(`Images converted: ${result.processed}`);
  console.log(`Total original size: ${(result.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total WebP size: ${(result.totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${((result.totalOriginalSize - result.totalCompressedSize) / result.totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`Time taken: ${((endTime - startTime) / 1000).toFixed(1)} seconds`);
  console.log(`\nWebP images saved to: ${webpDir}`);
}

main().catch(console.error);
