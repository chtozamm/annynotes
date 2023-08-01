import "./globals.css";
import type { Metadata } from "next";
import Loader from "./Loader";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "Share a legend or leave a note for a loved one.",
  openGraph: {
    title: "Annynotes - The world of fantasy ✨",
    description: "Share a legend or leave a note for a loved one.",
    url: "https://www.annynotes.fun",
  },
  twitter: {
    title: "Annynotes - The world of fantasy ✨",
    description: "Share a legend or leave a note for a loved one.",
    card: "summary_large_image",
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
          {children}
        </main>
      </body>
    </html>
  );
}
