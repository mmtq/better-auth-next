import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";
import ReturnButton from "@/components/general/return-button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkFullAccess } from "@/actions/auth-actions";
import Image from "next/image";
import { Settings } from "lucide-react";

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
    <div className="container mx-auto max-w-screen-lg space-y-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <ReturnButton href="/" label="Home" />
        {
          session.user.role === "admin" && (
            <Button asChild size={'sm'}><Link href="/admin/dashboard">Admin Dashboard</Link></Button>
          )
        }
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {
            session.user.image && (
              <div className="relative w-8 h-8">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  fill
                  className="rounded-full"
                />
              </div>
            )
          }
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
        </div>
          <Button variant={'outline'} asChild><Link href="/profile/settings"><Settings /></Link></Button>
      </div>
      <div>
        <p><span className="font-bold">Email:</span> {session.user.email}</p>
        <p><span className="font-bold">Role:</span> {session.user.role}</p>
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
