'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SignUpForm from './sign-up-form';
import { useState } from 'react';
import SignInForm from './sign-in-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='auth-bg absolute inset-0' />
        <div className='absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent opacity-50' />

        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={40}
            height={40}
            className='w-40'
          />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              "Megha Express is here to revolutionize your shipping experience
              with speed, reliability, and convenience"
            </p>
            <footer className='text-sm'>Megha Express Team</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center sm:w-[400px]'>
          {isSignUp ? (
            <SignUpForm onToggle={() => setIsSignUp(false)} />
          ) : (
            <SignInForm onToggle={() => setIsSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
