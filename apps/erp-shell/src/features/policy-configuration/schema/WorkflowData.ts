export const balanceValidationData = [
  {
    balanceTitle: 'Check Balance Before Apply',
    balanceSubTitle: 'Prevent applications exceeding available balance',
  },
  {
    balanceTitle: 'Allow Negative Balance',
    balanceSubTitle: 'Allow employees to apply for leave beyond their balance',
  },
];

export const notificationData = [
  'On Apply',
  'On Approve',
  'On Reject',
  'On Cancel',
];

export const adminOverridePermissionData = [
  {
    adminOverrideTitle: 'Cancel Approved Leave',
    adminOverrideSubTitle:
      'Admin can cancel any approved leave requests at any time  If payroll is processed, arrear adjustment will be created',
  },
  {
    adminOverrideTitle: 'Modify Leave Type',
    adminOverrideSubTitle:
      'Admin can change leave type (e.g., Sick leave ->Casual Leave)',
  },
  {
    adminOverrideTitle: 'Force Entry Leave',
    adminOverrideSubTitle:
      'Admin can create leave entries for employees who forgot to apply  If payroll is processed, arrear adjustment will be created',
  },
];

export const approvalWorkflowData = [
  {
    approvalWorkflowTitle: 'Require Manager Approval',
    approvalWorkflowSubTitle: 'First level approval',
  },
  {
    approvalWorkflowTitle: 'Require HR Approval',
    approvalWorkflowSubTitle: 'Second level approval',
  },
  {
    approvalWorkflowTitle: 'Enable Auto-Approve',
    approvalWorkflowSubTitle:
      'Automatically approve if no action taken within specified days',
  },
];
