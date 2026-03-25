import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compressedDir = path.join(__dirname, 'images', 'compressed');

// Map folder names to display names
const folderDisplayNames = {
  'Distribution of school supplies to Pygmy students from the eastern part of the country in the village': 'School Supplies Distribution to Pygmy Students',
  'Distribution of school supplies to students in Yaoundé': 'School Supplies Distribution in Yaoundé',
  'International Minister Ghana': 'International Mission - Ghana',
  'International Minister South Sudan': 'Apostolic International Mission - South Sudan',
  'Mission and Objectif of minister 2023-2025': 'Mission and Objectives 2023-2025',
  'Mission at international Edmonton Canada': 'Apostolic International Mission - Edmonton, Canada',
  'Support for the population of villages in the East': 'Support for Eastern Villages',
  'Yaounde headquarters building nearing completion': 'Yaoundé Headquarters Building',
  'Deliverance in the middle of the ministry': 'Deliverance Ministry',
  'The local church branch in the East of Cameroon in the village of Leleen': 'Local Church Branch - Leleen'
};

function getImagePath(folderName, fileName) {
  // Use forward slashes and encode folder/file names
  const encodedFolder = encodeURIComponent(folderName).replace(/'/g, '%27');
  const encodedFile = encodeURIComponent(fileName).replace(/'/g, '%27');
  return `images/compressed/${encodedFolder}/${encodedFile}`;
}

function generateGallerySection(folderName, images) {
  if (images.length === 0) return '';
  
  const displayName = folderDisplayNames[folderName] || folderName;
  
  let html = `            <div class="gallery-section">
                <h2>${displayName}</h2>
                <div class="gallery-grid">\n`;
  
  images.forEach((image, index) => {
    const imagePath = getImagePath(folderName, image);
    const altText = `${displayName} - Image ${index + 1}`;
    
    html += `                <div class="gallery-item">
                    <img 
                        src="${imagePath}" 
                        alt="${altText}"
                        class="gallery-image"
                        loading="lazy"
                    />
                    <div class="gallery-overlay">
                        <h3>${displayName}</h3>
                        <p>Image ${index + 1} of ${images.length}</p>
                    </div>
                </div>\n`;
  });
  
  html += `                </div>
            </div>\n`;
  
  return html;
}

function main() {
  const folders = fs.readdirSync(compressedDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name !== 'compressed');
  
  let galleryHTML = '';
  
  // Sort folders by image count (descending) for better organization
  const foldersWithCounts = folders.map(folderName => {
    const folderPath = path.join(compressedDir, folderName);
    const images = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort();
    return { folderName, images, count: images.length };
  }).sort((a, b) => b.count - a.count);
  
  foldersWithCounts.forEach(({ folderName, images }) => {
    if (images.length > 0) {
      galleryHTML += generateGallerySection(folderName, images);
    }
  });
  
  // Write to a file for reference
  fs.writeFileSync(
    path.join(__dirname, 'gallery-sections.html'),
    galleryHTML,
    'utf8'
  );
  
  console.log('Gallery sections generated successfully!');
  console.log(`Total sections: ${foldersWithCounts.filter(f => f.images.length > 0).length}`);
  console.log(`Total images: ${foldersWithCounts.reduce((sum, f) => sum + f.images.length, 0)}`);
}

main();
