import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/persistence/result";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: number } }
) {
  const userId = params.userId;

  try {
    const prompts = await getPrompts(userId);
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}
