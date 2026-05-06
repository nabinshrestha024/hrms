import { useState } from 'react';
import { Editor, useEditorState } from '@tiptap/react';
import { Type } from 'lucide-react';
import { ActionDropdown } from '../dropdown/action-drop-down';
type EditorProps = {
  editor: Editor;
};
export const TextSize = ({ editor }: EditorProps) => {
  if (!editor) return null;

  const [openTextSize, setOpenTextSize] = useState(false);
  const { textSize } = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (editor.isActive('textStyle', { fontSize: '12px' }))
        return { textSize: '12' };
      if (editor.isActive('textStyle', { fontSize: '14px' }))
        return { textSize: '14' };
      if (editor.isActive('textStyle', { fontSize: '16px' }))
        return { textSize: '16' };
      if (editor.isActive('textStyle', { fontSize: '18px' }))
        return { textSize: '18' };
      if (editor.isActive('textStyle', { fontSize: '20px' }))
        return { textSize: '20' };
      if (editor.isActive('textStyle', { fontSize: '24px' }))
        return { textSize: '24' };
      if (editor.isActive('textStyle', { fontSize: '28px' }))
        return { textSize: '28' };
      if (editor.isActive('textStyle', { fontSize: '32px' }))
        return { textSize: '32' };
      return { textSize: <Type className="w-4 h-4 text-[#71717A]" /> };
    },
  });
  const getTextSize = () => {
    switch (textSize) {
      case '12':
        return '12';
      case '14':
        return '14';
      case '16':
        return '16';
      case '18':
        return '18';
      case '20':
        return '20';
      case '24':
        return '24';
      case '28':
        return '28';
      case '32':
        return '32';
      default:
        return <Type className="w-4 h-4 text-[#71717A]" />;
    }
  };

  const textData = [
    {
      label: '12px',
      onClick: () => editor.chain().focus().setFontSize('12px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '12px' }),
    },
    {
      label: '14px',
      onClick: () => editor.chain().focus().setFontSize('14px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '14px' }),
    },
    {
      label: '16px',
      onClick: () => editor.chain().focus().setFontSize('16px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '16px' }),
    },
    {
      label: '18px',
      onClick: () => editor.chain().focus().setFontSize('18px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '18px' }),
    },
    {
      label: '20px',
      onClick: () => editor.chain().focus().setFontSize('20px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '20px' }),
    },
    {
      label: '24px',
      onClick: () => editor.chain().focus().setFontSize('24px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '24px' }),
    },
    {
      label: '28px',
      onClick: () => editor.chain().focus().setFontSize('28px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '28px' }),
    },
    {
      label: '32px',
      onClick: () => editor.chain().focus().setFontSize('32px').run(),
      isActive: editor.isActive('textStyle', { fontSize: '32px' }),
    },
  ];
  return (
    <ActionDropdown
      open={openTextSize}
      onOpenChange={setOpenTextSize}
      trigger={
        <div className="h-9 flex justify-center items-center border rounded-[6px] px-3 py-3 border-[#E4E4E7] bg-white text-[14px] font-normal cursor-pointer">
          <span>
            {getTextSize() || <Type className="w-4 h-4 text-[#E4E4E7]" />}
          </span>
        </div>
      }
      actions={textData}
    />
  );
};
