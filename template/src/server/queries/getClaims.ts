import { createSupabaseServer } from '@/server/supabase/server';

export async function getClaims() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error('Unauthenticated');
  }

  return { claims: data.claims };
}
