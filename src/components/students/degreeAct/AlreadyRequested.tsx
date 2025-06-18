import { CheckCircle2 } from "lucide-react"

export const AlreadyRequested = () => {
    return (
        <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  ¡Solicitud recibida!
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Tu solicitud para participar en el acto de grado ha sido
                    recibida exitosamente.
                  </p>
                  <p className="mt-1">
                    Recibirás más información por correo electrónico
                    próximamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
    )
}