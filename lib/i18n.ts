import {getRequestConfig} from "next-intl/server";

export const locales = ["en", "vi", "zh", "ko", "ja"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale,requestLocale}) => {
  locale = await requestLocale;
  
  const finalLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
export const languageNames = {
  en: "English",
  vi: "Tiếng Việt",
  zh: "中文",
  ko: "한국어",
  ja: "日本語"
} as const;

export const languageFlags = {
  en: "🇺🇸",
  vi: "🇻🇳",
  zh: "🇨🇳",
  ko: "🇰🇷",
  ja: "🇯🇵"
} as const;
