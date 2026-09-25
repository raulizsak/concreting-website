import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';
import { concretingSubservicePages } from '../config/servicePageContent';

export const prerender = true;

type SitemapImage = {
  path: string;
  caption: string;
};

type SitemapEntry = {
  path: string;
  images?: SitemapImage[];
};

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const absoluteUrl = (path: string) => new URL(path, siteConfig.domain).href;

export async function GET() {
  const projects = await getCollection('projects');
  const serviceEntries: SitemapEntry[] = siteConfig.services.map((service) => {
    const widest = 'imageWidths' in service ? service.imageWidths.at(-1) : 1200;
    return {
      path: `/services/${service.slug}/`,
      images: [{ path: `${service.image}-${widest}.webp`, caption: service.imageAlt }],
    };
  });
  const subserviceEntries: SitemapEntry[] = concretingSubservicePages.map((page) => ({
    path: `/services/concreting/${page.slug}/`,
    images: page.image && page.imageAlt ? [{ path: `${page.image}-1200.webp`, caption: page.imageAlt }] : undefined,
  }));
  const projectEntries: SitemapEntry[] = projects.map((project) => ({
    path: `/projects/${project.data.slug}/`,
    images: [
      { path: `${project.data.coverImage}-1200.webp`, caption: project.data.coverAlt },
      ...project.data.gallery.map((item) => ({ path: `${item.image}-1200.webp`, caption: item.alt })),
    ],
  }));
  const entries: SitemapEntry[] = [
    { path: '/', images: [{ path: '/images/hero/hero-1536.webp', caption: 'Geli Construction Services concreting and outdoor construction' }] },
    { path: '/services/' },
    ...serviceEntries,
    ...subserviceEntries,
    { path: '/projects/' },
    ...projectEntries,
    { path: '/areas-we-service/' },
    { path: '/areas-we-service/pakenham/' },
    { path: '/about/' },
    { path: '/contact/' },
  ];

  const body = entries.map((entry) => {
    const images = entry.images?.map((image) => `
    <image:image>
      <image:loc>${escapeXml(absoluteUrl(image.path))}</image:loc>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`).join('') ?? '';
    return `  <url>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>${images}
  </url>`;
  }).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
