'use client';

import { createClient } from '@/server/supabase';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return <Button onClick={logout}>Logout</Button>;
}
