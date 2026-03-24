import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { academicHistoryData } from "@/data/academicHistoryData";

interface AcademicHistoryProps {
  className?: string;
  history: any[];
}

export default function AcademicHistory({ className, history }: AcademicHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6 text-center text-muted-foreground">
          No hay historial académico disponible.
        </CardContent>
      </Card>
    );
  }

  const [selectedDegree, setSelectedDegree] = useState(history[0].degree);
  
  // Get unique degrees for the select dropdown
  const degrees = Array.from(new Set(history.map(h => h.degree)));
  
  // Get the selected degree data
  const selectedDegreeData = history.find(h => h.degree === selectedDegree) || history[0];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Historial Académico</CardTitle>
          <CardDescription>Consulta tu progreso académico por semestre</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select 
            value={selectedDegree}
            onValueChange={(value) => setSelectedDegree(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar carrera" />
            </SelectTrigger>
            <SelectContent>
              {degrees.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {selectedDegreeData.semesters.map((semester: any) => (
            <div key={semester.semester} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Semestre {semester.semester}</h3>
                  <p className="text-sm text-muted-foreground">
                    {semester.status === 'completed' ? 'Completado' : 
                     semester.status === 'enrolled' ? 'En progreso' : 'Pendiente'}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Créditos</p>
                    <p className="text-sm">
                      {semester.creditsEarned} / {semester.creditsTotal}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Promedio</p>
                    <p className="text-sm">
                      {semester.gpa > 0 ? semester.gpa.toFixed(1) : '-'}
                    </p>
                  </div>
                </div>
              </div>
              
              {semester.grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-2 text-left">Materia</th>
                        <th className="px-2 py-2 text-center">Eval 1</th>
                        <th className="px-2 py-2 text-center">Eval 2</th>
                        <th className="px-2 py-2 text-center">Eval 3</th>
                        <th className="px-2 py-2 text-center">Eval 4</th>
                        <th className="px-2 py-2 text-center">Eval 5</th>
                        <th className="px-2 py-2 text-center">Eval 6</th>
                        <th className="px-4 py-2 text-right">Final</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {semester.grades.map((grade: any) => (
                        <tr key={grade.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-2">{grade.subject}</td>
                          <td className="text-center">{grade.evaluation1 || '-'}</td>
                          <td className="text-center">{grade.evaluation2 || '-'}</td>
                          <td className="text-center">{grade.evaluation3 || '-'}</td>
                          <td className="text-center">{grade.evaluation4 || '-'}</td>
                          <td className="text-center">{grade.evaluation5 || '-'}</td>
                          <td className="text-center">{grade.evaluation6 || '-'}</td>
                          <td 
                            className={cn(
                              "px-4 py-2 text-right font-medium",
                              grade.finalGrade > 0 && grade.finalGrade < 10 ? 'text-red-500' : ''
                            )}
                          >
                            {grade.finalGrade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No hay calificaciones disponibles para este semestre.
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
