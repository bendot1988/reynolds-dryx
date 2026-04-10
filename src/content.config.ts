import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects collection — manage project portfolio via Markdown files
 * CMS: /admin/ (Decap CMS)
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    contractor: z.string(),
    value: z.string(),
    status: z.enum(['On Going', 'Completed', 'Upcoming']).default('Completed'),
    sector: z.enum(['Residential', 'Commercial', 'Industrial', 'Hotels & Leisure', 'Education', 'Healthcare']).default('Residential'),
    image: z.string().optional(),
    description: z.string(),
    services: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

/**
 * News / Blog collection — manage news articles via Markdown files
 * CMS: /admin/ (Decap CMS)
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Reynolds Dryline'),
    category: z.enum(['Projects', 'Company News', 'Heritage', 'Innovation', 'Industry News', 'Careers']).default('Company News'),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, news };
