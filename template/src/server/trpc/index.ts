import { z } from 'zod';
import { type User } from '@supabase/supabase-js';
import { publicProcedure, router } from './trpc';
import * as queries from '../queries';
import * as schema from '@/schema';

export const appRouter = router({
  userList: publicProcedure.query(queries.getUsers),
  createUser: publicProcedure
    .input(schema.CreateUserSchema)
    .output(z.object({ user: z.custom<User>() }))
    .mutation(async (opts) => queries.createUser(opts.input)),
  getClaims: publicProcedure.query(queries.getClaims),
});

export type AppRouter = typeof appRouter;
