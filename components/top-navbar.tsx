"use client"

import { Bell, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function TopNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show navbar on splash, onboarding, or auth screens
  if (["/splash", "/onboarding", "/auth"].some((path) => pathname.startsWith(path))) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
              TB
            </div>
            <span className="font-bold text-xl">TravelBuddy</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => router.push("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
