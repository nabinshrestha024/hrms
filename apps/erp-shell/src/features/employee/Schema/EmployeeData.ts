export const employees = [
  {
    employeeId: 'EMP001',

    // Personal Info
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '9812345678',
    dateOfBirth: '1995-05-10',
    gender: 'Male',
    maritalStatus: 'Single',

    // Address
    country: 'Nepal',
    province: 'Bagmati',
    city: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan',
    ward: '5',
    address: 'Baneshwor, Kathmandu',

    // Emergency Contact
    emergencyContact: '9800000000',
    emergencyContactName: 'Jane Doe',
    emergencyContactRelation: 'Sister',

    // Job Info
    branch: 'Kathmandu',
    department: 'Engineering',
    designation: 'Software Engineer',
    jobLevel: 'Mid',
    reportingManager: 'Manager 1',

    shift: 'Day',
    workType: 'Full-time',
    employeeType: 'Permanent',

    workEmail: 'john.work@example.com',
    workPhoneNumber: '9812345678',

    joiningDate: '2022-06-15',
    contractStartDate: '2022-06-15',
    contractEndDate: '2025-06-15',

    // Salary
    grossSalary: '80000',
    basicSalary: '50000',

    // Bank
    bankName: 'NIC Asia',
    bankAccountNumber: '1234567890',
    bankAccountName: 'John A Doe',

    // Optional UI fields (your custom)
    name: 'John Doe',
    status: 'Active',
    phone: '+977-9812345678',
  },
  {
    employeeId: 'EMP002',

    // Personal Info
    firstName: 'Rita',
    middleName: '',
    lastName: 'Doe',
    email: 'Rita.doe@example.com',
    phoneNumber: '9812345678',
    dateOfBirth: '1995-05-10',
    gender: 'Male',
    maritalStatus: 'Single',

    // Address
    country: 'Nepal',
    province: 'Bagmati',
    city: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan',
    ward: '5',
    address: 'Baneshwor, Kathmandu',

    // Emergency Contact
    emergencyContact: '9800000000',
    emergencyContactName: 'Jane Doe',
    emergencyContactRelation: 'Sister',

    // Job Info
    branch: 'Kathmandu',
    department: 'Engineering',
    designation: 'Software Engineer',
    jobLevel: 'Mid',
    reportingManager: 'Manager 1',

    shift: 'Day',
    workType: 'Full-time',
    employeeType: 'Permanent',

    workEmail: 'Rita.work@example.com',
    workPhoneNumber: '9812345678',

    joiningDate: '2022-06-15',
    contractStartDate: '2022-06-15',
    contractEndDate: '2025-06-15',

    // Salary
    grossSalary: '80000',
    basicSalary: '50000',

    // Bank
    bankName: 'NIC Asia',
    bankAccountNumber: '1234567890',
    bankAccountName: 'Rita A Doe',

    // Optional UI fields (your custom)
    name: 'Rita Doe',
    status: 'Active',
    phone: '+977-9812345678',
  },
];

export type Employee = {
  employeeId: string;

  // Personal Info
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  actions?: string;

  // Address
  country: string;
  province: string;
  city: string;
  municipality: string;
  ward: string;
  address: string;

  // Emergency Contact
  emergencyContact: string;
  emergencyContactName: string;
  emergencyContactRelation: string;

  // Job Info
  branch: string;
  department: string;
  designation: string;
  jobLevel: string;
  reportingManager: string;

  shift: string;
  workType: string;
  employeeType: string;

  workEmail: string;
  workPhoneNumber: string;

  joiningDate: string;
  contractStartDate: string;
  contractEndDate: string;

  // Salary
  grossSalary: string;
  basicSalary: string;

  // Bank
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;

  // UI / Derived fields
  name: string;
  status: string;
  phone: string;
};
