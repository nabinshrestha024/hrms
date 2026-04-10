import {
  Clock,
  CreditCard,
  FileBadge,
  FileText,
  GraduationCap,
} from 'lucide-react';

export const personalDocumentData = [
  {
    title: 'Resume/ CV',
    subTitle: 'Missing',
    icon: FileText,
    templateName: 'File',
  },
  {
    title: 'National ID/ Citizenship',
    subTitle: 'Pending',
    icon: CreditCard,
    templateName: 'Template',
  },
  {
    title: 'Passport Copy',
    subTitle: 'Approved',
    icon: FileBadge,
    templateName: 'File',
  },
  {
    title: 'Educational Certificates',
    subTitle: 'Rejected',
    icon: GraduationCap,
    templateName: 'Template',
  },
  {
    title: 'Pervious Experience Letter',
    subTitle: 'Missing',
    icon: Clock,
    templateName: 'File',
  },
];
