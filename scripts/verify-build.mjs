import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(process.cwd());
const dist = join(root, 'dist');
if (!existsSync(dist)) throw new Error('dist/ does not exist. Run npm run build first.');

const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const file = join(directory, name);
  return statSync(file).isDirectory() ? walk(file) : [file];
});

const htmlFiles = walk(dist).filter((file) => extname(file) === '.html');
const broken = [];
let internalReferences = 0;

const candidatesFor = (reference, sourceFile) => {
  const clean = decodeURIComponent(reference.split('#')[0].split('?')[0]);
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return [];
  const base = clean.startsWith('/') ? join(dist, clean) : resolve(dirname(sourceFile), clean);
  if (clean.endsWith('/')) return [join(base, 'index.html')];
  if (extname(clean)) return [base];
  return [base, `${base}.html`, join(base, 'index.html')];
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const references = [];
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) references.push(match[1]);
  for (const match of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const item of match[1].split(',')) references.push(item.trim().split(/\s+/)[0]);
  }
  for (const reference of references) {
    const candidates = candidatesFor(reference, file);
    if (!candidates.length) continue;
    internalReferences += 1;
    if (!candidates.some((candidate) => existsSync(normalize(candidate)))) broken.push({ source: relative(root, file), reference });
  }
}

const allHtml = htmlFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const contactHtml = readFileSync(join(dist, 'contact', 'index.html'), 'utf8');
const formChecks = {
  namedForm: /name="quote-request"/.test(contactHtml),
  netlifyDetection: /data-netlify="true"/.test(contactHtml),
  formNameField: /name="form-name" value="quote-request"/.test(contactHtml),
  honeypot: /netlify-honeypot="bot-field"/.test(contactHtml) && /name="bot-field"/.test(contactHtml),
  successAction: /action="\/thanks\/"/.test(contactHtml),
  realServices: [
    'concreting', 'excavation', 'stonework-outdoor-tiling', 'outdoor-finishing',
    'irrigation-drainage', 'retaining-walls', 'multiple-services', 'other',
  ].every((value) => contactHtml.includes(`value="${value}"`)),
};

const requiredRenderedValues = [
  'Geli Construction Services',
  '0494 802 784',
  'g.lconstructionservices82@gmail.com',
  '65 522 741 328',
  'https://geliconstructionservices.com.au',
  'Stonework &amp; Outdoor Tiling',
  'Irrigation &amp; Drainage',
];
const missingRenderedValues = requiredRenderedValues.filter((value) => !allHtml.includes(value));
const forbiddenRenderedValues = [
  'YOUR BUSINESS NAME',
  'Demo website',
  'Generated demo',
  'Not client project photography',
  'HOURS PLACEHOLDER',
  'DOMAIN PLACEHOLDER',
  'Cardinia starting point',
  'Concreting, Fencing &amp; Outdoor Works',
  'concreting-website.netlify.app',
];
const foundForbiddenValues = forbiddenRenderedValues.filter((value) => allHtml.includes(value));

const projectSlugs = [
  'plain-concrete-slab-installation',
  'residential-concrete-driveway',
  'backyard-side-access-concreting',
];
const missingProjectRoutes = projectSlugs.filter((slug) => !existsSync(join(dist, 'projects', slug, 'index.html')));
const expectedProjectImages = 114;
const projectImageDirectory = join(dist, 'images', 'projects');
const projectImageCount = existsSync(projectImageDirectory) ? walk(projectImageDirectory).filter((file) => /\.(?:avif|webp)$/i.test(file)).length : 0;

const localities = JSON.parse(readFileSync(join(root, 'public', 'data', 'vic-localities.json'), 'utf8')).localities;
const localityShapeValid = localities.length > 3000 && localities.every((entry) => Array.isArray(entry) && entry.length === 4);
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
const sitemapUsesProductionDomain = walk(dist)
  .filter((file) => /sitemap.*\.xml$/i.test(file))
  .every((file) => !readFileSync(file, 'utf8').includes('concreting-website.netlify.app'));

const failedFormChecks = Object.entries(formChecks).filter(([, passed]) => !passed).map(([name]) => name);
const report = {
  routesChecked: htmlFiles.length,
  internalReferencesChecked: internalReferences,
  broken,
  netlifyForm: formChecks,
  missingRenderedValues,
  foundForbiddenValues,
  missingProjectRoutes,
  projectImageCount,
  expectedProjectImages,
  localityShapeValid,
  robotsUsesProductionDomain: robots.includes('https://geliconstructionservices.com.au/sitemap-index.xml'),
  sitemapUsesProductionDomain,
};
console.log(JSON.stringify(report, null, 2));

if (
  broken.length
  || failedFormChecks.length
  || missingRenderedValues.length
  || foundForbiddenValues.length
  || missingProjectRoutes.length
  || projectImageCount !== expectedProjectImages
  || !localityShapeValid
  || !report.robotsUsesProductionDomain
  || !sitemapUsesProductionDomain
) process.exitCode = 1;
