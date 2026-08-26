# Concreting Website Mockup

A premium, mobile-first static website mockup for an Australian residential concreting, fencing and outdoor works business. Astro generates static HTML, Netlify hosts it, Netlify Forms receives quote requests, and projects are managed as files—there is no database, CMS, authentication or API server.

> **Demo status:** `YOUR BUSINESS NAME`, all contact details, service-area wording, project information, testimonials and service claims are placeholders. The generated imagery is presentation material and must not be described as work completed by the client.

## Stack

- Astro with strict TypeScript and static generation
- Tailwind CSS v4 available through the Astro Vite integration; the bespoke design system is defined in `src/styles/global.css`
- Astro Content Collections for project data
- Self-hosted Archivo and Manrope variable fonts
- AVIF and WebP responsive demo images
- Netlify Forms for enquiries

Astro was selected because this is a content-led brochure site that benefits from prebuilt HTML, minimal JavaScript, fast loading and straightforward Netlify deployment.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, normally `http://localhost:4321`.

The generated Astro starter includes a background mode that is useful for Codex:

```bash
npx astro dev --background
npx astro dev status
npx astro dev stop
```

## Build and verification

```bash
npm run check
npm run build
npm run verify
```

- Build command: `npm run build`
- Publish directory: `dist`
- `npm run verify` rebuilds the site, checks every generated HTML route and internal asset/link reference, and validates the required Netlify form markup.

## Netlify settings

The repository includes `netlify.toml`, so Netlify should detect the correct settings automatically:

- Base directory: repository root (leave blank in the Netlify UI)
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: none
- Node version: `22.12.0`
- Production branch: `main`

Set `PUBLIC_SITE_URL` to the trusted Netlify site origin for preview/production metadata. Do not connect the client's final domain until the business details, legal wording and real imagery are approved.

## Change the client details

Edit `src/config/site.ts` to change the central business information:

- business name
- phone display text and `tel:` target
- email display text and `mailto:` target
- service area
- tagline and summary
- navigation
- services and example sub-services

Changing the data there updates the header, footer, calls to action and relevant pages without searching through many components. Review the separate placeholder copy in `src/pages/about/index.astro`, `src/pages/privacy/index.astro` and the content files before launch.

## Add a project

Projects live in `src/content/projects/`. One Markdown file automatically creates both a gallery card and an SEO-friendly detail route.

### 1. Create the image folder

For genuine client work, create a clear source folder outside `public/`, then create the served project folder:

```text
source-images/projects/concrete-driveway-narre-warren/
public/images/projects/concrete-driveway-narre-warren/
```

Keep approved originals in the source workflow. Do not serve enormous phone originals directly.

### 2. Optimise and add images

Export each web image in AVIF and WebP at these widths:

```text
cover-480.avif     cover-480.webp
cover-800.avif     cover-800.webp
cover-1200.avif    cover-1200.webp
```

Use the same naming pattern for gallery images, such as `detail-01-480.avif` through `detail-01-1200.webp`. Use a consistent 4:3 crop where practical, keep quality high, remove location metadata if required, and confirm publication permission.

### 3. Create the content file

Copy one file from `src/content/projects/`, rename it to the new slug, and update:

- `title`
- `slug`
- suburb/general `location` only
- optional `date`
- one or more `categories`
- `coverImage` base path without the width/extension
- descriptive `coverAlt`
- `summary`
- `gallery` image base paths and alt text
- the Markdown project description below the frontmatter

Example base path:

```yaml
coverImage: "/images/projects/concrete-driveway-narre-warren/cover"
```

### 4. Choose the cover image

Set `coverImage` to the strongest approved landscape image. That image appears in project grids and social metadata.

### 5. Mark it featured

Set `featured: true` to show the project on the homepage. Use `featured: false` to keep it on the Projects page only.

### 6. Build

```bash
npm run verify
```

### 7. Confirm the result

Check that the project appears under the correct filters at `/projects/`, its detail page works at `/projects/your-slug/`, the gallery opens by mouse and keyboard, all alt text is accurate, and no exact residential address is public.

Then commit the new content file and optimized images. No manual HTML page is needed.

## Netlify quote form

The form in `src/components/QuoteForm.astro` uses static Netlify form detection:

- form name: `quote-request`
- `data-netlify="true"`
- hidden `form-name` field
- `bot-field` honeypot
- accessible labels, hints and browser validation
- `/thanks/` success page

It collects name, phone, optional email, suburb/postcode, requested service and project details. It deliberately has no account creation or file upload. Customers are told they can provide photos or plans later.

After the first Netlify deploy, submit one test enquiry and confirm it appears under **Forms** in the Netlify dashboard. Configure verified notification recipients in Netlify before launch and delete mock submissions when no longer needed.

## SEO and future integrations

The layout includes canonical, Open Graph and social metadata. Astro generates a sitemap and `public/robots.txt` provides the sitemap location. Update the trusted site origin before launch.

No LocalBusiness structured data is included yet because the real business identity and location are unknown. Add it only after the client supplies verified details. No analytics or social scripts are included; insertion points can be added later for Google Analytics, Search Console, Google Business Profile, Facebook and Instagram if requested.

## Before production launch

Collect and confirm:

- registered/trading business name and approved logo/brand system
- real phone, email, hours and service area
- exact confirmed services and exclusions
- genuine business story, owner/team names and approved photograph
- verified licence, insurance, warranty, membership or experience claims (only if the client wants them published)
- genuine approved reviews and permission to identify reviewers
- approved project photography, descriptions and suburb-level locations
- privacy/legal wording and enquiry-retention process
- domain and social links
- Google Business Profile and optional analytics requirements

Do not publish an exact residential address, fake credentials, unapproved reviews or generated demo photos as completed client work.
