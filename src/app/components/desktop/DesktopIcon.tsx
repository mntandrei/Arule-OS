import {Folder,Globe,Settings,Trash2,CircleHelp} from "lucide-react";

export type DesktopIconProps = {
  type: | "folder" | "browser" | "settings" | "trash" | "circleHelp";
  name: string;
  onClick: () => void;
};

export default function DesktopIcon({name, type, onClick}: DesktopIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 w-full min-w-0 flex-col items-center justify-center gap-1 rounded-lg p-1 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-emerald-400">
      {type === "folder" && <Folder size={26} />}
      {type === "browser" && <Globe size={26} />}
      {type === "settings" && <Settings size={26} />}
      {type === "trash" && <Trash2 size={26} />}
      {type === "circleHelp" && <CircleHelp size={26} />}

      <span className="max-w-full truncate text-center text-xs leading-4">
        {name}
      </span>
    </button>
  );
}
