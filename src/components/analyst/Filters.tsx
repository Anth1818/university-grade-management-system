import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: {
    career: string;
    semester: string;
    block: string;
    turn: string;
  }) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState({
    career: "Ingeniería en Sistemas",
    semester: "1",
    block: "A",
    turn: "Mañana",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };


  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-center items-center gap-4">
          <div className="space-y-2">
            <Label htmlFor="career">Carrera</Label>
            <Select
              onValueChange={(value) => handleFilterChange('career', value)}
              value={filters.career}
            >
              <SelectTrigger id="career">
                <SelectValue placeholder="Seleccionar Carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingeniería en Sistemas">Ingeniería en Sistemas</SelectItem>
                <SelectItem value="Ingeniería en Software">Ingeniería en Software</SelectItem>
                <SelectItem value="Ingeniería en Redes">Ingeniería en Redes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Select
              onValueChange={(value) => handleFilterChange('semester', value)}
              value={filters.semester}
            >
              <SelectTrigger id="semester">
                <SelectValue placeholder="Seleccionar Semestre" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}° Semestre
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shift">Turno</Label>
            <Select
              onValueChange={(value) => handleFilterChange('turn', value)}
              value={filters.turn}
            >
              <SelectTrigger id="shift">
                <SelectValue placeholder="Seleccionar Turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Mañana</SelectItem>
                <SelectItem value="afternoon">Tarde</SelectItem>
                <SelectItem value="night">Noche</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="block">Bloque</Label>
            <Select
              onValueChange={(value) => handleFilterChange('block', value)}
              value={filters.block}
            >
              <SelectTrigger id="block">
                <SelectValue placeholder="Seleccionar Bloque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center w-full">
            <Button 
              className="w-auto px-6 h-10 text-base mt-4"
              onClick={() => onFilterChange(filters)}
            >
              Buscar
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;
