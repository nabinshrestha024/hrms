import { useState, useMemo } from 'react';
import { Editor, useEditorState } from '@tiptap/react';
import { Type } from 'lucide-react';
import { ActionDropdown } from '../dropdown/action-drop-down';

type EditorProps = {
  editor: Editor;
};

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32'];

export const TextSize = ({ editor }: EditorProps) => {
  if (!editor) return null;

  const [openTextSize, setOpenTextSize] = useState(false);

  const { activeSize } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const found = FONT_SIZES.find((size) =>
        editor.isActive('textStyle', { fontSize: `${size}px` })
      );
      return { activeSize: found || null };
    },
  });

  const textData = useMemo(
    () =>
      FONT_SIZES.map((size) => ({
        label: `${size}px`,
        onClick: () => editor.chain().focus().setFontSize(`${size}px`).run(),
        isActive: activeSize === size,
      })),
    [editor, activeSize]
  );

  const getTextSize = () => {
    return activeSize ? (
      `${activeSize}px`
    ) : (
      <Type className="w-4 h-4 text-secondary-foreground" />
    );
  };

  return (
    <ActionDropdown
      open={openTextSize}
      onOpenChange={setOpenTextSize}
      trigger={
        <div className="h-9 flex justify-center items-center border rounded-[6px] px-3 py-3 border-border bg-white text-[14px] font-normal cursor-pointer">
          <span>{getTextSize()}</span>
        </div>
      }
      actions={textData}
    />
  );
};
