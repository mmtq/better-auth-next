import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";
import ReturnButton from "@/components/general/return-button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkFullAccess } from "@/actions/auth-actions";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const hasFullAccess = await checkFullAccess({
    id: session.user.id,
    permissions: ["update", "delete"],
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <ReturnButton href="/" label="Home" />
        {
          session.user.role === "admin" && (
            <Button asChild size={'sm'}><Link href="/admin/dashboard">Admin Dashboard</Link></Button>
          )
        }
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <SignOutButton />
      </div>
      <div className="flex gap-4">
        <Button>Manage own posts</Button>
        <Button disabled={!hasFullAccess}>Manage all posts</Button>
      </div>
      <pre className="overflow-auto w-full bg-muted text-sm rounded-md p-4 border border-border">
        <code className="whitespace-pre">{JSON.stringify(session, null, 2)}</code>
      </pre>

    </div>
  );
}
