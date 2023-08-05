"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <>
      <header>
        <h1>
          Annynotes
          <Image
            src={"/icons/sparkles.svg"}
            width={40}
            height={40}
            alt="sparkles"
          />
        </h1>
        {pathname === "/" && (
          <p className="description">
            Share a legend or leave a note for a loved one
          </p>
        )}
      </header>
    </>
  );
}
