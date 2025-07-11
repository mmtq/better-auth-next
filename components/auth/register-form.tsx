'use client'

import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { z } from 'zod'
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ProviderButton from "../general/porvider-button"
import MagicLinkForm from "./magic-link-form"

const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com']

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z
      .string()
      .email('Enter a valid email')
      .refine((email) => {
        const domain = email.split('@')[1]
        return validEmailDomains.includes(domain)
      }, {
        message: 'Invalid email domain. Use gmail, yahoo, or outlook.',
      }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onRegisterSubmit = (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const session = await signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
        })

        const { error } = session

        if (error) {
          setApiError(error.message || 'Something went wrong')
          toast.error(error.message || 'Registration failed')
        } else {
          toast.success('Registration successful')
          router.push('/auth/login')
        }
      } catch (err) {
        toast.error('Something went wrong')
        console.error(err)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onRegisterSubmit)}
      className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-card border border-border shadow-sm space-y-2"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {apiError && (
        <p className="text-sm text-red-500 text-center">{apiError}</p>
      )}

      <MagicLinkForm  />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@gmail.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Registering...' : 'Register'}
      </Button>
      <div className="grid sm:grid-cols-1 py-2 md:grid-cols-2 gap-2">
          <ProviderButton name="google" signIn={false} />
          <ProviderButton name="github" signIn={false} />
        </div>
    </form>
  )
}
