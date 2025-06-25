'use client';

import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";


interface ButtonNavigateProps {
  className?: string;
  id?: string;
  url: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ButtonNavigate = ({ className, id, url, children, icon }: ButtonNavigateProps) => {
  return (
    <a 
      id={id}
      href={url}
      className={cn(
        "button-styles-main",
        className
      )}
    >
      {icon ? icon : <Navigation />}

      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {children}
      </span>
    </a>
  );
};