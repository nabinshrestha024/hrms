export type AssetType = {
  assetName: string;
  category: string;
  serialNumber: string;
  status: string;
  assignedTo: string | null;
  condition: string;
  value: number;
  date: string;
};

export const assetsData = [
  {
    assetName: 'Dell Latitude 7420',
    category: 'IT Equipment',
    serialNumber: 'IT-DEL-00123',
    status: 'Assigned',
    assignedTo: 'Aarav Sharma',
    condition: 'Good',
    date: '2025/1/16',
    value: 1200,
  },
  {
    assetName: 'Office Desk - Wooden',
    category: 'Furniture',
    serialNumber: 'FUR-DSK-00456',
    status: 'Available',
    assignedTo: null,
    condition: 'Excellent',
    date: '',
    value: 300,
  },
  {
    assetName: 'Toyota Corolla 2020',
    category: 'Vehicle',
    serialNumber: 'VEH-TYT-00789',
    status: 'Assigned',
    assignedTo: 'Sita Karki',
    condition: 'Good',
    date: '2025/1/16',
    value: 18000,
  },
  {
    assetName: 'HP LaserJet Pro M404',
    category: 'Electronics',
    serialNumber: 'ELE-HP-00234',
    status: 'Available',
    assignedTo: null,
    condition: 'Fair',
    date: '',
    value: 450,
  },
  {
    assetName: 'Cisco Router RV340',
    category: 'IT Equipment',
    serialNumber: 'IT-CSC-00987',
    status: 'Assigned',
    assignedTo: 'Ramesh Adhikari',
    condition: 'Good',
    date: '2025/1/16',
    value: 600,
  },
  {
    assetName: 'Office Chair - Ergonomic',
    category: 'Furniture',
    serialNumber: 'FUR-CHR-00678',
    status: 'Assigned',
    assignedTo: 'Nisha Rai',
    condition: 'Excellent',
    date: '2025/1/16',
    value: 150,
  },
  {
    assetName: 'MacBook Pro 14-inch',
    category: 'IT Equipment',
    serialNumber: 'IT-APL-00321',
    status: 'Assigned',
    assignedTo: 'Kiran Thapa',
    condition: 'Excellent',
    date: '2025/1/16',
    value: 2200,
  },
  {
    assetName: 'Vacuum Cleaner - Philips',
    category: 'Cleanliness',
    serialNumber: 'CLN-PHL-00890',
    status: 'Available',
    assignedTo: null,
    condition: 'Good',
    date: '',
    value: 200,
  },
  {
    assetName: 'Projector - Epson X41',
    category: 'Electronics',
    serialNumber: 'ELE-EPS-00111',
    status: 'Assigned',
    assignedTo: 'Anita Gurung',
    condition: 'Fair',
    date: '2025/1/16',
    value: 700,
  },
  {
    assetName: 'Motorbike - Honda CB Shine',
    category: 'Vehicle',
    serialNumber: 'VEH-HND-00555',
    status: 'Available',
    assignedTo: null,
    condition: 'Good',
    date: '',
    value: 1200,
  },
];
