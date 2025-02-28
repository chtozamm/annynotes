import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <header className="my-8 w-full">
    <Link
      href="/"
      className="font-ringbearer text-primary lg:focus-visible:ring-primary mx-auto flex w-fit items-center justify-center gap-1.5 text-4xl font-bold outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:rounded-lg lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
    >
      Annynotes
      <Image
        className="mb-1.5 select-none"
        src="/icons/sparkles.svg"
        width={34}
        height={34}
        alt="✨"
        priority
      />
    </Link>
    <p className="text-md font-ringbearer mx-auto mt-2 max-w-[16em] text-center text-zinc-400 sm:max-w-full">
      Share a legend or leave a note for a loved one
    </p>
  </header>
);

export default Header;
