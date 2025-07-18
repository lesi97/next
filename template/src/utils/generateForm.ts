import { Config } from '@/schema';

export function generateForm<K>(config: Config) {
  const form = Object.entries(config).map(([key, obj]) => {
    const typedOptions =
      'options' in obj && obj.options ? [...obj.options] : [];
    const typedDependantKey =
      'dependantKey' in obj ? (obj.dependantKey as K) : (null as unknown as K);
    const typedDependantValue =
      'dependantValue' in obj
        ? (obj.dependantValue as K)
        : (null as unknown as K);
    return {
      label: config.label,
      id: key,
      className: 'className' in config ? config.className : '',
      type: config.type,
      dataKey: key as K,
      options: typedOptions,
      dependantKey: typedDependantKey,
      dependantValue: typedDependantValue,
      autoComplete: obj.autoComplete || '',
    };
  });

  const initialState = {
    data: Object.fromEntries(Object.keys(config).map((key) => [key, ''])),
    errors: Object.fromEntries(
      Object.keys(config).map((key) => [key, undefined])
    ),
  };

  return { form, initialState };
}
