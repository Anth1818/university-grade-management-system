import * as React from "react";
import { NavMain } from "@/components/navigation/NavMain";
import { NavSecondary } from "@/components/navigation/NavSecondary";
import { NavUser } from "@/components/navigation/NavUser";
import { dataSidebarTeacher } from "@/data/sidebarTeacherData";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img
          src="../../public/favicon.svg"
          alt="logo"
          className="w-25 m-auto rounded-xl"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataSidebarTeacher.navMain} />
        <NavSecondary items={dataSidebarTeacher.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <div className="flex justify-start">
          <span className="text-xs">Ultima conexión: {new Date().toLocaleString()}</span>
        </div>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <NavUser user={dataSidebarTeacher.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
