export type AppId = | "explorer" | "browser" | "settings" | "trash" | "about";

export type IconPosition = {
  id: AppId;
  row: number;
  column: number;
};
