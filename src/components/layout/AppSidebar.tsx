import * as React from "react";
import { NavMain } from "@/components/navigation/NavMain";
import { NavSecondary } from "@/components/navigation/NavSecondary";
import { NavUser } from "@/components/navigation/NavUser";
import { dataSidebarAnalyst } from "@/data/sidebarAnalystData";
import { dataSidebarStudent } from "@/data/sidebarStudentData";
import { dataSidebarTeacher } from "@/data/sidebarTeacherData";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    id: string;
    role: 'student' | 'teacher' | 'analyst';
    name: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { open } = useSidebar();

  const getSidebarData = () => {
    switch (user?.role) {
      case 'student':
        return dataSidebarStudent;
      case 'teacher':
        return dataSidebarTeacher;
      case 'analyst':
        return dataSidebarAnalyst;
      default:
        return dataSidebarStudent; // Fallback
    }
  };

  const sidebarData = getSidebarData();
  const displayUser = {
    name: user?.name || "Usuario",
    email: user?.role || "",
    avatar: "/avatars/shadcn.jpg",
  };

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
        <NavMain items={sidebarData.navMain} />
        <NavSecondary items={sidebarData.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <div className="flex justify-center">
          <span className="text-xs">
            {open ? `Ultima conexión: 21 de marzo de 2026` : ""}
          </span>
        </div>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <NavUser user={displayUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
