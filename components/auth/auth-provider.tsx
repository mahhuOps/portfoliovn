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
import { auth, db, checkFirebaseConnection, isFirebaseOnline } from "@/lib/firebase"

interface UserProfile {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: Date
  portfolioData: {
    personalInfo: {}
    projects: []
    experience: []
    education: []
    skills: []
  }
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
  const [hasAttemptedFirestore, setHasAttemptedFirestore] = useState(false)

  useEffect(() => {
    if (!auth) {
      console.log("[v0] Firebase auth not initialized - using fallback auth")
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const basicUserData = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || "",
          role: "user" as const,
          createdAt: new Date(),
          portfolioData: {
            personalInfo: {},
            projects: [],
            experience: [],
            education: [],
            skills: [],
          },
        }

        if (!db || hasAttemptedFirestore) {
          if (!hasAttemptedFirestore) {
            console.log("[v0] Firestore not initialized - using basic user data")
          }
          setUser(basicUserData)
          setLoading(false)
          return
        }

        setHasAttemptedFirestore(true)
        const isConnected = await checkFirebaseConnection()
        if (!isConnected) {
          console.log("[v0] Working offline - using basic user data")
          setUser(basicUserData)
          setLoading(false)
          return
        }

        try {
          const userDoc = await Promise.race([
            getDoc(doc(db, "users", firebaseUser.uid)),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
          ])

          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUser({
              ...basicUserData,
              name: userData.name || firebaseUser.displayName || "",
              role: userData.role || "user",
              createdAt: userData.createdAt?.toDate() || new Date(),
            })
          } else {
            setUser(basicUserData)
          }
        } catch (error: any) {
          if (error.message === "timeout") {
            console.log("[v0] Firestore connection timeout - using basic user data")
          }
          setUser(basicUserData)
        }
      } else {
        setUser(null)
        setHasAttemptedFirestore(false) // Reset on logout
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [hasAttemptedFirestore])

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
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update display name
      await updateProfile(firebaseUser, { displayName: name })

      if (db && isFirebaseOnline()) {
        try {
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

          // Add timeout to prevent hanging
          await Promise.race([
            setDoc(doc(db, "users", firebaseUser.uid), userProfile),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), 3000)),
          ])

          console.log("[v0] User profile saved to Firestore successfully")
        } catch (error) {
          console.log(
            "[v0] Could not save user profile to Firestore (timeout/offline), user account created successfully",
          )
          // Don't throw error here - user account is already created in Firebase Auth
        }
      } else {
        console.log("[v0] Firestore offline - user account created in Firebase Auth only")
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
