import { describe, it, expect } from 'vitest';
import { SimpleAbility } from './ability';

describe('SimpleAbility', () => {
  const perms = [
    'hr:employees:read',
    'hr:employees:create',
    'hr:departments:read',
    'leave:requests:approve',
  ];
  const ability = new SimpleAbility(perms);

  it('returns true for granted permission', () => {
    expect(ability.can('read', 'hr:employees')).toBe(true);
  });

  it('returns true for another granted permission', () => {
    expect(ability.can('create', 'hr:employees')).toBe(true);
  });

  it('returns false for denied permission', () => {
    expect(ability.can('delete', 'hr:employees')).toBe(false);
  });

  it('returns false for unrelated subject', () => {
    expect(ability.can('read', 'finance:invoices')).toBe(false);
  });

  it('handles approve action', () => {
    expect(ability.can('approve', 'leave:requests')).toBe(true);
  });

  it('returns false with empty permissions', () => {
    const empty = new SimpleAbility([]);
    expect(empty.can('read', 'hr:employees')).toBe(false);
  });
});
