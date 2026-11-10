export const i18n = {
  defaultLocale: 'nl',
  locales: ['nl', 'en'],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export function normalizeLocale(lang?: string) {
  const allowed = ['nl', 'en'] as const;
  return (allowed as readonly string[]).includes(lang ?? '') ? (lang as 'nl'|'en') : 'nl';
}
