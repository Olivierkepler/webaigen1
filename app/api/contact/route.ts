import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = body.fullName?.toString().trim() || "";
    const email = body.email?.toString().trim() || "";
    const company = body.company?.toString().trim() || "";
    const service = body.service?.toString().trim() || "";
    const message = body.message?.toString().trim() || "";
    const website = body.website?.toString().trim() || "";

    if (website) {
      return NextResponse.json(
        { message: "Spam detected." },
        { status: 400 }
      );
    }

    if (!fullName || !email || !service || !message) {
      return NextResponse.json(
        { message: "Full name, email, service, and message are required." },
        { status: 400 }
      );
    }

    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      return NextResponse.json(
        { message: "Server is not configured correctly." },
        { status: 500 }
      );
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        company,
        service,
        message,
      }),
    });

    // Apps Script web apps often respond with a redirect after running.
    if (response.status === 302 || response.status === 303) {
      return NextResponse.json({ message: "Message sent successfully." });
    }

    const resultText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to submit form to Google Sheets.",
          details: resultText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Message sent successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}