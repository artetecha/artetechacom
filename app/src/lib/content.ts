import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';

/** Strip the locale folder from a collection entry id: "en/my-post" → "my-post". */
export function slugOf(entry: { id: string }): string {
  return entry.id.replace(/^(en|it)\//, '');
}

export async function getPosts(locale: Locale): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection(
    'blog',
    (entry) => entry.id.startsWith(`${locale}/`) && !entry.data.draft,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** The same post in the other locale, if it has been translated. */
export async function getTranslation(
  locale: Locale,
  slug: string,
): Promise<CollectionEntry<'blog'> | undefined> {
  const matches = await getCollection(
    'blog',
    (entry) => entry.id === `${locale}/${slug}` && !entry.data.draft,
  );
  return matches[0];
}

export async function getArchivePosts(): Promise<CollectionEntry<'archive'>[]> {
  const posts = await getCollection('archive');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export interface WritingItem {
  post: CollectionEntry<'blog'>;
  /** True when the post only exists in English and is being listed for Italian readers. */
  foreign: boolean;
}

/**
 * Posts to list for a locale. Italian readers also see English-only posts
 * (marked foreign and linked to the English URL) so the index is never sparse.
 */
export async function getWritingList(locale: Locale): Promise<WritingItem[]> {
  const own = await getPosts(locale);
  if (locale === 'en') return own.map((post) => ({ post, foreign: false }));
  const english = await getPosts('en');
  const ownSlugs = new Set(own.map(slugOf));
  return [
    ...own.map((post) => ({ post, foreign: false })),
    ...english.filter((post) => !ownSlugs.has(slugOf(post))).map((post) => ({ post, foreign: true })),
  ].sort((a, b) => b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());
}

export async function getProjects(locale: Locale): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', (entry) => entry.id.startsWith(`${locale}/`));
  return projects.sort((a, b) => a.data.order - b.data.order);
}
