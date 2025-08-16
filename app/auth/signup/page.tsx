"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslations } from "next-intl"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp, user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations("auth")
  const tCommon = useTranslations("common")

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) return null

  const validateForm = () => {
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: t("errors.nameRequired"),
        description: t("errors.nameRequired"),
      })
      return false
    }

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: t("errors.emailRequired"),
        description: t("errors.emailRequired"),
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: t("errors.invalidEmail"),
        description: t("errors.invalidEmail"),
      })
      return false
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: t("errors.passwordRequired"),
        description: t("errors.passwordRequired"),
      })
      return false
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: t("errors.passwordTooShort"),
        description: t("errors.passwordTooShort"),
      })
      return false
    }

    if (confirmPassword && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: t("errors.passwordsDontMatch"),
        description: t("errors.passwordsDontMatch"),
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, name)
      toast({
        title: t("success.signUpSuccess"),
        description: t("success.signUpSuccess"),
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("errors.networkError")
      let displayMessage = t("errors.networkError")

      if (errorMessage.includes("Email already exists")) {
        displayMessage = t("errors.emailAlreadyExists")
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        displayMessage = t("errors.networkError")
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: displayMessage,
      })
      console.error("Sign up error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end gap-2 mb-6">
          <LanguageSwitcher variant="compact" />
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-2xl">Portfolio Manager</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-sans text-2xl">{t("signUp")}</CardTitle>
            <CardDescription className="font-serif">
              Join thousands of professionals building amazing portfolios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("name")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("confirmPassword")}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? `${tCommon("loading")}...` : t("signUp")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  {t("signIn")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
