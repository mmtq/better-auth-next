'use client';

import { BanIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  
}

const BanUserButtonDisabled = ({  }: Props) => {
  return (
    <Button variant="destructive" size="icon" disabled={true}>
        <BanIcon />
    </Button>
  );
};

export default BanUserButtonDisabled;