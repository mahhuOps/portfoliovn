"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CVExporter } from "@/components/export/cv-exporter"
import { ArrowLeft, FileText, Download, TrendingUp } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function ExportPage() {
  const { user, loading } = useAuth()
  const [portfolioData, setPortfolioData] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }

    // Load portfolio data from localStorage
    const personalInfo = localStorage.getItem("portfolio-personal")
    const projects = localStorage.getItem("portfolio-projects")

    setPortfolioData({
      personal: personalInfo ? JSON.parse(personalInfo) : null,
      projects: projects ? JSON.parse(projects) : [],
    })
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans font-semibold">Back to Dashboard</span>
              </Link>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                Export CV
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Export Your CV
          </h1>
          <p className="font-serif text-muted-foreground">
            Generate professional PDF and Word documents from your portfolio data
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-lg">Portfolio Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm">Personal Info</span>
                    <Badge variant={portfolioData?.personal ? "secondary" : "outline"} className="text-xs">
                      {portfolioData?.personal ? "Complete" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm">Projects</span>
                    <Badge variant="secondary" className="text-xs">
                      {portfolioData?.projects?.length || 0} items
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm">Experience</span>
                    <Badge variant="outline" className="text-xs">
                      0 items
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm">Education</span>
                    <Badge variant="outline" className="text-xs">
                      0 items
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-lg flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Export Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="font-serif text-sm space-y-2 text-muted-foreground">
                    <li>• Complete all portfolio sections for best results</li>
                    <li>• Use professional language in descriptions</li>
                    <li>• Keep project descriptions concise</li>
                    <li>• Choose templates that match your industry</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Export Interface */}
          <div className="lg:col-span-3">
            <CVExporter portfolioData={portfolioData} />
          </div>
        </div>
      </div>
    </div>
  )
}
