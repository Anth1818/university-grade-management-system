import {
    BookOpenText,
    Download,
    FileCheck,
    CalendarCheck,
    FileStack,
    LibraryBig,
    Home,
  } from "lucide-react"

export const dataSidebarStudent = {
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
          {
            title: "Recuperar asignatura",
            url: "/students/recoverySubject",
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