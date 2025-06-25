'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  href: string,
  label: string,

}

const ReturnButton = ({ href, label }: Props) => {
  return (
    <Button asChild size={'sm'}>
        <Link href={href}> <ArrowLeft /> {label}</Link>
    </Button>
  );
};

export default ReturnButton;