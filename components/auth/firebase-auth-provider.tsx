"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserProfile {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: Date
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      console.log("[v0] Firebase auth not initialized - using fallback auth")
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (!db) {
          console.log("[v0] Firestore not initialized - using basic user data")
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || "",
            role: "user",
            createdAt: new Date(),
          })
          setLoading(false)
          return
        }

        // Get user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: userData.name || firebaseUser.displayName || "",
              role: userData.role || "user",
              createdAt: userData.createdAt?.toDate() || new Date(),
            })
          }
        } catch (error) {
          console.error("[v0] Error fetching user data:", error)
          // Fallback to basic user data
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || "",
            role: "user",
            createdAt: new Date(),
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured. Please check your Firebase setup.")
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured. Please check your Firebase setup.")
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("portfolio-users")
        localStorage.removeItem("portfolio-current-user")
      }

      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update display name
      await updateProfile(firebaseUser, { displayName: name })

      if (db) {
        // Create user profile in Firestore
        const userProfile = {
          name,
          email,
          role: email === "admin@example.com" ? "admin" : "user",
          createdAt: new Date(),
          portfolioData: {
            personalInfo: {},
            projects: [],
            experience: [],
            education: [],
            skills: [],
          },
        }

        await setDoc(doc(db, "users", firebaseUser.uid), userProfile)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logout = async () => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured.")
    }

    try {
      await signOut(auth)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider")
  }
  return context
}
