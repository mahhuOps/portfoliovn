"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sparkles, User, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslations } from "next-intl"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, user, loading: authLoading } = useAuth()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: t("errors.emailRequired"),
        description: t("errors.emailRequired"),
      })
      return
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: t("errors.passwordRequired"),
        description: t("errors.passwordRequired"),
      })
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      toast({
        title: t("success.signInSuccess"),
        description: t("success.signInSuccess"),
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("errors.networkError")
      let displayMessage = t("errors.networkError")

      if (errorMessage.includes("Invalid email or password")) {
        displayMessage = t("errors.invalidCredentials")
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        displayMessage = t("errors.networkError")
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: displayMessage,
      })
      console.error("Sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoType: "user" | "admin") => {
    setLoading(true)
    try {
      const demoEmail = demoType === "admin" ? "admin@example.com" : "demo@example.com"
      const demoPassword = "demo123"
      await signIn(demoEmail, demoPassword)
      toast({
        title: t("success.signInSuccess"),
        description: t("success.signInSuccess"),
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: t("errors.networkError"),
      })
      console.error("Demo login error:", error)
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
            <CardTitle className="font-sans text-2xl">{t("signIn")}</CardTitle>
            <CardDescription className="font-serif">
              Sign in to your account to continue building your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <Button onClick={() => handleDemoLogin("user")} variant="outline" className="w-full" disabled={loading}>
                <User className="w-4 h-4 mr-2" />
                {t("signInAsUser")}
              </Button>
              <Button onClick={() => handleDemoLogin("admin")} variant="outline" className="w-full" disabled={loading}>
                <Shield className="w-4 h-4 mr-2" />
                {t("signInAsAdmin")}
              </Button>
            </div>

            <Separator className="my-6" />

            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? `${tCommon("loading")}...` : t("signIn")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                {t("dontHaveAccount")}{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  {t("signUp")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
