import { useAssets, type AssetCategory } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { IconButton } from '../../../components/icon-button';
import { FilteredAssets } from '../all-assets/filtered-assets';
import { getAssetCategoryIcon } from './asset-category-icon';

interface CategoryProps {
  data: AssetCategory[];
}

export const CategoryCard = ({ data }: CategoryProps) => {
  const [openTable, setOpenTable] = useState(false);
  const [category, setCategory] = useState('');
  const { data: assetsResponse } = useAssets({ pageSize: 100 });
  const assets = assetsResponse?.data ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-6 mt-8">
        {data.map((items) => {
          const Icon = getAssetCategoryIcon(items.iconKey);
          return (
            <HRCard
              key={items.id}
              cardClassName={`p-4  rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer ${
                category === items.name
                  ? 'border-2 border-primary'
                  : 'border border-border'
              }`}
              cardContentClassName="flex flex-col gap-4 p-0"
              onClick={() => {
                setOpenTable(true);
                setCategory(items.name);
              }}
            >
              <div className="flex justify-between items-center ">
                <IconButton variant="request" className="w-10 h-10 p-3">
                  <Icon className="w-4 h-4 " />
                </IconButton>
                <div className="flex gap-2">
                  <IconButton variant="default">
                    <Edit className="w-4 h-4 text-black font-bold" />
                  </IconButton>
                  <IconButton variant="destructive">
                    <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-col text-[16px] leading-6">
                <span className="text-secondary-foreground font-normal">
                  {items.name}
                </span>
                <span className="text-foreground font-medium">
                  {items.assetCount} assets
                </span>
                <span className="text-foreground font-medium">
                  {items.exampleAssets.map((assetName, i) => (
                    <span key={i}>
                      {assetName}
                      {', '}
                    </span>
                  ))}
                </span>
              </div>
            </HRCard>
          );
        })}
      </div>
      {openTable && <FilteredAssets data={assets} category={category} />}
    </div>
  );
};
