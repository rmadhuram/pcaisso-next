import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/lib/db";

export async function POST(req: NextRequest) {
  const { code, liked } = await req.json();

  const connection = await getConnection();

  try {
    await connection.execute("UPDATE results SET liked=? where output =?", [
      liked,
      code,
    ]);
    return NextResponse.json(
      { message: "Like updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { error: "Failed to update the like" },
      { status: 500 }
    );
  }
}
