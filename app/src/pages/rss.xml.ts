import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../data/site';
import { getPosts, slugOf } from '../lib/content';
import { en } from '../i18n/en';

export async function GET(context: APIContext) {
  const posts = await getPosts('en');
  return rss({
    title: `${SITE.name} — ${en.meta.siteTagline}`,
    description: en.meta.siteDescription,
    site: context.site ?? SITE.origin,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${slugOf(post)}/`,
    })),
  });
}
