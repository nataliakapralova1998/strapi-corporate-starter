export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']
} as const

export type Locale = (typeof i18n)['locales'][number] 