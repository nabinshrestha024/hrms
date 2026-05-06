export const candidateData: CandidateType[] = [
  {
    name: 'Ronish Basnet',
    role: 'Senior Manager',
    department: 'Engineering',
    interviewer: 'Sarah Chen',
    scheduledDate: '2026-01-15',
    overallRating: 4.5,
    progress: 25,
    stages: [
      {
        name: 'Applied',
        status: 'completed',
      },
      {
        name: 'Phone Screen',
        status: 'completed',
      },
      {
        name: 'Technical',
        status: 'completed',
      },
      {
        name: 'Cultural Fit',
        status: 'active',
      },
      {
        name: 'Final Round',
        status: 'pending',
      },
      {
        name: 'Offer',
        status: 'pending',
      },
      {
        name: 'Hired',
        status: 'pending',
      },
    ],
  },
  {
    name: 'Sarita K.C',
    role: 'Senior Manager',
    department: 'Engineering',
    interviewer: 'Sarah Chen',
    scheduledDate: '2026-01-15',
    overallRating: 4.5,
    progress: 25,
    stages: [
      {
        name: 'Applied',
        status: 'completed',
      },
      {
        name: 'Phone Screen',
        status: 'active',
      },
      {
        name: 'Technical',
        status: 'pending',
      },
      {
        name: 'Cultural Fit',
        status: 'pending',
      },
      {
        name: 'Final Round',
        status: 'pending',
      },
      {
        name: 'Offer',
        status: 'pending',
      },
      {
        name: 'Hired',
        status: 'pending',
      },
    ],
  },
];

export default candidateData;

export type StageStatus = 'completed' | 'active' | 'pending';

export type Stage = {
  name: string;
  status: StageStatus;
};

export type CandidateType = {
  name: string;
  role: string;
  department: string;
  interviewer: string;
  scheduledDate: string;
  overallRating: number;
  progress: number;
  stages: Stage[];
};
