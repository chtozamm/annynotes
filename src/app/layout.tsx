import "@/styles/globals.css"
import type { Metadata } from "next"
import Loader from "@/components/Loader"

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
	manifest: "/manifest.json",
	themeColor: "#ffffff",
}

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta
					name="theme-color"
					content="#ffffff"
				/>
				<link
					rel="manifest"
					href="/manifest.json"
				/>
				<link
					rel="apple-touch-icon"
					href="/icon-192x192.png"
				/>
			</head>
			<body>
				<main>
					<Loader />
					{props.children}
				</main>
			</body>
		</html>
	)
}
