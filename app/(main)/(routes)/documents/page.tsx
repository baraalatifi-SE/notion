"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function MainPage() {
  const router = useRouter();
  const { user } = useUser();
  const createDocument = useMutation(api.documents.createDocument); // to import my function from convex

  const onCreateDocument = () => {
    const promise = createDocument({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating A New Node...",
      success: "Node Created",
      error: "Failed to Create Node",
    });
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src="/img/main.jpg"
        alt="main"
        width={300}
        height={300}
      />
      <Image
        className="hidden dark:block"
        src="/img/mainDarck3.png"
        alt="main"
        width={300}
        height={300}
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>

      <Button onClick={onCreateDocument}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
}

export default MainPage;
