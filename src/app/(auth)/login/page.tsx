import { UserAuthForm } from "@/components/UserLoginForm";
import Link from "next/link";
import React from "react";

const LoginAuthenticationPage = () => {
  return (
    <>
      <div className='container relative min-h-screen flex flex-col items-center justify-center md:grid md:mt-0 lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-primary' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            BuzzLine
          </div>
          <div className='relative z-20 flex flex-col justify-center sm:max-w-[640px] mt-[30vh]'>
            <h1 className='text-5xl font:bold mb-8'>
              Start your messaging journey with us.
            </h1>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                Discover your friends and find new connections leading to future
                conversations.
              </p>
            </blockquote>
          </div>
        </div>
        <div className='xs:mt-10 lg:p-8 '>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Sign in to your account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email below to signin to your account
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking continue, you agree to our{" "}
              <Link
                href='/terms'
                className='underline underline-offset-4 hover:text-foreground'
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href='/privacy'
                className='underline underline-offset-4 hover:text-foreground'
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className='px-8 text-center text text-muted-foreground mt-auto'>
              Don<span>&#39</span>t have an account?{" "}
              <Link
                href='/signup'
                className='hover:text-foreground font-medium'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAuthenticationPage;
