'use client'

import { useState, useTransition } from "react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { changeUserRole } from "@/actions/auth-actions"
import { toast } from "sonner"

interface Props {
    id: string
    initialRole: string
}

const RoleSelector = ({ id, initialRole }: Props) => {
    const [selectedRole, setSelectedRole] = useState<string>(initialRole)
    const [isPending, startTransition] = useTransition();

    const handleChange = async (value: 'admin' | 'user') => {
        startTransition( async() => {
            try {
                const response = await changeUserRole(id, value);
                if (response.success) {
                    setSelectedRole(value);
                    toast.success(response.message);
                } else {
                    toast.error(response.error);
                }
            } catch (error) {
                console.error(error);
            }
        })
    }

    // Reorder to put the selected one at the top
    const roles = selectedRole === 'admin' ? ['admin', 'user'] : ['user', 'admin']

    return (
        <Select disabled={selectedRole === 'admin' || isPending} defaultValue={selectedRole} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default RoleSelector
