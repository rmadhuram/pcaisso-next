/**
 * Prompt Result persistence functions
 */

import getPool from "@/lib/db";
import { executeQuery } from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { DrawResult } from "@/models/draw-result";
import { ResultDto } from "./result.dto";
import NodeCache from "node-cache";

const cache = new NodeCache();
const KEY_LAST_LIKES = "last_likes";

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
    const uuid = uuidv4();

    const [result] = (await executeQuery(
      "INSERT INTO results (uuid, user_id, type, description, prompt, model, output, thumbnail_url, created_time, time_taken, prompt_tokens, completion_tokens, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
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
        drawResult.status,
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
    const [results] = (await executeQuery(
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
export async function getPrompts(
  userId: number,
  limit: number,
  offset: number
): Promise<{ prompts: ResultDto[]; totalRecords: number }> {
  try {
    const [prompts] = (await executeQuery(
      "SELECT id, user_id, uuid, created_time, prompt, liked, status FROM results WHERE user_id = ? AND status = ? ORDER BY created_time DESC LIMIT ? OFFSET ?",
      [userId, "ACTIVE", limit, offset]
    )) as [ResultDto[], FieldPacket[]];

    const [totalResult] = (await executeQuery(
      "SELECT COUNT(*) as count FROM results WHERE user_id = ? AND status = ?",
      [userId, "ACTIVE"]
    )) as [[{ count: number }], FieldPacket[]];

    const totalRecords = totalResult[0]?.count ?? 0;

    return {
      prompts,
      totalRecords,
    };
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
    const [response] = (await executeQuery(
      "UPDATE results SET liked=?, liked_time=NOW() where id =?",
      [liked, id]
    )) as [ResultSetHeader, FieldPacket[]];
    cache.del(KEY_LAST_LIKES); // invalidate cache
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Retrieve the last five likes
 * @returns
 */
export async function getLastLikes(): Promise<ResultSetHeader> {
  try {
    const cachedLikes = cache.get(KEY_LAST_LIKES) as ResultSetHeader;
    if (cachedLikes) {
      return cachedLikes;
    }

    const [response] = (await executeQuery(
      "SELECT results.uuid, results.user_id, users.user_name, results.type, results.description, results.prompt, users.image_url, results.liked_time FROM results JOIN users ON results.user_id = users.id WHERE results.liked = 1 ORDER BY results.liked_time DESC LIMIT 10",
      []
    )) as [ResultSetHeader, FieldPacket[]];
    cache.set(KEY_LAST_LIKES, response);
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
    const [response] = (await executeQuery(
      "UPDATE results SET status=? where id =?",
      [deleted === "ACTIVE" ? "ACTIVE" : "DELETED", id]
    )) as [ResultSetHeader, FieldPacket[]];
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
