"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Globe, LogOut, ArrowLeft, ExternalLink, Eye, Smartphone, Monitor, Tablet } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function PreviewPage() {
  const { user, loading, logout } = useAuth()
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  const getFrameClass = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[667px]"
      case "tablet":
        return "w-[768px] h-[1024px]"
      default:
        return "w-full h-[800px]"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans font-semibold text-xl">Portfolio Preview</span>
              </Link>
              <Badge variant="secondary">Live Preview</Badge>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-sans text-3xl font-bold mb-2">Portfolio Preview</h1>
              <p className="font-serif text-muted-foreground">See how your portfolio looks to visitors</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/portfolio/preview" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/deploy">
                  <Globe className="w-4 h-4 mr-2" />
                  Deploy Portfolio
                </Link>
              </Button>
            </div>
          </div>

          {/* Device Toggle */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="font-sans flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Preview Mode
              </CardTitle>
              <CardDescription className="font-serif">Choose how to preview your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "desktop" ? "default" : "outline"}
                  onClick={() => setViewMode("desktop")}
                  size="sm"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "outline"}
                  onClick={() => setViewMode("tablet")}
                  size="sm"
                >
                  <Tablet className="w-4 h-4 mr-2" />
                  Tablet
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "outline"}
                  onClick={() => setViewMode("mobile")}
                  size="sm"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Frame */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center">
                <div
                  className={`${getFrameClass()} border border-border rounded-lg overflow-hidden bg-white shadow-lg`}
                >
                  <iframe src="/portfolio/preview" className="w-full h-full" title="Portfolio Preview" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Portfolio Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif">Personal Info</span>
                  <Badge>Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif">Experience</span>
                  <Badge variant="outline">2 entries</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif">Education</span>
                  <Badge variant="outline">1 entry</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif">Skills</span>
                  <Badge variant="outline">8 skills</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif">Projects</span>
                  <Badge variant="outline">3 projects</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-serif">Review your portfolio content</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-serif">Test on different devices</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span className="font-serif">Deploy to custom subdomain</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span className="font-serif">Share with potential employers</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
