import {CodeXml, ArrowUpRight, Monitor, Layers, MousePointer2, Database, Sparkles, Globe, Terminal, Cpu} from "lucide-react";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Lucide React",
];

const features = [
  {
    icon: Layers,
    title: "Window Management",
    description:
      "Open and manage multiple independent application windows.",
  },
  {
    icon: MousePointer2,
    title: "Interactive Desktop",
    description:
      "Organize your desktop with draggable application icons.",
  },
  {
    icon: Database,
    title: "Persistent Storage",
    description:
      "Your desktop layout and active session are remembered.",
  },
  {
    icon: Sparkles,
    title: "Smooth Animations",
    description:
      "Fluid interactions and transitions powered by GSAP.",
  },
  {
    icon: Globe,
    title: "Integrated Browser",
    description:
      "Explore supported websites without leaving your desktop.",
  },
  {
    icon: Terminal,
    title: "Web-Based System",
    description:
      "A desktop-inspired experience running directly in your browser.",
  },
];

export default function About() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-2 text-white">
      <section className="relative isolate overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/10 via-[#121925] to-[#090d15] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"/>

        <div className="flex flex-wrap items-center gap-5">

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 shadow-[0_0_30px_rgba(52,211,153,0.12)]">
            <Monitor size={38} className="text-emerald-400" />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                In Development
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Arule<span className="text-emerald-400"> OS</span>
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Your desktop. Reimagined for the web.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
          A modern, interactive desktop experience that brings
          the familiarity of an operating system directly into
          your browser.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
            Personal Project
          </span>

          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
            Front-End Development
          </span>

          <span className="rounded-md border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] text-emerald-400">
            Web Desktop
          </span>
        </div>

      </section>

      <section className="space-y-4">

        <div className="flex items-center gap-2">
          <CodeXml size={19} className="text-emerald-400" />

          <h2 className="text-base font-semibold">
            About the project
          </h2>
        </div>

        <p className="text-sm leading-7 text-white/60">
            Arule OS is a front-end project I built for myself. 
            It takes cues from the desktop systems we use every day.
            The goal is to bring that desktop feel to the web. 
            You get apps you can click and use, windows you can move around, 
            smooth motion and settings that stay put after you leave.
        </p>

        <p className="text-sm leading-7 text-white/60">
            It is also a space for me to play with parts I can reuse, state handling, 
            browser storage and layouts that adapt to any screen. 
            The project keeps growing as I add things and make it better.
        </p>

      </section>

      <div className="h-px bg-white/10" />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu size={19} className="text-emerald-400" />

          <h2 className="text-base font-semibold">
            Technology stack
          </h2>
        </div>

        <p className="text-xs text-white/45">
          The technologies powering Arule OS.
        </p>

        <div className="flex flex-wrap gap-3 py-1">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="cursor-default rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/70 transition-all duration-300 ease-out hover:z-10 hover:scale-110 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              {technology}
            </span>
          ))}
        </div>

      </section>

      <div className="h-px bg-white/10" />

      {/* FEATURES */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">
          <Sparkles size={19} className="text-emerald-400" />

          <h2 className="text-base font-semibold">
            System features
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3">

          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:shadow-[0_5px_25px_rgba(16,185,129,0.08)] motion-reduce:transform-none motion-reduce:transition-none">

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10 motion-reduce:transform-none">

                <Icon
                  size={20}
                  className="text-white/60 transition-colors duration-300 group-hover:text-emerald-400"
                />

              </div>

              <h3 className="text-sm font-medium text-white/90 transition-colors group-hover:text-emerald-400">
                {title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-white/45">
                {description}
              </p>

            </article>
          ))}

        </div>
      </section>
      <section className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4">

        <div className="flex items-center gap-3">

          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <h2 className="text-sm font-medium text-emerald-400">
            Active development
          </h2>

        </div>

        <p className="mt-2 text-xs leading-relaxed text-white/50">
          Arule OS is an ongoing project. New applications,
          system features and improvements will be introduced
          as development continues.
        </p>

      </section>

      <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg font-semibold text-emerald-400">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-white/90 hover:text-emerald-400 hover:scale-102 duration-250">
              Muntianu Andrei
            </p>

            <p className="mt-1 text-xs text-white/45">
              Designer & Front-End Developer
            </p>
          </div>

        </div>

        <a
          href="https://github.com/mntandrei"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:scale-105 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] focus-visible:outline-2 focus-visible:outline-emerald-400 motion-reduce:transform-none">
          <CodeXml size={18} />

          View on GitHub

          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

      </footer>

      <div className="flex flex-col items-center gap-2 pb-3 pt-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/30">
          Arule OS — Built for the web
        </p>
      </div>
    </div>
  );
}
