'use client';

import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";


interface ButtonNavigateProps {
  className?: string;
  id?: string;
  url: string;
  children: React.ReactNode;
}

export const ButtonNavigate = ({ className, id, url, children }: ButtonNavigateProps) => {
  return (
    <Button 
      id={id}
      type="button"
      size="sm" 
      className={cn("h-8 gap-1 cursor-pointer dark:bg-gray-800 dark:text-white", className)}
      onClick={() => {
        window.location.href = url;
      }}
    >
      <Navigation className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {children}
      </span>
    </Button>
  );
};