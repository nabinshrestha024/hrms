import { type MissingDocument } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getMissingDocumentColumns } from './get-missing-document-column';

interface MissingDocumentTableProps {
  data: MissingDocument[];
}

export function useMissingDocumentTable({ data }: MissingDocumentTableProps) {
  const columns = getMissingDocumentColumns();

  const tableState = useServerTableState<MissingDocument>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return { ...tableState, columns };
}
