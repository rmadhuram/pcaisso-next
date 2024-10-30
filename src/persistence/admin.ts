import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { ResultDto } from "./result.dto";
import { calculateCost } from "@/app/utils/calculate-cost";
import { models } from "@/data/models";

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

export async function getTotalTokens(): Promise<{
  cost: number;
  tokens: number;
}> {
  try {
    const response = (await executeQuery(
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

    // console.log(response[0]);
    let totalCost = 0;
    let totaltokensUsed = 0;

    response[0].forEach((model) => {
      totaltokensUsed += Number(model.totaltokens);
      const calculatedCost = calculateCost(
        model.model,
        model.totalinputtokens,
        model.totaloutputtokens
      );
      totalCost += calculatedCost.totalCost;
    });

    return {
      cost: totalCost,
      tokens: totaltokensUsed,
    };
  } catch (error) {
    console.error("Error fetching results:", error);
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

export async function getGroupBy(): Promise<{
  result: {
    provider: string;
    totalcost: number;
    totalTokens: number;
  }[];
}> {
  try {
    const [results] = (await executeQuery(
      "SELECT provider, SUM(total_cost) as totalcost, SUM(prompt_tokens + completion_tokens) as totaltokens FROM results GROUP BY provider",
      []
    )) as [
      { provider: string; totalcost: number; totalTokens: number }[],
      FieldPacket[]
    ];

    const filteredPrompts = results.filter((result) =>
      models.some((model) => model.provider === result.provider)
    );

    console.log(filteredPrompts);

    return {
      result: filteredPrompts,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
