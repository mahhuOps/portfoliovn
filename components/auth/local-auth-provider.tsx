"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signInLocal: (email: string, password: string) => Promise<void>
  signUpLocal: (email: string, password: string, name: string) => Promise<void>
  signOutLocal: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem("portfolio-current-user")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    setLoading(false)
  }, [])

  const signInLocal = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("portfolio-users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser && existingUser.password === password) {
      const userToLogin = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      }
      localStorage.setItem("portfolio-current-user", JSON.stringify(userToLogin))
      setUser(userToLogin)
    } else if (email === "admin@example.com" && password === "admin") {
      // Demo admin account
      const adminUser = { id: "admin", email, name: "Admin", role: "admin" as const }
      localStorage.setItem("portfolio-current-user", JSON.stringify(adminUser))
      setUser(adminUser)
    } else if (email === "demo@example.com" && password === "demo") {
      // Demo user account
      const demoUser = { id: "demo", email, name: "Demo User", role: "user" as const }
      localStorage.setItem("portfolio-current-user", JSON.stringify(demoUser))
      setUser(demoUser)
    } else {
      throw new Error("Invalid email or password")
    }
  }

  const signUpLocal = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("portfolio-users") || "[]")

    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === email)
    if (existingUser) {
      throw new Error("Email already exists")
    }

    // Create new user with unique ID
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In real app, this would be hashed
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    // Add to users list
    users.push(newUser)
    localStorage.setItem("portfolio-users", JSON.stringify(users))

    // Set as current user
    const userToLogin = { id: newUser.id, email, name, role: newUser.role }
    localStorage.setItem("portfolio-current-user", JSON.stringify(userToLogin))
    setUser(userToLogin)
  }

  const signOutLocal = async () => {
    localStorage.removeItem("portfolio-current-user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, signInLocal, signUpLocal, signOutLocal }}>{children}</AuthContext.Provider>
}

export function useAuthLocal() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
