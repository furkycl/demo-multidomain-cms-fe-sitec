/**
 * Frontend locale registry — backend config/locales.php ile birebir eş.
 * Backend supported list değişirse buranın da güncellenmesi gerek
 * (gelecekte API üzerinden sync ederiz: GET /api/sites/{domain} dönüyor zaten).
 */

export type Locale =
  | 'tr' | 'en' | 'ar' | 'fr' | 'es' | 'pt' | 'ko' | 'ja' | 'it' | 'de';

export const SUPPORTED_LOCALES: Locale[] = [
  'tr', 'en', 'ar', 'fr', 'es', 'pt', 'ko', 'ja', 'it', 'de',
];

export const DEFAULT_LOCALE: Locale = 'tr';

export const LOCALE_INFO: Record<Locale, {
  name: string;
  native: string;
  direction: 'ltr' | 'rtl';
  crmTarget: 'omnigos' | 'linguland';
}> = {
  tr: { name: 'Turkish',    native: 'Türkçe',    direction: 'ltr', crmTarget: 'omnigos' },
  en: { name: 'English',    native: 'English',   direction: 'ltr', crmTarget: 'omnigos' },
  ar: { name: 'Arabic',     native: 'العربية',    direction: 'rtl', crmTarget: 'omnigos' },
  fr: { name: 'French',     native: 'Français',  direction: 'ltr', crmTarget: 'linguland' },
  es: { name: 'Spanish',    native: 'Español',   direction: 'ltr', crmTarget: 'linguland' },
  pt: { name: 'Portuguese', native: 'Português', direction: 'ltr', crmTarget: 'linguland' },
  ko: { name: 'Korean',     native: '한국어',     direction: 'ltr', crmTarget: 'linguland' },
  ja: { name: 'Japanese',   native: '日本語',     direction: 'ltr', crmTarget: 'linguland' },
  it: { name: 'Italian',    native: 'Italiano',  direction: 'ltr', crmTarget: 'linguland' },
  de: { name: 'German',     native: 'Deutsch',   direction: 'ltr', crmTarget: 'linguland' },
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}
