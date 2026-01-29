import { Button } from "@/components/ui/button";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="h-screen max-h-screen flex flex-col dark:bg-[#1F1F1F] overflow-hidden">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-4 sm:gap-y-6 md:gap-y-8 flex-1 overflow-hidden">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
