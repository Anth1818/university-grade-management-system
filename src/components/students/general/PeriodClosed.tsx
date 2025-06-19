import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarOff } from "lucide-react";

interface PeriodClosedProps {
  notes?: boolean;
}

export function PeriodClosed({ notes }: PeriodClosedProps) {
  return notes ? (
    <Alert variant="destructive">
      <CalendarOff className="h-4 w-4" />
      <AlertTitle>Período de solicitud cerrado</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          El período para solicitar notas certificadas está actualmente cerrado.
        </p>
        <p>
          Los períodos de solicitud generalmente están abiertos al final de cada
          semestre académico. Por favor, verifica las fechas del próximo período
          de solicitud con el departamento académico.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Si necesitas asistencia urgente, comunícate con la oficina de registro
          académico.
        </p>
      </AlertDescription>
    </Alert>
  ) : (
    <Alert variant="destructive">
      <CalendarOff className="h-4 w-4" />
      <AlertTitle>Período de solicitud cerrado</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          El período para solicitar participación en el acto de grado no está
          disponible en este momento.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Por favor, verifica las fechas del próximo período de solicitud.
        </p>
      </AlertDescription>
    </Alert>
  );
}
