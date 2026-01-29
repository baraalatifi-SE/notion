"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { getTextDirection } from "@/lib/text-direction";

interface EditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  const handelChange = () => {
    const content = editor.topLevelBlocks;
    onChange(JSON.stringify(content, null, 2));
  };

  // Extract text content from blocks to detect direction
  const getContentText = (): string => {
    if (!editor?.topLevelBlocks) return "";
    return editor.topLevelBlocks
      .map((block: any) => {
        return block.content && Array.isArray(block.content)
          ? block.content.map((item: any) => item.text || "").join("")
          : "";
      })
      .join(" ");
  };

  const contentText = getContentText();
  const textDirection = getTextDirection(contentText);

  return (
    <div
      style={{
        direction: textDirection,
        textAlign: textDirection === "rtl" ? "right" : "left",
      }}
      className="w-full"
    >
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        onChange={handelChange}
      />
    </div>
  );
}

export default Editor;
