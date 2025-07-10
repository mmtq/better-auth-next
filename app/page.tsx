import { checkFullAccess } from "@/actions/auth-actions";
import SignOutButton from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;

  return (
    <div className="flex py-10 flex-col items-center justify-center text-center gap-6 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {user ? `Welcome, ${user.name}!` : "Welcome to Our Platform"}
      </h1>

      <p className="text-muted-foreground text-lg md:text-xl">
        {user
          ? "You're logged in. Start exploring your dashboard or manage your profile."
          : "Create your account or log in to access powerful tools and features."}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        {user ? (
          <>
            <Button asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>
            <form action="/api/auth/signout" method="post">
              <SignOutButton />
            </form>
          </>
        ) : (
          <>
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
