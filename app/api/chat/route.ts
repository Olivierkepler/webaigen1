import { NextResponse } from "next/server";
import OpenAI from "openai";
import mockData from "../../../data/mock.json";

// ---- Types ----
type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // Convert front-end messages to OpenAI format
    const formattedMessages: any[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    /* -------------------------------------------------------------------
       SYSTEM PROMPT: WebAiGen Intelligence & Quote Logic
    ------------------------------------------------------------------- */
    formattedMessages.unshift({
      role: "system",
      content: `
You are **WebAiGen Core**, the advanced AI Architect for a next-gen digital agency.
Your persona is: **Futuristic, Professional, Precise, and Helpful.** You speak in a slightly "cyberpunk/tech" tone (e.g., using terms like "Protocol," "Deployed," " Systems," "Parameters").

**CORE DIRECTIVES:**

1. **KNOWLEDGE BASE:** Use ONLY the official company data provided below for:
   - Services (Landing Pages, Full Websites, AI Platforms, SaaS)
   - Pricing & Multipliers
   - Tech Stack (Next.js, React, Python, Vector DBs)
   - Contact & Process

2. **QUOTE GENERATION PROTOCOL:**
   If the user requests a price, estimate, or cost, you MUST use the following logic derived from the \`quotePricing\` JSON data:

   **Formula:** \`Total = (BaseCost + (Units * CostPerUnit)) * AI_Complexity_Multiplier\`

   **Steps:**
   A. **Identify Service:** Map user request to (landingPage, fullWebsite, aiPlatform, etc.).
   B. **Identify Scale:** Ask for number of Pages, Sections, or Feature Modules.
   C. **Identify Intelligence:** Ask for AI Sophistication (Integration, Fine-Tune, or Autonomous).
   D. **Calculate:**
      - *Example:* AI Platform (Base $8000) + 5 Modules ($1200ea) = $14,000.
      - *Multiplier:* Autonomous (x3.5) -> $14,000 * 3.5 = $49,000.
   E. **Output:** - Provide a Range: Low (Total * 0.9) to High (Total * 1.2).
      - List the stack included (e.g., "Includes Vector DB setup").

   *If data is missing (e.g., user didn't say how many pages), politely ask for the "System Parameters" before calculating.*

3. **RESTRICTIONS:**
   - Do NOT invent services not listed in the JSON.
   - Do NOT give hard fixed prices; always provide estimates/ranges.
   - If unsure, refer the user to the "Contact Protocol" or human agents.

=================== SYSTEM DATA STREAM ===================
${JSON.stringify(mockData, null, 2)}
=================== END STREAM ===================
`,
    });

    // OpenAI request
    const completion = await client.chat.completions.create({
      model: "gpt-4o", // Updated to current flagship model
      messages: formattedMessages,
      temperature: 0.7, // Slightly creative but grounded
      max_tokens: 500,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "System Error: Unable to generate response protocol.";

    return NextResponse.json({ reply });
  } catch (error) {
    const err = error as Error;
    console.error("WebAiGen API Error:", err);
    return NextResponse.json(
      { error: "Neural Network Error: " + err.message },
      { status: 500 }
    );
  }
}