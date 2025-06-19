import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  GraduationCap,
} from "lucide-react";
import { Loader } from "@/components/shared/Loader";
import type { DegreeActStatus } from "@/lib/types";
import { Eligible } from "../general/Eligible";
import { NotEligible } from "../general/NotEligible";
import { AlreadyRequested } from "../general/AlreadyRequested";
import { PeriodClosed } from "../general/PeriodClosed";
import { Error } from "../general/Error";
import useEligibility from "@/hooks/useEligibility";

export function DegreeActCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status, academicDegree, isLoading } = useEligibility();
  const [localStatus, setLocalStatus] = useState<DegreeActStatus>("checking");

   useEffect(() => {
      if (status === 'loading') {
        setLocalStatus('checking');
      } else {
        setLocalStatus(status as DegreeActStatus);
      }
    }, [status]);

    
  const handleRequestDegreeAct = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would submit the degree act request here
      // await fetch('/api/student/degree-act/request', { method: 'POST' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success, update status
      setLocalStatus("already-requested");
    } catch (error) {
      console.error("Error requesting degree act:", error);
      alert(
        "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader message="Verificando tu elegibilidad para el acto de grado..." />
      );
    }

    switch (localStatus) {
      case "eligible":
        return <Eligible handleRequest={handleRequestDegreeAct} isSubmitting={isSubmitting} academicDegree={academicDegree} />

      case "not-eligible":
        return <NotEligible />

      case "already-requested":
        return <AlreadyRequested />

      case "period-closed":
        return <PeriodClosed />

      case "error":
      default:
       return <Error />
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Solicitud de Acto de Grado</CardTitle>
            <CardDescription>
              Verifica tu elegibilidad y solicita participar en el próximo acto
              de grado
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
