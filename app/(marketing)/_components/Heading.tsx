"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Image from "next/image";

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-2 sm:space-y-3 md:space-y-4 px-6 md:px-0">
      <Image
        src="/img/notion.avif"
        alt="Notion"
        width={730}
        height={700}
        className=""
      />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        One hub Zero
        <span className="underline ml-1">clutter</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the all-in-one workspace you can use to write, plan,
        collaborate, and get things done.
      </h3>

      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Get Started
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion Free
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
