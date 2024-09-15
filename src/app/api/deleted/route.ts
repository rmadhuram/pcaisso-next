import { NextRequest, NextResponse } from "next/server";
import { updateDelete } from "@/persistence/result";

export async function POST(req: NextRequest) {
  const { id, deleted } = await req.json();

  try {
    const data = await updateDelete(id as number, deleted as string);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating status of delete:", error);
    return NextResponse.json(
      { error: "Failed to update the status of delete" },
      { status: 500 }
    );
  }
}
