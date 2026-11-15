"use client";

import { Power } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  stage: string;
  setStage: (stage: string) => void;
};

export default function PowerAndLoadingScreen({stage, setStage}: Props) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const isStartingRef = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      if (stage === "power") {
        isStartingRef.current = false;
        return;
      }

      if (stage !== "loading") return;

      const tl = gsap.timeline({
        onComplete: () => setStage("signin"),
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        barRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 5,
          ease: "none",

          onUpdate: function () {
            const percent = Math.round(this.progress() * 100);

            if (percentRef.current) {
              percentRef.current.textContent = `${percent}%`;
            }
          },
        },
        "+=0.6"
      );

      tl.to(
        screenRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.6"
      );
    },
    {
      dependencies: [stage],
      revertOnUpdate: true,
    }
  );

  const handlePowerOn = contextSafe(() => {
    if (stage !== "power" || isStartingRef.current) return;

    isStartingRef.current = true;

    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
      onComplete: () => setStage("loading"),
    });
  });

  return (
    <main
      ref={screenRef}
      className="flex min-h-screen flex-col items-center justify-center bg-[#090d15]">
      <button
        type="button"
        onClick={handlePowerOn}
        disabled={stage !== "power" || isStartingRef.current}
        aria-label="Power on"
        aria-pressed={stage === "loading"}
        className={`flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all duration-300 ease-out
          ${stage === "loading"
              ? "translate-y-0.5 border-emerald-400 bg-emerald-500/15 text-emerald-400 shadow-[inset_0_3px_12px_rgba(0,0,0,0.5),0_0_35px_rgba(16,185,129,0.45)]"
              : "border-white/20 bg-white/5 text-white/60 shadow-xl hover:border-white/40 hover:text-white active:scale-95"}`}>
        <Power size={36} strokeWidth={1.7} />
      </button>

      <div className="mt-4 flex flex-col">
        <p ref={textRef} className="text-white">
          {stage === "loading" ? (
            <> SYSTEM LOADING...{" "}
              <span ref={percentRef}>0%</span>
            </>
            ) : (
            "POWER ON")}
        </p>
      </div>

      {stage === "loading" && (
        <div
          ref={barRef}
          className="mt-4 h-2 w-75 overflow-hidden rounded-full bg-white/10 opacity-0">
          <div
            ref={progressRef}
            className="h-full w-0 rounded-full bg-emerald-400"/>
        </div>
      )}
    </main>
  );
}
