import type { FormViewConfig } from '@erp/config-engine';
import { FormRenderer } from '@erp/config-engine';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/demo-form')({
  component: DemoFormPage,
  beforeLoad: () => ({ breadcrumb: 'Form Demo' }),
});

const employeeFormConfig: FormViewConfig = {
  entity: 'employee',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      validation: { required: true, max: 50 },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      validation: { required: true },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      validation: { required: true, pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      options: ['engineering', 'hr', 'finance', 'marketing', 'operations'],
      validation: { required: true },
    },
    {
      name: 'salary',
      type: 'number',
      label: 'Annual Salary',
      validation: { min: 0 },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      validation: { required: true },
    },
    { name: 'active', type: 'boolean', label: 'Active Employee' },
  ],
  layout: {
    type: 'section',
    title: 'New Employee',
    children: [
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'firstName' },
          { type: 'field', name: 'lastName' },
        ],
      },
      { type: 'field', name: 'email' },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'department' },
          { type: 'field', name: 'salary' },
        ],
      },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'startDate' },
          { type: 'field', name: 'active' },
        ],
      },
    ],
  },
};

function DemoFormPage() {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.warn('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Config-Driven Form Demo</h1>
      <div className="rounded-lg border border-border bg-card p-6">
        <FormRenderer
          config={employeeFormConfig}
          onSubmit={handleSubmit}
          submitLabel="Create Employee"
        />
      </div>
    </div>
  );
}
