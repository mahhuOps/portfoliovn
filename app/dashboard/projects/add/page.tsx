"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/ui/image-upload"
import { FileUpload } from "@/components/ui/file-upload"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  imageUrl?: string
  featured: boolean
  attachments: Array<{
    id: string
    name: string
    size: number
    type: string
    url: string
  }>
}

export default function AddProjectPage() {
  const { user, loading } = useAuth()
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    attachments: [],
  })
  const [newTech, setNewTech] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }
  }, [user, loading])

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage (in real app, this would be an API call)
    const existingProjects = JSON.parse(localStorage.getItem("portfolio-projects") || "[]")
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
    }
    existingProjects.push(newProject)
    localStorage.setItem("portfolio-projects", JSON.stringify(existingProjects))

    setSaving(false)
    // Redirect back to projects page
    window.location.href = "/dashboard/projects"
  }

  const addTechnology = () => {
    if (newTech.trim() && !projectData.technologies.includes(newTech.trim())) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleFileUpload = (files: File[]) => {
    const newAttachments = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }))

    setProjectData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }))
  }

  const removeAttachment = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
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
              <Link href="/dashboard/projects" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans font-semibold">Back to Projects</span>
              </Link>
              <Badge variant="secondary">Add Project</Badge>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold mb-2">Add New Project</h1>
          <p className="font-serif text-muted-foreground">Showcase your work with detailed project information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Project Details</CardTitle>
                <CardDescription className="font-serif">Basic information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={projectData.title}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project, its features, and what makes it special..."
                    rows={4}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live Demo URL</Label>
                    <Input
                      id="liveUrl"
                      value={projectData.liveUrl}
                      onChange={(e) => setProjectData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="https://myproject.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={projectData.githubUrl}
                      onChange={(e) => setProjectData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="https://github.com/user/project"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Technologies Used</CardTitle>
                <CardDescription className="font-serif">
                  Add the technologies and tools used in this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                    onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <Button onClick={addTechnology} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {projectData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {projectData.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <button onClick={() => removeTechnology(tech)} className="ml-1 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Project Image</CardTitle>
                <CardDescription className="font-serif">
                  Upload a screenshot or preview image of your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={projectData.imageUrl}
                  onChange={(url) => setProjectData((prev) => ({ ...prev, imageUrl: url }))}
                  onRemove={() => setProjectData((prev) => ({ ...prev, imageUrl: undefined }))}
                  placeholder="Upload project screenshot"
                  aspectRatio="landscape"
                  maxSize={10}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Additional Files</CardTitle>
                <CardDescription className="font-serif">
                  Upload documentation, designs, or other project files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
                  maxSize={25}
                  multiple={true}
                  onUpload={handleFileUpload}
                  onRemove={removeAttachment}
                  existingFiles={projectData.attachments}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-sans text-lg">Preview</CardTitle>
                <CardDescription className="font-serif">How this project will appear in your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectData.imageUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={projectData.imageUrl || "/placeholder.svg"}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-sans text-lg font-bold mb-2">{projectData.title || "Project Title"}</h3>
                  <p className="font-serif text-sm text-muted-foreground mb-3">
                    {projectData.description || "Project description will appear here..."}
                  </p>
                  {projectData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {projectData.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {(projectData.liveUrl || projectData.githubUrl) && (
                    <div className="flex gap-2">
                      {projectData.liveUrl && (
                        <Badge variant="secondary" className="text-xs">
                          Live Demo
                        </Badge>
                      )}
                      {projectData.githubUrl && (
                        <Badge variant="secondary" className="text-xs">
                          GitHub
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
