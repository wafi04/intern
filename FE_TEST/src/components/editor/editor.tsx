import { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { toast } from "sonner";
import { usePostComment } from "../../lib/api/comment";

export function Editor() {
  const [currentLength, setCurrentLength] = useState<number>(0);
  const maxLength = 200;
  const post = usePostComment();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's happening?",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    onUpdate: ({ editor }) => {
      const newLength = editor.getText().length;
      if (newLength <= maxLength) {
        setCurrentLength(newLength);
      } else {
        editor.commands.setContent(editor.getText().slice(0, maxLength));
        setCurrentLength(maxLength);
      }
    },
  });

  const handleSubmit = useCallback(async () => {
    const content = editor?.getText();
    if (!content || content.trim() === "") {
      toast.error("Content cannot be empty");
      return;
    }
    post.mutate(content);
    editor?.commands.clearContent();
    setCurrentLength(0);

    toast.success("Post submitted successfully!");
  }, [editor, post]);

  return (
    <div className="">
      <div className=" dark:border-gray-700 rounded-lg p-4 min-h-[150px] focus-within:border-blue-500 transition-colors">
        <EditorContent
          editor={editor}
          className="prose prose-sm w-[600px] custom-editor sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div
          className={`text-sm ${
            currentLength > maxLength - 20 ? "text-red-500" : "text-gray-500"
          }`}>
          {currentLength}/{maxLength}
        </div>
        <button
          onClick={handleSubmit}
          disabled={post.isPending || currentLength === 0}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            post.isPending || currentLength === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}>
          {post.isPending ? "Submitting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
