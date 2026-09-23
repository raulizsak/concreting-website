import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const logoInput = process.argv[2];
if (!logoInput) throw new Error('Usage: node scripts/build-brand-assets.mjs <approved-logo-path>');

const publicRoot = resolve('public');
const logoDirectory = resolve(publicRoot, 'logo');
await mkdir(logoDirectory, { recursive: true });

const logo = sharp(resolve(logoInput)).rotate();
await Promise.all([
  logo.clone().resize({ width: 1024, withoutEnlargement: true }).jpeg({ quality: 92, progressive: true }).toFile(resolve(logoDirectory, 'geli-construction-services-logo.jpeg')),
  logo.clone().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 90, effort: 6 }).toFile(resolve(logoDirectory, 'geli-construction-services-logo.webp')),
]);

const iconSource = sharp(resolve(logoInput))
  .rotate()
  .extract({ left: 278, top: 278, width: 468, height: 468 });

const [icon32, icon48, icon256, icon512] = await Promise.all([
  iconSource.clone().resize(32, 32).png().toBuffer(),
  iconSource.clone().resize(48, 48).png().toBuffer(),
  iconSource.clone().resize(256, 256).png().toBuffer(),
  iconSource.clone().resize(512, 512).png().toBuffer(),
]);

await writeFile(resolve(publicRoot, 'favicon.png'), icon512);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><image width="256" height="256" href="data:image/png;base64,${icon256.toString('base64')}"/></svg>`;
await writeFile(resolve(publicRoot, 'favicon.svg'), svg);

const pngs = [icon32, icon48];
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(pngs.length, 4);
let offset = 6 + (16 * pngs.length);
const entries = pngs.map((png, index) => {
  const size = index === 0 ? 32 : 48;
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});
await writeFile(resolve(publicRoot, 'favicon.ico'), Buffer.concat([icoHeader, ...entries, ...pngs]));

const ogLogo = await logo.clone().resize(430, 430, { fit: 'contain' }).png().toBuffer();
const ogText = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#171615"/>
    <path d="M0 0h18v630H0z" fill="#fca40c"/>
    <path d="M74 124h92" stroke="#fca40c" stroke-width="6"/>
    <text x="74" y="220" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="800" letter-spacing="-1">GELI</text>
    <text x="74" y="290" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="800" letter-spacing="-1">CONSTRUCTION</text>
    <text x="74" y="360" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="800" letter-spacing="-1">SERVICES</text>
    <text x="74" y="425" fill="#fca40c" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="1">CONCRETING &amp; OUTDOOR</text>
    <text x="74" y="458" fill="#fca40c" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="1">CONSTRUCTION</text>
    <text x="74" y="520" fill="#b9b1aa" font-family="Arial, sans-serif" font-size="22">South-East Melbourne • Gippsland • Surrounding areas</text>
  </svg>`);

await sharp(ogText)
  .composite([{ input: ogLogo, left: 735, top: 100 }])
  .png({ compressionLevel: 9, palette: true, colours: 256 })
  .toFile(resolve(publicRoot, 'og.png'));

console.log('Built logo, favicon and Open Graph assets from the approved client logo.');
