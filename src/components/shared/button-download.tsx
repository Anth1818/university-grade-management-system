import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export const ButtonDownload = () => {
    
    return (
        <Button variant="outline" size="sm" className="h-8 gap-1 cursor-pointer" onClick={() => alert('Descargando PDF...')}>
          <Download className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Exportar PDF
          </span>
        </Button>
    )
}