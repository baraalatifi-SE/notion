"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import Spinner from "@/components/spinner";
import { redirect } from "next/navigation";
import SearchCommand from "@/components/search-command";
import Navigation from "./_components/Navigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-[100vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <SearchCommand />

      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}

export default MainLayout;
