import ReturnButton from "@/components/general/return-button";

export default function Page() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Success
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl">
                        The verification link has been sent. Please check your email.
                    </p>
                </div>
            </div>
        </main>

    );
}