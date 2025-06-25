import { ButtonNavigate } from "@/components/shared/ButtonNavigate"
import StudentListTable from "./StudentListTable"
import { ArrowBigLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function StudentListContainer({students, itemsPerPage, idSection}: {students: Student[], itemsPerPage: number, idSection: string | number}) {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <ButtonNavigate 
                    url="/teachers/sections" 
                    icon={<ArrowBigLeft className="h-4 w-4" />}
                    
                >
                    Volver a Secciones
                </ButtonNavigate>
            </div>
            
            <Card className="font-cascadia-code">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Sección {idSection}</CardTitle>
                            <CardDescription>Lista de Estudiantes</CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total: {students.length} estudiantes
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <StudentListTable 
                        students={students}
                        itemsPerPage={itemsPerPage}
                    />
                </CardContent>
            </Card>
        </div>
    )
}