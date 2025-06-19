'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonDownloadProps {
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const ButtonDownload = ({ className, id, onClick }: ButtonDownloadProps) => {
  return (
    <Button 
      id={id}
      type="button"
      size="sm" 
      className={cn("h-8 gap-1 cursor-pointer dark:bg-gray-800 dark:text-white", className)}
      onClick={onClick}
    >
      <Download className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Descargar
      </span>
    </Button>
  );
};