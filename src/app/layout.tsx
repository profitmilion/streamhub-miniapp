import type { Metadata } from "next";
import React from "react";
import "./globals.css";

// tymczasowy obrazek pod mini-appkę (prosty placeholder)
const OG_IMAGE_URL =
  "https://placehold.co/1200x630/png?text=Twitch+Mini+App";

export const metadata: Metadata = {
  title: "Twitch Mini-App",
  description: "Twitch Live Mini-App for Farcaster",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: OG_IMAGE_URL,
      button: {
        title: "Open Twitch Mini-App",
        action: {
          type: "launch_frame",
          name: "Twitch Live Mini-App",
          url: "https://streamhub-miniapp.vercel.app/",
          splashImageUrl: OG_IMAGE_URL,
          splashBackgroundColor: "#000000",
        },
      },
    }),
    "fc:frame": JSON.stringify({
      version: "1",
      imageUrl: OG_IMAGE_URL,
      button: {
        title: "Open Twitch Mini-App",
        action: {
          type: "launch_frame",
          name: "Twitch Live Mini-App",
          url: "https://streamhub-miniapp.vercel.app/",
          splashImageUrl: OG_IMAGE_URL,
          splashBackgroundColor: "#000000",
        },
      },
    }),
  },
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
