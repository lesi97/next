import { createSupabaseServer } from '@/server/supabase/server';

export async function createContext() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();

  return {
    user: data?.user ?? null,
    error,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
