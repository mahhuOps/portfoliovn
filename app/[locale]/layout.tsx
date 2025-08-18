import { FirebaseAuthProvider } from "@/components/auth/auth-provider";
import { AuthProvider } from "@/components/auth/local-auth-provider";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Manrope } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import type React from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Portfolio Manager - Create Professional Portfolios",
  description: "Build and manage your professional portfolio with AI-powered features, custom domains, and CV export.",
  generator: "Portfolio Manager"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <FirebaseAuthProvider>
                <AuthProvider>{children}</AuthProvider>
              </FirebaseAuthProvider>
            </LanguageProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
