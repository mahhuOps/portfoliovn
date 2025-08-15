"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, X, File, ImageIcon, Video, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  onUpload?: (files: File[]) => void
  onRemove?: (index: number) => void
  existingFiles?: UploadedFile[]
  className?: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadProgress?: number
}

export function FileUpload({
  accept = "image/*,video/*,.pdf,.doc,.docx",
  maxSize = 10,
  multiple = false,
  onUpload,
  onRemove,
  existingFiles = [],
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />
    if (type.startsWith("video/")) return <Video className="w-5 h-5" />
    if (type.includes("pdf") || type.includes("document")) return <FileText className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [maxSize, multiple, onUpload],
  )

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`)
        return false
      }
      return true
    })

    if (!multiple && validFiles.length > 1) {
      alert("Only one file is allowed.")
      return
    }

    if (validFiles.length > 0) {
      setUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setUploading(false)
            onUpload?.(validFiles)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          uploading && "pointer-events-none opacity-50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-sans font-semibold mb-2">{dragActive ? "Drop files here" : "Upload files"}</h3>
          <p className="font-serif text-sm text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer bg-transparent">
              Choose Files
            </Button>
          </label>
          <p className="font-serif text-xs text-muted-foreground mt-2">Maximum file size: {maxSize}MB</p>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-primary animate-pulse" />
              <div className="flex-1">
                <p className="font-sans text-sm font-medium mb-2">Uploading files...</p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
              <span className="font-serif text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-sans font-medium text-sm">Uploaded Files</h4>
          {existingFiles.map((file, index) => (
            <Card key={file.id}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-serif text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      <Badge variant="secondary" className="text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove?.(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
