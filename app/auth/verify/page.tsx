import ReturnButton from "@/components/general/return-button";
import SendVerificationEmailForm from "@/components/general/send-verification-email-form";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{error: string}>
}

export default async function Page({searchParams}: Props) {
    const {error} = await searchParams
    if(!error){
        redirect('/auth/login')
    } else {
        console.log(error)
    }
    return (
        <main className=" flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Verify your email
                    </h1>
                    {
                        (error === 'invalid_token' || error === 'token_expired')
                        ?
                        (<p className="text-destructive">
                            The verification link is invalid or has expired.
                        </p>): error === 'email_not_verified'
                        ?
                        (<p className="text-destructive">
                            Verify your email or resend the verification email.
                        </p>) : null
                    }
                    <SendVerificationEmailForm />

                </div>
            </div>
        </main>

    );
}