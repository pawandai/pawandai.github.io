"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  Cpu,
  FlaskConical,
  Gauge,
  GitBranch,
  Map,
  Menu,
  Network,
  Radio,
  ScanLine,
  Settings2,
  X,
} from "lucide-react";
import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "learning", label: "Learning", icon: BrainCircuit },
  { id: "simulation", label: "Simulation", icon: FlaskConical },
  { id: "integration", label: "Integration", icon: Network },
  { id: "hardware", label: "Hardware", icon: Cpu },
  { id: "testing", label: "Testing", icon: ScanLine },
];

function Label({ children }: { children: React.ReactNode }) {
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
  onOpen,
}: {
  src: string;
  alt: string;
  caption: string;
  onOpen: (src: string, alt: string, caption: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src, alt, caption)}
      className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left transition hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
    >
      <div className="flex min-h-52 items-center justify-center bg-slate-950 p-3 sm:min-h-64">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          className="max-h-[28rem] w-full object-contain transition duration-300 group-hover:scale-[1.015]"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <span>{caption}</span>
        <span className="text-cyan-300">view full</span>
      </div>
    </button>
  );
}

const actions = [
  ["0", "Forward", "(0.25, 0.00)", "preferred"],
  ["1–2", "Forward + turn", "(0.18, ±0.60)", "fine correction"],
  ["3–4", "Large turn", "(0.10, ±1.50)", "obstacle escape"],
  ["5", "Reverse", "(-0.12, 0.00)", "recovery"],
  ["6", "Emergency spin", "(0.05, 2.50)", "new recovery action"],
];

