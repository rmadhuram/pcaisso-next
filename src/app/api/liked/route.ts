import { NextRequest, NextResponse } from "next/server";
import { updateLike } from "@/persistence/result";
import { fetchRecentLikes } from "@/persistence/result";

export async function POST(req: NextRequest) {
  const { id, liked } = await req.json();

  try {
    const data = await updateLike(id as number, liked as boolean);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { error: "Failed to update the like" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await fetchRecentLikes();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent likes:", error);
    return NextResponse.json(
      { error: "Failed to fetch the recent likes" },
      { status: 500 }
    );
  }
}
