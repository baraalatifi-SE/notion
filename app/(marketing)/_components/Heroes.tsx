import React from "react";
import Image from "next/image";

function Heroes() {
  return (
    <div className="flex items-center justify-center w-full max-h-[60vh] sm:max-h-[60vh] md:max-h-none overflow-hidden">
      <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[730px] h-auto">
        <Image
          src="/img/1white.png"
          alt="imageHero"
          width={730}
          height={700}
          className="dark:hidden w-full h-auto object-contain"
        />
        <Image
          src="/img/6black.png"
          alt="imageHero"
          width={700}
          height={700}
          className="dark:block hidden w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Heroes;
