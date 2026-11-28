"use client";

import {Wifi, WifiOff, Bluetooth, Volume2, VolumeX, ChevronRight} from "lucide-react";

type QuickSettingsProps = {
  isWifiEnabled: boolean;
  isBluetoothEnabled: boolean;
  volume: number;
  onToggleWifi: () => void;
  onToggleBluetooth: () => void;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
};

export default function QuickSettings({isWifiEnabled, isBluetoothEnabled, volume, onToggleWifi, onToggleBluetooth, onVolumeChange, onToggleMute}: QuickSettingsProps) {
  return (
    <div className="absolute bottom-[72px] right-4 z-[60] w-[320px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-white/15 bg-[#121925]/95 text-white shadow-2xl shadow-black/50 backdrop-blur-xl">
      <div className="p-5">
        <h2 className="mb-5 text-sm font-medium tracking-wide text-white/90">
          Quick Settings
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-12 w-full overflow-hidden rounded-lg transition-colors duration-200 ${
                isWifiEnabled ? "bg-emerald-500/80" : "bg-white/5"}`}>
              <button
                type="button"
                aria-label="Toggle Wi-Fi"
                onClick={onToggleWifi}
                aria-pressed={isWifiEnabled}
                className="flex flex-1 items-center justify-center transition-colors hover:bg-white/15">
                {isWifiEnabled ? (
                  <Wifi size={20} />
                ) : (
                  <WifiOff size={20} />
                )}
              </button>

              <button
                type="button"
                aria-label="Wi-Fi settings"
                className="flex w-10 items-center justify-center border-l border-white/20 transition-colors hover:bg-white/15">
                <ChevronRight size={17} />
              </button>
            </div>

            <span className="text-xs">Wi-Fi</span>
            <span className="text-[11px] text-white/40">
              {isWifiEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-12 w-full overflow-hidden rounded-lg transition-colors duration-200 ${ isBluetoothEnabled ? "bg-emerald-500/80" : "bg-white/5"}`}>
              <button
                type="button"
                aria-label="Toggle Bluetooth"
                onClick={onToggleBluetooth}
                aria-pressed={isBluetoothEnabled}
                className="flex flex-1 items-center justify-center transition-colors hover:bg-white/10">
                <Bluetooth size={20} />
              </button>

              <button
                type="button"
                aria-label="Bluetooth settings"
                className="flex w-10 items-center justify-center border-l border-white/10 transition-colors hover:bg-white/10">
                <ChevronRight size={17} />
              </button>
            </div>

            <span className="text-xs">Bluetooth</span>
            <span className="text-[11px] text-white/40">
              {isBluetoothEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-5">
        <span className="text-xs text-white/50">
          Volume
        </span>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            aria-label={
              volume === 0 ? "Unmute volume" : "Mute volume"
            }
            className="text-white/70 transition-colors hover:text-emerald-400"
            onClick={onToggleMute}>
            {volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>

          <input
            type="range"
            aria-label="Volume"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1 w-full min-w-0 cursor-pointer accent-emerald-400"/>

          <span className="w-9 shrink-0 text-right text-xs text-white/60 tabular-nums">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}