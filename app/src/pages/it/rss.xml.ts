import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../../data/site';
import { getPosts, slugOf } from '../../lib/content';
import { it } from '../../i18n/it';

export async function GET(context: APIContext) {
  const posts = await getPosts('it');
  return rss({
    title: `${SITE.name} — ${it.meta.siteTagline}`,
    description: it.meta.siteDescription,
    site: context.site ?? SITE.origin,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/it/writing/${slugOf(post)}/`,
    })),
  });
}
