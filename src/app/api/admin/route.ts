import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/persistence/admin";

export async function GET(
  req: NextRequest,
) {
  try {
    const data = await getResults();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}