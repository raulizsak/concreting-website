import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string(),
    date: z.coerce.date().optional(),
    categories: z.array(z.enum(['Concreting', 'Fencing', 'Outdoor Works'])),
    coverImage: z.string(),
    coverAlt: z.string(),
    summary: z.string(),
    gallery: z.array(z.object({
      image: z.string(),
      alt: z.string(),
    })),
    featured: z.boolean().default(false),
    demo: z.boolean().default(true),
  }),
});

export const collections = { projects };
