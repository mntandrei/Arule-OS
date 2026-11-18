"use client";
import DesktopGrid from "./DesktopGrid";
import Taskbar from "./Taskbar";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Desktop() {
  const desktopRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      desktopRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <main ref={desktopRef} className="flex flex-col min-h-screen w-full bg-[#090d15] text-white">
      <DesktopGrid />
      <Taskbar />
    </main>
  );
}