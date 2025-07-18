import * as z from 'zod';
import { genericErrorRequired, type Config } from '@/schema';

export function generateSchema<T extends Config>(
  config: T
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const zodSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, fieldConfig] of Object.entries(config)) {
    if ('validate' in fieldConfig && fieldConfig.validate === 'email') {
      zodSchema[key] = z.email({
        message: fieldConfig.error || genericErrorRequired,
      });
    } else if ('dependantKey' in fieldConfig) {
      zodSchema[key] = z.string().optional();
    } else {
      zodSchema[key] = z.string().min(1, {
        message: fieldConfig.error || genericErrorRequired,
      });
    }
  }

  return z.object(zodSchema).superRefine((data, ctx) => {
    for (const [key, fieldConfig] of Object.entries(config)) {
      if ('dependantKey' in fieldConfig && 'dependantValue' in fieldConfig) {
        const dependantKey = fieldConfig.dependantKey;
        const dependantValue = fieldConfig.dependantValue;

        const dependantFieldValue = data[dependantKey!];
        const currentFieldValue = data[key];

        const shouldBeRequired = dependantFieldValue === dependantValue;

        if (shouldBeRequired && !currentFieldValue?.toString().trim()) {
          ctx.addIssue({
            path: [key],
            code: 'custom',
            message: fieldConfig.error || genericErrorRequired,
          });
        }
      }
    }
  });
}
