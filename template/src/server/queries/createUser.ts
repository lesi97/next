'use server';
import { email, z } from 'zod';
import { supabaseServerAdmin } from '../supabase';
import { generatePassword } from '@/utils';
import { type User } from '@supabase/supabase-js';
import {
  type CreateUserSchemaType,
  CreateUserSchema,
} from '@/schema/createUser';

export async function createUser(
  userData: CreateUserSchemaType
): Promise<{ user: User }> {
  const validated = CreateUserSchema.parse(userData);
  const { email, password } = validated;

  const generatedPassword = generatePassword();
  const setPassword = password ? password : generatedPassword;

  const { data, error } = await supabaseServerAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    password: setPassword,
  });

  if (error) throw error;

  if (!data.user) throw new Error('Failed to create user');

  return { user: data.user };
}
