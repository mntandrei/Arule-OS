"use client";

import { Wifi, WifiOff, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { WindowState, AppId } from "../../types/desktop";
import DesktopIcon from "./DesktopIcon";
import { apps } from "@/app/lib/apps";

type TaskbarProps = {
  openWindows: WindowState[];
  onToggleMinimize: (id: AppId) => void;
  onQuickSettingsClick: () => void;
  isWifiEnabled: boolean;
  volume: number;
};

export default function Taskbar({openWindows, onToggleMinimize, onQuickSettingsClick, isWifiEnabled, volume}: TaskbarProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = now?.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now?.toLocaleDateString("ro-RO");

  const activeZIndex = Math.max(
    0,
    ...openWindows
      .filter((win) => !win.isMinimized)
      .map((win) => win.zIndex)
  );

  return (
    <footer className="fixed inset-x-0 bottom-3 z-50 h-12">
      <div className="absolute left-1/2 flex h-12 w-1/2 -translate-x-1/2 items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/10 px-4 backdrop-blur-xl">
        <button
          type="button"
          aria-label="Open Start Menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-white/15 active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400">
          <Image
            src="/arule-os-taskbar.svg"
            alt=""
            width={30}
            height={30}
            loading="eager"/>
        </button>

        {openWindows.length > 0 && (
          <div className="mx-1 h-6 w-px shrink-0 bg-white/20" />
        )}

        {openWindows.map((win) => {const app = apps[win.id];

          return (
            <DesktopIcon
              key={win.id}
              name={app.name}
              type={app.type}
              variant="taskbar"
              isActive={!win.isMinimized && win.zIndex === activeZIndex}
              onClick={() => onToggleMinimize(win.id)}/>
          );
        })}
      </div>

      <div className="absolute right-4 flex h-12 items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 backdrop-blur-xl">
        <button
          type="button"
          aria-label="Open Quick Settings"
          onClick={onQuickSettingsClick}
          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/15">
          {isWifiEnabled ? <Wifi size={20} /> : <WifiOff size={20} />}
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="flex flex-col items-end text-xs">
          <span>{time ?? "--:--"}</span>
          <span>{date ?? "--.--.----"}</span>
        </div>

      </div>
    </footer>
  );
}
