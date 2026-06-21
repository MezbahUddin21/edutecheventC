'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  Unlink
} from 'lucide-react';

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // Disable built-in link extension to avoid duplicates
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: true,
  });

  if (!editor) {
    return <div className="h-64 bg-gray-100 rounded-md animate-pulse" />;
  }

  const buttonClass = 'p-2 hover:bg-gray-200 rounded transition-colors text-sm';
  const activeButtonClass = 'p-2 bg-blue-200 hover:bg-blue-300 rounded transition-colors text-sm';

  return (
    <div className="w-full sm:w-[500px] mt-2 border rounded-md bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? activeButtonClass : buttonClass}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? activeButtonClass : buttonClass}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? activeButtonClass : buttonClass}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? activeButtonClass : buttonClass}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
          title="Bullet List"
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? activeButtonClass : buttonClass}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? activeButtonClass : buttonClass}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? activeButtonClass : buttonClass}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
          }}
          className={editor.isActive('link') ? activeButtonClass : buttonClass}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={buttonClass}
          title="Remove Link"
          disabled={!editor.isActive('link')}
        >
          <Unlink size={18} />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className={buttonClass}
          title="Clear Formatting"
        >
          <span className="text-sm font-semibold">Clear</span>
        </button>
      </div>

      {/* Editor */}
      <div className="h-64 overflow-y-auto bg-white">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none p-4 focus:outline-none"
        />
      </div>
    </div>
  );
}
