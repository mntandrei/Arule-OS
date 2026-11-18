import { Folder, Globe, Settings, Trash2, CircleHelp } from "lucide-react";

type DesktopIconProps = {
  type: "folder" | "browser" | "settings" | "trash" | "CircleHelp";
  name: string;
};

export default function DesktopIcon({ name, type }: DesktopIconProps) {
  return (

    <button
      type="button"
      className="flex flex-col items-center justify-center gap-1 rounded-lg p-1 transition-colors hover:bg-white/10">
      {type === "folder" && <Folder size={26} />}
      {type === "browser" && <Globe size={26} />}
      {type === "settings" && <Settings size={26} />}
      {type === "trash" && <Trash2 size={26} />}
      {type === "CircleHelp" && <CircleHelp size={26} />}
      <span className="text-xs text-white">{name}</span>
    </button>
  );
}