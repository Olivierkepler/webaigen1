import { NextResponse } from "next/server";
import { getSearchItems } from "@/app/lib/searchIndex";

/**
 * GET /api/search — returns merged search items as JSON.
 * Use for server-side or external search later.
 */
export async function GET() {
  const items = getSearchItems();
  return NextResponse.json(items);
}
