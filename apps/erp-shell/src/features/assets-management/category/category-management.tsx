import { HRCard } from '@erp/ui';
import { AssetsRecordCard } from './assets-record-card';
import { Category } from './category';

export const CategoryManagement = () => {
  return (
    <HRCard
      cardClassName="p-6 border-none bg-white shadow-none rounded-xl"
      cardContentClassName="p-0 flex flex-col gap-8"
    >
      <AssetsRecordCard />
      <Category />
    </HRCard>
  );
};
