import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { addResult } from "@/persistence/result";
import { getCode } from "@/lib/llms/get-code";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const input = await req.json();
  const session = await getServerSession(options);

  // TODO: Check if user id is present in session

  if (!input || !input.prompt || !input.type || !input.model) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const output = await getCode(input.type, input.model, input.prompt);

    // Add the output to the database
    // TODO: Setting userId to 0 will violate the foreign key constraint in the database.
    const [id, uuid] = await addResult(
      session?.user?.id || 0,
      input.type,
      input.prompt,
      input.model,
      output
    );

    output.id = id;
    output.uuid = uuid;
    
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("Error fetching code:", error);
    return NextResponse.json(
      { error: "Unable to fetch code" },
      { status: 500 }
    );
  }
    
}
