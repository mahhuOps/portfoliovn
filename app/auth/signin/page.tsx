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
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations()

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
        title: t("auth.signin.errors.emailRequired"),
        description: t("auth.signin.errors.emailRequired"),
      })
      return
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: t("auth.signin.errors.passwordRequired"),
        description: t("auth.signin.errors.passwordRequired"),
      })
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      toast({
        title: t("auth.signin.success"),
        description: t("auth.signin.success"),
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      let displayMessage = t("auth.signin.errors.networkError")

      if (errorMessage.includes("Invalid email or password")) {
        displayMessage = t("auth.signin.errors.invalidCredentials")
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        displayMessage = t("auth.signin.errors.networkError")
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
        title: t("auth.signin.success"),
        description: `${t("auth.signin.success")} ${demoType === "admin" ? t("navigation.admin") : t("navigation.signin")}`,
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Demo Login Error",
        description: t("auth.signin.errors.networkError"),
      })
      console.error("Demo login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-2xl">Portfolio Manager</span>
          </Link>
          <div className="flex justify-center mb-4">
            <LanguageSwitcher variant="compact" />
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-sans text-2xl">{t("auth.signin.title")}</CardTitle>
            <CardDescription className="font-serif">{t("auth.signin.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <Button onClick={() => handleDemoLogin("user")} variant="outline" className="w-full" disabled={loading}>
                <User className="w-4 h-4 mr-2" />
                {t("auth.signin.demoUser")}
              </Button>
              <Button onClick={() => handleDemoLogin("admin")} variant="outline" className="w-full" disabled={loading}>
                <Shield className="w-4 h-4 mr-2" />
                {t("auth.signin.demoAdmin")}
              </Button>
            </div>

            <Separator className="my-6" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.signin.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.signin.email")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.signin.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.signin.password")}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? `${t("common.loading")}...` : t("auth.signin.button")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                {t("auth.signin.noAccount")}{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  {t("auth.signin.signupLink")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
