import { Redo2, Undo2 } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { Button } from '../../primitives/button';

type UndoRedoProps = {
  editor: Editor | null;
};
export const UndoRedo = ({ editor }: UndoRedoProps) => {
  if (!editor) return null;
  return (
    <div className="flex gap-1 items-center ">
      <Button
        type="button"
        variant="outline"
        tooltip="Undo"
        onClick={() => editor.commands.undo()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          editor.isActive('undo')
            ? 'bg-black text-white'
            : 'bg-white text-black'
        }`}
      >
        <Undo2 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        tooltip="Redo"
        onClick={() => editor.commands.redo()}
        className={`flex items-center rounded-[6px] cursor-pointer ${
          editor.isActive('redo')
            ? 'bg-black text-white'
            : 'bg-white text-black'
        }`}
      >
        <Redo2 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        tooltip="Link"
        className={`flex items-center rounded-[6px] cursor-pointer font-normal`}
      >
        Clear formatting
      </Button>
    </div>
  );
};
