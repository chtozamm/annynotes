import Image from "next/image";
import Posts from "./Posts";
import ShareForm from "./ShareForm";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="font-sans mx-auto flex flex-col max-w-2xl font-['Segoe UI'] px-4 md:px-0 items-center">
      <header className="py-8">
        <Link
          href="/"
          className="flex justify-center gap-1.5 font-['Ringbearer'] text-[#ffb220] text-4xl font-bold items-center"
        >
          Annynotes
          <Image
            className="mb-1.5"
            src="/icons/sparkles.svg"
            width={34}
            height={34}
            alt="✨"
          />
        </Link>
        <p className="pt-2 max-w-[16em] sm:max-w-full font-['Ringbearer'] text-center text-zinc-400 text-md">
          Share a legend or leave a note for a loved one
        </p>
      </header>
      <ShareForm />
      <Posts />
    </div>
  );
}
