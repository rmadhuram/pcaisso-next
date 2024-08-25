import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const connection = await connectDB();

  try {
    const [rows] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      res.status(200).json({ userId: rows[0].id });
    } else {
      res.status(404).json({ userId: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed" });
  }
}
