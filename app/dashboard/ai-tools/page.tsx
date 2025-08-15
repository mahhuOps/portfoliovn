"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Badge } from "@/components/ui/badge"
import { VoiceInput } from "@/components/ai/voice-input"
import { DocumentExtractor } from "@/components/ai/document-extractor"
import { JobMatcher } from "@/components/ai/job-matcher"
import { ArrowLeft, Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function AIToolsPage() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth/signin")
    }
  }, [user, loading])

  const handleVoiceTranscript = (text: string) => {
    console.log("Voice transcript:", text)
    // In a real app, you might want to populate a form field or show a modal
  }

  const handleDocumentExtracted = (data: any) => {
    console.log("Extracted data:", data)
    // In a real app, you would apply this data to the user's portfolio
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
              <Badge variant="secondary" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Tools
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            AI-Powered Tools
          </h1>
          <p className="font-serif text-muted-foreground">
            Use artificial intelligence to enhance your portfolio creation process
          </p>
        </div>

        <div className="space-y-8">
          {/* Voice Input */}
          <VoiceInput
            onTranscript={handleVoiceTranscript}
            onError={(error) => console.error("Voice error:", error)}
            placeholder="Record your professional summary or project descriptions"
          />

          {/* Document Extraction */}
          <DocumentExtractor
            onExtracted={handleDocumentExtracted}
            onError={(error) => console.error("Extraction error:", error)}
          />

          {/* Job Matching */}
          <JobMatcher />
        </div>
      </div>
    </div>
  )
}
