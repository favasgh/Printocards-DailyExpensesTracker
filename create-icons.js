// Simple script to create placeholder icons
// Run with: node create-icons.js

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3b82f6"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size * 0.3}" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">ET</text>
</svg>`;
};

// Note: This creates SVG files. For PNG, you'll need to:
// 1. Use an online converter (like https://cloudconvert.com/svg-to-png)
// 2. Or use the icon-generator.html tool in the public folder
// 3. Or use your logo with an image editor

const publicDir = path.join(__dirname, 'public');

// Create SVG placeholders (these won't work for PWA, but show the structure)
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('📝 Note: PWA requires PNG icons, not SVG.');
console.log('📝 To create proper icons:');
console.log('   1. Open public/icon-generator.html in your browser');
console.log('   2. Upload your logo');
console.log('   3. Download the generated icons');
console.log('   4. Place icon-192x192.png and icon-512x512.png in public/ folder');
console.log('');
console.log('Or use an online tool:');
console.log('   - https://realfavicongenerator.net/');
console.log('   - https://www.pwabuilder.com/imageGenerator');

