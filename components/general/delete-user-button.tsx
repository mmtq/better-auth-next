'use client';

import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { deleteUser } from "@/actions/auth-actions";
import { toast } from "sonner";

interface Props {
    id: string;
    onDelete: (id: string) => void
}

const DeleteUserButton = ({ id, onDelete }: Props) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            try {
                const confirmed = confirm("Are you sure?");
                if (!confirmed) return;

                const response = await deleteUser(id);

                if (response?.error) {
                    toast.error(response.error);
                } else {
                    toast.success('User deleted successfully');
                    onDelete(id); // notify parent to refresh list
                }

            } catch (error) {
                toast.error('Something went wrong');
            }
        });
    };

    return (
        <Button variant="destructive" size="icon" disabled={isPending} onClick={handleClick}>
            <span className="sr-only">Delete User</span>
            <TrashIcon />
        </Button>
    );
};

export default DeleteUserButton;
