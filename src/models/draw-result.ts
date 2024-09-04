export interface DrawResult {
  id?: number;
  uuid: string;
  liked: boolean;
  code: string;
  text: string;
  timeTakenInSec: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
