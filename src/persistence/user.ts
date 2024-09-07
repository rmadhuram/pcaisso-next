/**
 * User persistence functions
 */

import getConnection from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";

/**
 * Add or update a user in the database
 * @param email 
 * @param name 
 * @returns the user id
 */
export async function addOrUpdateUser(email: string, name: string, image: string): Promise<number> {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?", [email]
    ) as [any[], FieldPacket[]];

    let userId: number;

    if (rows.length === 0) {
      // Add user to the database
      const [addUserResult] = await connection.execute(
        "INSERT INTO users (email, name, image_url, created_time, last_session_time) VALUES (?, ?, ?, Now(), NOW())",
        [email, name, image]
      ) as [ResultSetHeader, FieldPacket[]];
      userId = addUserResult.insertId;

    } else {
      // Update user's last session time
      userId = rows[0].id;
      await connection.execute(
        "UPDATE users SET last_session_time = Now() WHERE email = ?",
        [email]
      );
    }

    return userId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}