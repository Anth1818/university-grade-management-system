import type { Subject, SemesterSubjects, SemesterData } from "@/lib/types";

interface SubjectsBlockProps {
    semesterSubjects: SemesterSubjects;
    setSelectedBlock: (block: string) => void;
}

export const SubjectsBlock = ({ semesterSubjects, setSelectedBlock }: SubjectsBlockProps) => {
  if (!semesterSubjects || semesterSubjects.length === 0) {
    return <div className="text-muted-foreground text-center py-4">No hay materias disponibles para este semestre.</div>;
  }
  

  return (
    <div>
      {semesterSubjects.map((item: SemesterData) => (
        <div key={item.semester} className="mt-2">
          <input type="radio" className="mb-4" name="block" onChange={() => setSelectedBlock(item.block)} value={item.block} /> Seleccionar bloque {item.block}
          <div className="space-y-3">
            {item.subjects.map((subject: Subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {subject.code} • {subject.credits} créditos •
                    Profesor/a: {subject.teacher} 
                    <p>• Dia: {subject.day}</p>
                    <p>• Hora: {subject.time}</p>
                    <p>• Aula: {subject.classroom}</p>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};