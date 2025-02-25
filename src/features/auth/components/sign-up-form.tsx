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

// Validation Schema
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(passwordRegex, {
        message:
          'Password must include uppercase, lowercase, number, and special character.'
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

// Type Definition
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm({ onToggle }: { onToggle: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://megha-backend.exionstech.workers.dev/api/auth/register',
        {
          id: 'MEX123459',
          name: data.name,
          email: data.email,
          password: data.password
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      toast.success('Account created successfully!');
      onToggle(); // Switch to Sign In after sign up
    } catch (error) {
      toast.error('Error creating account, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md'>
      <h2 className='text-center text-2xl font-bold'>Create a Hub Account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
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
                    placeholder='Create a password'
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
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Confirm your password'
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
            Sign Up
          </Button>
          <div className='mt-4 text-center'>
            Already have an account?{' '}
            <button
              type='button'
              onClick={onToggle}
              className='font-medium text-brand-400 hover:underline'
            >
              Sign In
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
