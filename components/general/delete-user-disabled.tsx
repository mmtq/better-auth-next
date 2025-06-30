'use client';

import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {

}

const DeleteUserDisabled = ({ }: Props) => {
    return (
        <Button variant="destructive" size="icon" disabled={true}>
            <span className="sr-only">Delete User</span>
            <TrashIcon />
        </Button>

    );
};

export default DeleteUserDisabled;