import type { AssetCategory } from '@erp/data-access';

/**
 * Asset-category seed.
 * Field changes from legacy `categoryData`:
 *   categoryName -> name
 *   noOfAssets "24" (string) -> assetCount: 24 (number)
 *   assetsList   -> exampleAssets (renamed for clarity)
 *   icon (LucideIcon) -> iconKey enum (icon resolved at render time;
 *                                     schema stays JSON-serialisable)
 */
export const assetCategorySeed: AssetCategory[] = [
  {
    id: 'aca-001',
    name: 'Electronics',
    iconKey: 'electronics',
    assetCount: 24,
    exampleAssets: ['Computer', 'Laptop', 'Phones'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'aca-002',
    name: 'Furniture',
    iconKey: 'furniture',
    assetCount: 12,
    exampleAssets: ['Desk', 'Chairs', 'Cabinets'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'aca-003',
    name: 'Vehicle',
    iconKey: 'vehicle',
    assetCount: 2,
    exampleAssets: ['Company cars', 'Bikes'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'aca-004',
    name: 'IT Equipment',
    iconKey: 'it-equipment',
    assetCount: 32,
    exampleAssets: ['Servers', 'Routers', 'Cables'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'aca-005',
    name: 'Cleanliness',
    iconKey: 'cleanliness',
    assetCount: 34,
    exampleAssets: ['Mop', 'Harpic', 'Detol'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
