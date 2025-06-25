import { ButtonNavigate } from "@/components/shared/ButtonNavigate";
import { ArrowBigLeft } from "lucide-react";

interface ChargeStudentContainerProps {
    children: React.ReactNode;
    sectionId: string | number | undefined;
}

const ChargeStudentContainer = ({ children, sectionId }: ChargeStudentContainerProps) => {
    return (
        <main className="container mx-auto p-4">
            <ButtonNavigate
                id="back-button"
                url={`/teachers/studentsList/${sectionId}`}
                icon={<ArrowBigLeft className="h-4 w-4" />}
                className="mb-6"
                children="Regresar"
            />
           {children}
        </main>
    );
};

export default ChargeStudentContainer;