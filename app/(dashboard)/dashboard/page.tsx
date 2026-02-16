// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import {
  Calendar,
  MessagesSquare,
  Settings,
  FileText,
  ArrowUpRight,
  Sparkles,
  Activity,
  ShieldCheck,
} from "lucide-react";

/**
 * Assumes you already have:
 * - app/api/auth/[...nextauth]/route.ts
 * - NEXTAUTH_SECRET, GOOGLE_CLIENT_ID/SECRET in .env
 */
export default async function DashboardPage() {
  const session = (await getServerSession()) as Session | null;

  if (!session?.user?.email) redirect("/login");

  const name = session.user.name || "Operator";
  const email = session.user.email;

  // if you attached role in your session callback:
  const role = (session.user as any)?.role ?? "user";

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#050505] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:

            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-900/10 blur-[160px]" />

      <main className="relative mx-auto w-full   px-4 py-10 md:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                Dashboard_Online
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-light tracking-tight">
              Welcome,{" "}
              <span className="text-white/80">{name}</span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                <span className="font-mono tracking-widest">
                  ACCESS: {String(role).toUpperCase()}
                </span>
              </span>

              <span className="font-mono tracking-widest">{email}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <Link
              href="/dashboard/automations"
              className="inline-flex items-center gap-2 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/15 transition"
            >
              <Activity className="h-4 w-4" />
              Automations
            </Link>
          </div>
        </div>

        {/* Content */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick actions */}
            <Card title="Quick Actions" subtitle="Launch tools instantly">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ActionTile
                  icon={<MessagesSquare className="h-4 w-4 text-[#d4af37]" />}
                  title="AI Chat"
                  desc="Ask WebAiGen to generate code, strategy, or copy."
                  href="/dashboard/chat"
                />
                <ActionTile
                  icon={<Calendar className="h-4 w-4 text-[#d4af37]" />}
                  title="Schedule Meeting"
                  desc="Pick availability and book a call."
                  href="/dashboard/schedule"
                />
                <ActionTile
                  icon={<FileText className="h-4 w-4 text-[#d4af37]" />}
                  title="Proposals"
                  desc="Generate estimates and export PDFs."
                  href="/dashboard/proposals"
                />
                <ActionTile
                  icon={<Activity className="h-4 w-4 text-[#d4af37]" />}
                  title="Automation Runs"
                  desc="View workflow logs and recent executions."
                  href="/dashboard/automations"
                />
              </div>
            </Card>

            {/* Recent activity (static placeholders — wire later) */}
            <Card title="Recent Activity" subtitle="Your latest system events">
              <ul className="space-y-3">
                <EventRow
                  label="Lead pipeline"
                  value="No new leads yet"
                  meta="Connect a form to begin capturing."
                />
                <EventRow
                  label="Scheduler"
                  value="No meetings scheduled"
                  meta="Enable Google Calendar integration."
                />
                <EventRow
                  label="AI usage"
                  value="0 messages today"
                  meta="Start a chat to generate assets."
                />
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill href="/dashboard/settings" text="Connect integrations" />
                <Pill href="/dashboard/chat" text="Open AI Chat" />
                <Pill href="/dashboard/schedule" text="Book a call" />
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="lg:col-span-4 space-y-6">
            <Card title="Account" subtitle="Your platform access">
              <div className="space-y-3 text-sm text-white/70">
                <InfoRow k="Plan" v="Starter" />
                <InfoRow k="Status" v="Active" />
                <InfoRow k="Workspace" v="WebAiGen" />
                <div className="h-px w-full bg-white/10 my-4" />
                <InfoRow k="Support" v="24/7 AI Assistant" />
                <InfoRow k="Response" v="Instant" />
              </div>

              <Link
                href="/dashboard/settings"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#d4af37] px-4 py-2 text-xs font-mono uppercase tracking-widest text-black hover:bg-[#b5952f] transition"
              >
                Manage Account <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Card>

            <Card title="Next Step" subtitle="Recommended activation">
              <div className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Suggested
                </div>
                <div className="mt-2 text-white/85 font-semibold">
                  Connect Google Calendar
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Enable scheduling + automated reminders to convert leads into booked meetings.
                </p>

                <Link
                  href="/dashboard/settings"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:text-white transition"
                >
                  Configure <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>

            {/* Optional: Admin jump */}
            {String(role) === "admin" && (
              <Card title="Admin" subtitle="Control center">
                <Link
                  href="/admin"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  Open Admin Dashboard <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------------------
   Small UI helpers (no deps)
---------------------------- */
function Card({
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
      {/* subtle top highlight */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-40" />
      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white/90">{title}</div>
            {subtitle ? (
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function ActionTile({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-sm border border-white/10 bg-black/30 p-4 transition hover:border-[#d4af37]/40 hover:bg-black/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-white/5">
            {icon}
          </span>
          <div className="text-sm font-semibold text-white/85 group-hover:text-white transition">
            {title}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-[#d4af37] transition" />
      </div>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{desc}</p>
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#d4af37]/0 group-hover:border-[#d4af37]/60 transition" />
    </Link>
  );
}

function EventRow({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <li className="rounded-sm border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            {label}
          </div>
          <div className="mt-1 text-white/85">{value}</div>
          <div className="mt-1 text-sm text-white/50">{meta}</div>
        </div>
        <span className="h-2 w-2 rounded-full bg-[#d4af37]/40" />
      </div>
    </li>
  );
}

function Pill({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
    >
      {text}
    </Link>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
        {k}
      </span>
      <span className="text-white/80">{v}</span>
    </div>
  );
}
