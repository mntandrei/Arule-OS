"use client";

import PowerAndLoadingScreen from './components/boot/PowerAndLoadingScreen';
import SignInScreen from './components/boot/SignInScreen';
import Desktop from "./components/desktop/Desktop";
import { useState, useEffect } from "react";
import { getSession, saveSession } from "./lib/storage/session";

export default function Home() {
  const [stage, setStage] = useState("power");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedStage = getSession();
    if (savedStage) {
      setStage(savedStage);
    }
    setIsHydrated(true);
  }, []);
  
  useEffect(() => {
    if (!isHydrated) return;

    saveSession(stage);
  }, [stage, isHydrated]);

  if (!isHydrated) {
    return <main className="min-h-screen bg-[#090d15]" />;
  }

  return (
    <main className="bg-[#090d15]">
      {(stage === "power" || stage === "loading") && (
        <PowerAndLoadingScreen stage={stage} setStage={setStage}/>
      )}
      {stage === "signin" && (
        <SignInScreen onSignIn={() => setStage("signedin")}/>
      )}
      {stage === "signedin" && (
        <Desktop />
      )}
    </main>
  );
};