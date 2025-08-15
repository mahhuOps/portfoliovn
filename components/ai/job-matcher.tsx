"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Brain, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface MatchResult {
  overallScore: number
  strengths: string[]
  gaps: string[]
  recommendations: string[]
  matchedSkills: string[]
  missingSkills: string[]
}

interface JobMatcherProps {
  className?: string
}

export function JobMatcher({ className }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) return

    setAnalyzing(true)
    setMatchResult(null)

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis result
      const mockResult: MatchResult = {
        overallScore: 78,
        strengths: [
          "Strong React and JavaScript experience",
          "Full-stack development background",
          "Experience with modern frameworks",
          "Good understanding of web technologies",
        ],
        gaps: [
          "Limited experience with specific cloud platforms mentioned",
          "No mention of DevOps practices",
          "Missing experience with the company's tech stack",
        ],
        recommendations: [
          "Highlight your React projects more prominently",
          "Consider adding cloud platform certifications",
          "Emphasize your problem-solving abilities",
          "Add examples of scalable applications you've built",
        ],
        matchedSkills: ["React", "JavaScript", "Node.js", "HTML/CSS", "Git"],
        missingSkills: ["AWS", "Docker", "Kubernetes", "Python", "GraphQL"],
      }

      setMatchResult(mockResult)
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-950"
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-950"
    return "bg-red-100 dark:bg-red-950"
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="font-sans flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI Job Matching
          </CardTitle>
          <CardDescription className="font-serif">
            Paste a job description to analyze how well your portfolio matches the requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="font-sans text-sm font-medium">Job Description</label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={6}
              className="font-serif"
            />
          </div>

          <Button onClick={analyzeMatch} disabled={!jobDescription.trim() || analyzing} className="w-full">
            {analyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze Job Match
              </>
            )}
          </Button>

          {analyzing && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-6">
                <div className="text-center space-y-2">
                  <Brain className="w-8 h-8 text-primary mx-auto animate-pulse" />
                  <p className="font-sans font-medium">Analyzing Job Requirements...</p>
                  <p className="font-serif text-sm text-muted-foreground">
                    AI is comparing your portfolio with the job description
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {matchResult && (
            <div className="space-y-4">
              {/* Overall Score */}
              <Card className={getScoreBg(matchResult.overallScore)}>
                <CardContent className="py-6">
                  <div className="text-center space-y-3">
                    <div className={`text-4xl font-bold ${getScoreColor(matchResult.overallScore)}`}>
                      {matchResult.overallScore}%
                    </div>
                    <p className="font-sans font-medium">Portfolio Match Score</p>
                    <Progress value={matchResult.overallScore} className="w-full max-w-xs mx-auto" />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-sans text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Matched Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {matchResult.matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-sans text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      Missing Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {matchResult.missingSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Strengths */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {matchResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-serif text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Gaps */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {matchResult.gaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="font-serif text-sm">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-sans text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {matchResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-primary rounded-full mt-0.5 flex-shrink-0"></div>
                        <span className="font-serif text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
