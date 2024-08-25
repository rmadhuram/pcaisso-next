import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      userId,
      type,
      description,
      prompt,
      model,
      output,
      thumbnailUrl,
      timeTaken,
    } = req.body;
    const connection = await connectDB();

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
      res.status(200).json({ message: "Result saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save result" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
