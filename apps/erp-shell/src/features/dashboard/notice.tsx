import { Badge, Button } from '@erp/ui';
import { CreateAnnouncementForm } from './create-announcement/create-announcement-form';
import { noticeData } from './schema/notice-data';

type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    dialogClassName?: string;
    componentClassName?: string;
    onCancel?: () => void;
  }) => void;
}
export const Notice = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="w-full h-153 py-6 pl-6 pr-3 bg-white rounded-xl shadow-sm flex flex-col gap-4">
        <div className="text-[18px] text-foreground font-medium leading-7">
          Notice
        </div>
        <div className="flex flex-col gap-3 overflow-auto pr-3 notice-scroll">
          {noticeData.map((val, index) => (
            <div
              className="p-2 bg-background rounded-xl  flex gap-3"
              key={index}
            >
              <div className="w-17.5 h-17.5 rounded-xl p-px border border-border bg-border">
                <img
                  src={val.image}
                  alt="noticeImage"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="flex-1 flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-[14px] text-foreground font-medium leading-5 line-clamp-1">
                    {val.title}
                  </span>
                  <div
                    className={`px-2 py-1 rounded-[400px] font-normal text-[12px] leading-4`}
                  >
                    {val.noticeType === 'Important' && (
                      <Badge variant="destructive">Important</Badge>
                    )}
                    {val.noticeType === 'Info' && (
                      <Badge variant="primary">Info</Badge>
                    )}
                    {val.noticeType === 'Notice' && (
                      <Badge variant="warning">Notice</Badge>
                    )}
                  </div>
                </div>
                <span className="text-[12px] text-secondary-foreground font-normal leading-4 line-clamp-2">
                  {val.description}
                </span>
                <span className="text-[8px] text-secondary-foreground font-normal leading-3">
                  {val.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer text-[14px] font-medium leading-5 text-white"
            onClick={() => {
              onOpen({
                modalTitle: 'Create Announcement',
                title: 'Create Announcement',
                okText: 'Add',
                size: 'lg',
                cancelText: 'Cancel',
                formId: 'announcement',
                dialogClassName: 'max-h-[150vh]',
                componentClassName: 'py-4 pl-4 pr-2',
                component: <CreateAnnouncementForm />,
              });
            }}
          >
            Create Now
          </Button>
        </div>
      </div>
    </>
  );
};
