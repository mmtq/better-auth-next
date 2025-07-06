'use server'

import { headers } from "next/headers"
import db from "./lib/db"
import { user } from "./lib/db/schema/auth-schema"
import { auth } from "./lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"


export async function getUsers() {
    const { users } = await auth.api.listUsers({
        query: {

        },
        headers: await headers()
    })
    return users
}

export async function deleteUser(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user || session?.user?.role !== 'admin') {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        const result = await db.delete(user).where(eq(user.id, id));
        revalidatePath('/admin/dashboard');
        // Return only plain info, NOT the full Result object
        return {
            success: result.rowCount! > 0,
            rowCount: result.rowCount,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
}

export async function banUser(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user || session?.user?.role !== 'admin') {
        return { success: false, error: 'Unauthorized' };
    }

    const bannedUser = await auth.api.banUser({
        body: {
            userId: id,
            banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
            banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
        },
        headers: await headers()
    })
}

type PostPermission = "create" | "read" | "update" | "delete" | "update:own" | "delete:own";

export const checkFullAccess = async ({ id, permissions }: { id: string, permissions: PostPermission[] }) => {
    const res = await auth.api.userHasPermission({
        body: {
            userId: id,
            permission: {
                posts: permissions
            }
        }
    })
    return res.success
}

export async function changeUserRole(id: string, role: 'admin' | 'user') {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user || session?.user?.role !== 'admin') {
        return { success: false, error: 'Unauthorized' };
    }

    if (session.user.id === id) {
        return { success: false, error: 'You cannot change your own role' };
    }

    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: id,
            permission: {
                user: ['set-role']
            }
        },
        headers: await headers()
    })
    if (hasPermission.success === false) {
        return { success: false, error: 'You do not have permission to change this user role' };
    } else {
        try {
            const result = await auth.api.setRole({
                body: {
                    userId: id,
                    role: role
                },
                headers: await headers()
            })

            if (result.user) {
                return {
                    success: true,
                    user: result.user,
                    message: 'User role updated successfully'
                }
            }

            return {
                success: false,
                error: 'Internal server error'
            }

        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }

    }

}