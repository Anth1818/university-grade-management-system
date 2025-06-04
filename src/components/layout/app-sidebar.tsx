import * as React from "react"
import {
  BookOpenText,
  Download,
  FileCheck,
  CalendarCheck,
  FileStack,
  LibraryBig,
  Home,
} from "lucide-react"

import { NavMain } from "@/components/navegation/nav-main"
import { NavSecondary } from "@/components/navegation/nav-secondary"
import { NavUser } from "@/components/navegation/nav-user"

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
          url: "/students/grades",
        },
        {
          title: "Inscribir",
          url: "/students/signOn",
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
          url: "/students/studentCard",
        },
        {
          title: "Constancia de estudio",
          url: "/students/studyCertificate",
        },
        {
          title: "Constancia de inscripción",
          url: "/students/registrationCertificate",
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
          url: "/students/degreeAct",
        },
        {
          title: "Notas certificadas",
          url: "/students/certifiedNotes",
        },
      ],
    },
  ],
  navSecondary: [
    {
      name: "Inicio",
      url: "/home",
      icon: Home,
    },
    {
      name: "Horarios",
      url: "/students/schedules",
      icon: CalendarCheck,
    },
    {
      name: "Historial académico",
      url: "/students/academicHistory",
      icon: FileStack,
    },
    {
      name: "Ver malla curricular",
      url: "/students/curriculumMesh",
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
