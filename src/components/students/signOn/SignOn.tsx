import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  CalendarOff,
  ArrowRight,
} from "lucide-react";

import type { SignOnStatus, SemesterData } from "@/lib/types";
import { semesterSubjectsData } from "@/data/semesterSubjectsData";
import { SubjectsBlockAccordion } from "../general/SubjectsBlockAccordion";
import {AlredyEnrolled} from "../general/AlredyEnrolled";
import { Loader } from "@/components/shared/Loader";

export function StudentSignOn() {
  const [status, setStatus] = useState<SignOnStatus>("eligible"); // Default to 'eligible' for demo
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [semesterSubjects, setSemesterSubjects] = useState<
    SemesterData[] | null
  >(null);

  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch('/api/student/status');
        // const data = await response.json();
        // setStatus(data.status);
        // setSemesterSubjects(data.subjects);

        // Mock data for demonstration
        setTimeout(() => {
          setSemesterSubjects(semesterSubjectsData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirmRegistration = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, you would submit the registration here
      // await fetch('/api/student/register', { method: 'POST' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("already-enrolled");
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        "Ocurrió un error al procesar su solicitud. Por favor, intente nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader message="Verificando tu estado académico..." />
      );
    }

    switch (status) {
      case "eligible":
        return (
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    ¡Felicitaciones!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Cumples con los requisitos para avanzar al siguiente
                      semestre.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {semesterSubjects && (
              <SubjectsBlockAccordion
                semesterSubjects={semesterSubjects}
                setSelectedBlock={setSelectedBlock}
              />
            )}

            <div className="mt-6">
              <Button
                onClick={handleConfirmRegistration}
                disabled={isSubmitting || !selectedBlock}
                className="w-full sm:w-auto cursor-pointer"
              >
                {isSubmitting ? "Procesando..." : "Confirmar inscripción"}
              </Button>
            </div>
          </div>
        );

      case "not-eligible":
        return (
          <div className="space-y-6">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Requisitos no cumplidos
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      No cumples con los requisitos para avanzar al siguiente
                      semestre.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  // In a real app, this would navigate to the recovery section
                  window.location.href = "/students/recoverySubject";
                }}
              >
                Ir a recuperación de unidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case "already-enrolled":
        return (
          <AlredyEnrolled message="Te has inscrito correctamente al semestre." />
        );

      case "not-available":
      default:
        return (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CalendarOff
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Inscripciones no disponibles
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Las inscripciones de semestre no están disponibles en este
                    momento.
                  </p>
                  <p className="mt-1">
                    Por favor, verifica las fechas del período de inscripción.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inscripción de Semestre</CardTitle>
        <CardDescription>
          Gestiona tu inscripción para el próximo período académico
        </CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
