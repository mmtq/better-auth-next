'use client';

import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import z from 'zod';
import { toast } from "sonner";

const magicLinkFormSchema = z.object({
    email: z.string().email('Enter a valid email'),
})


const MagicLinkForm = () => {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({ email: '' });
    const handleSubmit = () => {
        startTransition(async() => {
            try {
                const validForm = magicLinkFormSchema.safeParse(form)
                if(!validForm.success) {
                    toast.error(validForm.error.issues[0].message)
                    return
                }
                const res = authClient.signIn.magicLink({
                    email: form.email,
                    name: form.email.split('@')[0],
                    callbackURL: '/profile'
                })

                console.log (res)

                toast.success('Magic link sent successfully. Check your email')
            } catch (error) {
                console.error(error)
                toast.error('Something went wrong')
            }
        })
    }

  return (
    <Accordion className='border rounded-2xl px-2' type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger><Star />Login with Magic Link</AccordionTrigger>
          <AccordionContent>
            <form>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Button onClick={handleSubmit} variant={'outline'} disabled={isPending} type="submit">Send</Button>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
};

export default MagicLinkForm;