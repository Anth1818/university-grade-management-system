import { ButtonNavigate } from "@/components/shared/ButtonNavigate";
import { ArrowBigLeft } from "lucide-react";

interface EvaluationPlanContainerProps {
  children: React.ReactNode;
}

const EvaluationPlanContainer = ({ children}: EvaluationPlanContainerProps) => {
  return (
      <main className="container mx-auto p-4">
          <ButtonNavigate
              id="back-button"
              url={`/teachers/sections`}
              icon={<ArrowBigLeft className="h-4 w-4" />}
              className="mb-6"
              children="Regresar"
          />
         {children}
      </main>
  );
};

export default EvaluationPlanContainer;

