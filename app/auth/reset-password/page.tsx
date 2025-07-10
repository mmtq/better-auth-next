'use client';

import { useState, useTransition } from "react";
import { z } from 'zod'
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReturnButton from "@/components/general/return-button";
import { forgotPasswordAction, resetPasswordAction } from "@/actions/auth-actions";
import { toast } from "sonner";
import path from "path";

const emailSchema = z.object({
    password : z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword : z.string().min(6, 'Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
})

interface Props {

}

const SendVerificationEmailForm = ({ }: Props) => {
    const sp = useSearchParams()
    const token = sp.get('token')
    if (!token) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4 bg-background">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Invalid Token</h2>
                </div>
            </main >
        );
    }
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    })
    const handleClick = () => {
        startTransition(async () => {
            try {
                const result = emailSchema.safeParse(form)
                if (!result.success) {
                    toast.error(result.error.issues[0].message)
                    return
                }
                const res = await resetPasswordAction({
                    password: form.password,
                    token: token
                })
                if (res.success) {
                    toast.success(res.message)
                    router.push('/auth/login')
                } else {
                    toast.error(res.error)
                }
            } catch (err) {
                console.error(err)
                toast.error('Something went wrong')
            }
        })
    }
    return (

        <div className="flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Reset Password</h2>
                <div className="border border-t-4 border-blue-400 p-4 rounded-xl">
                    <form className="max-w-sm w-full space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" onChange={(e)=> setForm({...form, password: e.target.value})} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="Confirm your password" onChange={(e)=> setForm({...form, confirmPassword: e.target.value})} />
                        </div>
                        <Button type="submit" disabled={isPending} onClick={handleClick}>Reset Password</Button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default SendVerificationEmailForm;