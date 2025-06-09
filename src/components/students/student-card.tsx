import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QrCode } from "lucide-react";
import logo from "@/assets/uar-logo.png?url"

interface StudentCardProps {
  name: string;
  lastName: string;
  studentId: string;
  program: string;
  campus: string;
  universityName: string;
  photoUrl?: string;
}

export const StudentCardId = ({
  name,
  lastName,
  studentId,
  program,
  campus,
  universityName,
  photoUrl,
}: StudentCardProps) => {
  return (
    <Card className="w-72 h-auto bg-background text-foreground border-2 border-primary/80 rounded-lg overflow-hidden flex flex-col shadow-lg">
      {/* University Header */}
      <div className="bg-primary text-primary-foreground py-2 px-3 text-center">
        <h2 className="font-bold text-sm">{universityName}</h2>
      </div>
      
      <CardContent className="flex-1 p-4 flex flex-col items-center justify-between gap-4">
        {/* Photo and Basic Info */}
        <div className="flex flex-col items-center space-y-3 w-full">
          <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden bg-background flex items-center justify-center shadow-sm">
            {photoUrl ? (
              <img src={photoUrl} alt={`${name} ${lastName}`} className="w-full h-full object-cover" />
            ) : (
              <Avatar className="w-full h-full">
                <AvatarFallback className="text-primary text-base font-medium bg-primary/10">
                  {name[0]}{lastName[0]}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <div className="text-center space-y-0.5">
            <h3 className="text-lg font-bold text-foreground">{name} {lastName}</h3>
            <p className="text-xs text-muted-foreground font-medium">ID: {studentId}</p>
          </div>
        </div>
        
        {/* Program and Campus */}
        <div className="w-full space-y-2.5 px-2">
          <div className="border-b border-primary/30 pb-2">
            <p className="text-xs text-muted-foreground font-medium">Carrera</p>
            <p className="text-sm font-semibold text-foreground">{program}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Campus</p>
            <p className="text-sm font-semibold text-foreground">{campus}</p>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="w-20 h-20 bg-background border border-primary/30 rounded flex items-center justify-center mt-1 shadow-sm">
          <QrCode className="w-14 h-14 text-primary" />
        </div>
        
        {/* University Logo */}
          <img src={logo} alt="Logo" className="w-15 m-auto rounded-xl" />
      </CardContent>
    </Card>
  );
};
