import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCategories = z.enum([
  'Concreting',
  'Excavation',
  'Stonework & Outdoor Tiling',
  'Outdoor Finishing & Landscaping',
  'Irrigation & Drainage',
  'Retaining Walls',
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string().optional(),
    date: z.coerce.date().optional(),
    categories: z.array(projectCategories).min(1),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    coverAlt: z.string(),
    coverWidth: z.number().int().positive(),
    coverHeight: z.number().int().positive(),
    summary: z.string(),
    gallery: z.array(z.object({
      image: z.string(),
      alt: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
  }),
});

export const collections = { projects };
