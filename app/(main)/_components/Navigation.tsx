"use client";

import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import UserItem from "./user-item";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import DocumentsList from "./DocumentsList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./TrashBox";
import UseSearch from "@/hooks/use-search";
import { useSetting } from "@/hooks/use-setting";
import Navbar from "./nav-bar";

const Navigation = () => {
  const router = useRouter(); // navigate to a new route
  const params = useParams(); // get the current route parameters
  const pathName = usePathname(); // Get the current pathname
  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if the screen width is 768px or less (mobile view)
  const isResizingRef = useRef(false); // Ref to track if the sidebar is being resized
  const sideBarRef = useRef<ElementRef<"aside">>(null); // Ref for the sidebar element
  const nevBarRef = useRef<ElementRef<"div">>(null); // Ref for the navigation bar element
  const [isResetting, setIsResetting] = useState(false); // State to track if the sidebar is resetting
  const [isCollapsed, setIsCollapsed] = useState(isMobile); // State to track if the sidebar is collapsed

  const documents = useQuery(api.documents.getSideBar, {});

  const search = UseSearch();
  const settings = useSetting();

  // Function to collapse the sidebar
  const collapse = () => {
    if (sideBarRef.current && nevBarRef.current) {
      setIsCollapsed(true); // Set the sidebar to collapsed
      setIsResetting(true); // Set the resetting state to true
      sideBarRef.current.style.width = "0px"; // Collapse the sidebar
      nevBarRef.current.style.setProperty("width", "100%"); // Set the navbar width to 100%
      nevBarRef.current.style.setProperty("left", "0"); // Set the navbar position to the start
      setTimeout(() => {
        setIsResetting(false); // After animation, set resetting to false
      }, 300); // Wait for 300ms
    }
  };

  // Function to reset the sidebar to its default width
  const resetWidth = () => {
    if (sideBarRef.current && nevBarRef.current) {
      setIsCollapsed(false); // Set the sidebar to not collapsed
      setIsResetting(true); // Set the resetting state to true
      sideBarRef.current.style.width = isMobile ? "100%" : "240px"; // Set width based on screen size
      nevBarRef.current.style.setProperty(
        "width",
        isMobile ? "100%" : "calc(100% - 240px)",
      ); // Adjust the navbar width based on screen size
      nevBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px"); // Adjust the navbar position
      setTimeout(() => {
        setIsResetting(false); // After animation, set resetting to false
      }, 300); // Wait for 300ms
    }
  };

  // effect to handel path changes
  useEffect(() => {
    if (isMobile) {
      collapse(); // Collapse the sidebar when the path changes (if is not mobile)
    }
  }, [pathName, isMobile]);
  // ≠≠≠ effect to handel screen path changes ≠≠≠

  const createDocument = useMutation(api.documents.createDocument); // Mutation to create a new document

  // Function to create a new document
  const handleCreateDocument = () => {
    const promise = createDocument({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    ); // Create a new document with a default title

    toast.promise(promise, {
      loading: "Creating A New Node...", // Show a loading toast
      success: "Node Created", // Show a success toast when done
      error: "Failed to Create Node", // Show an error toast if it fails
    });
  };

  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto sticky flex w-60 flex-col z-999 min-h-screen left-0 top-0",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
        )}
      >
        {/* ChevronsLeft Icon to collapse the sidebar */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute top-3 right-2  w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100", // Always show on mobile
          )}
        >
          <ChevronsLeft className="w-6 h-6" />{" "}
        </div>

        {/* ========== User Item ========  */}
        <div>
          <UserItem />
        </div>

        {/* ========== Navigation Items ========  */}
        <div>
          {/* Render the Search item */}
          <Item lable="Search" icon={Search} isSearch onClick={search.onOpen} />
          {/* Render the Settings item */}
          <Item lable="Setting" icon={Settings} onClick={settings.onOpen} />
          {/* Render the New Page item */}
          <Item
            onClick={handleCreateDocument}
            lable="New Page"
            icon={PlusCircle}
          />

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item lable="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="w-72 p-0"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* ========== Documents List ========  */}
        <div className="mt-4">
          <DocumentsList />
          <Item onClick={handleCreateDocument} icon={Plus} lable="Add Page" />
        </div>

        {/* Handle for resizing the sidebar */}
        <div
          onMouseDown={() => {}}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100
        transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0
        "
        />
      </aside>
      {/* ≠≠≠≠≠≠≠ Sidebar ≠≠≠≠≠≠ */}

      {/* ======== Navbar ======= */}
      <div
        ref={nevBarRef}
        className={cn(
          "absolute top-0 left-60 z-40 w-[calc(100%-240px)] ",
          isResetting && "transition-all ease-in-out duration-300", // Apply transition during reset
          isMobile && "w-full left-0", // Adjust width and position for mobile
        )}
      >
        {/* /* Icon to open the sidebar when collapsed */}
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="w-6 h-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
      {/* ≠≠≠≠≠≠≠ Navbar ≠≠≠≠≠≠ */}
    </>
  );
};

export default Navigation;
