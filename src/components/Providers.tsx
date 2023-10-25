"use client";

import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

const PageProgressbar = dynamic(() => import("../lib/progressbar"), {
  ssr: false,
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <PageProgressbar />
      <Toaster richColors closeButton={true} duration={2000} />
      {children}
    </>
  );
};

export default Providers;
