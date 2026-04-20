export const workTypeData = [
  {
    worktype: 'Work From Home',
    details: 'Fully remote working arrangement',
  },
  {
    worktype: 'OnSite',
    details: 'Required to work at the office premises',
  },
  {
    worktype: 'Hybrid',
    details: 'Combination of remote and onsite work',
  },
];

export type WorkTypeDataType = {
  worktype: string;
  details: string;
};
