import { Check, X } from 'lucide-react';

export const sandwichRuleCardData = [
  {
    icon: X,
    title: 'Sandwich Rule ON',
    sandwichRule: [
      'Leave: Friday + Monday',
      'Holiday: Saturday & Sunday',
      'Result: 4 days deducted',
    ],
  },
  {
    icon: Check,
    title: 'Sandwich Rule OFF',
    sandwichRule: [
      'Leave: Friday + Monday',
      'Holiday: Saturday & Sunday',
      'Result: 4 days deducted',
    ],
  },
];

export const sandwichRuleTableData = [
  {
    paid: 'Enabled',
    code: 'AL',
    name: 'Annual Leave',
    description: 'Yearly vacation leave',
    sandwichRule: true,
  },
  {
    paid: 'Disabled',
    code: 'SL',
    name: 'Sick Leave',
    description: 'Medical leave',
    sandwichRule: false,
  },
  {
    paid: 'Enabled',
    code: 'CL',
    name: 'Casual Leave',
    description: 'Short notice leave',
    sandwichRule: true,
  },
  {
    paid: 'Enabled',
    code: 'HL',
    name: 'Home Leave',
    description: 'Leave to visit hometown',
    sandwichRule: true,
  },
  {
    paid: 'Enabled',
    code: 'ML',
    name: 'Maternity Leave',
    description: 'Pregnancy/ childbirth leave',
    sandwichRule: true,
  },
  {
    paid: 'Disabled',
    code: 'PL',
    name: 'Paternity Leave',
    description: 'New father leave',
    sandwichRule: false,
  },
  {
    paid: 'Enabled',
    code: 'BL',
    name: 'Bereavement Leave',
    description: 'Death in family',
    sandwichRule: true,
  },
];

export type SandwichRuleTableType = {
  paid: string;
  code: string;
  description: string;
  name: string;
  sandwichRule: boolean;
};
