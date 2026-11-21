"use client";

import {useCallback, useRef, useState} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DesktopGrid from "./DesktopGrid";
import Taskbar from "./Taskbar";
import type {AppId, IconPosition} from "../../types/desktop";
import { saveIconPositions, getIconPositions } from "../../lib/storage/desktopStorage";

export default function Desktop() {
  const desktopRef = useRef<HTMLElement>(null);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isMutedOpen, setIsMutedOpen] = useState(false);

  const [iconPositions, setIconPositions] = useState<IconPosition[]>(() => getIconPositions() ?? [
      { id: "explorer", row: 1, column: 1 },
      { id: "browser", row: 2, column: 1 },
      { id: "settings", row: 3, column: 1 },
      { id: "trash", row: 4, column: 1 },
      { id: "about", row: 5, column: 1 },
    ]);

  const moveIcon = (id: AppId, row: number, column: number) => {
    setIconPositions((previous) => {
      const isOccupied = previous.some(
        (icon) => icon.id !== id && icon.row === row && icon.column === column);

      if (isOccupied) {
        return previous;
      }

      const next = previous.map((icon) => icon.id === id ? { ...icon, row, column } : icon);
      saveIconPositions(next);
      return next;
    });
  };

  const handleGridResize = useCallback(
    (columns: number, rows: number) => {
      setIconPositions((previous) => {
        const occupied = new Set<string>();
        const preserved = new Set<AppId>();

        for (const icon of previous) {
          const valid =
            icon.row >= 1 &&
            icon.row <= rows &&
            icon.column >= 1 &&
            icon.column <= columns;

          const key = `${icon.row}:${icon.column}`;

          if ( valid && !occupied.has(key)) {
            occupied.add(key);
            preserved.add(icon.id);
          }
        }

        const next = previous.map((icon) => {
          if (preserved.has(icon.id)) {
            return icon;
          }

          for (let row = 1; row <= rows;row++) {
            for (let column = 1; column <= columns; column++) {
              const key = `${row}:${column}`;

              if (!occupied.has(key)) {
                occupied.add(key);

                return {
                  ...icon,
                  row,
                  column,
                };
              }
            }
          }

          return icon;
        });

        const changed = next.some(
          (icon, index) =>
            icon.row !== previous[index].row ||
            icon.column !==
              previous[index].column
        );

        if (changed) {
          saveIconPositions(next);
        }
        return changed ? next : previous;
      });
    },
    []
  );

  useGSAP(() => {
    gsap.fromTo(
      desktopRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <main
      ref={desktopRef}
      className="relative h-dvh w-full overflow-hidden bg-[#090d15] text-white">
      <DesktopGrid
        onOpenApp={setActiveApp}
        iconPositions={iconPositions}
        onMoveIcon={moveIcon}
        onGridResize={handleGridResize}/>

      {activeApp && (
        <div className="pointer-events-none fixed bottom-20 left-3 z-40 text-sm text-white/70">
          Selected: {activeApp}
        </div>
      )}

      <Taskbar
        onWifiClick={() => setIsWifiOpen((previous) => !previous)}
        onVolumeClick={() => setIsMutedOpen((previous) => !previous)}/>
    </main>
  );
}
