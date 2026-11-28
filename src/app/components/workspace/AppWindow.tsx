"use client";

import { useRef, useState } from "react";
import {Minus, Square, X, AppWindow as WindowIcon, Copy} from "lucide-react";
import type { ReactNode, PointerEvent } from "react";
import type { AppId, WindowState } from "../../types/desktop";

type AppWindowProps = {
  title: string;
  children: ReactNode;
  onClickClose?: () => void;
  windowState: WindowState;
  onMove: (id: AppId, x: number, y: number) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
};

export default function AppWindow({title, children, onClickClose, windowState, onMove, onMinimize, onMaximize}: AppWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{pointerId: number; startX: number; startY: number; windowX: number; windowY: number;} | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    if (windowState.isMaximized) return;
    if (dragRef.current) return;

    const target = event.target as Element;

    if (target.closest("button")) return;
    if (!target.closest("[data-drag-handle]")) return;

    event.preventDefault();

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      windowX: windowState.x,
      windowY: windowState.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);

    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    const newX = drag.windowX + deltaX;
    const newY = drag.windowY + deltaY;

    onMove(windowState.id, newX, newY);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) {
        return;
    }

    dragRef.current = null;
    setIsDragging(false);

    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  return (
    <section
      style={{
        left: windowState.isMaximized ? 0 : windowState.x,
        top: windowState.isMaximized ? 0 : windowState.y,
        width: windowState.isMaximized ? "100%" : windowState.width,
        height: windowState.isMaximized ? "calc(100% - 72px)" : windowState.height,
        zIndex: windowState.zIndex,
        display: windowState.isMinimized ? "none" : undefined,
      }}

        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        className="absolute flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121925]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">

      <header
        data-drag-handle
        className="flex h-12 shrink-0 cursor-move touch-none select-none items-center justify-between border-b border-white/10 bg-white/5 pl-4 pr-2">
        <div className="flex min-w-0 items-center gap-3">
          <WindowIcon
            size={17}
            className="shrink-0 text-emerald-400"/>

          <h2 className="truncate text-sm font-medium tracking-wide text-white/90 capitalize">
            {title}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-1">

          <button
            type="button"
            aria-label="Minimize window"
            onClick={() => onMinimize(windowState.id)}
            className="flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white">
            <Minus size={16} />
          </button>

          <button
            type="button"
            aria-label={windowState.isMaximized ? "Restore window" : "Maximize window"}
            onClick={() => onMaximize(windowState.id)}
            className="flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white">
            {windowState.isMaximized ? (
              <Copy size={14} />
            ) : (
              <Square size={14} />
            )}
          </button>
          <button
            type="button"
            aria-label="Close window"
            onClick={onClickClose}
            className="flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-red-500/80 hover:text-white">
            <X size={17} />
          </button>

        </div>
      </header>

      <div
        className={`min-h-0 flex-1 overflow-auto p-5 text-white/80 ${isDragging ? "pointer-events-none select-none" : ""}`}>
        {children}
      </div>

      <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      {!windowState.isMaximized && (
        <>
          <div
            data-drag-handle
            className="absolute inset-y-0 left-0 z-20 w-3 cursor-move touch-none select-none"/>

          <div
            data-drag-handle
            className="absolute inset-y-0 right-0 z-20 w-3 cursor-move touch-none select-none"/>

          <div
            data-drag-handle
            className="absolute inset-x-0 bottom-0 z-20 h-3 cursor-move touch-none select-none"/>
        </>
      )}
    </section>
  );
}
