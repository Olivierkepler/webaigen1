// app/(dashboard)/dashboard/schedule/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Globe,
  Video,
} from "lucide-react";

import ScheduleModalLauncher from "../../components/scheduling/scheduleModalLauncher";

export default async function DashboardSchedulePage() {
  const session = (await getServerSession()) as Session | null;
  if (!session?.user?.email) redirect("/login");

  const name = session.user.name || "Operator";
  const email = session.user.email;
  const role = (session.user as any)?.role ?? "user";

  return (
    // ✅ Y-axis scrolling enabled
    <div className="min-h-screen overflow-y-auto scroll-smooth bg-[#050505] text-white">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-900/10 blur-[160px]" />

      {/* ✅ extra bottom padding so mobile scroll never feels cut off */}
      <main className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-10 pb-24">
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <div className="mt-5 flex items-center gap-3">
              <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#d4af37]/25 bg-[#d4af37]/10">
                <div className="absolute inset-0 bg-[#d4af37]/10 blur-xl opacity-50" />
                <CalendarDays className="relative h-5 w-5 text-[#d4af37]" />
              </div>

              <div>
                <h1 className="text-2xl md:text-4xl font-light tracking-tight">
                  Scheduling Console
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span className="font-mono tracking-widest">
                      {name} • {email} • {String(role).toUpperCase()}
                    </span>
                  </span>

                  <span className="font-mono tracking-widest text-white/30">
                    SESSION_SECURED
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm text-white/55 leading-relaxed">
              Select your availability and schedule a meeting. This interface will
              connect to Google Calendar for real-time booking and confirmations.
            </p>
          </div>

          {/* Right-side info badges */}
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
              Calendar: Google
            </span>
            <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
              Meet: Auto Link
            </span>
            <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
              Timezone: Local
            </span>
          </div>
        </header>

        {/* Content */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-40" />
              <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#d4af37]/10 blur-[90px]" />

              <div className="relative p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      Booking Flow
                    </div>
                    <div className="mt-1 text-white/90 font-semibold">
                      Launch scheduler → pick a time → confirm
                    </div>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">
                      This module will become your WebAiGen “Calendly-style”
                      booking layer inside the dashboard.
                    </p>
                  </div>

                  {/* Launcher + Modal Shell */}
                  <ScheduleModalLauncher />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <InfoTile
                    icon={<Clock className="h-4 w-4 text-[#d4af37]" />}
                    title="Duration"
                    value="45 minutes"
                    hint="Adjustable in scheduler settings"
                  />
                  <InfoTile
                    icon={<Video className="h-4 w-4 text-[#d4af37]" />}
                    title="Location"
                    value="Google Meet"
                    hint="Auto-generated when booked"
                  />
                  <InfoTile
                    icon={<Globe className="h-4 w-4 text-[#d4af37]" />}
                    title="Timezone"
                    value="Local"
                    hint="Prevents scheduling conflicts"
                  />
                </div>

                <div className="mt-6 rounded-sm border border-white/10 bg-black/20 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    Next Upgrade
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-white/60">
                    <li>• Date picker + real available time slots (Free/Busy)</li>
                    <li>• Confirm → auto create Google Calendar event</li>
                    <li>• Generate Meet link + send confirmation email</li>
                    <li>• Optional: log booking into Google Sheets (CRM)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Helper footer */}
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-white/30">
              <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-1">
                Tip: Use this for consultations & onboarding
              </span>
              <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-1">
                Tip: Add buffers + business hours rules later
              </span>
            </div>
          </div>

          {/* Side panels */}
          <div className="lg:col-span-4 space-y-6">
            <Panel title="How it will work" subtitle="When API is connected">
              <ol className="space-y-3 text-sm text-white/65">
                {[
                  { step: "Step 01", text: "User selects a date + time slot." },
                  { step: "Step 02", text: "System checks calendar availability." },
                  { step: "Step 03", text: "Booking creates event + Meet link." },
                ].map((s) => (
                  <li
                    key={s.step}
                    className="rounded-sm border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {s.step}
                    </div>
                    <div className="mt-1 text-white/85 font-semibold">{s.text}</div>
                  </li>
                ))}
              </ol>

              <Link
                href="/dashboard/chat"
                className="mt-5 inline-flex w-full items-center justify-between gap-3 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:border-[#d4af37]/60 hover:bg-[#d4af37]/15 hover:text-white transition"
              >
                <span>Ask AI to build the API</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Panel>

            <Panel title="Security" subtitle="Session + data handling">
              <div className="text-sm text-white/60 space-y-2">
                <p>
                  Your session is protected via Google OAuth. When you enable real
                  booking, access tokens must remain server-side (API routes only).
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Recommended: store booking logs in Postgres or Google Sheets as a
                  lightweight CRM.
                </p>
              </div>
            </Panel>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------------------
   UI helpers
---------------------------- */
function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />
      <div className="p-5">
        <div>
          <div className="text-sm font-semibold text-white/90">{title}</div>
          {subtitle ? (
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              {subtitle}
            </div>
          ) : null}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  title,
  value,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-white/5">
          {icon}
        </div>
        <div className="h-2 w-2 rounded-full bg-[#d4af37]/40" />
      </div>
      <div className="mt-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
          {title}
        </div>
        <div className="mt-1 text-white/85 font-semibold">{value}</div>
        {hint ? <div className="mt-1 text-sm text-white/50">{hint}</div> : null}
      </div>
    </div>
  );
}
