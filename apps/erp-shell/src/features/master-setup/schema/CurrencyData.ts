import type { ReactNode } from 'react';

export const currencyData = [
  {
    currencyName: 'NPR',
    details: 'Nepalese Rupee',
    currencySymbol: 'रू',
  },
  {
    currencyName: 'USD',
    details: 'United States Dollar',
    currencySymbol: '$',
  },
  {
    currencyName: 'JPY',
    details: 'Japanese Yen',
    currencySymbol: '¥',
  },
];

export type CurrencyDataType = {
  currencyName: string;
  details: string;
  currencySymbol: ReactNode;
};
