import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { ResultDto } from "./result.dto";

export async function getResults(
  limit: number,
  offset: number
): Promise<{
  results: ResultDto[];
  totalRecords: number;
}> {
  try {
    const [results] = (await executeQuery(
      "SELECT results.id, results.uuid, results.created_time, results.description, users.user_name, results.model, (prompt_tokens + completion_tokens) as tokens FROM results join users on users.id = results.user_id order by results.created_time DESC LIMIT ? OFFSET ?",
      [limit, offset]
    )) as [ResultDto[], FieldPacket[]];

    const [totalResult] = (await executeQuery(
      "SELECT COUNT(*) AS count FROM results",
      []
    )) as [[{ count: number }], FieldPacket[]];
    const totalRecords = totalResult[0]?.count ?? 0;
    console.log(totalRecords);
    return {
      results,
      totalRecords,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserRole(email: string): Promise<ResultSetHeader> {
  try {
    const [role] = (await executeQuery(
      "SELECT role FROM users WHERE email = ?",
      [email]
    )) as [ResultSetHeader, FieldPacket[]];
    return role;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
