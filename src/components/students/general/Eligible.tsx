import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface EligibleProps {
  handleRequest: () => Promise<void>;
  isSubmitting: boolean;
  academicDegree?: string | null;
  notes?: boolean;
}

export function Eligible({ 
  handleRequest, 
  isSubmitting,
  academicDegree,
  notes
}: EligibleProps) {
  return notes ? (
    <Alert className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle className="font-medium">¡Eres elegible para solicitar tus notas certificadas!</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Has completado exitosamente tu carrera de <span className="font-medium">{academicDegree}</span> y 
          puedes solicitar tus notas certificadas durante el período establecido.
        </p>
        <p>
          Al solicitar tus notas certificadas, recibirás un documento oficial que acredita tu historial académico.
        </p>
        <div className="pt-2">
          <Button 
            onClick={handleRequest} 
            disabled={isSubmitting}
            className="cursor-pointer dark:bg-gray-800 dark:text-white"
          >
            {isSubmitting ? 'Procesando...' : 'Solicitar Notas Certificadas'}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  ) : (
    <Alert className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle className="font-medium">¡Eres elegible para solicitar tu acto de grado!</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Has completado exitosamente tu carrera de <span className="font-medium">{academicDegree}</span> y 
          puedes solicitar tu acto de grado durante el período establecido.
        </p>
        <p>
          Al solicitar tu acto de grado, recibirás un documento oficial que acredita tu historial académico.
        </p>
        <div className="pt-2">
          <Button 
            onClick={handleRequest} 
            disabled={isSubmitting}
            className="cursor-pointer dark:bg-gray-800 dark:text-white"
          >
            {isSubmitting ? 'Procesando...' : 'Solicitar Acto de Grado'}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
