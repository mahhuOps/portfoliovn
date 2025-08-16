"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Locale, locales } from "@/lib/i18n"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get saved locale from localStorage or detect from browser
    const savedLocale = localStorage.getItem("portfolio-locale") as Locale
    const browserLocale = navigator.language.split("-")[0] as Locale

    const initialLocale =
      savedLocale && locales.includes(savedLocale)
        ? savedLocale
        : locales.includes(browserLocale)
          ? browserLocale
          : "en"

    setLocaleState(initialLocale)
    setIsLoading(false)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("portfolio-locale", newLocale)
    // Reload page to apply new locale
    window.location.reload()
  }

  return <LanguageContext.Provider value={{ locale, setLocale, isLoading }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
