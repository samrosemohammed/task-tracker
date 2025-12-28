import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}
export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div className={`${cn("max-w-screen-xl mx-auto p-4", className)}`}>
      {children}
    </div>
  );
};
