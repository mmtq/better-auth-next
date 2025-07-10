'use client';
import z from 'zod'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { changeUserPasswordAction, updateUserAction } from '@/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface Props {

}

const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Password must be at least 6 characters long'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmNewPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine((data)=>data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
})

const ChangePasswordForm = ({ }: Props) => {
    const router = useRouter()
    const session = useSession()
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
    const [isPending, startTransition] = useTransition()
    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const result = changePasswordSchema.safeParse(form)
                if (!result.success) {
                    toast.error(result.error.issues[0].message)
                    return
                }
                const response = await changeUserPasswordAction({ currentPassword: form.currentPassword, newPassword: form.newPassword })
                if (response.success) {
                    toast.success(response.message)
                    router.push('/profile')
                } else {
                    toast.error(response.error)
                }
            } catch (error) {
                toast.error('Error updating user')
                console.error(error)
            }
        })
    }

    return (
        <form className='py-4 space-y-2'>
            <div className='space-y-2'>
                <Label htmlFor="name">Current Password</Label>
                <Input type="password" placeholder='Enter your current password' id="currentPassword" name="currentPassword" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
            </div>
            <div className='space-y-2'>
                <Label htmlFor="name">New Password</Label>
                <Input type="password" placeholder='Enter your new password' id="newPassword" name="newPassword" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
            </div>
            <div className='space-y-2'>
                <Label htmlFor="name">Confirm New Password</Label>
                <Input type="password" placeholder='Confirm your new password' id="confirmNewPassword" name="confirmNewPassword" value={form.confirmNewPassword} onChange={(e) => setForm({ ...form, confirmNewPassword: e.target.value })} />
            </div>
            <Button type='submit' onClick={handleSubmit} className='w-full' disabled={isPending} >{isPending ? 'Updating...' : 'Update'}</Button>
        </form>
    );
};

export default ChangePasswordForm;