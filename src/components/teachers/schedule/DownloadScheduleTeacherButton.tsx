'use client';

import { ButtonDownload } from "@/components/shared/ButtonDownload";

export  const DownloadScheduleTeacherButton = () => {
  const handleDownloadScheduleTeacher = () => {
    alert('Descargando horario en PDF...');
    // Aquí iría la lógica real de descarga
  };

  return (
    <ButtonDownload onClick={handleDownloadScheduleTeacher} />
  );
};