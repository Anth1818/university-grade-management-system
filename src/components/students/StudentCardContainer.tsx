import { ButtonDownload } from "../shared/ButtonDownload";
import { StudentCardId } from "./StudentCard";

export const StudentCardContainer = () => {
  const handleDownload = () => {
    console.log("Descargando carnet estudiantil...");
    alert("Descargando carnet...");
    // Aquí puedes agregar la lógica de descarga real si la tienes.
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-xl font-semibold mb-4">Carne estudiantil</h2>
      <StudentCardId
        name="Anthony"
        lastName="Ruiz"
        studentId="12345678"
        program="Ingeniería en Informática"
        campus="Principal"
        universityName="UNIVERSIDAD AUTÓNOMA RUIZ"
      />
      <ButtonDownload className="mt-4" onClick={handleDownload} />
    </div>
  );
};
