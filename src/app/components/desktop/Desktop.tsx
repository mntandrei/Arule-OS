"use client";

import {useCallback, useRef, useState, useEffect} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DesktopGrid from "./DesktopGrid";
import Taskbar from "./Taskbar";
import type {AppId, IconPosition} from "../../types/desktop";
import { saveIconPositions, getIconPositions, } from "../../lib/desktopStorage";   
import { saveOpenWindows, getOpenWindows } from "../../lib/session";
import AppWindow from "../workspace/AppWindow";
import Browser from "../apps/Browser";
import About from "../apps/About";
import type { WindowState } from "../../types/desktop";

export default function Desktop() {
  const desktopRef = useRef<HTMLElement>(null);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isMutedOpen, setIsMutedOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areWindowsLoaded, setAreWindowsLoaded] = useState(false);

  const openApp = (id: AppId) => {
  const desktop = desktopRef.current;
    if (!desktop) return;

  const availableWidth = desktop.clientWidth;
  const availableHeight = Math.max(0, desktop.clientHeight - 72);

  const width = Math.min(800, availableWidth);
  const height = Math.min(600, availableHeight);

  setOpenWindows((prev) => {
    const isAlreadyOpen = prev.some((win) => win.id === id);
    const zIndex = Math.max(0, ...prev.map((win) => win.zIndex)) + 1;

    if (isAlreadyOpen) {
      return prev.map((win) => win.id === id ? { ...win, isMinimized: false, zIndex } : win);
    }

    const newWindow: WindowState = {
      id,
      x: (availableWidth - width) / 2,
      y: (availableHeight - height) / 2,
      width,
      height,
      isMinimized: false,
      isMaximized: false,
      zIndex,
    };

    return [...prev, newWindow];
  });
};

const moveWindow = (id: AppId, x: number, y: number) => {
  const desktop = desktopRef.current;

  if (!desktop) return;

  const desktopWidth = desktop.clientWidth;
  const desktopHeight = desktop.clientHeight - 72;

  setOpenWindows((prev) =>
    prev.map((win) => {
      if (win.id !== id || win.isMaximized) return win;

      const minX = -win.width * 0.75;
      const maxX = desktopWidth - win.width * 0.25;

      const minY = -win.height * 0.75;
      const maxY = desktopHeight - win.height * 0.25;

      return {
        ...win,
        x: Math.max(minX, Math.min(x, maxX)),
        y: Math.max(minY, Math.min(y, maxY)),
      };
    })
  );
};

  const [iconPositions, setIconPositions] = useState<IconPosition[]>([
      { id: "explorer", row: 1, column: 1 },
      { id: "browser", row: 2, column: 1 },
      { id: "settings", row: 3, column: 1 },
      { id: "trash", row: 4, column: 1 },
      { id: "about", row: 5, column: 1 },
    ]);

  useEffect(() => {
    const saved = getIconPositions();

    if (saved !== null) {
      setIconPositions(saved);
    }

    setIsLoaded(true);
}, []);

useEffect(() => {
  if (!isLoaded) return;

  saveIconPositions(iconPositions);
}, [iconPositions, isLoaded]);

  const moveIcon = (id: AppId, row: number, column: number) => {
    setIconPositions((previous) => {
      const isOccupied = previous.some(
        (icon) => icon.id !== id && icon.row === row && icon.column === column);

      if (isOccupied) {
        return previous;
      }

      return previous.map((icon) => icon.id === id ? { ...icon, row, column } : icon);
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

        return changed ? next : previous;
      });
    },
    []
  );

  useEffect(() => {
    const saved = getOpenWindows();

    if (saved !== null) {
      setOpenWindows(saved);
    }

    setAreWindowsLoaded(true);
  }, []);

  useEffect(() => {
  if (!areWindowsLoaded) return;

  saveOpenWindows(openWindows);
}, [openWindows, areWindowsLoaded]);

const toggleMinimize = (id: AppId) => {
  setOpenWindows((prev) =>
    prev.map((win) =>
      win.id === id
        ? { 
            ...win,
            isMinimized: !win.isMinimized,
            zIndex: win.isMinimized
              ? Math.max(0, ...prev.map((w) => w.zIndex)) + 1
              : win.zIndex,
          }
        : win
    )
  );
};

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
      {isLoaded && (
        <DesktopGrid
          onOpenApp={openApp}
          iconPositions={iconPositions}
          onMoveIcon={moveIcon}
          onGridResize={handleGridResize}/>
      )}
      {openWindows.map((win) => (
        <AppWindow
          key={win.id}
          title={win.id}
          windowState={win}
          onMove={moveWindow}
          onClickClose={() => setOpenWindows((prev) => prev.filter((item) => item.id !== win.id))}>
          {win.id === "browser" && <Browser />}
          {win.id === "about" && <About />}
          {win.id !== "browser" && win.id !== "about" && <p>Test application</p>}
        </AppWindow>
      ))}

      <Taskbar
        openWindows={openWindows}
        onToggleMinimize={toggleMinimize}
        onWifiClick={() => setIsWifiOpen((previous) => !previous)}
        onVolumeClick={() => setIsMutedOpen((previous) => !previous)}/>
    </main>
  );
}
