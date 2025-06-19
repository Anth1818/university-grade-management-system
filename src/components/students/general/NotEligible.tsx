import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NotEligibleProps {
  notes?: boolean;
}

export function NotEligible({ notes }: NotEligibleProps) {
  return notes ? (
    <Alert className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No eres elegible aún</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Actualmente no cumples con los requisitos para solicitar notas
          certificadas.
        </p>
        <p>
          Para poder solicitar tus notas certificadas, debes haber completado y
          aprobado todos los créditos de tu programa académico.
        </p>
        <p>
          Si crees que esto es un error, por favor comunícate con el
          departamento académico.
        </p>
      </AlertDescription>
    </Alert>
  ) : (
    <Alert className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Requisitos pendientes</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Actualmente no cumples con todos los requisitos para participar en el
          acto de grado.
        </p>
        <p>
          Por favor, verifica que hayas completado todas las asignaturas y
          requisitos de tu programa.
        </p>
      </AlertDescription>
    </Alert>
  );
}
