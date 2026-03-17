import Link from "next/link";
import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const section1 = [
  {
    prop: "prefetch={null}",
    title: "Default",
    label: "Partial prefetch",
    color: "var(--amber)",
    colorDim: "var(--amber-dim)",
    href: "/prefetch-default",
    prefetchProp: undefined as boolean | undefined,
    phases: [
      {
        trigger: "viewport",
        segments: [
          { label: "layout.tsx", widthPct: 4, color: "var(--amber)" },
          { label: "loading.tsx", widthPct: 4, color: "var(--amber)" },
        ],
        timing: "~15ms",
        empty: false,
      },
      {
        trigger: "click",
        segments: [
          { label: "page.tsx + data", widthPct: 100, color: "var(--amber)" },
        ],
        timing: "~2s",
        empty: false,
      },
    ],
    outcome:
      "loading.tsx renders immediately on click — users see a spinner while page data loads in the background.",
    tag: "Recommended",
  },
  {
    prop: "prefetch={false}",
    title: "Disabled",
    label: "No prefetch",
    color: "var(--indigo)",
    colorDim: "var(--indigo-dim)",
    href: "/prefetch-false",
    prefetchProp: false,
    phases: [
      {
        trigger: "viewport",
        segments: [],
        timing: "—",
        empty: true,
      },
      {
        trigger: "click",
        segments: [
          { label: "layout.tsx", widthPct: 33, color: "var(--indigo)" },
          { label: "loading.tsx", widthPct: 33, color: "#818cf8" },
          { label: "page.tsx + data", widthPct: 100, color: "#a5b4fc" },
        ],
        timing: "~2s",
        empty: false,
      },
    ],
    outcome:
      "Navigation is delayed until the server responds. loading.tsx is fetched at click time — and may never render if the page loads first.",
    tag: "Slow Navigation",
  },
  {
    prop: "prefetch={true}",
    title: "Full",
    label: "Full prefetch",
    color: "var(--green)",
    colorDim: "var(--green-dim)",
    href: "/prefetch-true",
    prefetchProp: true,
    phases: [
      {
        trigger: "viewport",
        segments: [
          {
            label: "layout.tsx + loading.tsx + page.tsx + data",
            widthPct: 100,
            color: "var(--green)",
          },
        ],
        timing: "~2s",
        empty: false,
      },
      {
        trigger: "click",
        segments: [{ label: "instant", widthPct: 3, color: "var(--green)" }],
        timing: "instant",
        empty: false,
      },
    ],
    outcome:
      "Everything is loaded on hover. Clicking navigates instantly to the full page — no loading state shown at all.",
    tag: "Bandwidth heavy",
  },
];

const section2 = [
  {
    prop: "prefetch={null}",
    title: "No Loading, Default",
    label: "No prefetch at all",
    color: "var(--amber)",
    colorDim: "var(--amber-dim)",
    href: "/no-loading",
    prefetchProp: undefined as boolean | undefined,
    phases: [
      {
        trigger: "viewport",
        segments: [],
        timing: "—",
        empty: true,
      },
      {
        trigger: "click",
        segments: [
          {
            label: "layout.tsx + page.tsx + data",
            widthPct: 100,
            color: "var(--amber)",
          },
        ],
        timing: "~2s",
        empty: false,
      },
    ],
    outcome:
      "No loading boundary means no partial prefetch. Clicking blocks navigation on the current page until the server responds — no loading state is ever shown.",
    tag: "No prefetch",
  },
  {
    prop: "prefetch={true}",
    title: "No Loading, Force Prefetch",
    label: "Full prefetch forced",
    color: "var(--green)",
    colorDim: "var(--green-dim)",
    href: "/no-loading-prefetch-true",
    prefetchProp: true,
    phases: [
      {
        trigger: "viewport",
        segments: [
          {
            label: "layout.tsx + page.tsx + data",
            widthPct: 100,
            color: "var(--green)",
          },
        ],
        timing: "~2s",
        empty: false,
      },
      {
        trigger: "click",
        segments: [{ label: "instant", widthPct: 3, color: "var(--green)" }],
        timing: "instant",
        empty: false,
      },
    ],
    outcome:
      "prefetch=true forces a full prefetch even without loading.tsx. Navigation is instant but no loading state is possible — the full page data must be fetched upfront on hover.",
    tag: "Bandwidth heavy",
  },
];

