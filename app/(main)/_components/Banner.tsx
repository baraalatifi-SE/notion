import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModel } from "@/components/modals/ConfirmModel";

interface MenuProps {
  documentId: Id<"documents">;
}

function Banner({ documentId }: MenuProps) {
  const router = useRouter();
  const removeDocument = useMutation(api.documents.removeDocument);
  const restoreDocument = useMutation(api.documents.restoreDocument);

  const onRemove = () => {
    const promise = removeDocument({ id: documentId });
    toast.promise(promise, {
      loading: "Removing Note...",
      success: "Note removed",
      error: "Failed to remove document",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restoreDocument({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note restored",
      error: "Failed to restore document",
    });
  };

  return (
    <div
      style={{
        border: "5px solid white",
        borderRadius: "5px",
        width: "50%",
        margin: "0 auto",
      }}
      className="w-full bg-rose-500 text-sm text-center p-2 
  text-white flex items-center gap-x-2 justify-center"
    >
      <p>This Page is In Trash.</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white
     p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
    </div>
  );
}

export default Banner;
