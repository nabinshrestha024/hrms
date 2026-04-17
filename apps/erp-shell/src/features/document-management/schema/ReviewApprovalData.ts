export const reviewApprovalData = [
  {
    employeeId: 'EID01',
    fileName: 'Passport Copy',
    uploadedBy: 'Sarah Johnson',
    employeeName: 'Sarah Pandey',
    employeeDepartment: 'Technical',
    date: '2024-03-15',
    size: '3.2 MB',
    type: 'Passport IDs',
    status: 'Pending',
    rejectedReason: '',
  },
  {
    employeeId: 'EID02',
    fileName: 'Citizenship Copy',
    uploadedBy: 'Sarah Pandey',
    employeeName: 'Ram Kumar',
    employeeDepartment: 'Technical',
    date: '2024-03-15',
    size: '3.2 MB',
    type: 'Personal IDs',
    status: 'Accepted',
    rejectedReason: '',
  },
  {
    employeeId: 'EID03',
    fileName: 'License Copy',
    uploadedBy: 'Pragya Pandey',
    employeeName: 'John Doe',
    employeeDepartment: 'Technical',
    date: '2024-03-15',
    size: '3.2 MB',
    type: 'Personal IDs',
    status: 'Rejected',
    rejectedReason:
      'Document is too blurry and text is not readable. Please upload a clearer scan or photo.',
  },
];

export interface ReviewApprovalType {
  employeeId: string;
  fileName: string;
  uploadedBy: string;
  employeeName: string;
  employeeDepartment: string;
  date: string;
  size: string;
  type: string;
  status: string;
  rejectedReason: string;
}
