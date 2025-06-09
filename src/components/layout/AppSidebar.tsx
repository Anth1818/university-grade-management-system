import * as React from "react"
import { NavMain } from "@/components/navigation/NavMain"
import { NavSecondary } from "@/components/navigation/NavSecondary"
import { NavUser } from "@/components/navigation/NavUser"
import { dataSidebar } from "@/data/dataSidebar"

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
      <SidebarFooter>
        <NavUser user={dataSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