export default function AutonomousNavigationBotPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);
  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };
  const openFigure = (src: string, alt: string, caption: string) =>
    setExpanded({ src, alt, caption });

  return (
    <main className="min-h-screen bg-[#071018] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071018]/90 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-300"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-400" /> portfolio / project
            02
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
            <p className="mt-2 flex items-center gap-2 text-xs text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />{" "}
              simulation validated
            </p>
          </div>
        </aside>
        <div className="min-w-0 flex-1 px-4 pb-28 md:px-10 md:pb-16">
          <section
            id="overview"
            className="scroll-mt-24 border-b border-white/10 py-12 md:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-amber-300">
                  Research project / reinforcement learning
                </p>
                <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
                  Autonomous navigation
                  <br />
                  <span className="text-cyan-300">with deep Q-learning.</span>
                </h1>
                <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-slate-400 md:text-lg">
                  A ROS2 and Gazebo training system where a simulated robot
                  learns to reach a goal, avoid obstacles, and later communicate
                  with an ESP32 through micro-ROS.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["DQN", "Gazebo", "ROS2 Jazzy", "PyTorch", "micro-ROS"].map(
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
                src="/projects/autonomous_nav_bot/autonomous_nav_4.jpg"
                alt="Autonomous navigation bot simulation"
                caption="simulation / learned navigation"
              />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
              {[
                ["01", "14D state", "goal-aware input"],
                ["02", "7 actions", "recovery included"],
                ["03", "DQN", "experience replay"],
                ["04", "Gazebo", "3D training world"],
              ].map(([n, t, d]) => (
                <div key={n} className="bg-[#0d1a25] p-5">
                  <p className="font-mono text-xs text-amber-300">{n}</p>
                  <p className="mt-5 font-semibold text-white">{t}</p>
                  <p className="mt-1 text-xs text-slate-500">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="learning"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <Label>01 / learning + algorithm</Label>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Learn a policy from motion, not rules.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Deep Q-learning maps a continuous observation vector to action
                  values. The policy network improves from replayed transitions
                  while a slower target network keeps the learning target
                  stable.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    ["Network", "256 → 128 → 7"],
                    ["Replay", "100,000 transitions"],
                    ["Batch", "128 samples"],
                    ["Target", "every 10 episodes"],
                  ].map(([t, d]) => (
                    <div
                      key={t}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        {t}
                      </p>
                      <p className="mt-3 font-semibold text-cyan-200">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan-400/20 bg-[#091722] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                    14-dimensional state
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Front/rear sensors, position, circular goal angle,
                    normalized goal vector, distance, linear and angular
                    velocity, minimum clearance, and navigation mode.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "sensors ×2",
                      "position ×2",
                      "goal direction ×4",
                      "motion ×3",
                      "safety",
                      "mode",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    reward shaping
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Progress toward the goal is rewarded strongly; alignment
                    gets a larger bonus, collisions are penalized by proximity,
                    and reaching the goal returns +25 as a terminal reward.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a25]">
              <div className="border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                7-action policy
              </div>
              <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
                {actions.map(([id, name, velocity, note]) => (
                  <div key={id} className="bg-[#0d1a25] p-4">
                    <p className="font-mono text-xs text-cyan-300">{id}</p>
                    <p className="mt-3 text-sm font-semibold text-white">
                      {name}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-slate-400">
                      {velocity}
                    </p>
                    <p className="mt-2 text-[10px] text-slate-600">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="simulation"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <Label>02 / simulation methods</Label>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Train safely in a digital arena.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Because DQN training needs thousands of episodes and high
                  compute, the main learning loop runs in Gazebo rather than on
                  the physical robot. The simulator provides repeatable physics,
                  sensor topics, obstacles, and a visible goal.
                </p>
                <div className="mt-7 space-y-3">
                  {[
                    "10m × 10m indoor arena",
                    "4 obstacles: boxes and cylinders",
                    "Robot starts at (-1.5, -1.5)",
                    "Goal at (1.5, 1.5)",
                    "Rewards and checkpoints logged per episode",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <Figure
                onOpen={openFigure}
                src="/projects/autonomous_nav_bot/autonomous_nav_1.png"
                alt="Gazebo autonomous navigation simulation"
                caption="Gazebo / indoor training world"
              />
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                ["Explore", "ε starts at 1.0 and decays to 0.05."],
                ["Learn", "Replay batches update the policy network."],
                [
                  "Evaluate",
                  "Success rate, reward, steps, and collisions are tracked.",
                ],
              ].map(([t, d], i) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5"
                >
                  <p className="font-mono text-xs text-amber-300">0{i + 1}</p>
                  <h3 className="mt-5 font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="integration"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <Label>03 / software integration</Label>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Gazebo teaches. ROS2 connects. micro-ROS carries it outward.
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {[
                [
                  "Gazebo",
                  "3D world, physics, obstacles, and simulated sensors.",
                ],
                ["ROS2", "Control nodes, launch files, topics, and messages."],
                [
                  "PyTorch",
                  "DQN policy, replay memory, target network, checkpoints.",
                ],
                [
                  "micro-ROS",
                  "ESP32 bridge for real-time embedded communication.",
                ],
              ].map(([t, d], i) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5"
                >
                  <span className="font-mono text-xs text-amber-300">
                    0{i + 1}
                  </span>
                  <h3 className="mt-8 font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="hardware"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <Label>04 / hardware boundary</Label>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Hardware is the endpoint, not the training ground.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  The planned platform uses an ESP32, L298N motor driver, two
                  HC-SR04 ultrasonic sensors, encoder motors, and a 7.4–11.1V
                  battery. We did not perform complete high-end onboard DQN
                  training: the compute-heavy learning phase remained in
                  simulation.
                </p>
                <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    important constraint
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    ESP32 is used for embedded communication and control
                    testing, while model training is performed on a more capable
                    computer.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5">
                  <Bot className="h-5 w-5 text-cyan-300" />
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    controller
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">ESP32</p>
                  <p className="mt-2 text-sm text-slate-500">
                    WiFi + micro-ROS client
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5">
                  <Radio className="h-5 w-5 text-cyan-300" />
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    sensing
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    HC-SR04 × 2
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    front + rear distances
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5">
                  <GitBranch className="h-5 w-5 text-cyan-300" />
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    actuation
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    L298N + DC motors
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    differential drive
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1a25] p-5">
                  <Map className="h-5 w-5 text-cyan-300" />
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    power
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    2S–3S LiPo
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    7.4–11.1V supply
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="testing"
            className="scroll-mt-24 border-b border-white/10 py-14"
          >
            <Label>05 / testing</Label>
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Test the learned behavior at the edge.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  The trained model is evaluated in Gazebo first, then the
                  communication and control path is tested on ESP32 with
                  micro-ROS. This separates learning validation from embedded
                  deployment risk.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  validation sequence
                </p>
                {[
                  "Launch Gazebo and verify sensor topics",
                  "Train and save DQN checkpoints",
                  "Evaluate best model in simulation",
                  "Start micro-ROS agent on UDP 8888",
                  "Flash ESP32 and inspect serial output",
                  "Verify ultrasonic data and /cmd_vel flow",
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
            <Figure
              onOpen={openFigure}
              src="/projects/autonomous_nav_bot/autonomous_nav_3.jpg"
              alt="Autonomous navigation bot testing"
              caption="testing / robot and environment"
            />
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
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={expanded.caption}
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col rounded-2xl border border-white/10 bg-[#0d1a25] p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpanded(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-slate-950/80 p-2 text-slate-300"
              aria-label="Close expanded figure"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl bg-slate-950 p-2 sm:p-6">
              <Image
                src={expanded.src}
                alt={expanded.alt}
                width={1800}
                height={1200}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
            <p className="px-2 pt-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {expanded.caption}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
