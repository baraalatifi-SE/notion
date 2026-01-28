import React from "react";
import Image from "next/image";

function Heroes() {
  return (
    <div>
      <div className="h">
        <Image
          src="/img/1white.png"
          alt="imageHero"
          width={730}
          height={700}
          className="dark:hidden"
        />
        <Image
          src="/img/6black.png"
          alt="imageHero"
          width={700}
          height={700}
          className="dark:block hidden "
        />
      </div>
    </div>
  );
}

export default Heroes;
