'use client'

import { signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
    const router = useRouter();

    const handleSubmit = async () => {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success('Signed out successfully');
                    router.push('/');
                }
            }
        })
        
    }
  return (
    <Button onClick={handleSubmit}>Sign out</Button>
  )
}