import { DataTable } from '@erp/ui';
import { TaxConfigurationType } from '../../../../schema/TaxSlabsData';
import { useTaxConfigurationTable } from './use-tax-configuration-table';

interface TaxConfigurationTableProps {
  data: TaxConfigurationType[];
}

export const TaxConfigurationTable = ({ data }: TaxConfigurationTableProps) => {
  const { columns, table } = useTaxConfigurationTable({ data });

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        className="px-0 py-0"
        isPagination={true}
      />
    </>
  );
};
