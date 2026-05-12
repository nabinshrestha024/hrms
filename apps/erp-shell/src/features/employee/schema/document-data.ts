import {
  Clock,
  CreditCard,
  FileBadge,
  FileText,
  GraduationCap,
} from 'lucide-react';

export const personalDocumentData = [
  {
    id: 1,
    title: 'Resume/ CV',
    subTitle: 'Missing',
    icon: FileText,
    templateName: 'File',
  },
  {
    id: 2,
    title: 'National ID/ Citizenship',
    subTitle: 'Pending',
    icon: CreditCard,
    templateName: 'Template',
  },
  {
    id: 3,
    title: 'Passport Copy',
    subTitle: 'Approved',
    icon: FileBadge,
    templateName: 'File',
  },
  {
    id: 4,
    title: 'Educational Certificates',
    subTitle: 'Rejected',
    icon: GraduationCap,
    templateName: 'Template',
  },
  {
    id: 5,
    title: 'Pervious Experience Letter',
    subTitle: 'Missing',
    icon: Clock,
    templateName: 'File',
  },
];
