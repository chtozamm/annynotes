import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "Share a legend or leave a note for a loved one.",
  // TODO: opengraph and twitter image,
  // PWA information
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-auto flex max-w-2xl flex-col items-center px-4 font-sans selection:bg-primary selection:text-white lg:px-0">
        <Header />
        {children}
      </body>
    </html>
  );
}
