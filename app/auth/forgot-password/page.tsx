'use client';

import { useState, useTransition } from "react";
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReturnButton from "@/components/general/return-button";
import { forgotPasswordAction } from "@/actions/auth-actions";
import { toast } from "sonner";

const emailSchema = z.string().email('Enter a valid email')

interface Props {

}

const SendVerificationEmailForm = ({ }: Props) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState('')
    const handleClick = () => {
        startTransition(async () => {
            try {
                const result = emailSchema.safeParse(email)
                if (!result.success) {
                    toast.error(result.error.issues[0].message)
                    return
                }
                const res = await forgotPasswordAction(email)
                if (res.success) {
                    toast.success(res.message)
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

        <main className="flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Forgot Password</h2>
                <p className="text-gray-600">Enter your email and we'll send you a link to reset your password</p>
                <div className="border border-t-4 border-blue-400 p-4 rounded-xl">
                    <form className="max-w-sm w-full space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <Button type="submit" disabled={isPending} onClick={handleClick}>Reset Password</Button>
                    </form>
                </div>
            </div>
        </main >
    );
};

export default SendVerificationEmailForm;