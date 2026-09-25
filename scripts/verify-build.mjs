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
  quoteFormAnchor: /id="quote-form"/.test(contactHtml),
  namedForm: /name="quote-request"/.test(contactHtml),
  netlifyDetection: /data-netlify="true"/.test(contactHtml),
  formNameField: /name="form-name" value="quote-request"/.test(contactHtml),
  professionalSubject: /name="subject" value="Geli Construction Services — New quote request" data-remove-prefix/.test(contactHtml),
  honeypot: /netlify-honeypot="bot-field"/.test(contactHtml) && /name="bot-field"/.test(contactHtml),
  successAction: /action="\/thanks\/"/.test(contactHtml),
  locationAutocomplete: /id="location"[\s\S]*?role="combobox"[\s\S]*?aria-controls="quote-location-suggestions"/.test(contactHtml)
    && /id="quote-location-suggestions"[\s\S]*?role="listbox"/.test(contactHtml),
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
const expectedIndexableRoutes = [
  '/',
  '/services/',
  '/services/concreting/',
  '/services/excavation/',
  '/services/stonework-outdoor-tiling/',
  '/services/outdoor-finishing-landscaping/',
  '/services/irrigation-drainage/',
  '/services/retaining-walls/',
  '/services/concreting/concrete-driveways/',
  '/services/concreting/concrete-slabs/',
  '/services/concreting/paths-side-access/',
  '/projects/',
  ...projectSlugs.map((slug) => `/projects/${slug}/`),
  '/areas-we-service/',
  '/areas-we-service/pakenham/',
  '/about/',
  '/contact/',
];
const outputForRoute = (route) => {
  if (route === '/') return join(dist, 'index.html');
  if (route === '/404/') return join(dist, '404.html');
  return join(dist, ...route.split('/').filter(Boolean), 'index.html');
};
const missingIndexableRoutes = expectedIndexableRoutes.filter((route) => !existsSync(outputForRoute(route)));
const metadataByRoute = expectedIndexableRoutes
  .filter((route) => existsSync(outputForRoute(route)))
  .map((route) => {
    const html = readFileSync(outputForRoute(route), 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? '';
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? '';
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? '';
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    return { route, title, description, canonical, h1Count, noindex: /name="robots" content="[^"]*noindex/i.test(html) };
  });
const duplicateTitles = metadataByRoute
  .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.title === entry.title) !== index)
  .map((entry) => ({ route: entry.route, title: entry.title }));
const duplicateDescriptions = metadataByRoute
  .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.description === entry.description) !== index)
  .map((entry) => ({ route: entry.route, description: entry.description }));
const invalidMetadata = metadataByRoute.filter((entry) => (
  !entry.title
  || !entry.description
  || entry.canonical !== `https://geliconstructionservices.com.au${entry.route}`
  || entry.h1Count !== 1
  || entry.noindex
));
const intentionalNoindexRoutes = ['/privacy/', '/thanks/', '/404/'];
const missingNoindex = intentionalNoindexRoutes.filter((route) => {
  const file = outputForRoute(route);
  return !existsSync(file) || !/name="robots" content="noindex,follow"/i.test(readFileSync(file, 'utf8'));
});
const expectedProjectImages = 114;
const projectImageDirectory = join(dist, 'images', 'projects');
const projectImageCount = existsSync(projectImageDirectory) ? walk(projectImageDirectory).filter((file) => /\.(?:avif|webp)$/i.test(file)).length : 0;
const expectedServiceImages = 28;
const serviceImageDirectory = join(dist, 'images', 'services');
const serviceImageCount = existsSync(serviceImageDirectory) ? walk(serviceImageDirectory).filter((file) => /\.(?:avif|webp)$/i.test(file)).length : 0;
const serviceImagesUseApprovedMappings = [
  '/images/projects/plain-concrete-slab-installation/cover-',
  '/images/services/excavation-',
  '/images/services/stonework-outdoor-tiling-',
  '/images/services/outdoor-finishing-',
  '/images/services/irrigation-drainage-',
  '/images/services/retaining-walls-',
].every((source) => allHtml.includes(source));
const rejectedImageNamesAbsent = ['IMG_7690', 'IMG_7692', 'IMG_7693'].every((name) => !allHtml.includes(name));
const quoteLinksTargetForm = /href="\/contact\/#quote-form"/.test(allHtml)
  && /href="\/contact\/\?service=concreting#quote-form"/.test(allHtml);
