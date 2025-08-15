"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sparkles, User, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập",
        description: "Vui lòng nhập email của bạn.",
      })
      return
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập",
        description: "Vui lòng nhập mật khẩu của bạn.",
      })
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn quay trở lại.",
      })
      router.push("/dashboard")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định"
      let displayMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại."

      if (errorMessage.includes("Invalid email or password")) {
        displayMessage = "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại."
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        displayMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn."
      }

      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập",
        description: displayMessage,
      })
      console.error("Sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoType: "user" | "admin") => {
    setLoading(true)
    try {
      const demoEmail = demoType === "admin" ? "admin@example.com" : "demo@example.com"
      const demoPassword = demoType === "admin" ? "admin" : "demo"
      await signIn(demoEmail, demoPassword)
      toast({
        title: "Đăng nhập demo thành công!",
        description: `Chào mừng bạn với tài khoản ${demoType === "admin" ? "quản trị viên" : "người dùng"} demo.`,
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập demo",
        description: "Không thể đăng nhập với tài khoản demo. Vui lòng thử lại.",
      })
      console.error("Demo login error:", error)
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
            <CardTitle className="font-sans text-2xl">Welcome back</CardTitle>
            <CardDescription className="font-serif">
              Sign in to your account to continue building your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <Button onClick={() => handleDemoLogin("user")} variant="outline" className="w-full" disabled={loading}>
                <User className="w-4 h-4 mr-2" />
                Demo as User
              </Button>
              <Button onClick={() => handleDemoLogin("admin")} variant="outline" className="w-full" disabled={loading}>
                <Shield className="w-4 h-4 mr-2" />
                Demo as Admin
              </Button>
            </div>

            <Separator className="my-6" />

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
