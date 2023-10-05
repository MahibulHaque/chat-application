"use client";
import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { AiOutlineLoading, AiOutlineLogout } from "react-icons/ai";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  return (
    <Button
      {...props}
      variant='ghost'
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("There was a problem signing out");
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <AiOutlineLoading className='animate-spin h-4 w-4' />
      ) : (
        <AiOutlineLogout className='w-4 h-4' />
      )}
    </Button>
  );
};
export default SignOutButton;
