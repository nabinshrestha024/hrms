import { DollarSign, Minus, TrendingUp, Users } from 'lucide-react';

export const generatePayrollData = [
  {
    icon: DollarSign,
    name: 'Total Net Pay',
    amount: 'Rs. 55,463',
    description: '1 employees',
  },
  {
    icon: TrendingUp,
    name: 'Total Gross',
    amount: 'Rs. 85,500',
    description: 'Before deductions',
  },
  {
    icon: Minus,
    name: 'Total Deductions',
    amount: 'Rs. 30,037',
    description: 'PF + SSF + Tax + Others',
  },
  {
    icon: Users,
    name: 'Average Salary',
    amount: 'Rs. 55,463',
    description: 'Per employee',
  },
];

export const nepaliMonths = [
  { label: 'Baishakh' },
  { label: 'Jestha' },
  { label: 'Ashadh' },
  { label: 'Shrawan' },
  { label: 'Bhadra' },
  { label: 'Ashwin' },
  { label: 'Kartik' },
  { label: 'Mangsir' },
  { label: 'Poush' },
  { label: 'Magh' },
  { label: 'Falgun' },
  { label: 'Chaitra' },
];
