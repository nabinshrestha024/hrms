export type TaxConfigurationType = {
  config: {
    minAmount: number;
    maxAmount: number;
    rate: number;
    description: string;
  }[];
};

export const taxConfigurationData = [
  {
    minAmount: 0,
    maxAmount: 5000,
    rate: 1,
    description: 'First 5 Lakhs',
  },
  {
    minAmount: 5000,
    maxAmount: 7000,
    rate: 10,
    description: 'Next 2 Lakhs',
  },
  {
    minAmount: 7000,
    maxAmount: 10000,
    rate: 20,
    description: 'Next 3 Lakhs',
  },
  {
    minAmount: 1000,
    maxAmount: 20000,
    rate: 30,
    description: 'Next 10 Lakhs',
  },
  {
    minAmount: 2000,
    maxAmount: 40000,
    rate: 36,
    description: 'Next 20 Lakhs',
  },
];
