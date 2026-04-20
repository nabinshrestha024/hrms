import { Car, Computer, Feather, LucideIcon, Router, Sofa } from 'lucide-react';

export const categoryData = [
  {
    categoryName: 'Electronics',
    noOfAssets: '24',
    assetsList: ['Computer', 'Laptop', 'Phones'],
    icon: Computer,
  },
  {
    categoryName: 'Furniture',
    noOfAssets: '12',
    assetsList: ['Desk', 'Chairs', 'cabinets'],
    icon: Sofa,
  },
  {
    categoryName: 'Vehicle',
    noOfAssets: '2',
    assetsList: ['Company cars', 'bikes'],
    icon: Car,
  },
  {
    categoryName: 'IT Equipment',
    noOfAssets: '32',
    assetsList: ['servers', 'routers', 'cables'],
    icon: Router,
  },
  {
    categoryName: 'Cleanliness',
    noOfAssets: '34',
    assetsList: ['Mop', 'Harpic', 'Detol'],
    icon: Feather,
  },
];

export type CategoryType = {
  categoryName: string;
  noOfAssets: string;
  assetsList: string[];
  icon: LucideIcon;
};
