'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import * as z from 'zod';

// Validation Schema
const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' })
});

// Type Definition
type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm({ onToggle }: { onToggle: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      console.log('Sign In data:', data);
      toast.success('Signed in successfully!');
    } catch (error) {
      toast.error('Invalid credentials, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md'>
      <h2 className='text-center text-2xl font-bold'>Welcome Back</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your email'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Enter your password'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={loading}
            className='bg-brand-400 hover:bg-brand-400/80 mt-2 w-full text-white transition active:scale-95'
          >
            Sign In
          </Button>
          <div className='mt-4 text-center'>
            Don't have an account?{' '}
            <button
              type='button'
              onClick={onToggle}
              className='text-brand-400 font-medium hover:underline'
            >
              Sign Up
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
