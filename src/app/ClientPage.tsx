"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ClientPage() {
  const searchParams = useSearchParams();

  // Kanał z URL, np. ?channel=profitmilion
  const channelFromUrl = searchParams.get("channel") || "";

  // Domyślny kanał - promujemy profitmilion
  const [channel, setChannel] = useState(channelFromUrl || "profitmilion");

  // Toggle chatu
  const [showChat, setShowChat] = useState(true);

  // Domena wymagana przez Twitcha w parametrze `parent`
  const [parentDomain, setParentDomain] = useState<string | null>(null);

  const effectiveChannel = channel.trim() || "profitmilion";

  // Pobranie aktualnej domeny jako `parent` dla Twitcha (localhost / Vercel / własna domena)
  useEffect(() => {
    if (typeof window === "undefined") return;
    setParentDomain(window.location.hostname);
  }, []);

  // Czyszczenie inputu - kanał lub pełny link Twitch
  const handleChannelChange = (raw: string) => {
    const cleaned = raw
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/^twitch\.tv\//, "")
      .split("/")[0]
      .trim();

    setChannel(cleaned);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Twitch Live Mini-App - Stream Embed Generator
        </h1>

        {/* Twitch channel input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-neutral-300">
            Enter Twitch channel name or paste a Twitch link:
          </label>

          <input
            type="text"
            value={channel}
            onChange={(e) => handleChannelChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // W tej prostej wersji Enter tylko ustawia kanał.
                // URL nie jest zmieniany automatycznie.
              }
            }}
            className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white w-full outline-none"
            placeholder="e.g. profitmilion or https://www.twitch.tv/profitmilion"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
          {/* LEFT: Twitch Player + optional Chat */}
          <section className="border border-neutral-700 rounded-xl p-4 bg-neutral-900/60">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-lg font-medium">
                Twitch Player - channel:{" "}
                <span className="font-mono">{effectiveChannel}</span>
              </h2>

              {/* Chat toggle button */}
              <button
                type="button"
                onClick={() => setShowChat((prev) => !prev)}
                className="text-xs px-3 py-1 rounded-full border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 transition"
              >
                {showChat ? "Hide chat" : "Show chat"}
              </button>
            </div>

            {/* Video player */}
            <div className="aspect-video mb-4">
              {parentDomain ? (
                <iframe
                  title="Twitch player"
                  src={`https://player.twitch.tv/?channel=${encodeURIComponent(
                    effectiveChannel
                  )}&parent=${encodeURIComponent(parentDomain)}`}
                  height="100%"
                  width="100%"
                  allowFullScreen
                  frameBorder="0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
                  Initializing Twitch player...
                </div>
              )}
            </div>

            {/* Chat embed - optional */}
            {showChat && (
              <div className="h-[75vh] md:h-[600px] border border-neutral-700 rounded-lg overflow-hidden">
                {parentDomain ? (
                  <iframe
                    title="Twitch chat"
                    src={`https://www.twitch.tv/embed/${encodeURIComponent(
                      effectiveChannel
                    )}/chat?parent=${encodeURIComponent(parentDomain)}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
                    Initializing Twitch chat...
                  </div>
                )}
              </div>
            )}

            <p className="text-[11px] text-neutral-500 mt-2">
              To send messages in the chat you must be logged in to Twitch in
              this browser. Without login, the chat is view-only - this is a
              Twitch limitation, not this mini-app.
            </p>
          </section>

          {/* RIGHT: Farcaster panel placeholder */}
          <aside className="border border-neutral-700 rounded-xl p-4 bg-neutral-900/60">
            <h2 className="text-lg font-medium mb-3">Side Panel</h2>

            <p className="text-sm text-neutral-300 mb-2">
              This section will later include Farcaster and Base integrations:
            </p>

            <ul className="text-sm text-neutral-300 list-disc list-inside space-y-1">
              <li>Auto-cast to Warpcast for the current channel</li>
              <li>Channel info and metadata</li>
              <li>Follow / join buttons and links</li>
              <li>On-chain interactions on Base (tips, NFTs, etc.)</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
