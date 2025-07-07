import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, adminClient} from 'better-auth/client/plugins'
import type {auth} from '@/lib/auth'
import { nextCookies } from 'better-auth/next-js'
import { roles, ac } from '@/lib/permissions'

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient({
            ac,
            roles  
        }),
        nextCookies()
    ]
})

export const {signUp, signIn, signOut, useSession, admin } = authClient