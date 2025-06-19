import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Status } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleRequest = async (setIsSubmitting: (value: boolean) => void, setLocalStatus: (value: Status) => void) : Promise<void> => {
    setIsSubmitting(true);
    try {
      // In a real app, you would submit the request here
      // await fetch('/api/student/certified-notes/request', { method: 'POST' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success, update status
      setLocalStatus("already-requested");
    } catch (error) {
      console.error("Error requesting:", error);
      alert(
        "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
