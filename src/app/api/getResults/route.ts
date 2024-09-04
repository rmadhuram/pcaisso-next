import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/persistence/result";

export async function GET(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  console.log(params);
  const uuid = params.uuid;
  console.log(typeof uuid, uuid);

  try {
    const data = await getResults(uuid);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 }
    );
  }
}
