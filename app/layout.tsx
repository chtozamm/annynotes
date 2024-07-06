import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "A board for notes and legends shared by well-known characters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="mx-auto flex max-w-2xl flex-col items-center px-4 font-sans selection:bg-primary selection:text-white lg:px-0">
        {children}
      </body>
    </html>
  );
}
