"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Plus, GraduationCap, LogOut, ArrowLeft, Calendar, MapPin, Edit, Trash2, Award } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function EducationPage() {
  const { user, loading, logout } = useAuth()
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      school: "Hanoi University of Science and Technology",
      location: "Hanoi, Vietnam",
      startDate: "2018-09",
      endDate: "2022-06",
      gpa: "3.8/4.0",
      description:
        "Specialized in Software Engineering with focus on web development and database systems. Graduated Magna Cum Laude.",
    },
  ])
  const [showForm, setShowForm] = useState(false)

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
                <span className="font-sans font-semibold text-xl">Education</span>
              </Link>
              <Badge variant="secondary">Portfolio Section</Badge>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-sans text-3xl font-bold mb-2">Education</h1>
              <p className="font-serif text-muted-foreground">Manage your academic background and qualifications</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>

          {/* Add Education Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-sans">Add New Education</CardTitle>
                <CardDescription className="font-serif">Fill in your educational background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Degree/Qualification</Label>
                    <Input id="degree" placeholder="e.g. Bachelor of Computer Science" />
                  </div>
                  <div>
                    <Label htmlFor="school">School/Institution</Label>
                    <Input id="school" placeholder="e.g. Hanoi University" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Hanoi, Vietnam" />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="month" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="month" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gpa">GPA (Optional)</Label>
                  <Input id="gpa" placeholder="e.g. 3.8/4.0" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your studies, achievements, relevant coursework..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button>Save Education</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education List */}
          <div className="space-y-6">
            {educations.map((edu) => (
              <Card key={edu.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-sans text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="font-serif text-lg">{edu.school}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.startDate} - {edu.endDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </div>
                          {edu.gpa && (
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              GPA: {edu.gpa}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-muted-foreground leading-relaxed">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
