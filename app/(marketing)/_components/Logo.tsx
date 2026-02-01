import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2 w-full">
      <Image
        className="dark:hidden"
        src={"/img/BOK.png"}
        alt="logo"
        height={40}
        width={40}
      />
      <Image
        className="dark:block hidden"
        src={"/img/BOK.png"}
        alt="logo"
        height={40}
        width={40}
      />
      <p className={cn(font.className, "font-semibold")}>Baraa{"'"}s notion</p>
    </div>
  );
}

export default Logo;
