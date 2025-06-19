import { computerScienceCurriculum } from '@/data/computerScienceCurriculumData';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export const CurriculumMesh = () => {

  // Group by semester
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Function to format teachers list
  const formatTeachers = (teachers: Array<{ name: string; email?: string }>) => {
    return teachers.map((teacher, index) => (
      <div key={index} className="flex items-center gap-1">
        <span>{teacher.name}</span>
        {teacher.email && (
          <a 
            href={`mailto:${teacher.email}`} 
            className="text-blue-500 hover:text-blue-700"
            onClick={(e) => e.stopPropagation()}
            title={`Enviar correo a ${teacher.name}`}
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Malla Curricular - Ingeniería en Informática</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {semesters.map((semester) => {
            const semesterData = computerScienceCurriculum.find(s => s.semester.startsWith(`${semester}`));
            if (!semesterData) return null;

            return (
              <Accordion key={semester} type="single" collapsible className="w-full">
                <AccordionItem value={`semester-${semester}`}>
                  <AccordionTrigger className="bg-primary/10 hover:bg-primary/20 px-4 rounded-lg">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{semesterData.semester}</span>
                      <span className="text-sm text-muted-foreground">
                        {semesterData.subjects.length} materias • Bloque: {semesterData.block} • Turno: {semesterData.turn}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-3">
                      {semesterData.subjects.map((subject) => (
                        <div
                          key={subject.id}
                          className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="mb-2">
                            <h4 className="font-medium text-lg">{subject.name}</h4>
                            <p className="text-sm text-muted-foreground">{subject.code} • {subject.credits} créditos</p>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium text-sm">Profesores:</p>
                            <div className="space-y-1 mt-1">
                              {formatTeachers(subject.teachers || [])}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurriculumMesh;
