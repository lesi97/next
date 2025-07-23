import { z } from 'zod';
import { genericErrorRequired, type Config } from './globals';
import { generateForm } from '@/utils/generateForm';

import { generateSchema } from '@/utils';

const userConfig = {
  email: {
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    error: genericErrorRequired,
  },
  password: {
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
    optional: true,
    error: genericErrorRequired,
  },
} as const satisfies Config;

type CreateUserKeys = keyof typeof userConfig;
const CreateUserSchema = generateSchema(userConfig);
type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
const { form: CreateUserForm, initialState: CreateUserInitialState } =
  generateForm<CreateUserKeys>(userConfig);

export {
  type CreateUserKeys,
  type CreateUserSchemaType,
  CreateUserForm,
  CreateUserInitialState,
  CreateUserSchema,
};
