import type { AppId } from "../types/desktop";
import type { DesktopIconProps } from "../components/desktop/DesktopIcon";

export const apps: Record<
  AppId,
  { name: string; type: DesktopIconProps["type"] }
> = {
  explorer: { name: "File Explorer", type: "folder" },
  browser: { name: "Browser", type: "browser" },
  settings: { name: "Settings", type: "settings" },
  trash: { name: "Trash", type: "trash" },
  about: { name: "About", type: "circleHelp" },
};