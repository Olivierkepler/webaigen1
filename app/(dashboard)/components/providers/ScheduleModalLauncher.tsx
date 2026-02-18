"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X, Check, Loader2, Video } from "lucide-react";

type Slot = { start: string; end: string };

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function todayYYYYMMDD() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function ScheduleModalLauncher() {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(todayYYYYMMDD());
  const [timezone, setTimezone] = useState("America/New_York");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<Slot | null>(null);

  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState<{ htmlLink?: string; meetLink?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get local timezone (helps real users)
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) setTimezone(tz);
  }, []);

  const fetchSlots = async () => {
    setLoadingSlots(true);
    setError(null);
    setSelected(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/schedule/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          timezone,
          durationMinutes: 30,
          workdayStart: "09:00",
          workdayEnd: "18:00",
          slotIntervalMinutes: 30,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load availability");

      setSlots(data.slots || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load availability");
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const book = async () => {
    if (!selected) return;

    setBooking(true);
    setError(null);

    try {
      const res = await fetch("/api/schedule/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selected.start,
          end: selected.end,
          timezone,
          summary: "WebAiGen Meeting",
          description: "Scheduled via WebAiGen dashboard.",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Booking failed");

      setSuccess({ htmlLink: data.htmlLink, meetLink: data.meetLink });
    } catch (e: any) {
      setError(e?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  // Auto load slots when modal opens
  useEffect(() => {
    if (open) fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:border-[#d4af37]/60 hover:bg-[#d4af37]/15 hover:text-white transition"
      >
        <CalendarDays className="h-4 w-4" />
        Open Scheduler
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              aria-label="Close scheduling modal"
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-md border border-white/10 bg-[#050505] shadow-[0_0_60px_rgba(0,0,0,0.9)]"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Scheduler
                  </div>
                  <div className="text-white/90 font-semibold">
                    Select a time slot
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 md:p-6 space-y-5">
                {/* Controls */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">
                      Timezone
                    </label>
                    <input
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#d4af37]/50"
                      placeholder="America/New_York"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={fetchSlots}
                    disabled={loadingSlots}
                    className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition disabled:opacity-50"
                  >
                    {loadingSlots ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Refresh Slots
                  </button>

                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {slots.length ? `${slots.length} slots found` : "No slots loaded"}
                  </div>
                </div>

                {/* Slots grid */}
                <div className="rounded-sm border border-white/10 bg-black/20 p-4">
                  {loadingSlots ? (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Loader2 className="h-4 w-4 animate-spin text-[#d4af37]" />
                      Loading availability…
                    </div>
                  ) : error ? (
                    <div className="text-sm text-red-400">{error}</div>
                  ) : slots.length === 0 ? (
                    <div className="text-sm text-white/60">
                      No availability for this date. Try another day.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slots.map((s) => {
                        const active =
                          selected?.start === s.start && selected?.end === s.end;

                        return (
                          <button
                            key={s.start}
                            onClick={() => setSelected(s)}
                            className={`rounded-sm border px-3 py-2 text-xs font-mono uppercase tracking-widest transition
                              ${
                                active
                                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                              }`}
                            title={`${fmtDate(s.start)} • ${fmtTime(s.start)} - ${fmtTime(s.end)}`}
                          >
                            {fmtTime(s.start)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected summary */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-white/70">
                    {selected ? (
                      <>
                        Selected:{" "}
                        <span className="text-white">
                          {fmtDate(selected.start)} • {fmtTime(selected.start)} –{" "}
                          {fmtTime(selected.end)}
                        </span>
                      </>
                    ) : (
                      "Select a slot to continue."
                    )}
                  </div>

                  <button
                    onClick={book}
                    disabled={!selected || booking || !!success}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#d4af37] px-5 py-2 text-xs font-mono uppercase tracking-widest text-black hover:bg-[#b5952f] transition disabled:opacity-50"
                  >
                    {booking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    Confirm
                  </button>
                </div>

                {/* Success */}
                {success ? (
                  <div className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="text-emerald-300 font-mono text-xs uppercase tracking-widest">
                      Booking Confirmed
                    </div>

                    <div className="mt-2 text-sm text-white/80 space-y-2">
                      {success.meetLink ? (
                        <a
                          href={success.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-white transition"
                        >
                          <Video className="h-4 w-4" /> Join Google Meet
                        </a>
                      ) : null}

                      {success.htmlLink ? (
                        <a
                          href={success.htmlLink}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-white/70 hover:text-white transition"
                        >
                          View in Google Calendar
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
