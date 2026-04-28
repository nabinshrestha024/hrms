import { type AssetCategoryIconKey } from '@erp/data-access';
import {
  Car,
  Computer,
  Feather,
  Router,
  Sofa,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps an `AssetCategory.iconKey` enum value to its Lucide icon. Kept
 * in the feature layer (not the schema) so the schema stays
 * JSON-serialisable.
 */
const ICON_BY_KEY: Record<AssetCategoryIconKey, LucideIcon> = {
  electronics: Computer,
  furniture: Sofa,
  vehicle: Car,
  'it-equipment': Router,
  cleanliness: Feather,
};

export function getAssetCategoryIcon(key: AssetCategoryIconKey): LucideIcon {
  return ICON_BY_KEY[key];
}
