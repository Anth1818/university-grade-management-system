import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Loader2 } from "lucide-react";

interface EligibleProps {
    handleRequestDegreeAct: () => void;
    isSubmitting: boolean;
}

export const Eligible = ({ handleRequestDegreeAct, isSubmitting }: EligibleProps) => {
    return (
        <div className="space-y-6">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  ¡Felicitaciones!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>¡Has completado todos los requisitos para graduarte!</p>
                  <p className="mt-1">
                    Puedes solicitar tu participación en el próximo acto de
                    grado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleRequestDegreeAct}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Solicitar participación en acto de grado"
              )}
            </Button>
          </div>
        </div>
      );
}