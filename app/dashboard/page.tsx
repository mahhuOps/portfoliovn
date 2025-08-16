"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Plus,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Globe,
  Settings,
  LogOut,
  Brain,
  Sparkles,
  Download,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-sans font-semibold text-xl">Portfolio Manager</span>
              </Link>
              <Badge variant="secondary">Dashboard</Badge>
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-sans text-lg">{user.name}</CardTitle>
                    <CardDescription className="font-serif">{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/personal" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-3" />
                    Personal Info
                  </Button>
                </Link>
                <Link href="/dashboard/experience" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <Briefcase className="w-4 h-4 mr-3" />
                    Experience
                  </Button>
                </Link>
                <Link href="/dashboard/education" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <GraduationCap className="w-4 h-4 mr-3" />
                    Education
                  </Button>
                </Link>
                <Link href="/dashboard/skills" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-3" />
                    Skills
                  </Button>
                </Link>
                <Link href="/dashboard/projects" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-3" />
                    Projects
                  </Button>
                </Link>
                <div className="border-t border-border pt-2 mt-4">
                  <Link href="/dashboard/ai-tools" className="w-full">
                    <Button variant="outline" className="w-full justify-start mb-2 bg-transparent">
                      <Brain className="w-4 h-4 mr-3" />
                      AI Tools
                      <Sparkles className="w-3 h-3 ml-auto" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/export" className="w-full">
                    <Button variant="outline" className="w-full justify-start mb-2 bg-transparent">
                      <Download className="w-4 h-4 mr-3" />
                      Export CV
                    </Button>
                  </Link>
                  <Link href="/dashboard/preview" className="w-full">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="w-4 h-4 mr-3" />
                      Preview Portfolio
                    </Button>
                  </Link>
                  <Link href="/dashboard/deploy" className="w-full">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Rocket className="w-4 h-4 mr-3" />
                      Deploy Portfolio
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings" className="w-full mt-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="font-sans text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="font-serif text-muted-foreground">Manage your portfolio sections and track your progress</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Portfolio Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">65%</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Projects Added</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground mt-1">+1 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Portfolio Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Personal Information</CardTitle>
                        <CardDescription className="font-serif">Basic details and bio</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/personal">
                    <Button className="w-full">Edit Details</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Work Experience</CardTitle>
                        <CardDescription className="font-serif">Professional history</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">2 entries</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/experience">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Education</CardTitle>
                        <CardDescription className="font-serif">Academic background</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">1 entry</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/education">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Skills</CardTitle>
                        <CardDescription className="font-serif">Technical abilities</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">8 skills</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/skills">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skills
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Projects</CardTitle>
                        <CardDescription className="font-serif">Portfolio showcase</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">3 projects</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/projects">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans flex items-center gap-2">
                          AI Tools
                          <Sparkles className="w-4 h-4 text-primary" />
                        </CardTitle>
                        <CardDescription className="font-serif">
                          Voice input, document extraction, job matching
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">New</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/ai-tools">
                    <Button className="w-full">
                      <Brain className="w-4 h-4 mr-2" />
                      Explore AI Tools
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Export CV</CardTitle>
                        <CardDescription className="font-serif">Generate PDF and Word documents</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/export">
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Documents
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Portfolio Preview</CardTitle>
                        <CardDescription className="font-serif">See how it looks</CardDescription>
                      </div>
                    </div>
                    <Badge>Live</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/preview">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Deploy Portfolio</CardTitle>
                        <CardDescription className="font-serif">Make it live with custom subdomain</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Deploy</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/deploy">
                    <Button className="w-full">
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
