import { supabaseServerAdmin } from '../supabase';

export async function getUsers() {
  const { data, error } = await supabaseServerAdmin.auth.admin.listUsers();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
