'use client'
import ReturnButton from "@/components/general/return-button";
import { useSearchParams } from "next/navigation"

export default function Error() {
    const errorParams = useSearchParams();
    const error =(errorParams.get('error'))
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                {
                    error === 'account_not_linked' && (
                        <div className="w-full max-w-md space-y-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Account is already linked to another signin method
                            </h1>
                            <p className="text-gray-600 text-lg md:text-xl">
                                You can only link one signin method to your account
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}