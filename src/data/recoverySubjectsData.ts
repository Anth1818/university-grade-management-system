import type { SemesterData } from "@/lib/types";

export const recoverySubjectsData: SemesterData[] = [
    {
        semester: "Recuperación",
        block: "A",
        turn: "Mixto",
        subjects: [
            { id: "REC-01", name: "Cálculo Diferencial", code: "CALC-REC", credits: 0, teacher: "Dr. Alan Turing", day: "Lunes y Miércoles", time: "8-10am", classroom: "101" },
            { id: "REC-02", name: "Física de Ondas", code: "PHYS-REC", credits: 0, teacher: "Dra. Marie Curie", day: "Martes y Jueves", time: "10-12pm", classroom: "101" },
        ],
    },
    {
        semester: "Recuperación",
        block: "B",
        turn: "Mixto",
        subjects: [
            { id: "REC-03", name: "Cálculo Diferencial", code: "CALC-REC", credits: 0, teacher: "Dr. Isaac Newton", day: "Viernes", time: "8-12pm", classroom: "102" },
            { id: "REC-04", name: "Física de Ondas", code: "PHYS-REC", credits: 0, teacher: "Dra. Isabella", day: "Lunes y Miércoles", time: "8-10am", classroom: "102" },
        ],
    },
];