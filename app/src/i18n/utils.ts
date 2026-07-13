import { en, type Dictionary } from './en';
import { it } from './it';

export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, it };

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Prefix a root-relative path for the given locale. `/about/` → `/it/about/` */
export function localizePath(locale: Locale, path: string): string {
  return locale === 'en' ? path : `/it${path}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'it' : 'en';
}

/** Best-effort counterpart URL in the other locale (pure prefix swap). */
export function alternatePath(locale: Locale, pathname: string): string {
  if (locale === 'en') return `/it${pathname}`;
  return pathname.replace(/^\/it(\/|$)/, '/');
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
