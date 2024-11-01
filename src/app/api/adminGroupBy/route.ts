import { NextRequest, NextResponse } from "next/server";
import { getGroupBy } from "@/persistence/admin";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const data = await getGroupBy();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}
