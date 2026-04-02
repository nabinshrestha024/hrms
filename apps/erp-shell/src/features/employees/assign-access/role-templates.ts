export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
}

export const roleTemplates: RoleTemplate[] = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full system privileges',
  },
  { id: 'hr_manager', name: 'HR Manager', description: '3 action privileges' },
  {
    id: 'branch_admin',
    name: 'Branch Admin',
    description: '1 action privilege',
  },
  {
    id: 'finance_lead',
    name: 'Finance Lead',
    description: '2 action privileges',
  },
  { id: 'employee', name: 'Employee', description: '0 action privileges' },
];

export type DataScope = 'global' | 'limited' | 'self';

export const branchOptions = [
  'New York HQ',
  'London Office',
  'Tokyo Office',
  'San Francisco',
  'Berlin Office',
];
