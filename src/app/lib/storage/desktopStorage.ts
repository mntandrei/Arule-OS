import type { IconPosition } from "../../types/desktop";

export function saveIconPositions(iconPositions: IconPosition[]) {
    localStorage.setItem("iconPositions", JSON.stringify(iconPositions));
};

export function getIconPositions() {
    const stored = localStorage.getItem("iconPositions");
    return stored ? JSON.parse(stored) as IconPosition[] : null;
};