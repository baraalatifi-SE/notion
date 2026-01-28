import { Id } from "@/convex/_generated/dataModel";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
// Define the props that the Item component will accept
interface ItemProps {
  lable: string; // The label or name of the item
  icon: LucideIcon; // The icon to display next to the item
  onClick?: () => void; // Function to call when the item is clicked
  id?: Id<"documents">; // The ID of the document (optional)
  documentIcon?: string; // An optional icon specific to the document
  active?: boolean; // Whether the item is currently active/selected
  expanded?: boolean; // Whether the item is expanded to show sub-items
  isSearch?: boolean; // Whether the item is part of a search result
  level?: number; // The level/depth of the item in the list (optional)
  onExpand?: () => void; // Function to call to expand/collapse the item
}

function Item({
  lable,
  icon: Icon,
  onClick,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) {
  const user = useUser();
  const router = useRouter(); // Hook fot handling navigation
  const create = useMutation(api.documents.createDocument);

  // Determine which icon to show (ChevronDown for expanded, ChevronRight for collapsed)
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const archive = useMutation(api.documents.archiveDocument);

  // Handle expand/collapse action when the expand icon is clicked
  const handelExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation(); // Prevent the event from propagating to parent elements
    onExpand?.(); // Call the onExpand function if it exists
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent the event from propagating to parent elements
    if (!id) return; // If there's no document ID, do nothing
    const promise = archive({ id }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Moving To Trash...",
      success: "Note Moved To Trash",
      error: "Failed To Move To Trash",
    });
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent the event from propagating to parent elements
    if (!id) return; // If there's no document ID, do nothing
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.(); // Expand the parent document to show the new child
        }
        // Optionally navigate to the new document
        // router.push(`/documents/${documentId}`);
      },
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div
      onClick={onClick} // Handle the item click
      role="button" // Make it accessible as a button
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        gap: "12px",
      }} // Add left padding based on the item's level
      className={cn(
        "group min-h-[27px] text-sm py-2 pr-4 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary", // Add background color if the item is active
      )}
    >
      {!!id && ( // If there's an ID, show the expand/collapse icon
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handelExpand} // Handle the expand/collapse click
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? ( // If there's a specific document icon, show it
        <div className="shrink-0 mr-3 text-[18px]">{documentIcon}</div>
      ) : (
        // Otherwise, show the default icon
        <Icon
          size={18}
          className="text-muted-foreground shrink-0 h-[18px] w-[18px] mr-3"
        />
      )}

      {/* display the label text */}
      <span className="truncate">{lable}</span>

      {/* If this is part of a search result, show a keyboard shortcut */}
      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex h-5 select-none
         items-center gap-1 rounded border bg-muted px-1.5 font-mono 
         text-[12px] font-medium text-muted-foreground opacity-100"
        >
          <span className="text-[8px]">&#x2318; </span>X
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(event) => {
                event.stopPropagation(); // Prevent the event from propagating to parent elements
              }}
            >
              <div
                role="button"
                className="opacity-1 group-hover:opacity-100 h-full
                 ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <div className="p-2 text-muted-foreground text-xs">
                Last Edited by : {user.user?.firstName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            onClick={onCreate} // Handle the click to create a sub-document
            role="button"
            className="opacity-1 group-hover:opacity-100 ml-auto h-full
           rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <PlusIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;

// Skeleton component to display while loading
Item.Skeleton = function ItemSkeleton({ level }: { level?: number } = {}) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }} // Add left padding based on the level
      className="flex gap-x-2 p-y-[3px] "
    >
      <Skeleton className="h-4 w-4" /> {/* Display a skeleton for the icon */}
      <Skeleton className="h-4 w-[30%]" />{" "}
      {/* Display a skeleton for the label */}
    </div>
  );
};
