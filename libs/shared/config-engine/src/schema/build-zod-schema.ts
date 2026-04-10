import { z } from 'zod';
import type { FieldDefinition } from '../types';

// Normalize all incoming values safely
const normalizeString = (val: unknown) => {
  if (val === null || val === undefined) return undefined;
  const str = String(val).trim();
  return str === '' ? undefined : str;
};

const normalizeNumber = (val: unknown) => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);
  return Number.isNaN(num) ? val : num;
};

const normalizeDate = (val: unknown) => {
  if (val === '' || val === null || val === undefined) return undefined;
  if (val instanceof Date) return val;
  if (typeof val !== 'string' && typeof val !== 'number') return val;
  const date = new Date(val);
  return isNaN(date.getTime()) ? val : date;
};

export function buildZodSchema(
  fields: FieldDefinition[]
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    const validation = field.validation ?? {};

    const requiredMsg =
      typeof validation.required === 'string'
        ? validation.required
        : 'This field is required';

    const isRequired =
      validation.required === true || typeof validation.required === 'string';

    let schema: z.ZodTypeAny;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        schema = z.preprocess(
          normalizeString,
          z.any().superRefine((val, ctx) => {
            if (val === undefined) {
              if (isRequired) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: requiredMsg,
                });
              }
              return;
            }

            // Now val is guaranteed trimmed string
            const str = String(val);

            if (validation.max != null && str.length > validation.max) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Maximum ${validation.max} characters`,
              });
            }

            if (
              validation.pattern &&
              !new RegExp(validation.pattern).test(str)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid format',
              });
            }
          })
        );
        break;
      }

      case 'number':
      case 'currency': {
        schema = z.preprocess(
          normalizeNumber,
          z.any().superRefine((val, ctx) => {
            if (val === undefined) {
              if (isRequired) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: requiredMsg,
                });
              }
              return;
            }

            if (typeof val !== 'number' || Number.isNaN(val)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Must be a number',
              });
              return;
            }

            if (validation.min != null && val < validation.min) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Minimum value is ${validation.min}`,
              });
            }

            if (validation.max != null && val > validation.max) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Maximum value is ${validation.max}`,
              });
            }
          })
        );
        break;
      }

      case 'date': {
        schema = z.preprocess(
          normalizeDate,
          z.any().superRefine((val, ctx) => {
            if (val === undefined) {
              if (isRequired) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: requiredMsg,
                });
              }
              return;
            }

            if (!(val instanceof Date) || isNaN(val.getTime())) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid date',
              });
            }
          })
        );
        break;
      }

      case 'boolean': {
        schema = z.boolean().default(false);
        break;
      }

      case 'select': {
        schema = z.preprocess(
          normalizeString,
          z.any().superRefine((val, ctx) => {
            if (val === undefined) {
              if (isRequired) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: requiredMsg,
                });
              }
              return;
            }

            if (typeof val !== 'string') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: requiredMsg,
              });
            }
          })
        );
        break;
      }

      default:
        schema = z.any();
    }

    shape[field.name] = schema;
  }

  return z.object(shape);
}
