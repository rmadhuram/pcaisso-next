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
export async function addResult(
  userId: number,
  type: string,
  prompt: string,
  model: string,
  drawResult: DrawResult
) {
  try {
    const connection = await getConnection();
    const uuid = uuidv4();

    const [result] = (await connection.execute(
      "INSERT INTO results (uuid, user_id, type, description, prompt, model, output, thumbnail_url, created_time, time_taken, prompt_tokens, completion_tokens) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)",
      [
        uuid,
        userId,
        type,
        prompt,
        prompt,
        model,
        drawResult.code,
        "",
        drawResult.timeTakenInSec,
        drawResult.usage.prompt_tokens,
        drawResult.usage.completion_tokens,
      ]
    )) as [ResultSetHeader, FieldPacket[]];
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Get results from the database given a UUID
 * @param uuid - The UUID of the result
 * @returns
 */
export async function getResults(uuid: string): Promise<ResultDto> {
  try {
    const connection = await getConnection();

    const [results] = (await connection.execute(
      "SELECT * FROM results WHERE uuid = ?",
      [uuid]
    )) as [ResultDto[], FieldPacket[]];
    return results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Get prompts from the database given a userId
 * @param userId - The userId of the user
 * @returns
 */
export async function getPrompts(userId: any): Promise<ResultDto[]> {
  try {
    const connection = await getConnection();

    const [prompts] = (await connection.execute(
      "SELECT created_time, prompt, liked FROM results WHERE user_id = ? ORDER BY created_time DESC",
      [userId]
    )) as [ResultDto[], FieldPacket[]];
    return prompts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Set liked ? 1 : 0 given the output and the value of liked
 * @param output, liked
 * @returns
 */
export async function updateLike(
  output: string,
  liked: number
): Promise<ResultSetHeader> {
  try {
    const connection = await getConnection();

    const [response] = (await connection.execute(
      "UPDATE results SET liked=? where output =?",
      [liked, output]
    )) as [ResultSetHeader, FieldPacket[]];
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
