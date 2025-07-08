'use client';

import { checkFullAccess, getUsers } from "@/actions/auth-actions";
import BanUserButton from "@/components/general/ban-user-button";
import BanUserButtonDisabled from "@/components/general/ban-user-button-disabled";
import DeleteUserButton from "@/components/general/delete-user-button";
import DeleteUserDisabled from "@/components/general/delete-user-disabled";
import ReturnButton from "@/components/general/return-button";
import RoleSelector from "@/components/general/role-selector";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    id: string;
}

export default function Dashboard() {
    const [userList, setUserList] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const { data: session } = useSession(); // if useSession supports status
    const [hasFullAccess, setHasFullAccess] = useState(false);
    const user = session?.user;

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchUsers();
        }

        if (user?.id) {
            const fetchFullAccess = async () => {
                const res = await checkFullAccess({ id: user.id, permissions: ['update', 'delete'] });
                setHasFullAccess(res);
            };
            fetchFullAccess();
        }

    }, [user?.role, user?.id]);

    if (!session) {
        return (
            <main>
                <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                    <h1 className="text-2xl font-bold">Loading session...</h1>
                </div>
            </main>
        );
    }
    if (!user || user.role !== 'admin') {
        return (
            <main>
                <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                    <h1 className="text-2xl font-bold">Unauthorized</h1>
                </div>
            </main>
        );
    }

    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        const users = await getUsers();
        const sortedUsers = users.sort((a, b) => {
            if (a.role === 'admin' && b.role !== 'admin') return -1;
            if (a.role !== 'admin' && b.role === 'admin') return 1;
            return 0
        })
        setUserList(sortedUsers);
        setIsLoadingUsers(false);
    };

    const handleUserDelete = (id: string) => {
        setUserList(prev => prev.filter(user => user.id !== id));
    };
    const handleUserBan = (id: string) => {
        setUserList(prev =>
            prev.map(user =>
                user.id === id
                    ? { ...user, banned: true }
                    : user));
    }

    const handleRoleChange = (id: string) => {
        setUserList(prev =>
            prev.map(user =>
                user.id === id
                    ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
                    : user));
    }

    return (
        <main>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <ReturnButton href="/profile" label="Profile" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex flex-row justify-start gap-4">
                    <Button>Manage own posts</Button>
                    <Button disabled={!hasFullAccess}>Manage all posts</Button>
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
                                        {/* <TableCell>{user.role}</TableCell> */}
                                        <TableCell><RoleSelector initialRole={user.role || 'user'} id={user.id} onRoleChange={handleRoleChange} /></TableCell>
                                        <TableCell>
                                            {
                                                user.role !== 'admin' ? (
                                                    <div className="flex gap-2">
                                                        <DeleteUserButton id={user.id} onDelete={handleUserDelete} />
                                                        {
                                                            user.banned ? (
                                                                <BanUserButtonDisabled />
                                                            ) : (
                                                                <BanUserButton id={user.id} onBan={handleUserBan} />
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <DeleteUserDisabled />
                                                        <BanUserButtonDisabled />
                                                    </div>
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
