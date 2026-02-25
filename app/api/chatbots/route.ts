import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sql } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    // Direct SQL Insert - much faster and no "npx prisma generate" required
    const result = await sql`
      INSERT INTO chatbots (name, user_email)
      VALUES (${name}, ${session.user.email})
      RETURNING *;
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("SQL Error:", error);
    return NextResponse.json({ error: "Database failure" }, { status: 500 });
  }
}