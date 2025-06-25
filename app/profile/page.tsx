import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";
import ReturnButton from "@/components/general/return-button";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <p className="text-red-500">Not signed in</p>;
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 overflow-hidden">
      <ReturnButton href="/" label="Home" />
      <h1 className="text-2xl font-bold">Profile</h1>
      <pre className="overflow-auto w-full bg-muted text-sm rounded-md p-4 border border-border">
        <code className="whitespace-pre">{JSON.stringify(session, null, 2)}</code>
      </pre>

      <SignOutButton />
    </div>
  );
}
