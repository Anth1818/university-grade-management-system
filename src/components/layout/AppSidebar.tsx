import * as React from "react";
import { NavMain } from "@/components/navigation/NavMain";
import { NavSecondary } from "@/components/navigation/NavSecondary";
import { NavUser } from "@/components/navigation/NavUser";
import { dataSidebarAnalyst } from "@/data/sidebarAnalystData";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h2
          className={`text-xl font-bold text-center text-gray-800 dark:text-white pt-2`}
        >
          {open ? "Universidad Autónoma Ruiz" : "U A R"}
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataSidebarAnalyst.navMain} />
        <NavSecondary items={dataSidebarAnalyst.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <div className="flex justify-center">
          <span className="text-xs">
            {open ? `Ultima conexión: 27 de junio de 2025` : ""}
          </span>
        </div>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <NavUser user={dataSidebarAnalyst.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
