import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ===== 文章集合：src/content/blog/*.md =====
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['学习', '资源', '随想', '教程']).default('随想'),
    draft: z.boolean().default(false),
  }),
});

// ===== 学习进度时间线：src/content/progress/*.md =====
const progress = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/progress' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    status: z.enum(['进行中', '已完成', '计划中', '暂停']).default('计划中'),
    tags: z.array(z.string()).default([]),
    milestones: z.array(z.string()).default([]),
  }),
});

// ===== 软件资源：src/content/resources/*.md =====
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    category: z.enum(['效率工具', '开发工具', '学习资料', '系统软件', '其他']).default('其他'),
    license: z.string().default('免费'),
    platform: z.array(z.string()).default(['Windows']),
    featured: z.boolean().default(false),
    addedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, progress, resources };
