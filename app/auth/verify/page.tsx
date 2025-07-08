'use client'
import ReturnButton from "@/components/general/return-button";
import SendVerificationEmailForm from "@/components/general/send-verification-email-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const Params = useSearchParams();
    const error = Params.get('error');
    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Verify your email
                    </h1>
                    {
                        error && (
                        error === 'invalid_token' || error === 'token_expired'
                        ? (
                            <p className="text-destructive">
                                The verification link is invalid or has expired.
                            </p>
                        )
                        : (
                            <p className="text-destructive">
                                Oops! Something went wrong. Please try again.
                            </p>
                        )
                    )
                    }

                    <SendVerificationEmailForm />

                </div>
            </div>
        </main>

    );
}