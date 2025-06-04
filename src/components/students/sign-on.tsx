"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, CalendarOff, ArrowRight } from 'lucide-react';

type Subject = {
  id: string;
  name: string;
  code: string;
  credits: number;
};

type SemesterSubjects = {
  semester: string;
  subjects: Subject[];
};

type SignOnStatus = 'eligible' | 'not-eligible' | 'not-available';

export function StudentSignOn() {
  const [status, setStatus] = useState<SignOnStatus>('eligible'); // Default to 'eligible' for demo
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [semesterSubjects, setSemesterSubjects] = useState<SemesterSubjects | null>(null);

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
          setSemesterSubjects({
            semester: 'Tercer Semestre',
            subjects: [
              { id: '1', name: 'Programación II', code: 'PROG-201', credits: 4 },
              { id: '2', name: 'Bases de Datos I', code: 'BD-201', credits: 4 },
              { id: '3', name: 'Matemática Discreta', code: 'MATE-201', credits: 3 },
              { id: '4', name: 'Inglés Técnico', code: 'ING-201', credits: 2 },
            ]
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('¡Inscripción exitosa! Se ha registrado su solicitud para el próximo semestre.');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Ocurrió un error al procesar su solicitud. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-muted-foreground">Verificando tu estado académico...</p>
        </div>
      );
    }

    switch (status) {
      case 'eligible':
        return (
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    ¡Felicitaciones!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Cumples con los requisitos para avanzar al siguiente semestre.</p>
                  </div>
                </div>
              </div>
            </div>

            {semesterSubjects && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">{semesterSubjects.semester}</h3>
                <div className="space-y-3">
                  {semesterSubjects.subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">{subject.code} • {subject.credits} créditos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button 
                onClick={handleConfirmRegistration}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar inscripción'}
              </Button>
            </div>
          </div>
        );

      case 'not-eligible':
        return (
          <div className="space-y-6">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Requisitos no cumplidos
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>No cumples con los requisitos para avanzar al siguiente semestre.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => {
                  // In a real app, this would navigate to the recovery section
                  alert('Redirigiendo a la sección de recuperación de unidades...');
                }}
              >
                Ir a recuperación de unidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'not-available':
      default:
        return (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CalendarOff className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Inscripciones no disponibles
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Las inscripciones de semestre no están disponibles en este momento.</p>
                  <p className="mt-1">Por favor, verifica las fechas del período de inscripción.</p>
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
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
