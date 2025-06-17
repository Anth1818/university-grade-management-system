import type { SemesterData, SemesterSubjects } from "@/lib/types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../ui/accordion";
import { SubjectsBlock } from "./SubjectsBlock";
// No necesitamos importar useBlockSelection aquí ya que no lo estamos usando en este componente

interface SubjectsBlockAccordionProps {
    semesterSubjects: SemesterSubjects;
    setSelectedBlock: (block: string) => void;
}

export const SubjectsBlockAccordion = ({ semesterSubjects, setSelectedBlock }: SubjectsBlockAccordionProps) => {
    
    return (
        <div>
            {semesterSubjects.map((item: SemesterData, index: number) => (
                <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">
                            {item.semester} | Bloque: {item.block} | {item.subjects.length} materias | Turno: {item.turn}
                        </AccordionTrigger>
                        <AccordionContent>
                            <SubjectsBlock semesterSubjects={[item]}  setSelectedBlock={setSelectedBlock} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    )
}