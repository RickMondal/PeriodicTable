'use client';

import { useEffect, useMemo, useState } from "react";
import { fetchElements } from "@/lib/api";
import type { Element, Isotope } from "@/types/chemistry";

type Palette = {
  gradient: [string, string, string];
  accent: string;
  shadow: string;
  ring: string;
};

const categoryPalette: Record<string, Palette> = {
  "alkali metal": {
    gradient: ["#fb923c", "#facc15", "#fef08a"],
    accent: "#ea580c",
    shadow: "rgba(249, 115, 22, 0.45)",
    ring: "rgba(249, 115, 22, 0.35)",
  },
  "alkaline earth metal": {
    gradient: ["#bef264", "#4ade80", "#34d399"],
    accent: "#65a30d",
    shadow: "rgba(132, 204, 22, 0.45)",
    ring: "rgba(132, 204, 22, 0.35)",
  },
  metalloid: {
    gradient: ["#34d399", "#22d3ee", "#0ea5e9"],
    accent: "#0f766e",
    shadow: "rgba(13, 148, 136, 0.45)",
    ring: "rgba(13, 148, 136, 0.35)",
  },
  "polyatomic nonmetal": {
    gradient: ["#22d3ee", "#818cf8", "#c4b5fd"],
    accent: "#2563eb",
    shadow: "rgba(59, 130, 246, 0.45)",
    ring: "rgba(59, 130, 246, 0.35)",
  },
  "diatomic nonmetal": {
    gradient: ["#38bdf8", "#c084fc", "#f472b6"],
    accent: "#0284c7",
    shadow: "rgba(14, 165, 233, 0.45)",
    ring: "rgba(14, 165, 233, 0.35)",
  },
  "transition metal": {
    gradient: ["#d1d5db", "#9ca3af", "#6b7280"],
    accent: "#374151",
    shadow: "rgba(107, 114, 128, 0.45)",
    ring: "rgba(107, 114, 128, 0.35)",
  },
  halogen: {
    gradient: ["#f472b6", "#fb7185", "#fca5a5"],
    accent: "#db2777",
    shadow: "rgba(244, 114, 182, 0.45)",
    ring: "rgba(244, 114, 182, 0.35)",
  },
  "noble gas": {
    gradient: ["#8b5cf6", "#6366f1", "#60a5fa"],
    accent: "#4338ca",
    shadow: "rgba(99, 102, 241, 0.45)",
    ring: "rgba(99, 102, 241, 0.35)",
  },
  "post-transition metal": {
    gradient: ["#cbd5f5", "#e0e7ff", "#f5f3ff"],
    accent: "#475569",
    shadow: "rgba(148, 163, 184, 0.35)",
    ring: "rgba(148, 163, 184, 0.35)",
  },
};

const defaultPalette: Palette = {
  gradient: ["#e2e8f0", "#f8fafc", "#ffffff"],
  accent: "#1e293b",
  shadow: "rgba(100, 116, 139, 0.35)",
  ring: "rgba(100, 116, 139, 0.25)",
};

const pickPalette = (category: string): Palette => {
  const lower = category.toLowerCase();
  for (const [key, palette] of Object.entries(categoryPalette)) {
    if (lower.includes(key)) {
      return palette;
    }
  }
  return defaultPalette;
};

