import { useState } from "react"
import { actions } from "astro:actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData(e.currentTarget)
      const { data, error } = await actions.auth.login(formData)

      if (error) {
        const errorMessage = String(error.message ?? "").toLowerCase()

        if (errorMessage.includes("invalid credentials") || errorMessage.includes("unauthorized")) {
          setError("Correo o contraseña incorrectos. Verifica tus datos.")
          return
        }

        if (errorMessage.includes("network") || errorMessage.includes("fetch") || errorMessage.includes("json")) {
          setError("No se pudo conectar con el servidor. Intenta nuevamente.")
          return
        }

        setError("No se pudo iniciar sesión en este momento. Intenta nuevamente.")
        return
      }

      if (data?.success) {
        setSuccess("Inicio de sesión exitoso. Redirigiendo...")
        setTimeout(() => {
          window.location.href = "/home"
        }, 800)
        return
      }

      setError("No se pudo iniciar sesión en este momento. Intenta nuevamente.")
    } catch {
      setError("No se pudo conectar con el servidor. Revisa tu conexión e intenta otra vez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ingresa con tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              {success && <p className="text-sm text-green-600 font-medium">{success}</p>}
              <div className="flex flex-col gap-3">
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
