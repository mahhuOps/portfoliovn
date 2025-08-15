"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Camera, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange?: (url: string) => void
  onRemove?: () => void
  className?: string
  placeholder?: string
  aspectRatio?: "square" | "portrait" | "landscape"
  maxSize?: number // in MB
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  placeholder = "Upload image",
  aspectRatio = "square",
  maxSize = 5,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
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
      if (files.length > 0) {
        handleFile(files[0])
      }
    },
    [maxSize, onChange],
  )

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      alert(`Image is too large. Maximum size is ${maxSize}MB.`)
      return
    }

    setUploading(true)

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange?.(result)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer overflow-hidden",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          uploading && "pointer-events-none opacity-50",
          aspectRatioClasses[aspectRatio],
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-0 h-full">
          {value ? (
            <div className="relative h-full group">
              <Image src={value || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="image-replace"
                  />
                  <label htmlFor="image-replace">
                    <Button variant="secondary" size="sm" className="cursor-pointer">
                      <Camera className="w-4 h-4 mr-2" />
                      Replace
                    </Button>
                  </label>
                  <Button variant="destructive" size="sm" onClick={onRemove}>
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {placeholder.includes("profile") || placeholder.includes("avatar") ? (
                  <User className="w-6 h-6 text-primary" />
                ) : (
                  <Upload className="w-6 h-6 text-primary" />
                )}
              </div>
              <h3 className="font-sans font-semibold mb-2">{dragActive ? "Drop image here" : placeholder}</h3>
              <p className="font-serif text-sm text-muted-foreground mb-4">
                Drag and drop an image, or click to browse
              </p>
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="image-upload" />
              <label htmlFor="image-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent">
                  Choose Image
                </Button>
              </label>
              <p className="font-serif text-xs text-muted-foreground mt-2">Maximum file size: {maxSize}MB</p>
            </div>
          )}
        </CardContent>
      </Card>

      {value && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            <Camera className="w-3 h-3 mr-1" />
            Image uploaded
          </Badge>
        </div>
      )}
    </div>
  )
}
