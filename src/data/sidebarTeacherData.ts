import {
    Download,
    Users,
    CalendarCheck,
    Home,
  } from "lucide-react"

export const dataSidebarTeacher = {
    user: {
      name: "Anthony Ruiz",
      email: "correo@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Secciones",
        url: "#",
        icon: Users,
        items: [
          {
            title: "Ver secciones",
            url: "/teachers/sections",
          },
        ],
      },
      {
        title: "Descargar",
        url: "#",
        icon: Download,
        items: [
          {
            title: "Carnet de trabajo",
            url: "/teachers/teacherCard",
          },
          {
            title: "Constancia de trabajo",
            url: "/teachers/workCertificate",
          }
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
        url: "/teachers/schedules",
        icon: CalendarCheck,
      },
    ],
  }