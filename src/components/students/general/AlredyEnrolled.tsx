import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AlredyEnrolled = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-green-50 p-4 text-center">
      <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
      <h3 className="text-lg font-medium text-green-800">
        ¡Inscripción Exitosa!
      </h3>
      <p className="text-sm text-green-700 mt-1">{message}</p>
      <Button
        className="mt-4 mr-4"
        onClick={() => (window.location.href = "/home")}
      >
        Ir al inicio
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button
        className="mt-4"
        onClick={() => (window.location.href = "/students/schedules")}
      >
        Ver horario
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
