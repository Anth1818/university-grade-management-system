import {
    Download,
    ListCheck,
    Home,
  } from "lucide-react"

export const dataSidebarAnalyst = {
    user: {
      name: "Anthony Ruiz",
      email: "correo@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Asignaturas",
        url: "#",
        icon: ListCheck,
        items: [
          {
            title: "Asignar profesores",
            url: "/analyst/assignTeachers",
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
            url: "/analyst/teacherCard",
          },
          {
            title: "Constancia de trabajo",
            url: "/analyst/workCertificate",
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
    ],
  }