import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

// Can be imported from a shared config
export const locales = ["en", "vi", "zh", "ko", "ja"] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export const languageNames = {
  en: "English",
  vi: "Tiếng Việt",
  zh: "中文",
  ko: "한국어",
  ja: "日本語",
} as const

export const languageFlags = {
  en: "🇺🇸",
  vi: "🇻🇳",
  zh: "🇨🇳",
  ko: "🇰🇷",
  ja: "🇯🇵",
} as const
