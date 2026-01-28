"use client";

import { api } from "@/convex/_generated/api";
import UseSearch from "@/hooks/use-search";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File } from "lucide-react";

function SearchCommand() {
  const { user } = useUser();
  const router = useRouter();
  const [title, setTitle] = useState("");
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const searchDocuments = useQuery(
    api.documents.searchByTitle,
    user ? { title } : "skip",
  );
  const [ismounted, setismounted] = useState(false);
  const toggle = UseSearch((store) => store.onToggle);
  const isOpen = UseSearch((store) => store.isOpen);
  const onClose = UseSearch((store) => store.onClose);

  useEffect(() => {
    setismounted(true);
  }, []);

  const down = (e: KeyboardEvent) => {
    if (e.key === "X" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleSelect = (id: string) => {
    router.push(`/document/${id}`);
    onClose();
  };

  if (!ismounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={toggle}>
      <CommandInput
        placeholder={`Search ${user?.fullName}'s Notion...`}
        onValueChange={setTitle}
      />

      <CommandList>
        <CommandEmpty>
          <p>No results found.</p>
        </CommandEmpty>
        <CommandGroup heading="Documents">
          {searchDocuments?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={handleSelect}
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-primary/5 p-1.5 text-muted-foreground ring-1 ring-border/50 shadow-sm">
                {doc.icon ? (
                  <p className="text-[16px]">{doc.icon}</p>
                ) : (
                  <File className="h-4 w-4" />
                )}
              </div>
              <span className="truncate font-medium text-foreground">
                {doc.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
