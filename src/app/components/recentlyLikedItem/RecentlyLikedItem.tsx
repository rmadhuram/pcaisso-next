import styles from "./RecentlyLikedItem.module.scss";
import { RecentlyLikedItemModel } from "@/models/recently-liked-item";

export default function RecentlyLikedItem({recent}: {recent: RecentlyLikedItemModel}) {
  return <div className={styles["recently-liked-item"]}>
    <div className="top-section">
      <div className="thumbnail">
        <img src={recent.thumbnail_url} alt="thumbnail" />
      </div>
      <div className="name">{recent.user_name}</div>
    </div>
    <div className="bottom-section">
      <div className="likes"></div>
      <div className="comments"></div>
    </div>
  </div>;
} 