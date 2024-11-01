import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/persistence/result";

export const maxDuration = 60;

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: number } }
) {
  const userId = params.userId;

  const { searchParams }= new URL(req.url);
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const data = await getPrompts(userId, limit, offset);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}
