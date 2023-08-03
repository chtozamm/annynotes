import "./globals.css";
import type { Metadata } from "next";
import Loader from "@/components/Loader";

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

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="main-container">
          <Loader />
          {props.children}
          {props.modal}
        </main>
      </body>
    </html>
  );
}
