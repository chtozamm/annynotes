"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  return (
    <>
      <header>
        <h1
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          Annynotes
          <Image
            src={"/icons/sparkles.svg"}
            width={40}
            height={40}
            alt="sparkles"
          />
        </h1>
      </header>
    </>
  )
}
