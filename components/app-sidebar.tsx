"use client"

import { BarChart3, Users, Calendar, Settings, User, Brain, FileText, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Clients",
      icon: Users,
      href: "/clients",
    },
    {
      title: "Schedule",
      icon: Calendar,
      href: "/schedule",
    },
    {
      title: "Session Reports",
      icon: FileText,
      href: "/reports",
    },
    {
      title: "AI Insights",
      icon: Brain,
      href: "/insights",
    },
    {
      title: "Therapist Profile",
      icon: User,
      href: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SpeechPath Pro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <User className="h-8 w-8 rounded-full bg-primary/10 p-1 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.user_metadata?.full_name || "Therapist"}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
