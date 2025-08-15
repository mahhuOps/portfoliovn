import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
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

export default app
