import {Folder, Globe, Settings, Trash2, CircleHelp} from "lucide-react";

export type DesktopIconProps = {
  type: "folder" | "browser" | "settings" | "trash" | "circleHelp";
  name: string;
  onClick: () => void;
  variant?: "desktop" | "taskbar";
  isActive?: boolean;
};

export default function DesktopIcon({name, type, onClick, variant = "desktop", isActive = false}: DesktopIconProps) {
  const iconSize = variant === "desktop" ? 26 : 22;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name}
      title={name}
      className={`relative flex items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-emerald-400 ${
        variant === "desktop" ? "h-14 w-full min-w-0 flex-col gap-1 p-1" : "h-10 w-10 shrink-0 hover:scale-110 hover:text-emerald-400"}`}>
      {type === "folder" && <Folder size={iconSize} />}
      {type === "browser" && <Globe size={iconSize} />}
      {type === "settings" && <Settings size={iconSize} />}
      {type === "trash" && <Trash2 size={iconSize} />}
      {type === "circleHelp" && <CircleHelp size={iconSize} />}

      {variant === "desktop" && (
        <span className="max-w-full truncate text-center text-xs leading-4">
          {name}
        </span>
      )}

      {variant === "taskbar" && (
        <span
          className={`absolute bottom-0.5 h-0.5 w-4 rounded-full transition-colors duration-200 ${
            isActive ? "bg-emerald-400" : "bg-white"}`}/>
      )}
    </button>
  );
}
