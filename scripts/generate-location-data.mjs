import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const postcodeSource = 'https://raw.githubusercontent.com/matthewproctor/australianpostcodes/master/australian_postcodes.csv';

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function numberOrFallback(primary, fallback) {
  const precise = Number(primary);
  const general = Number(fallback);
  return Number.isFinite(precise) && precise !== 0 ? precise : general;
}

const response = await fetch(postcodeSource);
if (!response.ok) throw new Error(`Location source request failed (${response.status}).`);

const rows = parseCsv(await response.text());
const headers = rows.shift();
const index = Object.fromEntries(headers.map((header, position) => [header, position]));
const seen = new Set();
const localities = [];

for (const row of rows) {
  if (row[index.state] !== 'VIC' || row[index.type1 ?? index.type] !== 'Delivery Area') continue;
  const suburb = row[index.locality]?.trim();
  const postcode = row[index.postcode]?.trim();
  const latitude = numberOrFallback(row[index.Lat_precise], row[index.lat]);
  const longitude = numberOrFallback(row[index.Long_precise], row[index.long]);
  const key = `${suburb}|${postcode}`;
  if (!suburb || !postcode || seen.has(key) || !Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
  seen.add(key);
  localities.push([suburb, postcode, Number(latitude.toFixed(5)), Number(longitude.toFixed(5))]);
}

localities.sort((left, right) => left[0].localeCompare(right[0]) || left[1].localeCompare(right[1]));
const outputDirectory = path.resolve('public/data');
await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.join(outputDirectory, 'vic-localities.json'),
  JSON.stringify({
    source: 'Matthew Proctor Australian Postcodes — public domain community dataset',
    coverageDefinition: 'Coverage is configured separately from the locality search data.',
    localities,
  }),
);

console.log(`Generated ${localities.length} Victorian delivery localities.`);
