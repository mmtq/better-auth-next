import { betterAuth, type BetterAuthOptions } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import db from './db'
import * as schema from './db/schema/auth-schema'
import { createAuthMiddleware, APIError } from 'better-auth/api'
import { normalizeName, VALID_DOMAINS } from './utils'
import { admin, customSession } from 'better-auth/plugins'
// import { nextCookies } from 'better-auth/next-js'
import { ac, roles } from '@/lib/permissions'
import { sendEmailAction } from '@/actions/sendmail'

const options = {
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        requireEmailVerification: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, url }) => {
            await sendEmailAction({
                to: user.email,
                subject: 'Reset your password',
                meta: {
                    description: 'Click the link below to reset your password.',
                    link: url
                }
            })
        }
        //-------to change password hashing algorithm--------
        // -> set up a hashing and verification method with argon2 or bcrypt
        // password: {
        //     hash: ......
        //     verify: ...
        // }
    },
    emailVerification: {
        sendOnSignUp: true,
        expiresIn: 60 * 60,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const link = new URL(url)
            link.searchParams.set('callbackURL', '/auth/verify')
            await sendEmailAction({
                to: user.email,
                subject: 'Verify your email',
                meta: {
                    description: 'Please verify your email to complete your registration.',
                    link: String(link)
                }
            })
        },
    },
    socialProviders: {
        google: {
            prompt: 'select_account',
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        github: {
            prompt: 'select_account',
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === '/sign-up/email') {
                const email = ctx.body.email as string
                const domain = email.split('@')[1]
                if (!VALID_DOMAINS().includes(domain)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid email domain. Use gmail, yahoo, or outlook."
                    })
                }
                const name = normalizeName(ctx.body.name as string)
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
        additionalFields: {
            role: {
                type: ["user", "admin"],
                input: false
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split('#') || []
                    const isAdmin = ADMIN_EMAILS.includes(user.email);
                    return {
                        data: {
                            ...user,
                            role: isAdmin ? 'admin' : 'user' // ✅ fallback to user
                        }
                    }
                },
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60,
    },
    account: {
        accountLinking: {
            enabled: false
        }
    },
    advanced: {
        database: {
            generateId: () => {
                return crypto.randomUUID()
            }
        },
    },
    // trustedOrigins: ["http://localhost:3000/auth/profile", "http://localhost:3000/auth/login/error"],

    //  if you want to use SignInEmail or SignUpEmail in Server Actions, cookies won't be set automatically.
    plugins: [
        // nextCookies(),
        admin({
            defaultRole: schema.userRoleEnum.enumValues[0],
            adminRoles: [schema.userRoleEnum.enumValues[1]],
            adminUserIds: ['6ebc8d0e-79e5-4eab-97e3-490923587145'],
            ac,
            roles,
        }),
    ]
} satisfies BetterAuthOptions

export const auth = betterAuth({
    ...options,
    plugins: [
        ...(options.plugins ?? []),
        customSession(async ({ user, session }) => {
            return {
                session: {
                    token: session.token,
                    expiresAt: session.expiresAt,
                    userAgent: session.userAgent,
                },
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    image: user.image,
                    role: user.role,
                    mmtq: "mmtq",
                }
            }
        }, options)
    ]
})

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"