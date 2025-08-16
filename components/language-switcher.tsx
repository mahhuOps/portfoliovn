"use client"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"
import { type Locale, languageNames, languageFlags } from "@/lib/i18n"

interface LanguageSwitcherProps {
  variant?: "default" | "compact"
  className?: string
}

export function LanguageSwitcher({ variant = "default", className }: LanguageSwitcherProps) {
  const { locale, setLocale, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className={className}>
        <Globe className="h-4 w-4" />
        {variant === "default" && <span className="ml-2">Loading...</span>}
      </Button>
    )
  }

  const currentLanguage = languageNames[locale]
  const currentFlag = languageFlags[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Globe className="h-4 w-4" />
          {variant === "default" && (
            <span className="ml-2 flex items-center gap-1">
              <span className="text-lg">{currentFlag}</span>
              <span>{currentLanguage}</span>
            </span>
          )}
          {variant === "compact" && <span className="ml-1 text-lg">{currentFlag}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuRadioGroup value={locale} onValueChange={(value) => setLocale(value as Locale)}>
          <DropdownMenuRadioItem value="en" className="flex items-center gap-3">
            <span className="text-lg">{languageFlags.en}</span>
            <span>{languageNames.en}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vi" className="flex items-center gap-3">
            <span className="text-lg">{languageFlags.vi}</span>
            <span>{languageNames.vi}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="zh" className="flex items-center gap-3">
            <span className="text-lg">{languageFlags.zh}</span>
            <span>{languageNames.zh}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ko" className="flex items-center gap-3">
            <span className="text-lg">{languageFlags.ko}</span>
            <span>{languageNames.ko}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ja" className="flex items-center gap-3">
            <span className="text-lg">{languageFlags.ja}</span>
            <span>{languageNames.ja}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
