import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(process.cwd());
const dist = join(root, 'dist');

if (!existsSync(dist)) {
  throw new Error('dist/ does not exist. Run npm run build first.');
}

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
    if (!candidates.some((candidate) => existsSync(normalize(candidate)))) {
      broken.push({ source: relative(root, file), reference });
    }
  }
}

const contactFile = join(dist, 'contact', 'index.html');
const contactHtml = existsSync(contactFile) ? readFileSync(contactFile, 'utf8') : '';
const formChecks = {
  namedForm: /name="quote-request"/.test(contactHtml),
  netlifyDetection: /data-netlify="true"/.test(contactHtml),
  formNameField: /name="form-name" value="quote-request"/.test(contactHtml),
  honeypot: /netlify-honeypot="bot-field"/.test(contactHtml) && /name="bot-field"/.test(contactHtml),
  successAction: /action="\/thanks\/"/.test(contactHtml),
};

const failedFormChecks = Object.entries(formChecks).filter(([, passed]) => !passed).map(([name]) => name);

console.log(JSON.stringify({
  routesChecked: htmlFiles.length,
  internalReferencesChecked: internalReferences,
  broken,
  netlifyForm: formChecks,
}, null, 2));

if (broken.length || failedFormChecks.length) {
  process.exitCode = 1;
}
