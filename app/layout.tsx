import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "Share a legend or leave a note for a loved one.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-['Segoe UI'] mx-auto flex max-w-2xl flex-col items-center px-4 font-sans selection:bg-[#ffb220] selection:text-white md:px-0">
        <Header />
        {children}
      </body>
    </html>
  );
}

const Header = () => (
  <header className="py-8">
    <Link
      href="/"
      className="mx-auto flex w-fit items-center justify-center gap-1.5 font-['Ringbearer'] text-4xl font-bold text-[#ffb220] outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4"
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
    <p className="text-md max-w-[16em] pt-2 text-center font-['Ringbearer'] text-zinc-400 sm:max-w-full">
      Share a legend or leave a note for a loved one
    </p>
  </header>
);
