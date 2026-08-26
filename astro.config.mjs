// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://your-business-name.example',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => !page.endsWith('/thanks/') && !page.endsWith('/privacy/'),
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
