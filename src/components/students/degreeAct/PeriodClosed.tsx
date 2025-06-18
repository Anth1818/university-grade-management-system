import { CalendarOff } from "lucide-react"

export const PeriodClosed = () => {
    return (
        <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CalendarOff className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Período de solicitud cerrado
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    El período para solicitar participación en el acto de grado
                    no está disponible en este momento.
                  </p>
                  <p className="mt-1">
                    Por favor, verifica las fechas del próximo período de
                    solicitud.
                  </p>
                </div>
              </div>
            </div>
          </div>
    )
}