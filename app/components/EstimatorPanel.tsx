"use client";

import { useMemo, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  FileOutput,
  Layers,
  Calculator,
  Globe,
  Layout,
  ShoppingCart,
  Database,
  Search,
  FileText,
  Cpu,
  ArrowRight,
  RefreshCw,
  Bot,
  Workflow,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { generateEstimatePDF } from "../../utils/generatePDF";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
   Type Definitions (WebAiGen Specific)
---------------------------------------------------- */
type ServiceType = "landing" | "website" | "ecommerce";
type TierLevel = "startup" | "business" | "enterprise";

// NEW: Extra Modules
type ExtraKey =
  | "copywriting"
  | "seo"
  | "cms"
  | "automation"
  | "ml";

type EstimatorPanelProps = {
  open: boolean;
  onClose: () => void;
  onSendToChat: (markdown: string) => void;
  isDark: boolean;
};

// 1. Service Definitions
const serviceLabels: Record<ServiceType, string> = {
  landing: "Landing_Page",
  website: "Full_Website",
  ecommerce: "E-Commerce",
};

// 2. Complexity Tiers
const tierLabels: Record<TierLevel, string> = {
  startup: "Tier_1 (MVP)",
  business: "Tier_2 (Growth)",
  enterprise: "Tier_3 (Scale)",
};

// 3. Pricing Logic (Web Dev Market Rates)
const baseMinCost: Record<ServiceType, number> = {
  landing: 500,
  website: 1500,
  ecommerce: 3000,
};

const costPerPage: Record<ServiceType, number> = {
  landing: 200,
  website: 300,
  ecommerce: 500,
};

const tierMultipliers: Record<ServiceType, Record<TierLevel, number>> = {
  landing: { startup: 1.0, business: 1.5, enterprise: 2.5 },
  website: { startup: 1.0, business: 1.4, enterprise: 2.0 },
  ecommerce: { startup: 1.0, business: 1.3, enterprise: 1.8 },
};

// 4. NEW: Module pricing (AI Automation + ML)
// Note: priced as add-ons on top of core web build.
// You can tweak these numbers easily without changing UI.
const moduleCosts = {
  copywriting: (units: number) => units * 100 + 200, // existing
  seo: (service: ServiceType) => (service === "ecommerce" ? 1500 : 800),
  cms: (service: ServiceType) => (service === "landing" ? 300 : 1200),

  // NEW: Automation systems (Zapier/Make/n8n + webhooks + docs)
  // priced per “flow” proxy = units-based baseline + tier scaling.
  automation: (units: number, tier: TierLevel) => {
    const base = 900; // discovery + system wiring
    const perFlow = 220; // per automation flow
    const tierBoost = tier === "startup" ? 1.0 : tier === "business" ? 1.25 : 1.6;
    // Heuristic: flows ≈ ceil(units / 3) (more pages → more funnels/forms/integrations)
    const flows = Math.max(2, Math.ceil(units / 3));
    return (base + flows * perFlow) * tierBoost;
  },

  // NEW: Machine learning (food/personal project style) — data → model → simple deploy
  // priced per “dataset/model complexity proxy” = units-based baseline + tier scaling.
  ml: (units: number, tier: TierLevel, service: ServiceType) => {
    const base = 1800; // data audit + pipeline + baseline model
    const perUnit = service === "ecommerce" ? 180 : 140; // ecommerce usually needs richer signals
    const tierBoost = tier === "startup" ? 1.0 : tier === "business" ? 1.3 : 1.75;
    // Heuristic: model scope grows slower than pages, so use sqrt-ish scaling:
    const complexity = Math.max(1, Math.round(Math.sqrt(units)));
    return (base + complexity * perUnit) * tierBoost;
  },
};

const STEPS = [
  { id: 1, label: "PROTOCOL", description: "Select Architecture" },
  { id: 2, label: "SCOPE", description: "Page/Section Vol" },
  { id: 3, label: "INTEL", description: "AI & Design Depth" },
  { id: 4, label: "MODULES", description: "Integrations" },
  { id: 5, label: "COMPILE", description: "Generate Quote" },
];

export default function EstimatorPanel({
  open,
  onClose,
  onSendToChat,
}: EstimatorPanelProps) {
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<ServiceType | null>(null);
  const [pageCount, setPageCount] = useState<string>("");
  const [tier, setTier] = useState<TierLevel>("business");

  // UPDATED extras to include automation + ml
  const [extras, setExtras] = useState<Record<ExtraKey, boolean>>({
    copywriting: false,
    seo: false,
    cms: false,
    automation: false,
    ml: false,
  });

  // ------------------------------------------------------------------
  // Logic
  // ------------------------------------------------------------------
  const parsedCount = useMemo(() => {
    const n = Number(pageCount);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [pageCount]);

  const estimate = useMemo(() => {
    if (!service || !parsedCount) return null;

    const base = baseMinCost[service];
    const perUnit = costPerPage[service];
    const mult = tierMultipliers[service][tier];

    // Core Calc: (Base + (Pages * Cost)) * Multiplier
    let core = (base + perUnit * parsedCount) * mult;
    let total = core;

    const breakdown: string[] = [];
    breakdown.push(`Core_Architecture: ~$${core.toFixed(0)}`);

    // Extras (existing)
    if (extras.copywriting) {
      const copyCost = moduleCosts.copywriting(parsedCount);
      total += copyCost;
      breakdown.push(`AI_Content_Gen: +$${copyCost.toFixed(0)}`);
    }

    if (extras.seo) {
      const seoCost = moduleCosts.seo(service);
      total += seoCost;
      breakdown.push(`SEO_Matrix_Setup: +$${seoCost.toFixed(0)}`);
    }

    if (extras.cms) {
      const cmsCost = moduleCosts.cms(service);
      total += cmsCost;
      breakdown.push(`CMS_Admin_Panel: +$${cmsCost.toFixed(0)}`);
    }

    // NEW: AI Automation
    if (extras.automation) {
      const automationCost = moduleCosts.automation(parsedCount, tier);
      total += automationCost;
      breakdown.push(`AI_Automation_Systems: +$${automationCost.toFixed(0)}`);
      breakdown.push(`└─ Flows: ~${Math.max(2, Math.ceil(parsedCount / 3))} (heuristic)`);
    }

    // NEW: Machine Learning
    if (extras.ml) {
      const mlCost = moduleCosts.ml(parsedCount, tier, service);
      total += mlCost;
      breakdown.push(`Machine_Learning_Module: +$${mlCost.toFixed(0)}`);
      breakdown.push(`└─ Pipeline: Data→Train→Eval→Deploy (baseline)`);
    }

    // Range
    const low = total * 0.9;
    const high = total * 1.15;

    return { total, low, high, breakdown, core };
  }, [service, parsedCount, tier, extras]);

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!parsedCount;
    if (step === 3) return !!tier;
    return true;
  };

  const next = () => {
    if (!canNext()) return;
    setStep((prev) => (prev < 5 ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const reset = () => {
    setStep(1);
    setService(null);
    setPageCount("");
    setTier("business");
    setExtras({
      copywriting: false,
      seo: false,
      cms: false,
      automation: false,
      ml: false,
    });
  };

  const handleSendToChat = () => {
    if (!service || !parsedCount || !estimate) return;
    const { low, high, breakdown } = estimate;

    const selectedExtras = Object.entries(extras)
      .filter(([, v]) => v)
      .map(([k]) => k.toUpperCase());

    const markdown = [
      `### ⚡ WEBAIGEN_ESTIMATE: ${serviceLabels[service]}`,
      "",
      `**// SYSTEM PARAMETERS**`,
      `- **Arch:** ${serviceLabels[service]}`,
      `- **Scope:** ${parsedCount} ${service === "landing" ? "SECTIONS" : "PAGES"}`,
      `- **Tier:** ${tierLabels[tier]}`,
      `- **Modules:** ${selectedExtras.length ? selectedExtras.join(" + ") : "N/A"}`,
      "",
      `**// COST PROJECTION**`,
      `# $${low.toFixed(0)} – $${high.toFixed(0)}`,
      "",
      breakdown.length
        ? `**// DATA STREAM:**\n${breakdown.map((b) => `> ${b}`).join("\n")}`
        : "",
      "",
      `_Projection uses a heuristic blend of build hours + AI module complexity. Final scope confirmed after discovery._`,
    ].join("\n");

    onSendToChat(markdown);
    onClose();
    reset();
  };

  // ------------------------------------------------------------------
  // UI Render
  // ------------------------------------------------------------------
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="h-full flex flex-col bg-[#050505] text-white font-sans relative overflow-hidden"
        >
          {/* Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-[#d4af37]/40 bg-[#d4af37]/10 rounded-sm">
                <Calculator className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#d4af37] tracking-[0.2em] uppercase">
                  WebAiGen_OS
                </div>
                <div className="font-bold text-sm tracking-wide text-white/90">
                  PROJECT_CALCULATOR
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Strip */}
          <div className="flex w-full h-1 bg-white/10">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-full transition-all duration-300 ${
                  s.id <= step ? "bg-[#d4af37]" : "bg-transparent"
                }`}
                style={{ width: `${100 / STEPS.length}%` }}
              />
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scroll p-6 relative z-10">
            {/* Step Label */}
            <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-2">
              <div>
                <span className="font-mono text-4xl text-white/10 font-bold block -mb-1">
                  {step < 10 ? `0${step}` : step}
                </span>
                <span className="font-mono text-xs text-[#d4af37] tracking-widest uppercase">
                  // {STEPS[step - 1].label}
                </span>
              </div>
              <span className="font-mono text-[9px] text-white/40 uppercase mb-1">
                {STEPS[step - 1].description}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-[200px]"
              >
                {/* ---------------- STEP 1: SERVICE ---------------- */}
                {step === 1 && (
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: "landing",
                        label: "LANDING_PAGE",
                        icon: Layout,
                        desc: "Single-page conversion funnel. High impact.",
                      },
                      {
                        id: "website",
                        label: "FULL_WEBSITE",
                        icon: Globe,
                        desc: "Multi-page identity. Scalable architecture.",
                      },
                      {
                        id: "ecommerce",
                        label: "ECOMMERCE",
                        icon: ShoppingCart,
                        desc: "Storefront + payments + product flows.",
                      },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setService(s.id as ServiceType)}
                        className={`
                          group relative p-4 border rounded-sm text-left transition-all duration-300
                          ${
                            service === s.id
                              ? "bg-[#d4af37]/10 border-[#d4af37] text-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/30"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <s.icon
                              className={`w-4 h-4 ${
                                service === s.id ? "text-[#d4af37]" : "text-white/40"
                              }`}
                            />
                            <span className="font-mono text-xs tracking-wider uppercase font-bold">
                              {s.label}
                            </span>
                          </div>
                          {service === s.id && (
                            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                          )}
                        </div>
                        <div className="mt-2 text-[10px] opacity-60 font-sans leading-relaxed max-w-[90%] pl-7">
                          {s.desc}
                        </div>

                        <div
                          className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${
                            service === s.id ? "border-[#d4af37]" : "border-transparent"
                          }`}
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${
                            service === s.id ? "border-[#d4af37]" : "border-transparent"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* ---------------- STEP 2: SIZE ---------------- */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-black border border-white/20 p-4 rounded-sm flex items-center gap-4">
                      <Layers className="w-5 h-5 text-[#d4af37]" />
                      <div className="flex-1">
                        <label className="block text-[9px] font-mono text-white/40 uppercase mb-1">
                          {service === "landing" ? "Section Count" : "Page Count"}
                        </label>
                        <input
                          type="number"
                          value={pageCount}
                          onChange={(e) => setPageCount(e.target.value)}
                          placeholder="00"
                          className="w-full bg-transparent text-2xl font-mono text-white placeholder:text-white/20 outline-none border-none p-0"
                          autoFocus
                        />
                      </div>
                      <span className="font-mono text-xs text-white/40">UNITS</span>
                    </div>

                    <div className="p-3 bg-[#d4af37]/5 border-l-2 border-[#d4af37] text-[11px] text-white/70">
                      <strong className="text-[#d4af37] block mb-1">
                        Estimation Protocol:
                      </strong>
                      {service === "landing"
                        ? "Count distinct scroll sections (Hero, Features, Testimonials, CTA)."
                        : "Count unique URLs (Home, About, Services, Contact, Blog)."}
                    </div>
                  </div>
                )}

                {/* ---------------- STEP 3: TIER ---------------- */}
                {step === 3 && (
                  <div className="space-y-3">
                    {(["startup", "business", "enterprise"] as TierLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setTier(lvl)}
                        className={`
                          w-full flex items-center justify-between p-3 border-b border-white/5 hover:bg-white/5 transition-colors text-left
                          ${tier === lvl ? "text-[#d4af37]" : "text-white/60"}
                        `}
                      >
                        <div>
                          <div className="font-mono text-xs uppercase tracking-wider mb-0.5">
                            {tierLabels[lvl]}
                          </div>
                          <div className="text-[10px] opacity-50">
                            {lvl === "startup" && "Standard templates. Rapid deployment."}
                            {lvl === "business" && "Custom UI/UX. Brand-aligned motion."}
                            {lvl === "enterprise" && "Complex flows. Full integrations."}
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center rounded-sm ${
                            tier === lvl
                              ? "border-[#d4af37] bg-[#d4af37]/20"
                              : "border-white/20"
                          }`}
                        >
                          {tier === lvl && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* ---------------- STEP 4: EXTRAS ---------------- */}
                {step === 4 && (
                  <div className="space-y-2">
                    {[
                      {
                        key: "copywriting",
                        label: "AI_COPY_GEN",
                        icon: FileText,
                        desc: "Automated SEO-optimized text generation.",
                      },
                      {
                        key: "seo",
                        label: "SEO_MATRIX",
                        icon: Search,
                        desc: "Meta tags, schema markup, and analytics setup.",
                      },
                      {
                        key: "cms",
                        label: "CMS_INTEGRATION",
                        icon: Database,
                        desc: "Admin panel for content updates.",
                      },

                      // NEW: Automation
                      {
                        key: "automation",
                        label: "AI_AUTOMATION",
                        icon: Workflow,
                        desc: "n8n/Make/Zapier flows + webhooks + lead routing + notifications.",
                      },

                      // NEW: Machine Learning
                      {
                        key: "ml",
                        label: "MACHINE_LEARNING",
                        icon: BrainCircuit,
                        desc: "Data→Model→API→UI. Ideal for personal projects (ex: food ML).",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className={`
                          flex items-start gap-3 p-3 border rounded-sm cursor-pointer transition-all
                          ${(extras as any)[opt.key]
                            ? "bg-[#d4af37]/10 border-[#d4af37]/50"
                            : "bg-white/5 border-white/5 hover:border-white/20"}
                        `}
                      >
                        <div
                          className={`mt-0.5 p-1 rounded-sm ${
                            (extras as any)[opt.key] ? "text-[#d4af37]" : "text-white/40"
                          }`}
                        >
                          <opt.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-mono text-xs uppercase tracking-wider ${
                                (extras as any)[opt.key] ? "text-[#d4af37]" : "text-white/80"
                              }`}
                            >
                              {opt.label}
                            </span>
                            <input
                              type="checkbox"
                              checked={(extras as any)[opt.key]}
                              onChange={(e) =>
                                setExtras((prev) => ({ ...prev, [opt.key]: e.target.checked }))
                              }
                              className="accent-[#d4af37]"
                            />
                          </div>
                          <p className="text-[10px] text-white/40 mt-1">{opt.desc}</p>

                          {/* mini cost hint */}
                          {service && parsedCount && (
                            <p className="mt-2 font-mono text-[9px] tracking-widest text-white/35 uppercase">
                              est:{" "}
                              <span className="text-white/60">
                                {opt.key === "copywriting" &&
                                  `$${moduleCosts.copywriting(parsedCount).toFixed(0)}`}
                                {opt.key === "seo" &&
                                  `$${moduleCosts.seo(service).toFixed(0)}`}
                                {opt.key === "cms" &&
                                  `$${moduleCosts.cms(service).toFixed(0)}`}
                                {opt.key === "automation" &&
                                  `$${moduleCosts.automation(parsedCount, tier).toFixed(0)}`}
                                {opt.key === "ml" &&
                                  `$${moduleCosts.ml(parsedCount, tier, service).toFixed(0)}`}
                              </span>
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* ---------------- STEP 5: SUMMARY ---------------- */}
                {step === 5 && estimate && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="bg-black border border-dashed border-white/20 p-4 rounded-sm text-white/70 space-y-2 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                        <span>ARCH:</span>
                        <span className="text-white">{serviceLabels[service!]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VOLUME:</span>
                        <span className="text-white">{parsedCount} UNITS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>INTEL_LVL:</span>
                        <span className="text-white">{tierLabels[tier]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MODULES:</span>
                        <span className="text-white text-right max-w-[55%]">
                          {Object.values(extras).some(Boolean)
                            ? Object.entries(extras)
                                .filter(([, v]) => v)
                                .map(([k]) => k.toUpperCase())
                                .join(" + ")
                            : "NONE"}
                        </span>
                      </div>

                      <div className="pt-4 mt-2 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <span className="text-[#d4af37] tracking-widest">
                            TOTAL PROJECTION
                          </span>
                          <span className="text-xl font-bold text-[#d4af37]">
                            ${(estimate.low).toFixed(0)} - ${(estimate.high).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-white/10 bg-white/5 p-3 rounded-sm">
                      <div className="flex items-center gap-2 text-[#d4af37] mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-mono text-[10px] tracking-widest uppercase">
                          Breakdown Stream
                        </span>
                      </div>
                      <div className="space-y-1 text-white/60 text-[11px]">
                        {estimate.breakdown.map((b, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-white/25">›</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        generateEstimatePDF({
                          roomType: serviceLabels[service!],
                          sqft: parsedCount!,
                          material: tierLabels[tier],
                          laborCost: estimate.total * 0.6,
                          materialCost: estimate.total * 0.4,
                          total: estimate.total,
                        })
                      }
                      className="w-full py-3 flex items-center justify-center gap-2 border border-white/20 text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-wider"
                    >
                      <FileOutput className="w-3 h-3" /> Export_Data_PDF
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-white/10 bg-[#0a0a0a] z-20 flex justify-between items-center">
            {step === 1 ? (
              <button
                onClick={reset}
                className="text-white/20 hover:text-white transition-colors p-2"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={back}
                className="text-white/40 hover:text-white flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest"
              >
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
            )}

            {step < 5 ? (
              <button
                onClick={next}
                disabled={!canNext()}
                className={`
                   flex items-center gap-2 px-6 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-widest transition-all
                   ${
                     canNext()
                       ? "bg-[#d4af37] text-black hover:bg-[#b5952f]"
                       : "bg-white/10 text-white/20 cursor-not-allowed"
                   }
                 `}
              >
                Next <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={handleSendToChat}
                className="flex items-center gap-2 px-6 py-2 bg-[#d4af37] text-black rounded-sm font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                Initialize <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#d4af37]/10 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
