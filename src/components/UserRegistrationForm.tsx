"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { ImSpinner8 } from "react-icons/im";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
  AiOutlineGoogle,
} from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserRegistrationFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

const registrationFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, { message: "Username can't be greater than 20 characters." }),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters")
      .regex(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/), {
        message:
          "Password must contain symbol, must have captalized letter and number",
      }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function UserRegistrationForm({
  className,
  ...props
}: UserRegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
  });

  async function signupWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/signup" });
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
      setShowPassword(false);
      setShowConfirmedPassword(false);
    }
  }
  async function signupWithGithub() {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/signup" });
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
      setShowPassword(false);
      setShowConfirmedPassword(false);
    }
  }

  const onSubmit: SubmitHandler<RegistrationFormSchema> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });
      if (res.status !== 201) {
        toast.error(res.text());
      } else {
        toast.success("Account created succesfully");
        router.push("/login");
      }
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
      setShowPassword(false);
      setShowConfirmedPassword(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-4 grid '>
        <div className='grid gap-2'>
          <Label htmlFor='username'>Username</Label>
          <Input
            id='username'
            type='text'
            placeholder='John Doe'
            {...register("username")}
          />
          {errors.username && (
            <p className='text-xs text-red-500'>{errors.username?.message}</p>
          )}
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            {...register("email")}
          />
          {errors.email && (
            <p className='text-xs text-red-500'>{errors.email?.message}</p>
          )}
        </div>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='flex items-center justify-between gap-2'>
              <Input
                id='password'
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              ) : (
                <AiOutlineEye
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              )}
            </div>
            {errors.password && (
              <p className='text-xs text-red-500'>{errors.password?.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Re-type Password</Label>
            <div className='flex items-center justify-between gap-2'>
              <Input
                id='confirmPassword'
                type={showConfirmedPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />
              {showConfirmedPassword ? (
                <AiOutlineEyeInvisible
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => {
                    setShowConfirmedPassword((prev) => !prev);
                  }}
                />
              ) : (
                <AiOutlineEye
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => {
                    setShowConfirmedPassword((prev) => !prev);
                  }}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className='text-xs text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <ImSpinner8 className='mr-2 h-4 w-4 animate-spin' />}
            Sign Up with Email
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
          onClick={signupWithGoogle}
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
          onClick={signupWithGithub}
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
