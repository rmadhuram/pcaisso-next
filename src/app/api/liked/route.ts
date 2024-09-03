import { NextRequest, NextResponse } from "next/server";
import { updateLike } from "@/persistence/result";

export async function POST(req: NextRequest) {
  const { output, liked } = await req.json();

  try {
    const data = await updateLike(output as string, liked as number);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { error: "Failed to update the like" },
      { status: 500 }
    );
  }
}
