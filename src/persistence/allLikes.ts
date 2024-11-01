import { executeQuery } from "@/lib/db";
import { FieldPacket } from "mysql2";
import { ResultDto } from "./result.dto";

export async function getAllLikes(
  limit: number,
  offset: number
): Promise<{
  results: ResultDto[];
  totalRecords: number;
}> {
  try {
    const [results] = (await executeQuery(
      "SELECT results.id, results.uuid, results.created_time, results.description, users.user_name, results.model, (prompt_tokens + completion_tokens) as tokens FROM results left join users on users.id = results.user_id where results.liked = 1 ORDER BY results.liked_time DESC LIMIT ? OFFSET ?",
      [limit, offset]
    )) as [ResultDto[], FieldPacket[]];

    const [totalResult] = (await executeQuery(
      "SELECT COUNT(*) AS count FROM results where liked = 1",
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
