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
import axios from 'axios';
import { useAuth } from '@/components/providers/auth-provider';

// Validation Schema
const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' })
});

// Type Definition
type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm({ onToggle }: { onToggle: () => void }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://megha-backend.exionstech.workers.dev/api/auth/login',
        {
          email: data.email,
          password: data.password
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      login(response.data.token);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 space-y-4'>
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
            className='mt-2 w-full bg-brand-400 text-white transition hover:bg-brand-400/80 active:scale-95'
          >
            Sign In
          </Button>
          <div className='mt-4 text-center'>
            Don't have an account?{' '}
            <button
              type='button'
              onClick={onToggle}
              className='font-medium text-brand-400 hover:underline'
            >
              Sign Up
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
