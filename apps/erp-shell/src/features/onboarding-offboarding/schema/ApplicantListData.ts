export type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  cv: string;
  position: string;
  status: string;
};

export const candidates = [
  {
    id: 1,
    name: 'Mahesh Sharma',
    email: 'mahesh@example.com',
    phone: '9841000000',
    cv: 'cv.pdf',
    position: 'Senior Software Engineer',
    status: 'Selected',
  },
  {
    id: 2,
    name: 'Ramesh Pandey',
    email: 'ramesh@example.com',
    phone: '9816000000',
    cv: 'cv.pdf',
    position: 'Senior Software Engineer',
    status: 'Rejected',
  },
  {
    id: 3,
    name: 'Sudesh Kumar',
    email: 'sudesh@example.com',
    phone: '9813000000',
    cv: 'cv.pdf',
    position: 'Senior Software Engineer',
    status: 'Shortlisted',
  },
  {
    id: 4,
    name: 'Shanti Maharjan',
    email: 'shanti@example.com',
    phone: '9841500000',
    cv: 'cv.pdf',
    position: 'UI/UX Designer',
    status: 'Shortlisted',
  },
  {
    id: 5,
    name: 'Shruti Thapa',
    email: 'shruti@example.com',
    phone: '9823451000',
    cv: 'cv.pdf',
    position: 'UI/UX Designer',
    status: 'Rejected',
  },
];
