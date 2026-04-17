import { useServerTableState } from '@erp/ui';
import { MissingDocumentType } from '../../schema/MissingDocumnetData';
import { getMissingDocumentColumns } from './get-missing-document-column';

interface MissingDocumentTableProps {
  data: MissingDocumentType[];
}

export function useMissingDocumentTable({ data }: MissingDocumentTableProps) {
  const columns = getMissingDocumentColumns();

  return useServerTableState<MissingDocumentType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: MissingDocumentType) => row.employeeId,
  });
}
