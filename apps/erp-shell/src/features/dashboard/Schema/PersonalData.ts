export const personalData = [
  {
    id: 0,
    name: 'John Doe',
    position: 'Senior Software Engineer',
    image: '/Image.png',
    status: 'Active',
    employeeId: 'EMP-2024-0451',
    department: 'Engineering',
    email: 'john.doe@company.com',
    phoneNumber: '+977-9810000000',
  },
];

export type PersonalDetails = [
  id: idSchema,
  name: string,
  position: string,
  image: string,
  status: string,
  employeeId: string,
  department: string,
  email: string,
  phoneNumber: string
];
