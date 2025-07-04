import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { semesterSubjectsData } from "@/data/semesterSubjectsData";

interface AssingTeacherCardProps {
  career?: string;
  semester?: string;
  block?: string;
  turn?: string;
}

const AssingTeacherCard = ({
  career,
  semester,
  block,
  turn,
}: AssingTeacherCardProps) => {
  // Find the matching semester data
  const semesterData = semesterSubjectsData.find(
    (data) =>
      data.career === career &&
      data.semester === semester &&
      data.block === block &&
      data.turn === turn
  );

  const handleSaveAssignments = (
    teacherId: string,
    classroom: string,
    day: string,
    time: string
  ) => {
    alert(
      `Guardando asignaciones para el profesor ${teacherId} en la aula ${classroom} el dia ${day} a las ${time}`
    );
  };

  if (!semesterData) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            No se encontraron asignaturas para los filtros seleccionados
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {semesterData.semester} - Bloque {semesterData.block}
          </CardTitle>
          <div className="text-center text-muted-foreground">
            {semesterData.career} - Turno {semesterData.turn}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {semesterData.subjects.map((subject) => (
          <Card key={subject.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
              {subject.code}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{subject.name}</CardTitle>
              {subject.day && subject.time && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {subject.day} - {subject.time}
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`teacher-${subject.id}`}
                      className="font-medium"
                    >
                      Profesor
                    </Label>
                    <Select defaultValue={subject.teacherAssing?.id}>
                      <SelectTrigger
                        id={`teacher-${subject.id}`}
                        className="h-10"
                      >
                        <SelectValue placeholder="Seleccionar profesor" />
                      </SelectTrigger>
                      <SelectContent>
                        {subject.teacherOptions?.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`day-${subject.id}`}
                      className="font-medium"
                    >
                      Día
                    </Label>
                    <Select defaultValue={subject.day.toLowerCase()}>
                      <SelectTrigger id={`day-${subject.id}`} className="h-10">
                        <SelectValue placeholder="Seleccionar día" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lunes">Lunes</SelectItem>
                        <SelectItem value="martes">Martes</SelectItem>
                        <SelectItem value="miercoles">Miércoles</SelectItem>
                        <SelectItem value="jueves">Jueves</SelectItem>
                        <SelectItem value="viernes">Viernes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`time-${subject.id}`}
                      className="font-medium"
                    >
                      Hora
                    </Label>
                    <Input
                      id={`time-${subject.id}`}
                      type="time"
                      className="h-10 w-auto"
                      defaultValue={subject.time.split("-")[0].trim()}
                    />
                  </div>
                  <div className="space-y-2">
                  <Label
                    htmlFor={`classroom-${subject.id}`}
                    className="font-medium"
                  >
                    Aula
                  </Label>
                  <Select defaultValue={`aula-${subject.classroom}`}>
                    <SelectTrigger
                      id={`classroom-${subject.id}`}
                      className="h-10"
                    >
                      <SelectValue placeholder="Seleccionar Aula" />
                    </SelectTrigger>
                    <SelectContent>
                      {[101, 102, 103, 104].map((num) => (
                        <SelectItem key={num} value={`aula-${num}`}>
                          Aula {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                </div>

                

                <div className="flex justify-end pt-2 gap-2">
                  <Button
                    className={`px-6 h-10 text-base ${
                      !subject.teacherAssing ? "hidden" : ""
                    }`}
                  >
                    Editar
                  </Button>
                  <Button
                    className="px-6 h-10 text-base"
                    onClick={() =>
                      handleSaveAssignments(
                        subject.teacherAssing?.id || "",
                        subject.classroom,
                        subject.day,
                        subject.time
                      )
                    }
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssingTeacherCard;
