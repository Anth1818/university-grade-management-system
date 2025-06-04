"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

// Definimos el tipo para las notas
type Grade = {
  id: string
  subject: string
  evaluation1: number
  evaluation2: number
  evaluation3: number
  evaluation4: number
  finalGrade: number
}

// Datos de ejemplo (en un caso real, estos vendrían de una API)
const gradesData: Grade[] = [
  {
    id: "1",
    subject: "Ingles",
    evaluation1: 15,
    evaluation2: 16,
    evaluation3: 13,
    evaluation4: 17,
    finalGrade: 15
  },
  {
    id: "2",
    subject: "Programación 1",
    evaluation1: 15,
    evaluation2: 16,
    evaluation3: 13,
    evaluation4: 17,
    finalGrade: 15
  },
]

export function StudentGrades({children}: {children: React.ReactNode}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Notas del estudiante</CardTitle>
          <CardDescription>Semestre 2 (actual)</CardDescription>
          <CardDescription>Informática</CardDescription>
        </div>

        {/* Botón de descargar */}
        {children}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Materia</TableHead>
              <TableHead className="text-center">Evaluación 1</TableHead>
              <TableHead className="text-center">Evaluación 2</TableHead>
              <TableHead className="text-center">Evaluación 3</TableHead>
              <TableHead className="text-center">Evaluación 4</TableHead>
              <TableHead className="text-right">Calificación Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradesData.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.subject}</TableCell>
                <TableCell className="text-center">{grade.evaluation1}</TableCell>
                <TableCell className="text-center">{grade.evaluation2}</TableCell>
                <TableCell className="text-center">{grade.evaluation3}</TableCell>
                <TableCell className="text-center">{grade.evaluation4}</TableCell>
                <TableCell className="text-right font-semibold">
                  {grade.finalGrade}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
