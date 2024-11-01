import { NextRequest, NextResponse } from "next/server";
import { getTotalTokens } from "@/persistence/admin";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const model = searchParams.get("model");
//     const data = await getTotalTokens(model);
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching totalTokens:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch totalTokens" },
//       { status: 500 }
//     );
//   }
// }

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const data = await getTotalTokens();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching totalTokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch totalTokens" },
      { status: 500 }
    );
  }
}
