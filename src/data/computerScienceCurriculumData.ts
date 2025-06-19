import type { SemesterSubjects } from "@/lib/types";

export const computerScienceCurriculum: SemesterSubjects = [
  {
    semester: "1er Semestre",
    block: "Básico",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT101",
        name: "Matemática Básica",
        code: "MAT101",
        credits: 6,
        teacher: "Juan Pérez",
        teachers: [
          { name: "Juan Pérez", email: "jperez@university.edu" },
          { name: "Laura González", email: "lgonzalez@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-101"
      },
      {
        id: "INF101",
        name: "Introducción a la Programación",
        code: "INF101",
        credits: 5,
        teacher: "María García",
        teachers: [
          { name: "María García", email: "mgarcia@university.edu" },
          { name: "Pedro Martínez", email: "pmartinez@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "FIS101",
        name: "Física General",
        code: "FIS101",
        credits: 5,
        teacher: "Carlos López",
        teachers: [
          { name: "Carlos López", email: "clopez@university.edu" },
          { name: "Sofía Ramírez", email: "sramirez@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "A-102"
      },
      {
        id: "ING101",
        name: "Inglés Técnico I",
        code: "ING101",
        credits: 3,
        teacher: "Laura Martínez",
        teachers: [
          { name: "Laura Martínez", email: "lmartinez@university.edu" },
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-103"
      }
    ]
  },
  {
    semester: "2do Semestre",
    block: "Básico",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT102",
        name: "Álgebra Lineal",
        code: "MAT102",
        credits: 6,
        teacher: "Ana Ramírez",
        teachers: [
          { name: "Ana Ramírez", email: "aramirez@university.edu" },
          { name: "Carlos Mendoza", email: "cmendoza@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-102"
      },
      {
        id: "INF104",
        name: "Programación Orientada a Objetos",
        code: "INF104",
        credits: 5,
        teacher: "Pedro Martínez",
        teachers: [
          { name: "Pedro Martínez", email: "pmartinez@university.edu" },
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "INF105",
        name: "Base de Datos I",
        code: "INF105",
        credits: 5,
        teacher: "María García",
        teachers: [
          { name: "María García", email: "mgarcia@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-202"
      },
      {
        id: "INF106",
        name: "Sistemas Operativos",
        code: "INF106",
        credits: 4,
        teacher: "Roberto Sánchez",
        teachers: [
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" },
          { name: "Diego Herrera", email: "dherrera@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-104"
      },
      {
        id: "FIS102",
        name: "Física Aplicada",
        code: "FIS102",
        credits: 5,
        teacher: "Carlos López",
        teachers: [
          { name: "Carlos López", email: "clopez@university.edu" },
          { name: "Sofía Ramírez", email: "sramirez@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "A-102"
      },
      {
        id: "EST101",
        name: "Estadística I",
        code: "EST101",
        credits: 4,
        teacher: "Sofía Ramírez",
        teachers: [
          { name: "Sofía Ramírez", email: "sramirez@university.edu" },
          { name: "Ana Rodríguez", email: "arodriguez@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-104"
      }
    ]
  },
  // Semestres 3-8 con estructura similar
  {
    semester: "3er Semestre",
    block: "Intermedio",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT201",
        name: "Cálculo Diferencial e Integral",
        code: "MAT201",
        credits: 6,
        teacher: "Juan Pérez",
        teachers: [
          { name: "Juan Pérez", email: "jperez@university.edu" },
          { name: "Laura González", email: "lgonzalez@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-101"
      },
      {
        id: "INF201",
        name: "Estructuras de Datos",
        code: "INF201",
        credits: 5,
        teacher: "Carlos López",
        teachers: [
          { name: "Carlos López", email: "clopez@university.edu" },
          { name: "Ana Ramírez", email: "aramirez@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-202"
      },
      {
        id: "INF203",
        name: "Arquitectura de Computadoras",
        code: "INF203",
        credits: 4,
        teacher: "Roberto Sánchez",
        teachers: [
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-103"
      }
    ]
  },
  {
    semester: "4to Semestre",
    block: "Intermedio",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT202",
        name: "Cálculo Integral",
        code: "MAT202",
        credits: 6,
        teacher: "Ana Ramírez",
        teachers: [
          { name: "Ana Ramírez", email: "aramirez@university.edu" },
          { name: "Juan Pérez", email: "jperez@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-102"
      },
      {
        id: "INF204",
        name: "Base de Datos II",
        code: "INF204",
        credits: 5,
        teacher: "Pedro Martínez",
        teachers: [
          { name: "Pedro Martínez", email: "pmartinez@university.edu" },
          { name: "María García", email: "mgarcia@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "INF205",
        name: "Redes de Computadoras",
        code: "INF205",
        credits: 5,
        teacher: "Lucía Torres",
        teachers: [
          { name: "Lucía Torres", email: "ltorres@university.edu" },
          { name: "Carlos López", email: "clopez@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-203"
      },
      {
        id: "INF206",
        name: "Ingeniería de Software I",
        code: "INF206",
        credits: 4,
        teacher: "Diego Herrera",
        teachers: [
          { name: "Diego Herrera", email: "dherrera@university.edu" },
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-104"
      }
    ]
  },
  {
    semester: "5to Semestre",
    block: "Intermedio",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT203",
        name: "Ecuaciones Diferenciales",
        code: "MAT203",
        credits: 6,
        teacher: "Carlos Mendoza",
        teachers: [
          { name: "Carlos Mendoza", email: "cmendoza@university.edu" },
          { name: "Ana Ramírez", email: "aramirez@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-103"
      },
      {
        id: "INF207",
        name: "Sistemas Operativos",
        code: "INF207",
        credits: 5,
        teacher: "Roberto Sánchez",
        teachers: [
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-202"
      },
      {
        id: "INF208",
        name: "Ingeniería de Software II",
        code: "INF208",
        credits: 5,
        teacher: "Laura González",
        teachers: [
          { name: "Laura González", email: "lgonzalez@university.edu" },
          { name: "Diego Herrera", email: "dherrera@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-201"
      },
      {
        id: "INF209",
        name: "Inteligencia Artificial",
        code: "INF209",
        credits: 4,
        teacher: "Jorge Ramírez",
        teachers: [
          { name: "Jorge Ramírez", email: "jramirez@university.edu" },
          { name: "María García", email: "mgarcia@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-105"
      }
    ]
  },
  {
    semester: "6to Semestre",
    block: "Intermedio",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT302",
        name: "Álgebra Lineal",
        code: "MAT302",
        credits: 6,
        teacher: "Ana Ramírez",
        teachers: [
          { name: "Ana Ramírez", email: "aramirez@university.edu" },
          { name: "Carlos Mendoza", email: "cmendoza@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-102"
      },
      {
        id: "INF304",
        name: "Sistemas Distribuidos",
        code: "INF304",
        credits: 5,
        teacher: "Pedro Martínez",
        teachers: [
          { name: "Pedro Martínez", email: "pmartinez@university.edu" },
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "INF305",
        name: "Seguridad Informática",
        code: "INF305",
        credits: 5,
        teacher: "María García",
        teachers: [
          { name: "María García", email: "mgarcia@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-203"
      },
      {
        id: "INF306",
        name: "Proyecto de Software",
        code: "INF306",
        credits: 4,
        teacher: "Laura González",
        teachers: [
          { name: "Laura González", email: "lgonzalez@university.edu" },
          { name: "Diego Herrera", email: "dherrera@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-104"
      }
    ]
  },
  {
    semester: "7mo Semestre",
    block: "Avanzado",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT401",
        name: "Estadística Avanzada",
        code: "MAT401",
        credits: 6,
        teacher: "Juan Pérez",
        teachers: [
          { name: "Juan Pérez", email: "jperez@university.edu" },
          { name: "Ana Ramírez", email: "aramirez@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-101"
      },
      {
        id: "INF401",
        name: "Inteligencia Artificial Avanzada",
        code: "INF401",
        credits: 5,
        teacher: "Carlos López",
        teachers: [
          { name: "Carlos López", email: "clopez@university.edu" },
          { name: "Jorge Ramírez", email: "jramirez@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "INF402",
        name: "Seguridad Informática Avanzada",
        code: "INF402",
        credits: 5,
        teacher: "María García",
        teachers: [
          { name: "María García", email: "mgarcia@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-202"
      },
      {
        id: "INF403",
        name: "Proyecto de Grado I",
        code: "INF403",
        credits: 4,
        teacher: "Laura González",
        teachers: [
          { name: "Laura González", email: "lgonzalez@university.edu" },
          { name: "Diego Herrera", email: "dherrera@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-103"
      }
    ]
  },
  {
    semester: "8vo Semestre",
    block: "Avanzado",
    turn: "Matutino/Nocturno",
    subjects: [
      {
        id: "MAT501",
        name: "Investigación de Operaciones",
        code: "MAT501",
        credits: 6,
        teacher: "Ana Ramírez",
        teachers: [
          { name: "Ana Ramírez", email: "aramirez@university.edu" },
          { name: "Carlos Mendoza", email: "cmendoza@university.edu" }
        ],
        day: "Lunes y Miércoles",
        time: "07:00 - 08:30",
        classroom: "A-102"
      },
      {
        id: "INF501",
        name: "Blockchain",
        code: "INF501",
        credits: 5,
        teacher: "Pedro Martínez",
        teachers: [
          { name: "Pedro Martínez", email: "pmartinez@university.edu" },
          { name: "Roberto Sánchez", email: "rsanchez@university.edu" }
        ],
        day: "Martes y Jueves",
        time: "07:00 - 08:30",
        classroom: "LAB-201"
      },
      {
        id: "INF502",
        name: "Internet de las Cosas",
        code: "INF502",
        credits: 5,
        teacher: "María García",
        teachers: [
          { name: "María García", email: "mgarcia@university.edu" },
          { name: "Lucía Torres", email: "ltorres@university.edu" }
        ],
        day: "Viernes",
        time: "07:00 - 10:00",
        classroom: "LAB-203"
      },
      {
        id: "INF503",
        name: "Proyecto de Grado II",
        code: "INF503",
        credits: 4,
        teacher: "Laura González",
        teachers: [
          { name: "Laura González", email: "lgonzalez@university.edu" },
          { name: "Diego Herrera", email: "dherrera@university.edu" }
        ],
        day: "Sábado",
        time: "08:00 - 11:00",
        classroom: "A-104"
      }
    ]
  }
];
