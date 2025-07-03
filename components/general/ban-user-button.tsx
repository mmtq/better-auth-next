'use client';

import { BanIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { banUser } from "@/actions";
import { useTransition } from "react";

interface Props {
    id: string,
    onBan?: (id: string) => void
}

const BanUserButton = ({ id, onBan }: Props) => {

    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            try {
                if (!confirm("Are you sure?")) return
                const response = await banUser(id);
                toast.success('User banned successfully');
                onBan?.(id);
            } catch (error) {
                toast.error('Something went wrong');
            }
        });
    };
    return (
        <Button variant="destructive" size="icon" disabled={isPending} onClick={handleClick}>
            <span className="sr-only">Ban User</span>
            <BanIcon />
        </Button>
    )
};

export default BanUserButton;