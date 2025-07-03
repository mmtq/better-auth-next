'use server'

import { headers } from "next/headers"
import db from "./lib/db"
import { user } from "./lib/db/schema/auth-schema"
import { auth } from "./lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    const {users} = await auth.api.listUsers({
        query: {
            
        },
        headers: await headers()
    })
    console.log('users', users)
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
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })

    // if (!session?.user || session?.user?.role !== 'admin') {
    //     return { success: false, error: 'Unauthorized' };
    // }


    // try {
    //     console.log('tried', id)
    //     const bannedUser = await me.banUser({
    //         userId: id,
    //         fetchOptions: {
    //             headers: await headers()
    //         },
    //         banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
    //         banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
    //     });

    //     console.log("bannedUser ", bannedUser);

    //     revalidatePath('/admin/dashboard');
    //     return {
    //         success: true,
    //         rowCount: 1,
    //     };

    // } catch (error) {
    //     console.error(error);
    //     return {
    //         success: false,
    //         error: error instanceof Error ? error.message : 'Unknown error',
    //     };
    // }

    const bannedUser =  await auth.api.banUser({
        body: {
            userId: id,
            banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
            banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
        },
        headers: await headers()
    })
    console.log('id: ', id)
    console.log("bannedUser ", bannedUser);
    
}