"use client";

import { useEffect, useRef, useState } from "react";
import type { DragEvent } from "react";
import DesktopIcon from "./DesktopIcon";
import type {AppId,IconPosition} from "../../types/desktop";
import { apps } from "../../lib/apps";

type DesktopGridProps = {onOpenApp: (appId: AppId) => void;
  iconPositions: IconPosition[];
  onMoveIcon: (id: AppId, row: number,column: number) => void;
  onGridResize: (columns: number,rows: number) => void;
};

const CELL_WIDTH = 90;
const CELL_HEIGHT = 56;
const GAP = 8;


export default function DesktopGrid({onOpenApp, iconPositions, onMoveIcon, onGridResize}: DesktopGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const [gridSize, setGridSize] = useState({columns: 0,rows: 0});

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const calculateGridSize = () => {
      const styles = getComputedStyle(grid);
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      const availableWidth = Math.max(0, grid.clientWidth - paddingX);
      const availableHeight = Math.max(0, grid.clientHeight - paddingY);

      const columns = Math.max(1, Math.floor((availableWidth + GAP) /(CELL_WIDTH + GAP)));
      const rows = Math.max(1, Math.floor((availableHeight + GAP) / (CELL_HEIGHT + GAP)));

      setGridSize((previous) => {
        if (
          previous.columns === columns && previous.rows === rows) {
          return previous;
        }

        return { columns, rows };
      });

      onGridResize(columns, rows);
    };

    calculateGridSize();

    const observer = new ResizeObserver( calculateGridSize);

    observer.observe(grid);

    return () => observer.disconnect();
  }, [onGridResize]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const { columns, rows } = gridSize;

    if (columns === 0 || rows === 0) {
      return;
    }

    const id = event.dataTransfer.getData("text/plain") as AppId;
    const iconExists = iconPositions.some((icon) => icon.id === id);

    if (!iconExists) return;

    const grid = event.currentTarget;
    const rect = grid.getBoundingClientRect();
    const styles = getComputedStyle(grid);

    const paddingLeft = parseFloat( styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat( styles.paddingBottom);
    const width = grid.clientWidth - paddingLeft - paddingRight;
    const height = grid.clientHeight - paddingTop - paddingBottom;

    const x = event.clientX - rect.left - paddingLeft;

    const y = event.clientY - rect.top - paddingTop;

    if (x < 0 || y < 0 || x >= width || y >= height) {
      return;
    }

    const columnStep = columns > 1 ? (width - CELL_WIDTH) / (columns - 1) : 0;
    const rowStep = rows > 1 ? (height - CELL_HEIGHT) / (rows - 1) : 0;

    const column = columns === 1 ? 1 : Math.max( 1, Math.min( columns, Math.round((x - CELL_WIDTH / 2) / columnStep) + 1));
    const row = rows === 1 ? 1 : Math.max(1, Math.min( rows, Math.round((y - CELL_HEIGHT / 2) / rowStep) + 1));

    onMoveIcon(id, row, column);
  };

  return (
    <div
      ref={gridRef}
      className="absolute inset-x-0 top-0 bottom-[72px] grid min-h-0 overflow-hidden gap-2 px-3 pt-3 pb-0"
      style={{gridTemplateColumns: gridSize.columns > 0 ? `repeat(${gridSize.columns}, ${CELL_WIDTH}px)` : undefined,
        gridTemplateRows: gridSize.rows > 0 ? `repeat(${gridSize.rows}, ${CELL_HEIGHT}px)` : undefined,
        justifyContent: gridSize.columns > 1 ? "space-between" : "start",
        alignContent: gridSize.rows > 1 ? "space-between" : "end",

      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={handleDrop}>
      {gridSize.rows > 0 &&
        gridSize.columns > 0 &&
        iconPositions.map((position) => {const app = apps[position.id];

          return (
            <div
              key={position.id}
              draggable
              onDragStart={(event) => {event.dataTransfer.setData("text/plain", position.id);
                event.dataTransfer.effectAllowed = "move";
                }}
              className="h-14 w-[90px] min-w-0"
              style={{
                gridRowStart: position.row,
                gridColumnStart: position.column,
              }}>
              <DesktopIcon
                type={app.type}
                name={app.name}
                onClick={() => onOpenApp(position.id)}/>
            </div>
          );
        })}
    </div>
  );
}
