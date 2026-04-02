import { describe, it, expect } from 'vitest';
import { buildZodSchema } from './build-zod-schema';
import type { FieldDefinition } from '../types';

describe('buildZodSchema', () => {
  it('creates required string field', () => {
    const fields: FieldDefinition[] = [
      { name: 'firstName', type: 'text', validation: { required: true } },
    ];
    const schema = buildZodSchema(fields);
    const result = schema.safeParse({ firstName: '' });
    expect(result.success).toBe(false);
    const valid = schema.safeParse({ firstName: 'John' });
    expect(valid.success).toBe(true);
  });

  it('creates optional field when not required', () => {
    const fields: FieldDefinition[] = [
      { name: 'notes', type: 'text' },
    ];
    const schema = buildZodSchema(fields);
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('validates number with min/max', () => {
    const fields: FieldDefinition[] = [
      { name: 'age', type: 'number', validation: { required: true, min: 18, max: 65 } },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ age: 17 }).success).toBe(false);
    expect(schema.safeParse({ age: 25 }).success).toBe(true);
    expect(schema.safeParse({ age: 66 }).success).toBe(false);
  });

  it('validates string pattern', () => {
    const fields: FieldDefinition[] = [
      { name: 'email', type: 'text', validation: { required: true, pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' } },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ email: 'bad' }).success).toBe(false);
    expect(schema.safeParse({ email: 'test@example.com' }).success).toBe(true);
  });

  it('handles boolean field type', () => {
    const fields: FieldDefinition[] = [
      { name: 'active', type: 'boolean' },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ active: true }).success).toBe(true);
  });

  it('handles date field type', () => {
    const fields: FieldDefinition[] = [
      { name: 'startDate', type: 'date', validation: { required: true } },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ startDate: '2024-01-01' }).success).toBe(true);
  });

  it('handles multiple fields', () => {
    const fields: FieldDefinition[] = [
      { name: 'name', type: 'text', validation: { required: true } },
      { name: 'age', type: 'number' },
      { name: 'active', type: 'boolean' },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ name: 'John' }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(false);
  });
});
