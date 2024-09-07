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
): Promise<[number, string]> {
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
    return [result.insertId, uuid];
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
      "SELECT id, uuid, user_id, type, description, prompt, model, output, IFNULL(created_time,'N/A') AS created_time, IFNULL(time_taken,'N/A') as time_taken, IFNULL(prompt_tokens,'N/A') as prompt_tokens, IFNULL(completion_tokens, 'N/A') as completion_tokens, IFNULL(liked,'N/A') as liked, IFNULL(status,'ACTIVE') as status  FROM results WHERE uuid = ?",
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
      "SELECT id, user_id, uuid, created_time, prompt, liked, status FROM results WHERE user_id = ? AND status = ? ORDER BY created_time DESC",
      [userId, "ACTIVE"]
    )) as [ResultDto[], FieldPacket[]];
    return prompts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Set liked ? 1 : 0 given the id and the value of liked
 * @param id
 * @param liked
 * @returns
 */
export async function updateLike(
  id: number,
  liked: boolean
): Promise<ResultSetHeader> {
  try {
    const connection = await getConnection();

    const [response] = (await connection.execute(
      "UPDATE results SET liked=? where id =?",
      [liked, id]
    )) as [ResultSetHeader, FieldPacket[]];
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Set status given the id and the value of deleted
 * @param id
 * @param deleted
 * @returns
 */
export async function updateDelete(
  id: number,
  deleted: string
): Promise<ResultSetHeader> {
  try {
    const connection = await getConnection();

    const [response] = (await connection.execute(
      "UPDATE results SET status=? where id =?",
      [deleted === "ACTIVE" ? "ACTIVE" : "DELETED", id]
    )) as [ResultSetHeader, FieldPacket[]];
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
