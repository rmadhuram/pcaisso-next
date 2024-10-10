import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { ResultDto } from "./result.dto";
import { LargeNumberLike } from "crypto";

export async function getResults(
  limit: number,
  offset: number
): Promise<{
  results: ResultDto[];
  totalRecords: number;
  totalUsers: number;
}> {
  try {
    const [results] = (await executeQuery(
      "SELECT results.id, results.uuid, results.created_time, results.description, users.user_name, results.model, (prompt_tokens + completion_tokens) as tokens FROM results left join users on users.id = results.user_id order by results.created_time DESC LIMIT ? OFFSET ?",
      [limit, offset]
    )) as [ResultDto[], FieldPacket[]];

    const [totalResult] = (await executeQuery(
      "SELECT COUNT(*) AS count FROM results",
      []
    )) as [[{ count: number }], FieldPacket[]];
    const totalRecords = totalResult[0]?.count ?? 0;

    const [usersCount] = (await executeQuery(
      "SELECT COUNT(*) AS count FROM users",
      []
    )) as [[{ count: number }], FieldPacket[]];
    const totalUsers = usersCount[0]?.count ?? 0;
    return {
      results,
      totalRecords,
      totalUsers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTotalTokens(): Promise<
  {
    model: string;
    totalTokensUsed: number;
    totalInputTokens: number;
    totalOutputTokens: number;
  }[]
> {
  try {
    // Execute query to get tokens per model
    const totalTokens = (await executeQuery(
      "SELECT model, SUM(prompt_tokens + completion_tokens) as totaltokens, SUM(prompt_tokens) as totalinputtokens, SUM(completion_tokens) as totaloutputtokens FROM results GROUP BY model",
      []
    )) as [
      {
        model: string;
        totaltokens: number;
        totalinputtokens: number;
        totaloutputtokens: number;
      }[],
      FieldPacket[]
    ];

    const tokens = totalTokens.map((row: any) => ({
      model: row.model,
      totalTokensUsed: row.totaltokens ?? 0,
      totalInputTokens: row.totalinputtokens ?? 0,
      totalOutputTokens: row.totaloutputtokens ?? 0,
    }));
    console.log(tokens);
    return tokens;
  } catch (error) {
    console.log(error);
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
