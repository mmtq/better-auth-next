import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <p className="text-red-500">Not signed in</p>;
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl">Profile</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <SignOutButton />
    </div>
  );
}
