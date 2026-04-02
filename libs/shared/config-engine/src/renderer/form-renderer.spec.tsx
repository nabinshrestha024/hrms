import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { FormRenderer } from './form-renderer';
import type { FormViewConfig } from '../types';

// Mock ResizeObserver for jsdom (required by Radix UI)
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});

const simpleConfig: FormViewConfig = {
  entity: 'employee',
  fields: [
    { name: 'firstName', type: 'text', label: 'First Name', validation: { required: true } },
    { name: 'age', type: 'number', label: 'Age' },
    { name: 'active', type: 'boolean', label: 'Active' },
  ],
  layout: {
    type: 'section',
    title: 'Basic Info',
    children: [
      { type: 'field', name: 'firstName' },
      { type: 'columns', columns: 2, children: [
        { type: 'field', name: 'age' },
        { type: 'field', name: 'active' },
      ]},
    ],
  },
};

describe('FormRenderer', () => {
  it('renders fields from config', () => {
    render(<FormRenderer config={simpleConfig} onSubmit={() => {}} />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /active/i })).toBeInTheDocument();
  });

  it('renders section title', () => {
    render(<FormRenderer config={simpleConfig} onSubmit={() => {}} />);
    expect(screen.getByText('Basic Info')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<FormRenderer config={simpleConfig} onSubmit={() => {}} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders custom submit label', () => {
    render(<FormRenderer config={simpleConfig} onSubmit={() => {}} submitLabel="Save Employee" />);
    expect(screen.getByRole('button', { name: /save employee/i })).toBeInTheDocument();
  });

  it('shows required indicator for required fields', () => {
    render(<FormRenderer config={simpleConfig} onSubmit={() => {}} />);
    const label = screen.getByText(/first name/i);
    expect(label.parentElement?.querySelector('.text-destructive')).toBeInTheDocument();
  });
});
