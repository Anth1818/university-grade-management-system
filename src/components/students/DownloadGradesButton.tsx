'use client';

import { ButtonDownload } from "@/components/shared/ButtonDownload";

export const DownloadGradesButton = () => {
  const handleDownloadGrades = () => {
    alert('Descargando notas en PDF...');
    // Aquí iría la lógica real de descarga
  };

  return (
    <ButtonDownload onClick={handleDownloadGrades} />
  );
};