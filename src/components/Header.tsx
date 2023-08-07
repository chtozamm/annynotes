"use client"

import Image from "next/image"

export default function Header() {
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
        {/* <p className="description">
            Share a legend or leave a note for a loved one
          </p> */}
      </header>
    </>
  )
}
