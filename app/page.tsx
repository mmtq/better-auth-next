import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (

    <div className="p-10">
      <h1>Home</h1>
      <p>{session?.user?.name}</p>
      <Button>Click me</Button>
    </div>
  )
}
