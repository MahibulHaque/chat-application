"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster richColors closeButton={true} duration={2000} />
      {children}
    </>
  );
};

export default Providers;
