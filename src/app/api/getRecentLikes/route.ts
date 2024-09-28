import { NextRequest, NextResponse } from "next/server";
import { getLastLikes } from "@/persistence/result";

export async function GET(req: NextRequest) {
  try {
    const data = await getLastLikes();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent likes:", error);
    return NextResponse.json(
      { error: "Failed to fetch the recent likes" },
      { status: 500 }
    );
  }
}