const PeriodicTable = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [activeIsotope, setActiveIsotope] = useState<Isotope | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchElements();
        setElements(data.sort((a, b) => a.atomicNumber - b.atomicNumber));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load periodic data.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const tableGrid = useMemo(
    () =>
      elements.map((element) => ({
        element,
        palette: pickPalette(element.category),
      })),
    [elements]
  );

  return (
    <section className="space-y-12">
      <header className="space-y-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur">
          Quantum Tableau
        </span>
        <div className="mx-auto max-w-5xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 drop-shadow-sm md:text-5xl">
            Interactive Periodic Table Explorer
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            Touch an element tile to reveal animated isotopes, live Bohr orbitals, and a playful quantum arena filled with
            subatomic detail.
          </p>
        </div>
      </header>

      <div className="rounded-[38px] border border-white/60 bg-white/80 p-6 backdrop-blur shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-10">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!loading && !error && (
          <div className="-mx-2 overflow-x-auto pb-4">
            <div className="mx-2 grid min-w-[1120px] grid-cols-18 gap-2 sm:gap-2.5 lg:gap-3">
              {tableGrid.map(({ element, palette }) => (
                <button
                  key={element.symbol}
                  type="button"
                  onClick={() => {
                    setActiveElement(element);
                    setActiveIsotope(element.isotopes[0] ?? null);
                  }}
                  style={{
                    gridColumn: element.group,
                    gridRow: element.period,
                    background: `linear-gradient(135deg, ${palette.gradient[0]}, ${palette.gradient[1]}, ${palette.gradient[2]})`,
                    boxShadow: `0 18px 35px -15px ${palette.shadow}`,
                  }}
                  className="group relative flex h-28 flex-col overflow-hidden rounded-[26px] border border-white/40 p-4 text-left shadow-lg transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900/80 hover:-translate-y-1 md:h-32 md:p-5"
                >
                  <span className="text-xs font-semibold text-slate-900/70">{element.atomicNumber}</span>
                  <span className="text-3xl font-semibold tracking-tight text-slate-900 drop-shadow-sm md:text-4xl">
                    {element.symbol}
                  </span>
                  <span className="mt-auto text-xs font-medium uppercase tracking-wider text-slate-900/70">
                    {element.name}
                  </span>
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `0 0 0 4px ${palette.ring}` }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeElement && activeIsotope && (
        <ElementModal
          element={activeElement}
          isotope={activeIsotope}
          palette={pickPalette(activeElement.category)}
          onClose={() => {
            setActiveElement(null);
            setActiveIsotope(null);
          }}
          onSelectIsotope={setActiveIsotope}
        />
      )}
    </section>
  );
};

export default PeriodicTable;

const LoadingState = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="grid place-items-center gap-3 text-center text-slate-500">
      <span className="text-sm font-medium tracking-wide uppercase">Calibrating electron shells…</span>
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

type ErrorStateProps = {
  message: string;
};

const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
    <h2 className="text-xl font-semibold text-rose-600">Unable to reach the element archive</h2>
    <p className="max-w-md text-sm text-slate-600">
      {message}. Start the Express backend with
      <code className="ml-2 rounded bg-slate-900/90 px-2 py-1 text-xs text-white">npm run server:dev</code>
      and try again.
    </p>
  </div>
);

type ElementModalProps = {
  element: Element;
  isotope: Isotope;
  palette: Palette;
  onSelectIsotope: (isotope: Isotope) => void;
  onClose: () => void;
};

