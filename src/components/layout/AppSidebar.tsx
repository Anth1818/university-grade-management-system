import * as React from "react"
import { NavMain } from "@/components/navigation/NavMain"
import { NavSecondary } from "@/components/navigation/NavSecondary"
import { NavUser } from "@/components/navigation/NavUser"
import { dataSidebar } from "@/data/sidebarData"
import { ThemeToggle } from "@/components/ui/theme-toggle"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src="../../public/favicon.svg" alt="logo" className="w-25 m-auto rounded-xl" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataSidebar.navMain} />
        <NavSecondary items={dataSidebar.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <NavUser user={dataSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
