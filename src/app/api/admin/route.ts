import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/persistence/admin";
import { getUserRole } from "@/persistence/admin";

export async function GET(req: NextRequest) {
  try {
    const data = await getResults();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const role = await getUserRole(email as string);
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      {
        error: "Failed to load the user",
      },
      { status: 500 }
    );
  }
}
