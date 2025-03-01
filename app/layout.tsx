import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "A board for notes and legends told by well-known characters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="selection:bg-primary mx-auto flex max-w-2xl flex-col items-center px-4 font-sans antialiased selection:text-white lg:px-0">
        <Header />
        {children}
      </body>
    </html>
  );
}
