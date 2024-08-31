import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const {
    userId,
    type,
    description,
    prompt,
    model,
    output,
    thumbnailUrl,
    timeTaken,
  } = await req.json();

  const uuid = uuidv4();

  const connection = await getConnection();

  try {
    await connection.execute(
      "INSERT INTO results (uuid, user_id, type, description, prompt, model, output, thumbnail_url, created_time, time_taken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
      [
        uuid,
        userId,
        type,
        description,
        prompt,
        model,
        output,
        thumbnailUrl,
        timeTaken,
      ]
    );
    return NextResponse.json(
      { message: "Result saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method not implemented" },
    { status: 501 }
  );
}
