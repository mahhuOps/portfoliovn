"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import { Brain, CheckCircle, Loader2 } from "lucide-react"

interface ExtractedData {
  personalInfo?: {
    name?: string
    email?: string
    phone?: string
    location?: string
  }
  experience?: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education?: Array<{
    degree: string
    institution: string
    year: string
  }>
  skills?: string[]
}

interface DocumentExtractorProps {
  onExtracted?: (data: ExtractedData) => void
  onError?: (error: string) => void
  className?: string
}

export function DocumentExtractor({ onExtracted, onError, className }: DocumentExtractorProps) {
  const [extracting, setExtracting] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  const handleFileUpload = async (files: File[]) => {
    const file = files[0]
    if (!file) return

    setExtracting(true)
    setExtractedData(null)

    try {
      // Simulate AI document extraction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock extracted data based on file type
      const mockData: ExtractedData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
        },
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            duration: "2021 - Present",
            description: "Led development of scalable web applications using React and Node.js",
          },
          {
            title: "Software Developer",
            company: "StartupXYZ",
            duration: "2019 - 2021",
            description: "Built full-stack applications and improved system performance by 40%",
          },
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of California",
            year: "2019",
          },
        ],
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      }

      setExtractedData(mockData)
      onExtracted?.(mockData)

      // Update uploaded files
      setUploadedFiles([
        {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
      ])
    } catch (error) {
      console.error("Extraction error:", error)
      onError?.("Failed to extract data from document")
    } finally {
      setExtracting(false)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    setExtractedData(null)
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="font-sans flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Document Extraction
          </CardTitle>
          <CardDescription className="font-serif">
            Upload your resume or CV to automatically extract and populate your portfolio information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload
            accept=".pdf,.doc,.docx"
            maxSize={10}
            multiple={false}
            onUpload={handleFileUpload}
            onRemove={removeFile}
            existingFiles={uploadedFiles}
          />

          {extracting && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-6">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <div className="text-center">
                    <p className="font-sans font-medium">Extracting Information...</p>
                    <p className="font-serif text-sm text-muted-foreground">
                      AI is analyzing your document and extracting relevant data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {extractedData && (
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="font-sans text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Extraction Complete
                </CardTitle>
                <CardDescription className="font-serif">
                  Review the extracted information below and apply it to your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {extractedData.personalInfo && (
                  <div>
                    <h4 className="font-sans font-medium mb-2">Personal Information</h4>
                    <div className="bg-background rounded-md p-3 space-y-1">
                      {extractedData.personalInfo.name && (
                        <p className="font-serif text-sm">
                          <strong>Name:</strong> {extractedData.personalInfo.name}
                        </p>
                      )}
                      {extractedData.personalInfo.email && (
                        <p className="font-serif text-sm">
                          <strong>Email:</strong> {extractedData.personalInfo.email}
                        </p>
                      )}
                      {extractedData.personalInfo.phone && (
                        <p className="font-serif text-sm">
                          <strong>Phone:</strong> {extractedData.personalInfo.phone}
                        </p>
                      )}
                      {extractedData.personalInfo.location && (
                        <p className="font-serif text-sm">
                          <strong>Location:</strong> {extractedData.personalInfo.location}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {extractedData.experience && extractedData.experience.length > 0 && (
                  <div>
                    <h4 className="font-sans font-medium mb-2">
                      Experience ({extractedData.experience.length} entries)
                    </h4>
                    <div className="bg-background rounded-md p-3 space-y-2">
                      {extractedData.experience.slice(0, 2).map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary pl-3">
                          <p className="font-serif text-sm font-medium">
                            {exp.title} at {exp.company}
                          </p>
                          <p className="font-serif text-xs text-muted-foreground">{exp.duration}</p>
                        </div>
                      ))}
                      {extractedData.experience.length > 2 && (
                        <p className="font-serif text-xs text-muted-foreground">
                          +{extractedData.experience.length - 2} more entries
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {extractedData.skills && extractedData.skills.length > 0 && (
                  <div>
                    <h4 className="font-sans font-medium mb-2">Skills ({extractedData.skills.length} found)</h4>
                    <div className="bg-background rounded-md p-3">
                      <div className="flex flex-wrap gap-1">
                        {extractedData.skills.slice(0, 8).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {extractedData.skills.length > 8 && (
                          <Badge variant="outline" className="text-xs">
                            +{extractedData.skills.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button onClick={() => onExtracted?.(extractedData)} className="flex-1">
                    Apply to Portfolio
                  </Button>
                  <Button variant="outline" onClick={() => setExtractedData(null)}>
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
