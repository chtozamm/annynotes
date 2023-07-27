import "./globals.css";
import type { Metadata } from "next";

// import { Tangerine } from "next/font/google";
// const tangerine = Tangerine({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

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
      <body>{children}</body>
    </html>
  );
}
