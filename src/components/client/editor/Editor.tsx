"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { extensions } from ".";
import { MenuBar } from "./MenuBar";
import "./style.css";
export const Editor = ({
  onChange,
  content,
}: {
  onChange: (content: JSONContent) => void;
  content: JSONContent;
}) => {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions,
    content: content,
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    if (mounted) {
      const json = editor?.getJSON();
      if (json) {
        onChange(json);
      }
    }
  }, [mounted, editor, onChange]);

  if (!editor || !mounted) {
    return null;
  }

  return (
    <div className="border p-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
