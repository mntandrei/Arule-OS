import DesktopGrid from "./DesktopGrid";
import Taskbar from "./Taskbar";

export default function Desktop() {
  return (

    <main className="flex flex-col min-h-screen w-full bg-[#090d15] text-white">
      <DesktopGrid />
      <Taskbar />
    </main>
  );
}