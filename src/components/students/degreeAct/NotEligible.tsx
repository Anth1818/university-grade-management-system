import { AlertCircle } from "lucide-react";

export const NotEligible = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Requisitos pendientes
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Actualmente no cumples con todos los requisitos para participar
                en el acto de grado.
              </p>
              <p className="mt-1">
                Por favor, verifica que hayas completado todas las asignaturas y
                requisitos de tu programa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
