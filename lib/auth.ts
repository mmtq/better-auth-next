import {betterAuth} from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from './db/schema/auth-schema'
// import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
    database: drizzleAdapter(db,{
        provider: 'pg',
        schema: {
            ...schema
        }
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        requireEmailVerification: false,
        autoSignIn: false,
//-------to change password hashing algorithm--------
    // -> set up a hashing and verification method with argon2 or bcrypt
        // password: {
        //     hash: ......
        //     verify: ...
        // }
    },
    session: {
        expiresIn: 30*24*60*60,
    },
    
    advanced: {
        database: {
            generateId: () => {
                return crypto.randomUUID()
            }
        },
    },
//  if you want to use SignInEmail or SignUpEmail in Server Actions, cookies won't be set automatically.
    // plugins: [nextCookies()] 
    
})