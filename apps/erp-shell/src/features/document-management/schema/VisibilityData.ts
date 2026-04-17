export const visibilityData = [
  {
    document: 'Tax Form W-4',
    employeeName: 'Arjun Sapkota',
    category: 'Tax',
    uploadDate: '12/12/2023',
    visibility: true,
  },
  {
    document: 'Employment Contract - 2024',
    employeeName: 'Sangita Thapa',
    category: 'Contracts',
    uploadDate: '01/11/2024',
    visibility: true,
  },
  {
    document: 'Performance Review Q1 2024',
    employeeName: 'Sagar Thapa',
    category: 'Agreements',
    uploadDate: '01/11/2024',
    visibility: false,
  },
  {
    document: 'NDA Agreement',
    employeeName: 'Rajan Magar',
    category: 'Policies',
    uploadDate: '04/05/2025',
    visibility: false,
  },
];
export interface VisibilityType {
  document: string;
  employeeName: string;
  category: string;
  uploadDate: string;
  visibility: boolean;
}
