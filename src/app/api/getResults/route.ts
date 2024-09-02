import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/persistence/result";

export async function POST(req: NextRequest) {
  const { uuid } = await req.json();

  try {
    const data = await getResults(uuid as string);
    return NextResponse.json(data , { status: 200 });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 }
    );
  }
}
