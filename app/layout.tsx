import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { getSession } from "./lib"
// import Confetti from "@/components/Confetti"

export const metadata: Metadata = {
  title: "Annynotes - The world of fantasy ✨",
  description: "Share a legend or leave a note for a loved one.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [token, _, __] = await getSession()
  return (
    <html lang="en">
      {/* <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </head> */}
      <body className="mx-auto flex max-w-2xl flex-col items-center px-4 font-sans selection:bg-primary selection:text-white lg:px-0">
        <Header />
        <Navigation token={token} />        
        {/* <Confetti /> */}
        {children}
      </body>
    </html>
  )
}
