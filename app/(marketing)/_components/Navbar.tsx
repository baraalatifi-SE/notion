"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import Spinner from "@/components/spinner";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-6 py-4",
        scrolled && "shadow-sm border-b",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end flex justify-between items-center md:w-fit w-full gap-x-2"></div>
      {isLoading && <Spinner size={"lg"} />}
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton>
            <Button variant={"ghost"} size={"sm"}>
              Log In
            </Button>
          </SignInButton>
          <SignInButton>
            <Button size={"sm"}>Get Free Trial</Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <Button variant={"ghost"} size={"sm"}>
            <Link href="/decoments">Enter Notion</Link>
          </Button>
          <UserButton afterSwitchSessionUrl="/" />
        </>
      )}
      <ModeToggle />
    </div>
  );
}

export default Navbar;
