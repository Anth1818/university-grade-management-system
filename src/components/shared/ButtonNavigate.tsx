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
        "bg-primary text-primary-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "h-8 px-3 py-2 gap-1 cursor-pointer dark:bg-gray-800 dark:text-white",
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