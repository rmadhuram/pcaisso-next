import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { ResultDto } from "./result.dto";
import { constants } from "buffer";

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
        tokensUsed: number;
        totalinputtokens: number;
        totaloutputtokens: number;
      }[],
      FieldPacket[]
    ];

    console.log(response);
    const modelCosts: any = {
      "gpt-3.5-turbo": { inputCostPerM: 3, outputCostPerM: 5 },
      "gpt-4": { inputCostPerM: 30, outputCostPerM: 60 },
      "gpt-4-turbo": { inputCostPerM: 10, outputCostPerM: 30 },
      "gpt-4o": { inputCostPerM: 5, outputCostPerM: 15 },
      "gpt-4o-mini": { inputCostPerM: 0.3, outputCostPerM: 1.2 },
    };

    let totalCost = 0;
    let totaltokens = 0;
    let totalinput = 0;
    let totaloutput = 0;

    response[0].forEach((tokens) => {
      const totalInputTokens = Number(tokens.totalinputtokens);
      totalinput += totalInputTokens;
      const totalOutputTokens = Number(tokens.totaloutputtokens);
      totaloutput += totalOutputTokens;

      const modelCost = modelCosts[tokens.model] || {
        inputCostPerM: 0,
        outputCostPerM: 0,
      };

      console.log(modelCost);

      const costForModel =
        (totalInputTokens / 1000000) * modelCost.inputCostPerM +
        (totalOutputTokens / 1000000) * modelCost.outputCostPerM;

        console.log(costForModel);

      totalCost += costForModel;
    });

    totaltokens = totalinput + totaloutput;

    console.log(totalCost, totaltokens);
    return {
      cost: totalCost,
      tokens: totaltokens,
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
