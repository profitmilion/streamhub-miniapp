import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitch Mini-App",
  description: "Twitch Live Mini-App for Farcaster",
  other: {
    // Definicja Mini-App dla Farcastera
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "https://streamhub-miniapp.vercel.app/og-image.png", // docelowo tu możesz dać swój obrazek
      button: {
        title: "Open Twitch Mini-App",
        action: {
          type: "launch_frame",
          name: "Twitch Live Mini-App",
          url: "https://streamhub-miniapp.vercel.app/",
          splashImageUrl: "https://streamhub-miniapp.vercel.app/og-image.png",
          splashBackgroundColor: "#000000",
        },
      },
    }),
    // Opcjonalnie: dodatkowy wpis dla starszych klientów / kompatybilności
    "fc:frame": JSON.stringify({
      version: "1",
      imageUrl: "https://streamhub-miniapp.vercel.app/og-image.png",
      button: {
        title: "Open Twitch Mini-App",
        action: {
          type: "launch_frame",
          name: "Twitch Live Mini-App",
          url: "https://streamhub-miniapp.vercel.app/",
          splashImageUrl: "https://streamhub-miniapp.vercel.app/og-image.png",
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
