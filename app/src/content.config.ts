import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '{en,it}/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      hero: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const archive = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** Permalink on the old WordPress site, e.g. "/coping-with-technical-debt/2012/04/03/". */
    originalUrl: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '{en,it}/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()).default([]),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/data/testimonials.yaml'),
  schema: z.object({
    id: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    quote: z.object({
      en: z.string(),
      it: z.string().optional(),
    }),
  }),
});

export const collections = { blog, archive, projects, testimonials };
