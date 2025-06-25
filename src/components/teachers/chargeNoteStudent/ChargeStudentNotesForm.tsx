import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface Note {
  id: number;
  name: string;
  grade: number;
}

interface Props {
  studentId: string | number;
  className?: string;
}

const notes: Note[] = [
  { id: 1, name: "Evaluación 1", grade: 5 },
  { id: 2, name: "Evaluación 2", grade: 2 },
  { id: 3, name: "Evaluación 3", grade: 15 },
  { id: 4, name: "Evaluación 4", grade: 10 },
  { id: 5, name: "Evaluación 5", grade: 0 },
  { id: 6, name: "Evaluación 6", grade: 0 },
];

const ChargeStudentNotesForm: React.FC<Props> = ({ studentId, className }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [grade, setGrade] = useState<number | "">("");

  const handleEvaluationChange = (value: string) => {
    const note = notes.find((n) => n.id.toString() === value);
    if (note) {
      setSelectedNote(note);
      setGrade(note.grade);
    } else {
      setSelectedNote(null);
      setGrade("");
    }
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or a number between 0 and 20
    if (value === "" || (Number(value) >= 0 && Number(value) <= 20)) {
      setGrade(value === "" ? "" : Number(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote || grade === "") {
      alert("Por favor seleccione una evaluación y una nota");
      return;
    }
    // Aquí iría la lógica para guardar la nota
    console.log({ studentId, evaluation: selectedNote.name, grade });
    alert(
      `Nota guardada para el estudiante ${studentId} en la ${selectedNote.name} con la nota ${grade}`
    );
  };

  return (
    <Card className={cn("w-full font-cascadia-code", className)}>
      <CardHeader>
        <CardTitle>Cargar Notas</CardTitle>
        <CardDescription>
          Registre las calificaciones del estudiante
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Evaluación</Label>
              <Select
                onValueChange={handleEvaluationChange}
                value={selectedNote?.id.toString() || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una evaluación" />
                </SelectTrigger>
                <SelectContent>
                  {notes.map((note) => (
                    <SelectItem key={note.id} value={note.id.toString()}>
                      {note.name} (Nota actual: {note.grade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Nueva Nota</Label>
              <Input
                type="number"
                disabled={!selectedNote}
                id="grade"
                value={grade}
                onChange={handleGradeChange}
                min="0"
                max="20"
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={selectedNote ? `Nota actual: ${selectedNote.grade}` : "Seleccione una evaluación"}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="default"
              disabled={!selectedNote}
              onClick={() => selectedNote && setGrade(selectedNote.grade)}
            >
              Restaurar
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!selectedNote || grade === "" || (selectedNote && grade === selectedNote.grade)}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChargeStudentNotesForm;
