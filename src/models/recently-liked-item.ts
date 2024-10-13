export interface RecentlyLikedItemModel {
  uuid: string;
  user_id: number;
  model: string;
  user_name: string;
  type: string;
  description: string;
  prompt: string;
  image_url: string;
  liked_time: string;
}
