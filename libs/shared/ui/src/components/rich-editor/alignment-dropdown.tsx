import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDownIcon,
} from 'lucide-react';
import { type Editor, useEditorState } from '@tiptap/react';
import { useState } from 'react';
import { ActionDropdown } from '../dropdown/action-drop-down';

type EditorProps = {
  editor: Editor;
};

export const Alignment = ({ editor }: EditorProps) => {
  const [openAlignmet, setOpenAlignmet] = useState(false);

  const { alignment } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      alignment: editor.isActive({ textAlign: 'center' })
        ? 'center'
        : editor.isActive({ textAlign: 'right' })
        ? 'right'
        : 'left',
    }),
  });

  const alignmentData = [
    {
      label: <AlignLeft className="w-4 h-4 text-[#71717A]" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: alignment === 'left',
    },
    {
      label: <AlignCenter className="w-4 h-4 text-[#71717A]" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: alignment === 'center',
    },
    {
      label: <AlignRight className="w-4 h-4 text-[#71717A]" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: alignment === 'right',
    },
  ];

  const getCurrentAlignment = () => {
    if (alignment === 'center')
      return <AlignCenter className="w-4 h-4 text-[#71717A]" />;
    if (alignment === 'right')
      return <AlignRight className="w-4 h-4 text-[#71717A]" />;
    return <AlignLeft className="w-4 h-4 text-[#71717A]" />;
  };

  if (!editor) return null;

  return (
    <ActionDropdown
      open={openAlignmet}
      onOpenChange={setOpenAlignmet}
      trigger={
        <div className="h-9 flex items-center justify-between border rounded px-3 cursor-pointer">
          {getCurrentAlignment()}
          <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
        </div>
      }
      actions={alignmentData}
      displayClassName="flex flex-row items-center"
    />
  );
};
