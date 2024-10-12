import { DrawResult } from "@/models/draw-result";

/**
 * Interface for invoking an LLM
 */
export interface InvokeLLM   {
  invoke(prompt: string, model: string): Promise<DrawResult>;
}
