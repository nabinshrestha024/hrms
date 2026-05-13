import type { Employee } from '@erp/data-access';
import { Button } from '@erp/ui';
import { Edit, Save } from 'lucide-react';

export interface EditableSectionProps {
  title: string;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  formId: string;
  DisplayComponent: React.ComponentType<{ employee: Employee }>;
  EditComponent: React.ComponentType<{
    employee: Employee;
    onSuccess: () => void;
  }>;
  employee: Employee;
}

export const EditableSection = ({
  title,
  edit,
  setEdit,
  formId,
  DisplayComponent,
  EditComponent,
  employee,
}: EditableSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="text-[16px] font-medium leading-6 text-foreground">
          {title}
        </div>

        {edit ? (
          <div className="flex gap-1 md:gap-3 justify-end">
            <Button onClick={() => setEdit(false)} variant="outline">
              Cancel
            </Button>
            <Button type="submit" form={formId} variant="secondary">
              <Save />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setEdit(true)}>
            <Edit />
            Edit Details
          </Button>
        )}
      </div>

      {edit ? (
        <EditComponent employee={employee} onSuccess={() => setEdit(false)} />
      ) : (
        <DisplayComponent employee={employee} />
      )}
    </div>
  );
};
