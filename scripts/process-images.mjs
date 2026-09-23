import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import process from 'node:process';
import sharp from 'sharp';

export async function optimiseImage(input, outputBase, widths = [480, 800, 1200]) {
  const source = resolve(input);
  const destination = resolve(outputBase);
  const metadata = await sharp(source).metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;

  if (!sourceWidth) throw new Error(`Could not determine the width of ${source}`);

  await mkdir(dirname(destination), { recursive: true });

  for (const requestedWidth of widths) {
    const width = Math.min(requestedWidth, sourceWidth);
    const base = sharp(source).rotate().resize({ width, withoutEnlargement: true });

    await Promise.all([
      base.clone().avif({ quality: 72, effort: 7 }).toFile(`${destination}-${requestedWidth}.avif`),
      base.clone().webp({ quality: 86, effort: 6 }).toFile(`${destination}-${requestedWidth}.webp`),
    ]);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [, , input, outputBase, widthList = '480,800,1200'] = process.argv;
  if (!input || !outputBase) {
    throw new Error('Usage: node scripts/process-images.mjs <input> <output-base> [comma-separated-widths]');
  }

  const widths = widthList.split(',').map(Number).filter(Number.isFinite);
  await optimiseImage(input, outputBase, widths);
}
