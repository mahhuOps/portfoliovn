"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Plus, Code, LogOut, ArrowLeft, Star, X } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function SkillsPage() {
  const { user, loading, logout } = useAuth()
  const [skills, setSkills] = useState([
    { id: 1, name: "React", level: 5, category: "Frontend" },
    { id: 2, name: "Next.js", level: 5, category: "Frontend" },
    { id: 3, name: "TypeScript", level: 4, category: "Programming" },
    { id: 4, name: "Node.js", level: 4, category: "Backend" },
    { id: 5, name: "Firebase", level: 4, category: "Backend" },
    { id: 6, name: "Tailwind CSS", level: 5, category: "Frontend" },
    { id: 7, name: "Git", level: 4, category: "Tools" },
    { id: 8, name: "Figma", level: 3, category: "Design" },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", level: 3, category: "Frontend" })

  const categories = ["Frontend", "Backend", "Programming", "Tools", "Design", "Other"]

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

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < level ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans font-semibold text-xl">Skills</span>
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
              <h1 className="font-sans text-3xl font-bold mb-2">Skills</h1>
              <p className="font-serif text-muted-foreground">Manage your technical abilities and expertise</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* Add Skill Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-sans">Add New Skill</CardTitle>
                <CardDescription className="font-serif">Add a skill and rate your proficiency level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skillName">Skill Name</Label>
                    <Input
                      id="skillName"
                      placeholder="e.g. React, Python, Photoshop"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Proficiency Level</Label>
                  <div className="flex items-center gap-2 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewSkill({ ...newSkill, level: i + 1 })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            i < newSkill.level ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{newSkill.level}/5</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Add Skill</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills by Category */}
          <div className="space-y-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    {category}
                    <Badge variant="outline">{categorySkills.length} skills</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-sans font-medium">{skill.name}</span>
                          <div className="flex items-center gap-1">{renderStars(skill.level)}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
