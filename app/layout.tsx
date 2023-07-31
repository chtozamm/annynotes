import "./globals.css";
import type { Metadata } from "next";
import Loader from "./Loader";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "Share a legend or leave a note for a loved one",
  openGraph: {
    title: "Annynotes - The world of fantasy ✨",
    description: "Share a legend or leave a note for a loved one",
    url: "https://www.annynotes.fun",
  },
  twitter: {
    title: "Annynotes - The world of fantasy ✨",
    description: "Share a legend or leave a note for a loved one",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="main-container">
          <Loader />
          <h1 className="header">
            Annynotes
            <Image
              src={"/sparkles.svg"}
              width={40}
              height={40}
              alt="sparkles"
            />
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
