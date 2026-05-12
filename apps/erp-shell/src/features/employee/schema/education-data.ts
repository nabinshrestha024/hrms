export const educationData = [
  {
    id: '1',
    qualification: 'Bachelor of Science',
    studyField: 'Computer Science',
    university: 'Tribhuvan University',
    startYear: '2018',
    endYear: '2022',
    grade: 3.75,
    status: 'Completed',
  },
];

export type EducationType = {
  id: string;
  qualification: string;
  studyField: string;
  university: string;
  startYear: string;
  endYear: string;
  grade: number;
  status: string;
};