const ElementModal = ({ element, isotope, palette, onSelectIsotope, onClose }: ElementModalProps) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm sm:p-6">
    <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[38px] border border-white/60 bg-slate-950 text-slate-100 shadow-2xl">
      <div
        className="h-1.5 flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${palette.gradient[0]}, ${palette.gradient[1]}, ${palette.gradient[2]})` }}
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="sr-only">Close element details</span>
        ×
      </button>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-7 sm:p-9 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_minmax(300px,380px)] xl:gap-10">
            <aside className="space-y-6 lg:space-y-8">
              <div className="rounded-3xl bg-white/5 p-5 shadow-inner">
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Element</span>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-bold text-white drop-shadow-md">{element.symbol}</span>
                  <span className="text-lg font-semibold text-slate-300">{element.atomicNumber}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{element.summary}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-400">
                  <div>
                    <dt className="uppercase tracking-wider">Category</dt>
                    <dd className="font-semibold text-slate-100">{element.category}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider">Atomic mass</dt>
                    <dd className="font-semibold text-slate-100">{element.atomicMass.toFixed(3)}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider">Group</dt>
                    <dd className="font-semibold text-slate-100">{element.group}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider">Period</dt>
                    <dd className="font-semibold text-slate-100">{element.period}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Isotopes</span>
                <div className="flex max-h-[260px] flex-col gap-3 overflow-y-auto pr-2">
                  {element.isotopes.map((option) => {
                    const selected = option.id === isotope.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => onSelectIsotope(option)}
                        style={
                          selected
                            ? { boxShadow: `0 18px 35px -18px ${palette.shadow}`, borderColor: palette.accent }
                            : undefined
                        }
                        className="group relative rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <div className="flex items-baseline justify-between gap-2 text-sm">
                          <span className="font-semibold text-white">{option.name}</span>
                          <span className="text-xs uppercase tracking-wide text-slate-300">{option.abundance}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-inner">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Bohr Model</h3>
                <BohrModelView isotope={isotope} accent={palette.accent} />
              </div>
            </div>

            <div className="space-y-4 lg:col-start-2 xl:col-auto">
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-inner">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Quantum Arena</h3>
                <IsotopeVisualizer isotope={isotope} accent={palette.accent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

type BohrModelViewProps = {
  isotope: Isotope;
  accent: string;
};

const BohrModelView = ({ isotope, accent }: BohrModelViewProps) => {
  const shells = isotope.bohrModel.shells;
  const shellCount = shells.length;
  const diagramSize = Math.min(480, 300 + Math.max(shellCount - 3, 0) * 48);
  const nucleusSize = Math.min(120, Math.max(72, 54 + shellCount * 6));
  const nucleusRadius = nucleusSize / 2;
  const orbitSpacing =
    shellCount > 0 ? (diagramSize / 2 - 20 - nucleusRadius) / shellCount : 0;

  return (
    <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-center">
      <div className="relative mx-auto flex-shrink-0" style={{ width: diagramSize, height: diagramSize }}>
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-xs font-semibold text-slate-900 shadow-lg"
          style={{
            width: nucleusSize,
            height: nucleusSize,
            background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.88))`,
            boxShadow: `0 0 32px -10px ${accent}`,
          }}
        >
          <div>
            <div>p {isotope.particleBreakdown.protons}</div>
            <div>n {isotope.particleBreakdown.neutrons}</div>
          </div>
        </div>
        {shells.map((electronCount, shellIndex) => {
          const radius = nucleusRadius + orbitSpacing * (shellIndex + 1);
          const duration = 14 + shellIndex * 5;
          return (
            <div
              key={`${isotope.id}-shell-${shellIndex}`}
              className="bohr-shell"
              style={{
                width: radius * 2,
                height: radius * 2,
                animationDuration: `${duration}s`,
              }}
            >
              {Array.from({ length: electronCount }).map((_, electronIndex) => (
                <span
                  key={`${isotope.id}-shell-${shellIndex}-electron-${electronIndex}`}
                  className="bohr-electron"
                  style={{ transform: `rotate(${(360 / electronCount) * electronIndex}deg) translateX(${radius}px)` }}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="space-y-3 text-xs text-slate-300">
        <p className="leading-relaxed">{isotope.bohrModel.notes}</p>
        <dl className="grid grid-cols-2 gap-3">
          <div>
            <dt className="uppercase tracking-wide text-slate-400">Configuration</dt>
            <dd className="font-semibold text-white">{isotope.bohrModel.electronConfiguration}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wide text-slate-400">Shells</dt>
            <dd className="font-semibold text-white">{shells.join(" · ")}</dd>
          </div>
          {isotope.halfLife && (
            <div>
              <dt className="uppercase tracking-wide text-slate-400">Half-life</dt>
              <dd className="font-semibold text-white">{isotope.halfLife}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

type IsotopeVisualizerProps = {
  isotope: Isotope;
  accent: string;
};

const IsotopeVisualizer = ({ isotope, accent }: IsotopeVisualizerProps) => {
  const { particleBreakdown } = isotope;
  const shells = isotope.bohrModel.shells;
  const shellCount = shells.length;
  const stageSize = Math.min(460, 360 + Math.max(shellCount - 3, 0) * 42);
  const arenaHeight = stageSize + 100;
  const nucleusSize = Math.min(150, 120 + Math.min(particleBreakdown.protons, 60) * 0.35);
  const nucleusRadius = nucleusSize / 2;
  const orbitSpacing =
    shellCount > 0 ? (stageSize / 2 - nucleusRadius - 36) / shellCount : 0;
  const orbitRadii = shells.map((_, index) => nucleusRadius + orbitSpacing * (index + 1));

  return (
    <div className="space-y-4">
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-slate-950/60"
        style={{ height: arenaHeight }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 to-slate-950" />
        <div className="absolute inset-0 quantum-perspective">
          <div className="quantum-stage" style={{ width: stageSize, height: stageSize }}>
            <div
              className="quantum-nucleus"
              style={{
                width: nucleusSize,
                height: nucleusSize,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${accent})`,
                boxShadow: `0 0 35px -10px ${accent}`,
              }}
            >
              {renderNucleusSwarm(particleBreakdown.protons, particleBreakdown.neutrons)}
            </div>
            {orbitRadii.map((radius, index) => {
              const electrons = shells[index];
              return (
                <div
                  key={`${isotope.id}-orbit-${index}`}
                  className="quantum-orbit"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    animationDuration: `${18 + index * 6}s`,
                  }}
                >
                  {Array.from({ length: electrons }).map((_, electronIndex) => (
                    <span
                      key={`${isotope.id}-orbit-${index}-electron-${electronIndex}`}
                      className="quantum-electron"
                      style={{
                        transform: `rotate(${(360 / electrons) * electronIndex}deg) translateX(${radius}px)`,
                      }}
                    />
                  ))}
                </div>
              );
            })}
            <ParticleMist
              quarksUp={particleBreakdown.quarks.up}
              quarksDown={particleBreakdown.quarks.down}
              positrons={particleBreakdown.positrons ?? 0}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-3 text-xs text-slate-300">
        <DataRow label="Protons" value={particleBreakdown.protons} tone="#fb7185" />
        <DataRow label="Neutrons" value={particleBreakdown.neutrons} tone="#38bdf8" />
        <DataRow label="Electrons" value={particleBreakdown.electrons} tone="#34d399" />
        <DataRow
          label="Quarks"
          value={`↑ ${particleBreakdown.quarks.up}  ↓ ${particleBreakdown.quarks.down}`}
          tone="#c084fc"
        />
        <DataRow label="Positrons" value={particleBreakdown.positrons ?? 0} tone="#facc15" />
      </div>
    </div>
  );
};

