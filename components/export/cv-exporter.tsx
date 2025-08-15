"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Loader2, FileType, File } from "lucide-react"

interface CVTemplate {
  id: string
  name: string
  description: string
  preview: string
  style: "modern" | "classic" | "minimal" | "creative"
}

interface CVExporterProps {
  portfolioData?: any
  className?: string
}

const templates: CVTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean design with accent colors and modern typography",
    preview: "/modern-professional-resume.png",
    style: "modern",
  },
  {
    id: "classic",
    name: "Classic Traditional",
    description: "Traditional format preferred by conservative industries",
    preview: "/classic-resume-template.png",
    style: "classic",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Minimalist design focusing on content over decoration",
    preview: "/minimal-clean-resume.png",
    style: "minimal",
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold design for creative professionals and designers",
    preview: "/creative-designer-resume.png",
    style: "creative",
  },
]

export function CVExporter({ portfolioData, className }: CVExporterProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")
  const [exportFormat, setExportFormat] = useState<"pdf" | "docx">("pdf")
  const [exporting, setExporting] = useState(false)
  const [previewing, setPreviewing] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would generate the actual document
      const filename = `cv-${selectedTemplate}-${Date.now()}.${exportFormat}`

      // Create a mock download
      const element = document.createElement("a")
      element.href = "#"
      element.download = filename
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      console.log(`Exported ${exportFormat.toUpperCase()} with template: ${selectedTemplate}`)
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setExporting(false)
    }
  }

  const handlePreview = async () => {
    setPreviewing(true)
    try {
      // Simulate preview generation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would open a preview modal or new tab
      console.log(`Previewing template: ${selectedTemplate}`)
    } catch (error) {
      console.error("Preview error:", error)
    } finally {
      setPreviewing(false)
    }
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="font-sans flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            CV Export
          </CardTitle>
          <CardDescription className="font-serif">
            Generate professional PDF and Word documents from your portfolio data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <div>
              <label className="font-sans text-sm font-medium mb-2 block">Choose Template</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-primary border-primary"
                        : "border-muted hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-3">
                      <div className="aspect-[3/4] bg-muted rounded-md mb-3 overflow-hidden">
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-sans text-sm font-medium mb-1">{template.name}</h4>
                      <p className="font-serif text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs capitalize">
                        {template.style}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium">Export Format</label>
              <Select value={exportFormat} onValueChange={(value: "pdf" | "docx") => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileType className="w-4 h-4" />
                      PDF Document
                    </div>
                  </SelectItem>
                  <SelectItem value="docx">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      Word Document (.docx)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-sm font-medium">Template Style</label>
              <div className="p-3 bg-muted rounded-md">
                <p className="font-serif text-sm">{selectedTemplateData?.name}</p>
                <p className="font-serif text-xs text-muted-foreground mt-1">{selectedTemplateData?.description}</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {selectedTemplateData && (
            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="font-sans text-lg">Template Preview</CardTitle>
                <CardDescription className="font-serif">
                  Preview how your CV will look with the selected template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="aspect-[3/4] bg-background rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden">
                      <img
                        src={selectedTemplateData.preview || "/placeholder.svg"}
                        alt={`${selectedTemplateData.name} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-sans font-semibold mb-2">What's Included:</h4>
                      <ul className="font-serif text-sm space-y-1 text-muted-foreground">
                        <li>• Personal information and contact details</li>
                        <li>• Professional summary</li>
                        <li>• Work experience with descriptions</li>
                        <li>• Education background</li>
                        <li>• Skills and competencies</li>
                        <li>• Project highlights</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold mb-2">Template Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          ATS-Friendly
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Professional
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Customizable
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Print-Ready
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handlePreview} variant="outline" disabled={previewing} className="flex-1 bg-transparent">
              {previewing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Preview...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview CV
                </>
              )}
            </Button>
            <Button onClick={handleExport} disabled={exporting} className="flex-1">
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting {exportFormat.toUpperCase()}...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export {exportFormat.toUpperCase()}
                </>
              )}
            </Button>
          </div>

          {/* Export Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-sans font-medium text-sm mb-1">Export Information</h4>
                  <p className="font-serif text-sm text-muted-foreground">
                    Your CV will be generated using your current portfolio data. Make sure all sections are complete for
                    the best results. The exported document will be optimized for both digital viewing and printing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
