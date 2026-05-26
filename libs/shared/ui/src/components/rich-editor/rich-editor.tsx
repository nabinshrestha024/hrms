import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import { EditorContent } from '@tiptap/react';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';
import { Link } from 'lucide-react';
import { Alignment } from './alignment-dropdown';
import { Button } from '../../primitives/button';
import { HeadingDropdown } from './heading-dropdown';
import { MarkDown } from './markdown';
import { TextSize } from './text-size-dropdown';
import { UndoRedo } from './undo-redo';
import '../rich-editor/rich-editor.css';

type RichEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const RichEditor = ({ onChange }: RichEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-border pl-4 text-secondary-foreground',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      FontSize,
      TextStyle,
    ],
    content: '<p>Write Something....</p>',

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-[6px] py-2.5">
      <div className="flex flex-col gap-2 px-3 pb-2.5 mb-2">
        <div className="flex flex-col md:flex-row gap-1 md:items-center ">
          <HeadingDropdown editor={editor} />
          <MarkDown editor={editor} />
          <div className="flex gap-1 items-center ">
            <TextSize editor={editor} />
            <Alignment editor={editor} />
            <Button
              type="button"
              variant="outline"
              tooltip="Link"
              onClick={() => {
                const url = prompt('Enter URL');
                if (url) {
                  editor.chain().focus().toggleLink().run();
                }
              }}
              className={`flex items-center rounded-[6px] cursor-pointer ${
                editor.isActive('link')
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              <Link className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <UndoRedo editor={editor} />
      </div>
      <EditorContent
        editor={editor}
        className="tiptap.ProseMirror  max-h-75 overflow-auto px-3 py-2.5 border-b border-b-[#E4E4E7] border-t border-t-[#E4E4E7]"
      />
    </div>
  );
};
