// app/dashboard/settings/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import {
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  Calendar,
  Database,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Mail,
} from "lucide-react";

export default async function SettingsPage() {
  const session = (await getServerSession()) as Session | null;
  if (!session?.user?.email) redirect("/login");

  const name = session.user.name || "Operator";
  const email = session.user.email;
  const role = (session.user as any)?.role ?? "user";

  // NOTE:
  // These are placeholders until you wire real integration status.
  // Later you’ll fetch from your DB (or Google Sheet) based on user email.
  const integrations = {
    googleCalendar: { connected: false, label: "Google Calendar", desc: "Scheduling + reminders + availability checks" },
    googleSheets: { connected: false, label: "Google Sheets", desc: "Lead CRM + lightweight database + exports" },
    emailProvider: { connected: true, label: "Email Provider", desc: "Automated confirmations + follow-ups (Resend/SendGrid)" },
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#050505] text-white">
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

      <main className="relative mx-auto w-full  px-4 py-10 md:px-10">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-white/50 hover:text-[#d4af37] transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <div className="mt-4">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Settings_Console
                </span>
              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-light tracking-tight">
                Account & Integrations
              </h1>

              <p className="mt-2 text-sm text-white/55 leading-relaxed">
                Manage your access, connect tools, and configure how WebAiGen automates your workflow.
              </p>
            </div>
          </div>

          {/* Identity pill */}
          <div className="hidden sm:flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1">
              <Mail className="h-4 w-4 text-[#d4af37]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                {email}
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">
              Access: {String(role).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Sections */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Integrations */}
          <div className="lg:col-span-8 space-y-6">
            <Card
              title="Integrations"
              subtitle="Connect your tools to activate scheduling, CRM capture, and automation runs."
            >
              <div className="space-y-3">
                <IntegrationRow
                  icon={<Calendar className="h-4 w-4 text-[#d4af37]" />}
                  title={integrations.googleCalendar.label}
                  desc={integrations.googleCalendar.desc}
                  connected={integrations.googleCalendar.connected}
                  primaryCta={{ label: "Connect", href: "/api/integrations/google/calendar/connect" }}
                  secondaryCta={{ label: "Learn", href: "/dashboard/settings/calendar" }}
                />

                <IntegrationRow
                  icon={<Database className="h-4 w-4 text-[#d4af37]" />}
                  title={integrations.googleSheets.label}
                  desc={integrations.googleSheets.desc}
                  connected={integrations.googleSheets.connected}
                  primaryCta={{ label: "Connect", href: "/api/integrations/google/sheets/connect" }}
                  secondaryCta={{ label: "Setup", href: "/dashboard/settings/sheets" }}
                />

                <IntegrationRow
                  icon={<KeyRound className="h-4 w-4 text-[#d4af37]" />}
                  title={integrations.emailProvider.label}
                  desc={integrations.emailProvider.desc}
                  connected={integrations.emailProvider.connected}
                  primaryCta={{ label: "Configure", href: "/dashboard/settings/email" }}
                  secondaryCta={{ label: "Docs", href: "/dashboard/settings/docs" }}
                />
              </div>

              <Notice>
                <strong className="text-white/85">Note:</strong> The “Connect” buttons are wired as
                endpoints you’ll implement next (OAuth flows). Until those routes exist, they will 404 — that’s expected.
              </Notice>
            </Card>

            <Card title="Automation Preferences" subtitle="Control how WebAiGen behaves for your account.">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ToggleTile
                  title="Auto-Reply Emails"
                  desc="Send instant lead confirmations."
                  state="ON"
                />
                <ToggleTile
                  title="Meeting Reminders"
                  desc="Email reminders before meetings."
                  state="OFF"
                />
                <ToggleTile
                  title="Lead Routing"
                  desc="Tag and route leads by intent."
                  state="OFF"
                />
                <ToggleTile
                  title="Weekly Reports"
                  desc="AI summary of leads & bookings."
                  state="OFF"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill href="/dashboard/automations" text="View automation runs" />
                <Pill href="/dashboard/proposals" text="Generate a proposal" />
              </div>
            </Card>
          </div>

          {/* Right: Account */}
          <div className="lg:col-span-4 space-y-6">
            <Card title="Account" subtitle="Your identity + access state">
              <div className="space-y-3 text-sm text-white/70">
                <InfoRow k="Name" v={name} />
                <InfoRow k="Email" v={email} />
                <InfoRow k="Role" v={String(role).toUpperCase()} />
                <div className="h-px w-full bg-white/10 my-4" />
                <InfoRow k="Session" v="Active" />
                <InfoRow k="Security" v="OAuth (Google)" />
              </div>

              <div className="mt-5 space-y-2">
                <Link
                  href="/dashboard/security"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
                >
                  Manage Security <ExternalLink className="h-4 w-4" />
                </Link>

                <Link
                  href="/api/auth/signout"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#d4af37] px-4 py-2 text-xs font-mono uppercase tracking-widest text-black hover:bg-[#b5952f] transition"
                >
                  Sign Out
                </Link>
              </div>
            </Card>

            <Card title="Recommended" subtitle="Highest impact setup">
              <div className="rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Priority
                </div>
                <div className="mt-2 text-white/90 font-semibold">
                  Connect Calendar + Sheets
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Calendar enables scheduling and reminders. Sheets becomes your lightweight CRM and data store.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/api/integrations/google/calendar/connect"
                    className="inline-flex flex-1 items-center justify-center rounded-sm bg-black/40 border border-white/10 px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 transition"
                  >
                    Calendar
                  </Link>
                  <Link
                    href="/api/integrations/google/sheets/connect"
                    className="inline-flex flex-1 items-center justify-center rounded-sm bg-black/40 border border-white/10 px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 transition"
                  >
                    Sheets
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------------------
   UI helpers (no deps)
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

function IntegrationRow({
  icon,
  title,
  desc,
  connected,
  primaryCta,
  secondaryCta,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  connected: boolean;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-white/5">
          {icon}
        </span>

        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-white/85">{title}</div>
            {connected ? (
              <span className="inline-flex items-center gap-1 rounded-sm border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                  Connected
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-sm border border-amber-500/20 bg-amber-500/10 px-2 py-0.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-200">
                  Not connected
                </span>
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-white/55 leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="flex gap-2 sm:justify-end">
        <Link
          href={primaryCta.href}
          className="inline-flex items-center justify-center rounded-sm bg-[#d4af37] px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-black hover:bg-[#b5952f] transition"
        >
          {primaryCta.label}
        </Link>

        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
          >
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function ToggleTile({
  title,
  desc,
  state,
}: {
  title: string;
  desc: string;
  state: "ON" | "OFF";
}) {
  const on = state === "ON";
  return (
    <div className="rounded-sm border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white/85">{title}</div>
          <p className="mt-1 text-sm text-white/55 leading-relaxed">{desc}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
            on
              ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
              : "border-white/10 bg-white/5 text-white/40"
          }`}
        >
          {state}
        </span>
      </div>
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-sm border border-white/10 bg-white/5 p-4 text-sm text-white/55 leading-relaxed">
      {children}
    </div>
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
      <span className="text-white/80 text-right">{v}</span>
    </div>
  );
}
