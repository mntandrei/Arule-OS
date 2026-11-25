import type { WindowState } from "../types/desktop";

export function saveSession(stage: string) {
    sessionStorage.setItem("stage", stage);
}

export function getSession(): string | null {
    return sessionStorage.getItem("stage");
}

export function saveOpenWindows(state: WindowState[]) {
  sessionStorage.setItem("openWindows", JSON.stringify(state));
}

export function getOpenWindows(): WindowState[] | null {
  const data = sessionStorage.getItem("openWindows");
  return data ? JSON.parse(data) : null;
}