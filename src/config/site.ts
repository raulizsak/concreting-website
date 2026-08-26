export const siteConfig = {
  businessName: 'YOUR BUSINESS NAME',
  phoneDisplay: '04XX XXX XXX',
  phoneHref: 'tel:04XXXXXXXX',
  emailDisplay: 'hello@[DOMAIN PLACEHOLDER]',
  emailHref: 'mailto:hello@example.com',
  serviceArea: '[SERVICE AREA PLACEHOLDER]',
  tagline: 'Quality outdoor work built for Australian homes.',
  description:
    'Demo website for an Australian residential concreting, fencing and outdoor works business.',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  services: [
    {
      name: 'Concreting',
      slug: 'concreting',
      summary: 'Driveways, paths, slabs and practical concrete finishes for the home.',
      examples: ['Driveways', 'Paths', 'Slabs', 'Patios'],
    },
    {
      name: 'Fencing',
      slug: 'fencing',
      summary: 'Boundary fencing and gates designed for privacy, function and a clean finish.',
      examples: ['Colorbond-style fencing', 'Timber fencing', 'Boundary fencing', 'Gates'],
    },
    {
      name: 'Outdoor Works',
      slug: 'outdoor-works',
      summary: 'Flexible external works that help complete and connect your outdoor space.',
      examples: ['Retaining walls', 'Site preparation', 'Outdoor finishing', 'Multiple services'],
    },
  ],
} as const;

export type Service = (typeof siteConfig.services)[number];
