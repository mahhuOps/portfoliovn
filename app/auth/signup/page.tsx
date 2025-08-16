"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user])

  const validateForm = () => {
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Vui lòng nhập họ và tên của bạn.",
      })
      return false
    }

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Vui lòng nhập email của bạn.",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Vui lòng nhập email hợp lệ.",
      })
      return false
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Vui lòng nhập mật khẩu của bạn.",
      })
      return false
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Mật khẩu phải có ít nhất 6 ký tự.",
      })
      return false
    }

    if (confirmPassword && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: "Mật khẩu xác nhận không khớp.",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, name)
      toast({
        title: "Đăng ký thành công!",
        description: "Tài khoản của bạn đã được tạo. Chào mừng bạn đến với Portfolio Manager!",
      })
      router.push("/dashboard")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định"
      let displayMessage = "Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại."

      if (errorMessage.includes("Email already exists")) {
        displayMessage = "Email này đã được sử dụng. Vui lòng sử dụng email khác hoặc đăng nhập."
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        displayMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn."
      }

      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: displayMessage,
      })
      console.error("Sign up error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-2xl">Portfolio Manager</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-sans text-2xl">Create your account</CardTitle>
            <CardDescription className="font-serif">
              Join thousands of professionals building amazing portfolios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 characters)"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password (Optional)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
