import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

function Footer() {
  return (
    <div className="flex items-center p-6  w-full bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="flex items-center gap-x-2 md:ml-auto w-full md-fit justify-between md:justify-end text-muted-foreground">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}

export default Footer;
