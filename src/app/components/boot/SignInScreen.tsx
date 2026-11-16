import { UserRound, ArrowRight } from "lucide-react";

export default function SignInScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center text-white">
      <div className="flex flex-col items-center gap-5">

        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <UserRound size={65} strokeWidth={1.2} />
        </div>

        <h1 className="text-3xl font-light tracking-wide">
          User
        </h1>

        <button
          type="button"
          onClick={onSignIn}
          className="group mt-3 flex items-center gap-3 rounded-lg border border-white/20 bg-white/15 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Sign In
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"/>
        </button>

      </div>
    </main>
  );
}