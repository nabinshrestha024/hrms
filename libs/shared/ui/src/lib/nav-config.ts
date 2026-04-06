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
  Monitor,
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
  Eye,
  FolderOpen,
  ListChecks,
  CalendarDays,
  Briefcase,
  UserCheck,
  LogIn,
  LogOut,
  FileSearch,
  Upload,
  Layers,
  Archive,
  Computer,
  Coins,
  MapPin,
  File,
  UserPlus,
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
    href: '/company-setup/profile',
    modules: ['company-setup'],
    subItems: [
      {
        label: 'Company Profile',
        href: '/company-setup/profile',
        icon: Building2,
      },
      { label: 'Branch', href: '/company-setup/branch', icon: GitBranch },
      { label: 'Department', href: '/company-setup/department', icon: Layers },
    ],
  },
  {
    id: 'employees',
    label: 'Employee',
    icon: Users,
    href: '/employees',
    modules: ['hr'],
    subItems: [{ label: 'Employee', href: '/employees', icon: Users }],
  },

  {
    id: 'documents',
    label: 'Documents',
    icon: File,
    href: '/documents/missing',
    modules: ['documents'],
    subItems: [
      {
        label: 'Missing Documents',
        href: '/documents/missing',
        icon: FileSearch,
      },
      {
        label: 'Review & Approval',
        href: '/documents/review',
        icon: ListChecks,
      },
      { label: 'Document Upload', href: '/documents/upload', icon: Upload },
      { label: 'Visibility', href: '/documents/visibility', icon: Eye },
      {
        label: 'Category Management',
        href: '/documents/categories',
        icon: FolderOpen,
      },
      { label: 'Version History', href: '/documents/history', icon: History },
    ],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: UserSearch,
    href: '/attendance',
    modules: ['attendance'],
    subItems: [
      { label: 'My Attendance', href: '/attendance/my', icon: UserCheck },
      { label: 'Work Record', href: '/attendance/work-record', icon: Clock },
      {
        label: 'Attendance Today',
        href: '/attendance/today',
        icon: CalendarDays,
      },
      { label: 'History', href: '/attendance/history', icon: History },
    ],
  },
  {
    id: 'leave',
    label: 'Leave',
    icon: TentTree,
    href: '/leave/requests',
    modules: ['leave'],
    subItems: [
      { label: 'Leave Requests', href: '/leave/requests', icon: ListChecks },
      { label: 'My Requests', href: '/leave/my-requests', icon: FileText },
      { label: 'Leave Balance', href: '/leave/balance', icon: CalendarDays },
    ],
  },

  {
    id: 'assets',
    label: 'Assets',
    icon: Monitor,
    href: '/assets/categories',
    modules: ['assets'],
    subItems: [
      { label: 'Categories', href: '/assets/categories', icon: FolderOpen },
      { label: 'All Assets', href: '/assets/all', icon: Archive },
      { label: 'Assignment History', href: '/assets/history', icon: History },
    ],
  },
  {
    id: 'directory',
    label: 'Directory',
    icon: BookUser,
    href: '/directory',
    modules: ['hr'],
  },

  {
    id: 'configuration',
    label: 'Configuration',
    icon: Settings,
    href: '/configuration/leave-type',
    modules: ['configuration'],
    subItems: [
      {
        label: 'Leave Type',
        href: '/configuration/leave-type',
        icon: TentTree,
      },
      { label: 'Holidays', href: '/configuration/holidays', icon: Users },
      { label: 'Shifts', href: '/configuration/shifts', icon: Clock },
      {
        label: 'Work Week',
        href: '/configuration/work-week',
        icon: CalendarDays,
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
    modules: ['master-setup'],
    icon: Computer,
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
