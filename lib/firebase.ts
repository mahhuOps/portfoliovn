import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableNetwork } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAdZsqT_7nlD0xDf7OIgumleYYL80U3aBs",
  authDomain: "portfoliovn-87607.firebaseapp.com",
  projectId: "portfoliovn-87607",
  storageBucket: "portfoliovn-87607.firebasestorage.app",
  messagingSenderId: "226734085615",
  appId: "1:226734085615:web:ec905d4e9452cfb743121a",
  measurementId: "G-M86TMC4P2T",
}

// Initialize Firebase only in browser environment
const app =
  typeof window !== "undefined" && getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] || null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null

let isOnline = true
let connectionRetries = 0
const maxRetries = 3

export const checkFirebaseConnection = async (): Promise<boolean> => {
  if (!db) return false

  try {
    await enableNetwork(db)
    isOnline = true
    connectionRetries = 0
    return true
  } catch (error) {
    console.log("[v0] Firebase connection check failed, working offline")
    isOnline = false
    return false
  }
}

export const isFirebaseOnline = () => isOnline

if (typeof window !== "undefined" && db) {
  checkFirebaseConnection()
}

export default app
