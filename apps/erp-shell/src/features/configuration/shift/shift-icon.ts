import { type ShiftTypeKind } from '@erp/data-access';
import {
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Timer,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a `Shift.shiftType` enum value to its Lucide icon. Kept in the
 * feature layer (not in the schema) so the schema stays JSON-serialisable.
 */
const SHIFT_TYPE_ICON: Record<ShiftTypeKind, LucideIcon> = {
  Morning: Sunrise,
  Day: Sun,
  Evening: Sunset,
  Night: Moon,
  Flexible: Timer,
};

export function getShiftIcon(shiftType: ShiftTypeKind): LucideIcon {
  return SHIFT_TYPE_ICON[shiftType];
}
