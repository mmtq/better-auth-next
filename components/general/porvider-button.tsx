'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

interface Props {
  name: string
  signIn?: boolean
}

const ProviderButton = ({ name, signIn }: Props) => {
  const onClick = async() => {
    await authClient.signIn.social({
      provider: name,
      callbackURL: '/auth/profile',
      errorCallbackURL: '/auth/login/error',
    });
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
    >
      Sign{signIn ? 'in' : 'up'} using {name==='google' ? 'Google' : 'GitHub'}
    </Button>
  );
};

export default ProviderButton;