export const taxDistributionOptions = [
  {
    label: 'Lump Sum Deduction',
    value: 'Lump Sum Deduction',
    description:
      'Full tax is deducted in the bonus month. Higher immediate deduction but simpler processing.',
    badgeVariants: 'default',
    badgeName: 'Higher tax in bonus month',
  },
  {
    label: 'Equal Monthly Distribution',
    value: 'Equal Monthly Distribution',
    description:
      'Bonus amount is added to each months taxable income equally (Bonus ÷ 12 per month). Lower monthly tax, spread evenly throughout the year',
    badgeVariants: 'secondary',
    badgeName: 'Recommended',
  },
  {
    label: 'Progressive Monthly Distribution',
    value: 'Progressive Monthly Distribution',
    description:
      'Tax calculated on projected annual income including bonus, then deducted monthly. Most accurate but complex calculation.',
    badgeVariants: 'default',
    badgeName: 'Advance',
  },
];

export const calculationBaseOption = [
  {
    id: 0,
    calculationBase: 'Basic Salary Only',
    formula: 'Bonus = Basic Salary × Months',
  },
  {
    id: 1,
    calculationBase: 'Basic + Dearness Allowance',
    formula: 'Bonus = (Basic + DA) × Months',
  },
  {
    id: 2,
    calculationBase: 'Full Gross Salary',
    formula: 'Bonus = Gross Salary × Months',
  },
  {
    id: 3,
    calculationBase: 'Percentage of Gross (e.g., 60%)',
    formula: 'Bonus = 60% of Gross × Months',
  },
];
