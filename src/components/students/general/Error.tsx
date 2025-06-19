import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  notes?: boolean;
}

export function Error({ notes }: ErrorProps) {
  return (
    notes ? (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Ocurrió un error al verificar tu elegibilidad para notas certificadas.</p>
        <p className="mt-2">
          Por favor, intenta nuevamente más tarde o contacta al soporte técnico si el problema persiste.
        </p>
      </AlertDescription>
    </Alert>
    ) : (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p> Ocurrió un error al verificar tu elegibilidad para el acto
        de grado.</p>
        <p className="mt-2">
          Por favor, intenta nuevamente más tarde o contacta al soporte técnico si el problema persiste.
        </p>
      </AlertDescription>
    </Alert>
    )
  );
}
