export interface ResultDto {
  uuid: string;
  user_id: number;
  type: string;
  description: string;
  prompt: string;
  model: string;
  output: string;
  thumbnail_url: string;
  created_time: Date;
  time_taken: number;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  liked: boolean;
}
