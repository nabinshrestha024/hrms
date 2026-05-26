import type { DocumentReview } from '@erp/data-access';

/**
 * Document-review seed.
 * Field changes from legacy `reviewApprovalData`:
 *   status "Pending" / "Accepted" / "Rejected" -> enum 'pending'/'accepted'/'rejected'
 *   rejectedReason "" empty string             -> dropped (omit when not rejected)
 */
export const documentReviewSeed: DocumentReview[] = [
  {
    id: 'drv-001',
    fileName: 'Passport Copy',
    type: 'Passport IDs',
    size: '3.2 MB',
    date: '2024-03-15',
    uploadedBy: 'Sarah Johnson',
    employeeId: 'EID01',
    employeeName: 'Sarah Pandey',
    employeeDepartment: 'Technical',
    status: 'pending',
    file: '/Image.png',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'drv-002',
    fileName: 'Citizenship Copy',
    type: 'Personal IDs',
    size: '3.2 MB',
    date: '2024-03-15',
    uploadedBy: 'Sarah Pandey',
    employeeId: 'EID02',
    employeeName: 'Ram Kumar',
    employeeDepartment: 'Technical',
    status: 'accepted',
    file: '/Image.png',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'drv-003',
    fileName: 'License Copy',
    type: 'Personal IDs',
    size: '3.2 MB',
    date: '2024-03-15',
    uploadedBy: 'Pragya Pandey',
    employeeId: 'EID03',
    employeeName: 'John Doe',
    employeeDepartment: 'Technical',
    file: '/Image.png',
    status: 'rejected',
    rejectedReason:
      'Document is too blurry and text is not readable. Please upload a clearer scan or photo.',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];
