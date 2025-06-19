import type { Grade } from "@/lib/types";

export interface AcademicHistory {
  degree: string;
  semesters: {
    semester: string;
    status: 'completed' | 'in-progress' | 'pending';
    creditsEarned: number;
    creditsTotal: number;
    gpa: number;
    grades: Grade[];
  }[];
}

export const academicHistoryData: AcademicHistory[] = [
  {
    degree: 'Informática',
    semesters: [
      {
        semester: 'Semestre 1',
        status: 'completed',
        creditsEarned: 18,
        creditsTotal: 18,
        gpa: 16.5,
        grades: [
          {
            id: '1',
            subject: 'Matemáticas Básicas',
            evaluation1: 16,
            evaluation2: 17,
            evaluation3: 15,
            evaluation4: 18,
            evaluation5: 17,
            evaluation6: 16,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 16
          },
          {
            id: '2',
            subject: 'Introducción a la Programación',
            evaluation1: 18,
            evaluation2: 17,
            evaluation3: 19,
            evaluation4: 17,
            evaluation5: 16,
            evaluation6: 18,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 17
          },
        ]
      },
      {
        semester: 'Semestre 2',
        status: 'in-progress',
        creditsEarned: 12,
        creditsTotal: 18,
        gpa: 0,
        grades: [
          {
            id: '3',
            subject: 'Inglés',
            evaluation1: 15,
            evaluation2: 16,
            evaluation3: 13,
            evaluation4: 17,
            evaluation5: 15,
            evaluation6: 16,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 11
          },
          {
            id: '4',
            subject: 'Programación 1',
            evaluation1: 15,
            evaluation2: 16,
            evaluation3: 13,
            evaluation4: 17,
            evaluation5: 15,
            evaluation6: 16,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 15
          },
        ]
      },
    ]
  },
  {
    degree: 'Administración',
    semesters: [
      {
        semester: 'Semestre 1',
        status: 'completed',
        creditsEarned: 15,
        creditsTotal: 15,
        gpa: 15.5,
        grades: [
          {
            id: '101',
            subject: 'Introducción a la Administración',
            evaluation1: 15,
            evaluation2: 16,
            evaluation3: 14,
            evaluation4: 17,
            evaluation5: 15,
            evaluation6: 16,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 15
          },
          {
            id: '102',
            subject: 'Contabilidad Básica',
            evaluation1: 16,
            evaluation2: 17,
            evaluation3: 15,
            evaluation4: 18,
            evaluation5: 16,
            evaluation6: 17,
            evaluation7: 0,
            evaluation8: 0,
            finalGrade: 16
          },
        ]
      },

    ]
  }
];
