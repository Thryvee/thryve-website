import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thryve — Revenue Systems Agency",
    short_name: "Thryve",
    description:
      "The world's first revenue systems agency. We build acquisition, conversion, and retention channels for D2C brands people buy from.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
