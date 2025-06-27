import {betterAuth} from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from './db/schema/auth-schema'
import { createAuthMiddleware, APIError } from 'better-auth/api'
import { normalizeName, VALID_DOMAINS } from './utils'
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
    hooks: {
        before: createAuthMiddleware( async (ctx) =>{
            if (ctx.path === '/sign-up/email'){
                const email = ctx.body.email as string
                const domain = email.split('@')[1]
                if (!VALID_DOMAINS().includes(domain)){
                throw new APIError("BAD_REQUEST", {
                    message: "Invalid email domain. Use gmail, yahoo, or outlook."
                })
                }

                const name = normalizeName(ctx.body.name as string)
                // ctx.body.name = name
                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name
                        }
                    }
                }
            }
        })
    },
    user: {
        additionalFields:{
            role: {
                type: ["USER", "ADMIN"],
                input: false
            }
        }
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

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"