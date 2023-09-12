"use client";

import { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer position='bottom-right' className='max-w-sm' />
    </>
  );
};

export default Providers;
