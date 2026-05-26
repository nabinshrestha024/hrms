import { type MissingDocument } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useMissingDocumentTable } from './use-missing-document-table';

interface MissingDocumentTableProps {
  data: MissingDocument[];
}

export const MissingDocumentTable = ({ data }: MissingDocumentTableProps) => {
  const { columns, table } = useMissingDocumentTable({ data });

  return (
    <div className="px-3 lg:px-6 pb-19.5 bg-background">
      <DataTable table={table} columns={columns} className="p-3 lg:p-6" />
    </div>
  );
};
