import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  try {
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    const publicDir = path.join(__dirname, 'public');
    
    // Check if SVG file exists
    if (!fs.existsSync(svgPath)) {
      throw new Error('SVG favicon file not found at: ' + svgPath);
    }

    console.log('✓ Reading SVG favicon...');
    
    // Generate favicon.ico (64x64) from SVG
    await sharp(svgPath)
      .resize(64, 64)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico (64x64)');
    
    // Generate apple-touch-icon.png (180x180) from SVG
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    console.log('✓ Generated apple-touch-icon.png (180x180)');
    
    // Also generate a 32x32 version for better compatibility
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    console.log('✓ Generated favicon-32x32.png (32x32)');
    
    // Generate 16x16 version
    await sharp(svgPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    console.log('✓ Generated favicon-16x16.png (16x16)');
    
    console.log('Favicons generated successfully!');
    
  } catch (error) {
    console.error('Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();