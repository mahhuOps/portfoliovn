"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceInputProps {
  onTranscript?: (text: string) => void
  onError?: (error: string) => void
  className?: string
  placeholder?: string
}

export function VoiceInput({
  onTranscript,
  onError,
  className,
  placeholder = "Click to start recording",
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript)
            onTranscript?.(finalTranscript)
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          onError?.(event.error)
          setIsRecording(false)
        }

        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }
  }, [onTranscript, onError])

  const startRecording = () => {
    if (recognitionRef.current && isSupported) {
      setTranscript("")
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const clearTranscript = () => {
    setTranscript("")
  }

  if (!isSupported) {
    return (
      <Card className={cn("border-dashed", className)}>
        <CardContent className="py-6 text-center">
          <MicOff className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="font-serif text-sm text-muted-foreground">Voice input is not supported in your browser</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 transition-colors",
          isRecording ? "border-primary bg-primary/5" : "border-dashed border-muted-foreground/25",
        )}
      >
        <CardContent className="py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                isRecording ? "bg-primary text-primary-foreground animate-pulse" : "bg-muted",
              )}
            >
              {isRecording ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8 text-muted-foreground" />}
            </div>

            <div>
              <h3 className="font-sans font-semibold mb-2">{isRecording ? "Listening..." : "Voice Input"}</h3>
              <p className="font-serif text-sm text-muted-foreground">
                {isRecording ? "Speak clearly into your microphone" : placeholder}
              </p>
            </div>

            <div className="flex gap-2">
              {!isRecording ? (
                <Button onClick={startRecording} className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Stop Recording
                </Button>
              )}
            </div>

            {isRecording && (
              <Badge variant="secondary" className="animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Recording
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {transcript && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-sans font-medium text-sm">Transcript</h4>
              <Button variant="ghost" size="sm" onClick={clearTranscript}>
                Clear
              </Button>
            </div>
            <p className="font-serif text-sm bg-muted p-3 rounded-md">{transcript}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
