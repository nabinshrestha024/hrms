import { Bold, Code, Italic, Strikethrough, Underline } from 'lucide-react';
import { useEditorState, type Editor } from '@tiptap/react';
import { Button } from '../../primitives/button';

type MarkDownProps = {
  editor: Editor;
};

export const MarkDown = ({ editor }: MarkDownProps) => {
  if (!editor) return null;

  const { marks } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      marks: {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        strike: editor.isActive('strike'),
        code: editor.isActive('code'),
      },
    }),
  });

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        tooltip="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          marks.bold ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <Bold className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        tooltip="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          marks.italic ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <Italic className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        tooltip="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          marks.underline ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <Underline className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        tooltip="Strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          marks.strike ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        tooltip="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          marks.code ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <Code className="w-4 h-4" />
      </Button>
    </div>
  );
};
