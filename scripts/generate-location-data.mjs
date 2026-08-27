import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const postcodeSource = 'https://raw.githubusercontent.com/matthewproctor/australianpostcodes/master/australian_postcodes.csv';
const boundarySource = "https://geo.abs.gov.au/arcgis/rest/services/ASGS2026/GCCSA/MapServer/1/query?where=GCCSA_NAME_2026%3D%27Greater%20Melbourne%27&outFields=GCCSA_CODE_2026%2CGCCSA_NAME_2026&returnGeometry=true&outSR=4326&geometryPrecision=4&maxAllowableOffset=0.003&f=geojson";
const metroSa4Names = new Set([
  'Melbourne - Inner',
  'Melbourne - Inner East',
  'Melbourne - Inner South',
  'Melbourne - North East',
  'Melbourne - North West',
  'Melbourne - Outer East',
  'Melbourne - South East',
  'Melbourne - West',
  'Mornington Peninsula',
]);

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

const [postcodeResponse, boundaryResponse] = await Promise.all([
  fetch(postcodeSource),
  fetch(boundarySource),
]);

if (!postcodeResponse.ok || !boundaryResponse.ok) {
  throw new Error(`Location source request failed (${postcodeResponse.status}, ${boundaryResponse.status}).`);
}

const rows = parseCsv(await postcodeResponse.text());
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
  localities.push([
    suburb,
    postcode,
    Number(latitude.toFixed(5)),
    Number(longitude.toFixed(5)),
    metroSa4Names.has(row[index.sa4name]),
  ]);
}

localities.sort((left, right) => left[0].localeCompare(right[0]) || left[1].localeCompare(right[1]));

const outputDirectory = path.resolve('public/data');
await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.join(outputDirectory, 'vic-localities.json'),
  JSON.stringify({
    source: 'Matthew Proctor Australian Postcodes — public domain community dataset',
    metroDefinition: 'ASGS Greater Melbourne-aligned SA4 regions, including Mornington Peninsula',
    localities,
  }),
);
await writeFile(
  path.join(outputDirectory, 'greater-melbourne.geojson'),
  JSON.stringify(await boundaryResponse.json()),
);

console.log(`Generated ${localities.length} Victorian delivery localities and the Greater Melbourne boundary.`);
