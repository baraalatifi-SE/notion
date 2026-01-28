"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

function Cover({ url, preview }: CoverProps) {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn(
        "relative w-full group overflow-hidden z-10",
        url ? "bg-muted" : "bg-transparent",
      )}
      style={{ height: url ? "35vh" : "0" }}
    >
      {!!url && (
        <>
          <Image
            fill
            src={url}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            alt="Cover"
          />
          {/* Gradient overlay for better visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-70" />
        </>
      )}

      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/95 hover:border-border shadow-lg transition-all duration-200"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs bg-background/80 backdrop-blur-md border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 shadow-lg transition-all duration-200"
            variant={"outline"}
            size={"sm"}
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cover;
