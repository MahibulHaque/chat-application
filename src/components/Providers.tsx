"use client";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ProgressBar
        height='3px'
        color='#7C3AED'
        options={{ showSpinner: true }}
        shallowRouting
      />
      <Toaster richColors closeButton={true} duration={2000} />
      {children}
    </>
  );
};

export default Providers;
