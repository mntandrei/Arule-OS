"use client";

import PowerAndLoadingScreen from './components/boot/PowerAndLoadingScreen';
import SignInScreen from './components/boot/SignInScreen';
import { useState } from "react";

export default function Home() {
  const [stage, setStage] = useState("power");

  return (
    <main className="bg-[#090d15]">
      {(stage === "power" || stage === "loading") && (
        <PowerAndLoadingScreen stage={stage} setStage={setStage}/>
      )}
      {stage === "signin" && (
        <SignInScreen/>
      )}
    </main>
  );
};