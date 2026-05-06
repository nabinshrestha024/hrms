import { useState } from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react';
import { type Editor, useEditorState } from '@tiptap/react';
import { ActionDropdown } from '../dropdown/action-drop-down';

type EditorProps = {
  editor: Editor;
};

export const HeadingDropdown = ({ editor }: EditorProps) => {
  const [open, setOpen] = useState(false);

  if (!editor) return null;

  const { type } = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (editor.isActive('heading', { level: 1 })) return { type: 'h1' };
      if (editor.isActive('heading', { level: 2 })) return { type: 'h2' };
      if (editor.isActive('heading', { level: 3 })) return { type: 'h3' };
      if (editor.isActive('blockquote')) return { type: 'quote' };
      if (editor.isActive('bulletList')) return { type: 'bullet' };
      if (editor.isActive('orderedList')) return { type: 'ordered' };

      return { type: 'paragraph' };
    },
  });

  const getCurrentLabel = () => {
    switch (type) {
      case 'h1':
        return 'Heading 1';
      case 'h2':
        return 'Heading 2';
      case 'h3':
        return 'Heading 3';
      case 'quote':
        return 'Quote';
      case 'bullet':
        return 'Bullet List';
      case 'ordered':
        return 'Ordered List';
      default:
        return 'Paragraph';
    }
  };

  const dropdownData = [
    {
      label: 'Paragraph',
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: type === 'paragraph',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <Heading1 className="w-4 h-4" />
          <span>Heading 1</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: type === 'h1',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <Heading2 className="w-4 h-4" />
          <span>Heading 2</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: type === 'h2',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <Heading3 className="w-4 h-4" />
          <span>Heading 3</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: type === 'h3',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <Quote className="w-4 h-4" />
          <span>Quote</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: type === 'quote',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <List className="w-4 h-4" />
          <span>Bullet List</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: type === 'bullet',
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <ListOrdered className="w-4 h-4" />
          <span>Ordered List</span>
        </div>
      ),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: type === 'ordered',
    },
  ];

  return (
    <ActionDropdown
      open={open}
      onOpenChange={setOpen}
      trigger={
        <div className="min-w-35 h-9 flex justify-center items-center border rounded-[6px] px-3 py-3 border-[#E4E4E7] bg-white text-[14px] font-normal cursor-pointer">
          {getCurrentLabel()}
        </div>
      }
      actions={dropdownData}
    />
  );
};
