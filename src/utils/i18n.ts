// SafePay does not use i18n routing — these functions are no-ops
// kept for compatibility with Vuexy theme components that import them

export const isUrlMissingLocale = (_url: string) => true

export const getLocalizedUrl = (url: string, _languageCode?: string): string => {
  return url || '/'
}
