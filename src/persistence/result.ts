/**
 * Prompt Result persistence functions
 */

import getConnection from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { DrawResult } from "@/models/draw-result";
import { ResultDto } from "./result.dto";

/**
 * Add a result to the database
 * @param userId 
 * @param type 
 * @param prompt 
 * @param model 
 * @param drawResult 
 * @returns 
 */
export async function addResult(userId: number, type:string, prompt: string, model: string, 
  drawResult: DrawResult) {
  try {
    const connection = await getConnection();
    const uuid = uuidv4();

    const [result] = await connection.execute(
      "INSERT INTO results (uuid, user_id, type, description, prompt, model, output, thumbnail_url, created_time, time_taken, prompt_tokens, completion_tokens) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)",
      [
        uuid,
        userId,
        type,
        prompt,
        prompt,
        model,
        drawResult.code,
        '',
        drawResult.timeTakenInSec,
        drawResult.usage.prompt_tokens,
        drawResult.usage.completion_tokens,
      ]
    ) as [ResultSetHeader, FieldPacket[]];
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Get results from the database given a uuid
 * @param userId 
 * @returns 
 */
export async function getResults(uuid: string): Promise<ResultDto> {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(
      "SELECT * FROM results WHERE uuid = ?",
      [uuid]
    ) as [ResultDto[], FieldPacket[]];
    return results[0];
  } catch (error) { 
    console.error(error);
    throw error;
  }
}