'use client'

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { z } from 'zod'
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z
      .string()
      .email('Enter a valid email')
      .refine((email) => {
        const domain = email.split('@')[1];
        return validEmailDomains.includes(domain);
      }, {
        message: 'Invalid email domain. Use gmail, yahoo, or outlook.',
      }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });


type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const session = await signUp.email({
          name: data.name,
          email: data.email,
          password: data.password
        });

        const { error } = session;
        console.log(session);

        if (error) {
          setApiError(error.message || 'Something went wrong');
          toast.error(apiError);
        } else {
          toast.success('Registration successful');
          router.push('/auth/login');
        }

      } catch (err) {
        toast.error('Something went wrong');
        console.error(err);
      }
    });
  };

  return (
    <form className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border space-y-2" onSubmit={handleSubmit(onRegisterSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="Enter your name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input id="confirm-password" type="password" placeholder="Confirm your password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </Button>
      <p className="text-sm text-muted-foreground">Already have an account? <Link className="text-blue-500" href="/auth/login">Login</Link></p>
    </form>

  );
}
