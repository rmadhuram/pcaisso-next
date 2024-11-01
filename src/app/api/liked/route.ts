import { NextRequest, NextResponse } from "next/server";
import { updateLike } from "@/persistence/result";

export const maxDuration = 60;

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
