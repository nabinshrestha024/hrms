import { useServerTableState } from '@erp/ui';
import { useMemo } from 'react';
import { TaxConfigurationType } from '../../../../schema/TaxSlabsData';
import { getTaxConfigurationColumns } from './get-tax-configuration-column';

interface TaxConfigurationTableProps {
  data: TaxConfigurationType[];
}

export function useTaxConfigurationTable({ data }: TaxConfigurationTableProps) {
  const columns = useMemo(() => getTaxConfigurationColumns(), []);

  const tableState = useServerTableState<TaxConfigurationType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: TaxConfigurationType) =>
      Array.isArray(row.config) && row.config.length > 0
        ? row.config[0].description
        : '',
  });

  return { ...tableState, columns };
}
