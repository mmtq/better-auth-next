'use server'

import { db } from "./lib/db"
import { user } from "./lib/db/schema/auth-schema"

export async function getUsers() {
    const users = await db.select().from(user)
    return users
}