import Image from "next/image"
import Link from "next/link"

const Header = () => (
  <header className="my-8 w-full">
    <Link
      href="/"
      className="mx-auto flex w-fit items-center justify-center gap-1.5 font-ringbearer text-4xl font-bold text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:rounded-lg lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4">
      Annynotes
      {/* <svg
            height="34"
            viewBox="0 0 24 24"
            shapeRendering="geometricPrecision"
            width="34"
            strokeWidth={1.5}
            className="fill-primary mb-1.5">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="var(--geist-fill)"
            />
          </svg> */}
      <svg
        height="34"
        viewBox="0 0 24 24"
        shapeRendering="geometricPrecision"
        width="34"
        strokeWidth={1.5}
        className="mb-1.5 fill-white stroke-primary">
        {/* <path d="M20 12v10H4V12" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /> */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
        />
      </svg>
      {/* <Image
        className="mb-1.5"
        src="/icons/sparkles.svg"
        // src="/icons/birthday-cake.png"
        width={34}
        height={34}
        alt="🎂"
        priority
      /> */}
    </Link>
    <p className="text-md mx-auto mt-2 max-w-[16em] text-center font-ringbearer text-zinc-400 sm:max-w-full">
      Share a legend or leave a note for a loved one
    </p>
  </header>
)

export default Header
