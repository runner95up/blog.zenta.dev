"use client";
import { Toaster } from "@/components/ui/sonner";
import { ToastContext } from "@/hooks/use-toast";
import { ReactNode, useState } from "react";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [limit, setLimit] = useState(3);
  return (
    <ToastContext.Provider
      value={{ isExpanded, setIsExpanded, limit, setLimit }}
    >
      {children}
      <Toaster
        richColors
        closeButton
        expand={isExpanded}
        visibleToasts={limit}
      />
    </ToastContext.Provider>
  );
};
