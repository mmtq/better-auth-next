'use client';

import { useSession } from "@/lib/auth-client";
import SignOutButton from "../auth/sign-out-button";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  
}

const NavSign = ({  }: Props) => {
    const session = useSession()
    const isAuthenticated = session?.data?.user
  return (
     <div>
         {
            isAuthenticated ? (
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