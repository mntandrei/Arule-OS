"use client";
import { Wifi, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

type TaskbarProps = {
  onWifiClick: () => void;
  onVolumeClick: () => void;
};

export default function Taskbar({ onWifiClick, onVolumeClick }: TaskbarProps) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
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

  return (
    <footer className="fixed inset-x-0 bottom-3 z-50 h-12">
      <div className="absolute left-1/2 flex h-12 w-1/2 -translate-x-1/2 items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/10 px-4 backdrop-blur-xl">
        <button type="button" aria-label="Open Start Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-white/15 active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400">
            
            <Image src="arule-os-taskbar.svg" alt="" width={30} height={30} loading="eager"/>
        </button>
      </div>
      
        <div className="absolute right-4 flex h-12 items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 backdrop-blur-xl">

            <button type="button" aria-label="Wi-Fi" className="rounded-lg p-2 transition-colors hover:bg-white/15" onClick={onWifiClick}>
                <Wifi size={20} />
            </button>

            <button type="button" aria-label="Volume" className="rounded-lg p-2 transition-colors hover:bg-white/15" onClick={onVolumeClick}>
                <Volume2 size={20} />
            </button>

            <div className="flex flex-col items-end text-xs">
                <span>{time ?? "-- --"}</span>
                <span>{date ?? "-- -- ----"}</span>
            </div>

        </div>
    </footer>
  );
}