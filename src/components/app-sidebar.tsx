import * as React from "react"
import {
  BookOpenText,
  Download,
  FileCheck,
  CalendarCheck,
  FileStack,
  LibraryBig,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"

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
    name: "Anthony Ruiz",
    email: "correo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Semestre",
      url: "#",
      icon: BookOpenText,
      items: [
        {
          title: "Ver notas",
          url: "grades",
        },
        {
          title: "Inscribir",
          url: "signOn",
        },
      ],
    },
    {
      title: "Descargar",
      url: "#",
      icon: Download,
      items: [
        {
          title: "Carnet estudiantil",
          url: "#",
        },
        {
          title: "Constancia de estudio",
          url: "#",
        },
        {
          title: "Constancia de inscripción",
          url: "#",
        },
      ],
    },
    {
      title: "Solicitud",
      url: "#",
      icon: FileCheck,
      items: [
        {
          title: "Acto de grado",
          url: "#",
        },
        {
          title: "Notas certificadas",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      name: "Horarios",
      url: "schedules",
      icon: CalendarCheck,
    },
    {
      name: "Historial académico",
      url: "#",
      icon: FileStack,
    },
    {
      name: "Ver malla curricular",
      url: "#",
      icon: LibraryBig,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src="../../public/favicon.svg" alt="logo" className="w-25 m-auto rounded-xl" />
        {/* <TeamSwitcher /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
