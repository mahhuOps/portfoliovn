"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/ui/image-upload"
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  bio: string
  avatar?: string
}

export default function PersonalInfoPage() {
  const { user, loading } = useAuth()
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    bio: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }

    // Load existing data from localStorage
    const saved = localStorage.getItem("portfolio-personal")
    if (saved) {
      setPersonalInfo(JSON.parse(saved))
    } else if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }))
    }
  }, [user, loading])

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("portfolio-personal", JSON.stringify(personalInfo))
    setSaving(false)
  }

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
              <Badge variant="secondary">Personal Information</Badge>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold mb-2">Personal Information</h1>
          <p className="font-serif text-muted-foreground">Update your basic details and professional summary</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Picture
                </CardTitle>
                <CardDescription className="font-serif">
                  Upload a professional headshot for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-xs">
                  <ImageUpload
                    value={personalInfo.avatar}
                    onChange={(url) => setPersonalInfo((prev) => ({ ...prev, avatar: url }))}
                    onRemove={() => setPersonalInfo((prev) => ({ ...prev, avatar: undefined }))}
                    placeholder="Upload profile picture"
                    aspectRatio="square"
                    maxSize={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription className="font-serif">Your core professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Online Presence
                </CardTitle>
                <CardDescription className="font-serif">Your professional links and social profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={personalInfo.website}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://johndoe.com"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/johndoe"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Professional Summary</CardTitle>
                <CardDescription className="font-serif">
                  A brief overview of your background and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={personalInfo.bio}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground">{personalInfo.bio.length}/500 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-sans text-lg">Preview</CardTitle>
                <CardDescription className="font-serif">How this will appear on your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                    {personalInfo.avatar ? (
                      <Image
                        src={personalInfo.avatar || "/placeholder.svg"}
                        alt="Profile picture"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-sans text-xl font-bold">{personalInfo.fullName || "Your Name"}</h3>
                  <p className="font-serif text-muted-foreground">{personalInfo.title || "Your Title"}</p>
                </div>

                <div className="space-y-2 text-sm">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif">{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif">{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif text-primary">Website</span>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif text-primary">LinkedIn</span>
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <span className="font-serif text-primary">GitHub</span>
                    </div>
                  )}
                </div>

                {personalInfo.bio && (
                  <div className="pt-4 border-t border-border">
                    <p className="font-serif text-sm text-muted-foreground leading-relaxed">{personalInfo.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
