import { DataTable } from '@erp/ui';
import { MissingDocumentType } from '../../schema/MissingDocumnetData';
import { useMissingDocumentTable } from './use-missing-document-table';

interface MissingDocumentTableProps {
  data: MissingDocumentType[];
}

export const MissingDocumentTable = ({ data }: MissingDocumentTableProps) => {
  const { columns, table } = useMissingDocumentTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
