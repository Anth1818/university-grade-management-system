import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/Pagination";
import { ButtonNavigate } from "@/components/shared/ButtonNavigate";
import { PencilIcon } from "lucide-react";
import React from "react";

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

const PaginatedStudents = ({ students }: { students: Student[] }) => {
  return (
    <>
      {students.map((student: Student) => (
        <TableRow
          key={student.id}
          className="hover:bg-gray-50 dark:hover:bg-gray-800"
        >
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
    </>
  );
};

export default function StudentListTable({
  students = [],
  itemsPerPage: initialItemsPerPage = 5,
}: StudentListTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(initialItemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;
    return students.filter((student) =>
      student.id.toString().includes(searchTerm.trim())
    );
  }, [students, searchTerm]);

  // Calculate pagination values based on filtered students
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [students, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Buscar por ID de estudiante..."
        className="w-full max-w-md p-2 border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={searchTerm}
        min="0"
        onKeyDown={(e) => {
          // Evita la entrada de caracteres no numéricos excepto teclas de control
          if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleSearchChange}
      />
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
            {currentStudents.length > 0 ? (
              <PaginatedStudents students={currentStudents} />
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No hay estudiantes para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages >= 1 && (
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
