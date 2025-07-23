import {
  genericErrorRequired,
  genericErrorSelectAnOption,
  type Config,
} from './globals';
import { generateForm } from '@/utils/generateForm';

import { generateSchema } from '@/utils';
import z from 'zod';

const formConfig = {
  firstName: {
    label: 'First Name',
    type: 'text',
    autoComplete: 'given-name',
    error: genericErrorRequired,
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    autoComplete: 'family-name',
    error: genericErrorRequired,
  },
  companyName: {
    label: 'Company Name',
    type: 'text',
    autoComplete: 'organization',
    className: 'col-span-2',
    error: genericErrorRequired,
  },
  email: {
    label: 'Email Address',
    type: 'email',
    autoComplete: 'email',
    validate: 'email',
    error: genericErrorRequired,
  },
  phone: {
    label: 'Telephone Number',
    type: 'text',
    autoComplete: 'tel',
    error: genericErrorRequired,
  },
  marriageStatus: {
    label: 'Are you married?',
    type: 'yesNo',
    className: 'col-span-2',
    autoComplete: 'rutjfkde',
    options: ['Yes', 'No'],
    error: genericErrorSelectAnOption,
  },
} as const satisfies Config;

type ConfigKeys = keyof typeof formConfig;
const ConfigSchema = generateSchema(formConfig);
type ConfigSchemaType = z.infer<typeof ConfigSchema>;
const { form: ConfigForm, initialState: ConfigInitialState } =
  generateForm<ConfigKeys>(formConfig);

export {
  type ConfigKeys,
  type ConfigSchemaType,
  ConfigForm,
  ConfigInitialState,
  ConfigSchema,
};
