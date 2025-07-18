export const genericErrorRequired = 'This field is required';
export const genericErrorSelectAnOption = 'Please select an option';

export type AutoCompleteType =
  | 'off'
  | 'street-address'
  | 'address-level1'
  | 'address-level2'
  | 'county'
  | 'postal-code'
  | 'country'
  | 'given-name'
  | 'family-name'
  | 'email'
  | 'tel'
  | 'organization'
  | 'honorific-prefix'
  | 'current-password'
  | 'rutjfkde';

type Inputs =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file'
  | 'hidden'
  | 'search'
  | 'tel'
  | 'url'
  | 'time'
  | 'range'
  | 'color'
  | 'dropdown'
  | 'combobox'
  | 'multiselect'
  | 'textarea'
  | 'yesNo';

type ZodValidationKey =
  | 'email'
  | 'url'
  | 'uuid'
  | 'min'
  | 'max'
  | 'regex'
  | 'date'
  | 'length';

type BaseConfig = {
  label: string;
  error: string;
  className?: string;
  validate?: ZodValidationKey;
  autoComplete?: AutoCompleteType;
  dependantKey?: string;
  dependantValue?: string | number | boolean;
};

interface OptionsConfig extends BaseConfig {
  type: 'dropdown' | 'combobox' | 'yesNo';
  options: string[];
}

interface TextConfig extends BaseConfig {
  type: 'text' | 'email' | 'password' | 'number';
  options?: never;
}

export type Config = Record<string, OptionsConfig | TextConfig>;
