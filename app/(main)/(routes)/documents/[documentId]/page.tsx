"use client";
import Cover from "@/components/cover";
import Editor from "@/components/Editor";
import Toolbar from "@/components/tool-bar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

interface DocumentsIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

function DocumentId({ params }: DocumentsIdPageProps) {
  const { documentId } = React.use(params);

  const Editor = useMemo(() => {
    return dynamic(() => import("@/components/Editor"), {
      ssr: false,
    });
  }, []);
  const router = useRouter();
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  const update = useMutation(api.documents.updateDocument);
  const onChange = (content: string) => {
    update({ id: documentId, content });
  };

  useEffect(() => {
    if (!documentId) {
      router.push("/documents");
    }
  }, [documentId, router]);

  if (!document) return <div>Document mot found</div>;

  return (
    <div className="pb-40 min-h-screen dark:bg-[#1F1F1F]">
      <Cover url={document.coverImage} />
      <div className="max-w-[900px] mx-auto px-12 md:px-16">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Toolbar initialData={document} />
          <Editor onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </div>
  );
}

export default DocumentId;
