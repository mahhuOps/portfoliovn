import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Download, Calendar, Building } from "lucide-react"
import Image from "next/image"

// Mock portfolio data - in real app, this would be fetched based on subdomain
const portfolioData = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "Passionate developer with 5+ years of experience building scalable web applications. I love creating elegant solutions to complex problems and am always eager to learn new technologies.",
  location: "San Francisco, CA",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  avatar: "/professional-headshot.png",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Tailwind CSS",
  ],
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Lead development of customer-facing web applications serving 100k+ users.",
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications using React and Node.js.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California",
      period: "2016 - 2020",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/ecommerce-website-homepage.png",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      image: "/task-management-app-interface.png",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/taskapp",
    },
  ],
}

export default function PublicPortfolio({ params }: { params: { subdomain: string } }) {
  const { subdomain } = params

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-sans font-semibold text-xl">{portfolioData.name}</h1>
              <Badge variant="outline">{portfolioData.title}</Badge>
            </div>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={portfolioData.avatar || "/placeholder.svg"}
                      alt={portfolioData.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="font-sans text-xl font-bold mb-1">{portfolioData.name}</h2>
                  <p className="font-serif text-muted-foreground">{portfolioData.title}</p>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{portfolioData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${portfolioData.email}`} className="hover:text-primary">
                      {portfolioData.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{portfolioData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={portfolioData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      Portfolio Website
                    </a>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <a
                    href={portfolioData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:text-primary"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:text-primary"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground leading-relaxed">{portfolioData.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans font-semibold">{exp.title}</h3>
                      <p className="font-serif text-primary mb-1">{exp.company}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <p className="font-serif text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Featured Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {portfolioData.projects.map((project, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="font-sans text-lg">{project.title}</CardTitle>
                        <CardDescription className="font-serif">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans font-semibold">{edu.degree}</h3>
                      <p className="font-serif text-primary mb-1">{edu.school}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
