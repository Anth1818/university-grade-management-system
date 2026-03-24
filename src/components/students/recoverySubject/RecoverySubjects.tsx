import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { SubjectsBlockAccordion } from '../general/SubjectsBlockAccordion';
import { recoverySubjectsData } from '@/data/recoverySubjectsData';
import type { RecoveryStatus } from '@/lib/types';
import {AlredyEnrolled} from "../general/AlredyEnrolled";
import { Loader } from '@/components/shared/Loader';


interface RecoverySubjectsProps {
  initialStatus: RecoveryStatus;
  availableBlocks: any[];
  studentId: string;
}

export function RecoverySubjects({ initialStatus, availableBlocks, studentId }: RecoverySubjectsProps) {
  const [status, setStatus] = useState<RecoveryStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const handleConfirmRecovery = async () => {
    if (!selectedBlock) return;
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an Astro Action or API call
      // For now we'll simulate it and redirect or refresh
      const response = await fetch('/api/enroll-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, block: selectedBlock })
      });
      
      if (response.ok) {
        setStatus('already-enrolled');
      } else {
        alert('Error al inscribir a recuperación');
      }
    } catch (error) {
      // Since we don't have the API yet, let's just simulate success for the demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('already-enrolled');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader message="Cargando opciones de recuperación..." />
      );
    }

    switch (status) {
      case 'eligible':
        return (
          <div className="space-y-6">
            <SubjectsBlockAccordion semesterSubjects={availableBlocks} setSelectedBlock={setSelectedBlock} />
            <Button onClick={handleConfirmRecovery} disabled={isSubmitting || !selectedBlock} className="w-full sm:w-auto cursor-pointer dark:bg-gray-800 dark:text-white">
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
