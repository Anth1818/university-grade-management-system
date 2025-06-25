"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const handleFirstPage = () => onPageChange(1);
  const handlePrevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => onPageChange(totalPages);

  return (
    <div className="flex items-center justify-between w-full px-4">
      <div className="text-sm text-muted-foreground">
        Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} estudiantes
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={handleFirstPage}
          disabled={currentPage <= 1}
          aria-label="Primera página"
          className="cursor-pointer dark:hover:bg-gray-800"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">Primera página</span>
        </Button>
        <Button  
          size="sm" 
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          aria-label="Página anterior"
          className="cursor-pointer dark:hover:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>
        <span className="px-3 py-2 text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <Button 
          size="sm" 
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Siguiente página"
          className="cursor-pointer dark:hover:bg-gray-800"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente página</span>
        </Button>
        <Button 
          size="sm" 
          onClick={handleLastPage}
          disabled={currentPage >= totalPages}
          aria-label="Última página"
          className="cursor-pointer dark:hover:bg-gray-800"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Última página</span>
        </Button>
      </div>
    </div>
  );
}