const section3 = [
  {
    prop: "prefetch={null}",
    title: "Static + Loading",
    label: "Always prefetched",
    color: "var(--cyan)",
    colorDim: "var(--cyan-dim)",
    href: "/static-with-loading",
    prefetchProp: undefined as boolean | undefined,
    phases: [
      {
        trigger: "viewport",
        segments: [{ label: "full page", widthPct: 3, color: "var(--cyan)" }],
        timing: "~instant",
        empty: false,
      },
      {
        trigger: "click",
        segments: [{ label: "instant", widthPct: 3, color: "var(--cyan)" }],
        timing: "instant",
        empty: false,
      },
    ],
    outcome:
      "Static routes are always fully prefetched — layout, loading.tsx, and page data. The loading state is prefetched but never shown because navigation is instant. Cache TTL: 30s.",
    tag: "Always prefetched",
  },
  {
    prop: "prefetch={null}",
    title: "Static, No Loading",
    label: "Longest cache",
    color: "var(--cyan)",
    colorDim: "var(--cyan-dim)",
    href: "/static-no-loading",
    prefetchProp: undefined as boolean | undefined,
    phases: [
      {
        trigger: "viewport",
        segments: [{ label: "full page", widthPct: 3, color: "var(--cyan)" }],
        timing: "~instant",
        empty: false,
      },
      {
        trigger: "click",
        segments: [{ label: "instant", widthPct: 3, color: "var(--cyan)" }],
        timing: "instant",
        empty: false,
      },
    ],
    outcome:
      "Static routes are fully prefetched regardless of loading.tsx. Without a loading boundary, the prefetch cache lasts until the app reloads — longer than the 30s TTL imposed by a loading boundary.",
    tag: "Longest cache",
  },
];

const section4 = [
  {
    prop: "prefetch={null}",
    title: "Parent Boundary",
    label: "Boundary placement",
    color: "var(--amber)",
    colorDim: "var(--amber-dim)",
    href: "/parent-loading/child",
    prefetchProp: undefined as boolean | undefined,
    phases: [
      {
        trigger: "viewport",
        segments: [
          {
            label: "parent layout + loading.tsx",
            widthPct: 4,
            color: "var(--amber)",
          },
        ],
        timing: "~15ms",
        empty: false,
      },
      {
        trigger: "click",
        segments: [
          {
            label: "child page.tsx + data",
            widthPct: 100,
            color: "var(--amber)",
          },
        ],
        timing: "~2s",
        empty: false,
      },
    ],
    outcome:
      "The partial prefetch only reaches the nearest loading boundary — which is in the parent segment. The child's page.tsx is still fetched on click. Placing loading.tsx closer to the page gives more granular control.",
    tag: "Boundary placement",
  },
];

// ─── Row component ────────────────────────────────────────────────────────────

type Segment = { label: string; widthPct: number; color: string };
type Phase = {
  trigger: string;
  segments: Segment[];
  timing: string;
  empty: boolean;
};
type Demo = {
  prop: string;
  title: string;
  label: string;
  color: string;
  colorDim: string;
  href: string;
  prefetchProp: boolean | undefined;
  phases: Phase[];
  outcome: string;
  tag: string;
};

