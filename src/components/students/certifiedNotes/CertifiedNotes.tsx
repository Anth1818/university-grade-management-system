import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Loader } from "@/components/shared/Loader";
import { Eligible } from "../general/Eligible"
import { NotEligible } from "../general/NotEligible";
import { AlreadyRequested } from "../general/AlreadyRequested";
import { PeriodClosed } from "../general/PeriodClosed";
import { Error } from "../general/Error";
import type { CertifiedNotesStatus } from "@/lib/types";
import useEligibility from "@/hooks/useEligibility";
import { handleRequest } from "@/lib/utils";

export function CertifiedNotesCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status, academicDegree, isLoading } = useEligibility();
  const [localStatus, setLocalStatus] = useState<CertifiedNotesStatus>("checking");

  // Map the hook status to the component's status type
  useEffect(() => {
    if (status === 'loading') {
      setLocalStatus('checking');
    } else {
      setLocalStatus(status as CertifiedNotesStatus);
    }
  }, [status]);

  
  const renderContent = () => {
    if (isLoading || localStatus === 'checking') {
      return (
        <Loader message="Verificando tu elegibilidad para notas certificadas..." />
      );
    }

    switch (localStatus) {
      case "eligible":
        return (
          <Eligible 
            handleRequest={() => handleRequest(setIsSubmitting, setLocalStatus)} 
            isSubmitting={isSubmitting} 
            academicDegree={academicDegree || ''}
            notes
          />
        );
      case "not-eligible":
        return <NotEligible notes />;
      case "already-requested":
        return <AlreadyRequested notes />;
      case "period-closed":
        return <PeriodClosed notes/>;
      case "error":
      default:
        return <Error notes />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Solicitud de Notas Certificadas</CardTitle>
            <CardDescription>
              Verifica tu elegibilidad y solicita tus notas certificadas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
