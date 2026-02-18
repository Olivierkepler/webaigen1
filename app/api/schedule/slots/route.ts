import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

type Slot = { start: string; end: string };

function toISO(d: Date) {
  return d.toISOString();
}

function addMinutes(d: Date, mins: number) {
  return new Date(d.getTime() + mins * 60_000);
}

function roundUpToInterval(date: Date, intervalMin: number) {
  const ms = intervalMin * 60_000;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}

export async function POST(req: Request) {
  const session = (await getServerSession()) as any;
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accessToken = session.accessToken as string | undefined;
  if (!accessToken) return NextResponse.json({ error: "Missing access token" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const {
    date, // "2026-02-17"
    timezone = "America/New_York",
    durationMinutes = 30,
    workdayStart = "09:00",
    workdayEnd = "18:00",
    slotIntervalMinutes = 30,
  } = body;

  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  // Build day window in local time by using RFC3339 with timezone offset handled by Calendar API
  const timeMin = `${date}T00:00:00`;
  const timeMax = `${date}T23:59:59`;

  // 1) Query FreeBusy
  const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: timezone,
      items: [{ id: "primary" }],
    }),
  });

  const fbData = await fbRes.json();
  if (!fbRes.ok) {
    return NextResponse.json(
      { error: fbData?.error?.message ?? "FreeBusy failed", details: fbData },
      { status: 500 }
    );
  }

  const busy: Slot[] = fbData?.calendars?.primary?.busy ?? [];

  // 2) Build workday bounds
  const [sh, sm] = workdayStart.split(":").map(Number);
  const [eh, em] = workdayEnd.split(":").map(Number);

  // Use Date objects in UTC but treat ISO strings as timezone-aware in Google calls
  // We'll generate candidate slots using the given timezone day; Calendar API compares properly.
  const start = new Date(`${date}T${workdayStart}:00`);
  const end = new Date(`${date}T${workdayEnd}:00`);

  let cursor = roundUpToInterval(start, slotIntervalMinutes);
  const slots: Slot[] = [];

  while (addMinutes(cursor, durationMinutes) <= end) {
    const candidateStart = cursor;
    const candidateEnd = addMinutes(cursor, durationMinutes);

    const overlapsBusy = busy.some((b) => {
      const bStart = new Date(b.start);
      const bEnd = new Date(b.end);
      return candidateStart < bEnd && candidateEnd > bStart;
    });

    if (!overlapsBusy) {
      slots.push({ start: toISO(candidateStart), end: toISO(candidateEnd) });
    }

    cursor = addMinutes(cursor, slotIntervalMinutes);
  }

  return NextResponse.json({ timezone, durationMinutes, slots });
}
