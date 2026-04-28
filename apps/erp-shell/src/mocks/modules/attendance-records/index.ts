import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createAttendanceRecordSchema,
  updateAttendanceRecordSchema,
  type AttendanceRecord,
} from '@erp/data-access';
import { attendanceRecordSeed } from './seed';

export function initAttendanceRecordsModule() {
  db.registerCollection('attendance-records', attendanceRecordSeed);

  return createCrudHandlers<AttendanceRecord>('attendance-records', {
    idPrefix: 'atr',
    searchFields: ['employeeName', 'employeeId', 'branch'],
    createSchema: createAttendanceRecordSchema,
    updateSchema: updateAttendanceRecordSchema,
    filterFn: (item, params) => {
      if (params.employeeId && item.employeeId !== params.employeeId)
        return false;
      if (params.branch && item.branch !== params.branch) return false;
      if (params.status && item.status !== params.status) return false;
      if (params.month && !item.date.startsWith(params.month)) return false;
      return true;
    },
  });
}
