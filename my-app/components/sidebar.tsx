"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BarChart3, ChevronLeft, ChevronRight, Home, LogOut, User, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Activity",
    href: "/activity",
    icon: Activity,
  },
  {
    title: "Diet Plan",
    href: "/diet",
    icon: Utensils,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { signOut } = useClerk()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background p-4 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FitTrack</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === item.href && "bg-accent text-accent-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}

        {/* Authentication-aware Logout button */}
        <SignedIn>
          <button
            onClick={handleSignOut}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </SignedIn>

        <SignedOut>
          <div className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
          )}>
            <LogOut className="h-5 w-5" />
            {!collapsed && (
              <SignInButton mode="modal">
                <span className="cursor-pointer">Sign In</span>
              </SignInButton>
            )}
          </div>
        </SignedOut>
      </div>
    </div>
  )
}