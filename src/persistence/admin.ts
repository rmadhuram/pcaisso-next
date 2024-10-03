import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { ResultDto } from "./result.dto";

export async function getResults(): Promise<ResultDto[]> {
  try {
    const [results] = (await executeQuery("SELECT  * FROM results", [])) as [
      ResultDto[],
      FieldPacket[]
    ];
    return results;
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
