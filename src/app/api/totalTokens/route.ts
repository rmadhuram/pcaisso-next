import { NextRequest, NextResponse } from "next/server";
import { getTotalTokens } from "@/persistence/admin";

export async function GET(req: NextRequest) {
  try {
    const data = await getTotalTokens();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching totalTokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch totalTokens" },
      { status: 500 }
    );
  }
}
