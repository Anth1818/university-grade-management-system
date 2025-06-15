import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { SubjectsBlockAccordion } from './SubjectsBlockAccordion';
import { recoverySubjectsData } from '@/data/recoverySubjectsData';
import type { RecoveryStatus } from '@/lib/types';
import {AlredyEnrolled} from "./AlredyEnrolled";


export function RecoverySubjects() {
  const [status, setStatus] = useState<RecoveryStatus>('eligible');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleConfirmRecovery = async () => {
    if (!selectedBlock) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('already-enrolled');
    setIsSubmitting(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-muted-foreground">Cargando opciones de recuperación...</p>
        </div>
      );
    }

    switch (status) {
      case 'eligible':
        return (
          <div className="space-y-6">
            <SubjectsBlockAccordion semesterSubjects={recoverySubjectsData} setSelectedBlock={setSelectedBlock} />
            <Button onClick={handleConfirmRecovery} disabled={isSubmitting || !selectedBlock} className="w-full sm:w-auto">
              {isSubmitting ? 'Procesando...' : 'Confirmar Inscripción a Recuperación'}
            </Button>
          </div>
        );
      case 'already-enrolled':
        return <AlredyEnrolled message="Te has inscrito correctamente al período de recuperación." />
      case 'not-eligible':
      default:
        return (
          <div className="rounded-md bg-red-50 p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-red-800">No disponible</h3>
            <p className="text-sm text-red-700 mt-1">No tienes materias para recuperación o el período ha finalizado.</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inscripción a Período de Recuperación</CardTitle>
        <CardDescription>Selecciona un bloque de materias para el período de recuperación (Agosto – Septiembre).</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

export default RecoverySubjects;
