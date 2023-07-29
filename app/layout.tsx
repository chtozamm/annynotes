import "./globals.css";
import type { Metadata } from "next";
import Loader from "./Loader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annynotes ✨",
  description: "Share a legend or leave a note for a loved one",
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
          <h1>
            <Link href="/">Annynotes ✨</Link>
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
