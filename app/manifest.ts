import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#ffb220",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "Annynotes - The world of fantasy ✨",
    short_name: "Annynotes",
    description: "A board for notes and legends told by well-known characters.",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
