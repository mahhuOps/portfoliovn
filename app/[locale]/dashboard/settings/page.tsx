"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LogOut, ArrowLeft, User, Bell, Shield, Palette, Trash2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { user, loading, logout } = useAuth()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    portfolioPublic: true,
    showEmail: false,
    showPhone: true,
    darkMode: false,
    language: "en",
  })

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
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans font-semibold text-xl">Settings</span>
              </Link>
              <Badge variant="secondary">Account Settings</Badge>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-sans text-3xl font-bold mb-2">Settings</h1>
            <p className="font-serif text-muted-foreground">Manage your account and portfolio preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Settings
                </CardTitle>
                <CardDescription className="font-serif">Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+84 123 456 789" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Ho Chi Minh City, Vietnam" />
                  </div>
                </div>
                <Button>Save Profile Changes</Button>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Privacy Settings
                </CardTitle>
                <CardDescription className="font-serif">
                  Control what information is visible on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-sans font-medium">Make Portfolio Public</Label>
                    <p className="text-sm text-muted-foreground font-serif">
                      Allow your portfolio to be discovered by search engines
                    </p>
                  </div>
                  <Switch
                    checked={settings.portfolioPublic}
                    onCheckedChange={(checked) => setSettings({ ...settings, portfolioPublic: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-sans font-medium">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground font-serif">
                      Display your email on your public portfolio
                    </p>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => setSettings({ ...settings, showEmail: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-sans font-medium">Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground font-serif">
                      Display your phone number on your public portfolio
                    </p>
                  </div>
                  <Switch
                    checked={settings.showPhone}
                    onCheckedChange={(checked) => setSettings({ ...settings, showPhone: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription className="font-serif">Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-sans font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground font-serif">
                      Receive updates about your portfolio and new features
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Appearance
                </CardTitle>
                <CardDescription className="font-serif">Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md mt-1"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-sans font-medium">Theme</Label>
                    <p className="text-sm text-muted-foreground font-serif">
                      Use the theme toggle in the header to switch themes
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="font-serif">Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <h4 className="font-sans font-medium text-destructive mb-2">Delete Account</h4>
                  <p className="text-sm text-muted-foreground font-serif mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
