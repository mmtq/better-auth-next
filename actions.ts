'use server'

import { headers } from "next/headers"
import { db } from "./lib/db"
import { user } from "./lib/db/schema/auth-schema"
import { auth } from "./lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    const users = await db.select().from(user)
    return users
}

export async function deleteUser(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user || session?.user?.role !== 'ADMIN') {
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
