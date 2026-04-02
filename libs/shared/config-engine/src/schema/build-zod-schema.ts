import { z } from 'zod';
import type { FieldDefinition } from '../types';

export function buildZodSchema(
  fields: FieldDefinition[]
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    const requiredMsg =
      typeof field.validation?.required === 'string'
        ? field.validation.required
        : 'This field is required';

    const isRequired =
      field.validation?.required === true ||
      typeof field.validation?.required === 'string';

    let schema: z.ZodTypeAny;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        let s = z.string({ required_error: requiredMsg });
        if (isRequired) {
          s = s.min(1, requiredMsg);
        }
        if (field.validation?.max != null) {
          s = s.max(
            field.validation.max,
            `Maximum ${field.validation.max} characters`
          );
        }
        if (field.validation?.pattern) {
          s = s.regex(new RegExp(field.validation.pattern), 'Invalid format');
        }
        schema = s;
        break;
      }
      case 'number':
      case 'currency': {
        // z.coerce.number() handles string→number conversion and NaN
        let n = z.coerce.number({
          required_error: requiredMsg,
          invalid_type_error: 'Must be a number',
        });
        if (field.validation?.min != null) {
          n = n.min(
            field.validation.min,
            `Minimum value is ${field.validation.min}`
          );
        }
        if (field.validation?.max != null) {
          n = n.max(
            field.validation.max,
            `Maximum value is ${field.validation.max}`
          );
        }
        schema = n;
        break;
      }
      case 'date': {
        schema = z.coerce.date({
          required_error: requiredMsg,
          invalid_type_error: 'Invalid date',
        });
        break;
      }
      case 'boolean':
        schema = z.boolean().default(false);
        break;
      case 'select': {
        let s = z.string({ required_error: requiredMsg });
        if (isRequired) {
          s = s.min(1, requiredMsg);
        }
        schema = s;
        break;
      }
      default:
        schema = z.any();
    }

    // Wrap optional fields
    if (!isRequired && field.type !== 'boolean') {
      // For optional number fields, allow empty string from input → transform to undefined
      if (field.type === 'number' || field.type === 'currency') {
        schema = z
          .union([z.literal('').transform(() => undefined), schema])
          .optional();
      } else {
        schema = schema.optional();
      }
    }

    shape[field.name] = schema;
  }

  return z.object(shape);
}
