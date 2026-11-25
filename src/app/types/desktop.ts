export type AppId = | "explorer" | "browser" | "settings" | "trash" | "about";

export type IconPosition = {
  id: AppId;
  row: number;
  column: number;
};

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};