"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Globe, FileText, Brain, Shield, Zap, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"
import { useTranslations } from "next-intl"

export default function HomePage() {
  const { user, logout } = useAuth()
  const { locale } = useLanguage()
  const t = useTranslations("homepage")
  const tNav = useTranslations("navigation")
  const tCommon = useTranslations("common")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-sans font-semibold text-xl">Portfolio Manager</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <LanguageSwitcher variant="compact" />
              <ThemeToggle />
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      {tNav("dashboard")}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {tNav("signOut")}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="sm">
                      {tNav("signIn")}
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button size="sm">
                      {t("getStarted")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Portfolio Builder
          </Badge>
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="font-serif text-xl text-muted-foreground mb-8 leading-relaxed">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8">
                {t("getStarted")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/portfolio/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                {t("learnMore")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="font-serif text-xl text-muted-foreground">
              Powerful features to create, manage, and deploy your professional portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.aiPowered.title")}</CardTitle>
                <CardDescription className="font-serif">{t("features.aiPowered.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.customDomains.title")}</CardTitle>
                <CardDescription className="font-serif">{t("features.customDomains.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.professionalTemplates.title")}</CardTitle>
                <CardDescription className="font-serif">
                  {t("features.professionalTemplates.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.multiLanguage.title")}</CardTitle>
                <CardDescription className="font-serif">{t("features.multiLanguage.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.realTimePreview.title")}</CardTitle>
                <CardDescription className="font-serif">{t("features.realTimePreview.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">{t("features.cloudStorage.title")}</CardTitle>
                <CardDescription className="font-serif">{t("features.cloudStorage.description")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-sans text-4xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="font-serif text-xl text-muted-foreground mb-8">
            Join thousands of professionals who trust Portfolio Manager to showcase their work
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8">
              {t("getStarted")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-sans font-semibold">Portfolio Manager</span>
            </div>
            <p className="text-muted-foreground font-serif">
              © 2025 Portfolio Manager. Built with Next.js and Firebase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
