import { auth } from "@/lib/auth";
import SignOutButton from "../auth/sign-out-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { headers } from "next/headers";

interface Props {
  
}

const NavSign = async ({  }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const notAuthenticated = !session?.user
  return (
     <div>
         {
            !notAuthenticated ? (
                <SignOutButton />
            ) : (
                <div className="flex items-center gap-4">
                    <Button asChild size={'sm'}><Link href="/auth/login">Login</Link></Button>
                </div>
            )
         }
     </div>
  )
}

export default NavSign;