"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Globe } from "lucide-react"
import Link from "next/link"

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string
    logo: React.ElementType
    plan: string
  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-orange-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <team.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{team.name}</span>
            <span className="truncate text-xs">{team.plan}</span>
          </div>
          <Link
            href={'/'}
            title="Browse Website"
            className="flex items-center justify-center rounded-2xl h-8 w-8 text-muted-foreground hover:bg-neutral-600 cursor-pointer"
          >
            <Globe className="h-5 w-5" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
