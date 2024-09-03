import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const connection = await getConnection();

  try {
    const [datas] = await connection.execute(
      "SELECT created_time, prompt, liked FROM results WHERE user_id = ?",
      [userId]
    );
    return NextResponse.json(datas, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}
