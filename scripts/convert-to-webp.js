const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';

function convertDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      convertDir(fullPath); // recurse into subdirectories
    } else if (/\.(png|jpg|jpeg)$/i.test(file.name)) {
      const outPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      sharp(fullPath)
        .webp({ quality: 82 })
        .toFile(outPath, (err, info) => {
          if (err) console.error('Error:', fullPath, err);
          else console.log(`✓ ${fullPath} → ${outPath} (${(info.size / 1024).toFixed(0)}KB)`);
        });
    }
  });
}

convertDir(inputDir);