function DemoRow({ demo }: { demo: Demo }) {
  return (
    <div
      className="grid grid-cols-[172px_1fr_224px] gap-x-7 px-6 py-5 items-start"
      style={
        {
          "--card-color": demo.color,
          "--card-color-dim": demo.colorDim,
          borderLeft: `3px solid ${demo.color}`,
        } as React.CSSProperties
      }
    >
      {/* Col 1: meta */}
      <div className="flex flex-col gap-1.5 pt-0.5">
        <span className="font-mono text-xs font-medium text-[var(--card-color)] bg-[var(--card-color-dim)] border border-[var(--card-color)] rounded-[5px] px-2 py-0.5 inline-block tracking-[0.02em] opacity-90 self-start">
          {demo.prop}
        </span>
        <div>
          <div className="text-base font-bold text-[var(--text)] tracking-[-0.01em] leading-tight">
            {demo.title}
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)] mt-0.5 tracking-[0.03em]">
            {demo.label}
          </div>
        </div>
        <span className="text-xs font-semibold tracking-[0.07em] uppercase text-[var(--card-color)] opacity-60">
          {demo.tag}
        </span>
      </div>

      {/* Col 2: timeline */}
      <div className="flex flex-col gap-1.5">
        {demo.phases.map((phase) => (
          <div
            key={phase.trigger}
            className="flex items-center gap-3 min-h-[28px]"
          >
            <span className="font-mono text-xs font-medium text-[var(--text-muted)] uppercase tracking-[0.08em] min-w-[58px] shrink-0">
              {phase.trigger}
            </span>
            {phase.empty ? (
              <div className="flex-1 h-[22px] flex items-center px-1.5">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  nothing fetched
                </span>
              </div>
            ) : (
              <div className="flex-1 h-[22px] bg-[#111] rounded-md border border-[var(--border-subtle)] flex items-center px-1.5 gap-3">
                {phase.segments.map((seg, i) => (
                  <div key={i} className="flex items-center gap-1.5 shrink-0">
                    <div
                      className="h-3 rounded-[2px] shrink-0 transition-opacity"
                      style={{
                        width: `${Math.max(8, Math.min(seg.widthPct * 0.5, 40))}px`,
                        background: seg.color,
                        opacity: 0.85 - i * 0.12,
                      }}
                    />
                    <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap">
                      {seg.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <span className="font-mono text-xs text-[var(--text-muted)] min-w-[46px] text-right shrink-0">
              {phase.timing}
            </span>
          </div>
        ))}
      </div>

      {/* Col 3: outcome + link */}
      <div className="flex flex-col gap-3 justify-between">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
          {demo.outcome}
        </p>
        <Link
          href={demo.href}
          prefetch={demo.prefetchProp}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--card-color)] no-underline mt-auto tracking-[0.01em] [transition:gap_0.15s] hover:gap-2.5"
        >
          Try demo
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5">
      <div className="section-divider mb-2.5">{title}</div>
      <p className="text-center font-mono text-xs text-[var(--text-muted)] tracking-[0.04em]">
        {subtitle}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="max-w-[1080px] mx-auto px-6 pt-16 pb-24">
      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1.5 tracking-[0.04em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shrink-0" />
          next.js app router
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.1] mb-4 text-[var(--text)]">
          How does Next.js 16 prefetch behave?
        </h1>

        <p className="text-base text-[var(--text-secondary)] max-w-[540px] leading-[1.65] mb-6">
          The{" "}
          <code className="font-mono text-sm text-[#aaa]">prefetch</code>{" "}
          prop on{" "}
          <code className="font-mono text-sm text-[#aaa]">{"<Link>"}</code>{" "}
          determines what gets loaded before and after a click — and whether
          your loading state ever renders at all. This matrix covers all
          combinations of route type, loading boundary presence, and prefetch
          behaviour.
        </p>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-[18px] py-3.5 text-sm text-[var(--text-secondary)] leading-relaxed [&_strong]:text-[var(--text)] [&_strong]:font-semibold">
          <strong>Important:</strong> With the browser network tools panel open,{" "}
          <i>hard reload</i> the browser before clicking each link.
        </div>
      </div>

      {/* ── Section 1: Dynamic · with loading.tsx ── */}
      <div className="mb-12">
        <SectionHeader
          title="Dynamic · with loading.tsx"
          subtitle="force-dynamic  |  loading.tsx ✓  |  varies: prefetch prop"
        />
        <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          {section1.map((demo, i) => (
            <DemoRow key={demo.href} demo={demo} />
          ))}
        </div>
      </div>

      {/* ── Section 2: Dynamic · without loading.tsx ── */}
      <div className="mb-12">
        <SectionHeader
          title="Dynamic · without loading.tsx"
          subtitle="force-dynamic  |  loading.tsx ✗  |  varies: prefetch prop"
        />
        <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          {section2.map((demo, i) => (
            <DemoRow key={demo.href} demo={demo} />
          ))}
        </div>
      </div>

      {/* ── Section 3: Loading boundary placement ── */}
      <div className="mb-12">
        <SectionHeader
          title="Loading boundary placement"
          subtitle="force-dynamic  |  loading.tsx in parent segment only  |  prefetch={null}"
        />
        <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          {section4.map((demo, i) => (
            <DemoRow key={demo.href} demo={demo} />
          ))}
        </div>
      </div>

      {/* ── Section 4: Static routes ── */}
      <div className="mb-14">
        <SectionHeader
          title="Static routes"
          subtitle="static render (no force-dynamic)  |  prefetch={null}  |  varies: loading.tsx"
        />
        <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
          {section3.map((demo, i) => (
            <DemoRow key={demo.href} demo={demo} />
          ))}
        </div>
      </div>

      {/* ── Key insights ── */}
      <div>
        <div className="section-divider mb-5">key insights</div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {[
            {
              icon: "⚡",
              title: "prefetch={null} is usually right",
              body: "Prefetch is triggered by viewport entry. Next.js loads only the shell — fast and cheap. The loading state renders instantly on click while page data streams in.",
            },
            {
              icon: "⚠️",
              title: "prefetch={false} has a trap",
              body: "Both loading.tsx and page.tsx are fetched on click. If page loads first, the loading state never shows — wasted bandwidth.",
            },
            {
              icon: "💡",
              title: "prefetch={true} is expensive",
              body: "Pre-fetches everything on viewport entry, including all page data. Instant navigation — but costs bandwidth for every link in view.",
            },
            {
              icon: "🔒",
              title: "No loading.tsx blocks navigation",
              body: "Without a loading boundary, partial prefetch is impossible. The browser stays on the current page until the server fully responds.",
            },
            {
              icon: "📦",
              title: "Static routes are always prefetched",
              body: "Next.js fully prefetches static routes on viewport entry regardless of the prefetch prop. The loading state is cached but never shown.",
            },
            {
              icon: "📐",
              title: "Boundary placement matters",
              body: "The partial prefetch stops at the nearest loading.tsx. Place it close to the page component for the most granular loading control.",
            },
          ].map((insight) => (
            <div key={insight.title}>
              <div className="text-xl mb-2">{insight.icon}</div>
              <h3 className="font-mono text-sm font-bold text-[var(--text)] mb-1.5 tracking-[-0.01em]">
                {insight.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {insight.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
