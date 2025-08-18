"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, ExternalLink, Github, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  featured: boolean
}

export default function ProjectsPage() {
  const { user, loading } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }

    // Load existing projects from localStorage
    const saved = localStorage.getItem("portfolio-projects")
    if (saved) {
      setProjects(JSON.parse(saved))
    } else {
      // Mock data for demonstration
      setProjects([
        {
          id: "1",
          title: "E-commerce Platform",
          description:
            "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/user/project",
          featured: true,
        },
        {
          id: "2",
          title: "Task Management App",
          description:
            "A collaborative task management application built with Next.js and Firebase. Real-time updates and team collaboration features.",
          technologies: ["Next.js", "Firebase", "Tailwind CSS"],
          liveUrl: "https://tasks.example.com",
          githubUrl: "https://github.com/user/tasks",
          featured: false,
        },
        {
          id: "3",
          title: "Weather Dashboard",
          description:
            "A responsive weather dashboard with location-based forecasts and interactive charts using React and weather APIs.",
          technologies: ["React", "Chart.js", "Weather API"],
          githubUrl: "https://github.com/user/weather",
          featured: false,
        },
      ])
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
                <span className="font-sans font-semibold">Back to Dashboard</span>
              </Link>
              <Badge variant="secondary">Projects</Badge>
            </div>
            <Link href="/dashboard/projects/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold mb-2">Projects</h1>
          <p className="font-serif text-muted-foreground">Showcase your best work and technical achievements</p>
        </div>

        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">No projects yet</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Start building your portfolio by adding your first project
              </p>
              <Link href="/dashboard/projects/add">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="font-sans text-lg">{project.title}</CardTitle>
                        {project.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="font-serif line-clamp-3">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
