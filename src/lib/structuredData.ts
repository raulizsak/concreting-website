import { siteConfig } from '../config/site';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.domain}/#organization`,
  name: siteConfig.businessName,
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/logo/geli-construction-services-logo.jpeg`,
  image: `${siteConfig.domain}/og.png`,
  telephone: '+61494802784',
  email: siteConfig.emailDisplay,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.socials),
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.domain}/#website`,
  name: siteConfig.businessName,
  url: `${siteConfig.domain}/`,
  publisher: { '@id': `${siteConfig.domain}/#organization` },
};

export const breadcrumbStructuredData = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, siteConfig.domain).href,
  })),
});
