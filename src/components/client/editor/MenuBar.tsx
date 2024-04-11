"use client";

import { Button } from "@/components/ui/button";
import { CodeIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";
import { CldUploadWidget } from "next-cloudinary";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { FaParagraph, FaTable, FaYoutube } from "react-icons/fa6";
import { MdHorizontalRule, MdOutlineInsertPageBreak } from "react-icons/md";
import { PiListBullets, PiQuotesDuotone } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import { RiTaskLine } from "react-icons/ri";
import { Modal } from "../modal";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [ytUrl, setYtUrl] = useState<string | null>(null);
  const [ytError, setYtError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !editor) {
    return null;
  }

  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

  const onUpload = (result: any) => {
    const url = result.info.secure_url;

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const onConfirm = () => {
    if (ytUrl) {
      editor?.chain().focus().setYoutubeVideo({ src: ytUrl }).run();
    }
    setOpen(false);
  };

  function updateYTUrl(e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;

    if (!url) {
      setYtError("Please enter a valid URL.");
    } else if (!url.includes("youtube.co") && !url.includes("youtu.be")) {
      setYtError("Please enter a valid Youtube URL.");
    } else {
      setYtError(null);
    }

    setYtUrl(url);
  }

  function variant(type: string, extra?: any) {
    return editor?.isActive(type, extra) ? "default" : "ghost";
  }

  return (
    <section className="border flex gap-1 flex-wrap">
      {/* Heading 1 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={variant("heading", { level: 1 })}
        type="button"
      >
        H1
      </Button>
      {/* Heading 2 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={variant("heading", { level: 2 })}
        type="button"
      >
        H2
      </Button>
      {/* Heading 3 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={variant("heading", { level: 3 })}
        type="button"
      >
        H3
      </Button>
      {/* Paragraph */}
      <Button
        onClick={() => editor?.chain().focus().setParagraph().run()}
        variant={variant("paragraph")}
        type="button"
      >
        <FaParagraph />
      </Button>
      {/* Block Qoute */}
      <Button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        variant={variant("blockqoute")}
        type="button"
      >
        <PiQuotesDuotone />
      </Button>
      {/* Task List */}
      <Button
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        variant={variant("tasklist")}
        type="button"
      >
        <RiTaskLine />
      </Button>
      {/* Code Block */}
      <Button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        variant={variant("codeBlock")}
        type="button"
      >
        <CodeIcon />
      </Button>
      {/* Hard Break */}
      <Button
        onClick={() => editor?.chain().focus().setHardBreak().run()}
        variant={variant("hardbreak")}
        type="button"
      >
        <MdOutlineInsertPageBreak />
      </Button>
      {/* Horizontal Rule */}
      <Button
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        variant={variant("horizontalRule")}
        type="button"
      >
        <MdHorizontalRule />
      </Button>
      {/* Image */}
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={preset}
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          sources: ["local", "url", "unsplash"],
          multiple: false,
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant={variant("image")} onClick={onClick}>
              <CiImageOn />
            </Button>
          );
        }}
      </CldUploadWidget>
      {/* Bullet List */}
      <Button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        variant={variant("bulletList")}
        type="button"
      >
        <PiListBullets />
      </Button>
      {/* Ordered List */}
      <Button
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        variant={variant("orderedList")}
        type="button"
      >
        <AiOutlineOrderedList />
      </Button>
      {/* Table */}
      <Button
        onClick={() =>
          editor
            ?.chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        variant={variant("table")}
        type="button"
      >
        <FaTable />
      </Button>
      <Button
        variant={variant("youtube")}
        type="button"
        onClick={() => setOpen(true)}
      >
        <FaYoutube />
      </Button>
      <Modal
        title="Insert Youtube Video"
        description="Paste the URL of the video you want to embed."
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <Input
          placeholder="Youtube URL"
          // value={ytUrl || ""}
          onChange={updateYTUrl}
        />
        {ytError && <p className="text-red-500">{ytError}</p>}
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Continue</Button>
        </div>
      </Modal>
    </section>
  );
};
