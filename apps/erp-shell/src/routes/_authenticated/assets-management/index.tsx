import { createFileRoute } from '@tanstack/react-router';
import { CategoryManagement } from '../../../features/assets-management/category/category-management';

export const Route = createFileRoute('/_authenticated/assets-management/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'Category',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB]">
      <div className="px-12 py-6 text-[20px] font-semibold leading-12 text-[#09090B] ">
        Category
      </div>
      <div className="px-6 pt-0 pb-32.5 ">
        <CategoryManagement />
      </div>
    </div>
  );
}
