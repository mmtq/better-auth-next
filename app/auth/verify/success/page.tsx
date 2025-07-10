import ReturnButton from "@/components/general/return-button";

export default function Page() {
    return (
        <div className="flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <ReturnButton href="/auth/login" label="Login" />
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Success
                    </h1>
                    <div className="border border-l-4 border-green-600 p-4 rounded-xl">
                        <p className="text-gray-600">
                            The verification link has been sent. Please check your email.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}