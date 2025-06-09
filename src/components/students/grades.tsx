import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ButtonDownload } from "../shared/ButtonDownload";
import { gradesData } from "@/data/dataGrades";
import { ButtonNavigate } from "../shared/ButtonNavigate";

export function StudentGrades() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">
            Notas del estudiante
          </CardTitle>
          <CardDescription>Semestre 2 (cursando)</CardDescription>
          <CardDescription>Informática</CardDescription>
        </div>

        {/* Botón de descargar */}
        <ButtonDownload onClick={() => alert("Descargando notas...")} />
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
              <TableHead className="text-center">Evaluación 5</TableHead>
              <TableHead className="text-center">Evaluación 6</TableHead>
              <TableHead className="text-center">Evaluación 7</TableHead>
              <TableHead className="text-center">Evaluación 8</TableHead>
              <TableHead className="text-right">Calificación Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradesData.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.subject}</TableCell>
                <TableCell className="text-center">
                  {grade.evaluation1}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation2}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation3}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation4}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation5}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation6}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation7}
                </TableCell>
                <TableCell className="text-center">
                  {grade.evaluation8}
                </TableCell>
                <TableCell className={`text-right font-semibold ${grade.finalGrade < 12 ? "text-red-500" : ""}`}>
                  {grade.finalGrade}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {gradesData.find((grade) => grade.finalGrade < 12) && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  <h2 className="text-center text-red-500 font-bold text-lg">
                    Atención: Al no tener todas las asignaturas aprobadas, no se
                    puede cursar el siguiente semestre, debe consultar el modulo
                    de recuperación para ver las materias que necesita rendir
                  </h2>
                  <ButtonNavigate
                    url="/students/recoverySubject"
                    className="mt-2"
                  >
                    Ver recuperación
                  </ButtonNavigate>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
