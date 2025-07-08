'use client';

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { resendVerificationEmailAction } from "@/actions/auth-actions";
import { toast } from "sonner";

interface Props {
  
}

const SendVerificationEmailForm = ({  }: Props) => {
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState('')
    const handleClick = () => {
        startTransition( async() => {
            try {
                const res = await resendVerificationEmailAction(email)
                if(res.success) {
                    toast.success('Verification email sent successfully')
                } else {
                    toast.error('Error sending verification email')
                }
            } catch (error) {
                toast.error('Error sending verification email')
            }
        })
    }
  return (
    <form className="max-w-sm w-full space-y-4">
        <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <Button type="submit" disabled={isPending} onClick={handleClick}>Resend verification email</Button>
    </form>
  );
};

export default SendVerificationEmailForm;