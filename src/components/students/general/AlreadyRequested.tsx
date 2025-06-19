import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface AlreadyRequestedProps {
  notes?: boolean;
}

export function AlreadyRequested({ notes}: AlreadyRequestedProps) {
  return notes ? (
    <Alert className="bg-primary/10 text-primary">
      <Info className="h-4 w-4" />
      <AlertTitle className="font-medium color-primary">Solicitud en proceso</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Ya has solicitado tus notas certificadas. Tu solicitud está siendo
          procesada.
        </p>
        <p>
          Recibirás una notificación al correo electrónico registrado en tu
          cuenta.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Si necesitas ayuda o información adicional, por favor contacta a la
          oficina de registro.
        </p>
      </AlertDescription>
    </Alert>
  ) : (
    <Alert className="bg-primary/10 text-primary">
      <Info className="h-4 w-4" />
      <AlertTitle>Solicitud en proceso</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          Ya has solicitado tu participación en el acto de grado. Tu solicitud
          está siendo procesada.
        </p>
        <p>
          Recibirás una notificación al correo electrónico registrado en tu
          cuenta.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Si necesitas ayuda o información adicional, por favor contacta a la
          oficina de registro.
        </p>
      </AlertDescription>
    </Alert>
  );
}
