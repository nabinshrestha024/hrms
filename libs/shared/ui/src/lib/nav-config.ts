import type { LucideIcon } from 'lucide-react';
import {
  ChartPie,
  UserCog,
  Calendar,
  Building2,
  Users,
  FileText,
  UserSearch,
  TentTree,
  BookUser,
  Settings,
  FileCheck2,
  CreditCard,
  // Sub-item icons
  Play,
  Cog,
  GitBranch,
  Clock,
  History,
  CalendarDays,
  Briefcase,
  LogIn,
  LogOut,
  Layers,
  Computer,
  Coins,
  MapPin,
  File,
  UserPlus,
  MapPinPlusInside,
  Network,
  BriefcaseBusiness,
  FileSearchCorner,
  FileCheckCorner,
  FileUp,
  Files,
  SquareUser,
  LayoutDashboard,
  CalendarPlus,
  Columns3Cog,
  CalendarMinus2,
  Wallet,
  Layers3,
} from 'lucide-react';

export interface NavSubItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavModule {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  /** Which tenant module keys gate this item (empty = always shown) */
  modules?: string[];
  subItems?: NavSubItem[];
}

export const navModules: NavModule[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: ChartPie,
    href: '/dashboard',
  },
  {
    id: '',
    label: '',
    icon: UserCog,
    href: '',
    modules: ['hr'],
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    modules: ['calendar'],
    subItems: [
      { label: 'Calendar', href: '/calendar/', icon: GitBranch },
      {
        label: 'Events & Holidays',
        href: '/calendar/event-holiday',
        icon: Layers,
      },
    ],
  },
  {
    id: 'company-setup',
    label: 'Company Setup',
    icon: Building2,
    href: '/company-setup/',
    modules: ['company-setup'],
    subItems: [
      {
        label: 'Company Profile',
        href: '/company-setup/',
        icon: Building2,
      },
      {
        label: 'Branch',
        href: '/company-setup/branch',
        icon: MapPinPlusInside,
      },
      { label: 'Department', href: '/company-setup/department', icon: Network },
    ],
  },
  {
    id: 'employees',
    label: 'Employee',
    icon: Users,
    href: '/employee',
    modules: ['hr'],
    subItems: [{ label: 'Employee', href: '/employee', icon: Users }],
  },

  {
    id: 'documents',
    label: 'Documents',
    icon: File,
    href: '/document-management/',
    modules: ['documents'],
    subItems: [
      {
        label: 'Missing Documents',
        href: '/document-management/',
        icon: FileSearchCorner,
      },
      {
        label: 'Review & Approval',
        href: '/document-management/review-approval',
        icon: FileCheckCorner,
      },
      {
        label: 'Assign Document',
        href: '/document-management/assign-document',
        icon: FileUp,
      },
      {
        label: 'Visibility',
        href: '/document-management/visibility',
        icon: File,
      },
      {
        label: 'Category Management',
        href: '/document-management/category-management',
        icon: Files,
      },
      {
        label: 'Document Template',
        href: '/document-management/document-template',
        icon: FileText,
      },
    ],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: UserSearch,
    href: '/attendance',
    modules: ['attendance'],
    subItems: [
      { label: 'Attendance Record', href: '/attendance', icon: UserSearch },
      {
        label: 'Work Record',
        href: '/attendance/work-record',
        icon: BriefcaseBusiness,
      },

      {
        label: 'My Attendance',
        href: '/attendance/my-attendance',
        icon: SquareUser,
      },
    ],
  },
  {
    id: 'leave',
    label: 'Leave',
    icon: TentTree,
    href: '/leave-management',
    modules: ['leave'],
    subItems: [
      { label: 'Leave Requests', href: '/leave-management/', icon: SquareUser },
      {
        label: 'My Requests',
        href: '/leave-management/my-request',
        icon: SquareUser,
      },
      {
        label: 'Leave Balance',
        href: '/leave-management/leave-balance',
        icon: SquareUser,
      },
    ],
  },

  {
    id: 'assets',
    label: 'Assets',
    icon: Computer,
    href: '/assets-management',
    modules: ['assets'],
    subItems: [
      {
        label: 'Categories',
        href: '/assets-management',
        icon: LayoutDashboard,
      },
      {
        label: 'All Assets',
        href: '/assets-management/all-assets',
        icon: Computer,
      },
      {
        label: 'Assignment History',
        href: '/assets-management/assignment-history',
        icon: History,
      },
    ],
  },
  {
    id: 'directory',
    label: 'Directories',
    icon: BookUser,
    href: '/directories',
    modules: ['hr'],
    subItems: [{ label: 'Directories', href: '/directories', icon: BookUser }],
  },

  {
    id: 'configuration',
    label: 'Configuration',
    icon: Settings,
    href: '/configuration',
    modules: ['configuration'],
    subItems: [
      {
        label: 'Leave Type',
        href: '/configuration',
        icon: CalendarPlus,
      },
      { label: 'Holidays', href: '/configuration/holidays', icon: TentTree },
      { label: 'Shifts', href: '/configuration/shifts', icon: Clock },
      {
        label: 'Work Week',
        href: '/configuration/work-week',
        icon: CalendarDays,
      },
    ],
  },

  {
    id: 'policy-configuration',
    label: 'Policy Configuration',
    icon: FileCheck2,
    href: '/policy-configuration/',
    modules: ['configuration'],
    subItems: [
      {
        label: 'Leave Deduction',
        href: '/policy-configuration/',
        icon: CalendarMinus2,
      },
      {
        label: 'Sandwich Rule',
        href: '/policy-configuration/sandwich-rule',
        icon: Layers3,
      },
      { label: 'Payroll', href: '/policy-configuration/payroll', icon: Wallet },
      {
        label: 'Workflow',
        href: '/policy-configuration/workflow',
        icon: GitBranch,
      },
    ],
  },

  {
    id: 'payroll',
    label: 'Payroll',
    icon: CreditCard,
    href: '/payroll/generate',
    modules: ['payroll'],
    subItems: [
      { label: 'Generate Payroll', href: '/payroll/generate', icon: Play },
      {
        label: 'Salary Structure',
        href: '/payroll/salary-structure',
        icon: Users,
      },
      { label: 'Payroll Setup', href: '/payroll/setup', icon: Cog },
      { label: 'Pay & Taxes', href: '/payroll/pay-taxes', icon: CreditCard },
    ],
  },

  {
    id: 'onboarding',
    label: 'On & Offboarding',
    icon: FileCheck2,
    href: '/onboarding/job-openings',
    modules: ['onboarding'],
    subItems: [
      {
        label: 'Job Openings',
        href: '/onboarding/job-openings',
        icon: Briefcase,
      },
      { label: 'Applicant List', href: '/onboarding/applicants', icon: Users },
      {
        label: 'Interview Pipeline',
        href: '/onboarding/pipeline',
        icon: GitBranch,
      },
      { label: 'Onboarding', href: '/onboarding/onboard', icon: LogIn },
      { label: 'Offboarding', href: '/onboarding/offboard', icon: LogOut },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: UserPlus,
    href: '/profile',
    modules: ['hr'],
  },
  {
    id: 'master-setup',
    label: 'Master Setup',
    href: '/master-setup',
    modules: ['hr'],
    icon: Columns3Cog,
    subItems: [
      {
        label: 'Holiday Types',
        icon: CalendarDays,
        href: '/master-setup',
      },
      {
        label: 'Currencies',
        icon: Coins,
        href: '/master-setup/currencies',
      },
      {
        label: 'Job Level',
        icon: Briefcase,
        href: '/master-setup/job-level',
      },
      {
        label: 'Work Types',
        icon: MapPin,
        href: '/master-setup/work-type',
      },
      {
        label: 'Leave Types',
        icon: FileText,
        href: '/master-setup/leave-type',
      },
    ],
  },
];

/**
 * Find which module owns a given path.
 * Returns the NavModule whose href prefix matches the path.
 */
export function findActiveModule(path: string): NavModule | undefined {
  if (path === '/dashboard')
    return navModules.find((m) => m.id === 'dashboard');

  return navModules
    .filter(
      (m) =>
        m.id !== 'dashboard' &&
        path.startsWith(m.href.split('/').slice(0, 2).join('/'))
    )
    .sort((a, b) => b.href.length - a.href.length)[0];
}
