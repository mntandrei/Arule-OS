"use client";
import { useState } from "react";
import {ArrowRight, RefreshCw, ExternalLink, Globe} from "lucide-react";

export default function Browser() {
  const [inputUrl, setInputUrl] = useState("https://skill-tracker-henna.vercel.app/");
  const [currentUrl, setCurrentUrl] = useState("https://skill-tracker-henna.vercel.app/");
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = () => {
    const value = inputUrl.trim();

    if (!value) return;

    try {
      const url = new URL(
        /^[a-z][a-z\d+.-]*:/i.test(value)
          ? value
          : `https://${value}`
      );

      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return;
      }

      setCurrentUrl(url.href);
      setInputUrl(url.href);
    } catch {
      return;
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#090d15]">

      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate();
        }}
        className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-white/5 p-2">
        <button
          type="button"
          aria-label="Refresh page"
          onClick={() => setRefreshKey((prev) => prev + 1)}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <RefreshCw size={18} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3">
          <Globe size={16} className="shrink-0 text-white/40" />

          <input
            type="text"
            aria-label="Website address"
            value={inputUrl}
            onChange={(event) => setInputUrl(event.target.value)}
            placeholder="Enter website URL"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none"/>

        </div>

        <button
          type="submit"
          aria-label="Navigate"
          className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 transition-colors hover:bg-emerald-500/25">
          <ArrowRight size={18} />
        </button>

        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in new tab"
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <ExternalLink size={18} />
        </a>
      </form>

      <iframe
        key={refreshKey}
        src={currentUrl}
        title="Arule Browser"
        sandbox="allow-scripts allow-forms allow-same-origin"
        className="min-h-0 w-full flex-1 border-0 bg-white"/>

    </div>
  );
}
