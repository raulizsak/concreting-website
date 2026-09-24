import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import process from 'node:process';
import sharp from 'sharp';

const parseAspectRatio = (value) => {
  if (!value) return undefined;
  const [width, height] = value.split(':').map(Number);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error(`Invalid aspect ratio: ${value}. Use a value such as 4:3.`);
  }
  return width / height;
};

export async function optimiseImage(input, outputBase, widths = [480, 800, 1200], options = {}) {
  const source = resolve(input);
  const destination = resolve(outputBase);
  const metadata = await sharp(source).metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  const aspectRatio = parseAspectRatio(options.aspectRatio);

  if (!sourceWidth) throw new Error(`Could not determine the width of ${source}`);

  await mkdir(dirname(destination), { recursive: true });

  for (const requestedWidth of widths) {
    const width = Math.min(requestedWidth, sourceWidth);
    const resize = aspectRatio
      ? {
          width,
          height: Math.round(width / aspectRatio),
          fit: 'cover',
          position: options.position ?? 'attention',
          withoutEnlargement: true,
        }
      : { width, withoutEnlargement: true };
    const base = sharp(source).rotate().resize(resize);

    await Promise.all([
      base.clone().avif({ quality: 72, effort: 7 }).toFile(`${destination}-${requestedWidth}.avif`),
      base.clone().webp({ quality: 86, effort: 6 }).toFile(`${destination}-${requestedWidth}.webp`),
    ]);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [, , input, outputBase, widthList = '480,800,1200', aspectRatio, position] = process.argv;
  if (!input || !outputBase) {
    throw new Error('Usage: node scripts/process-images.mjs <input> <output-base> [comma-separated-widths] [aspect-ratio] [crop-position]');
  }

  const widths = widthList.split(',').map(Number).filter(Number.isFinite);
  await optimiseImage(input, outputBase, widths, { aspectRatio, position });
}
