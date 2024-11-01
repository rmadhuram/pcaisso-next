import { NextRequest, NextResponse } from "next/server";
import { getAllLikes } from "@/persistence/allLikes";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 15;
    const data = await getAllLikes(limit, offset);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent likes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent likes" },
      { status: 500 }
    );
  }
}
