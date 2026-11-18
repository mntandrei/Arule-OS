import DesktopIcon from "./DesktopIcon";

export default function DesktopGrid() {
  return (
    <div className="grid grid-cols-[70px] auto-rows-[75px] content-start gap-1 p-3">
      <DesktopIcon type="folder" name="File Explorer" />
      <DesktopIcon type="browser" name="Browser" />
      <DesktopIcon type="settings" name="Settings" />
      <DesktopIcon type="trash" name="Trash" />
      <DesktopIcon type="CircleHelp" name="About" />
    </div>
  );
}