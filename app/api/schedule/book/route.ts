import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = (await getServerSession()) as any;
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accessToken = session.accessToken as string | undefined;
  if (!accessToken) return NextResponse.json({ error: "Missing access token" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const {
    start, // ISO
    end,   // ISO
    timezone = "America/New_York",
    summary = "WebAiGen Meeting",
    description = "Scheduled via WebAiGen dashboard.",
    attendeeEmail, // optional
  } = body;

  if (!start || !end) return NextResponse.json({ error: "Missing start/end" }, { status: 400 });

  const eventPayload: any = {
    summary,
    description,
    start: { dateTime: start, timeZone: timezone },
    end: { dateTime: end, timeZone: timezone },
  };

  if (attendeeEmail) {
    eventPayload.attendees = [{ email: attendeeEmail }];
  }

  // ✅ If you want Google Meet links, add conferenceData + conferenceDataVersion=1
  eventPayload.conferenceData = {
    createRequest: {
      requestId: Math.random().toString(36).slice(2),
      conferenceSolutionKey: { type: "hangoutsMeet" },
    },
  };

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Create event failed", details: data },
      { status: 500 }
    );
  }

  const meetLink =
    data?.conferenceData?.entryPoints?.find((p: any) => p.entryPointType === "video")?.uri ?? null;

  return NextResponse.json({
    ok: true,
    eventId: data.id,
    htmlLink: data.htmlLink,
    meetLink,
  });
}
