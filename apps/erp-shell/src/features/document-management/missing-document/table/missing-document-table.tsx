import { type MissingDocument } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useMissingDocumentTable } from './use-missing-document-table';

interface MissingDocumentTableProps {
  data: MissingDocument[];
}

export const MissingDocumentTable = ({ data }: MissingDocumentTableProps) => {
  const { columns, table } = useMissingDocumentTable({ data });

  return (
    <div className="px-6 pb-19.5 bg-background">
      <DataTable table={table} columns={columns} />
    </div>
  );
};
