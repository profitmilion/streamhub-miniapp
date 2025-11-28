"use client";

import { useState } from "react";

export default function Page() {
  const [channel, setChannel] = useState("monstercat");

  const effectiveChannel = channel.trim() || "monstercat";

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Twitch Live Mini-App – Stream Embed Generator
        </h1>

        {/* Twitch channel input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-neutral-300">
            Enter Twitch channel name:
          </label>

          <input
            type="text"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white w-full outline-none"
            placeholder="e.g. profitmilion"
          />

          <p className="text-xs text-neutral-500 mt-2">
            Type any Twitch channel. The player and chat below will update
            automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
          {/* LEFT: Twitch Player + Chat */}
          <section className="border border-neutral-700 rounded-xl p-4 bg-neutral-900/60">
            <h2 className="text-lg font-medium mb-3">
              Twitch Player – channel:{" "}
              <span className="font-mono">{effectiveChannel}</span>
            </h2>

            {/* Video player */}
            <div className="aspect-video mb-4">
              <iframe
                title="Twitch player"
                src={`https://player.twitch.tv/?channel=${encodeURIComponent(
                  effectiveChannel
                )}&parent=localhost`}
                height="100%"
                width="100%"
                allowFullScreen={true}
                frameBorder="0"
              ></iframe>
            </div>

            {/* Chat embed */}
            <div className="h-[75vh] md:h-[600px] border border-neutral-700 rounded-lg overflow-hidden">
              <iframe
                title="Twitch chat"
                src={`https://www.twitch.tv/embed/${encodeURIComponent(
                  effectiveChannel
                )}/chat?parent=localhost`}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>

          </section>

          {/* RIGHT: Farcaster panel placeholder */}
          <aside className="border border-neutral-700 rounded-xl p-4 bg-neutral-900/60">
            <h2 className="text-lg font-medium mb-3">Side Panel</h2>

            <p className="text-sm text-neutral-300 mb-2">
              This section will later include Farcaster and Base integrations:
            </p>

            <ul className="text-sm text-neutral-300 list-disc list-inside space-y-1">
              <li>Auto-cast to Warpcast</li>
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
