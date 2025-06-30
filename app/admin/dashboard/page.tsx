'use client';

import { getUsers } from "@/actions";
import DeleteUserButton from "@/components/general/delete-user-button";
import DeleteUserDisabled from "@/components/general/delete-user-disabled";
import ReturnButton from "@/components/general/return-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSession } from "@/lib/auth-client";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function Dashboard() {
    const [userList, setUserList] = useState<User[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const { data: session } = useSession(); // if useSession supports status

    const user = session?.user;

    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        const users = await getUsers();
        setUserList(users);
        setIsLoadingUsers(false);
    };

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetchUsers();
        }
    }, [user?.role]);

    if (!session) {
        return (
            <main>
                <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                    <h1 className="text-2xl font-bold">Loading session...</h1>
                </div>
            </main>
        );
    }

    if (!user || user.role !== 'ADMIN') {
        return (
            <main>
                <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                    <h1 className="text-2xl font-bold">Unauthorized</h1>
                </div>
            </main>
        );
    }

    const handleUserDelete = (id: string) => {
        setUserList(prev => prev.filter(user => user.id !== id));
    };


    return (
        <main>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <ReturnButton href="/profile" label="Profile" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-xl font-bold mb-4">Users</h2>
                        <RefreshCcw className="cursor-pointer" onClick={fetchUsers} />
                    </div>
                    {isLoadingUsers ? (
                        <p>Loading users...</p>
                    ) : (
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
                                {userList.map((user, idx) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            {
                                                user.role !== 'ADMIN' ? (
                                                    <DeleteUserButton id={user.id} onDelete={handleUserDelete} />
                                                ) : (
                                                    <DeleteUserDisabled />
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </main>
    );
}
