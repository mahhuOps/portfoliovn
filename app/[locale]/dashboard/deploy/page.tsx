"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Settings,
  Rocket,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function DeployPage() {
  const { user, loading } = useAuth()
  const [subdomain, setSubdomain] = useState("john-doe")
  const [customDomain, setCustomDomain] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isDeployed, setIsDeployed] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

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

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsDeployed(true)
    setIsDeploying(false)
  }

  const portfolioUrl = `https://${subdomain}.portfoliomanager.app`
  const customUrl = customDomain ? `https://${customDomain}` : null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="font-sans text-3xl font-bold mb-2">Deploy Portfolio</h1>
            <p className="font-serif text-muted-foreground">
              Make your portfolio live with a custom subdomain or domain
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Deployment Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subdomain Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Subdomain Configuration
                  </CardTitle>
                  <CardDescription className="font-serif">
                    Choose your portfolio subdomain on portfoliomanager.app
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="subdomain"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                        placeholder="your-name"
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">.portfoliomanager.app</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Your portfolio will be available at: {portfolioUrl}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="public">Make Portfolio Public</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow your portfolio to be discovered and indexed by search engines
                      </p>
                    </div>
                    <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                </CardContent>
              </Card>

              {/* Custom Domain */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    Custom Domain
                    <Badge variant="outline">Pro Feature</Badge>
                  </CardTitle>
                  <CardDescription className="font-serif">Use your own domain name for your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-domain">Custom Domain</Label>
                    <Input
                      id="custom-domain"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="www.yourname.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      You'll need to configure DNS settings to point to our servers
                    </p>
                  </div>

                  {customDomain && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">DNS Configuration Required</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <code className="bg-background px-2 py-1 rounded">CNAME</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <code className="bg-background px-2 py-1 rounded">www</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Value:</span>
                          <code className="bg-background px-2 py-1 rounded">portfoliomanager.app</code>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    SEO Settings
                  </CardTitle>
                  <CardDescription className="font-serif">Optimize your portfolio for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      defaultValue={`${user.name} - Portfolio`}
                      placeholder="Your Name - Portfolio"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Input id="meta-description" placeholder="Brief description of your portfolio and skills" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deployment Status */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Deployment Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isDeployed ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Live</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Not Deployed</span>
                    </div>
                  )}

                  <Separator />

                  {isDeployed && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Portfolio URL</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm bg-muted px-2 py-1 rounded flex-1 truncate">{portfolioUrl}</code>
                          <Button size="sm" variant="ghost">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {customUrl && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Custom Domain</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-sm bg-muted px-2 py-1 rounded flex-1 truncate">{customUrl}</code>
                            <Button size="sm" variant="ghost">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <Button className="w-full" asChild>
                        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Portfolio
                        </a>
                      </Button>
                    </div>
                  )}

                  {!isDeployed && (
                    <Button className="w-full" onClick={handleDeploy} disabled={isDeploying}>
                      {isDeploying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 mr-2" />
                          Deploy Portfolio
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Portfolio Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Portfolio Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Completion</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Projects</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Skills</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  {isDeployed && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">Views</span>
                        <span className="text-sm font-medium">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">This Week</span>
                        <span className="text-sm font-medium">+12</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
