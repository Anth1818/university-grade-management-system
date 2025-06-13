'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const DownloadGradesButton = ({ className }: { className?: string }) => {
  const handleDownloadGrades = () => {
    alert('Descargando las notas del estudiante...');
    // Aquí iría la lógica real de descarga
  };

  return (
    <Button 
      size="sm" 
      className={cn("gap-1", className)}
      onClick={handleDownloadGrades}
    >
      <Download className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Descargar
      </span>
    </Button>
  );
};