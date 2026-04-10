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
  },
  {
    title: 'National ID/ Citizenship',
    subTitle: 'Pending',
    icon: CreditCard,
  },
  {
    title: 'Passport Copy',
    subTitle: 'Approved',
    icon: FileBadge,
  },
  {
    title: 'Educational Certificates',
    subTitle: 'Rejected',
    icon: GraduationCap,
  },
  {
    title: 'Pervious Experience Letter',
    subTitle: 'Missing',
    icon: Clock,
  },
];
