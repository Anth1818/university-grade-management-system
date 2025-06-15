import { ButtonDownload } from "../shared/ButtonDownload";

export const DownloadStudentCardButton = () => {
    return (
        <ButtonDownload id="print-button-student-card" className="mt-4" onClick={() => window.print()} />
    );
};