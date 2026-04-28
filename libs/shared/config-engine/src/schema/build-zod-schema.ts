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

      case 'select':
      case 'colorRadio': {
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
              return;
            }

            // For both `select` and `colorRadio`, when an `options` list is
            // provided, ensure the value is one of them.
            if (Array.isArray(field.options) && field.options.length > 0) {
              const allowed = field.options.map((o) =>
                typeof o === 'string' ? o : o.value
              );
              if (!allowed.includes(val)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Invalid selection',
                });
              }
            }
          })
        );
        break;
      }

      case 'time': {
        // HH:MM 24-hour. Accepts the same trim/empty rules as text.
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

            if (
              typeof val !== 'string' ||
              !/^([01]\d|2[0-3]):[0-5]\d$/.test(val)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Time must be HH:MM (24-hour)',
              });
            }
          })
        );
        break;
      }

      case 'file': {
        // Accepts a `File` instance or null/undefined when not required.
        schema = z.any().superRefine((val, ctx) => {
          if (val === undefined || val === null) {
            if (isRequired) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: requiredMsg,
              });
            }
            return;
          }

          // `File` may not exist in non-DOM test environments — guard.
          if (typeof File !== 'undefined' && !(val instanceof File)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Must be a file',
            });
            return;
          }

          if (typeof File !== 'undefined' && val instanceof File) {
            if (validation.max != null && val.size > validation.max) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `File must be smaller than ${validation.max} bytes`,
              });
            }
          }
        });
        break;
      }

      case 'relation': {
        // String id (single) or string[] (multiple). Validation against the
        // referenced entity is the form consumer's responsibility — schema
        // only enforces shape + presence.
        const isMulti = field.relation?.multiple === true;

        schema = z.any().superRefine((val, ctx) => {
          if (val === undefined || val === null || val === '') {
            if (isRequired) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: requiredMsg,
              });
            }
            return;
          }

          if (isMulti) {
            if (
              !Array.isArray(val) ||
              !val.every((v) => typeof v === 'string')
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Must be a list of ids',
              });
              return;
            }
            if (isRequired && val.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: requiredMsg,
              });
            }
          } else if (typeof val !== 'string') {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Must be an id string',
            });
          }
        });
        break;
      }

      case 'richtext': {
        // Plain string container; validation matches `text`/`textarea` so
        // max-length applies to the rendered HTML/markdown body.
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

            const str = String(val);
            if (validation.max != null && str.length > validation.max) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Maximum ${validation.max} characters`,
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