const socialLinksPresent = [
  'https://www.instagram.com/geliconstructionservices',
  'https://www.facebook.com/profile.php?id=61594470905978',
].every((url) => allHtml.includes(url));

const localities = JSON.parse(readFileSync(join(root, 'public', 'data', 'vic-localities.json'), 'utf8')).localities;
const localityShapeValid = localities.length > 3000 && localities.every((entry) => Array.isArray(entry) && entry.length === 4);
const cardiniaLocality = localities.find(([name]) => name === 'CARDINIA');
const cardiniaLocalityValid = JSON.stringify(cardiniaLocality) === JSON.stringify(['CARDINIA', '3978', -38.147, 145.423]);
const serviceAreaConfig = readFileSync(join(root, 'src', 'config', 'serviceAreas.ts'), 'utf8');
const cardiniaConfigured = /name: 'Cardinia \/ Gippsland'[\s\S]*?suburbs:\s*\[[\s\S]*?'Cardinia'/.test(serviceAreaConfig);
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
const sitemapFile = join(dist, 'sitemap.xml');
const sitemapXml = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
const sitemapUrls = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1])
  .filter((url) => !/\/images\//.test(url));
const expectedSitemapUrls = expectedIndexableRoutes.map((route) => `https://geliconstructionservices.com.au${route}`);
const missingSitemapUrls = expectedSitemapUrls.filter((url) => !sitemapUrls.includes(url));
const unexpectedSitemapUrls = sitemapUrls.filter((url) => !expectedSitemapUrls.includes(url));
const sitemapUsesProductionDomain = sitemapXml.length > 0
  && !sitemapXml.includes('concreting-website.netlify.app')
  && sitemapUrls.every((url) => url.startsWith('https://geliconstructionservices.com.au/'));

const failedFormChecks = Object.entries(formChecks).filter(([, passed]) => !passed).map(([name]) => name);
const report = {
  routesChecked: htmlFiles.length,
  internalReferencesChecked: internalReferences,
  broken,
  netlifyForm: formChecks,
  missingRenderedValues,
  foundForbiddenValues,
  missingProjectRoutes,
  missingIndexableRoutes,
  metadataByRoute,
  duplicateTitles,
  duplicateDescriptions,
  invalidMetadata,
  missingNoindex,
  projectImageCount,
  expectedProjectImages,
  serviceImageCount,
  expectedServiceImages,
  serviceImagesUseApprovedMappings,
  rejectedImageNamesAbsent,
  quoteLinksTargetForm,
  socialLinksPresent,
  localityShapeValid,
  cardiniaLocality,
  cardiniaLocalityValid,
  cardiniaConfigured,
  robotsUsesProductionDomain: robots.includes('https://geliconstructionservices.com.au/sitemap.xml'),
  sitemapUsesProductionDomain,
  sitemapUrlCount: sitemapUrls.length,
  missingSitemapUrls,
  unexpectedSitemapUrls,
};
console.log(JSON.stringify(report, null, 2));

if (
  broken.length
  || failedFormChecks.length
  || missingRenderedValues.length
  || foundForbiddenValues.length
  || missingProjectRoutes.length
  || missingIndexableRoutes.length
  || duplicateTitles.length
  || duplicateDescriptions.length
  || invalidMetadata.length
  || missingNoindex.length
  || projectImageCount !== expectedProjectImages
  || serviceImageCount !== expectedServiceImages
  || !serviceImagesUseApprovedMappings
  || !rejectedImageNamesAbsent
  || !quoteLinksTargetForm
  || !socialLinksPresent
  || !localityShapeValid
  || !cardiniaLocalityValid
  || !cardiniaConfigured
  || !report.robotsUsesProductionDomain
  || !sitemapUsesProductionDomain
  || missingSitemapUrls.length
  || unexpectedSitemapUrls.length
) process.exitCode = 1;
