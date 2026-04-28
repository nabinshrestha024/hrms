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
    const fields: FieldDefinition[] = [{ name: 'notes', type: 'text' }];
    const schema = buildZodSchema(fields);
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('validates number with min/max', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'age',
        type: 'number',
        validation: { required: true, min: 18, max: 65 },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ age: 17 }).success).toBe(false);
    expect(schema.safeParse({ age: 25 }).success).toBe(true);
    expect(schema.safeParse({ age: 66 }).success).toBe(false);
  });

  it('validates string pattern', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'email',
        type: 'text',
        validation: { required: true, pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ email: 'bad' }).success).toBe(false);
    expect(schema.safeParse({ email: 'test@example.com' }).success).toBe(true);
  });

  it('handles boolean field type', () => {
    const fields: FieldDefinition[] = [{ name: 'active', type: 'boolean' }];
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

  it('validates currency field as number with min/max', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'amount',
        type: 'currency',
        validation: { required: true, min: 0, max: 100_000 },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ amount: -1 }).success).toBe(false);
    expect(schema.safeParse({ amount: 1000 }).success).toBe(true);
    expect(schema.safeParse({ amount: 200_000 }).success).toBe(false);
    expect(schema.safeParse({ amount: '' }).success).toBe(false);
  });

  it('validates time field as HH:MM 24-hour', () => {
    const fields: FieldDefinition[] = [
      { name: 'start', type: 'time', validation: { required: true } },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ start: '09:30' }).success).toBe(true);
    expect(schema.safeParse({ start: '23:59' }).success).toBe(true);
    expect(schema.safeParse({ start: '24:00' }).success).toBe(false);
    expect(schema.safeParse({ start: '9:30' }).success).toBe(false);
    expect(schema.safeParse({ start: '' }).success).toBe(false);
  });

  it('validates colorRadio against options list', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'color',
        type: 'colorRadio',
        options: ['#EF4444', '#22C55E', '#3B82F6'],
        validation: { required: true },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ color: '#EF4444' }).success).toBe(true);
    expect(schema.safeParse({ color: '#000000' }).success).toBe(false);
    expect(schema.safeParse({ color: '' }).success).toBe(false);
  });

  it('validates select against typed options', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'role',
        type: 'select',
        options: [
          { id: 0, content: 'Admin', value: 'admin' },
          { id: 1, content: 'Member', value: 'member' },
        ],
        validation: { required: true },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ role: 'admin' }).success).toBe(true);
    expect(schema.safeParse({ role: 'guest' }).success).toBe(false);
  });

  it('validates file field as File instance with size cap', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'avatar',
        type: 'file',
        validation: { required: true, max: 1024 },
      },
    ];
    const schema = buildZodSchema(fields);
    const small = new File(['a'.repeat(100)], 'a.txt');
    const big = new File(['a'.repeat(2000)], 'b.txt');
    expect(schema.safeParse({ avatar: small }).success).toBe(true);
    expect(schema.safeParse({ avatar: big }).success).toBe(false);
    expect(schema.safeParse({ avatar: null }).success).toBe(false);
    expect(schema.safeParse({ avatar: 'a-string' }).success).toBe(false);
  });

  it('file field is optional when not required', () => {
    const fields: FieldDefinition[] = [{ name: 'avatar', type: 'file' }];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ avatar: null }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(true);
  });

  it('validates relation as string id (single)', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'managerId',
        type: 'relation',
        relation: { entity: 'employee', displayField: 'firstName' },
        validation: { required: true },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ managerId: 'emp-1' }).success).toBe(true);
    expect(schema.safeParse({ managerId: '' }).success).toBe(false);
    expect(schema.safeParse({ managerId: 123 }).success).toBe(false);
  });

  it('validates relation as string[] (multiple)', () => {
    const fields: FieldDefinition[] = [
      {
        name: 'reviewers',
        type: 'relation',
        relation: {
          entity: 'employee',
          displayField: 'firstName',
          multiple: true,
        },
        validation: { required: true },
      },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ reviewers: ['e1', 'e2'] }).success).toBe(true);
    expect(schema.safeParse({ reviewers: [] }).success).toBe(false);
    expect(schema.safeParse({ reviewers: 'e1' }).success).toBe(false);
  });

  it('validates richtext with max-length cap', () => {
    const fields: FieldDefinition[] = [
      { name: 'body', type: 'richtext', validation: { max: 5 } },
    ];
    const schema = buildZodSchema(fields);
    expect(schema.safeParse({ body: '<p>ok</p>' }).success).toBe(false);
    expect(schema.safeParse({ body: 'short' }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(true);
  });
});
