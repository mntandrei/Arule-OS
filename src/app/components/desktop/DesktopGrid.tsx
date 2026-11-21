import DesktopIcon from "./DesktopIcon";

export type AppId = "explorer" | "browser" | "settings" | "trash" | "about";
type DesktopGridProps = {
  onOpenApp: (appId: AppId) => void;
};

export default function DesktopGrid({ onOpenApp }: DesktopGridProps) {

  return (
    <div className="grid grid-cols-[70px] auto-rows-[75px] content-start gap-1 p-3">
      <DesktopIcon type="folder" name="File Explorer" onClick={() => onOpenApp("explorer")} />
      <DesktopIcon type="browser" name="Browser" onClick={() => onOpenApp("browser")} />
      <DesktopIcon type="settings" name="Settings" onClick={() => onOpenApp("settings")} />
      <DesktopIcon type="trash" name="Trash" onClick={() => onOpenApp("trash")} />
      <DesktopIcon type="CircleHelp" name="About" onClick={() => onOpenApp("about")} />
    </div>
  );
}