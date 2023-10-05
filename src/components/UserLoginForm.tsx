"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email provided"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters")
    .regex(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/), {
      message:
        "Password must contain symbol, must have captalized letter and number",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  type LoginFormSchema = z.infer<typeof loginFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
    }
  };
  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  async function loginWithGithub() {
    setIsLoading(true);
    try {
      await signIn("github");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              {...register("email")}
              autoComplete='off'
            />
            {errors.email && (
              <p className='text-xs text-red-500'>{errors.email?.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              {...register("password")}
              autoComplete='off'
              autoFocus={false}
            />
            {errors.password && (
              <p className='text-xs text-red-500'>{errors.password?.message}</p>
            )}
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
        <Button
          variant='outline'
          type='button'
          disabled={isLoading}
          onClick={loginWithGoogle}
        >
          {isLoading ? (
            <ImSpinner8 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <AiOutlineGoogle className='mr-2 h-4 w-4' />
          )}{" "}
          Google
        </Button>
        <Button
          variant='outline'
          type='button'
          disabled={isLoading}
          onClick={loginWithGithub}
        >
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
