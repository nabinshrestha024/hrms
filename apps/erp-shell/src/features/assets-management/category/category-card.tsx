import { HRCard } from '@erp/ui';
import { IconButton } from '../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';
import { CategoryType } from '../schema/CategoryData';
import { useState } from 'react';
import { FilteredAssets } from '../all-assets/filtered-assets';
import { assetsData } from '../schema/AllAssetsData';

interface CategoryProps {
  data: CategoryType[];
}
export const CategoryCard = ({ data }: CategoryProps) => {
  const [openTable, setOpenTable] = useState(false);
  const [category, setCategory] = useState('');
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-6 mt-8">
        {data.map((items, index) => {
          const Icon = items.icon;
          return (
            <HRCard
              key={index}
              cardClassName={`p-4  rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer ${
                category === items.categoryName
                  ? 'border-2 border-primary'
                  : 'border border-[#E4E4E7]'
              }`}
              cardContentClassName="flex flex-col gap-4 p-0"
              onClick={() => {
                setOpenTable(true);
                setCategory(items.categoryName);
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
                  {items.categoryName}
                </span>
                <span className="text-foreground font-medium">
                  {items.noOfAssets} assets
                </span>
                <span className="text-foreground font-medium">
                  {items.assetsList.map((assets, i) => (
                    <span key={i}>
                      {assets}
                      {', '}
                    </span>
                  ))}
                </span>
              </div>
            </HRCard>
          );
        })}
      </div>
      {openTable && <FilteredAssets data={assetsData} category={category} />}
    </div>
  );
};
