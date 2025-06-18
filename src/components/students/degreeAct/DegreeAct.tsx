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
import { Eligible } from "./Eligible";
import { NotEligible } from "./NotEligible";
import { AlreadyRequested } from "./AlreadyRequested";
import { PeriodClosed } from "./PeriodClosed";
import { Error } from "./Error";

export function DegreeActCard() {
  const [status, setStatus] = useState<DegreeActStatus>("checking");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate checking degree act eligibility
  useEffect(() => {
    const checkEligibility = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch('/api/student/degree-act/status');
        // const data = await response.json();

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock response - in a real app, this would come from your API
        const mockResponse = {
          isDegreeActPeriod: false, // Check if it's currently the degree act period
          isEligible: false, // Check if student meets all requirements
          hasRequested: false, // Check if student already requested
        };

        if (!mockResponse.isDegreeActPeriod) {
          setStatus("period-closed");
        } else if (mockResponse.hasRequested) {
          setStatus("already-requested");
        } else if (mockResponse.isEligible) {
          setStatus("eligible");
        } else {
          setStatus("not-eligible");
        }
      } catch (error) {
        console.error("Error checking degree act status:", error);
        setStatus("error");
      } finally {
        setIsLoading(false);
      }
    };

    checkEligibility();
  }, []);

  const handleRequestDegreeAct = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would submit the degree act request here
      // await fetch('/api/student/degree-act/request', { method: 'POST' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success, update status
      setStatus("already-requested");
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

    switch (status) {
      case "eligible":
        return <Eligible handleRequestDegreeAct={handleRequestDegreeAct} isSubmitting={isSubmitting} />

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
