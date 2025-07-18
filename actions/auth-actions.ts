'use server'

import { headers } from "next/headers"
import db from "../lib/db"
import { user } from "../lib/db/schema/auth-schema"
import { auth } from "../lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { User } from "better-auth"
import { APIError } from "better-auth/api"


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

export async function resendVerificationEmailAction(email: string) {
    try {
        const response = await auth.api.sendVerificationEmail({
            body: {
                email,
                callbackURL: '/auth/verify',
            },

            headers: await headers()
        })

        if (response.status) {
            return { success: true, message: 'Verification email sent successfully' };
        } else {
            return { success: false, error: 'Error sending verification email' };
        }
    } catch (error) {
        console.log('Error resending verification email:', error);
        return { success: false, error: 'Error resending verification email' };
    }
}

export async function forgotPasswordAction(email: string) {
    try {
        const response = await auth.api.forgetPassword({
            body: {
                email,
                redirectTo: '/auth/reset-password',
            },
            headers: await headers()
        })

        if (response.status) {
            return { success: true, message: 'Password reset email sent successfully' };
        } else {
            return { success: false, error: 'Error sending password reset email' };
        }
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return { success: false, error: 'Error sending password reset email' };
    }
}

export async function resetPasswordAction({ token, password }: { token: string, password: string }) {
    try {
        const response = await auth.api.resetPassword({
            body: {
                token: token,
                newPassword: password
            },
            headers: await headers()
        })

        if (response.status) {
            return { success: true, message: 'Password reset successfully' };
        } else {
            return { success: false, error: 'Error resetting password' };
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return { success: false, error: 'Error resetting password' };
    }
}

export async function updateUserAction(data: Partial<User>) {
    try {
        const result = await auth.api.updateUser({
            body: {
                name: data.name
            },
            headers: await headers()
        })
        if (result.status){
            return { success: true, message: 'User updated successfully' };
        }
        return { success: false, error: 'Error updating user' };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, error: 'Error updating user' };
    }
}

export async function changeUserPasswordAction({ currentPassword, newPassword }: { currentPassword: string, newPassword: string }) {
    try {
        const { token } = await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword
            },
            headers: await headers()
        })
        if (user) {
            return { success: true, message: 'Password changed successfully' };
        }
        return { success: false, error: 'Error changing password' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, error: error instanceof APIError ? error.message : 'Error changing password' };
    }
}