'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth-client'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [apiError, setApiError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onLoginSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      try {
        const { error } = await signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: true,
        })

        if (error) {
          console.error(error)
          setApiError(error.message || 'Something went wrong')
          toast.error(error.message || 'Login failed')
        } else {
          toast.success('Login successful')
          router.push('/profile')
        }
      } catch (err) {
        toast.error('Something went wrong')
        console.error(err)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-card border border-border shadow-sm space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Sign in to your account</h2>
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {apiError && (
        <p className="text-sm text-red-500 text-center">{apiError}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email')}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register('password')}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
