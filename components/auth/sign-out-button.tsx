'use client'

import { signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
        startTransition(async () => {
            try {
                const { error } = await signOut();
                if (error) {
                    console.error(error);
                } else {
                    toast.success('Sign out successful');
                    router.push('/auth/login');
                }
            } catch (err) {
                toast.error('Something went wrong');
                console.error(err);
            }
        })
        
    }
  return (
    <Button variant={'destructive'} onClick={handleSubmit} disabled={isPending} >{isPending ? 'Signing out...' : 'Sign out'}</Button>
  )
}