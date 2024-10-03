import { executeQuery } from "@/lib/db";
import { FieldPacket } from "mysql2";
import { ResultDto } from "./result.dto";

export async function getResults(): Promise<ResultDto[]> {
  try {
    const [results] = (await executeQuery(
      "SELECT  * FROM results",
      []
    )) as [ResultDto[], FieldPacket[]];
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
