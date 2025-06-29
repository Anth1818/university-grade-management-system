import { ButtonDownload } from "@/components/shared/ButtonDownload";

export const DownloadTeacherCardButton = () => {
    return (
        <ButtonDownload id="print-button-teacher-card" className="mt-4" onClick={() => window.print()} />
    );
};