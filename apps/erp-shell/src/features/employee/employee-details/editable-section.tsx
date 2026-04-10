import type { Employee } from '@erp/data-access';
import { Button } from '@erp/ui';
import { Edit, Save } from 'lucide-react';

export interface EditableSectionProps {
  title: string;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  formId: string;
  DisplayComponent: React.ComponentType<{ employee: Employee }>;
  EditComponent: React.ComponentType;
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
      <div className="flex justify-between items-center">
        <div className="text-[16px] font-medium leading-6 text-foreground">
          {title}
        </div>

        {edit ? (
          <div className="flex gap-3">
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

      {edit ? <EditComponent /> : <DisplayComponent employee={employee} />}
    </div>
  );
};
