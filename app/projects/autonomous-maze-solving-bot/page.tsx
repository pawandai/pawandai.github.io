"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Crosshair,
  GitBranch,
  Gauge,
  Menu,
  Route,
  ScanLine,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { CODE } from "@/lib/constants";

const sections = [
  { id: "overview", label: "Project Overview", icon: Gauge },
  { id: "algorithm", label: "Algorithm", icon: GitBranch },
  { id: "hardware", label: "Hardware", icon: Cpu },
  { id: "testing", label: "Testing", icon: ScanLine },
];

const metrics = [
  ["01", "Grid world", "structured maze"],
  ["02", "Flood-fill", "adaptive planner"],
  ["03", "ESP32", "real-time control"],
  ["04", "2-wheel", "differential drive"],
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-400">
      {children}
    </p>
  );
}

function Figure({
  src,
  alt,
  caption,
  className = "",
  onOpen,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  onOpen: (src: string, alt: string, caption: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src, alt, caption)}
      className={`group block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left transition hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${className}`}
      aria-label={`Expand ${caption}`}
    >
      <div className="relative flex min-h-48 items-center justify-center bg-slate-950 p-3 sm:min-h-64">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          className="max-h-[28rem] w-full object-contain transition duration-300 group-hover:scale-[1.015]"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
      <figcaption className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <span>{caption}</span>
        <span className="text-cyan-300">view full</span>
      </figcaption>
    </button>
  );
}

export default function AutonomousMazeSolvingBotPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedFigure, setExpandedFigure] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);
  const [codeOpen, setCodeOpen] = useState(false);
  const [firmwareCode, setFirmwareCode] = useState(CODE);
  const openFigure = (src: string, alt: string, caption: string) =>
    setExpandedFigure({ src, alt, caption });
  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };
  const openCode = async () => {
    setCodeOpen(true);
    if (!firmwareCode) setFirmwareCode(CODE);
  };

  return (
    <main className="min-h-screen bg-[#071018] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071018]/90 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-300"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-400" /> portfolio / project
            01
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label="Toggle section navigation"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`${menuOpen ? "block" : "hidden"} fixed inset-x-4 top-20 z-20 rounded-2xl border border-white/10 bg-[#0d1a25] p-4 shadow-2xl md:sticky md:top-20 md:block md:h-[calc(100vh-5rem)] md:w-60 md:shrink-0 md:rounded-none md:border-0 md:border-r md:bg-transparent md:p-6 md:shadow-none`}
        >
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Project index
          </p>
          <nav className="flex flex-col gap-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-10 hidden border-t border-white/10 pt-5 md:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Status
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
              completed
            </p>
          </div>
        </aside>
        <div className="min-w-0 flex-1 px-4 pb-28 md:px-10 md:pb-16">
          <section
            id="overview"
            className="scroll-mt-24 border-b border-white/10 py-12 md:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-amber-300">
                  Major project / autonomous systems
                </p>
                <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
                  Autonomous maze
                  <br />
                  <span className="text-cyan-300">solving bot.</span>
                </h1>
                <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-slate-400 md:text-lg">
                  A compact mobile robot that senses walls, builds a map, and
                  navigates a grid maze with no remote control.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Flood-fill", "BFS", "ESP32", "C++", "IR sensing"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-200"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <Figure
                onOpen={openFigure}
                src="/projects/autonomous-maze-solving-bot/bot.jpeg"
                alt="Autonomous maze solving robot prototype"
                caption="prototype / differential-drive platform"
              />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
              {metrics.map(([number, title, detail]) => (
                <div key={number} className="bg-[#0d1a25] p-5">
                  <p className="font-mono text-xs text-amber-300">{number}</p>
                  <p className="mt-5 font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="algorithm"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <SectionLabel>03 / algorithm</SectionLabel>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Explore first. Then run the shortest path.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  The firmware is a two-state navigation engine:{" "}
                  <span className="text-slate-200">EXPLORING</span> discovers
                  the maze, then{" "}
                  <span className="text-slate-200">GOING_TO_GOAL</span> follows
                  a fresh distance map to the target. A final{" "}
                  <span className="text-slate-200">FINISHED</span> state stops
                  the motors.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Detect", "front / left / right"],
                    ["02", "Recompute", "BFS from target"],
                    ["03", "Move", "lowest valid cost"],
                  ].map(([n, t, d]) => (
                    <div
                      key={n}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="font-mono text-xs text-cyan-400">{n}</p>
                      <p className="mt-4 text-sm font-semibold text-white">
                        {t}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-slate-500">
                        {d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Figure
                onOpen={openFigure}
                src="/projects/autonomous-maze-solving-bot/algorithm.png"
                alt="Flood-fill algorithm diagram"
                caption="planner / distance field"
              />
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#091722]">
                <div className="flex items-center justify-between border-b border-cyan-400/10 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                    firmware logic / C++
                  </p>
                  <button
                    type="button"
                    onClick={openCode}
                    className="rounded-md border border-cyan-400/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-400/10"
                  >
                    view full code
                  </button>
                </div>
                <pre className="max-h-[520px] overflow-auto p-5 font-mono text-[11px] leading-6 text-slate-300">
                  <code>{`updateDistances(targetX, targetY);\n\nint bestDir = -1;\nint minVal = 255;\n\n// Prefer continuing straight\nif (!walls[x][y][currentOrient]) {\n  int nx = x + dx[currentOrient];\n  int ny = y + dy[currentOrient];\n\n  if (distMap[nx][ny] < distMap[x][y]) {\n    bestDir = currentOrient;\n    minVal = distMap[nx][ny];\n  }\n}\n\n// Otherwise choose the best neighbor\nfor (int d = 0; d < 4; d++) {\n  if (!walls[x][y][d]) {\n    int nx = x + dx[d];\n    int ny = y + dy[d];\n\n    if (distMap[nx][ny] < minVal) {\n      minVal = distMap[nx][ny];\n      bestDir = d;\n    }\n  }\n}`}</code>
                </pre>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    State machine
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <p>
                      <span className="mr-2 rounded bg-amber-300/10 px-2 py-1 font-mono text-[10px] text-amber-200">
                        EXPLORING
                      </span>{" "}
                      mark cells, detect walls, seek the nearest unvisited cell.
                    </p>
                    <p>
                      <span className="mr-2 rounded bg-cyan-300/10 px-2 py-1 font-mono text-[10px] text-cyan-200">
                        GOING_TO_GOAL
                      </span>{" "}
                      navigate toward{" "}
                      <span className="font-mono text-slate-100">
                        goalX = 1, goalY = 1
                      </span>
                      .
                    </p>
                    <p>
                      <span className="mr-2 rounded bg-emerald-300/10 px-2 py-1 font-mono text-[10px] text-emerald-200">
                        FINISHED
                      </span>{" "}
                      stop both motors after arrival.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    Movement policy
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                    <li>
                      <span className="text-slate-200">Wall map:</span>{" "}
                      <span className="font-mono text-xs">addWall()</span>{" "}
                      writes both sides of every wall.
                    </li>
                    <li>
                      <span className="text-slate-200">Turning:</span>{" "}
                      <span className="font-mono text-xs">faceDirection()</span>{" "}
                      resolves 90° or 180° changes.
                    </li>
                    <li>
                      <span className="text-slate-200">Cell travel:</span>{" "}
                      <span className="font-mono text-xs">moveOneCell()</span>{" "}
                      uses IR correction and encoder pulses.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            id="hardware"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <SectionLabel>05 / hardware</SectionLabel>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Built for feedback, not spectacle.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  The platform pairs an ESP32 with IR wall sensors,
                  encoder-equipped N20 motors, a motor driver, and a caster
                  wheel. The electronics keep the signal path short and the
                  mechanical footprint compact.
                </p>
                <ul className="mt-7 space-y-3 font-mono text-xs text-slate-400">
                  {[
                    "ESP32 microcontroller",
                    "IR sensor module × 3",
                    "N20 encoder motors × 2",
                    "Motor driver + battery supply",
                    "Differential wheels + caster",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Crosshair className="h-4 w-4 shrink-0 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Figure
                  onOpen={openFigure}
                  src="/projects/autonomous-maze-solving-bot/esp32.png"
                  alt="ESP32 controller"
                  caption="compute / ESP32"
                />
                <Figure
                  onOpen={openFigure}
                  src="/projects/autonomous-maze-solving-bot/circuit.jpg"
                  alt="Robot circuit design"
                  caption="electronics / circuit design"
                />
              </div>
            </div>
          </section>

          <section
            id="testing"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <SectionLabel>03 / testing & calibration</SectionLabel>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Calibration is part of the algorithm.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Sensor thresholds are tuned against wall distance, while motor
                  timing and encoder feedback are checked for straight motion
                  and repeatable 90-degree turns. Tests progress from isolated
                  actions to full-maze runs.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Validation sequence
                </p>
                {[
                  "Sensor read + threshold",
                  "Straight-line correction",
                  "Turn-in-place repeatability",
                  "Unknown-wall discovery",
                  "Goal reach + path replay",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0"
                  >
                    <span className="font-mono text-xs text-cyan-400">
                      0{i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#0a151f]/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="flex overflow-x-auto">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className="flex min-w-[76px] flex-1 flex-col items-center gap-1 px-1 py-3 text-[9px] text-slate-500"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>
      {expandedFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={expandedFigure.caption}
          onClick={() => setExpandedFigure(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col rounded-2xl border border-white/10 bg-[#0d1a25] p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedFigure(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-slate-950/80 p-2 text-slate-300 hover:text-white"
              aria-label="Close expanded figure"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl bg-slate-950 p-2 sm:p-6">
              <Image
                src={expandedFigure.src}
                alt={expandedFigure.alt}
                width={1800}
                height={1200}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
            <p className="px-2 pt-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {expandedFigure.caption}
            </p>
          </div>
        </div>
      )}
      {codeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Complete firmware code"
          onClick={() => setCodeOpen(false)}
        >
          <div
            className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#091722] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cyan-400/15 px-4 py-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                  complete firmware / C++
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  autonomous maze solving bot
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCodeOpen(false)}
                className="rounded-full border border-white/20 p-2 text-slate-300 hover:text-white"
                aria-label="Close full code"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <pre className="min-h-0 overflow-auto p-4 font-mono text-[11px] leading-6 text-slate-300 sm:p-6">
              <code>{firmwareCode || "Loading firmware…"}</code>
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
