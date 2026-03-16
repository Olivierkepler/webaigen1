import { OpenAI } from "openai";
import { sql } from "@/utils/db"; // Ensure your Neon connection is exported here
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, agentId } = await req.json();

    // 1. Get the Agent's personality from Neon
    const agents = await sql`SELECT * FROM chatbots WHERE id = ${agentId} LIMIT 1`;
    const agent = agents[0];
    if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

    // 2. Fetch the last 5 messages for short-term memory
    const history = await sql`
      SELECT role, content FROM messages 
      WHERE chat_id = ${agentId} 
      ORDER BY created_at DESC LIMIT 5
    `;

    // 3. Talk to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `You are ${agent.name}. Instructions: ${agent.welcome_message}` },
        ...history.reverse().map((m: any) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    });

    const aiContent = response.choices[0].message.content || "I'm having trouble thinking...";

    // 4. Save the User message AND the AI response to Neon
    await sql`
      INSERT INTO messages (chat_id, role, content) 
      VALUES (${agentId}, 'user', ${message}), (${agentId}, 'assistant', ${aiContent})
    `;

    return NextResponse.json({ content: aiContent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Neural link failed" }, { status: 500 });
  }
}