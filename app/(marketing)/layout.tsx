import React from "react";
import Navbar from "./_components/Navbar";

function LayoutMarketing({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-32">{children}</main>
    </div>
  );
}

export default LayoutMarketing;
