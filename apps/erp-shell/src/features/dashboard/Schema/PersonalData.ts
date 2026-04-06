import { Building2, Hash, Mail, Phone } from 'lucide-react';

export const personalData = [
  {
    id: 0,
    name: 'John Doe',
    position: 'Senior Software Engineer',
    image: '/Image.png',
    status: 'Active',

    employee: [
      {
        icon: Hash,
        label: 'Employee Id',
        subLabel: 'EMP-2024-0451',
      },
      {
        icon: Building2,
        label: 'Department',
        subLabel: 'Engineering',
      },
      {
        icon: Mail,
        label: 'Email',
        subLabel: 'john.doe@company.com',
      },
      {
        icon: Phone,
        label: 'Phone Number',
        subLabel: '+977-9810000000',
      },
    ],
  },
];
