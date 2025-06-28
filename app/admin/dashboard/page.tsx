import { getUsers } from "@/actions";
import ReturnButton from "@/components/general/return-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { DeleteIcon, Edit } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return redirect("/auth/login")
    }

    if (session?.user?.role !== "ADMIN") {
        return redirect("/")
    }

    const users = await getUsers()
    console.log(users)
    return (
        <main>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <ReturnButton href="/profile" label="Profile" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Users</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Serial</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    {/* <TableCell>{user.id}</TableCell> */}
                                    <TableCell>{users.indexOf(user) + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <DeleteIcon height={20} />
                                            {/* <Edit height={20} /> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </div>
        </main>
    );
}