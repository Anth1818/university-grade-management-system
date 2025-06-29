import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface EvaluationItem {
  id: number;
  name: string;
  topic: string;
  description: string;
  percentage: string;
  date: string;
}

const EvaluationPlanForm = () => {
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([
    { id: 1, name: '', topic: '', description: '', percentage: '', date: '' },
    { id: 2, name: '', topic: '', description: '', percentage: '', date: '' },
    { id: 3, name: '', topic: '', description: '', percentage: '', date: '' },
    { id: 4, name: '', topic: '', description: '', percentage: '', date: '' },
  ]);
  
  // Initial evaluations are the first 4 items
  const isInitialEvaluation = (id: number) => id <= 4;

  const handleInputChange = (id: number, field: keyof EvaluationItem, value: string | number) => {
    setEvaluations(evaluations.map(evalItem => 
      evalItem.id === id ? { ...evalItem, [field]: value } : evalItem
    ));
  };

  const addEvaluation = () => {
    if (evaluations.length >= 6) return;
    
    const newId = evaluations.length > 0 ? Math.max(...evaluations.map(e => e.id)) + 1 : 1;
    setEvaluations([
      ...evaluations,
      { id: newId, name: '', topic: '', description: '', percentage: '', date: '' }
    ]);
  };

  const removeEvaluation = (id: number) => {
    // Only allow removing non-initial evaluations
    if (id <= 4) return;
    
    setEvaluations(evaluations.filter(evalItem => evalItem.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Evaluation Plan Submitted:', evaluations);
    // Here you would typically make an API call to save the evaluation plan
  };

    const handlePercentageChange = (id: number, value: number) => {
      // Value is now passed directly as a number
      // Allow a number between 0 and 20
      if (value >= 0 && value <= 25) {
        handleInputChange(id, 'percentage', value.toString());
      }
    };

  return (
    <Card className={cn("w-full font-cascadia-code")}>
      <CardHeader>
        <CardTitle>Plan de Evaluación</CardTitle>
        <CardDescription>
          Configure las evaluaciones para esta sección
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div className="space-y-4 ">
            {evaluations.map((evalItem) => (
              <div key={evalItem.id} className="w-full min-w-[800px] md:min-w-0 space-y-4 border rounded-lg p-4 bg-muted/20">
                <h3 className="text-lg font-semibold">Evaluación {evaluations.findIndex((e: EvaluationItem) => e.id === evalItem.id) + 1}</h3>
                <div className="flex flex-col md:flex-row gap-4 items-end w-full">
                  <div className="space-y-2 flex-1 w-full">
                    <Label>Nombre de la evaluación</Label>
                    <Input
                      placeholder="Ej: Parcial 1"
                      value={evalItem.name}
                      onChange={(e) => handleInputChange(evalItem.id, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <Label>Tema de la evaluación</Label>
                    <Input
                      placeholder="Ej: Fundamentos de programación"
                      value={evalItem.topic}
                      onChange={(e) => handleInputChange(evalItem.id, 'topic', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <Label>Porcentaje (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="25"
                      className="notNumberArrows"
                      value={evalItem.percentage}
                      onChange={(e) => handlePercentageChange(evalItem.id, Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <Label>Fecha</Label>
                    <Input
                      type="date"
                      value={evalItem.date}
                      onChange={(e) => handleInputChange(evalItem.id, 'date', e.target.value)}
                      required
                    />
                  </div>

                  {!isInitialEvaluation(evalItem.id) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEvaluation(evalItem.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 h-10 w-10 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <Label>Descripción</Label>
                  <Textarea
                    placeholder="Detalles adicionales de la evaluación..."
                    value={evalItem.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                      handleInputChange(evalItem.id, 'description', e.target.value)
                    }
                    className="min-h-[160px] resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {evaluations.length < 6 && (
            <Button
              type="button"
              variant="outline"
              onClick={addEvaluation}
              className="w-full md:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir más evaluaciones
            </Button>
          )}

          <div className="flex justify-end">
            <Button type="submit">Guardar Plan de Evaluación</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EvaluationPlanForm;