// import { NextApiRequest, NextApiResponse } from "next";
// import { getResults } from "@/persistence/result";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { uuid } = req.body;
//     if (!uuid) {
//       return res.status(400).json({ error: "UUID is required" });
//     }

//     const data = await getResults(uuid as string);
//     if (data) {
//       return res.status(200).json(data);
//     } else {
//       return res.status(404).json({ error: "Data not found" });
//     }
//   } catch (error) {
//     console.error("API error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/persistence/result";

export async function POST(req: NextRequest) {
  const { uuid } = await req.json();
  // console.log(uuid)

  try {
    const data = await getResults(uuid as string);
    // console.log(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 }
    );
  }
}