type DataRowProps = {
  label: string;
  value: number | string;
  tone: string;
};

const DataRow = ({ label, value, tone }: DataRowProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/10 px-4 py-2">
    <span className="font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
    <span className="font-semibold" style={{ color: tone }}>
      {value}
    </span>
  </div>
);

const renderNucleusSwarm = (protons: number, neutrons: number) => {
  const limit = 28;
  const total = Math.min(protons + neutrons, limit);
  const nodes = Array.from({ length: total });
  return nodes.map((_, index) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 24;
    const depth = Math.sin(index) * 10;
    const isProton = index % 2 === 0;

    return (
      <span
        key={`nucleus-${index}`}
        className="nucleus-particle"
        style={{
          background: isProton ? "#fb7185" : "#38bdf8",
          transform: `translate3d(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px, ${depth}px)`,
          animationDelay: `${index * 0.12}s`,
        }}
      />
    );
  });
};

type ParticleMistProps = {
  quarksUp: number;
  quarksDown: number;
  positrons: number;
};

const ParticleMist = ({ quarksUp, quarksDown, positrons }: ParticleMistProps) => {
  const descriptors = [
    ...buildParticleDescriptors(quarksUp, "#c084fc"),
    ...buildParticleDescriptors(quarksDown, "#818cf8"),
    ...buildParticleDescriptors(positrons, "#facc15"),
  ];

  return (
    <div className="quantum-cloud">
      {descriptors.map((descriptor, index) => (
        <span
          key={`cloud-${index}`}
          className="quantum-cloud-particle"
          style={{
            background: descriptor.color,
            animationDelay: `${descriptor.delay}s`,
            transform: `translate3d(${descriptor.x}px, ${descriptor.y}px, ${descriptor.z}px)`,
          }}
        />
      ))}
    </div>
  );
};

type ParticleDescriptor = {
  color: string;
  delay: number;
  x: number;
  y: number;
  z: number;
};

const buildParticleDescriptors = (count: number, color: string): ParticleDescriptor[] => {
  const limit = Math.min(count, 24);
  return Array.from({ length: limit }).map((_, index) => {
    const angle = (index / Math.max(limit, 1)) * Math.PI * 2;
    return {
      color,
      delay: index * 0.18,
      x: Math.cos(angle) * 110,
      y: Math.sin(angle) * 90,
      z: Math.sin(index * 1.5) * 60,
    };
  });
};
