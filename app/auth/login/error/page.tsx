'use client'
import ReturnButton from "@/components/general/return-button";
import { useSearchParams } from "next/navigation"

export default function Error() {
    const errorParams = useSearchParams();
    const error =(errorParams.get('error'))
    return (
        <div className="flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                {
                    error === 'account_not_linked' && (
                        <div className="w-full max-w-md space-y-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-destructive">
                                Account is already linked
                            </h1>
                            <div className="border border-l-4 border-destructive p-4 rounded-xl">
                                <p>
                                    The account is already linked to another user. You can only link one signin method to your account
                                </p>
                            </div> 
                        </div>
                    )
                }
            </div>
        </div>
    );
}