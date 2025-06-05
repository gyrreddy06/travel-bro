"use client"

import { Home, Search, MessageSquare, Gamepad2, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Find",
    href: "/find-travelers",
    icon: Search,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Games",
    href: "/games",
    icon: Gamepad2,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export default function BottomNavbar() {
  const pathname = usePathname()

  // Don't show navbar on splash, onboarding, or auth screens
  if (["/splash", "/onboarding", "/auth"].some((path) => pathname.startsWith(path))) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t max-w-[430px] mx-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center text-xs transition-all",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-10 h-10 mb-1 transition-all",
                isActive ? "bg-primary/10" : "",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
            </div>
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
