"use client";

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from './Pagination';
import { ButtonNavigate } from '@/components/shared/ButtonNavigate';
import { PencilIcon } from 'lucide-react';
import { navigate } from 'astro:transitions/client';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface StudentListTableProps {
  students: Student[];
  itemsPerPage?: number;
}

export function StudentListTable({ 
  students = [],
  itemsPerPage: initialItemsPerPage = 5 
}: StudentListTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(initialItemsPerPage);
  
  // Calcular valores de paginación
  const totalItems = students.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedStudents = students.slice(startIndex, endIndex);

  // Resetear a la primera página si los datos cambian
  useEffect(() => {
    setCurrentPage(1);
  }, [students, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Opcional: Desplazarse al inicio de la tabla
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>
                  <ButtonNavigate
                    icon={<PencilIcon className="h-4 w-4" />}
                    url={`chargeNoteStudent/${student.id}`}
                  >
                    Cargar notas
                  </ButtonNavigate>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}