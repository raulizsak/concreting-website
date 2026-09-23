# Geli Construction Services Website

Production website for Geli Construction Services, built with Astro and hosted on the existing Netlify project. It is a static, content-led website with file-based project records, Netlify Forms and a lightweight Leaflet service-area checker.

## Stack

- Astro with strict TypeScript and static generation
- Tailwind CSS v4 available through the Astro Vite integration
- Astro Content Collections for project data
- Self-hosted Archivo and Manrope variable fonts
- Responsive AVIF and WebP images generated with Sharp
- Netlify Forms for quote enquiries
- Leaflet and OpenStreetMap tiles for the service-area map

## Local development

Requirements: Node.js 22.12 or newer and npm.

~~~bash
npm install
npx astro dev --background
~~~

Use npx astro dev status, npx astro dev logs and npx astro dev stop to manage the background server.

## Build and verification

~~~bash
npm run check
npm run build
npm run verify
~~~

The verification script checks generated routes, internal links and assets, production business information, project image counts, locality data, canonical-domain references and the required Netlify form markup.

## Business details and services

Central business information, navigation and the six service groups live in src/config/site.ts. Update that file rather than duplicating phone, email or service values across pages.

Do not publish project addresses, private customer information, unverified credentials or unsupported business claims.

## Service-area checker

The exact usual-service suburb list and its five display groups live in src/config/serviceAreas.ts.

public/data/vic-localities.json contains the broader Victorian locality search data. Coverage is determined only by the explicit configured suburb list; it is not inferred from a metropolitan boundary. The same configured suburb list powers checker results, map markers and the accessible grouped list.

Refresh the broader Victorian locality file when its public source changes:

~~~bash
node scripts/generate-location-data.mjs
~~~

## Add a customer project

Each project is one Markdown file in src/content/projects/, so no manual HTML page is required.

1. Confirm the customer has approved the photographs for publication.
2. Keep approved originals outside public/.
3. Auto-orient and strip metadata while creating responsive AVIF and WebP derivatives:

   ~~~bash
   node scripts/process-images.mjs "path/to/original.jpg" "public/images/projects/project-slug/cover" "480,800,1200"
   ~~~

4. Create src/content/projects/project-slug.md.
5. Select only genuine categories from the content schema.
6. Add a location only if the customer explicitly approves suburb publication.
7. Add factual alt text and a conservative project description.
8. Set featured and order if the project should appear on the homepage.
9. Run npm run check and npm run verify.
10. Visually inspect the card, detail page, gallery and lightbox before committing.

Do not serve phone-camera originals directly, retain EXIF/GPS metadata, infer an address, or invent dates, dimensions, materials or customer details.

## Logo and social assets

The approved logo derivatives live in public/logo/. Favicons and public/og.png are derived from the same supplied logo.

To rebuild them from an approved replacement logo:

~~~bash
node scripts/build-brand-assets.mjs "path/to/approved-logo.jpg"
~~~

## Netlify quote form

The form in src/components/QuoteForm.astro preserves:

- form identity quote-request
- data-netlify detection
- hidden form-name field
- bot-field honeypot
- browser and client-side validation
- /thanks/ success route

The project must keep an email submission notification for quote-request directed to g.lconstructionservices82@gmail.com. Configure this in the existing Netlify project under form submission notifications; do not rename the form or recreate the site.

## Deployment

- Existing Netlify project: concreting-website
- Production branch: main
- Build command: npm run build
- Publish directory: dist
- Production origin: https://geliconstructionservices.com.au
- Environment variable: PUBLIC_SITE_URL=https://geliconstructionservices.com.au

Use a protected deploy preview for review before changing production. The apex domain is canonical and www should redirect to it. DNS is already delegated to Netlify; registrar ownership settings should not be changed.

## Privacy and integrations

The website intentionally has no analytics, advertising pixels, customer accounts, payments, uploads or CAPTCHA. Review the Privacy Policy before adding any data collection or third-party tracking.
