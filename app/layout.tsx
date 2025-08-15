import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { FirebaseAuthProvider } from "@/components/auth/firebase-auth-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Portfolio Manager - Create Professional Portfolios",
  description: "Build and manage your professional portfolio with AI-powered features, custom domains, and CV export.",
  generator: "Portfolio Manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${geist.style.fontFamily};
  --font-geist: ${geist.variable};
  --font-manrope: ${manrope.variable};
}
        `}</style>
      </head>
      <body className={`${geist.variable} ${manrope.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
