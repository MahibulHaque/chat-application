"use client";

import * as React from "react";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-1'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <ImSpinner8 className='mr-2 h-4 w-4 animate-spin' />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <Button variant='outline' type='button' disabled={isLoading}>
          {isLoading ? (
            <ImSpinner8 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <AiOutlineGoogle className='mr-2 h-4 w-4' />
          )}{" "}
          Github
        </Button>
        <Button variant='outline' type='button' disabled={isLoading}>
          {isLoading ? (
            <ImSpinner8 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <AiOutlineGithub className='mr-2 h-4 w-4' />
          )}{" "}
          Github
        </Button>
      </div>
    </div>
  );
}