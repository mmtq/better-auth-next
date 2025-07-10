'use client';
import z from 'zod'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { updateUserAction } from '@/actions/auth-actions';
import { useSession } from '@/lib/auth-client';

interface Props {

}

const editProfileFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
})


const EditProfileForm = ({ }: Props) => {
    const session = useSession()
    const [form, setForm] = useState({ name: session?.data?.user?.name || '' })
    const [isPending, startTransition] = useTransition()
    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const result = editProfileFormSchema.safeParse(form)
                if (!result.success) {
                    toast.error(result.error.issues[0].message)
                    return
                }
                if (form.name === session?.data?.user?.name) {
                    toast.error('Name cannot be the same as before')
                    return
                }
                const response = await updateUserAction(form)
                if (response.success) {
                    toast.success(response.message)
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
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={session?.data?.user?.name} type="text" id="name" placeholder="Your name" className='mt-2' onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <Button type='submit' onClick={handleSubmit} className='w-full' disabled={isPending} >{isPending ? 'Updating...' : 'Update'}</Button>
        </form>
    );
};

export default EditProfileForm;