"use client"

import * as React from "react"
import {
  BookA,
  Clapperboard,
  Component,
  GalleryVerticalEnd,
  Globe,
  Group,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/admin/management/nav-main"
import { NavSettings } from "@/components/admin/management/nav-settings"
import { NavUser } from "@/components/admin/management/nav-user"
import { TeamSwitcher } from "@/components/admin/management/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  team: {
      name: "CineTorrento",
      logo: GalleryVerticalEnd,
      plan: "",
    },
    dashboard: [
      {
      name: "Dashboard",
      url: "/manage/dashboard",
      icon: LayoutDashboard,
    },
    ],
  navMain: [
    {
      title: "Contents",
      url: "#",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Content List",
          url: "/manage/content",
        },
        {
          title: "Featured Content",
          url: "/manage/featured-content",
        },
      ]
    },
  ],
  settings: [
    {
      name: "Category",
      url: "/manage/category",
      icon: Component,
    },
    {
      name: "Genre",
      url: "/manage/genre",
      icon: Group,
    },
    {
      name: "Social Links",
      url: "/manage/social-link",
      icon: Globe,
    },
    {
      name: "Ad Management",
      url: "/manage/ad",
      icon: BookA,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavSettings groupName="Dashboards"  settings={data.dashboard} />
        <NavMain items={data.navMain} />
        <NavSettings groupName="Settings" settings={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
