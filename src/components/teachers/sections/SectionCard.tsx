import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ListCheck } from "lucide-react";
import { ButtonNavigate } from "@/components/shared/ButtonNavigate";

interface Props {
  sectionNumber: string; 
  career: string;
  semester: number;
  totalStudents: number;
  turn: string;
}

const SectionCard = ({ sectionNumber, career, semester, totalStudents, turn }: Props) => {
  return (
    <Card className="font-cascadia-code chalk-effect flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>Sección: {sectionNumber}</CardTitle>
        <CardDescription>Carrera: {career}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Semestre: {semester}</p>
        <p>Total de estudiantes: {totalStudents}</p>
        <p>Turno: {turn}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-stretch">
        <ButtonNavigate url={`/teachers/studentsList/${sectionNumber}`} icon={<Users />}>Ver lista de estudiantes</ButtonNavigate>
        <ButtonNavigate url={`/teachers/evaluationPlan/${sectionNumber}`} icon={<ListCheck />}>Cargar plan de evaluación</ButtonNavigate>
      </CardFooter>
    </Card>
  );
};

export default SectionCard;