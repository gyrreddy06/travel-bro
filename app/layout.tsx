import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavbar from "@/components/bottom-navbar"
import TopNavbar from "@/components/top-navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelBuddy - Never Travel Alone!",
  description: "Find travel companions, chat, play games, and book tickets all in one app.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="app-container">
            <TopNavbar />
            <main className="app-screen">{children}</main>
            <BottomNavbar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
