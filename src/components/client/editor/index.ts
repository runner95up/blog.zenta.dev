export * from "./Editor";
export * from "./MenuBar";

import { Blockquote } from "@tiptap/extension-blockquote";
import { BulletList } from "@tiptap/extension-bullet-list";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Image } from "@tiptap/extension-image";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { Youtube } from "@tiptap/extension-youtube";
import { Extensions } from "@tiptap/react";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

export const extensions: Extensions = [
  Document,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-gray-600 italic my-4 pl-4 py-2",
    },
  }),
  TaskList.configure({}),
  TaskItem.configure({
    nested: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  HardBreak.configure({}),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "my-custom-class",
    },
  }),
  Dropcursor,
  Image,
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc ml-4",
    },
  }),
  OrderedList,
  ListItem,
  Paragraph.configure({}),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube,
] as const;
