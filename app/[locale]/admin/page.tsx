"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Database,
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      redirect("/dashboard")
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-sans font-semibold text-xl">Admin Dashboard</span>
              </Link>
              <Badge variant="destructive">Admin Access</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  User View
                </Button>
              </Link>
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
          {/* Admin Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="font-sans text-lg">Admin Panel</CardTitle>
                    <CardDescription className="font-serif">{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/users" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-3" />
                    User Management
                  </Button>
                </Link>
                <Link href="/admin/portfolios" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-3" />
                    Portfolio Management
                  </Button>
                </Link>
                <Link href="/admin/analytics" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/admin/subdomains" className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-3" />
                    Subdomain Management
                  </Button>
                </Link>
                <div className="border-t border-border pt-2 mt-4">
                  <Link href="/admin/system" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-3" />
                      System Health
                    </Button>
                  </Link>
                  <Link href="/admin/settings" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-3" />
                      Admin Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="font-sans text-3xl font-bold mb-2">System Overview</h1>
              <p className="font-serif text-muted-foreground">Monitor and manage the Portfolio Manager platform</p>
            </div>

            {/* System Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">+23 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Active Portfolios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground mt-1">71% completion rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">Subdomains</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-sm font-medium">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Healthy</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">99.9% uptime</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Management Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">User Management</CardTitle>
                        <CardDescription className="font-serif">Manage user accounts and permissions</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">1,247 users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">1,089</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending Verification</span>
                      <span className="font-medium">158</span>
                    </div>
                  </div>
                  <Link href="/admin/users">
                    <Button className="w-full">Manage Users</Button>
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
                        <CardTitle className="font-sans">Portfolio Management</CardTitle>
                        <CardDescription className="font-serif">Monitor and moderate portfolios</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">892 active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Published</span>
                      <span className="font-medium">634</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Draft</span>
                      <span className="font-medium">258</span>
                    </div>
                  </div>
                  <Link href="/admin/portfolios">
                    <Button className="w-full">View Portfolios</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Analytics Dashboard</CardTitle>
                        <CardDescription className="font-serif">Platform usage and performance metrics</CardDescription>
                      </div>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Active Users</span>
                      <span className="font-medium">1,089</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Portfolio Views</span>
                      <span className="font-medium">45,672</span>
                    </div>
                  </div>
                  <Link href="/admin/analytics">
                    <Button className="w-full">View Analytics</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans">Subdomain Management</CardTitle>
                        <CardDescription className="font-serif">Manage custom domains and subdomains</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">456 domains</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Active Subdomains</span>
                      <span className="font-medium">423</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Custom Domains</span>
                      <span className="font-medium">33</span>
                    </div>
                  </div>
                  <Link href="/admin/subdomains">
                    <Button className="w-full">Manage Domains</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Status
                </CardTitle>
                <CardDescription className="font-serif">Real-time system health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">Database</div>
                      <div className="text-xs text-muted-foreground">Operational</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">File Storage</div>
                      <div className="text-xs text-muted-foreground">Operational</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-sm">AI Services</div>
                      <div className="text-xs text-muted-foreground">Degraded</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
